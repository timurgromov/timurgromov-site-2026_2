# 2026-06-13 - Fix portrait advice video popup layout against original Tilda proportions

## Scope

- `src/pages/index.astro`

## Context

Кастомный `clean-showreel-popup` для advice-видео был собран с неверной логикой ширины portrait-popup: ширина белой карточки, ширина видео и ширина заголовка были фактически стянуты к одной и той же величине через `--clean-showreel-media-width`. Из-за этого popup выглядел слишком узким, текст заголовка ломался в чрезмерно узкую колонку, а сам video-block визуально воспринимался как обрезанный.

При сверке с исходным Tilda export выяснилось, что в оригинале эти размеры различались:

- desktop: panel `514`, video `382`, title `467`
- tablet: panel `380`, video `340`, title `315`
- mobile: panel `300`, video `270`, title `232`

## Changes

- убрана JS-привязка ширины popup к реальной ширине video-element
- для portrait advice-popup введены отдельные размеры panel / media / title по мотивам исходного Tilda popup
- desktop/tablet/mobile font-size title приведен ближе к оригинальной раскладке
- видео оставлено в `object-fit: contain`, но теперь оно живет внутри более широкой белой карточки, как в исходнике

## Verification

- `npm run build`
- сверка с исходными размерами из `files/page62008353body.html`

## Result

Portrait video popup больше не должен схлопываться в узкую колонку под фактическую ширину видео. Заголовок и карточка снова живут по отдельным пропорциям, как в оригинальном Tilda-layout.
