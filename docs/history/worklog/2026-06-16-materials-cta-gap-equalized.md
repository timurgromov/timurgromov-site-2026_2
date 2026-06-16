# 2026-06-16 - Equalize webinar-to-CTA spacing on /materials/

## Context

The gap above the follow-up CTA on `/materials/` was visibly larger than the gap below the CTA before the next section. The mismatch was visible on both mobile and desktop.

## Change

- reduced the patched webinar record heights in `src/pages/materials.astro` so the extracted Tilda webinar block keeps less empty reserved space below its visible content;
- reduced only the top padding of the custom follow-up CTA on desktop, tablet, and mobile;
- kept the CTA markup, buttons, and next section geometry unchanged.

## Why

The goal was to make the gap between the webinar block and the CTA visually consistent with the gap between the CTA and the next section, without introducing negative margins or a custom page rebuild.

## Verification

- pending `npm run build`
- pending `npm run verify:materials-baseline`
- pending production check
