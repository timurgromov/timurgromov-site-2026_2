# 2026-06-14 - Hero nav symmetry on homepage

## Context

На первом экране главной страницы после удаления центрального пункта в горизонтальном ряду hero-навигации осталась визуальная дыра между `Как я веду` и `Цены`. Задача была вернуть симметрию без редизайна hero и без изменения mobile-логики.

## Changes

- В [src/pages/index.astro](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ%202026%20на%20своем%20Хостинге%20_2/src/pages/index.astro) добавлены точечные CSS override-координаты для пяти видимых пунктов hero-навигации:
  - `обо мне`
  - `как я веду`
  - `цены`
  - `кейсы`
  - `контакты`
- Теми же координатами выровнены их hover-дубли с курсивом.
- Mobile-правила не менялись: hero-навигация там по-прежнему скрыта.

## Verification

- `npm run build`
- Визуальная проверка локального `dist/index.html` headless Chrome screenshots:
  - `390x844`
  - `1366x768`
  - `1440x900`
  - `1984x1046`

## Result

- На desktop и wide desktop ряд hero-ссылок снова выглядит равномерным, без центрального провала.
- На mobile новая правка не вывела hero-навигацию обратно и не создала новый overflow.
