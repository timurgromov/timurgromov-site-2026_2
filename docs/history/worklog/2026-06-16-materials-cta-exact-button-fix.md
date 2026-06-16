# 2026-06-16 - Materials CTA exact button fix

## Summary

- Fixed the `/materials/` follow-up CTA so its `tg-plan-cta` / `tg-tilda-cta` buttons and numbered side list use the same parsed CSS rules as the main page CTA.
- Changed the CTA markup from a custom outer wrapper into the same `section.tg-plan-cta > .tg-plan-cta__inner` structure used on the main page.
- Fixed `withBasePath()` CSS `url(...)` rewriting in `src/pages/materials.astro`; it was producing malformed mixed quotes like `url('/images/...svg")`.

## Why

- The malformed SVG mask URL stopped the browser from parsing the later CTA rules in the same stylesheet.
- As a result, `/materials/` got only the generic `.tg-tilda-cta` base styles, while `.tg-plan-cta__button`, `.tg-plan-cta__button--primary`, `.tg-plan-cta__item`, and right-column typography rules did not apply.

## Checks

- `npm run build`
- `npm run verify:materials-baseline`
- In-app browser visual/computed checks:
  - `1440x900`: `/materials/` buttons now match main CTA button metrics (`240x36`, `14.4px`, `205px 35px` grid); right-column numbers `44px`, text `17px`.
  - `1911x1064`: `/materials/` buttons now match main CTA metrics (`319x48`, `19px`, `271.727px 46.7734px` grid); side list grid `52px + text`.
  - `390x844`: `/materials/` buttons now match main mobile CTA metrics (`350x35`, `13px`, `316px 34px` grid); side list grid `48px + text`.

## Note

- Do not reintroduce a separate scoped CTA override for this block. Keep the existing main-site CTA pattern exact, and fix parser/cascade issues at the source.
