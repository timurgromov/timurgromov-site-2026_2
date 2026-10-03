# Jubilee current-photo hero slider — 2026-10-03

## Scope

Updated only the portrait area of the existing `/yubiley/` hero. The Jubilee copy, CTA, tags, commercial blocks, SEO metadata and forms remain unchanged.

## Implementation

- Added the same ordered five-frame slider used by the corporate and New Year corporate routes.
- Published only optimized `AVIF` and responsive `WebP` derivatives (`640px`, `1024px`); original PNG files remain outside `public/`.
- Added automatic crossfade, hidden-tab pause, reduced-motion fallback and deterministic `?hero-slide=<slide-id>` visual-QA mode.
- Extended the permanent responsive gate with slide-count, format, active-frame and non-zero-geometry assertions.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed, 246 cases.
- strict media-budget audit — passed with zero warnings.
- rendered checks — passed at 11 widths from `390px` through `1984px`; horizontal overflow and collapsed hero geometry: `0`.
- autoplay and reduced-motion behavior — passed.

## Mobile reduced-motion correction

- The initial acceptance treated a static first frame under
  `prefers-reduced-motion: reduce` as valid. On a phone with that preference the
  intended slider therefore looked like a single photograph.
- The sequence now keeps the same `4.5s`/`4s` timing in reduced-motion mode;
  only the `650ms` opacity animation is removed by CSS.
- Focused `390x844` browser verification passed on `/yubiley/`: active slide
  changed from `01-smile` to `02-stage` after `5.2s`, computed transition
  duration was `0s`, horizontal overflow and console errors were `0`.

## Release

- Runtime commit: `b3dc378` on `main`.
- GitHub `Code health` and `Deploy to gh-pages` completed successfully.
- Fresh live checks passed at `1440x900` and `390x844`: five slides, square non-zero media frame, AVIF current source, preserved Jubilee H1 and zero horizontal overflow.
- Live autoplay advanced from `01-smile` to `02-stage`; AVIF/WebP assets returned HTTP `200` with correct MIME types; browser console errors: `0`.
