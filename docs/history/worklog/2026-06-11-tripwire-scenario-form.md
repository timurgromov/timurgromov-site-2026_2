# 2026-06-11 — tripwire-форма сценария свадьбы

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)
  - [EventBudjet/backend/app/api/v1/site.py](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/EventBudjet/backend/app/api/v1/site.py)
  - [EventBudjet/backend/app/services/site_consultation_service.py](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/EventBudjet/backend/app/services/site_consultation_service.py)

- Intent
  - Не выбрасывать пользователя сразу в Telegram за сценарием, а сначала провести лёгкую квалификацию на сайте.

- Changes
  - Hero CTA `получить сценарий` открывает tripwire pop-up.
  - Блок `План-сценарий свадебного вечера` содержит inline-форму с теми же вопросами без дополнительного клика.
  - Форма спрашивает роль пользователя, примерный сезон/срок свадьбы, регион и необязательный комментарий.
  - После отправки форма показывает success-состояние `Ответы сохранены` с оранжевой галочкой и кнопкой `Открыть Telegram`.
  - На мобильных устройствах после успешного сохранения выполняется короткая попытка открыть Telegram-бота автоматически.
  - Backend `EventBudjet` добавляет endpoint `/api/v1/site/tripwire-request`, создаёт карточку в `Все заявки` и отправляет Telegram-уведомление в канал CRM-заявок.

- Verification
  - `npm run build` в сайте — passed.
  - Browser/CDP visual check на локальном preview — popup desktop, success desktop, inline desktop, popup mobile проверены скриншотами.
  - Mobile popup 390x844 после фикса сетки: panel rect `x=12 y=12 width=366 height=820 bottom=832`, то есть без выхода за viewport.
  - `PYTHONPYCACHEPREFIX=/tmp/pycache-tripwire python3 -m py_compile ...` в `EventBudjet` — passed.

- Notes
  - Desktop после отправки не открывает Telegram автоматически, чтобы не создавать агрессивный redirect. Пользователь видит подтверждение и сам нажимает `Открыть Telegram`.
  - Inline-форма длиннее одного экрана на desktop 1440x900, но не имеет горизонтального overflow и штатно скроллится вместе с секцией.
