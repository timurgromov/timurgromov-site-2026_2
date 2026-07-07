# 2026-07-07 - Materials popup VPS links

## Context

The `/materials/` webinar had already been moved to the browser-safe VPS file, but the six lower Tilda popup videos still used legacy Boomstream `data-mp4video` URLs from the exported Tilda records.

The media files were not missing from the VPS. They were present in `/srv/tg26-video/public` as:

- `materials_popup_1_20260617.mp4`
- `materials_popup_2_20260617.mp4`
- `materials_popup_3_20260617.mp4`
- `materials_popup_4_20260617.mp4`
- `materials_popup_5_20260617.mp4`
- `materials_popup_6_20260617.mp4`

## Changes

- Added `materialsAdvicePopupVideoUrls` in `src/pages/materials.astro`.
- Patched the six active lower popup video records during `/materials/` assembly so production uses the VPS URLs, not the legacy Boomstream URLs embedded in the Tilda export.
- Updated `docs/video-link-registry.md` with the six lower `/materials/` popup URLs and record mapping.
- Updated `docs/do-not-break-this-site.md` with the lower popup media source-of-truth rule.

## Checks

- VPS range checks returned `206 video/mp4` for all six `materials_popup_*` files and the current webinar file.
- `npm run build` passed.
- `npm run verify:materials-baseline` passed.
- `npm run verify:materials-layout` passed with escalated permissions because local preview cannot bind in the managed sandbox.
- Built `dist/materials/index.html` contains:
  - `materials_webinar_online_razbor_20260707_browser.mp4`
  - `materials_popup_1_20260617.mp4` ... `materials_popup_6_20260617.mp4`
- Built `dist/materials/index.html` no longer contains the old `/materials/` popup Boomstream filenames:
  - `pCq9x3Jn-SxJPiQup.mp4`
  - `rSg5jRyU-SxJPiQup.mp4`
  - `r9seULNi-SxJPiQup.mp4`
  - `RNUDagDY-SxJPiQup.mp4`
  - `ytQQEk4L-SxJPiQup.mp4`
  - `y8riDaTB-SxJPiQup.mp4`

## Notes

The original Tilda export still contains the old Boomstream URLs. That is expected. Production `/materials/` must be checked against the Astro-built output, where these URLs are patched to the VPS media host.
