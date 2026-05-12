# Do Not Break This Site

This is the shared safety file for hard-won, fragile fixes that must not be casually rewritten.

The homepage is a Tilda export transformed in `src/pages/index.astro`. Some fixes are small but easy to break because Tilda Zero Block, Safari rules, custom video layers, popup hooks, and CSS overrides interact with each other.

Before changing any fragile part of the site, read this file and compare with the current code. Add future hard-won fixes here too, not only video fixes.

Exact active VPS video URLs and historical Boomstream/Cloud.ru URLs live in `docs/video-link-registry.md`.

Current public site is GitHub Pages: `https://timurgromov.github.io/timurgromov-site-2026_2/`.
Do not deploy to `timurgromov.ru` from this repo until the domain migration is explicitly started; right now it is the Tilda/original reference.

## Current Safe State

- Last confirmed working hero poster fix: `44a92b5 Restore single hero poster layer`.
- The important historical source for the poster fix is `083b592 Use single stable hero poster before video`.
- The active hero record is `rec861352716`.
- The active hero media shape is `.tn-elem__8613527161738731141089`.
- The active header record is `rec862699342`.
- The legacy Annex hero record `rec861372811` is hidden in `hiddenMarketingVideoAdviceRecordIds`; do not restore it unless explicitly deciding to return to Annex.

## Hero Poster Shift Fix

Problem:

- The hero photo used to shift by a few pixels during first paint / video reveal.
- The cause was multiple visible poster sources with slightly different boxes:
  - background image on `#rec861352716 .t396__artboard/.t396__carrier/.t396__filter`;
  - `.hero-poster-layer`;
  - native `<video poster="...">`;
  - sometimes an extra early overlay.

Current rule:

- Before video starts, exactly one visible photo layer must be responsible for the hero poster: `#hero-preload-overlay`.
- `artboard`, `carrier`, and `filter` must not draw the hero poster image.
- `.hero-poster-layer` must exist but stay hidden with `display:none !important`.
- The native video may keep a `poster` attribute as a browser fallback, but it is hidden with `opacity:0` until `hero-video-started`.

Exact current setup:

```ts
const heroPosterVersion = "2306bab";
const heroPosterDesktopUrl = `${basePath}images/hero-poster-desktop.jpg?v=${heroPosterVersion}`;
const heroPosterMobileUrl = `${basePath}images/hero-poster-mobile.jpg?v=${heroPosterVersion}`;
const heroNativeVideoMarkup = `<video class="hero-native-video" muted playsinline webkit-playsinline preload="auto" poster="${heroPosterDesktopUrl}" src="${heroCloudDesktopVideoUrl}" aria-hidden="true"></video>`;
const heroPreloadOverlay = `<div id="hero-preload-overlay" aria-hidden="true"></div>`;
```

Required CSS principles:

```css
#rec861352716 .t396__artboard,
#rec861352716 .t396__carrier,
#rec861352716 .t396__filter{
  background-color:#1c1b1a !important;
}

#rec861352716 > #hero-preload-overlay{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:103vh;
  min-height:927px;
  z-index:2;
  pointer-events:none;
  opacity:1;
  transition:opacity .2s ease;
  background:url("${heroPosterDesktopUrl}") center center / cover no-repeat #1c1b1a;
}

@media screen and (max-width:1919px){
  #rec861352716 > #hero-preload-overlay{
    height:100vh;
    min-height:600px;
  }
}

@media screen and (max-width:1199px){
  #rec861352716 > #hero-preload-overlay{
    min-height:780px;
  }
}

#rec861352716.hero-preload-hidden > #hero-preload-overlay{
  opacity:0;
}

#rec861352716 .tn-elem__8613527161738731141089 > .hero-poster-layer{
  display:none !important;
}

@media screen and (max-width:639px){
  #rec861352716 > #hero-preload-overlay{
    height:100vh;
    min-height:550px;
    background-image:url("${heroPosterMobileUrl}");
  }
}
```

Do not reintroduce:

