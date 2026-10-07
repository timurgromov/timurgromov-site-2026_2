function initContactChoice() {
  const dialog = document.getElementById('contact-choice-dialog');
  const sheet = dialog?.querySelector('.contact-choice__sheet');
  const fab = document.querySelector('[data-contact-fab]');
  const actions = dialog?.querySelector('[data-contact-actions]');
  const note = dialog?.querySelector('[data-contact-note]');
  const callback = dialog?.querySelector('[data-contact-callback]');
  const telegram = dialog?.querySelector('[data-contact-telegram]');
  const phone = dialog?.querySelector('[data-contact-phone]');
  const form = dialog?.querySelector('[data-contact-lead-form]');
  const status = dialog?.querySelector('[data-contact-form-status]');
  const success = dialog?.querySelector('[data-contact-success]');
  if (!dialog || !sheet || !fab || !actions || !note || !callback || !form || !status || !success) return;

  let opener = null;
  let formStarted = false;
  let ctaContext = { site: 'timurgromov', page: 'jubilee', intent: 'consultation', placement: 'contact_panel' };

  function token(value, fallback) {
    const normalized = String(value || '').trim().toLowerCase();
    return /^[a-z0-9][a-z0-9_-]{0,63}$/.test(normalized) ? normalized : fallback;
  }

  function contextFrom(trigger) {
    return {
      site: 'timurgromov',
      page: 'jubilee',
      intent: token(trigger?.dataset.contactIntent, 'consultation'),
      placement: token(trigger?.dataset.contactPlacement, 'contact_panel')
    };
  }

  function track(goal) {
    window.tgTrackCtaGoal?.(goal, ctaContext);
  }

  function updateFab() {
    fab.classList.toggle('is-visible', window.scrollY > window.innerHeight);
  }

  function resetForm() {
    form.reset();
    form.hidden = true;
    success.hidden = true;
    actions.hidden = false;
    note.hidden = false;
    status.textContent = '';
    delete status.dataset.state;
    formStarted = false;
    const submit = form.querySelector('button[type="submit"]');
    if (submit) {
      submit.disabled = false;
      submit.textContent = 'Отправить номер';
    }
  }

  function close({ restoreFocus = true } = {}) {
    if (dialog.hidden) return;
    const focusTarget = opener;
    dialog.hidden = true;
    unlockPageScroll();
    updateFab();
    resetForm();
    if (restoreFocus && focusTarget?.isConnected) {
      window.setTimeout(() => focusTarget.focus(), 80);
    }
    opener = null;
  }

  function open(trigger) {
    opener = trigger;
    ctaContext = contextFrom(trigger);
    const source = `site_meeting_timurgromov__jubilee__${ctaContext.placement}`;
    telegram.dataset.botSource = source;
    telegram.href = `https://t.me/gromov_wedding_bot?start=${source}`;
    resetForm();
    dialog.hidden = false;
    lockPageScroll();
    sheet.focus();
    track('cta_open');
  }

  async function submitLead() {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const digits = phone.replace(/\D/g, '');
    const comment = String(data.get('comment') || '').trim();
    const submit = form.querySelector('button[type="submit"]');

    if (!name || digits.length < 10 || digits.length > 15) {
      status.textContent = 'Проверьте имя и номер телефона.';
      status.dataset.state = 'error';
      (!name ? form.elements.name : form.elements.phone).focus();
      return;
    }

    const tracking = typeof window.tgGetTrackingBundle === 'function'
      ? window.tgGetTrackingBundle()
      : { yclid: null, campaign_params: null, attribution_context: null };
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);
    const payload = {
      name,
      phone,
      comment: comment || null,
      form_source: `site_meeting_timurgromov__jubilee__${ctaContext.intent}__${ctaContext.placement}`,
      page_url: `${window.location.origin}${window.location.pathname}`.slice(0, 500),
      yclid: tracking.yclid || null,
      campaign_params: tracking.campaign_params && Object.keys(tracking.campaign_params).length ? tracking.campaign_params : null,
      attribution_context: tracking.attribution_context || null,
      cta_site: ctaContext.site,
      cta_page: ctaContext.page,
      cta_intent: ctaContext.intent,
      cta_placement: ctaContext.placement
    };

    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Отправляем…';
    }
    status.textContent = 'Передаём заявку в рабочий контур.';
    status.dataset.state = 'sending';
    try {
      const response = await fetch('https://calcul.timurgromov.ru/api/v1/site/consultation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit',
        signal: controller.signal,
        body: JSON.stringify(payload)
      });
      if (response.status !== 201) throw new Error('lead_not_created');
      form.hidden = true;
      success.hidden = false;
      status.textContent = '';
      track('lead_submit_success');
    } catch (_) {
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните по номеру выше.';
      status.dataset.state = 'error';
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Повторить отправку';
      }
      track('lead_submit_error');
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest?.('[data-contact-open]');
    if (!trigger) return;
    event.preventDefault();
    open(trigger);
  }, true);
  dialog.querySelectorAll('[data-contact-close]').forEach(control => {
    control.addEventListener('click', () => close());
  });
  callback.addEventListener('click', () => {
    actions.hidden = true;
    note.hidden = true;
    form.hidden = false;
    form.querySelector('input[name="name"]')?.focus();
  });
  telegram?.addEventListener('click', event => {
    track('telegram_click');
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const fallback = telegram.href;
    const popup = window.open('about:blank', '_blank');
    if (popup) popup.opener = null;
    Promise.resolve(window.tgAttributedTelegramUrl?.(telegram.dataset.botSource) || fallback)
      .catch(() => fallback)
      .then(url => {
        if (popup && !popup.closed) popup.location.href = url;
        else window.location.href = url;
      });
  });
  phone?.addEventListener('click', () => track('phone_click'));
  form.addEventListener('input', () => {
    if (formStarted) return;
    formStarted = true;
    track('form_start');
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    submitLead();
  });
  document.addEventListener('keydown', event => {
    if (dialog.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...sheet.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled])')]
      .filter(element => !element.hidden && !element.closest('[hidden]'));
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === sheet)) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  });
  window.addEventListener('scroll', updateFab, { passive: true });
  window.addEventListener('resize', updateFab);
  updateFab();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactChoice, { once: true });
} else {
  initContactChoice();
}
