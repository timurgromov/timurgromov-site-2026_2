# 2026-06-17 - Restore lower advice popup autoplay on /materials/

## Context

On `/materials/`, the six lower advice cards still opened their native Tilda popup hooks, but the actual popup records had been removed earlier when cleaning up unrelated popup spillover. The user wanted the original behavior back: click a lower advice card, open the popup, and start the video immediately.

## What changed

- In `src/pages/materials.astro`:
  - restored only the six native Tilda popup record pairs for `#popup:video-soveti-1` through `#popup:video-soveti-6`;
  - kept the change narrowly scoped to `/materials/` so the previously removed unrelated popup/photo records stay absent;
  - added a small `enablePopupVideoAutoplay()` patch so each restored popup video record gets native Tilda `autoplay` and `mute` fields during extraction;
  - kept a narrow popup-open runtime fallback that tries to `play()` only for visible `video-soveti` popups.

## Why

The correct fix was not to rebuild popup behavior. The source-of-truth Tilda export already had the needed popup wrappers and video content records. `/materials/` only needed those exact records reattached and their video fields aligned with the expected autoplay behavior.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`
- Local in-app browser check on `http://127.0.0.1:4324/materials/`:
  - clicked `#popup:video-soveti-1`;
  - popup opened;
  - popup video reported `autoplay: true`, `paused: false`, `currentTime > 0`.
