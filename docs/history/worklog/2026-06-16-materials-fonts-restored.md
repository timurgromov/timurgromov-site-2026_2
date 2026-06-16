# 2026-06-16 - Materials page fonts restored to Tilda stack

## Summary

- Restored `/materials/` typography to the same Tilda font model used by the original page and the main site.

## Changes

- Removed the temporary `Impact` / `Arial Narrow` heading stack from `src/pages/materials.astro`.
- Added explicit `Coolvetica` font-face declarations using the original Tilda CDN font files.
- Added the original `Manrope` Google Fonts stylesheet for body text.
- Added `--t-headline-font` and `--t-text-font` variables on the native Astro page and routed heading/body typography through them.

## Verification

- `npm run build`
- `git diff --check`
- `rg` confirmed `Impact` and `Arial Narrow` are absent from `src/pages/materials.astro`.
- In-app browser computed styles confirmed `h1` and the benefits label use `Coolvetica` weight `500`; page text uses `Manrope`.
- Headless Chrome desktop screenshot saved to `/tmp/materials-font-fixed-desktop.png`.
