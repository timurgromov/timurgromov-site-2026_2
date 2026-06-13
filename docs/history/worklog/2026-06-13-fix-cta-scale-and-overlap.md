# 2026-06-13 - Fix CTA scale and split-button overlap

## Scope

- `src/pages/index.astro`

## Context

Предыдущая итерация перевела кастомные CTA на split-button structure, но на desktop они всё ещё не совпадали с hero-кнопкой из Tilda export. Причина: оригинальная hero-кнопка находится внутри scaled Tilda artboard. На viewport `1440x900` её фактический размер `240x36`, а кастомная кнопка оставалась `200x30`.

Также был виден внутренний стык между левой плашкой и квадратом стрелки. В Tilda export правый квадрат перекрывает левую плашку на `1px`: например, на `1440x900` левая часть `205x36`, квадрат `36x36`, overlap `1px`.

## Changes

- Добавлен `--tg-cta-overlap:1px`; arrow box и icon сдвинуты на `-1px`, `border-left` у arrow box убран.
- Desktop CTA variables масштабируются через `clamp(...)`, чтобы повторять Tilda scale: `200x30` на `1200`, `240x36` на `1440`, `320x48` на `1920`.
- Plan CTA min-width переведен на `clamp(200px, 16.6667vw, 320px)`.
- Popup submit buttons больше не растягиваются на всю ширину формы на desktop; они остаются компактными inline split-buttons.
- Mobile full-width CTA оставлены full-width, но используют тот же `1px` overlap без внутреннего шва.

## Verification

- `npm run build` - passed.
- Browser check `1440x900`: original hero button `240x36`, plan primary `240x36`, plan secondary `240x36`, arrow square `36x36`, overlap `1px`.
- Browser check `1440x900` popup: tripwire submit `325x36`, arrow square `36x36`, overlap `1px`, `justify-self:start`.
- Browser check `390x844`: plan buttons `350x35`, arrow square `35x35`, overlap `1px`.

## Result

Кастомные CTA теперь не только используют такую же split-структуру и hover-стрелку, но и совпадают с фактическим масштабом оригинальной Tilda-кнопки на desktop.
