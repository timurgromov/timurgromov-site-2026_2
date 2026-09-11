# Current State - 2026-09-11

## Mobile final CTA portrait safe crop ready for release (2026-09-11)

- The shared final CTA on `/scenario/`, `/materials/`, the preparation guide
  and the wedding-budget article now uses its own mobile focal rule:
  `object-position: 62% 0%` at `<=640px`. It no longer inherits a page's
  desktop crop, so the full top of Timur's head stays inside the horizontal
  photo stencil on phones.
- Desktop and tablet route-specific crops, the photo stencil/asset, CTA
  controls, deep links, sources and consultation popup are unchanged.
- The responsive gate permanently covers `375x812`, `430x932` and `440x956`
  for every shared CTA route and fails if the mobile crop changes or the
  portrait disappears. The local build and full matrix passed; a fresh
  `430x932` candidate capture confirms the requested visible crop.

## Wedding-budget final conversion contour ready for release (2026-09-11)

- `/articles/byudzhet-svadby-v-moskve/` now ends with the literal homepage
  conversion island «Всё для подготовки к свадьбе», its four paths, portrait,
  phone, consultation pop-up and common footer. The page-local footer was
  removed, so the useful article content flows directly into the shared contour.
- The new final paths preserve attribution: materials use
  `site_plan_timurgromov__wedding_budget__final`; consultation, its popup and
  form use `site_meeting_timurgromov__wedding_budget__final`. Calculator CTA
  pairs keep their separate `site_calculator_...__{hero|mid_article|final}`
  source family.
- The permanent site rule is now explicit: every public wedding SEO/editorial
  article gets one final big CTA by default; every messenger/Mini App/form CTA
  carries its own structured source. `/articles/` remains a catalogue and is
  outside this rule.
- Local build and full responsive matrix passed. In-app browser review of the
  fresh local candidate confirms the final island and common footer are visible
  after the article. Live messenger traversal was not performed because it
  would create production bot/CRM data and has no explicit test-lead approval.

## Wedding Hero balanced content lane live (2026-09-11)

- The four wedding-editorial Heroes use a shared three-row desktop grid:
  service block at the top, author row at the bottom and the H1/lead/CTA group
  vertically centred in the lane between them. This removes the formerly
  top-pinned copy stack and lower empty void without a budget-only exception.
- The permanent responsive gate now runs the owner-reported `1232x638`
  viewport for all four routes and fails if the upper/lower free lane gaps
  differ by more than `2px`. It also retains all earlier fit, typography,
  portrait and action assertions.
- Fresh local in-app-browser evidence at `1232x638` measured equal gaps on all
  routes; production budget Hero measured `93px` above and `93px` below the
  content group with no horizontal overflow. The mobile `390x844` Hero was
  also visually inspected.
- Runtime commit `b937376` is pushed and live. `Code health`, `Deploy to
  gh-pages`, production HTML confirmation and the production responsive matrix
  passed.

## Unified wedding Hero system pending release (2026-09-11)

- The previous shared component still permitted `standard`, `compact` and
  CTA-height variants; the owner review correctly showed four visibly different
  first screens. Those page-level modes are removed.
- `/articles/`, `/scenario/`, the preparation guide and the budget article now
  share one H1/lead type scale, portrait focal point, service-line top anchor
  and author-row bottom anchor. The calculator action slot no longer changes
  the Hero grid.
- Global short-height modes now apply to every route at `<=780px` and
  `<=650px`, keeping the longest budget Hero fully inside the initial desktop
  viewport without shrinking only that page. Portrait focal positions are
  `74% 0%` desktop and `72% 0%` mobile, keeping the full head visible.
- The responsive gate now compares the four routes at the same viewport and
  fails on differences in anchors, H1/lead scale, byline anchor or portrait
  focal point. Runtime commit `ba30971` is pushed, but its Linux CI check found
  that font metrics at `1232x582` compressed the shared action-to-byline gap to
  `15.2px`; Linux then exposed the more general source: a `ch`-based H1
  measure produces materially different Cyrillic wrapping across font engines.
  The shared system now uses a stable `660px` H1 measure and reduces only the
  global very-short byline's internal top padding, restoring room without a
  page-specific exception.
