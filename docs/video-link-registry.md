# Video Link Registry

Last checked: 2026-08-20.

This file is the canonical list of video sources for the production site. Keep it in sync when changing video URLs in `src/pages/index.astro` or `/materials/` video records in `files/page62008353body.html`.

Current public site: `https://timurgromov.ru/`

GitHub Pages fallback: `https://timurgromov.github.io/timurgromov-site-2026_2/`

## Current Active Sources

During the Aeza incident, available active videos are served from the isolated backup container on `open-blue`:

`https://media.213-176-94-245.sslip.io`

The current files are already heavily compressed RF files. Do not re-encode again "just to optimize". Only create new variants after a concrete visual/performance reason and Safari testing.

| Place | Active provider | Active URL |
| --- | --- | --- |
| Hero desktop | Backup VPS media | `https://media.213-176-94-245.sslip.io/hero_desc_RF28.mp4` |
| Hero mobile | Backup VPS media | `https://media.213-176-94-245.sslip.io/hero_mob_RF28.mp4` |
| Case preview: Komo | Backup VPS media | `https://media.213-176-94-245.sslip.io/demo_komoRF28.mp4` |
| Case preview: Morozovka | Backup VPS media | `https://media.213-176-94-245.sslip.io/demo_morozRF28_576.mp4` |
| Case preview: Toscana | Backup VPS media | `https://media.213-176-94-245.sslip.io/demo_toscanaRF28.mp4` |
| Case preview: Nemchinovka / Kolizei | Backup VPS media | `https://media.213-176-94-245.sslip.io/demo_nemchRF28_576.mp4` |
| Popup: showreel | Backup VPS media | `https://media.213-176-94-245.sslip.io/morozovkaRF24.mp4` |
| Popup: Komo | Backup VPS media | `https://media.213-176-94-245.sslip.io/KomoRF26.mp4` |
| Popup: Morozovka | Backup VPS media | `https://media.213-176-94-245.sslip.io/morozovkaRF24.mp4` |
| Popup: Toscana | Backup VPS media | `https://media.213-176-94-245.sslip.io/ToscanaRF26.mp4` |
| Popup: Nemchinovka / Kolizei | Backup VPS media | `https://media.213-176-94-245.sslip.io/NemchinovkaRF28.mp4` |
| Review popup: Anton and Kristina | Backup VPS media | `https://media.213-176-94-245.sslip.io/review_anton_kristina_RF.mp4` |
| Review popup: Temur and Yana | Primary VPS unavailable | pending source recovery |
| Review popup: Katya and Zhenya | Primary VPS unavailable | pending source recovery |
| Review popup: Anton and Leia | Primary VPS unavailable | pending source recovery |
| Advice popup: wedding laughter | Backup VPS media | `https://media.213-176-94-245.sslip.io/tg26_advice_wedding_laughter_20260602.mp4` |
| Advice popup: awkward toasts | Backup VPS media | `https://media.213-176-94-245.sslip.io/tg26_advice_awkward_toasts_20260602.mp4` |
| Advice popup: wedding chaos | Backup VPS media | `https://media.213-176-94-245.sslip.io/tg26_advice_wedding_chaos_20260602.mp4` |
| Materials webinar | Backup VPS media | `https://media.213-176-94-245.sslip.io/materials_webinar_online_razbor_20260707_browser.mp4` |
| Materials popup 1: wedding budget plan | Backup VPS media | `https://media.213-176-94-245.sslip.io/materials_popup_1_20260617.mp4` |
| Materials popup 2: guest fears | Backup VPS media | `https://media.213-176-94-245.sslip.io/materials_popup_2_20260617.mp4` |
| Materials popup 3: host tasks | Backup VPS media | `https://media.213-176-94-245.sslip.io/materials_popup_3_20260617.mp4` |
| Materials popup 4: restaurant choice | Backup VPS media | `https://media.213-176-94-245.sslip.io/materials_popup_4_20260617.mp4` |
| Materials popup 5: 20 guests wedding | Backup VPS media | `https://media.213-176-94-245.sslip.io/materials_popup_5_20260617.mp4` |
| Materials popup 6: international weddings | Backup VPS media | `https://media.213-176-94-245.sslip.io/materials_popup_6_20260617.mp4` |

