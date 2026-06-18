# Do Not Break This Site

This is the shared safety file for hard-won, fragile fixes that must not be casually rewritten.

The homepage is a Tilda export transformed in `src/pages/index.astro`. Some fixes are small but easy to break because Tilda Zero Block, Safari rules, custom video layers, popup hooks, and CSS overrides interact with each other.

Before changing any fragile part of the site, read this file and compare with the current code. Add future hard-won fixes here too, not only video fixes.

Exact active VPS video URLs and historical Boomstream/Cloud.ru URLs live in `docs/video-link-registry.md`.

Current public production site is `https://timurgromov.ru/`.
GitHub Pages fallback stays at `https://timurgromov.github.io/timurgromov-site-2026_2/`.

## Copy Existing Pattern First

This site must preserve existing design patterns by copying them, not by recreating similar-looking approximations.

Owner phrases such as `сделай как на сайте`, `в том же стиле`, `такие же кнопки`, `такая же верстка`, `возьми готовое`, `скопируй паттерн`, and `не заново` mean:

1. Find the existing source pattern first: file, `rec...`, helper function, const, CSS block, or class set.
2. Copy the full working pattern: markup, classes, helper functions, CSS variables, breakpoints, assets, state classes, and hover/interaction mechanics.
3. Change only copy, links, IDs, and the smallest geometry required by the new content.
4. If the copied pattern fails because of Tilda cascade, CSS parser errors, asset URL rewriting, or style order, fix that technical cause. Do not replace the copied pattern with a newly drawn "similar" component.

Forbidden:

- copying only colors/fonts and rebuilding a new CTA/card/grid/button from memory;
- redrawing `tg-tilda-cta` as a generic one-piece rounded button;
- changing split-button inner radii, arrow box mechanics, hover rotation, typography system, or spacing rhythm without an explicit owner request;
- saying the block is "in the same style" when the original source pattern exists but was not copied.

If there is no existing source pattern, stop and ask for approval before introducing a new visual language.

## Materials Page As-Is Baseline

The current safe `/materials/` implementation is an Astro route that preserves the old Tilda visual design by extracting records from:

- `page62008353.html`
- `files/page62008353body.html`

Current rule:

- Phase 1 for `/materials/` is `Tilda records inside Astro`, not a native Astro redesign.
- Keep the original Tilda composition, fonts, layout, video/poster assets, proportions, and record geometry.
- Do not replace the page with custom classes such as `materials-hero`, `materials-webinar`, or `materials-video-grid`.
- Do not invent poster images or substitute random site images for video covers.
- Do not resize videos or cards by eye.
- Optimize only after the same-design baseline is verified.

Required baseline check after any `/materials/` edit:

```bash
npm run verify:materials-baseline
```

The check must confirm:

- source still reads `page62008353.html` and `files/page62008353body.html`;
- built `/materials/` still contains Tilda markers such as `tilda-blocks-page62008353`, `rec862050095`, `rec862070380`, and `t396`;
- rejected native-redesign markers such as `materials-hero`, `materials-webinar`, and `materials-video-grid` are absent.

Required layout check after any `/materials/` edit that touches footer, CTA, section spacing, record heights, record overlap, or breakpoint geometry:

```bash
npm run verify:materials-layout
```

The layout check starts a local Astro preview and verifies the fragile `/materials/` zones at `1200x900`, `1440x900`, `1911x1064`, and `390x844`:

- footer bottom pixels stay orange;
- desktop footer record ends with the orange footer shape instead of white artboard tail;
- mobile footer keeps its orange artboard fallback;
- follow-up CTA buttons are not covered by the next Tilda record/filter;
- the next Tilda record does not overlap the CTA.

Current `/materials/` webinar media mapping:

- The active webinar video is still defined directly inside `files/page62008353body.html`, not in a separate Astro constant.
- Update both webinar records together:
  - desktop record `rec861962232`
  - mobile record `rec862050095`
- Current active webinar source: `https://media.89-22-227-133.sslip.io/materials_webinar_online_razbor_20260616.mp4`
- Current poster files:
  - `public/images/materials-poster.jpg`
  - `public/images/materials-poster-20.jpg`
- Before changing the webinar source again, confirm the file exists on the media VPS and then update `docs/video-link-registry.md`.

Current `/materials/` webinar play overlay fallback:

- The webinar play icon is restored in `src/pages/materials.astro` because the original Tilda block CSS later hides `.tn-atom__video-play-link`, but it must be state-based:
  - visible before playback and when video is paused;
  - hidden while the video is playing or starting.
