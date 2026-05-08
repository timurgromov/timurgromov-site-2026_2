# Video Link Registry

Last checked: 2026-05-08.

This file is the canonical list of video URLs that have been used on the site in Cloud.ru and Boomstream versions. Keep this file in sync when changing video sources.

## Current Active Sources

| Place | Active provider | Active URL |
| --- | --- | --- |
| Hero desktop | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/hero_desc_RF28.mp4` |
| Hero mobile | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/hero_mob_RF28.mp4` |
| Case preview: Komo | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/demo_komoRF28.mp4?v=case-preview-20260505b` |
| Case preview: Morozovka | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/demo_morozRF28%20576%20.mp4?v=case-preview-20260505b` |
| Case preview: Toscana | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/demo_toscanaRF28.mp4?v=case-preview-20260505b` |
| Case preview: Nemchinovka / Kolizei | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/demo_nemchRF28%20576.mp4?v=case-preview-20260505b` |
| Popup: showreel | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/moro%D1%8FovkaRF24.mp4` |
| Popup: Komo | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/%D0%9AomoRF26.mp4` |
| Popup: Morozovka | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/moro%D1%8FovkaRF24.mp4` |
| Popup: Toscana | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/ToscanaRF26.mp4` |
| Popup: Nemchinovka / Kolizei | Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/NemchinovkaRF28.mp4` |

## Hero Video Versions

| Version | Desktop URL | Mobile URL | Notes |
| --- | --- | --- | --- |
| Current Cloud.ru | `https://global.s3.cloud.ru/tg26video-public/hero_desc_RF28.mp4` | `https://global.s3.cloud.ru/tg26video-public/hero_mob_RF28.mp4` | Active native hero source. |
| Boomstream replacement | `https://bs.boomstream.dev/balancer/RCIJ56KS-EuQeQgfF.mp4` | `https://bs.boomstream.dev/balancer/0VGkkqV8-EuQeQgfF.mp4` | Used in commit `81d6fd0`. Variable names still said `Cloud`, but URLs were Boomstream. |
| Legacy Annex/Tilda Boomstream | `https://cdnv.boomstream.com/balancer/p1VrFFDa-SxJPiQup.mp4` | same desktop file | Legacy hero record `rec861372811`; currently hidden. |

## Case Preview Versions

Case previews are the small autoplay clips inside `rec862347176`. Do not replace these with full popup videos.

Current implementation is native `<video class="case-preview-native-video">`, not Annex/Tilda. The Annex records `rec862376352`, `rec862385545`, `rec862392569`, and `rec862397203` are legacy records and should stay hidden while native previews are active. The Cloud.ru URL stays in the video `src`, matching the hero-video approach; previews also match the hero reveal rule by seeking to `0.25s` and revealing only after playback is actually running, not on plain `loadeddata`/`canplay`.

| Case | Original Boomstream URL in export | Boomstream replacement URL | Current Cloud.ru demo URL |
| --- | --- | --- | --- |
| Komo | `https://cdnv.boomstream.com/balancer/RCpP5hSc-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/N2LPspm9-jAhiWugB.mp4` | `https://global.s3.cloud.ru/tg26video-public/demo_komoRF28.mp4?v=case-preview-20260505b` |
| Morozovka | `https://cdnv.boomstream.com/balancer/gk8znhXX-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/M05OCeUp-jAhiWugB.mp4` | `https://global.s3.cloud.ru/tg26video-public/demo_morozRF28%20576%20.mp4?v=case-preview-20260505b` |
| Toscana | `https://cdnv.boomstream.com/balancer/Lww7hY2N-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/Oumx0U4Z-jAhiWugB.mp4` | `https://global.s3.cloud.ru/tg26video-public/demo_toscanaRF28.mp4?v=case-preview-20260505b` |
| Nemchinovka / Kolizei | `https://cdnv.boomstream.com/balancer/U7iCUgz4-oqvc9Qft.mp4` | `https://bs.boomstream.dev/balancer/gzJNWWi6-EuQeQgfF.mp4` | `https://global.s3.cloud.ru/tg26video-public/demo_nemchRF28%20576.mp4?v=case-preview-20260505b` |

Legacy Annex case preview records:

- `rec862376352`
- `rec862385545`
- `rec862392569`
- `rec862397203`

## Popup / Full Video Versions

Popups use the custom clean popup layer in `src/pages/index.astro`. The full Cloud.ru files below are for click popups only, not for autoplay previews.

| Popup | Legacy Boomstream URL found in export/history | Current Cloud.ru URL |
| --- | --- | --- |
| Showreel | `https://cdnv.boomstream.com/balancer/UtWkPqj2-EuQeQgfF.mp4` | `https://global.s3.cloud.ru/tg26video-public/moro%D1%8FovkaRF24.mp4` |
| Komo | `https://cdnv.boomstream.com/balancer/AKPfzEht-EuQeQgfF.mp4` | `https://global.s3.cloud.ru/tg26video-public/%D0%9AomoRF26.mp4` |
| Morozovka | `https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4` | `https://global.s3.cloud.ru/tg26video-public/moro%D1%8FovkaRF24.mp4` |
| Toscana | `https://cdnv.boomstream.com/balancer/hH4vBR87-EuQeQgfF.mp4` | `https://global.s3.cloud.ru/tg26video-public/ToscanaRF26.mp4` |
| Nemchinovka / Kolizei | `https://cdnv.boomstream.com/balancer/lsooq7dU-EuQeQgfF.mp4` | `https://global.s3.cloud.ru/tg26video-public/NemchinovkaRF28.mp4` |

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
- Full Cloud.ru files belong to popups opened by user click.
- Hero uses its own Cloud.ru desktop/mobile files, not case videos.
- When changing a URL in `src/pages/index.astro`, update this document and `docs/do-not-break-this-site.md`.