## VPS Media Host

Temporary incident host (active from 2026-08-20):

- Host/IP: `213.176.94.245` (`open-blue`)
- Media URL: `https://media.213-176-94-245.sslip.io`
- Server path: `/srv/tg26-media-backup/public`
- Container: `tg26-media-backup`, bound to `127.0.0.1:8092`
- Public edge: separate host-nginx vhost with Let's Encrypt; PastLife vhost and containers are unchanged
- Provisioning: `scripts/setup-media-backup-open-blue.sh` and `scripts/configure-media-backup-open-blue.sh`

Primary media host below remains the source of truth to recover after Aeza repairs its network.

This is a migration, not a proxy/stream relay. The MP4 files were copied from previous storage to the VPS and are served directly from the VPS media directory.

This host now contains the active public-site videos for both the homepage and the `/materials/` webinar and popup videos.

- Host/IP: `89.22.227.133`
- SSH user: `root`
- SSH command: `ssh root@89.22.227.133`
- Media URL: `https://media.89-22-227-133.sslip.io`
- Server path: `/srv/tg26-video/public`
- Container: `tg26-video-caddy`
- Web server: Caddy in a separate Docker container
- Password/private access: do not commit to this repo. On Ruslan's Mac, the current root password is stored in macOS Keychain as an internet password with server `89.22.227.133`, account `root`, protocol `ssh`. Use Keychain Access or an approved local credential helper; never paste this password into docs, git commits, `.env`, shell history, or chat logs.

The VPS is separate from the existing proxy setup. Do not mix media files into proxy containers or change unrelated services.

Expected media behavior:

- MP4 files answer byte-range requests with `206 Partial Content`.
- Headers include `Accept-Ranges: bytes`, `Content-Type: video/mp4`, cache headers, and permissive CORS.
- MP4 files should be `faststart` so Safari can start playback without downloading the whole file.

Useful checks:

```bash
curl -I -H "Range: bytes=0-1" https://media.89-22-227-133.sslip.io/hero_desc_RF28.mp4
ssh root@89.22.227.133 "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
ssh root@89.22.227.133 "ls -lh /srv/tg26-video/public"
```

`/materials/` webinar source of truth:

- HTML records: `rec861962232` and `rec862050095` inside `files/page62008353body.html`
- Current VPS file: `materials_webinar_online_razbor_20260707_browser.mp4`
- Current file parameters: H.264 Main + AAC LC, 1280x720, SAR 1:1 / DAR 16:9, 25 fps, `faststart`, about 54 MB.
- Current poster files: `public/images/materials-poster.jpg` and `public/images/materials-poster-20.jpg`
- If the webinar file changes, replace both `data-mp4video` values in those two records and keep this registry in sync.

`/materials/` lower popup source of truth:

- Popup shell records: `rec893268511`, `rec893271079`, `rec893273557`, `rec893275111`, `rec893277967`, `rec893280313`
- Popup video records: `rec893268655`, `rec893271232`, `rec893273581`, `rec893275240`, `rec893278048`, `rec893281054`
- Published links are patched in `src/pages/materials.astro` via `materialsAdvicePopupVideoUrls`.
- The original Tilda export still contains old Boomstream `data-mp4video` values for these six records; do not rely on those export values for production.
- If any lower popup video changes, update `materialsAdvicePopupVideoUrls` and keep this registry in sync.

## Emergency VPS Migration Runbook

Use this if the current media VPS becomes unavailable or video delivery needs to move quickly to another VPS. The goal is to recreate the same simple setup: static MP4 files served by Caddy with byte-range support and Safari-friendly headers.

Do not move these files to Cloud.ru S3/Object Storage as the primary video source without a fresh Safari test. The current stable setup is VPS + Caddy, not object storage.

### 1. Pick The New Host

Any VPS is acceptable if it can serve HTTPS reliably to the target audience. Preferred order:

