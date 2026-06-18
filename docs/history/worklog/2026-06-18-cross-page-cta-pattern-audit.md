# 2026-06-18 - Cross-page CTA pattern audit

## Context

After unifying the new homepage and scenario CTAs, the owner clarified that the goal was not only width, but the full old button pattern: height, arrow square, responsive sizing, hover behavior, and shared code reuse.

## Changes

- Scenario CTA links now carry the canonical `tg-plan-cta__button` / `tg-plan-cta__button--primary` classes in addition to their local section classes.
- Scenario CTA styles now follow the same sizing contract as the old homepage CTA pattern:
  - mobile: `min(300px, 100%)`
  - tablet: `clamp(200px, 16.6667vw, 320px)`, which resolves to `200px` at `768px`
  - desktop/wide: same clamp and CTA variables as the canonical split button
- Materials CTA mobile override now uses the same `min(300px, 100%)` width instead of stretching to the full content column.
- Homepage consultation popup CTA links and submit button now use the same responsive sizing contract as the section CTAs.
- Homepage contact popup mobile form padding was reduced from `16px` to `14px` so the submit split-button can keep the same `300px` mobile width without overflow.

## Verification

- `npm run build`
- Local preview `http://127.0.0.1:4321/`
- Checked visible `.tg-tilda-cta` buttons on `/`, `/scenario/`, `/materials/`, plus the homepage consultation contact popup.
- Viewports:
  - `390x844`: 12 checked CTAs `300x35`, arrow square `35x35`
  - `768x1024`: 12 checked CTAs `200x35`, arrow square `35x35`
  - `1366x768`: 12 checked CTAs `228x34`, arrow square `34x34`
  - `1440x900`: 12 checked CTAs `240x36`, arrow square `36x36`
  - `1984x1046`: 12 checked CTAs `320x48`, arrow square `48x48`
- No horizontal overflow in the checked viewports.
- Screenshots were saved only to `/tmp` and not committed.
