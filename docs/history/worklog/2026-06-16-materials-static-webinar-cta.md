# 2026-06-16 - Materials static webinar CTA

## Summary

- Simplified the fragile `/materials/` webinar area without replacing the whole page design.
- Disabled the webinar-side Tilda scroll animation, removed the review/proof insert, removed the stray helper copy, and added a separate follow-up CTA block under the webinar.

## Changes

- In `src/pages/materials.astro`:
  - stripped `data-animate-*`, `t-animate`, and hidden-animation classes from the desktop/mobile webinar records;
  - hid the old webinar review/proof groups inside `rec861962232` and `rec862050095`;
  - removed the header helper copy `Тут вы узнаете много полезностей`;
  - inserted a follow-up CTA section under the webinar and then normalized it to the same `tg-plan-cta` / `tg-tilda-cta` structure used on the main page, instead of a custom button/card variant;
  - kept the page as `Tilda records inside Astro`, without a native page rewrite.
- In `scripts/verify-materials-baseline.mjs`:
  - updated the baseline markers so the new CTA is expected and the removed helper copy is forbidden.
- In `docs/do-not-break-this-site.md`:
  - documented that custom CTA siblings under `/materials/` must not use `r t-rec`, because Tilda runtime may hide them as `r_hidden r_anim`.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`
- Local DOM checks on `http://127.0.0.1:4321/materials/` confirmed:
  - desktop webinar review group is hidden;
  - mobile webinar review groups are hidden;
  - the CTA block sits below the webinar zone and does not overlap the kept cards;
  - `Тут вы узнаете много полезностей` is absent.

## Notes

- The in-app browser screenshot path timed out on this page, so visual confirmation was done through the opened local browser tab plus DOM/geometry checks instead of saved screenshots.
