# 2026-08-20 — Temporary media backup on open-blue

## Incident

Aeza VPS `#1777264 outstanding-blue` boots but resets incoming SSH, HTTP and HTTPS after the provider maintenance window. The primary media host `media.89-22-227-133.sslip.io` is unavailable.

## Recovery

- Created isolated Docker container `tg26-media-backup` on VPS `open-blue` (`213.176.94.245`).
- Bound the container only to `127.0.0.1:8092`; existing PastLife containers and database were not changed.
- Added a separate host-nginx vhost and Let's Encrypt certificate for `media.213-176-94-245.sslip.io`.
- Copied Hero, case previews, case/showreel popups, Anton/Kristina review, advice videos, six materials popups and the materials webinar source into `/srv/tg26-media-backup/public`.
- Recovered the remaining three review MP4 files directly from the intact disk of `outstanding-blue` over the working IPv6 route and copied them to the same backup directory.
- Switched the Astro homepage and `/materials/` runtime mappings to the temporary media host.

## Verification

- Container internal Hero request returns `206 Partial Content`.
- Public HTTP and HTTPS Hero desktop/mobile requests return `206 Partial Content`, `Content-Type: video/mp4`, CORS and cache headers.
- `npm run build` and `npm run verify:materials-baseline` pass.
- GitHub Pages deploy for commit `45af6bf` completed successfully.
- Live desktop `1440x900`: Hero uses the backup desktop MP4, `readyState=4`, `paused=false`, decoded size `1280x720`.
- Live mobile `390x844`: Hero uses the backup mobile MP4, `readyState=4`, `paused=false`, decoded size `406x720`.
- Live `/materials/`: the webinar starts from the backup host with `readyState=4`, `paused=false`, decoded size `1280x720`; all six lower popup records contain backup-host URLs.
- Public range checks for all four review files return `206 Partial Content`.
- Live review popups for Anton/Kristina, Temur/Yana, Katya/Zhenya and Anton/Leia each use the backup host, reach `readyState=4`, play with `paused=false`, decode at 720p and report no media error.
- The temporary transfer account and key were removed after the copy; recovered files are owned by `root:root` on `open-blue`.

## Recovery source and rollback

- The original review files remain intact on `outstanding-blue` in `/srv/tg26-video/public`; the active copies now also exist on `open-blue` in `/srv/tg26-media-backup/public`.
- IPv4 on `outstanding-blue` remained unavailable, but its configured IPv6 route worked and reached `open-blue` directly.
- Do not switch `videoMediaBaseUrl` back until the primary host passes full range and live playback verification again.
