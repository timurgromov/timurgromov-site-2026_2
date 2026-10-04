function initContactChoice() {
  const dialog = document.getElementById('contact-choice-dialog');
  const sheet = dialog?.querySelector('.contact-choice__sheet');
  const fab = document.querySelector('[data-contact-fab]');
  if (!dialog || !sheet || !fab) return;
  let opener = null;

  function updateFab() {
    fab.classList.toggle('is-visible', window.scrollY > window.innerHeight);
  }
  function close() {
    if (dialog.hidden) return;
    const focusTarget = opener;
    dialog.hidden = true;
    unlockPageScroll();
    updateFab();
    if (focusTarget?.isConnected) {
      window.setTimeout(() => focusTarget.focus(), 80);
    }
    opener = null;
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest?.('[data-contact-open]');
    if (!trigger) return;
    event.preventDefault();
    opener = trigger;
    dialog.hidden = false;
    lockPageScroll();
    sheet.focus();
  }, true);
  dialog.querySelectorAll('[data-contact-close]').forEach(control => {
    control.addEventListener('click', close);
  });
  document.addEventListener('keydown', event => {
    if (dialog.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...sheet.querySelectorAll('a[href],button:not([disabled])')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === sheet)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
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
