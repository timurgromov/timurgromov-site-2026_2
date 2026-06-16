# 2026-06-16 - Materials manual scroll rollback

## Summary

- Rolled back the custom `/materials/` webinar scroll controller that was re-positioning Zero Block elements after load and breaking the top composition.
- Kept the restored webinar `Play` overlay intact.

## Changes

- Removed the manual webinar scroll runtime script from `src/pages/materials.astro`.
- Kept the late CSS override that forces `.tn-atom__video-play-link` back to visible state for the webinar cover.
- Updated `docs/do-not-break-this-site.md` so the safe rule is explicit: do not add runtime scroll controllers to the webinar Zero Block.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`
- Local visual check on `http://127.0.0.1:4321/materials/` at desktop and mobile sizes confirmed:
  - the webinar/video block no longer pushes the right-side cards downward into a broken stack
  - the visible `Play` overlay remains on the webinar cover
