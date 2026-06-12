# 2026-06-13 - Price tabs active text color aligned with hover state

## Scope

- `src/pages/index.astro`

## Context

В блоке `Честно о ценах` логика цветов у табов была нарушена: при hover на оранжевой заливке текст становился белым, а в активном состоянии оставался темным.

## Changes

- для `#rec862304479 .price-tab-active .tn-atom` цвет текста изменен с темного на `#fffefa`
- active-state приведен к той же логике, что и hover/focus у неактивных табов

## Verification

- `npm run build`

## Result

Активный таб в блоке `Честно о ценах` теперь использует белый текст на оранжевой заливке и не выбивается из общей логики состояний.
