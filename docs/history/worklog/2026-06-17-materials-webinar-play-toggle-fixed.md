# 2026-06-17 - Fix /materials/ webinar play overlay state

## Context

On `/materials/`, the webinar play button stayed visible over the video after playback started. The same inline webinar also needed tap-to-pause and tap-to-resume behavior because native controls were not a good fit for the current poster/video composition.

## What changed

- In `src/pages/materials.astro`:
  - replaced the unconditional webinar `.tn-atom__video-play-link` restore with state-based CSS;
  - added a scoped toggle only for webinar records `rec861962232` and `rec862050095`;
  - track `tg-webinar-video-playing` and `tg-webinar-video-paused` on the exact Tilda video elements;
  - disable native video controls and pointer events on the inserted `<video>` so taps land on the Tilda video container;
  - removed the duplicate `materials-video-play-restore` style block from the generated body.
- In `docs/do-not-break-this-site.md`, documented that webinar play overlay must not be restored as always-visible forced CSS.

## Why

The broken layer was the previous forced CSS restore: `display:flex !important` kept the play overlay visible even after Tilda had started the MP4. The fix keeps the existing Tilda records and media source intact, but makes the overlay follow the actual video state.

## Verification

- `npm run verify:materials-baseline`
- Local desktop interaction check at `1440x900`:
  - before playback: play visible;
  - after tap/play: `tg-webinar-video-playing`, video `paused:false`, play hidden;
  - after second tap: `tg-webinar-video-paused`, video `paused:true`, play visible.
- Local mobile interaction check at `390x844`:
  - before playback: play visible;
  - after tap/play-start: `tg-webinar-video-playing`, play hidden;
  - after second tap: `tg-webinar-video-paused`, play visible.
