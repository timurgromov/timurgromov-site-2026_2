# 2026-06-14 - Homepage CTA alignment and real plan popup preview

## Context

На главной странице две CTA-секции выглядели несобранно: правая колонка стартовала ниже левой, из-за чего внизу слева появлялось ощущение пустоты. В popup выдачи сценария справа также оставался декоративный блок с текстом `Пример материала`, хотя пользователь просил либо показать реальный материал, либо не обещать его вовсе.

## Changes

- В [src/pages/index.astro](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ%202026%20на%20своем%20Хостинге%20_2/src/pages/index.astro) убран искусственный верхний сдвиг у правых колонок в секциях:
  - `#plan-evening`
  - `#free-consultation`
- Для блока `#plan-evening` дополнительно убран верхний `padding` у первого элемента списка, чтобы колонка начиналась ровно от одной горизонтали с левым контентом.
- В popup `#plan-delivery-popup` удалён псевдо-preview с текстом `Пример материала`.
- Вместо него подключён реальный screenshot материала `/scenario/` как отдельный asset [public/images/scenario-popup-preview.png](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ%202026%20на%20своем%20Хостинге%20_2/public/images/scenario-popup-preview.png).
- Popup preview переведён на аккуратную framed-версию с реальной картинкой материала, без декоративного списка и ложных обещаний.

## Verification

- `npm run build`
- Локальная визуальная проверка через in-app browser:
  - desktop CTA `#plan-evening`
  - desktop CTA `#free-consultation`
  - desktop popup `#plan-delivery-popup`
  - mobile CTA `#plan-evening`
  - mobile CTA `#free-consultation`
  - mobile popup `#plan-delivery-popup`

## Result

- Обе CTA-секции на desktop стартуют ровно и визуально читаются спокойнее.
- На mobile блоки не переполняются и не ломают вертикальный ритм.
- Popup теперь честно показывает реальный фрагмент материала на desktop, а на mobile корректно остаётся в одном столбце без перегруза.