```css
#rec861352716 .t396__artboard,
#rec861352716 .t396__carrier,
#rec861352716 .t396__filter{
  background-image:url(...);
}

#rec861352716 .tn-elem__8613527161738731141089 > .hero-poster-layer{
  display:block !important;
}
```

That combination brings back the multi-source poster problem and can cause the micro-shift.

## Hero Video Current Settings

Current hero video implementation is native, not Annex:

- `<video class="hero-native-video">`
- `muted`
- `playsinline`
- `webkit-playsinline`
- `preload="auto"`
- Initial desktop `src`
- `aria-hidden="true"`
- CSS: `position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center center;`
- Initial opacity: `0`
- Revealed only after `hero-video-started`.
- Video darkening is native CSS, not Annex:
  - the poster file is already prepared dark enough and must not get an extra `#hero-preload-overlay::after` dark layer;
  - `.tn-elem__8613527161738731141089::after` darkens only the native video after it starts;
  - video darkening uses `background:rgba(0,0,0,.2)`.
- The old Tilda dark overlay element `1738734772091` is hidden to avoid double darkening.

Current video source selection:

```js
function getHeroVideoSrc() {
  return window.matchMedia && window.matchMedia('(max-width: 639px)').matches
    ? heroCloudMobileVideoUrl
    : heroCloudDesktopVideoUrl;
}
```

The variable names still contain `Cloud` for historical reasons. Do not assume the name reflects the provider; inspect the actual URL values.

Current VPS media hero sources:

```ts
const videoMediaBaseUrl = "https://media.89-22-227-133.sslip.io";
const heroCloudDesktopVideoUrl =
  `${videoMediaBaseUrl}/hero_desc_RF28.mp4`;
const heroCloudMobileVideoUrl =
  `${videoMediaBaseUrl}/hero_mob_RF28.mp4`;
```

VPS media source checks from 2026-05-08:

- Caddy serves the media host in a separate Docker container on VPS `89.22.227.133`.
- Media files live under `/srv/tg26-video/public`.
- Active container name: `tg26-video-caddy`.
- Do not commit the VPS password/private access details.
- Files answer `206 Partial Content` for range requests.
- Headers include `Accept-Ranges: bytes`, `Content-Type: video/mp4`, cache headers, and permissive CORS for media loads.
- MP4 files were copied with `ffmpeg -c copy -movflags +faststart`.
- This setup is native hero video without Annex and without Tilda mp4 popup mechanics.
- Emergency migration steps for moving the media host to another VPS live in `docs/video-link-registry.md` under "Emergency VPS Migration Runbook". Use VPS + Caddy as the stable pattern; do not switch back to Cloud.ru S3/Object Storage without explicit approval and Safari testing.

Current revealed-state logic:

- The desktop hero video URL is present directly in the native video `src`, so the browser can start fetching it before the setup script runs.
- Desktop/mobile hero videos are also preloaded in `fastFirstPaint`.
- The native hero video is not marked `autoplay` in static HTML. JS adds autoplay and starts muted playback from `currentTime = 0` when it is ready to reveal, so the video does not advance invisibly behind the poster.
- `heroRevealDelayMs = 60`
- `heroLoopStartSeconds = 0`
- `heroLoopEndPaddingSeconds = 0.18`
- `requestVideoFrameCallback` is used when available so the poster fades only after a real painted video frame.
- `markHeroVideoStarted(video)` adds:
  - `hero-video-started`
  - `hero-preload-hidden`
- `hero-preload-hidden` fades out only `#hero-preload-overlay`.

## Header Logo Hover Rule

Problem:

- The `Тимур Громов` logo in the fixed header has a native Tilda SBS hover animation.
- The visible logo image is `#rec862699342 .tn-elem[data-elem-id="1738923639672"]`.
- The small photo element is `#rec862699342 .tn-elem[data-elem-id="1738923639678"]`.
- The hover/click area is `#rec862699342 .tn-elem[data-elem-id="1738923639681"]`.

Current rule:

- On normal page load, the header must show only the plain logo text.
- The small photo must remain hidden until hover.
- Do not force `opacity:1`, `visibility:visible`, or `transform:none` on `1738923639678`; that makes the hover photo visible on first paint and clips the logo text.
- Do not globally freeze `1738923639672`; that breaks the intended hover slide-out animation.