- Runtime commit `5aded0c` is pushed and live. Code health and Deploy to
  gh-pages passed; the fresh production matrix passed all 21 required cases,
  including the four-route `1911x764` / `1911x839` comparison and budget
  `1232x582`. Fresh Chrome captures of the published budget and preparation
  Heroes confirm the full head, shared service-line anchor and author-row
  breathing room.

## Wedding Hero vertical anchors and real wide-short viewport (2026-09-11)

- The earlier `max-height: 820px` portrait condition did not cover the owner's
  actual Chrome content area of approximately `1911x839`. The shared focal rule
  now uses a `2:1` aspect-ratio condition, so both reported wide-short windows
  keep visible space above the head.
- Desktop wedding Heroes without primary actions no longer bottom-align the
  entire copy stack. Their service block is fixed `74px` from the top and author
  row `88px` from the bottom; short titles receive breathing room in the middle
  instead of pushing «Авторский материал» downward.
- `/articles/` and `/scenario/` were rendered side by side at `1911x839`: top
  and bottom anchors align, the portrait crop matches, and mobile `390x844`
  remains intact. Responsive coverage is now 230 cases.
- Runtime commit `65a3910` is pushed and live. Code health, Deploy to gh-pages,
  exact-commit verification and fresh production comparison of `/articles/`
  and `/scenario/` at `1911x839` all passed.

## Articles hub restored to a catalogue and wide-short portrait fixed (2026-09-11)

- `/articles/` has one job again: help a visitor choose among the three
  published materials. The invented promise/CTA section and unpublished-topic
  showcase are removed; material links are restrained editorial rows rather
  than a page-local button family.
- The shared Hero now uses an upper `74% 10%` focal point on wide-short desktop
  windows. A rendered local check at the owner-reported `1911x764` composition
  shows the full head with clear space above it; mobile `390x844` and the budget
  Hero at `1232x582` remain intact.
- Responsive QA now covers 226 cases. The exact `1911x764` viewport runs on all
  four wedding-editorial routes and the hub contract fails if independent promo
  sections or oversized catalogue typography return.
- Runtime commit `7116152` is pushed and live. Code health, Deploy to gh-pages,
  exact-commit/marker verification and fresh production checks at `1911x764`
  passed for both Hero framing and the published-material list.

## Articles hub uses the shared wedding Hero (2026-09-11)

- `/articles/` no longer carries a separate page-local portrait Hero. It now
  uses `WeddingArticleHero.astro`; the concise current H1 is «Статьи о
  свадьбе».
- The production `1280x720` regression is closed: Hero height changed from
  `775.27px` to `605.8px`, H1 from `89.6px` across five lines to `65.28px`
  across two lines, and the overlapping service text is gone.
- At `390x844`, Hero height is `466.2px` instead of the old fixed `760px`, so
  the first published-material section appears in the initial viewport.
- `/articles/` is part of the strict Article UI assertions with permanent
  route-specific `1280x720` and `1911x764` cases. The current matrix contains
  226 cases.
- The earlier shared-Hero baseline shipped in `a3c2996`; the catalogue
  simplification and wide-short focal fix are the current pending release.

## Shared wedding article UI kit and composition QA (2026-09-11)

- `/scenario/`, `/articles/plan-podgotovki-k-svadbe/` and
  `/articles/byudzhet-svadby-v-moskve/` now consume the same native Astro Hero,
  introduction and wedding-editorial stylesheet. The homepage Tilda/Astro
  layer remains separate and unchanged.
- The budget Hero no longer achieves first-screen fit by miniaturizing the
  design. At the exact live `1232x582` viewport it uses a `51.744px` H1,
  `20.944px` lead, `42px` controls and `34/24/28/32px` semantic gaps; the
  byline ends at `520.6px`, leaving `61.4px` below it.
- The shared portrait has an explicit upper focal point and no transform scale,
  so the head remains complete. Introduction body text uses the shared
  `19px` desktop / `17px` mobile sans role and a maximum `660px` measure.
- Responsive QA now waits for applied stylesheets and checks semantic group
  spacing, control height, portrait treatment and introduction hierarchy in
  addition to overflow and first-screen bounds. The exact `1232x582` budget
  case is permanent: local coverage is 221 cases, not an ad hoc screenshot.
- Runtime commit `782235f` is pushed and live. Code health, Deploy to gh-pages,
  live marker verification and a fresh production screenshot at `1232x582`
  passed. Full evidence is in
  `docs/ui-evidence/2026-09-11-wedding-article-ui-kit-evidence.json`.

