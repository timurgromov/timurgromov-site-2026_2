# Current State - 2026-08-20

## Public-site page attribution (2026-08-24)

- Public Telegram/MAX CTA sources preserve the exact main-site page: homepage scenario `site_plan_home`, homepage contact `site_meeting_home`, Scenario contact `site_meeting_scenario`, Materials contact `site_meeting_materials`.
- `site_plan` and `site_meeting` are legacy-compatible starts only. New SEO pages require their own source code, EventBudjet label/migration and CRM verification before release; the shared SEO rule is in `../../../SEO/WEBMASTER_METRIKA_RUNBOOK.md`.

## Project

Сайт свадебного ведущего Тимура Громова на Astro поверх Tilda export. Текущий этап: production-входная воронка сайта подключена к EventBudjet CRM, главный tripwire `Получить сценарий` открывает выбор Telegram или MAX, оба канала ведут в bot qualification-first flow `site_plan`, а сам материал теперь живёт на отдельной production-странице `/scenario/` внутри этого же сайта.

## Current Runtime / Stack

- Frontend: Astro 5 + Tilda-export HTML transforms
- Main page source: `files/page62008353body.html` + `src/pages/index.astro`
- Content constants: `src/site/home-data.ts`
- Scenario article route: `src/pages/scenario.astro`
- Deploy target: GitHub Pages as technical publish path, production domain `timurgromov.ru`
- Telegram bot project: находится в другой папке и в этот репозиторий не входит

## What Works Now

- Из-за сетевого сбоя Aeza VPS `#1777264 outstanding-blue` после техработ 20 августа публичные видео временно обслуживает изолированный контейнер `tg26-media-backup` на втором VPS `open-blue` через `https://media.213-176-94-245.sslip.io`. PastLife-контейнеры и база не изменялись.
- На сайте добавлен CTA-блок `План-сценарий свадебного вечера` перед секцией цен.
- На сайте есть отдельная production-страница `https://timurgromov.ru/scenario/` с материалом про логику свадебного вечера.
- На сайте появился отдельный hub `https://timurgromov.ru/articles/` для SEO-материалов и безопасного наращивания органического слоя вне главной страницы.
- В основном сайте добавлен юбилейный SEO-раздел `https://timurgromov.ru/yubiley/` на базе подготовленного `TG_yubiley_landing`; отдельный поддомен для юбилеев не используется как production.
- На сайте добавлена отдельная CTA-плашка `Бесплатная консультация` после секции цен.
- В hero-кнопке текст `получить сценарий` открывает popup с выбором Telegram или MAX; оба маршрута ведут в бота с payload `site_plan_home`.
- Кнопки `Получить сценарий` в CTA-блоке дают выбор Telegram или MAX; оба маршрута ведут в бота с payload `site_plan_home`.
- Сценарные клики сайта отправляют JS-цели Яндекс.Метрики `site_plan_popup_open`, `site_plan_messenger_click`, `site_plan_telegram_click`, `site_plan_max_click`; канал фиксируется через `data-plan-channel="telegram|max"`, а место клика через `data-plan-source="plan_popup|plan_cta_block"`.
- Локальная проверка `npm run verify:contacts` теперь дополнительно валидирует, что hero click-layer `rec861352716` / `1738735136250` открывает `#plan-delivery-popup`, Telegram/MAX ссылки внутри popup и CTA-блока ведут именно в `site_plan`, а не в `site_meeting`, и не теряют Metrika/analytics атрибуты.
- Та же проверка падает при любом необработанном JavaScript-исключении страницы; `tilda-zero-1.1.min.js` загружается до body, чтобы экспортированные NLM-слайдеры не опережали T396 core на медленной сети.
- Сам CTA-блок сценария построен без открытой inline-формы: слева оффер и кнопки, справа краткое содержание материала.
- Текст CTA-блока объясняет, что в боте нужно ответить на 3 коротких вопроса, после чего пользователь получает сценарий, тайминг, ключевые блоки и полезные материалы.
- Hero popup `Получить сценарий` показывает компактное preview материала с отдельным чёрно-белым портретом Тимура из site assets, но не даёт прямую ссылку на `/scenario/`; CTA в popup ведут в Telegram-бота или MAX-бота.
- Старый tripwire popup с формой оставлен в коде как скрытая заготовка, но активные кнопки его больше не открывают.
- Кнопки `Обсудить свадьбу` и `Записаться на бесплатную встречу` открывают единый contact pop-up, а не ведут напрямую в личку.
- В contact pop-up есть три маршрута: Telegram, MAX и форма телефона. Telegram и MAX главной указывают на bot deep link `site_meeting_home`.
- Видимые Telegram-контакты больше не ведут в личный `@timurgromovv`; главная использует `site_meeting_home`, `/scenario/` — `site_meeting_scenario`, `/materials/` — `site_meeting_materials`.
- Форма консультации в pop-up подключена к `EventBudjet`: обязательные поля `Имя` и `Телефон`, необязательный `Комментарий`, отправка в `Все заявки` и мгновенное Telegram-уведомление в канал CRM-заявок.
- После успешной отправки формы pop-up показывает отдельное success-состояние: поля скрываются, появляется оранжевая галочка, заголовок `Заявка отправлена`, пояснение и ссылка `Написать в Telegram`.
- Под формой телефона добавлены legal-ссылки на политику конфиденциальности и согласие на обработку персональных данных.
- Во вкладке `консультация` обновлен текст под формат, гостей, площадку, тайминг и безопасное знакомство без обязательств.
- Разовые локальные preview через `npm run preview` дают временные порты и не должны использоваться как постоянная точка входа.
- Для стабильного локального просмотра используется docker-compose сценарий на `http://127.0.0.1:4323/`.
- Сборка `npm run build` проходит.
- GitHub Actions использует один deploy-path: `deploy-gh-pages.yml` собирает `main` и обновляет ветку `gh-pages`; отдельный `code-health.yml` проверяет Astro build на PR/main без deploy и production secrets.
- `public/sitemap.xml` теперь должен включать как минимум `/`, `/materials/`, `/scenario/`, `/articles/` и `/yubiley/`.

