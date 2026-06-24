# 2026-06-24 - Scenario footer material link points to materials page

## Context

Owner clarified that in the orange footer on `/scenario/` the item `Запись разбора / Пошаговый план подготовки к свадьбе` must open `https://timurgromov.ru/materials/`, not the old external short link.

## Changes

- In `src/pages/scenario.astro`, changed the first `materialLinks` item href from `https://clck.ru/3RX8Nw` to `materialsPageUrl`, so the footer now links directly to `/materials/`.

## Verification

- `ASTRO_TELEMETRY_DISABLED=1 npm run build`