## Current Clean Video Popups

The active popups are custom lightweight popups, not Tilda mp4 popups.

Keep the legacy Tilda showreel records `rec862614275`, `rec862592933`, and `rec862584405` hidden in `hiddenMarketingVideoAdviceRecordIds`. Do not reconnect `showreelCustomVideoAssets` or inject a second showreel `<video>` into `rec862592933`; that creates two competing players for `#popup:showreel`, and Safari can freeze the visible popup while a hidden video keeps playing audio.

Keep the legacy Tilda case-video popup records `rec862660772`, `rec862660859`, `rec862666264`, `rec862666433`, `rec862667392`, `rec862667414`, `rec862668031`, and `rec862668074` hidden too. The clean popup owns `#popup:ozero-komo`, `#popup:morozovka`, `#popup:toskana`, and `#popup:kolizei`; leaving the old Tilda popups in the page reintroduces hidden Boomstream players and intermittent Safari behavior.

The popup data is stored in `cleanVideoPopupItems`:

```ts
[
  {
    hook: "#popup:showreel",
    title: "Ведущий Тимур Громов",
    src: `${videoMediaBaseUrl}/morozovkaRF24.mp4`,
  },
  {
    hook: "#popup:ozero-komo",
    title: "Камерная свадьба на о. Комо",
    src: `${videoMediaBaseUrl}/KomoRF26.mp4`,
  },
  {
    hook: "#popup:morozovka",
    title: "Грандиозная свадьба в Морозовке",
    src: `${videoMediaBaseUrl}/morozovkaRF24.mp4`,
  },
  {
    hook: "#popup:toskana",
    title: "Веселая свадьба в Тоскане",
    src: `${videoMediaBaseUrl}/ToscanaRF26.mp4`,
  },
  {
    hook: "#popup:kolizei",
    title: "Красивая свадьба в Колизее",
    src: `${videoMediaBaseUrl}/NemchinovkaRF28.mp4`,
  },
]
```

Popup markup:

```html
<div id="clean-showreel-popup" class="clean-showreel-popup" aria-hidden="true">
  <div class="clean-showreel-popup__backdrop" data-clean-showreel-close></div>
  <button class="clean-showreel-popup__close" type="button" aria-label="Закрыть видео" data-clean-showreel-close></button>
  <div class="clean-showreel-popup__panel" role="dialog" aria-modal="true" aria-label="Видео">
    <video class="clean-showreel-popup__video" controls playsinline webkit-playsinline preload="metadata"></video>
    <div class="clean-showreel-popup__title" data-clean-showreel-title></div>
  </div>
</div>
```

Popup behavior:

- Global click listener catches `a[href^="#popup:"]`.
- If the hook exists in `videoByHook`, it prevents default Tilda popup behavior.
- On open:
  - add `.is-open`;
  - set `aria-hidden="false"`;
  - add `body.clean-showreel-popup-open`;
  - set title;
  - set video `src` using the VPS media URLs from `videoMediaBaseUrl`;
  - set `playsinline` and `webkit-playsinline`;
  - call `video.load()` only when preparing or changing `src`, not as a blind reset on every open;
  - call `video.play()` inside the user click flow.
  - retry `video.play()` on `loadedmetadata`, `loadeddata`, `canplay`, and `canplaythrough` while the popup is open.
- On close:
  - pause video;
  - remove `.is-open`;
  - set `aria-hidden="true"`;
  - remove `body.clean-showreel-popup-open`.

Important popup CSS:

