# 2026-06-27 - Desktop phone-only popup and inline contact phone

## Context

Owner noted that desktop clicks on `tel:` links can open outdated system handlers such as Skype. The requested scope was narrow: only the two visible `Позвонить` buttons on the homepage, and only on desktop. Existing visible phone numbers in Tilda popup/footer should not be changed to avoid mobile/contact geometry risk.

After the first implementation, owner correctly flagged that opening the full contact popup from the standalone `Позвонить` CTA was wrong: that CTA expresses a phone intent, not a need for Telegram/MAX/form options.

Owner then clarified the second phone surface inside the existing contact popup: on desktop it should not require clicking `Позвонить` to reveal a card. The popup should simply show the phone number as a desktop contact option, while mobile keeps the direct call button.

## Changes

- The standalone consultation CTA `Позвонить` now opens a small desktop-only phone popup with only the phone number and copy action.
- The standalone phone popup does not show Telegram, MAX or the contact form.
- In the existing contact popup, desktop hides the `Позвонить` button and shows `+7 925 390 07 72` directly in the contact options list.
- In the existing contact popup, mobile keeps the `Позвонить` button with native `tel:` behavior.
- Mobile and touch devices keep the native `tel:` behavior, so the phone call flow is not intercepted.
- Added the number `+7 925 390 07 72` and copy-number actions using the existing popup typography, colors, border radius, and spacing rhythm.

## Verification

- `ASTRO_TELEMETRY_DISABLED=1 npm run build`
- `npm run verify:contacts`
- Static built HTML check:
  - old `data-contact-phone-focus` binding is absent;
  - standalone `Позвонить` uses `data-phone-popup-open`;
  - `desktop-phone-popup` and `Позвонить Тимуру` are present.
- Playwright built-HTML smoke checks:
  - desktop outside `Позвонить`: only `.tg-phone-popup` opens, `.tg-contact-popup` remains closed;
  - phone-only popup contains no `Telegram` text;
  - `Записаться на бесплатную встречу` still opens the existing contact popup;
  - desktop contact popup hides the `Позвонить` button and shows only the phone number;
  - mobile contact popup keeps the `Позвонить` button with `tel:+79253900772` and hides the inline number;
  - mobile outside `Позвонить`: default `tel:` click is not prevented and no popup opens.
- Visual screenshots checked locally:
  - `/tmp/tg-phone-only-popup-desktop.png`
  - `/tmp/tg-contact-popup-desktop-phone-number.png`
  - `/tmp/tg-contact-popup-mobile-phone-button.png`

## Result

Desktop standalone `Позвонить` no longer sends users directly into system call handlers and no longer opens the full contact popup. Desktop contact popup shows the phone number directly instead of requiring another click. Mobile call behavior remains unchanged.
