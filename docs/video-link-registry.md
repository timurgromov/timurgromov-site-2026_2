# Video Link Registry

Last checked: 2026-05-08.

This file is the canonical list of video URLs that have been used on the site in Cloud.ru and Boomstream versions. Keep this file in sync when changing video sources.

## Current Active Sources

| Place | Active provider | Active URL |
| --- | --- | --- |
| Hero desktop | VPS media | `https://media.89-22-227-133.sslip.io/hero_desc_RF28.mp4` |
| Hero mobile | VPS media | `https://media.89-22-227-133.sslip.io/hero_mob_RF28.mp4` |
| Case preview: Komo | VPS media | `https://media.89-22-227-133.sslip.io/demo_komoRF28.mp4` |
| Case preview: Morozovka | VPS media | `https://media.89-22-227-133.sslip.io/demo_morozRF28_576.mp4` |
| Case preview: Toscana | VPS media | `https://media.89-22-227-133.sslip.io/demo_toscanaRF28.mp4` |
| Case preview: Nemchinovka / Kolizei | VPS media | `https://media.89-22-227-133.sslip.io/demo_nemchRF28_576.mp4` |
| Popup: showreel | VPS media | `https://media.89-22-227-133.sslip.io/morozovkaRF24.mp4` |
| Popup: Komo | VPS media | `https://media.89-22-227-133.sslip.io/KomoRF26.mp4` |
| Popup: Morozovka | VPS media | `https://media.89-22-227-133.sslip.io/morozovkaRF24.mp4` |
| Popup: Toscana | VPS media | `https://media.89-22-227-133.sslip.io/ToscanaRF26.mp4` |
| Popup: Nemchinovka / Kolizei | VPS media | `https://media.89-22-227-133.sslip.io/NemchinovkaRF28.mp4` |

## Hero Video Versions

| Version | Desktop URL | Mobile URL | Notes |
| --- | --- | --- | --- |
| Current VPS media | `https://media.89-22-227-133.sslip.io/hero_desc_RF28.mp4` | `https://media.89-22-227-133.sslip.io/hero_mob_RF28.mp4` | Active native hero source served by Caddy with byte ranges and faststart MP4 files. |
| Previous Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/hero_desc_RF28.mp4` | `https://global.s3.cloud.ru/tg26video-public/hero_mob_RF28.mp4` | Previous native hero source. |
| Boomstream replacement | `https://bs.boomstream.dev/balancer/RCIJ56KS-EuQeQgfF.mp4` | `https://bs.boomstream.dev/balancer/0VGkkqV8-EuQeQgfF.mp4` | Used in commit `81d6fd0`. Variable names still said `Cloud`, but URLs were Boomstream. |
| Legacy Annex/Tilda Boomstream | `https://cdnv.boomstream.com/balancer/p1VrFFDa-SxJPiQup.mp4` | same desktop file | Legacy hero record `rec861372811`; currently hidden. |

## Case Preview Versions

Case previews are the small autoplay clips inside `rec862347176`. Do not replace these with full popup videos.

Current implementation is native `<video class="case-preview-native-video">`, not Annex/Tilda. The Annex records `rec862376352`, `rec862385545`, `rec862392569`, and `rec862397203` are legacy records and should stay hidden while native previews are active. The VPS media URL stays in the video `src`, matching the hero-video approach. Case previews still seek to `0.25s` before reveal to avoid black first frames; hero uses direct `src`, video preload, JS-started muted playback from `0`, and `requestVideoFrameCallback` for a faster first paint without advancing invisibly behind the poster. Desktop Safari gets extra retries on IntersectionObserver entry, media readiness events, scroll, wheel, pointer, keyboard, and tap/click so the small loops are started again when the case cards approach the viewport.

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

Popups use the custom clean popup layer in `src/pages/index.astro`. The full Cloud.ru files below are for click popups only, not for autoplay previews.

Legacy Tilda showreel popup records `rec862614275`, `rec862592933`, and `rec862584405` must stay hidden while the clean popup is active. Do not inject another showreel video into those records, or `#popup:showreel` can open two players at once in Safari.

Legacy Tilda case-video popup records `rec862660772`, `rec862660859`, `rec862666264`, `rec862666433`, `rec862667392`, `rec862667414`, `rec862668031`, and `rec862668074` must also stay hidden. Their old Boomstream `data-mp4video` blocks duplicate the clean Cloud.ru popups for the same hooks.

| Popup | Legacy Boomstream URL found in export/history | Current VPS URL |
| --- | --- | --- |
| Showreel | `https://cdnv.boomstream.com/balancer/UtWkPqj2-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/morozovkaRF24.mp4` |
| Komo | `https://cdnv.boomstream.com/balancer/AKPfzEht-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/KomoRF26.mp4` |
| Morozovka | `https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/morozovkaRF24.mp4` |
| Toscana | `https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/ToscanaRF26.mp4` |
| Nemchinovka / Kolizei | `https://cdnv.boomstream.com/balancer/lsooq7dU-EuQeQgfF.mp4` | `https://media.89-22-227-133.sslip.io/NemchinovkaRF28.mp4` |

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
