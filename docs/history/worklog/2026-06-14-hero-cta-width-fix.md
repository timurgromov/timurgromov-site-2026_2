# 2026-06-14 - Widen hero CTA for the longer scenario label

## Scope

- `src/pages/index.astro`

## Context

После замены hero CTA на `получить сценарий свадьбы` текст перестал помещаться в старую Tilda-геометрию кнопки на брейкпоинте `1200` и визуально упирался в стрелку. Проблема была не в split-button helper, а в исходном hero Zero Block `rec861352716`.

## Changes

- Для hero CTA на брейкпоинте `1919` расширены оранжевая плашка и общий кликабельный слой.
- Для стрелочного квадрата и самой стрелки сдвинуты позиции вправо, чтобы сохранить split-button композицию.
- Для текстового слоя hero CTA на `1919`, `1199` и `639` увеличена ширина и добавлено центрирование текста внутри слоя.

## Verification

- `npm run build`
- local preview + desktop screenshot `1440x900`
- local preview + mobile screenshot `390x844`
- live-check production after push

## Result

Hero CTA снова читается целиком: длинная формулировка `получить сценарий свадьбы` больше не врезается в стрелку и помещается в кнопку на desktop и mobile.
