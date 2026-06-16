# 2026-06-17 - Align scenario thesis and final CTA geometry

## Summary

- Reduced the oversized gap between the orange thesis block and the final meeting CTA on `/scenario/`.
- Aligned the visible width and corner geometry of those two panels so they read as one system instead of two unrelated containers.

## Context

После восстановления CTA-цепочки на `/scenario/` пользователь заметил два визуальных дефекта:

1. между оранжевой плашкой `Главная мысль` и финальным CTA остался слишком большой вертикальный разрыв;
2. сами плашки выглядели разной ширины, хотя должны читаться как единая верстка страницы.

Причина была не в новом UX-правиле, а в геометрии двух разных контейнеров:

- `scenario-thesis` жил внутри article-width;
- финальный `scenario-cta__shell` жил в shell-width;
- сверху и снизу дополнительно складывались два больших margin.

## Changes

- Для `.scenario-thesis` увеличена внутренняя геометрия и добавлены контролируемые отрицательные горизонтальные поля, чтобы блок визуально совпал по ширине с финальной CTA-панелью.
- Для `.scenario-thesis` уменьшен нижний внешний отступ.
- Для `.scenario-cta__shell` резко уменьшен `margin-top` и на desktop, и на mobile.
- На mobile синхронизированы margin/padding/radius thesis-блока, чтобы разрыв между ним и CTA тоже не выглядел случайным.

## Verification

- `git diff --check`
- `npm run build`

## Result

Связка `главная мысль -> финальный CTA` теперь должна читатьcя плотнее и ровнее: без лишней пустоты между блоками и без ощущения, что одна плашка уже или шире другой по другой сетке.
