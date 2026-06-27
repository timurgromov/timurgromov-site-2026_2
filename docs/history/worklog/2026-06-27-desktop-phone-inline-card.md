# 2026-06-27 - Desktop phone inline card

## Context

Owner noted that desktop clicks on `tel:` links can open outdated system handlers such as Skype. The requested scope was narrow: only the two visible `Позвонить` buttons on the homepage, and only on desktop. Existing visible phone numbers in Tilda popup/footer should not be changed to avoid mobile/contact geometry risk.

## Changes

- Reused the existing consultation contact popup instead of adding a second modal.
- The standalone consultation CTA `Позвонить` now opens the existing contact popup in phone-focused state on desktop.
- The `Позвонить` button inside the contact popup now reveals an inline phone card in the same popup on desktop.
- Mobile and touch devices keep the native `tel:` behavior, so the phone call flow is not intercepted.
- Added a compact phone card with the number `+7 925 390 07 72` and a copy-number action using the existing popup typography, colors, border radius, and spacing rhythm.

## Verification

- `ASTRO_TELEMETRY_DISABLED=1 npm run build`
- `npm run verify:contacts`
- Playwright local preview checks:
  - desktop outside `Позвонить`: one existing popup opens and the phone card is visible;
  - desktop inside popup `Позвонить`: the existing popup reveals the inline phone card without opening a nested popup;
  - mobile outside `Позвонить`: default `tel:` click is not prevented and popup does not open;
  - mobile inside popup `Позвонить`: default `tel:` click is not prevented and phone card stays hidden.
- Visual screenshots checked locally:
  - `/tmp/tg-phone-popup-desktop-outside.png`
  - `/tmp/tg-phone-popup-desktop-inside.png`
  - `/tmp/tg-phone-popup-mobile.png`

## Result

Desktop no longer sends these two `Позвонить` buttons directly into system call handlers. Mobile call behavior remains unchanged.
