# Compact calculator/contact prototype for Scenario — 2026-09-08

## Scope

Only `/scenario/` is changed for owner review. Homepage, `/materials/`, and
`/articles/plan-podgotovki-k-svadbe/` keep their existing rendered contours.

## Changes

- Added the `scenario_calculator` variant of the shared conversion renderer.
  It renders one visual card rather than separate material, meeting and author
  cards.
- Made the wedding calculator the visible first action. Telegram and MAX stay
  equal split-button choices; MAX uses its existing direct calculator route.
- Added the compact `Обсудить свадьбу` disclosure with Telegram, MAX and phone
  contact actions, plus a `Посмотреть ведущего` route to the homepage offer.
- Created 900x1200 centred `3:4` AVIF and WebP derivatives from the supplied
  black-and-white portrait. The source image remains outside the repository.

## Verification

- `npm run build`
- `npm run verify:responsive-layout`
- `npm run verify:contacts`
- `npm run check:direct-attribution`
- Codex in-app browser review at the mobile layout, including the closed and
  expanded contact state. Messenger routes were inspected only and not opened.

`npm run check:materials-layout` remains stale against the common footer that
was intentionally introduced before this prototype; it fails looking for the
removed legacy Materials footer, not because of a Scenario change.

## Approval gate

Do not copy this variant to Materials or the preparation-plan article until the
owner approves the Scenario prototype after seeing it live.
