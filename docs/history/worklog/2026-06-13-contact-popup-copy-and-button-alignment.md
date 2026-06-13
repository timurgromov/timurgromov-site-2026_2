# 2026-06-13 - Contact popup copy and button alignment

## Scope

- `src/pages/index.astro`

## Context

В contact popup заголовок `Выберите удобный способ` повторялся в подзаголовке. Левые кнопки связи на desktop растягивались на всю колонку и выглядели как поля формы, а submit-кнопка формы была прижата к левому краю.

## Changes

- Подзаголовок переписан без повтора заголовка.
- Desktop-кнопки `Написать в Telegram`, `Написать в MAX`, `Позвонить` сделаны компактными по общей ширине, а не full-width.
- Кнопка `Отправить` на desktop выровнена вправо внутри формы.
- Mobile-режим сохранён удобным: кнопки связи остаются full-width, submit остаётся слева.

## Verification

- `npm run build` - passed.
- `npm run verify:contacts` - passed after escalated rerun because sandbox blocked local preview bind.

## Result

Contact popup должен выглядеть менее повторяющимся по тексту и визуально спокойнее: левые действия читаются как CTA, а отправка формы завершает правую колонку.