- Do not reintroduce an unconditional `display:flex !important` overlay for `.tn-atom__video-play-link`. That leaves the play button over an already playing webinar.
- The scoped webinar toggle is tied only to desktop record `rec861962232` element `1739078296052` and mobile record `rec862050095` element `1739078914882`.
- Native video controls are disabled for this inline webinar so taps land on the Tilda video container and can toggle play/pause reliably.
- Do not add new runtime scroll controllers for the webinar Zero Block. If `/materials/` motion breaks again, investigate the extracted Tilda records first instead of pinning/repositioning elements with custom JS after load.
- Do not pull custom Astro sections upward into the webinar area with large negative margins. The webinar records still reserve and animate their own geometry, so negative-margin sections can overlap the video, proof cards, and review button on production.
- If you add a custom follow-up CTA below the webinar, do not wrap it in Tilda record classes like `r t-rec`. Tilda runtime can mark custom siblings as `r_hidden r_anim`, which hides the CTA on some viewports. Keep that CTA as a plain custom section below the webinar records.
- When simplifying the webinar scene, prefer disabling the original webinar record animations and hiding the review/proof groups inside the extracted Tilda records instead of adding new runtime repositioning.

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
const heroFirstFrameVersion = "20260618a";
const heroPosterDesktopUrl = `${basePath}images/hero-portrait-poster-desktop.jpg?v=${heroFirstFrameVersion}`;
const heroPosterMobileUrl = `${basePath}images/hero-portrait-poster-mobile.jpg?v=${heroFirstFrameVersion}`;
const heroNativeVideoMarkup = `<video class="hero-native-video" muted playsinline webkit-playsinline preload="auto" poster="${heroPosterDesktopUrl}" data-desktop-src="${heroCloudDesktopVideoUrl}" data-mobile-src="${heroCloudMobileVideoUrl}" aria-hidden="true"></video>`;
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

- The static native video keeps `data-desktop-src` and `data-mobile-src`; JS chooses the real `src` after the hero record exists.
- Desktop/mobile hero videos are also preloaded in `fastFirstPaint`.
- The native hero video is not marked `autoplay` in static HTML. JS adds autoplay and starts muted playback from `currentTime = 0` when it is ready to reveal, so the video does not advance invisibly behind the poster.
- `heroRevealDelayMs = 60`
- `heroMinimumPosterMs = 1600`
- `heroLoopStartSeconds = 0`
- `heroLoopEndPaddingSeconds = 0.18`
- `requestVideoFrameCallback` is used when available so the poster fades only after a real painted video frame.
- `scheduleHeroPosterBind()` runs on `DOMContentLoaded`, with short retries, and again on `load`; do not remove this because media preloads can delay `load` and leave the hero video unbound in some browsers/tests.
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

## CTA Split Button Rule

Problem:

- The original Tilda CTA style is not a single rounded rectangle with an icon inside it.
- In the export, button-like CTAs such as `rec862529266` / `смотреть больше` are composed from separate layers:
  - left rounded shape `1738905669528`;
  - right rounded square `1738905669537`;
  - text layer `1738905669544`;
  - full click target `1738905669553`;
  - arrow SVG `1738905669558` using `images/tild3536-3939-4363-b163-323761323432__vector_8.svg`.

Current rule:

- New custom CTA buttons must use the shared `tg-tilda-cta` helper in `src/site/tilda-cta.ts`, not a freshly drawn generic button.
- When reusing this pattern on another page, copy the full working set, not just class names: `tildaCtaInner`, `tildaCtaLink` / `tildaCtaButton`, `.tg-tilda-cta`, `.tg-plan-cta__button`, CSS variables, media queries, SVG mask URL, loading state, and hover rules.
- Keep the visual structure as two joined elements: a rounded left plate plus a rounded right square.
- Keep `--tg-cta-overlap:1px`, matching the export where the right square overlaps the left plate by one pixel.
- Do not set the inner join to `border-radius:0` and do not remove the right square's left border. That makes the CTA look like one solid rectangle and loses the Tilda style.
- Keep the whole wrapper clickable and keep the arrow hover rotation.
- If copied CTA CSS does not visually apply, inspect the compiled CSS and computed styles first. Fix parser/cascade/basePath/style-order problems instead of rebuilding a similar button.

Do not reintroduce:

```css
.tg-tilda-cta__plate{
  border-radius:var(--tg-cta-radius) 0 0 var(--tg-cta-radius);
}

.tg-tilda-cta__arrow-box{
  border-left:0;
  border-radius:0 var(--tg-cta-radius) var(--tg-cta-radius) 0;
}
```

## Current Clean Video Popups

The active popups are custom lightweight popups, not Tilda mp4 popups.

## Tilda Image Placeholder Rule

The Tilda export can leave 20px lazy placeholders in `src` and keep the real image in `data-original`. On horizontal Zero Block carousels this can remain blurry if Tilda lazy loading misses the element. `src/pages/index.astro` restores `src` from `data-original` for local `__resize__20x__` images at build time; do not remove this unless the lazy-loading behavior is replaced and checked in Chrome and Safari.

