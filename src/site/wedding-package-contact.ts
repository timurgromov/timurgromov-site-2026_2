import { expertCtaSource, messengerStartUrl, type ExpertCtaPlacement } from './home-data';
import { formatWeddingRubles, weddingPackages, weddingQuote, weddingPackagePrice, weddingDateTiers } from './wedding-prices';

type Provider = 'telegram' | 'max';
type PackageQuote = {
  packageCode: string;
  label: string;
  date: string;
  dateLabel: string;
  price: number;
  extension: number;
  priceMode: 'from' | 'exact';
  placement: ExpertCtaPlacement;
  source: string;
  ctaCode: string;
  title: string;
  description: string;
};

declare global {
  interface Window {
    tgAttributedMessengerUrl?: (provider: Provider, source: string, ctaCode?: string) => Promise<string>;
    tgWeddingPackageQuote?: (opener: Element | null) => PackageQuote | null;
    tgPrepareWeddingPackagePopup?: (popup: HTMLElement, quote: PackageQuote | null) => void;
    tgWeddingPackageGoalContext?: () => Record<string, string | number>;
    ym?: (...args: unknown[]) => void;
    TG_METRIKA_ID?: string | number;
    mainMetrikaId?: string | number;
  }
}

const popup = document.querySelector<HTMLElement>('#plan-delivery-popup');

if (popup) {
  const title = popup.querySelector<HTMLElement>('#plan-delivery-title')!;
  const description = popup.querySelector<HTMLElement>('[data-wedding-call-description]')!;
  const selection = popup.querySelector<HTMLElement>('[data-wedding-package-selection]')!;
  const defaultTitle = title.innerHTML;
  const defaultDescription = description.textContent;
  const links = Array.from(popup.querySelectorAll<HTMLAnchorElement>('[data-wedding-call-dynamic]'));
  const handoff = document.createElement('p');
  handoff.className = 'tg-plan-popup__handoff';
  handoff.setAttribute('role', 'status');
  handoff.hidden = true;
  popup.querySelector('.tg-plan-popup__actions')!.append(handoff);
  let activeQuote: PackageQuote | null = null;
  let revision = 0;
  const requests = new Map<HTMLAnchorElement, Promise<string>>();
  const destinations = new Map<HTMLAnchorElement, string>();

  window.tgWeddingPackageQuote = (opener) => {
    const music = opener?.getAttribute('data-wedding-package-for') === 'music';
    const card = music
      ? document.querySelector<HTMLElement>('[data-pricing-package="music"]')
      : opener?.closest<HTMLElement>('[data-pricing-package]');
    if (!card) return null;
    const index = weddingPackages.findIndex((pack) => pack.key === card.dataset.pricingPackage);
    const pack = weddingPackages[index];
    if (!pack) return null;
    const input = document.querySelector<HTMLInputElement>('[data-pricing-date]');
    const calculation = weddingQuote(input?.value ?? '');
    const price = calculation?.prices[index] ?? weddingPackagePrice(pack, weddingDateTiers.regular);
    const date = calculation ? input!.value : '';
    const packageCode = 'wedding_' + pack.key;
    const placement: ExpertCtaPlacement = music ? 'music' : `pricing_${pack.key}`;
    const priceMode = !calculation || calculation.startsAt[index] ? 'from' : 'exact';
    const extension = calculation?.extensions[index] ?? pack.extension;
    return {
      packageCode,
      label: pack.label,
      date,
      dateLabel: calculation?.dateLabel ?? '',
      price,
      extension,
      priceMode,
      placement,
      source: expertCtaSource('meeting', 'home', placement),
      ctaCode: ['package', packageCode, date || 'none', price, extension, priceMode].join(':'),
      title: music ? 'Обсудим музыкальный состав' : {
        chamber: 'Обсудим камерную свадьбу',
        classic: 'Обсудим классическую свадьбу',
        music: 'Обсудим свадьбу с живой музыкой',
      }[pack.key],
      description: pack.liveMusic
        ? 'Познакомимся за 20 минут, обсудим программу, музыкальный состав и вашу площадку.'
        : 'Познакомимся за 20 минут, обсудим программу, вашу площадку и пожелания к свадебному вечеру.',
    };
  };

  window.tgWeddingPackageGoalContext = () => activeQuote ? {
    placement: activeQuote.placement,
    package_code: activeQuote.packageCode,
    event_date: activeQuote.date,
    price: activeQuote.price,
    price_mode: activeQuote.priceMode,
  } : {};

  const prepareLink = (link: HTMLAnchorElement, currentRevision: number) => {
    const provider = link.dataset.weddingCallChannel as Provider;
    const source = activeQuote?.source ?? expertCtaSource('meeting', 'home', 'hero');
    const ctaCode = activeQuote?.ctaCode ?? 'site_meeting_popup';
    link.dataset.messengerSource = source;
    link.href = messengerStartUrl(provider, source);
    link.setAttribute('aria-busy', 'true');
    destinations.delete(link);
    const pending = Promise.resolve().then(() => {
      if (!window.tgAttributedMessengerUrl) throw new Error('Messenger attribution unavailable');
      return window.tgAttributedMessengerUrl(provider, source, ctaCode);
    });
    requests.set(link, pending);
    pending.then((url) => {
      if (revision !== currentRevision) return;
      destinations.set(link, url);
      link.href = url;
      link.removeAttribute('aria-busy');
    }).catch(() => {
      if (revision !== currentRevision) return;
      requests.delete(link);
      link.removeAttribute('aria-busy');
    });
    return pending;
  };

  window.tgPrepareWeddingPackagePopup = (_popup, quote) => {
    activeQuote = quote;
    revision += 1;
    handoff.hidden = true;
    handoff.textContent = '';
    requests.clear();
    destinations.clear();
    title.innerHTML = defaultTitle;
    description.textContent = defaultDescription;
    selection.hidden = !quote;
    selection.textContent = '';
    if (quote) {
      title.textContent = quote.title;
      description.textContent = quote.description;
      selection.textContent = [quote.label, quote.dateLabel,
        (quote.priceMode === 'from' ? 'от ' : '') + formatWeddingRubles(quote.price)].filter(Boolean).join(' · ');
    }
    links.forEach((link) => prepareLink(link, revision));
  };

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const currentRevision = revision;
      const channel = link.dataset.weddingCallChannel;
      try {
        window.ym?.(window.TG_METRIKA_ID || window.mainMetrikaId, 'reachGoal', 'wedding_call_contact_click', {
          funnel: 'wedding_call', page: location.pathname, channel,
          placement: 'popup', ...window.tgWeddingPackageGoalContext!(),
        });
      } catch { /* Navigation is independent of analytics. */ }
      if (destinations.has(link)) return;
      event.preventDefault();
      const destinationTab = window.open('about:blank', '_blank');
      handoff.textContent = 'Готовим переход в ' + (channel === 'max' ? 'MAX' : 'Telegram') + '…';
      handoff.hidden = false;
      const pending = requests.get(link) ?? prepareLink(link, currentRevision);
      pending.then((url) => {
        if (destinationTab) {
          destinationTab.opener = null;
          destinationTab.location.href = url;
        } else if (revision === currentRevision && popup.classList.contains('is-open')) {
          window.location.assign(url);
        }
        if (revision === currentRevision) handoff.hidden = true;
      }).catch(() => {
        destinationTab?.close();
        if (revision !== currentRevision) return;
        handoff.textContent = 'Не удалось подготовить переход. Нажмите кнопку ещё раз или позвоните Тимуру.';
        handoff.hidden = false;
      });
    });
  });
}
