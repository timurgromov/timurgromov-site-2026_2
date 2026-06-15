# 2026-06-15 - Homepage inserted section spacing unified

## Summary
- Unified the vertical padding of the two custom homepage sections inserted between Tilda records so the main page reads with a steadier inter-block rhythm.

## Changes
- Added shared spacing tokens for inserted homepage sections in `src/pages/index.astro`.
- Moved both `План-сценарий свадебного вечера` and `Бесплатная консультация` sections to the same vertical padding values on desktop, tablet, and mobile.
- Left the original Tilda Zero records untouched to avoid risky geometry changes inside the export itself.

## Verification
- `npm run build`