1. International VPS with good routing for users with and without VPN.
2. Cloud.ru VPS as a controlled fallback.
3. Object Storage only as a temporary transfer source, not the final playback host.

Record the new public IP and choose a temporary media host:

```text
https://media.NEW-IP-WITH-DASHES.sslip.io
```

Example for `203.0.113.10`:

```text
https://media.203-0-113-10.sslip.io
```

### 2. Prepare The New VPS

Install Docker, create the media directory, and keep it separate from unrelated proxy/VPN services.

```bash
mkdir -p /srv/tg26-video/public
mkdir -p /srv/tg26-video/caddy
```

Create `/srv/tg26-video/caddy/Caddyfile` on the new VPS:

```caddyfile
media.NEW-IP-WITH-DASHES.sslip.io {
  root * /srv/tg26-video/public

  header {
    Access-Control-Allow-Origin "*"
    Access-Control-Allow-Methods "GET, HEAD, OPTIONS"
    Access-Control-Allow-Headers "Range"
    Access-Control-Expose-Headers "Accept-Ranges, Content-Length, Content-Range, Content-Type"
    Cache-Control "public, max-age=31536000, immutable"
  }

  file_server
}
```

Start Caddy in its own container:

```bash
docker run -d \
  --name tg26-video-caddy \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  -v /srv/tg26-video/public:/srv/tg26-video/public:ro \
  -v /srv/tg26-video/caddy/Caddyfile:/etc/caddy/Caddyfile:ro \
  -v tg26-video-caddy-data:/data \
  -v tg26-video-caddy-config:/config \
  caddy:2
```

If ports `80` or `443` are already used by another reverse proxy on the VPS, do not change unrelated services blindly. Either route the media hostname through the existing proxy or choose a clean VPS.

### 3. Copy The Current Media Files

From the new VPS, copy the current media directory from the old VPS:

```bash
rsync -avz root@89.22.227.133:/srv/tg26-video/public/ /srv/tg26-video/public/
```

If `rsync` is not installed:

```bash
apt-get update
apt-get install -y rsync
```

Do not commit VPS passwords, private keys, tokens, or shell history with secrets to this repository.

### 4. Verify The New Host Before Switching The Site

Run these checks against the new media URL:

```bash
curl -I https://media.NEW-IP-WITH-DASHES.sslip.io/hero_desc_RF28.mp4
curl -I -H "Range: bytes=0-1" https://media.NEW-IP-WITH-DASHES.sslip.io/hero_desc_RF28.mp4
curl -I -H "Range: bytes=0-1" https://media.NEW-IP-WITH-DASHES.sslip.io/ToscanaRF26.mp4
```

Expected result for range checks:

- HTTP status: `206 Partial Content`
- `Accept-Ranges: bytes`
- `Content-Range: bytes 0-1/...`
- `Content-Type: video/mp4`
- cache headers are present
- CORS headers are present

Also open at least one hero file and one popup file directly in Safari desktop before switching the site.

### 5. Switch The Site

In `src/pages/index.astro`, update only:

```ts
const videoMediaBaseUrl = "https://media.NEW-IP-WITH-DASHES.sslip.io";
```

Then update this file and `docs/do-not-break-this-site.md` with the new host, path, and checks.

Run:

```bash
npm run build
npm run verify:contacts
npm run deploy:pages
```

After deploy, verify the published GitHub Pages HTML contains the new media host and test in Safari desktop:

```bash
curl -sS https://timurgromov.ru/ | rg "media.NEW-IP-WITH-DASHES.sslip.io"
```

### 6. Rollback

Rollback is just changing `videoMediaBaseUrl` back to:

```ts
const videoMediaBaseUrl = "https://media.89-22-227-133.sslip.io";
```

Then build and deploy again. Keep the old VPS alive until the new VPS is tested in Safari and the published page is confirmed.

## Hero Video Versions