```css
.clean-showreel-popup{
  position:fixed;
  inset:0;
  z-index:2147483000;
  display:none;
  align-items:center;
  justify-content:center;
  box-sizing:border-box;
  min-height:100svh;
  height:100dvh;
  padding:24px;
}

.clean-showreel-popup.is-open{
  display:flex;
}

.clean-showreel-popup__backdrop{
  position:absolute;
  inset:0;
  background:rgba(28,27,26,.72);
  -webkit-backdrop-filter:blur(8px);
  backdrop-filter:blur(8px);
}

.clean-showreel-popup__panel{
  position:relative;
  z-index:1;
  width:min(1280px, calc(100vw - 160px), calc((100dvh - 160px) * 16 / 9));
  background:#000;
  border-radius:10px;
  overflow:hidden;
}

.clean-showreel-popup__video{
  display:block;
  width:100%;
  aspect-ratio:16 / 9;
  height:auto;
  object-fit:contain;
  background:#000;
}

@media screen and (max-width:639px){
  .clean-showreel-popup{
    align-items:center;
    padding:max(84px, env(safe-area-inset-top)) 12px max(84px, env(safe-area-inset-bottom));
  }
  .clean-showreel-popup__panel{
    width:min(calc(100vw - 24px), calc((100dvh - 168px) * 16 / 9));
  }
}
```

Do not replace these popups with Tilda `data-mp4video` popups without explicit approval. The custom popup was introduced because Safari handled it more reliably and it starts from the user click gesture.

## Current Case Preview Autoplay

The case previews in `rec862347176` are native muted autoplay videos, using the same basic approach as the hero video.

Current rule:

- Keep the legacy Annex/Tilda preview records hidden:
  - `rec862376352`
  - `rec862385545`
  - `rec862392569`
  - `rec862397203`
- Keep those records in `hiddenMarketingVideoAdviceRecordIds`.
- Do not inject the full VPS popup videos into the case preview shapes.
- Full VPS videos belong to the click popups only.
- Keep the existing Tilda shape coordinates and popup link overlays intact.
- The native preview videos are injected in `src/pages/index.astro` as `.case-preview-native-video`.
- Videos must stay muted, inline, looped, `preload="auto"`, and pointer-events-free.
- Revealing the preview should match the hero logic: seek to `0.25s`, call `play()`, then add `.case-preview-video-ready` only after playback has actually started and `currentTime >= 0.25`. Do not reveal on `loadeddata` or plain `canplay`; Safari can show the black first frame.
- Keep the real VPS demo URL in the native preview video `src`, the same way the hero receives a real `src`. Desktop Safari can leave the preview black if the URL is kept only in `data-*` and assigned later through viewport observers.
- Retry `play()` on initial bind, `loadedmetadata`, `loadeddata`, `canplay`, `canplaythrough`, `waiting`, `stalled`, `suspend`, `load`, `pageshow`, resize/scroll, IntersectionObserver entry, and user gestures including click/touch/pointer/wheel/keyboard.
- CSS should also mirror hero: the video is a direct child of the Tilda shape, positioned `absolute` with `z-index:10`; the underlying `.tn-atom` stays `position:relative`, dark, and clipped.

Current native VPS preview mapping:

```ts
[
  {
    shapeSelector: ".tn-elem__8623471761738859374619",
    src: `${videoMediaBaseUrl}/demo_komoRF28.mp4`,
  },
  {
    shapeSelector: ".tn-elem__8623471761738861518577",
    src: `${videoMediaBaseUrl}/demo_morozRF28_576.mp4`,
  },
  {
    shapeSelector: ".tn-elem__8623471761738862757939",
    src: `${videoMediaBaseUrl}/demo_toscanaRF28.mp4`,
  },
  {
    shapeSelector: ".tn-elem__8623471761738863568198",
    src: `${videoMediaBaseUrl}/demo_nemchRF28_576.mp4`,
  },
]
```

These VPS demo files are the small preview clips. Do not reuse the 25-50 MB popup videos as previews.

## Future VPS/Safari Notes

If Safari still refuses hero autoplay after this native setup, do not start random patches. Check in this order:

1. Confirm the deployed page still uses the exact VPS media URLs above.
2. Confirm the deployed HTML still has exactly one visible pre-video poster: `#hero-preload-overlay`.
3. Confirm the native `<video>` still has `muted playsinline webkit-playsinline preload="auto"` and an initial desktop `src`; JS should add `autoplay` when playback starts.
4. Confirm `hero-video-started` is added only after `playing`, `requestVideoFrameCallback`, `canplay` plus short delay, or `timeupdate`.
5. Test alternate delivery only after the file/header/poster checks above are still true.
