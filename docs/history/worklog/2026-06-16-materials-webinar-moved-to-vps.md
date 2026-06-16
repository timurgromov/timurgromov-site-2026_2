# 2026-06-16 - Materials webinar moved to VPS

## Summary

- Moved the `/materials/` webinar video from Boomstream to the site media VPS.
- Replaced the webinar cover with a local black-and-white poster derived from the approved first photo.
- Documented exactly where the `/materials/` webinar file lives and which records must be updated next time.

## Changes

- Uploaded `materials_webinar_online_razbor_20260616.mp4` to `/srv/tg26-video/public` on media VPS `89.22.227.133`.
- Switched both `/materials/` webinar records in `files/page62008353body.html` from Boomstream to `https://media.89-22-227-133.sslip.io/materials_webinar_online_razbor_20260616.mp4`.
- Replaced both webinar covers with:
  - `public/images/materials-poster.jpg`
  - `public/images/materials-poster-20.jpg`
- Updated `docs/video-link-registry.md` and `docs/do-not-break-this-site.md` so the next upload path and source-of-truth are explicit.

## Source Of Truth

- Media VPS path: `/srv/tg26-video/public`
- Public media host: `https://media.89-22-227-133.sslip.io`
- `/materials/` webinar records:
  - `rec861962232`
  - `rec862050095`

## Verification

- Verified the file exists on VPS: `ls -lh /srv/tg26-video/public/materials_webinar_online_razbor_20260616.mp4`
- Verified the public URL returns `200` with `Accept-Ranges: bytes`
- `npm run build`
- `npm run verify:materials-baseline`
- `git diff --check`
