# 2026-06-14 - Revert plan popup screenshot preview

## Context

После замены правой части popup `Получить сценарий` на реальный screenshot материала владелец попросил откатить это решение: вернуть прежнюю фото-композицию с Тимуром и убрать только строку `Пример материала`.

## Changes

- В [src/pages/index.astro](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ%202026%20на%20своем%20Хостинге%20_2/src/pages/index.astro) popup `#plan-delivery-popup` возвращён к прежнему фото-preview на базе `tild6461-3464-4935-b237-653233383933__image_1_1.jpg`.
- Из preview удалена строка `Пример материала`.

## Verification

- `npm run build`

## Result

- Popup снова использует прежнюю визуальную подачу с фотографией.
- Подпись `Пример материала` убрана.
