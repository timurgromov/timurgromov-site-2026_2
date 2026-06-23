# Current State - 2026-06-23

## Project

Сайт свадебного ведущего Тимура Громова на Astro поверх Tilda export. Текущий этап: production-входная воронка сайта подключена к EventBudjet CRM, главный tripwire `Получить сценарий` ведёт в Telegram-бота по qualification-first flow, а сам материал теперь живёт на отдельной production-странице `/scenario/` внутри этого же сайта.

## Current Runtime / Stack

- Frontend: Astro 5 + Tilda-export HTML transforms
- Main page source: `files/page62008353body.html` + `src/pages/index.astro`
- Content constants: `src/site/home-data.ts`
- Scenario article route: `src/pages/scenario.astro`
- Deploy target: GitHub Pages as technical publish path, production domain `timurgromov.ru`
- Telegram bot project: находится в другой папке и в этот репозиторий не входит

## What Works Now

- На сайте добавлен CTA-блок `План-сценарий свадебного вечера` перед секцией цен.
- На сайте есть отдельная production-страница `https://timurgromov.ru/scenario/` с материалом про логику свадебного вечера.
- На сайте добавлена отдельная CTA-плашка `Бесплатная консультация` после секции цен.
- В hero-кнопке текст `получить сценарий` ведёт напрямую в Telegram-бота по deep link `site_plan`.
- Кнопка `Получить сценарий` в CTA-блоке тоже ведёт напрямую в Telegram-бота по deep link `site_plan`.
- Сам CTA-блок сценария построен без открытой inline-формы: слева оффер и кнопки, справа краткое содержание материала.
- Текст CTA-блока объясняет, что в Telegram-боте нужно ответить на 3 коротких вопроса, после чего пользователь получает сценарий, тайминг, ключевые блоки и полезные материалы.
- Hero popup `Получить сценарий` показывает компактное preview материала с отдельным чёрно-белым портретом Тимура из site assets, но не даёт прямую ссылку на `/scenario/`; единственный CTA в popup ведёт в Telegram-бота.
- Старый tripwire popup с формой оставлен в коде как скрытая заготовка, но активные кнопки его больше не открывают.
- Кнопки `Обсудить свадьбу` и `Записаться на бесплатную встречу` открывают единый contact pop-up, а не ведут напрямую в личку.
- В contact pop-up есть три маршрута: Telegram, MAX и форма телефона. Telegram-маршрут указывает на deep link бота `site_meeting`; MAX остается контактным fallback.
- Видимые Telegram-контакты главной страницы и страницы `/scenario/` больше не ведут в личный `@timurgromovv`; все такие CTA ведут в бот `gromov_wedding_bot` с payload `site_meeting`.
- Форма консультации в pop-up подключена к `EventBudjet`: обязательные поля `Имя` и `Телефон`, необязательный `Комментарий`, отправка в `Все заявки` и мгновенное Telegram-уведомление в канал CRM-заявок.
- После успешной отправки формы pop-up показывает отдельное success-состояние: поля скрываются, появляется оранжевая галочка, заголовок `Заявка отправлена`, пояснение и ссылка `Написать в Telegram`.
- Под формой телефона добавлены legal-ссылки на политику конфиденциальности и согласие на обработку персональных данных.
- Во вкладке `консультация` обновлен текст под формат, гостей, площадку, тайминг и безопасное знакомство без обязательств.
- Разовые локальные preview через `npm run preview` дают временные порты и не должны использоваться как постоянная точка входа.
- Для стабильного локального просмотра используется docker-compose сценарий на `http://127.0.0.1:4323/`.
- Сборка `npm run build` проходит.

## Known Blockers

- Telegram deep links зафиксированы: `site_plan` для получения сценария и полезных материалов через квалификацию, `site_meeting` для прямого Telegram-контакта и встречи.
- Финальный deep-link на MAX-бота тоже не зафиксирован; текущая MAX-ссылка остается временным контактным fallback.
- Сам бот и админская логика источников находятся в `EventBudjet`; сайт только хранит ссылки на готовые bot payload.
- Production backend уже принимает site consultation requests с `timurgromov.ru`, создаёт карточки в `Все заявки` и отправляет мгновенные Telegram-уведомления в канал CRM-заявок. Legacy endpoint `/api/v1/site/tripwire-request` остаётся в backend и может использоваться снова, если сайт вернёт popup-квалификацию.

## Important Defaults

- Главный оффер сайта сейчас: `Получить сценарий свадебного вечера`.
- Deep link главного оффера: `https://t.me/gromov_wedding_bot?start=site_plan`.
- Deep link встречи и прямого Telegram-контакта: `https://t.me/gromov_wedding_bot?start=site_meeting`.
- Прямой личный Telegram `@timurgromovv` не использовать как public CTA на сайте; для Telegram-контакта вести через бота, чтобы заявка попадала в `CRM заявки`.
- Для главного оффера сценария сайт должен вести сразу в Telegram-бота; квалификация из 3 вопросов проходит в боте до выдачи сценария и полезных материалов.
- Все полезные материалы внутри бота, кроме свадебного калькулятора, должны вести через `site_plan` qualification-first flow.
- На главной странице нельзя давать прямой CTA на `/scenario/`: эта страница является финальным материалом после bot-flow, а не альтернативным открытым входом.
- Hero CTA обещает ценность (`получить сценарий`), а CTA-блок рядом уточняет канал доставки (`в Telegram`).
- Конечный материал для bot-first воронки должен открываться на маршруте `/scenario/`, а не на главной странице сайта.
- Бесплатная встреча - главная бизнес-цель сайта, поэтому она может быть вынесена отдельным вторым CTA-блоком, но не должна заменять первый холодный вход через план вечера.
- UX консультации строится вокруг одного pop-up: визуально разные способы связи, технически в будущем все должны попадать в бота/CRM с источником.
- Калькулятор бюджета не является главным CTA на сайте.
- Полезные материалы, смета и чеклисты - второй уровень, уже внутри Telegram-бота, а не отдельные равные офферы на лендинге.
- Для live-правок сайта после commit/push в `main` дождаться автодеплоя GitHub Pages и проверить `https://timurgromov.ru/`.

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

## Last Known Good State

- Branch: `main`
- Local verification: `npm run build`, stable local docker preview `http://127.0.0.1:4323/`.
- Последнее правленное состояние: CTA-блок сценария очищен от нижних proof-карточек и прямой ссылки на `/scenario/`; hero popup оставлен компактным bot-first preview с единственным Telegram CTA.
- Production deploy: выполняется через push в `main` и GitHub Actions `deploy-gh-pages`.
