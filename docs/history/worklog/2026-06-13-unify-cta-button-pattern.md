# 2026-06-13 - Unified CTA button pattern with Tilda-like split button

## Scope

- `src/pages/index.astro`

## Context

CTA-кнопки в блоках `План-сценарий`, `Бесплатная консультация` и popup-окнах были выполнены как generic rounded buttons. Первая попытка унификации тоже была неточной: кнопка оставалась цельной, с внутренним разделителем и CSS-chevron, поэтому визуально не совпадала с родной hero-кнопкой из Tilda.

## Changes

- введен общий двухчастный CTA-паттерн: левая кнопочная часть + отдельный правый квадрат со стрелкой
- размеры приведены к Tilda-брейкпоинтам hero-кнопки: 30px на обычном desktop, 48px на 1920+, 35px на tablet/mobile
- под этот паттерн приведены кнопки блока `План-сценарий`, блока `Бесплатная консультация`, contact popup, tripwire popup и plan popup
- вторичные CTA и popup-links оставлены белыми, но получили такой же правый квадрат со стрелкой
- убран старый внутренний divider (`--tg-cta-divider`) и крупный CSS-chevron
- для grid/popup-кнопок выставлена ширина `calc(100% - arrow-box)`, чтобы вместе с правым квадратом они не вылезали за контейнер

## Verification

- `npm run build`
- `git diff --check`
- Browser local preview `http://127.0.0.1:4324/`, viewport 1440x900: visually checked `Бесплатная консультация`
- Browser local preview `http://127.0.0.1:4324/`, viewport 1440x900: visually checked `План-сценарий`

## Result

Кнопки больше не являются просто уменьшенными generic controls. Они используют тот же визуальный принцип, что и hero-CTA: отдельный правый квадрат, компактная высота, стрелка внутри square-zone, primary orange и secondary white.