## Known Blockers

- Aeza VPS `#1777264 outstanding-blue` загружается, но сбрасывает входящие SSH/HTTP/HTTPS даже в Rescue; Rescue VNC возвращает `Internal Server Error`. Это блокирует основной media host и размещённый на том же VPS SOCKS5 proxy до ремонта сети со стороны Aeza.
- На резервном media host пока нет трёх локальных review-файлов (`review_temur_margo_RF.mp4`, `review_katya_zhenya_RF.mp4`, `review_russian_cuban_RF.mp4`): исходники были только на недоступном VPS. Hero, кейсы, showreel, Антон/Кристина, советы и шесть материалов восстановлены; webinar временно восстановлен из его исходного Boomstream MP4 через собственный VPS.
- Telegram deep links зафиксированы: `site_plan` для получения сценария и полезных материалов через квалификацию, `site_meeting` для прямого Telegram-контакта и встречи.
- MAX bot deep links зафиксированы: `site_plan` для сценария, `site_meeting` для встречи, `direct_personal` для калькулятора.
- Для сайта `site_plan` остаётся единым source/intent, а Telegram/MAX различаются каналом: на сайте через Metrika goal params и `data-plan-channel`, в EventBudjet через provider/account/event payload после старта бота.
- Сам бот и админская логика источников находятся в `EventBudjet`; сайт только хранит ссылки на готовые bot payload.
- Production backend уже принимает site consultation requests с `timurgromov.ru`, создаёт карточки в `Все заявки` и отправляет мгновенные Telegram-уведомления в канал CRM-заявок. Legacy endpoint `/api/v1/site/tripwire-request` остаётся в backend и может использоваться снова, если сайт вернёт popup-квалификацию.

## Important Defaults

