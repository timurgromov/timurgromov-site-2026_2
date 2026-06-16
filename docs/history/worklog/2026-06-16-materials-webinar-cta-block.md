# 2026-06-16 - Materials webinar CTA block

## Summary

- Added a dedicated CTA block on `/materials/` for the webinar funnel step: watch the webinar, then write personally to get the extended preparation notes.

## Changes

- Inserted a custom orange CTA section in `src/pages/materials.astro` between the webinar block and the next materials section.
- Reused the shared split-button visual language from the main site through the `tg-tilda-cta` pattern instead of inventing a new button style.
- Kept the implementation outside the fragile webinar Zero Block geometry so the video/cards composition stays untouched.
- Added two direct actions inside the block:
  - `Написать в Telegram`
  - `Написать в MAX`
- Added copy that explains what to write in the personal message and what material the user gets back.

## Verification

- `npm run verify:materials-baseline`
- Local visual check on `http://127.0.0.1:4321/materials/` at desktop and mobile sizes confirmed:
  - the webinar top composition still renders
  - the new CTA block appears as a separate orange section under the webinar materials area
