# 2026-06-17 - Materials Desktop CTA Buttons Overlay

## Context

On `/materials/#materials-followup-cta` the CTA links existed in markup, but on desktop the buttons were visually absent: only `Написать в MAX` text and arrow could be seen in production screenshots.

## Root Cause

Desktop diagnostics showed both CTA anchors had valid geometry, but `document.elementFromPoint()` at the button centers returned `rec862055949 .t396__filter` from the next Tilda/Zero block. The following block was overlapping the CTA layer, so DOM visibility checks were misleading.

## Change

- Kept the existing shared `tildaCtaLink()` button markup.
- Added explicit button plate rendering fallback on the anchors.
- Raised `.tg-plan-cta` above the neighboring Tilda filter with `position: relative`, `z-index`, and `isolation`.

## Verification

- `npm run build` passed.
- Local desktop 1440px CDP screenshot showed both CTA buttons visible.
- `elementFromPoint()` at both button centers now returns the CTA button plate/link instead of the Tilda filter.
