# 2026-06-13 - Fix advice video popup forced portrait ratio

## Scope

- `src/pages/index.astro`
- `docs/do-not-break-this-site.md`

## Context

Advice video popups still showed black side fields and oversized title text after the previous portrait layout pass. The issue was not the white panel itself; the JS still derived CSS `aspect-ratio` from `video.videoWidth / video.videoHeight`. The current VPS advice files are intended as Reels-style portrait videos and report `display_aspect_ratio=9:16`, but their raw stream dimensions / SAR are non-standard.

Observed via `ffprobe`:

- `tg26_advice_wedding_laughter_20260602.mp4`: `1080x1080`, `SAR 9:16`, `DAR 9:16`
- `tg26_advice_awkward_toasts_20260602.mp4`: `1080x720`, `SAR 3:8`, `DAR 9:16`
- `tg26_advice_wedding_chaos_20260602.mp4`: `1080x720`, `SAR 3:8`, `DAR 9:16`

## Changes

- For `#popup:video-sovet-*`, forced `aspect-ratio: 9 / 16` instead of deriving from raw video dimensions.
- Kept portrait video/media boxes equal, with transparent video background and `object-fit:cover`, so the player does not create black side fields.
- Reduced portrait title sizes:
  - desktop: `43px -> 30px`
  - tablet: `27px -> 24px`
  - mobile: `20px -> 18px`
- Made portrait media width constrained by available viewport height, not by a separate `max-height` on the video element.
- Added fragile-rule note to `docs/do-not-break-this-site.md`.

## Verification

- `npm run build` passed.
- Browser visual check, desktop `1440x900`, `#popup:video-sovet-1`:
  - panel `514x838`
  - media `382x679`
  - video `382x679`
  - forced aspect `9 / 16`
  - title font `30px`
  - panel fits viewport
- Browser visual check, mobile `390x844`, `#popup:video-sovet-1`:
  - panel `300x559`
  - media `270x480`
  - video `270x480`
  - forced aspect `9 / 16`
  - title font `18px`
  - panel fits viewport

## Result

Advice video popup is again a single white portrait card with the vertical player sized to the video display ratio. The black side fields from the wrong CSS box are removed, and the title is smaller and contained inside the card.
