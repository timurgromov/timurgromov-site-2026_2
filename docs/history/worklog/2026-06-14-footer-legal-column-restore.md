# 2026-06-14 - Restore footer legal column

## Scope

- `src/pages/index.astro`

## Context

После перевода desktop legal-блока footer в горизонтальную service-line пользователь подтвердил, что это ломает сеточный ритм подвала: юридические ссылки визуально оказывались "между строками", а строка `Создание сайта: komarovaeee` читалась как отдельный нижний слой. Нужно было вернуть прежнюю логику колонкой, не трогая мобильную версию и не откатывая исправление hover у footer menu.

## Changes

- Desktop legal-блок `1738909152475` возвращен из горизонтальной строки в вертикальную колонку.
- Для `.legal-doc-line` восстановлен блочный поток вместо inline-раскладки.
- На desktop возвращены column layout, нормальный `white-space`, прежняя ширина и вертикальный шаг строк.
- Для диапазона `1200-1919` legal-блок поднят обратно ближе к реквизитам, чтобы он жил в одной левой колонке, а не в нижней сервисной полосе.
- Hover/footer menu fix и мобильные координаты оставлены без изменений.

## Verification

- `npm run build`
- `npm run verify:contacts`
- Browser visual check:
  - desktop `1440x900`: legal links are stacked under business details; right-side `Создание сайта: komarovaeee` stays in its own column
  - mobile `390x844`: footer keeps the previous single-column order without overflow

## Result

Footer returned to the original column rhythm: legal links now sit under the requisites as a left-column block, while the site-credit row remains visually separate on the right.
