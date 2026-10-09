(function initJubileePricing() {
  const root = document.querySelector('[data-jubilee-pricing]');
  if (!root) return;

  const input = root.querySelector('[data-pricing-date]');
  const summary = root.querySelector('[data-pricing-selected-date]');
  const action = root.querySelector('[data-pricing-date-action]');
  const captions = root.querySelectorAll('[data-pricing-caption]');

  function parseDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return null;
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'
    }).format(date);
  }

  function update() {
    const date = parseDate(input?.value);
    if (!date) {
      window.tgJubileeSelectedDate = '';
      summary.textContent = 'Базовая стоимость юбилея';
      action.textContent = 'Выбрать дату';
      captions.forEach((caption) => { caption.hidden = true; caption.textContent = ''; });
      return;
    }
    const label = formatDate(date);
    window.tgJubileeSelectedDate = input.value;
    summary.textContent = `Выбрана дата: ${label}`;
    action.textContent = 'Изменить дату';
    captions.forEach((caption) => { caption.hidden = false; caption.textContent = label; });
  }

  input?.addEventListener('input', update);
  input?.addEventListener('change', update);
})();