## Case Preview Hover Rule

The case portfolio block is `rec862347176`. Its native preview videos are injected into the original Tilda shape elements `1738859374619`, `1738861518577`, `1738862757939`, and `1738863568198`.

Keep `.case-preview-native-video` inside the shape's `.tn-atom`, not as a sibling of `.tn-atom`. Tilda SBS hover animation scales/moves the atom layer; if the video is injected next to it, the original card can shrink on hover while the video stays full-size on top, visually breaking the portfolio reveal/card-opening effect.

The reveal selector must match that nesting: `.case-preview-video-ready .tn-atom > .case-preview-native-video`. If it only targets `.case-preview-video-ready > .case-preview-native-video`, the video remains at `opacity:0` and the case tiles turn into black rectangles.

Do not remove `tilda-zero-gallery-1.0.min.js/css` or `tilda-zoom-2.0.min.js/css` from the page head as "unused" Tilda files. `tilda-zero-1.1.min.js` and the gallery code still call `t_zeroGallery__init` and `t_initZoom`; removing those assets can stop Zero Block initialization and break SBS hover geometry in this portfolio block.

On the `640-1199px` tablet breakpoint, keep the injected preview video wrappers visually fixed inside the card on hover. The original Tilda SBS transform moves the media thumbnail away from the card at that breakpoint and leaves a blank top area; desktop hover reveal still stays active above `1199px`.

Keep the legacy Tilda showreel records `rec862614275`, `rec862592933`, and `rec862584405` hidden in `hiddenMarketingVideoAdviceRecordIds`. Do not reconnect `showreelCustomVideoAssets` or inject a second showreel `<video>` into `rec862592933`; that creates two competing players for `#popup:showreel`, and Safari can freeze the visible popup while a hidden video keeps playing audio.

Keep the legacy Tilda case-video popup records `rec862660772`, `rec862660859`, `rec862666264`, `rec862666433`, `rec862667392`, `rec862667414`, `rec862668031`, and `rec862668074` hidden too. The clean popup owns `#popup:ozero-komo`, `#popup:morozovka`, `#popup:toskana`, and `#popup:kolizei`; leaving the old Tilda popups in the page reintroduces hidden Boomstream players and intermittent Safari behavior.

Keep the legacy Tilda review-video popup records `rec862674603`, `rec862674662`, `rec862683025`, `rec862683069`, `rec862685732`, `rec862685694`, `rec862687402`, and `rec862687388` hidden as well. The original review carousel/cards stay visible; only their popup playback is replaced by the clean native popup layer.

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
  {
    hook: "#popup:anton-i-kristina",
    title: "Антон и Кристина",
    src: `${videoMediaBaseUrl}/review_anton_kristina_RF.mp4`,
  },
  {
    hook: "#popup:temur-i-yana",
    title: "Темур и Яна",
    src: `${videoMediaBaseUrl}/review_temur_margo_RF.mp4`,
  },
  {
    hook: "#popup:katya-i-zhenia",
    title: "Катя и Женя",
    src: `${videoMediaBaseUrl}/review_katya_zhenya_RF.mp4`,
  },
  {
    hook: "#popup:russko-kubinskaya",
    title: "Антон и Лея",
    src: `${videoMediaBaseUrl}/review_russian_cuban_RF.mp4`,
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

Important advice-video ratio rule:

- Advice hooks `#popup:video-sovet-1`, `#popup:video-sovet-2`, and `#popup:video-sovet-3` must use forced CSS aspect ratio `9 / 16`.
- Do not size these popups from raw `video.videoWidth / video.videoHeight`. The VPS files have portrait `display_aspect_ratio=9:16`, but some raw stream dimensions / SAR values are non-standard. Using raw dimensions can create a square or wide CSS video box and bring back black side fields.
- For these advice popups, keep the portrait video element matching the media box, with `object-fit:cover`, transparent video background, and the white title card below it.
- For advice popup `#popup:video-sovet-1` / original Tilda export `rec892727326`, keep the original breakpoint geometry. Do not apply the large `1920+` white card below `1920px`:
  - `1920+`: white panel `514x889`, video `382x679`, title `477x86`, title font `43px`.
  - `1200-1919`: white panel `308x570`, video `246x437`, title `291x54`, title font `27px`.
  - `640-1199`: white panel `380x718`, video `340x604`, title `315x54`, title font `27px`.
  - `320-639`: white panel `300x564`, video `270x480`, title width `208`, title font `20px`.

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
- CSS should also mirror hero: the video is a direct child of the shape's `.tn-atom`, positioned `absolute` with `z-index:10`; the `.tn-atom` stays `position:relative`, dark, and clipped.

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
