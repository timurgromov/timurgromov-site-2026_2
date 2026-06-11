# 2026-06-11 — popup сайта в CRM и Telegram

- Scope
  - [src/pages/index.astro](</Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/ТГ 2026 на своем Хостинге _2/src/pages/index.astro>)
  - [EventBudjet/backend/app/api/v1/site.py](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/EventBudjet/backend/app/api/v1/site.py)
  - [EventBudjet/backend/app/services/site_consultation_service.py](/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/TimurBusinessSystem/EventBudjet/backend/app/services/site_consultation_service.py)

- Intent
  - Подключить popup бесплатной встречи на сайте к реальному intake в CRM без смешивания с заявками свадебного калькулятора.

- Context
  - До правки сайт только показывал форму телефона и локальный status-text.
  - Пользователь попросил, чтобы заявка уходила в `Все заявки` и сразу дублировалась в Telegram-канал CRM-заявок.

- Changes
  - На сайте popup-форма переведена на поля `Имя`, `Телефон`, `Комментарий`, где `Имя` и `Телефон` обязательны.
  - Форма отправляется в публичный backend endpoint `EventBudjet` вместо локального заглушечного `/api/consultation-lead`.
  - В `EventBudjet` добавлен отдельный site endpoint, который создаёт `incoming_request` с source сайта и форматирует имя/телефон/комментарий в `comment`.
  - После сохранения backend отправляет мгновенное Telegram-уведомление в канал CRM-заявок через тот же bot token и тот же proxy-контур, что и production bot.

- Verification
  - `npm run build` в `ТГ 2026 на своем Хостинге _2` — passed.
  - `npm run build` в `EventBudjet` — passed.
  - `npm test` в `EventBudjet` — passed.
  - `PYTHONPYCACHEPREFIX=/tmp/pycache python3 -m py_compile backend/app/api/v1/site.py backend/app/services/site_consultation_service.py backend/app/core/config.py` — passed.
  - Локальный `POST http://127.0.0.1:8001/api/v1/site/consultation-request` после финальной пересборки backend — created `request_id=2`.
  - Проверка в Postgres показала новую строку `incoming_requests` со source сайта и форматированным `comment`.
  - `telegram_notification_status` локально вернулся как `skipped`, потому что в локальном `.env` не задан production chat id канала CRM-заявок.

- Result
  - Архитектурно popup сайта теперь идёт в правильный контур `Все заявки`, а не в `lead` калькулятора.

- Risks / Follow-up
  - Для production нужно убедиться, что backend env разрешает CORS с `timurgromov.ru` и знает chat id канала CRM-заявок.
  - Интеграция не считается live, пока не сделаны commit/push/deploy и post-deploy проверка.
