# 2026-06-17 - Responsive /materials/ footer tail height

## Context

Live `/materials/` still showed a large white area under the orange footer on a 1440px desktop viewport after the previous `846px` footer-height fix.

## Root Cause

The previous fix used one forced `846px` footer height for the full `1200..1919` desktop range. That height matched the orange footer bottom at `1911px`, but at `1440px` the scaled orange footer shape ended about `209px` earlier, leaving the remaining footer artboard area white.

## Change

- Replaced the fixed `846px` footer height in the `1200..1919` media range with `clamp(531px, 44.25vw, 846px)`.
- Extended only the orange footer shape atom by `8px` in the same desktop range to absorb browser/Tilda rounding differences without changing the record layout.
- Kept the existing footer record, shifted footer elements, hidden photo/menu layers, and mobile footer hardening unchanged.

## Verification Plan

- `npm run verify:materials-baseline`
- Local Playwright geometry check at `1200`, `1440`, `1911`, and `390`.
- After push, production `/materials/` check at the same desktop risk viewports.
