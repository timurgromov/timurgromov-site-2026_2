# Compact calculator/contact prototype for Scenario — 2026-09-08

## Scope

Only `/scenario/` is changed for owner review. Homepage, `/materials/`, and
`/articles/plan-podgotovki-k-svadbe/` keep their existing rendered contours.

## Changes

- Added the `scenario_calculator` variant of the shared conversion renderer.
  It renders one visual card rather than separate material, meeting and author
  cards.
- The card is a brand-navigation block with exactly four buttons: `Получить в
  Telegram`, `Получить в MAX`, `Обсудить свадьбу` and `Сайт ведущего`. The
  bot copy names its concrete contents: calculator, useful materials, evening
  order, scenario example and preparation plan.
- `Обсудить свадьбу` opens the existing contact-pop-up pattern inside
  `/scenario/`; it shows Telegram, MAX, direct phone and the consultation
  form. The direct number is also visible below the four buttons as a text
  link, not a fifth CTA.
- Created 900x1200 centred `3:4` AVIF and WebP derivatives from the supplied
  black-and-white portrait. The source image remains outside the repository.

## Verification

- `npm run build`
- `npm run verify:responsive-layout`
- `npm run verify:contacts`
- `npm run check:direct-attribution`
- Live local browser review at 1440x900 and 390x844: one card, right-side
  portrait on desktop, portrait-first mobile order and four controls. The
  `Обсудить свадьбу` action opened the contact pop-up without a messenger
  navigation. Messenger routes were inspected only and not opened.

`npm run check:materials-layout` remains stale against the common footer that
was intentionally introduced before this prototype; it fails looking for the
removed legacy Materials footer, not because of a Scenario change.

## Approval gate

Do not copy this variant to Materials or the preparation-plan article until the
owner approves the Scenario prototype after seeing it live.
