# 2026-06-15 - Scenario CTA phone axis alignment

## Intent

Довести нижний CTA `/scenario/`: сместить строку `или позвонить` чуть правее, чтобы она шла по внутренней оси основной кнопки, а не стартовала от левого края панели.

## Context

Пользователь показал live-экран `/scenario/` и отметил, что телефонная строка визуально стоит не по оси относительно CTA-кнопки `Разобрать план в Telegram`.

## Changes

- В `src/pages/scenario.astro` для `.scenario-cta__phone` добавлен `margin-left: 18px` на desktop.
- В mobile breakpoint сдвиг обнулён, чтобы строка не уезжала внутри узкой панели.

## Verification

- `npm run build`
- live HTML/CSS check after deploy

## Result

Телефонная строка в нижнем CTA `/scenario/` теперь стоит ближе к оси кнопки и читается как единый action-блок.
