# 2026-06-18 - Homepage hero portrait first frame

## Context

The homepage hero video worked as the main atmospheric first screen, but the first visible frame did not give a clear immediate portrait/contact with Timur. The owner wanted to test a short portrait-first moment before the video, without returning to a heavy separate intro screen and without breaking the existing single-poster hero setup.

## Changes

- Added two optimized grayscale poster assets from the owner-provided microphone photo:
  - `public/images/hero-portrait-poster-desktop.jpg`
  - `public/images/hero-portrait-poster-mobile.jpg`
- Switched the active hero poster URLs in `src/pages/index.astro` to the new portrait assets with cache version `20260618a`.
- Kept the existing single visible poster layer: `#hero-preload-overlay`.
- Added `heroMinimumPosterMs = 1600`, counted from the moment the hero record is actually bound, so the portrait poster remains visible briefly before the video can reveal.
- Added `scheduleHeroPosterBind()` on `DOMContentLoaded`, short retries, and `load`, so the native hero video binds reliably even when external media preload delays `load`.
- Updated `docs/do-not-break-this-site.md` to document the active portrait poster files, minimum poster timing, and bind hardening.

## Verification

- `npm run build` passed.
- Local preview `http://127.0.0.1:4321/` checked with headless Chrome/Playwright fallback.
- Visual screenshots checked:
  - `390x844` early poster: mobile crop shows Timur's face/microphone, no horizontal overflow.
  - `1366x768` early poster: desktop composition remains readable.
  - `1440x900` early poster: desktop composition remains readable.
  - `1984x1046` early poster: wide desktop composition remains readable.
- DOM/video checks:
  - mobile `390x844`: `scrollWidth=390`, video bound, `hero_mob_RF28.mp4` selected, mobile poster selected.
  - desktop `1440x900`: video bound, `hero_desc_RF28.mp4` selected, `readyState=4`.
  - desktop after ~2.5s: record had `hero-video-started hero-preload-hidden`, overlay opacity `0`, video opacity `1`, video playing.

## Rollback

Rollback is a normal git revert of the commit that introduced this work. The old `public/images/hero-poster-desktop.jpg` and `public/images/hero-poster-mobile.jpg` files were not overwritten.
