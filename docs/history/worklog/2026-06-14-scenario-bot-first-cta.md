# 2026-06-14 - Scenario CTA switched to bot-first

## Intent

Убрать лишний шаг popup-квалификации перед Telegram для главного оффера `Получить сценарий`.

## Context

Пользователь уточнил продуктовую логику: если сайт обещает получить сценарий в Telegram, то сначала нужно завести человека в Telegram-бота, а квалификацию проводить уже в чате. Старый popup с тремя вопросами не удалять, а оставить как скрытую заготовку на случай возврата к этой механике.

## Changes

- Hero CTA теперь ведёт напрямую в `https://t.me/gromov_wedding_bot?start=site_plan`.
- CTA-блок `Получить сценарий свадьбы` переименован в `Получить сценарий свадьбы в Telegram`.
- Основная кнопка CTA-блока теперь `Получить сценарий в Telegram` и ведёт напрямую в Telegram-бота.
- Текст CTA-блока объясняет: в Telegram-боте нужно ответить на 3 коротких вопроса, после чего пользователь получает план вечера, тайминг, ключевые блоки и полезные материалы.
- Старый `plan-delivery-popup` и tripwire-form logic оставлены в `src/pages/index.astro`, но активные CTA больше не открывают popup.
- `CURRENT_STATE.md` и `DECISIONS.md` обновлены: popup-first решение superseded, активное решение - bot-first.

## Verification

- `npm run build` прошёл.
- `dist/index.html` содержит прямые ссылки на `https://t.me/gromov_wedding_bot?start=site_plan` для hero и CTA-блока.
- В `dist/index.html` активных элементов `data-plan-popup-open` не осталось; присутствует только пассивная строка legacy selector в старом script.

## Deploy

Не выполнялся в рамках этой записи.