## Expert-page conversion contour (2026-09-08)

- `/scenario/`, `/materials/` and `/articles/plan-podgotovki-k-svadbe/` share
  one home-site CTA island: four canonical split-buttons, phone text link,
  author portrait and the existing contact pop-up. Copy and portrait crop vary
  by page; button markup, font and interaction are intentionally identical to
  the homepage pattern.
- Each expert page now owns exact source codes: `site_plan_scenario`,
  `site_meeting_scenario`, `site_plan_materials`, `site_meeting_materials`,
  `site_plan_preparation_plan` and `site_meeting_preparation_plan`. The
  frontend source list and EventBudjet Telegram/MAX allowlists must ship
  together; generic `site_plan` / `site_meeting` remain legacy compatibility
  only.
- The homepage and all Direct contracts remain outside the contour. Browser QA
  reads rendered deep-link targets without opening them, so it creates no
  production CRM record.
- UI contract/evidence: `docs/ui-evidence/2026-09-08-expert-conversion-contour-contract.md`
  and `docs/ui-evidence/2026-09-08-expert-conversion-contour-evidence.json`.
- Future-page CTA commands are fixed: «Большой CTA» means the literal
  `renderExpertConversionContour` island, and «Маленький CTA» means the
  literal `ExpertMaterialsInlineCta` materials island. Their source and
  cross-project attribution checklist are owned by `docs/CTA_TEMPLATES.md`.

## Open SEO guide: preparation plan (2026-09-10)

- `/articles/plan-podgotovki-k-svadbe/` is the first open long-form guide in
  the wedding preparation cluster: twelve practical stages, a checklist,
  article navigation and non-blocking paths to materials or consultation.
- Its first screen and editorial body now use the canonical `/scenario/`
  wedding-content system: black-and-white author portrait, dark layered Hero,
  orange accent and shared display/italic type roles. The article remains a
  structured plan, not a clone of the scenario text.
- It is linked from `/articles/` and listed in `public/sitemap.xml`.
- Its Telegram/MAX CTA retains the proven `site_meeting_home` bot intent while
  the site handoff now passes bounded acquisition context, exact landing path
  and CTA code to EventBudjet. This keeps paid Direct classification separate
  from organic/referral entries.
- UI contract/evidence: `docs/ui-evidence/2026-09-08-preparation-plan-page-contract.md`
  and `docs/ui-evidence/2026-09-08-preparation-plan-page-evidence.json`;
  the brand-system change is documented in
  `docs/ui-evidence/2026-09-10-preparation-plan-brand-contract.md` and its
  matching evidence record.

## Hero CTA typography is scale-safe (2026-09-07)

- The homepage scenario CTA label now counter-scales Tilda's ancestor `zoom`.
  Its effective rendered size is 14px, one line and about 184px wide from
  mobile through wide desktop; only the existing split-button geometry changes
  between the established Hero modes.
- `check-responsive-layout.mjs` measures effective text size after ancestor
  zoom/transforms, rendered width and line count, and fails when the Hero CTA
  typography leaves its contract. The default release matrix now includes
  `1504x900` and `1728x900` windowed-desktop probes.
- Contract and current evidence: `docs/ui-evidence/2026-09-07-home-hero-cta-typography-contract.md`
  and `docs/ui-evidence/2026-09-07-home-hero-cta-typography-evidence.json`.

## Tilda runtime races closed (2026-09-07)

- `/materials/` no longer starts its popup listener before `body`, keeps the
  exported header inside `#allrecords`, and waits for the matching Tilda Zero
  Block before a legacy ScrollBooster callback asks it to resize. The same
  callback guard covers the two legacy homepage price-scroll blocks.
- The materials carousel's intentionally off-canvas cards are clipped at the
  records boundary, preventing their async positioning from widening a
  tablet-width document.
- `check-responsive-layout.mjs` now fails on every uncaught browser runtime
  error rather than reporting Tilda errors as non-blocking warnings. It blocks
  third-party/media requests during local geometry QA so the matrix is stable;
  the real popup/video action is verified separately in a browser.
- Local verification passed: 9 routes × 18 viewport cases, materials CTA and
  popup/video, and the contact layout checks. Release status is recorded in
  `docs/history/worklog/2026-09-07-tilda-runtime-guard.md`.

