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

Production release and fresh live verification are pending.
