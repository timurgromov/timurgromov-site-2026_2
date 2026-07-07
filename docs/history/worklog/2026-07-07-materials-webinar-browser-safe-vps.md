# 2026-07-07 - Materials webinar browser-safe VPS file

## Context

Owner reported that `/materials/` showed a black screen after pressing play. The site was linked to the media VPS, but the old webinar MP4 could stall in browser playback while direct HTTP/range checks still passed.

## Changes

- Re-encoded the webinar into a browser-safe MP4:
  - file: `materials_webinar_online_razbor_20260707_browser.mp4`
  - H.264 Main + AAC LC
  - 1280x720
  - SAR 1:1 / DAR 16:9
  - 25 fps
  - `faststart`
  - about 54 MB
- Uploaded the new MP4 to media VPS `89.22.227.133`:
  - server path: `/srv/tg26-video/public/materials_webinar_online_razbor_20260707_browser.mp4`
  - public URL: `https://media.89-22-227-133.sslip.io/materials_webinar_online_razbor_20260707_browser.mp4`
- Switched both `/materials/` webinar records in `files/page62008353body.html` from the old `20260616` file to the new `20260707_browser` file.
- In `src/pages/materials.astro`, changed webinar playback state so the inline `<video>` remains hidden until the browser has a decoded frame. This prevents a stalled video load from replacing the poster with a black rectangle.
- Stored the current media VPS root password locally in macOS Keychain on Ruslan's Mac as an internet password:
  - server: `89.22.227.133`
  - account: `root`
  - protocol: `ssh`
  - the password is not stored in git or docs.
- Updated `docs/video-link-registry.md` and `docs/do-not-break-this-site.md`.

## Verification

- Confirmed the old file existed on VPS and the new file was uploaded.
- Confirmed `tg26-video-caddy` is running.
- Confirmed the new public MP4 returns `206 Partial Content` with byte ranges.
- Confirmed `ffprobe` on the public URL reports H.264/AAC, 1280x720, SAR 1:1, 25 fps.
- Confirmed Chrome can play the new public MP4: `readyState: 4`, `playing`, decoded frames present.
- `npm run build` passed.
- `npm run verify:materials-baseline` passed.
- `npm run verify:materials-layout` passed.

## Follow-up

- Commit, push to `main`, wait for GitHub Pages deploy, then verify live `/materials/` contains `materials_webinar_online_razbor_20260707_browser.mp4`.
