# 2026-06-16 - Materials scroll motion and play overlay restored

## Summary

- Restored the visible play overlay on the `/materials/` webinar cover.
- Restored the webinar right-column motion logic so the cards use the intended horizontal/fixed scroll behavior again instead of simply falling down the page.

## Changes

- Left the Tilda-record extraction baseline intact in `src/pages/materials.astro`.
- Re-enabled the webinar play overlay with a late override so it wins over the source Tilda CSS that hides `.tn-atom__video-play-link`.
- Added a small manual webinar scroll controller in `src/pages/materials.astro` that reads the original `data-animate-fix-*` and `data-animate-sbs-*` attributes from the Tilda records and reapplies the fixed/horizontal motion in the Astro shell.
- Documented the fragile `/materials/` webinar IDs and the fallback rule in `docs/do-not-break-this-site.md`.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`
- Direct local CDP check against `http://127.0.0.1:4321/materials/` confirmed:
  - play overlay is visible again
  - webinar cards enter the restored scroll state and keep their left-shifted release position instead of only scrolling downward
