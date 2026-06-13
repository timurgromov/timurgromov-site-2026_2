# 2026-06-13 - Restore Tilda split CTA geometry and document the standard

## Scope

- `src/pages/index.astro`
- `docs/do-not-break-this-site.md`
- `docs/quick-edit-playbook.md`
- `docs/history/DECISIONS.md`

## Context

Кастомные CTA уже использовали общий helper `tg-tilda-cta`, реальный export SVG стрелки и hover-поворот. Но визуально кнопка всё ещё читалась как один сплошной прямоугольник, потому что внутренние скругления были обнулены: левая плашка скруглялась только слева, правый квадрат только справа, а `border-left` у квадрата был убран.

Оригинальная Tilda-кнопка `смотреть больше` в `rec862529266` состоит из отдельных слоёв: левая скругленная shape-плашка, правый скругленный square, текст, полный кликабельный overlay и SVG-стрелка.

## Changes

- У `tg-tilda-cta__plate` и `tg-tilda-cta__arrow-box` возвращены полные скругления со всех сторон.
- Сохранён `1px` overlap между плашкой и квадратом, как в Tilda export.
- Сохранён общий кликабельный wrapper и hover-поворот стрелки.
- В `docs/do-not-break-this-site.md` добавлен `CTA Split Button Rule` с ID слоев оригинальной Tilda-кнопки.
- В `docs/quick-edit-playbook.md` добавлено быстрое правило для будущих CTA.
- В `docs/history/DECISIONS.md` зафиксировано решение `DEC-2026-06-13-TILDA-SPLIT-CTA-STANDARD`.

## Verification

- `npm run build` - passed.
- `npm run verify:contacts` - passed after escalated rerun because sandbox blocked local preview bind.
- Local headless visual/DOM check at `1440x900` for `#free-consultation`:
  - primary CTA wrapper `324.77x36`;
  - left plate `289.77x36`;
  - arrow square `36x36`;
  - plate and arrow square both have full `6px` border radius;
  - gap/overlap is `-1px`, matching the original Tilda overlap;
  - both plate center and arrow center resolve to the same clickable `<a href="#consultation-contact">`.
- Screenshot fragment saved outside git at `/tmp/tg-cta-split-fragment.png`.

## Result

Новые кастомные CTA должны снова выглядеть как две склеенные Tilda-части: левая скругленная плашка плюс отдельный скругленный квадрат со стрелкой, а не как один цельный generic button.