## Paid landing health contract added (2026-09-07)

- The reusable check contract is `docs/paid-landing-health.md`: a bounded daily
  live smoke checks landing markers, CRM health and every configured video
  response without submitting a form; Monday additionally proves actual hero
  playback at desktop and mobile viewports.
- The first local run against production passed: page `200`, CRM `200/status:
  ok`, all 17 registered videos `206 video/mp4`, and both hero variants decoded
  and advanced in a temporary headless browser. The history record is
  `docs/history/worklog/2026-09-07-paid-landing-health-automation.md`.
- The schedule is owned by the existing Direct daily analysis heartbeat rather
  than a second site cron. A result of `failed` or `unknown` is a landing
  quality blocker for interpretation/proposals, never an automatic Direct
  pause or a fake CRM-lead test.
- Site tools/docs are published in `b7c77ee`; the live page was re-verified
  after push. The static website output is intentionally unchanged because the
  scripts run from the scheduled analysis checkout.

## Direct tracking bundle retained in production (2026-08-30)

- Release `e08c299` is pushed to `main`; Deploy to gh-pages, Code health and
  Pages build/deployment Actions completed successfully.
- The shared tracking helper keeps the five UTM fields plus `yclid`,
  `direct_campaign_id`, `direct_source_type` and `direct_region_id` in one
  session bundle used by Telegram/MAX attribution, consultation and tripwire
  requests. Existing clients remain compatible because new form fields are
  optional in EventBudjet.
- Live headless-browser verification opened the marked production URL, then
  navigated to clean `https://timurgromov.ru/` in the same session. The bundle
  retained campaign `713822709`, source type `search`, region `213`, `yclid`
  and the UTM values. No form was submitted and no production test lead was
  created.
- Local attribution contract and Astro production build passed. This release
  changes no advertisement, Direct link, visible UI or user flow.

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
- Responsive release gate `npm run verify:responsive-layout` автоматически проверяет все `src/pages/**/*.astro`: 9 текущих маршрутов на 18 viewport-точках (`162` случая), включая `B-1/B/B+1` вокруг `480/640/1024/1200`; главная дополнительно проверяется по высоте Hero, физическому `--zoom:1`, ключевым блокам и CTA. Новые статические страницы входят в gate автоматически.
- GitHub Actions использует один deploy-path: `deploy-gh-pages.yml` собирает `main`, ставит Chromium, запускает responsive gate и только затем обновляет ветку `gh-pages`; отдельный `code-health.yml` повторяет Astro build и responsive gate на PR/main без deploy и production secrets.
- `public/sitemap.xml` теперь должен включать как минимум `/`, `/materials/`, `/scenario/`, `/articles/` и `/yubiley/`.

## Known Blockers

- Aeza VPS `#1777264 outstanding-blue` загружается, но сбрасывает входящие SSH/HTTP/HTTPS даже в Rescue; Rescue VNC возвращает `Internal Server Error`. Это блокирует основной media host и размещённый на том же VPS SOCKS5 proxy до ремонта сети со стороны Aeza.
- Предыдущий blocker о трёх review-файлах на резервном host superseded: 7
  сентября все три и остальные 14 зарегистрированных MP4 ответили `206
  video/mp4` в live range-check. Причина восстановления носителя отдельно не
  расследовалась.
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
- Local verification: `npm run verify:contacts` (desktop `1911x1064`, desktop `1440x900`, mobile `390x844`, включая uncaught runtime exceptions) и `npm run verify:responsive-layout` (все 9 маршрутов × 18 viewport-точек), stable local docker preview `http://127.0.0.1:4323/`.
- Последнее правленное состояние: CTA-блок сценария очищен от нижних proof-карточек и прямой ссылки на `/scenario/`; hero popup оставлен компактным bot-first preview с выбором Telegram или MAX.
- Production deploy: выполняется через push в `main` и GitHub Actions `deploy-gh-pages`; GitHub Pages source — ветка `gh-pages` (`/`).

## Wedding-budget article live release (2026-09-10)

- Added the evergreen Moscow/MO article
  `/articles/byudzhet-svadby-v-moskve/`. It explains expense structure and
  estimate maintenance without years, market-average totals or price ranges.
