# 2026-06-13 - Fix advice video popup Tilda breakpoints

## Scope

- `src/pages/index.astro`
- `docs/do-not-break-this-site.md`

## Context

Попап `#popup:video-sovet-1` выглядел слишком большим на viewport около `1440px`, потому что текущий CSS применял `1920+` размер белой Tilda-плашки уже на desktop `1200-1919`.

Оригинальный Tilda export `rec892727326` использует разные размеры:

- `1920+`: panel `514x889`, video `382x679`, title `477x86`, title font `43px`.
- `1200-1919`: panel `308x570`, video `246x437`, title `291x54`, title font `27px`.
- `640-1199`: panel `380x718`, video `340x604`, title `315x54`, title font `27px`.
- `320-639`: panel `300x564`, video `270x480`, title `232x40`, title font `20px`.

## Changes

- Добавлен отдельный `1200-1919` portrait breakpoint для `.clean-showreel-popup.is-portrait`.
- `1920+`, tablet и mobile portrait размеры выровнены под исходный Tilda export.
- Заголовок возвращен к Tilda-like responsive widths, чтобы текст не создавал лишние строки и не раздувал белую плашку.
- Сохранены `aspect-ratio:9 / 16`, `object-fit:cover`, прозрачный фон видео и белая плашка без черных side fields.
- В `docs/do-not-break-this-site.md` добавлена таблица размеров, чтобы не применять `514px` desktop-плашку ниже `1920px`.

## Verification

- `npm run build` - passed.
- Browser visual metrics `1440x900`: panel `308x570`, media/video `246x437`, title `291x54`, title font `27px`.
- Browser visual metrics `390x844`: panel `300x564`, media/video `270x480`, title `232x40`, title font `20px`.
- Browser visual metrics `1920x1080`: panel `514x889`, media/video `382x679`, title `477x86`, title font `43px`.

## Result

Advice popup снова использует compact Tilda geometry на `1200-1919`, поэтому на `1440px` выглядит как аккуратная книжная рамка, а не как большая desktop-плашка.
