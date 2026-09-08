import { getTildaCtaArrowIconUrl, tildaCtaLink } from "./tilda-cta";

export type ExpertConversionEntrypoint = "scenario" | "materials" | "preparation_plan";
export type ExpertConversionVariant = "default" | "scenario_calculator";

interface ExpertConversionContourOptions {
  basePath: string;
  entrypoint: ExpertConversionEntrypoint;
  usefulHeading: string;
  usefulText: string;
  telegramPlanUrl: string;
  maxPlanUrl: string;
  telegramMeetingUrl: string;
  maxMeetingUrl: string;
  variant?: ExpertConversionVariant;
}

// Canonical expert-page conversion contour. Its messenger buttons reuse the
// existing Tilda split-button markup from src/site/tilda-cta.ts.
export const renderExpertConversionContour = ({
  basePath,
  entrypoint,
  usefulHeading,
  usefulText,
  telegramPlanUrl,
  maxPlanUrl,
  telegramMeetingUrl,
  maxMeetingUrl,
  variant = "default",
}: ExpertConversionContourOptions) => {
  const arrowUrl = getTildaCtaArrowIconUrl(basePath);
  const authorPhotoUrl = `${basePath}images/scenario-hero-host-bw-source.jpg`;
  const calculatorPortraitAvifUrl = `${basePath}images/timur-calculator-contact-portrait.avif`;
  const calculatorPortraitWebpUrl = `${basePath}images/timur-calculator-contact-portrait.webp`;
  const safeAttrs = 'target="_blank" rel="noopener noreferrer nofollow"';
  const isScenarioCalculator = variant === "scenario_calculator";

  const contourMarkup = isScenarioCalculator
    ? `<section class="expert-conversion__calculator-card" aria-label="Свадебный калькулятор и контакт с Тимуром">
      <div class="expert-conversion__calculator-copy">
        <p class="expert-conversion__eyebrow">Всё для подготовки к свадьбе</p>
        <h2>Получить больше, чем сценарий</h2>
        <p class="expert-conversion__bot-note">В Telegram- и MAX-боте вы получите свадебный калькулятор, полезные материалы, порядок вечера, пример сценария и пошаговый план подготовки к свадьбе. Можно обсудить свою свадьбу с Тимуром или посмотреть сайт ведущего.</p>
        <div class="expert-conversion__calculator-actions" aria-label="Открыть бота для подготовки к свадьбе">
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--primary", telegramPlanUrl, "Получить в Telegram", `${safeAttrs} data-plan-source="site_plan_${entrypoint}" data-expert-cta="plan-telegram"`)}
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--secondary", maxPlanUrl, "Получить в MAX", `${safeAttrs} data-plan-source="site_plan_${entrypoint}" data-expert-cta="plan-max"`)}
        </div>
        <div class="expert-conversion__secondary-actions">
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--secondary", "#consultation-contact", "Обсудить свадьбу", 'data-consultation-popup-open data-expert-cta="meeting-popup"')}
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--secondary expert-conversion__host-link", basePath, "Сайт ведущего", 'data-expert-cta="host-home"')}
        </div>
        <a class="expert-conversion__scenario-phone" href="tel:+79253900772">+7 925 390 07 72</a>
      </div>
      <picture class="expert-conversion__calculator-photo">
        <source srcset="${calculatorPortraitAvifUrl}" type="image/avif" />
        <img src="${calculatorPortraitWebpUrl}" alt="Тимур Громов" width="900" height="1200" loading="lazy" />
      </picture>
    </section>`
    : `<section class="expert-conversion__card expert-conversion__card--material">
        <div class="expert-conversion__copy">
          <p class="expert-conversion__eyebrow">Полезный следующий шаг</p>
          <h2>${usefulHeading}</h2>
          <p>${usefulText}</p>
        </div>
        <div class="expert-conversion__actions" aria-label="Получить материал в мессенджере">
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--primary", telegramPlanUrl, "Получить в Telegram", `${safeAttrs} data-plan-source="expert_plan_${entrypoint}" data-expert-cta="plan-telegram"`)}
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--secondary", maxPlanUrl, "Получить в MAX", `${safeAttrs} data-plan-source="expert_plan_${entrypoint}" data-expert-cta="plan-max"`)}
        </div>
        <p class="expert-conversion__note">Материал — отдельный путь: он не заменяет разговор о вашей свадьбе.</p>
      </section>

      <section class="expert-conversion__card expert-conversion__card--meeting">
        <div class="expert-conversion__copy">
          <p class="expert-conversion__eyebrow">Когда нужен личный разбор</p>
          <h2>Записаться на бесплатную встречу</h2>
          <p>Обсудим формат, площадку, гостей и тайминг. Встреча ни к чему не обязывает.</p>
        </div>
        <div class="expert-conversion__actions" aria-label="Записаться на встречу">
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--primary", telegramMeetingUrl, "Написать в Telegram", `${safeAttrs} data-plan-source="expert_meeting_${entrypoint}" data-expert-cta="meeting-telegram"`)}
          ${tildaCtaLink("expert-conversion__button expert-conversion__button--secondary", maxMeetingUrl, "Написать в MAX", `${safeAttrs} data-plan-source="expert_meeting_${entrypoint}" data-expert-cta="meeting-max"`)}
          <a class="expert-conversion__phone" href="tel:+79253900772" data-expert-cta="meeting-phone">+7 925 390-07-72</a>
        </div>
      </section>

      <aside class="expert-conversion__author" aria-label="Об авторе">
        <img src="${authorPhotoUrl}" alt="Тимур Громов" loading="lazy" />
        <div>
          <p class="expert-conversion__eyebrow">Автор материала</p>
          <h2>Тимур Громов</h2>
          <p>Ведущий свадебных вечеров. Помогаю собрать спокойный ритм дня, чтобы пара и гости были внутри праздника, а не в организационной суете.</p>
          <p class="expert-conversion__author-links"><a href="${basePath}">Перейти на главную</a><a href="https://clck.ru/TZjT6" target="_blank" rel="noopener noreferrer nofollow">Отзывы</a></p>
        </div>
      </aside>`;

  return `<section class="expert-conversion${isScenarioCalculator ? " expert-conversion--scenario-calculator" : ""}" data-testid="expert-conversion-${entrypoint}" aria-label="Полезные материалы и контакты">
  <div class="expert-conversion__shell">
    ${contourMarkup}
  </div>

  <footer class="expert-conversion__footer">
    <div class="expert-conversion__shell expert-conversion__footer-grid">
      <section><h3>Материалы</h3><a href="${basePath}materials/">Все материалы</a><a href="${basePath}scenario/">Сценарий вечера</a></section>
      <section><h3>Услуги</h3><a href="${basePath}">Свадебный ведущий</a><a href="https://corp.timurgromov.ru" target="_blank" rel="noopener noreferrer">Корпоративы</a></section>
      <section><h3>Доверие</h3><a href="https://dzen.ru/timurgromov" target="_blank" rel="noopener noreferrer">Дзен</a><a href="https://clck.ru/TZjT6" target="_blank" rel="noopener noreferrer">Отзывы</a></section>
      <section><h3>Контакты</h3><a href="${telegramMeetingUrl}" ${safeAttrs}>Telegram</a><a href="${maxMeetingUrl}" ${safeAttrs}>MAX</a><a href="tel:+79253900772">+7 925 390-07-72</a></section>
    </div>
  </footer>

  <style>
    .expert-conversion{--expert-ink:#241d19;--expert-bg:#fffaf4;--expert-accent:#fa4604;--expert-muted:rgba(36,29,25,.74);--expert-line:rgba(36,29,25,.12);margin-top:72px;color:var(--expert-ink);font-family:Arial,Helvetica,sans-serif}.expert-conversion__shell{width:min(1080px,calc(100% - 48px));margin:0 auto}.expert-conversion__card{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.78fr);gap:34px;align-items:center;margin-bottom:18px;padding:40px;border:1px solid var(--expert-line);border-radius:30px;background:var(--expert-bg);box-shadow:0 22px 54px rgba(36,29,25,.07)}.expert-conversion__card--meeting{background:linear-gradient(180deg,#f8efe4 0%,#fffaf4 100%)}.expert-conversion__copy{max-width:620px}.expert-conversion__eyebrow{margin:0 0 12px;color:var(--expert-accent);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.expert-conversion h2{margin:0;font-family:"Cormorant Garamond",Georgia,serif;font-size:clamp(34px,4vw,52px);font-weight:600;line-height:.98}.expert-conversion__copy>p:last-child,.expert-conversion__author p{margin:18px 0 0;color:var(--expert-muted);font-size:18px;line-height:1.55}.expert-conversion__actions{display:grid;gap:10px;width:100%}.expert-conversion .tg-tilda-cta{--tg-cta-height:48px;--tg-cta-arrow-box:48px;--tg-cta-overlap:1px;--tg-cta-pad-left:22px;--tg-cta-pad-right:18px;--tg-cta-radius:7px;--tg-cta-font-size:15px;--tg-cta-icon-size:15px;position:relative;display:grid;grid-template-columns:minmax(0,1fr) calc(var(--tg-cta-arrow-box) - var(--tg-cta-overlap));min-height:var(--tg-cta-height);align-items:center;text-decoration:none;isolation:isolate;transition:transform .2s ease}.expert-conversion .tg-tilda-cta__plate,.expert-conversion .tg-tilda-cta__arrow-box{position:absolute;inset:0;background:var(--tg-cta-fill);border:1px solid currentColor}.expert-conversion .tg-tilda-cta__plate{right:calc(var(--tg-cta-arrow-box) - var(--tg-cta-overlap));border-radius:var(--tg-cta-radius) 0 0 var(--tg-cta-radius)}.expert-conversion .tg-tilda-cta__arrow-box{left:auto;width:var(--tg-cta-arrow-box);border-radius:0 var(--tg-cta-radius) var(--tg-cta-radius) 0;background:var(--tg-cta-arrow-fill)}.expert-conversion .tg-tilda-cta__label{z-index:1;padding:0 var(--tg-cta-pad-right) 0 var(--tg-cta-pad-left);color:var(--tg-cta-color);font-size:var(--tg-cta-font-size);font-weight:600;line-height:1;text-align:center}.expert-conversion .tg-tilda-cta__icon{z-index:1;width:var(--tg-cta-icon-size);height:var(--tg-cta-icon-size);margin:auto;background:var(--tg-cta-arrow-color);mask:url("${arrowUrl}") center/contain no-repeat;-webkit-mask:url("${arrowUrl}") center/contain no-repeat}.expert-conversion__button--primary{--tg-cta-fill:var(--expert-accent);--tg-cta-arrow-fill:var(--expert-accent);--tg-cta-color:#fffaf4;--tg-cta-arrow-color:#fffaf4}.expert-conversion__button--secondary{--tg-cta-fill:#fffaf4;--tg-cta-arrow-fill:#fffaf4;--tg-cta-color:var(--expert-ink);--tg-cta-arrow-color:var(--expert-ink)}.expert-conversion .tg-tilda-cta:hover{transform:translateY(-1px)}.expert-conversion__phone{color:var(--expert-ink);font-family:"Cormorant Garamond",Georgia,serif;font-size:24px;font-weight:600;text-align:center;text-decoration:underline;text-underline-offset:4px}.expert-conversion__note{grid-column:1/-1;margin:0;color:var(--expert-muted);font-size:14px;line-height:1.4}.expert-conversion__author{display:grid;grid-template-columns:170px minmax(0,1fr);gap:28px;align-items:center;margin:34px 0 0;padding:32px 0 42px;border-top:1px solid var(--expert-line)}.expert-conversion__author img{width:170px;height:170px;object-fit:cover;object-position:center;border-radius:50%;filter:grayscale(1)}.expert-conversion__author-links{display:flex;gap:22px;flex-wrap:wrap}.expert-conversion__author-links a,.expert-conversion__footer a{color:inherit;text-decoration:underline;text-decoration-color:rgba(36,29,25,.28);text-underline-offset:4px}.expert-conversion__footer{padding:44px 0;background:#241d19;color:#fffaf4}.expert-conversion__footer-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px}.expert-conversion__footer h3{margin:0 0 14px;color:rgba(255,250,244,.66);font-family:"Cormorant Garamond",Georgia,serif;font-size:24px;font-weight:600}.expert-conversion__footer a{display:block;margin-top:10px;color:#fffaf4;font-size:15px;line-height:1.35}@media(max-width:900px){.expert-conversion__card{grid-template-columns:1fr}.expert-conversion__footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.expert-conversion{margin-top:48px}.expert-conversion__shell{width:min(100% - 32px,1080px)}.expert-conversion__card{gap:24px;margin-bottom:14px;padding:28px 20px;border-radius:22px}.expert-conversion h2{font-size:36px}.expert-conversion__copy>p:last-child,.expert-conversion__author p{font-size:17px}.expert-conversion .tg-tilda-cta{--tg-cta-height:50px;--tg-cta-arrow-box:50px;--tg-cta-font-size:14px}.expert-conversion__author{grid-template-columns:1fr;gap:18px;padding:28px 0 32px}.expert-conversion__author img{width:112px;height:112px}.expert-conversion__footer{padding:32px 0}.expert-conversion__footer-grid{grid-template-columns:1fr;gap:24px}.expert-conversion__footer h3{font-size:22px}}
    .expert-conversion--scenario-calculator .expert-conversion__calculator-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,320px);gap:38px;align-items:center;padding:34px 36px;border:1px solid var(--expert-line);border-radius:30px;background:linear-gradient(135deg,#fffefa 0%,#f8efe4 100%);box-shadow:0 22px 54px rgba(36,29,25,.07)}
    .expert-conversion--scenario-calculator .expert-conversion__calculator-copy{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;max-width:620px}
    .expert-conversion--scenario-calculator .expert-conversion__calculator-copy>p:not(.expert-conversion__eyebrow){margin:16px 0 0;color:var(--expert-muted);font-size:18px;line-height:1.5}
    .expert-conversion--scenario-calculator .expert-conversion__bot-note{margin-top:16px!important;color:var(--expert-ink)!important;font-size:16px!important;line-height:1.46!important}
    .expert-conversion--scenario-calculator .expert-conversion__calculator-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;width:100%;margin-top:26px}
    .expert-conversion--scenario-calculator .expert-conversion__secondary-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;width:100%;margin-top:10px;align-items:start}
    .expert-conversion--scenario-calculator .expert-conversion__scenario-phone{margin-top:18px;color:var(--expert-accent);font-family:"Cormorant Garamond",Georgia,serif;font-size:26px;font-weight:600;line-height:1;text-decoration:none}
    .expert-conversion--scenario-calculator .expert-conversion__calculator-photo{display:block;align-self:center;overflow:hidden;width:100%;aspect-ratio:16/9;border-radius:18px;background:#d8d0c8}
    .expert-conversion--scenario-calculator .expert-conversion__calculator-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 42%}
    @media(max-width:900px){.expert-conversion--scenario-calculator .expert-conversion__calculator-card{grid-template-columns:minmax(0,1fr) minmax(220px,280px);gap:28px;padding:28px}}
    @media(max-width:640px){.expert-conversion--scenario-calculator .expert-conversion__calculator-card{grid-template-columns:1fr;gap:24px;padding:20px;border-radius:22px}.expert-conversion--scenario-calculator .expert-conversion__calculator-photo{order:-1;border-radius:14px}.expert-conversion--scenario-calculator .expert-conversion__calculator-actions,.expert-conversion--scenario-calculator .expert-conversion__secondary-actions{grid-template-columns:1fr;margin-top:22px}.expert-conversion--scenario-calculator .expert-conversion__secondary-actions{margin-top:9px}.expert-conversion--scenario-calculator .expert-conversion__scenario-phone{margin-top:20px;font-size:25px}}
    @media(min-width:480px) and (max-width:640px){.expert-conversion--scenario-calculator .expert-conversion__calculator-actions,.expert-conversion--scenario-calculator .expert-conversion__secondary-actions{grid-template-columns:repeat(2,minmax(0,1fr))}}
  </style>
</section>`;
};