| Version | Desktop URL | Mobile URL | Notes |
| --- | --- | --- | --- |
| Current VPS media | `https://media.89-22-227-133.sslip.io/hero_desc_RF28.mp4` | `https://media.89-22-227-133.sslip.io/hero_mob_RF28.mp4` | Active native hero source served by Caddy with byte ranges and faststart MP4 files. |
| Previous Cloud.ru object storage | `https://global.s3.cloud.ru/tg26video-public/hero_desc_RF28.mp4` | `https://global.s3.cloud.ru/tg26video-public/hero_mob_RF28.mp4` | Previous native hero source. Safari was inconsistent because this path answered full `200 OK` in situations where Safari expects reliable range behavior. |
| Boomstream replacement | `https://bs.boomstream.dev/balancer/RCIJ56KS-EuQeQgfF.mp4` | `https://bs.boomstream.dev/balancer/0VGkkqV8-EuQeQgfF.mp4` | Used in commit `81d6fd0`. Variable names still said `Cloud`, but URLs were Boomstream. |
| Legacy Annex/Tilda Boomstream | `https://cdnv.boomstream.com/balancer/p1VrFFDa-SxJPiQup.mp4` | same desktop file | Legacy hero record `rec861372811`; currently hidden. |

## Case Preview Versions

Case previews are the small autoplay clips inside `rec862347176`. Do not replace these with full popup videos.

Current implementation is native `<video class="case-preview-native-video">`, not Annex/Tilda. The Annex records `rec862376352`, `rec862385545`, `rec862392569`, and `rec862397203` are legacy records and should stay hidden while native previews are active. The VPS media URL stays in the video `src`, matching the hero-video approach. Case previews seek to `0.25s` before reveal to avoid black first frames; hero uses direct `src`, video preload, JS-started muted playback from `0`, and `requestVideoFrameCallback` for a faster first paint without advancing invisibly behind the poster. Desktop Safari gets extra retries on IntersectionObserver entry, media readiness events, scroll, wheel, pointer, keyboard, and tap/click so the small loops are started again when the case cards approach the viewport.

| Case | Original Boomstream URL in export | Boomstream replacement URL | Current VPS demo URL |
| --- | --- | --- | --- |
| Komo | `https://cdnv.boomstream.com/balancer/RCpP5hSc-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/N2LPspm9-jAhiWugB.mp4` | `https://media.89-22-227-133.sslip.io/demo_komoRF28.mp4` |
| Morozovka | `https://cdnv.boomstream.com/balancer/gk8znhXX-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/M05OCeUp-jAhiWugB.mp4` | `https://media.89-22-227-133.sslip.io/demo_morozRF28_576.mp4` |
| Toscana | `https://cdnv.boomstream.com/balancer/Lww7hY2N-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/Oumx0U4Z-jAhiWugB.mp4` | `https://media.89-22-227-133.sslip.io/demo_toscanaRF28.mp4` |
| Nemchinovka / Kolizei | `https://cdnv.boomstream.com/balancer/U7iCUgz4-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/gzJNWWi6-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/demo_nemchRF28_576.mp4` |

Legacy Annex case preview records:

- `rec862376352`
- `rec862385545`
- `rec862392569`
- `rec862397203`

## Popup / Full Video Versions

Popups use the custom clean popup layer in `src/pages/index.astro`. Full videos are for click popups only, not for autoplay previews.

Legacy Tilda showreel popup records `rec862614275`, `rec862592933`, and `rec862584405` must stay hidden while the clean popup is active. Do not inject another showreel video into those records, or `#popup:showreel` can open two players at once in Safari.

Legacy Tilda case-video popup records `rec862660772`, `rec862660859`, `rec862666264`, `rec862666433`, `rec862667392`, `rec862667414`, `rec862668031`, and `rec862668074` must also stay hidden. Their old Boomstream `data-mp4video` blocks duplicate the clean native popups for the same hooks.

Legacy Tilda review-video popup records `rec862674603`, `rec862674662`, `rec862683025`, `rec862683069`, `rec862685732`, `rec862685694`, `rec862687402`, and `rec862687388` must stay hidden too. The review cards remain in the original Tilda review carousel, but clicks are handled by the clean native popup layer.

