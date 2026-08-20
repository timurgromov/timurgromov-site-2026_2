# 2026-08-20 — Temporary media backup on open-blue

## Incident

Aeza VPS `#1777264 outstanding-blue` boots but resets incoming SSH, HTTP and HTTPS after the provider maintenance window. The primary media host `media.89-22-227-133.sslip.io` is unavailable.

## Recovery

- Created isolated Docker container `tg26-media-backup` on VPS `open-blue` (`213.176.94.245`).
- Bound the container only to `127.0.0.1:8092`; existing PastLife containers and database were not changed.
- Added a separate host-nginx vhost and Let's Encrypt certificate for `media.213-176-94-245.sslip.io`.
- Copied Hero, case previews, case/showreel popups, Anton/Kristina review, advice videos, six materials popups and the materials webinar source into `/srv/tg26-media-backup/public`.
- Switched the Astro homepage and `/materials/` runtime mappings to the temporary media host.

## Verification

- Container internal Hero request returns `206 Partial Content`.
- Public HTTP and HTTPS Hero desktop/mobile requests return `206 Partial Content`, `Content-Type: video/mp4`, CORS and cache headers.
- Run `npm run build`, focused verification and live desktop/mobile playback checks before considering the recovery complete.

## Known gap and rollback

- Three review files exist only on the unavailable primary VPS: `review_temur_margo_RF.mp4`, `review_katya_zhenya_RF.mp4`, `review_russian_cuban_RF.mp4`.
- When Aeza restores `outstanding-blue`, either copy those files to the backup host or switch `videoMediaBaseUrl` back after full range/playback verification.