- Главный оффер сайта сейчас: `Получить сценарий свадебного вечера`.
- Deep link главного оффера:
  - Telegram: `https://t.me/gromov_wedding_bot?start=site_plan`
  - MAX: `https://max.ru/id615491029963_bot?start=site_plan`
- Deep link встречи и прямого Telegram-контакта: `https://t.me/gromov_wedding_bot?start=site_meeting`.
- Direct-contact copy `Напишите сообщение прямо здесь...` относится только к `site_meeting` и не должна появляться на `site_plan` входах.
- Прямой личный Telegram `@timurgromovv` не использовать как public CTA на сайте; для Telegram-контакта вести через бота, чтобы заявка попадала в `CRM заявки`.
- Для главного оффера сценария hero открывает короткий popup с выбором Telegram или MAX; квалификация из 3 вопросов проходит в выбранном боте до выдачи сценария и полезных материалов.
- Все полезные материалы внутри бота, кроме свадебного калькулятора, должны вести через `site_plan` qualification-first flow.
- `/scenario/` считается post-qualification страницей; внутри неё можно давать прямые ссылки на дополнительные материалы без повторного запуска `site_plan`.
- На главной странице нельзя давать прямой CTA на `/scenario/`: эта страница является финальным материалом после bot-flow, а не альтернативным открытым входом.
- Hero CTA обещает ценность (`получить сценарий`), а CTA-блок рядом уточняет каналы доставки (`Telegram` или `MAX`).
- Конечный материал для bot-first воронки должен открываться на маршруте `/scenario/`, а не на главной странице сайта.
- Бесплатная встреча - главная бизнес-цель сайта, поэтому она может быть вынесена отдельным вторым CTA-блоком, но не должна заменять первый холодный вход через план вечера.
- UX консультации строится вокруг одного pop-up: визуально разные способы связи, технически в будущем все должны попадать в бота/CRM с источником.
- Калькулятор бюджета не является главным CTA на сайте.
- Полезные материалы, смета и чеклисты - второй уровень, уже внутри Telegram-бота, а не отдельные равные офферы на лендинге.
- Для live-правок сайта после commit/push в `main` дождаться автодеплоя GitHub Pages и проверить `https://timurgromov.ru/`.
- Юбилейный лендинг для SEO публикуется внутри этого же сайта на `/yubiley/`; не переносить production на `yubiley.timurgromov.ru` без нового явного решения.

## Do Not Accidentally Revert

- Не возвращать калькулятор бюджета в роль главного tripwire на сайте без нового продуктового решения.
- Не раздувать лендинг несколькими равными CTA для разных материалов.
- Для задач, которые меняют сайт, работа считается завершенной только после `commit -> push в main -> deploy -> live-check`.

## Where To Look First

- Project rules: `AGENTS.md`
- Funnel discussion summary: `docs/telegram-funnel-roadmap.md`
- Decisions: `docs/history/DECISIONS.md`
- Worklog: `docs/history/worklog/`
- Main implementation: `src/pages/index.astro`, `src/site/home-data.ts`
- Scenario article implementation: `src/pages/scenario.astro`, `public/images/scenario-hero.jpg`
- SEO hub implementation: `src/pages/articles/index.astro`
- Jubilee landing implementation: `src/pages/yubiley/index.astro`, `src/yubiley/`, `public/yubiley-assets/`

## Last Known Good State

- Branch: `main`
- Local verification: `npm run verify:contacts` (desktop `1911x1064`, desktop `1440x900`, mobile `390x844`, включая uncaught runtime exceptions), stable local docker preview `http://127.0.0.1:4323/`.
- Последнее правленное состояние: CTA-блок сценария очищен от нижних proof-карточек и прямой ссылки на `/scenario/`; hero popup оставлен компактным bot-first preview с выбором Telegram или MAX.
- Production deploy: выполняется через push в `main` и GitHub Actions `deploy-gh-pages`; GitHub Pages source — ветка `gh-pages` (`/`).
