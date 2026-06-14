# 2026-06-14 - Homepage CTA axis centering

## Context

После выравнивания CTA-секций по верхнему краю владелец уточнил, что цель была другой: не одинаковый старт колонок, а визуальная симметрия левой и правой части по общей горизонтальной оси.

## Changes

- В [src/pages/index.astro](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ%202026%20на%20своем%20Хостинге%20_2/src/pages/index.astro) для двух секций:
  - `#plan-evening`
  - `#free-consultation`
- desktop/grid-выравнивание изменено с `align-items:start` на `align-items:center`.
- На breakpoint `max-width: 1199px` сохранено `align-items:start`, чтобы mobile/tablet оставались в обычном вертикальном потоке.

## Verification

- `npm run build`
- Локальная визуальная проверка:
  - desktop `#plan-evening`
  - desktop `#free-consultation`
  - mobile `#plan-evening`
  - mobile `#free-consultation`

## Result

- На desktop две колонки в CTA-секциях читаются как сбалансированные по общей оси, без жёсткого прилипания правой части к верхнему краю.
- На mobile поведение не изменилось.
