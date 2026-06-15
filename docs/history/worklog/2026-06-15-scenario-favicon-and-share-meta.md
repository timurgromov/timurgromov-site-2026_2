# 2026-06-15 - Scenario favicon and share meta

## Intent

Сделать `/scenario/` полноценной shareable-страницей: чтобы в браузере был favicon, при отправке ссылки в Telegram подтягивалась нормальная превью-картинка, а метка времени чтения на первом экране соответствовала реальному объёму материала.

## Context

Пользователь заметил, что у страницы `/scenario/` нет нормального favicon/preview-оформления и попросил отдельно поправить превью при отправке ссылки в Telegram. Одновременно нужно было изменить подпись `10 минут чтения` на `5 минут чтения`.

## Changes

- `src/layouts/BaseLayout.astro` расширен мета-параметрами:
  - `canonical`
  - `ogImage`
  - `ogImageAlt`
  - `ogType`
- В `BaseLayout` добавлены:
  - `rel="icon"` и `rel="shortcut icon"` на `images/tildafavicon.ico`
  - базовые `og:*` и `twitter:*` meta-теги
  - поддержка per-page canonical/OG image
- В `src/pages/scenario.astro` для страницы `/scenario/` заданы:
  - canonical URL `https://timurgromov.ru/scenario/`
  - OG/Twitter image на `scenario-hero-host-bw-source.jpg`
  - `og:type="article"`
- В hero-подписи страницы изменено `10 минут чтения` -> `5 минут чтения`.

## Verification

- `npm run build`
- live HTML check for:
  - favicon links
  - `og:url`
  - `og:image`
  - `twitter:image`
  - `5 минут чтения`

## Result

`/scenario/` теперь отдает корректные базовые meta-теги и favicon, а при шаринге ссылки в Telegram должен использовать выбранный hero-кадр как превью-изображение.
