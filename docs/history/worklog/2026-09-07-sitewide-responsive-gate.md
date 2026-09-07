# Sitewide responsive repair and release gate

Date: 2026-09-07
Scope: public site only; homepage Hero, privacy page, responsive QA and GitHub Pages release checks.

## Root cause

The homepage Tilda export has native Zero Block canvases at 320, 640 and 1200 px. Between those canvases Tilda scaled absolute coordinates instead of switching to a bounded physical layout. The reported windowed-browser failure reproduced at 1199x650 with `--zoom:1.873`, a 1461 px Hero, overlapping copy/CTA and navigation outside the viewport. The same mechanism produced `--zoom:1.997` and a 1098 px Hero at 639x900.

## Changes

- Added a Hero-only physical CSS layout for 480–1199 px, split into portrait/wide-mobile/tablet and windowed-landscape compositions at 1024 px.
- Kept the existing narrow-mobile layout below 480 px and native desktop layout from 1200 px.
- Removed Tilda scaling from the affected Hero range with a high-specificity `--zoom:1`/artboard override; preserved the video/poster, burger, copy and split CTA behavior.
- Fixed `/privacy/` heading overflow at 390 and 640 px with fluid mobile/tablet typography.
- Added auto-discovered all-page responsive checks and a local preview wrapper.
- Added the same gate to PR/main code health and before GitHub Pages publication.

## Verification

- `npm run verify:responsive-layout`: PASS, 9 routes × 18 viewports = 162 fresh route/viewport cases.
- Independent `responsive-qa-gate`: PASS, 20 points including interval representatives and `B-1/B/B+1` around 480/640/1024/1200; no horizontal overflow, Hero and CTA present.
- Live in-app browser: visually checked every route at 1199x650; additionally checked the homepage at 768x1024, 1024x768, 1199x650 and 639x900, and `/privacy/` at 390x844.
- CTA action: PASS; the Hero scenario CTA opens `#plan-delivery-popup` as a full-viewport dialog.
- Console classification: the independent local sweep reports the expected unavailable attribution request to `127.0.0.1:8000`; the repository gate also reports three pre-existing Tilda initialization errors on `/materials/` as non-blocking warnings in all 18 tested sizes. The fresh homepage run at 1199x650 has `runtimeErrors=[]`; neither warning class changes the verified rendered geometry or CTA interaction.