| Popup | Legacy Boomstream URL found in export/history | Current VPS URL |
| --- | --- | --- |
| Showreel | `https://cdnv.boomstream.com/balancer/UtWkPqj2-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/morozovkaRF24.mp4` |
| Komo | `https://cdnv.boomstream.com/balancer/AKPfzEht-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/KomoRF26.mp4` |
| Morozovka | `https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/morozovkaRF24.mp4` |
| Toscana | `https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/ToscanaRF26.mp4` |
| Nemchinovka / Kolizei | `https://cdnv.boomstream.com/balancer/lsooq7dU-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/NemchinovkaRF28.mp4` |
| Review: Anton and Kristina | `https://cdnv.boomstream.com/balancer/lsooq7dU-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/review_anton_kristina_RF.mp4` |
| Review: Temur and Yana | Vimeo `1044577884` | `https://media.89-22-227-133.sslip.io/review_temur_margo_RF.mp4` |
| Review: Katya and Zhenya | Vimeo `1044588860` | `https://media.89-22-227-133.sslip.io/review_katya_zhenya_RF.mp4` |
| Review: Anton and Leia | Vimeo `1044579944` | `https://media.89-22-227-133.sslip.io/review_russian_cuban_RF.mp4` |
| Advice: wedding laughter | `https://cdnv.boomstream.com/balancer/roHksxqq-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/tg26_advice_wedding_laughter_20260602.mp4` |
| Advice: awkward toasts | `https://cdnv.boomstream.com/balancer/aszKpzRZ-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/tg26_advice_awkward_toasts_20260602.mp4` |
| Advice: wedding chaos | `https://cdnv.boomstream.com/balancer/qzinNGjh-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/tg26_advice_wedding_chaos_20260602.mp4` |
| Materials popup 1: wedding budget plan | `https://cdnv.boomstream.com/balancer/pCq9x3Jn-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/materials_popup_1_20260617.mp4` |
| Materials popup 2: guest fears | `https://cdnv.boomstream.com/balancer/rSg5jRyU-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/materials_popup_2_20260617.mp4` |
| Materials popup 3: host tasks | `https://cdnv.boomstream.com/balancer/r9seULNi-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/materials_popup_3_20260617.mp4` |
| Materials popup 4: restaurant choice | `https://cdnv.boomstream.com/balancer/RNUDagDY-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/materials_popup_4_20260617.mp4` |
| Materials popup 5: 20 guests wedding | `https://cdnv.boomstream.com/balancer/ytQQEk4L-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/materials_popup_5_20260617.mp4` |
| Materials popup 6: international weddings | `https://cdnv.boomstream.com/balancer/y8riDaTB-SxJPiQup.mp4` | `https://media.89-22-227-133.sslip.io/materials_popup_6_20260617.mp4` |

## Other Boomstream Links Found In Export

These links are present in historical/exported video blocks and may belong to hidden advice, materials, or old popup/video experiments. They are not the current active homepage case preview or popup mapping unless listed above.

- `https://cdnv.boomstream.com/balancer/RNUDagDY-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/aszKpzRZ-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/lsooq7dU-EuQeQgfF.mp4`
- `https://cdnv.boomstream.com/balancer/p1VrFFDa-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/pCq9x3Jn-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/qzinNGjh-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/r9seULNi-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/rSg5jRyU-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/roHksxqq-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/wl0fWsUN-EuQeQgfF.mp4`
- `https://cdnv.boomstream.com/balancer/y8riDaTB-SxJPiQup.mp4`
- `https://cdnv.boomstream.com/balancer/ytQQEk4L-SxJPiQup.mp4`

## Rules

- Case previews must use small demo files. Do not use `КomoRF26.mp4`, `moroяovkaRF24.mp4`, `ToscanaRF26.mp4`, or `NemchinovkaRF28.mp4` as previews.
- Full VPS media files belong to popups opened by user click.
- Hero uses its own VPS media desktop/mobile files, not case videos.
- When changing a URL in `src/pages/index.astro`, update this document and `docs/do-not-break-this-site.md`.
- Never store VPS passwords or private keys in this repository.
