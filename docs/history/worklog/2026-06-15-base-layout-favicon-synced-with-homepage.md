# 2026-06-15 - BaseLayout favicon synced with homepage

## Intent

Убрать ошибочную подстановку тильдовского favicon в Astro-страницах и синхронизировать favicon-набор с реальной главной страницей сайта.

## Context

После добавления meta/favicons для `/scenario/` выяснилось, что в `BaseLayout` был по ошибке использован `images/tildafavicon.ico`. На основной странице сайта уже используется другой набор иконок: отдельные PNG для light/dark режима, SVG и Apple Touch Icon.

## Changes

- В `src/layouts/BaseLayout.astro` удалена ссылка на `images/tildafavicon.ico`.
- Вместо неё подключён тот же favicon-набор, что и на главной:
  - `images/tild3935-3938-4462-b437-303431663663__photo.png`
  - `images/tild3364-3334-4130-b264-376239643734__photo.png`
  - `images/tild3537-3632-4463-b561-386135313939__photo.svg`
  - `images/tild3333-3638-4033-b463-313433373838__photo.png`

## Verification

- `npm run build`
- live HTML check for favicon links on `https://timurgromov.ru/scenario/`

## Result

Astro-страницы сайта теперь используют тот же favicon, что и главная страница, без подмены на стандартный тильдовский значок.
