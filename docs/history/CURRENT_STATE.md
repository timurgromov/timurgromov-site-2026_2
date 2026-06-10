# Current State - 2026-06-08

## Project

Сайт свадебного ведущего Тимура Громова на Astro поверх Tilda export. Текущий этап: локально прорабатывается новая входная воронка с сайта в Telegram без deploy в production.

## Current Runtime / Stack

- Frontend: Astro 5 + Tilda-export HTML transforms
- Main page source: `files/page62008353body.html` + `src/pages/index.astro`
- Content constants: `src/site/home-data.ts`
- Deploy target: GitHub Pages as technical publish path, production domain `timurgromov.ru`
- Telegram bot project: находится в другой папке и в этот репозиторий не входит

## What Works Now

- Локально добавлен новый CTA-блок `План свадебного вечера` перед секцией цен.
- Локально добавлена отдельная CTA-плашка `Бесплатная консультация` после секции цен.
- В hero-кнопке текст изменен на `получить план вечера`, и она ведет не в Telegram, а к объясняющей CTA-плашке.
- Кнопка `Получить план` в CTA-блоке теперь открывает локальный pop-up выбора канала: Telegram или MAX.
- Кнопки `Обсудить свадьбу` и `Записаться на бесплатную встречу` открывают единый contact pop-up, а не ведут напрямую в личку.
- В contact pop-up есть три маршрута: Telegram, MAX и форма телефона. Telegram-маршрут уже указывает на deep link бота `site_meeting`; MAX остается контактным fallback.
- Под формой телефона добавлены legal-ссылки на политику конфиденциальности и согласие на обработку персональных данных.
- Во вкладке `консультация` обновлен текст под формат, гостей, площадку, тайминг и безопасное знакомство без обязательств.
- Разовые локальные preview через `npm run preview` дают временные порты и не должны использоваться как постоянная точка входа.
- Для стабильного локального просмотра используется docker-compose сценарий на `http://127.0.0.1:4323/`.
- Сборка `npm run build` проходит.

## Known Blockers

- Telegram deep links зафиксированы локально: `site_plan` для получения плана и `site_meeting` для встречи. Production не обновлялся.
- Финальный deep-link на MAX-бота тоже не зафиксирован; текущая MAX-ссылка остается временным контактным fallback.
- Форма телефона в pop-up имеет фронтенд-разметку и endpoint `/api/consultation-lead`, но серверная отправка в бот/CRM еще не подключена в этом репозитории.
- Сам бот и админская логика источников находятся в `EventBudjet`; сайт только хранит ссылки на готовые bot payload.
- Production не обновлялся: пользователь попросил работать только локально до отдельного подтверждения.

## Important Defaults

- Главный оффер сайта сейчас: `Получить план свадебного вечера`.
- Deep link главного оффера: `https://t.me/gromov_wedding_bot?start=site_plan`.
- Deep link встречи: `https://t.me/gromov_wedding_bot?start=site_meeting`.
- Hero не должен выбрасывать пользователя сразу в Telegram: сначала показать объяснение оффера на странице, потом уже давать переход в Telegram.
- Hero CTA обещает ценность (`получить план вечера`), а не канал доставки.
- Бесплатная встреча - главная бизнес-цель сайта, поэтому она может быть вынесена отдельным вторым CTA-блоком, но не должна заменять первый холодный вход через план вечера.
- UX консультации строится вокруг одного pop-up: визуально разные способы связи, технически в будущем все должны попадать в бота/CRM с источником.
- Калькулятор бюджета не является главным CTA на сайте.
- Полезные материалы, смета и чеклисты - второй уровень, уже внутри Telegram-бота, а не отдельные равные офферы на лендинге.
- До явного разрешения пользователя нельзя делать `push`, `deploy:pages` или выкатывать изменения на GitHub Pages / production.

## Do Not Accidentally Revert

- Не возвращать калькулятор бюджета в роль главного tripwire на сайте без нового продуктового решения.
- Не раздувать лендинг несколькими равными CTA для разных материалов.
- Не деплоить локальную воронку до ручного одобрения пользователя.

## Where To Look First

- Project rules: `AGENTS.md`
- Funnel discussion summary: `docs/telegram-funnel-roadmap.md`
- Decisions: `docs/history/DECISIONS.md`
- Worklog: `docs/history/worklog/`
- Main implementation: `src/pages/index.astro`, `src/site/home-data.ts`

## Last Known Good State

- Branch: `codex/audit-tilda-astro-20260531`
- Local verification: `npm run build`, stable local docker preview `http://127.0.0.1:4323/`
- Production deploy: intentionally not performed for this iteration