- The article uses the approved wedding-editorial design from `/scenario/`:
  black-and-white author portrait, dark Hero, warm-neutral reading canvas,
  orange accent and shared display/italic type roles.
- `/articles/` was rebuilt in the same corporate style. It remains an
  indexable navigation and internal-linking hub without an independent keyword
  cluster; the budget article is its featured entry.
- Three sanitized screenshots are rendered from the real EventBudjet Mini App
  component with a fixture account and hidden money values. They show expense
  selection, the service/factor hint and the autosave/copy state.
- All six article CTA links use direct Mini App `startapp` URLs and exact
  sources `site_calculator_timurgromov__wedding_budget__{hero|mid_article|final}`.
- Initial site commit `6dec7b6` is pushed and live. GitHub Pages deploy and code-health
  workflows passed; production returns `200` for the hub, article, sitemap and
  all three calculator screenshots. The sitemap contains the new canonical URL.
- Production desktop/mobile checks passed without horizontal overflow or
  JavaScript errors. All six CTA links retain their placement source in
  `data-calculator-source`; Metrika replaces only the transport payload with a
  short `yd_*` attribution token.
- EventBudjet runtime `6a199fe` is deployed. An authorised MAX Web launch from
  the live Hero CTA opened the Mini App and wrote `calculator_opened` with the
  exact Hero source while preserving the existing lead origin. Telegram Web
  opened the production Mini App, restored the estimate and confirmed copy,
  but converted the tested exact `startapp` deep link to generic `/start`;
  exact Telegram article-source retention remains an open live proof gate.
- Follow-up UI correction `2026-09-10-budget-hero-title-and-copy` reduces the
  article H1 from the reported `82.544px` / `452px` text box to
  `62.832px` / `301.234px` at `1232x638`. The middle CTA now says
  «Выберите нужные расходы и соберите свою смету», and the article copy was
  edited for direct, natural Russian without changing the page intent, schema,
  links or calculator attribution. Site commit `3f1ab06` is live; both GitHub
  workflows passed and the production page was rechecked at `1232x638` with no
  overflow. Search-engine registration is owned and recorded in `SEO/`.
- Follow-up contract `2026-09-10-budget-hero-first-viewport-fit` makes the
  budget article Hero height-aware: at the owner-reported `1232x582`, the full
  H1, lead, both calculator controls and author row fit without scrolling, with
  actions ending at `425.23px`. Calculator controls now use a standalone native
  Astro corporate split-button helper and the homepage's approved responsive
  proportions; the article output contains no Tilda classes, Zero Block markup
  or Tilda runtime dependency. The generic responsive gate enforces marked
  first-screen Hero actions on future native routes. The complete 11-route x
  20-viewport matrix passed locally. Site commit `a6ce704` is pushed and live;
  both GitHub workflows passed, production HTML contains the native markers and
  no legacy CTA class, the article and neutral arrow asset return `200`, and a
  fresh production browser screenshot confirms the exact short-screen result.

## Compact short editorial Heroes (2026-09-11)

- `/articles/` and `/articles/plan-podgotovki-k-svadbe/` now use the explicit
  shared `compact` Hero role. It preserves the corporate portrait, typography,
  service/byline anchors and top-safe portrait focus while removing the lower
  empty field on the two short-copy covers.
- Desktop role: `clamp(480px, 75svh, 640px)`; mobile stays natural flow. This
  is intentionally limited to these two routes. The budget calculator Hero and
  scenario Hero remain in the default `screen` role.
- Site commit `a1ba666` first failed CI because the broad fallback-font plan
  layout exposed only `30.61px` before the author line at `1911x839`; corrective
  commit `855ac44` is pushed and live. `Code health`, `Deploy to gh-pages`,
  the local matrix and a production responsive run passed. Fresh in-app browser
  inspection confirmed the compact covers, visible next sections and upper
  air around Timur's portrait.
- Follow-up commit `8d3cc0e` refines only the compact-role desktop portrait
  framing from the rejected flush `74% 30%` candidate to `74% 25%`. At the
  owner-reported `1232x582`, both published compact covers now retain a small
  visible gap above Timur's hair without restoring the former large ceiling.
  `Code health`, `Deploy to gh-pages`, local and production responsive checks,
  and fresh production in-app-browser inspection all passed. Screen-role and
  mobile portrait framing remain unchanged.
