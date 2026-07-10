# Decisions

Этот файл фиксирует решения, которые важно помнить и не откатывать случайно.

## DEC-2026-06-30-JUBILEE-SEO-PATH

Status: active
Area: seo, routing, deploy, architecture
Decision date: 2026-06-30
Evidence: owner clarified that the original SEO agreement was to publish the jubilee offer on the main domain path, not as a separate subdomain
Commits: pending
Supersedes: none

Decision:
Юбилейный лендинг для SEO и Profi.ru должен публиковаться внутри основного сайта на `https://timurgromov.ru/yubiley/`. Отдельный репозиторий `TG_yubiley_landing` может оставаться технической заготовкой/источником шаблона, но production URL для SEO — только основной домен и путь `/yubiley/`.

Why:
Для SEO важнее усиливать основной домен `timurgromov.ru`, а не дробить посадочные страницы по поддоменам. Поддомен `yubiley.timurgromov.ru` технически возможен, но для этой задачи он создаёт лишнюю DNS/Pages-конфигурацию и противоречит согласованной цели.

Do:

- держать canonical/OG/structured data юбилейной страницы на `https://timurgromov.ru/yubiley/`;
- хранить route в основном репозитории сайта: `src/pages/yubiley/index.astro`;
- хранить scoped ассеты в `public/yubiley-assets/`, чтобы они не конфликтовали с главной свадебной страницей;
- включать `/yubiley/` в `public/sitemap.xml`;
- deploy делать через основной сайт: commit -> push `main` -> `gh-pages` -> live-check `timurgromov.ru/yubiley/`.

Do not:

- не включать production custom domain `yubiley.timurgromov.ru` для этой SEO-посадки;
- не считать отдельный repo `TG_yubiley_landing` отдельным production-сайтом для SEO;
- не менять основной домен/путь на поддомен без нового явного решения владельца.

Verification:

- `npm run build` генерирует `/yubiley/index.html`;
- production HTML содержит canonical `https://timurgromov.ru/yubiley/`;
- sitemap содержит `https://timurgromov.ru/yubiley/`.

## DEC-2026-06-24-HERO-SCENARIO-CTA-INTENT-CONTRACT

Status: active
Area: funnel, telegram, ux, copy
Decision date: 2026-06-24
Evidence: owner found a live regression where the hero CTA text still promised `Получить сценарий свадьбы`, but the click-layer opened `site_meeting` and therefore showed the direct-contact intro instead of the qualification-first scenario flow
Commits: pending
Supersedes: none

Decision:
Каждый публичный Telegram CTA на сайте закрепляется по намерению. Hero-кнопка `получить сценарий свадьбы` и любые другие CTA, которые обещают сценарий или материалы, обязаны вести только в `site_plan`. Прямой contact intro `Напишите сообщение прямо здесь — я увижу его как прямое обращение...` разрешён только для `site_meeting`.

Why:
Эта воронка ломается не только от неверного href, но и от подмены первого bot-сообщения. Если сценарная кнопка показывает direct-contact intro, пользователь не понимает, где обещанный сценарий, а владелец теряет смысл разделения CTA по намерению.

Do:

- держать hero click-layer `rec861352716` / `1738735136250` на сценарном намерении: он может открывать messenger choice popup, но Telegram/MAX ссылки внутри этого popup обязаны вести в `site_plan`;
- держать `site_plan` отдельным сценарием с qualification-first copy;
- держать `site_meeting` отдельным direct-contact сценарием с нейтральным сообщением про ответ в Telegram;
- проверять этот контракт через `npm run verify:contacts`, а не только через общий поиск `site_plan` / `site_meeting` в HTML.

Do not:

- не отправлять hero CTA `Получить сценарий свадьбы` в `site_meeting`;
- не вставлять direct-contact copy в `site_plan` старт;
- не считать достаточной проверкой только наличие обоих deep links где-то на странице без проверки конкретного CTA.

Verification:

- hero CTA text-layer остаётся сценарным;
- hero click-layer открывает `#plan-delivery-popup`, а Telegram/MAX ссылки внутри popup ведут в `site_plan`;
- `npm run verify:contacts` падает, если hero CTA откатывается на `site_meeting`.

## DEC-2026-07-10-HERO-SCENARIO-MESSENGER-CHOICE

Status: active
Area: funnel, ux, frontend, telegram, max
Decision date: 2026-07-10
Evidence: owner requested that the homepage hero CTA `Получить сценарий` no longer jump straight to Telegram now that MAX bot is available; existing popup pattern should be reused instead of designing a new block
Commits: pending
Supersedes: DEC-2026-06-14-SCENARIO-BOT-FIRST direct hero link rule

Decision:
Hero CTA `получить сценарий свадьбы` opens the existing compact `#plan-delivery-popup`, where the visitor chooses Telegram or MAX. Both messenger routes keep the same bot intent `site_plan`; the popup must not link directly to `/scenario/` and must not ask the old site-side tripwire questions.

Why:
The site now has two bot channels for the same scenario flow. A small messenger-choice popup preserves the bot-first qualification while avoiding a forced Telegram-only path. Reusing the existing popup and split-button pattern keeps the site design consistent.

Do:

- reuse `planDeliveryPopupAssets`, `planDeliveryPopupMarkup`, and canonical `tildaCtaLink` split-buttons;
- keep popup buttons as `Получить в Telegram` and `Получить в MAX`;
- keep both popup links on `site_plan`;
- keep the lower scenario CTA block as direct Telegram/MAX choices.
- track the site-side handoff with Metrika goals `site_plan_popup_open`, `site_plan_messenger_click`, `site_plan_telegram_click`, and `site_plan_max_click`;
- keep `site_plan` as the shared scenario intent/source and keep Telegram/MAX as channel/provider attribution, not separate competing source names.

Do not:

- do not add messenger logos or a new visual block;
- do not restore the old tripwire select form as the active hero path;
- do not send scenario CTA traffic to `site_meeting`;
- do not add a direct `/scenario/` CTA on the homepage.

Verification:

- `npm run verify:contacts` checks hero popup opener and popup Telegram/MAX `site_plan` links;
- `npm run verify:contacts` checks scenario Metrika goal strings plus `data-plan-channel` / `data-plan-source` on the popup and lower CTA buttons;
- browser verification covers desktop, wide desktop, compact desktop, and mobile popup fit.

## DEC-2026-06-23-TELEGRAM-MATERIALS-QUALIFICATION-FIRST

Status: active
Area: funnel, telegram, crm, copy
Decision date: 2026-06-23
Evidence: owner reported that `Получить сценарий` and direct Telegram contact felt like the same bot chain on production; audit showed site hrefs already differ (`site_plan` vs `site_meeting`), so the contract must be explicit in bot copy/runtime and docs
Commits: site `5d2fad8`, EventBudjet `dc479d0`
Supersedes: none

Decision:
Все полезные материалы внутри Telegram-бота, кроме свадебного калькулятора, должны открываться через qualification-first flow `site_plan`: 3 коротких вопроса, затем сценарий и материалы. Прямой Telegram-контакт `site_meeting` не должен проходить материальную квалификацию и должен просить пользователя написать Тимуру сообщение прямо в чате. Страница `/scenario/` является post-qualification материалом: если пользователь уже попал туда из bot-flow, дополнительные ссылки внутри статьи можно давать напрямую без повторной квалификации.

Why:
Кнопки сайта имеют разные намерения. `Получить сценарий` продаёт полезный материал и должен собрать минимальную квалификацию до выдачи ценности. `Написать в Telegram` означает прямой контакт с Тимуром, а не тот же сценарный путь. Если оба входа звучат одинаково, ломается воронка и владелец теряет понимание, зачем человек пришёл.

Do:

- держать `site_plan` отдельным стартом для сценария и материалов;
- в `site_plan` первым сообщением прямо говорить про 3 вопроса до выдачи сценария;
- держать `site_meeting` отдельным стартом для прямого сообщения Тимуру;
- кнопку `Полезные материалы` внутри `site_meeting` вести в `site_plan` qualification flow;
- оставлять свадебный калькулятор прямым исключением, потому что его квалификация происходит внутри калькулятора;
- на `/scenario/` разрешать прямые ссылки на дополнительные материалы, потому что пользователь уже прошёл qualification для доступа к этой странице;
- использовать имя `Тимур Громов` в публичном bot/site copy.

Do not:

- не отдавать сценарий, чеклисты, вебинарные материалы или корзину материалов до `site_plan` qualification на входах сайта и внутри бота;
- не писать, что `site_plan` отдаёт материал `без анкеты`;
- не делать `site_meeting` копией сценарной цепочки;
- не возвращать прямые публичные Telegram CTA на личный `@timurgromovv`.

Verification:

- production HTML содержит оба payload: `start=site_plan` и `start=site_meeting`;
- bot tests or static assertions prove `site_plan` and `site_meeting` use different start messages;
- live smoke in Telegram confirms `site_plan` starts qualification and `site_meeting` asks for direct message.

## DEC-2026-06-20-TELEGRAM-CONTACTS-BOT-FIRST

Status: active
Area: funnel, analytics, crm, telegram
Decision date: 2026-06-20
Evidence: audit of live homepage CTA links, production EventBudjet notification routing, and live check on `https://timurgromov.ru/`
Commits: site `0a03e62`, EventBudjet `a0f0ceb`
Supersedes: none

Decision:
Все публичные Telegram CTA сайта, которые означают "написать Тимуру" или "обсудить свадьбу", ведут через `https://t.me/gromov_wedding_bot?start=site_meeting`, а не в личный `@timurgromovv`. Tripwire "Получить сценарий" остаётся отдельным bot payload `site_plan`.

Why:
Запуск бота даёт измеримый контакт, Telegram identity и единый маршрут в `EventBudjet` / `CRM заявки`. Прямой личный Telegram создаёт шумную неучтённую конверсию и не попадает в рабочую очередь заявок.

Do:

- использовать `site_plan` только для получения сценария и квалификации 3 вопроса;
- использовать `site_meeting` для Telegram-контакта, встречи и прямого сообщения;
- оставлять MAX, телефон и WhatsApp как fallback-каналы;
- считать primary рекламными конверсиями bot starts / CRM form submits, а не клики по fallback-каналам.

Do not:

- не возвращать публичные CTA "Telegram", "Tg", "Написать" на `t.me/timurgromovv`;
- не вести сценарий напрямую на `/scenario/` без bot-flow;
- не смешивать CRM-заявки с калькуляторной telemetry.

## DEC-2026-06-18-CANONICAL-CTA-SPLIT-BUTTON

Status: active
Area: frontend, ux, design-system, workflow
Decision date: 2026-06-18
Evidence: mobile hero CTA regression where the arrow was first offscreen, then fixed into a one-piece orange button instead of preserving the existing desktop split-button pattern
Commits: pending
Supersedes: none

Decision:
CTA-кнопки на сайте нельзя пересобирать заново как похожие rounded buttons. Для custom CTA canonical source - `src/site/tilda-cta.ts` (`tildaCtaInner`, `tildaCtaLink`, `tildaCtaButton`) плюс полный CSS-комплект `.tg-tilda-cta` и page-specific wrapper variables. Для Tilda Zero hero CTA на главной canonical source - существующие слои `rec861352716`; их можно двигать, но нельзя заменять новой самодельной кнопкой.

Why:
Даже небольшое отклонение от исходного паттерна ломает визуальный язык сайта: один сплошной оранжевый прямоугольник со стрелкой внутри выглядит не как родная Tilda-кнопка. На desktop hero already had the correct button, so mobile should have matched that geometry instead of being reconstructed.

Do:

- перед любой CTA-правкой явно указать source: `src/site/tilda-cta.ts` для custom CTA или `rec861352716` layer IDs для hero;
- копировать helper markup, CSS variables, media queries, SVG mask, hover behavior and click layer as a set;
- сохранять split structure: left rounded plate + separate rounded right square + arrow inside square + full click target;
- для hero mobile сверять с desktop geometry: plate end, square start, text boundary, arrow boundary, click coverage;
- если CSS/координаты не применились, чинить cascade/Tilda geometry, not a new fallback button.

Do not:

- не рисовать CTA с нуля по цвету/размеру/примерной стрелке;
- не превращать split-button в один цельный rounded rectangle;
- не обнулять внутренние радиусы и не убирать механику отдельного square;
- не использовать screenshots/DOM presence как достаточное доказательство, если visible button pattern differs from desktop.

Verification:

- custom CTA uses `src/site/tilda-cta.ts` helper and copied CSS set;
- hero CTA uses existing `rec861352716` layers;
- browser or Playwright proof checks that left plate and right square remain visually separate and clickable.

## DEC-2026-06-17-NO-CASCADE-COMPENSATION-WORKFLOW

Status: active
Area: frontend, ux, workflow, qa
Decision date: 2026-06-17
Evidence: цепочка regressions на `/materials/`, где один и тот же CTA/footer/spacing фиксились несколькими компенсирующими CSS-слоями: fallback button rendering, negative margins, footer height overrides, mobile-only/desktop-only patching
Commits: pending
Supersedes: none

Decision:
Для этого проекта запрещено лечить визуальные симптомы новыми компенсирующими каскадами, пока не зафиксирован source-layer и точная причина поломки.

Why:
Основная потеря времени возникла не из-за "сложной Tilda", а из-за накопления вторичных правок поверх уже неверной базы:

- кнопки лечились fallback-геометрией, хотя эталонный split-button pattern уже существовал;
- большие отступы лечились отрицательными margin между records, что вызвало overlap и белый хвост footer;
- desktop/mobile проверялись в разных состояниях и поздно ловили, что предыдущий фикс породил новый дефект.

Такие правки быстро дают локально "похожий" результат, но делают систему хрупкой: каждый следующий проход начинает компенсировать предыдущую компенсацию.

Do:

- перед заметной UX-правкой явно фиксировать: `Источник`, `Меняю слой`, `Не трогаю`.
- сначала определять canonical source pattern и источник геометрии: helper, record, class set, Tilda element, neighboring filter/overlay.
- сначала диагностировать тип поломки: `markup missing`, `style not applied`, `overlap`, `wrong stacking`, `wrong record height`, `wrong viewport state`.
- править самый ранний причинный слой: source pattern, z-index/overlap, record height, canonical CSS rule.
- после каждого фикса проверять именно тот дефект, который исправлялся, прежде чем двигаться дальше.
- если приходится писать `!important`, negative margin, forced height, display fallback или visibility hardening, коротко зафиксировать в worklog, почему без этого нельзя.

Do not:

- не добавлять новый fallback style, если уже существует рабочий canonical pattern и он просто не применился;
- не поджимать межсекционные gaps отрицательными margin, пока не измерен реальный gap и не проверено, что соседние records не перекрываются;
- не смешивать в одном проходе несколько разных задач: copy, geometry, buttons, footer cleanup, popup behavior;
- не считать DOM/CSS-присутствие достаточным доказательством визуального результата;
- не делать второй компенсирующий фикс, пока первый не проверен на live в том же состоянии viewport.

Verification:

- первый рабочий апдейт для рискованной правки содержит `Источник: ...`;
- worklog объясняет не только `что изменено`, но и `какая первичная причина устранена`;
- после правки не остаётся каскада из взаимоисключающих fallback-слоёв, если canonical source уже восстановлен.

## DEC-2026-06-17-UX-VERIFY-IN-CODEX-BROWSER

Status: active
Area: frontend, ux, qa, workflow
Decision date: 2026-06-17
Evidence: инцидент на `/materials/`, где агент подтвердил CTA-кнопки по техническому состоянию браузера, пока в видимом Codex browser пользователь видел экран без кнопок
Commits: pending
Supersedes: none

Decision:
Любые UX-изменения и визуальные утверждения по этому проекту подтверждаются в первую очередь по реальному экрану Codex in-app browser, а не только по DOM/CSS-замерам, headless-проверкам или невидимому viewport override.

Why:
Визуально корректное состояние в техническом viewport не гарантирует, что пользователь видит то же самое в узкой панели Codex browser. Один и тот же tab может одновременно иметь корректный DOM и вводящий в заблуждение видимый кадр, если оставлен принудительный viewport override или проверка делалась в другом состоянии окна.

Do:

- перед финальным UX-утверждением сверять тот же самый экран, который реально видит пользователь в Codex browser;
- если использовался принудительный viewport override, перед пользовательским подтверждением сбрасывать его или явно сообщать, что это технический режим;
- если агент пишет `вижу`, `кнопки на месте`, `выглядит нормально`, `совпадает`, иметь визуальное подтверждение именно на видимом экране;
- использовать DOM/CSS-замеры и headless-проверки как дополнение, а не как замену видимому UX-подтверждению.

Do not:

- не подтверждать визуальный результат по одному состоянию DOM, показывая пользователю другой кадр;
- не оставлять узкий/широкий viewport override в Codex browser и не делать из этого UX-выводы без пояснения;
- не спорить с видимым экраном пользователя, если он противоречит техническим измерениям.

Verification:

- после UX-правок агент либо подтверждает результат на видимом экране Codex browser, либо честно пишет, что визуальное подтверждение не делалось;
- если пользователь присылает скриншот видимого расхождения, агент обязан считать это блокирующим сигналом и перепроверять именно это состояние.

## DEC-2026-06-16-COPY-BAN-ROLLBACK

Status: active
Area: copywriting, ux, brand
Decision date: 2026-06-16
Evidence: уточнение пользователя, что претензия относилась к одной неуместной формулировке, а не к глобальному запрету слова
Commits: pending
Supersedes: DEC-2026-06-16-COPY-BAN-SPOKOYNO

Decision:
Для публичного copy сайта нет глобального запрета на слово `спокойно` и однокоренные варианты. Эти слова можно использовать там, где они звучат естественно и точно по смыслу.

Why:
Предыдущий blanket-ban оказался слишком широким и привёл к ошибочному массовому переписыванию живого текста, включая корректные формулировки на `/scenario/`, главной странице и в воронке.

Do:

- оценивать формулировки по контексту конкретного блока, а не по одному слову
- сохранять прямой тон сайта, но не превращать это в лексический запрет
- возвращать исходные формулировки, если они были уместны и уже согласованы в материале

Do not:

- не вводить глобальные copy-ban правила без явно оговорённого scope
- не делать массовую замену по корню слова вместо проверки каждой фразы по месту

Verification:

- восстановлены исходные формулировки в `src/pages/index.astro`, `src/pages/scenario.astro` и `docs/telegram-funnel-roadmap.md`

## DEC-2026-06-16-MATERIALS-TILDA-FIRST

Status: active
Area: frontend, ux, architecture
Decision date: 2026-06-16
Evidence: неудачная native Astro rewrite `/materials/`, rollback `f1b3264`, прямое указание пользователя переносить сначала в том виде, в котором есть
Commits: pending
Supersedes: none

Decision:
Страница `/materials/` сначала должна существовать как Tilda-records inside Astro с сохранением текущего визуального дизайна. Native Astro-переписывание блоков допустимо только после зафиксированного same-design baseline и только точечными изменениями.

Why:
Предыдущая попытка native Astro rewrite сломала композицию, шрифты, размеры видео и poster-изображения. Для этой страницы важнее сохранить текущую Tilda-визуальность, чем сразу упростить DOM/CSS.

Do:

- держать `/materials/` на `src/pages/materials.astro`, который читает `page62008353.html` и `files/page62008353body.html`
- сохранять Tilda records, геометрию, fonts, posters, видео и карточки как source of truth
- любые будущие изменения делать точечно и проверять до/после
- запускать `npm run verify:materials-baseline` после любых правок `/materials/`

Do not:

- не заменять `/materials/` на самодельный native Astro layout одним большим rewrite
- не вводить классы `materials-hero`, `materials-webinar`, `materials-video-grid` как новую композицию страницы
- не подставлять случайные изображения из `public/images` вместо исходных Tilda video covers
- не менять размеры видео/карточек без сверки с исходной Tilda-композицией

Verification:

- `npm run verify:materials-baseline`
- production `/materials/` содержит Tilda markers и не содержит rejected native-redesign markers

## DEC-2026-06-08-SITE-CTA-PLAN-EVENING

Status: active
Area: product, ux, frontend
Decision date: 2026-06-08
Evidence: обсуждение с пользователем, локальный прототип сайта, `docs/telegram-funnel-roadmap.md`
Commits: none
Supersedes: none

Decision:
Главный CTA сайта свадебного ведущего должен вести не в калькулятор бюджета, а в оффер `Получить план свадебного вечера`.

Why:
Пользовательский трафик по запросу ведущего находится ближе к выбору человека и формата вечера, чем к самому раннему этапу планирования бюджета. План вечера лучше бьет в релевантную боль: тайминг, атмосфера, структура и понимание, что именно обсуждать с ведущим.

Do:

- держать на сайте один главный tripwire: `Получить план вечера`
- держать прямой второй CTA: `Обсудить свадьбу`
- в hero сначала вести к объясняющему блоку про план вечера, а не сразу выбрасывать пользователя в Telegram
- после объясняющего блока давать пользователю выбрать удобный мессенджер: Telegram или MAX
- после блока плана показывать цены, а консультацию выносить уже следующим сильным шагом
- показывать экспертность через план вечера и консультацию по формату/таймингу

Do not:

- не возвращать бюджетный калькулятор как главный вход сайта без нового решения
- не выносить на лендинг несколько одинаково сильных офферов типа вебинар / смета / чеклист / калькулятор

Verification:

- hero и основной CTA-блок сайта содержат `план вечера`
- hero CTA ведет на `#plan-evening`, а переход в Telegram происходит уже из CTA-блока
- CTA визуально проходит desktop/mobile
- `npm run build` проходит

## DEC-2026-06-15-SCENARIO-MID-CTA

Status: active
Area: product, ux, frontend
Decision date: 2026-06-15
Evidence: обсуждение с пользователем по `/scenario/` как tripwire-странице и задаче усилить конверсию во встречу без разрушения ритма статьи
Commits: pending
Supersedes: none

Decision:
На странице `/scenario/` должен быть не только финальный closing CTA в конце, но и один дополнительный мягкий CTA в середине статьи.

Why:
Часть читателей понимает ценность материала до финального блока и не дочитывает до конца. При этом повтор полноценного closing-блока в середине статьи выглядел бы как ранняя продажа и ослаблял бы экспертное восприятие материала. Поэтому mid-article CTA должен быть компактным и мягким.

Do:

- ставить один компактный CTA после того, как в статье уже раскрыта экспертность ведущего
- использовать мягкую формулировку уровня `обсудить вашу свадьбу`, а не дублировать полный финальный оффер встречи
- вести mid-article CTA в тот же канал встречи, что и финальный CTA

Do not:

- не ставить второй большой closing-блок в середине статьи
- не выносить mid-article CTA в hero или сразу после вступления

Verification:

- в середине `/scenario/` есть отдельный компактный CTA
- финальный CTA встречи внизу страницы сохранён как основной closing block

## DEC-2026-06-08-BOT-MATERIALS-HIERARCHY

Status: active
Area: product, ux
Decision date: 2026-06-08
Evidence: обсуждение с пользователем, `docs/telegram-funnel-roadmap.md`
Commits: none
Supersedes: none

Decision:
Калькулятор, чеклисты, вебинар и прочие полезные материалы остаются воронкой второго уровня внутри Telegram-бота, а не основным обещанием сайта.

Why:
Если сайт пытается продать сразу все материалы, оффер распадается и падает ясность. Для холодного выбора ведущего полезнее сначала дать один понятный вход, а потом уже внутри бота раскрывать дополнительные материалы по мере интереса.

Do:

- в боте после входа по плану вечера дать дополнительные кнопки на смету, чеклист выбора ведущего и другие материалы
- хранить эту иерархию как стандарт, даже если материалы будут расширяться

Do not:

- не превращать сайт в каталог полезностей
- не делать несколько конкурирующих CTA одинакового веса на первом экране и около цен

Verification:

- на сайте главный CTA один
- дополнительные материалы упоминаются как продолжение внутри Telegram

## DEC-2026-06-08-BOT-NAVIGATION-MVP

Status: active
Area: product, ux
Decision date: 2026-06-08
Evidence: обсуждение с пользователем, `docs/telegram-funnel-roadmap.md`
Commits: none
Supersedes: none

Decision:
Текущая кнопка Telegram Mini App `Открыть приложение` / калькулятор не блокирует навигацию бота. Основной MVP-путь бота строится через `/start` и inline-кнопки в сообщениях.

Why:
Нижняя/системная кнопка Mini App занята калькулятором, но это не мешает обычным inline-кнопкам и стартовому меню внутри сообщений. Это позволяет не усложнять UX и не плодить лишние обязательные вопросы.

Do:

- строить старт бота через короткое сообщение и inline-кнопки
- использовать минимум лишних вопросов перед выдачей обещанного материала
- держать калькулятор как отдельную кнопку второго шага

Do not:

- не строить первую версию бота вокруг длинной анкеты
- не считать, что занятая кнопка `Открыть приложение` запрещает навигацию вообще

Verification:

- в документации бота описаны inline-кнопки как основной способ навигации

## DEC-2026-06-08-CONSULTATION-AS-SECONDARY-CONVERSION

Status: active
Area: product, ux, frontend
Decision date: 2026-06-08
Evidence: обсуждение с пользователем, локальный прототип сайта
Commits: none
Supersedes: none

Decision:
Бесплатная консультация должна быть заметно показана на сайте как безопасный следующий шаг, но не заменять главный cold-entry оффер `План свадебного вечера`.

Why:
Конечная бизнес-цель сайта - довести человека до встречи. Но для холодного трафика встреча слабее работает как первый крючок, чем полезный и быстрый экспертный материал. Поэтому сайт должен строиться в две ступени: сначала вызвать интерес через план вечера, затем дать явную, безопасную и безобязательную возможность записаться на встречу.

Do:

- держать отдельную плашку про бесплатную консультацию после секции цен
- прямо писать, что встреча бесплатная и ни к чему не обязывает
- объяснять, зачем встреча нужна: формат, тайминг, площадка, понимание, подходите ли вы друг другу
- вести CTA консультации в единый contact pop-up с Telegram, MAX и формой телефона
- в будущем заменить прямые Telegram/MAX-ссылки на deep-link ботов, чтобы обращения попадали в CRM с источником

Do not:

- не прятать консультацию только внутри одной вкладки цен
- не делать встречу единственным первым CTA для всего холодного трафика
- не плодить отдельный неконтролируемый путь в личку Telegram, если его нельзя нормально связать с CRM и источником

Verification:

- после секции цен есть отдельный блок про бесплатную консультацию
- в тексте явно есть безопасная формулировка без обязательств
- кнопка `Записаться на бесплатную встречу` открывает contact pop-up

## DEC-2026-06-08-CONSULTATION-CONTACT-POPUP

Status: active
Area: product, ux, frontend, analytics
Decision date: 2026-06-08
Evidence: обсуждение с пользователем, локальный прототип сайта
Commits: none
Supersedes: none

Decision:
Для прямого контакта со страницы использовать единый pop-up выбора способа связи: Telegram, MAX и форма телефона. Для пользователя это разные привычные варианты, но техническая цель следующего этапа - привести Telegram/MAX к ботам, а форму телефона отправлять в бот/CRM.

Why:
Простые клики в мессенджеры плохо отражают качество лида. Бот-старт и отправка телефона дают более чистый сигнал: пользователь попадает в систему, источник можно сохранить, а дальнейшую аналитику и обучение рекламы можно строить на более качественных событиях. При этом UX не должен заставлять всех оставлять телефон, потому что части аудитории удобнее начать с мессенджера.

Do:

- CTA `Записаться на бесплатную встречу` открывает pop-up, а не уводит сразу наружу
- в pop-up держать Telegram, MAX, звонок и форму телефона
- под формой телефона держать ссылки на политику конфиденциальности и согласие на обработку персональных данных
- позже заменить Telegram/MAX на bot deep-links
- позже подключить `/api/consultation-lead` или аналогичный endpoint к отправке в Telegram-бот/CRM
- текст про помощника, готовое сообщение и обещание быстрого ответа показывать уже внутри Telegram/MAX-бота, а не в pop-up сайта

Do not:

- не считать простой клик в мессенджер главным лидом
- не делать личку Telegram отдельным основным каналом, если ее нельзя reliably связать с источником
- не перегружать pop-up объяснением внутренней механики бота

Verification:

- contact pop-up есть в `src/pages/index.astro`
- `npm run build` проходит
- desktop/mobile pop-up открывается без горизонтального overflow

## DEC-2026-06-12-PLAN-TRIPWIRE-POPUP-FIRST

Status: superseded by DEC-2026-06-14-SCENARIO-BOT-FIRST
Area: product, ux, frontend
Decision date: 2026-06-12
Evidence: обсуждение с пользователем, локальный preview блока `План-сценарий свадебного вечера`
Commits: none
Supersedes: none

Decision:
В блоке `План-сценарий свадебного вечера` не держать открытую inline-форму на первом экране. Квалификация для получения сценария должна открываться по CTA в pop-up.

Superseded note:
На 2026-06-14 принято новое решение: для главного сценария сайт ведёт сразу в Telegram-бота, а квалификация проходит внутри бота. Код popup можно хранить как заготовку, но активные CTA не должны открывать его без нового решения.

Why:
Открытая форма перегружает cold-entry блок, съедает композицию оффера и визуально конкурирует с главным CTA. Пользователь отдельно подтвердил, что вариант до открытой формы выглядел аккуратнее. При этом сама квалификация остаётся полезной, поэтому убирать её из воронки не нужно: достаточно спрятать за кнопкой.

Do:

- держать в CTA-блоке только оффер, две кнопки и краткий список содержимого
- открывать tripwire-форму из `Получить сценарий`
- в popup делать три квалификационных селекта компактными
- на desktop собирать три селекта в один ряд, если ширина popup это позволяет
- на mobile оставлять их в один столбец

Do not:

- не возвращать открытую inline-форму в этот блок без нового продуктового решения
- не раздувать popup длинными multi-row контролами, если вопрос можно уместить в компактный select

Verification:

- в `#plan-evening` нет inline-формы
- CTA `Получить сценарий` открывает pop-up
- в popup desktop три селекта стоят в одну строку
- mobile popup остаётся внутри viewport

## DEC-2026-06-14-SCENARIO-BOT-FIRST

Status: superseded by DEC-2026-07-10-HERO-SCENARIO-MESSENGER-CHOICE
Area: product, ux, frontend, analytics
Decision date: 2026-06-14
Evidence: обсуждение с пользователем о лишнем шаге перед Telegram и ценности `bot_start` как главного входа в систему
Commits: none
Supersedes: DEC-2026-06-12-PLAN-TRIPWIRE-POPUP-FIRST

Superseded note:
На 2026-07-10 hero CTA больше не ведёт напрямую в Telegram: он открывает короткий popup выбора Telegram или MAX. Bot-first логика сохранена, потому что обе ссылки ведут в `site_plan`, а сайт по-прежнему не отдаёт прямую ссылку на `/scenario/` с главной.

Decision:
Для главного оффера `Получить сценарий` сайт должен вести пользователя напрямую в Telegram-бота по `site_plan`. Квалификация (`кто`, `когда`, `где`) проходит уже внутри бота после старта.

Why:
Если оффер обещает сценарий в Telegram, промежуточный сайт-popup создаёт лишний шаг: пользователь уже готов перейти в бот, но сначала вынужден заполнить форму на сайте. Для этой воронки более ценен `bot_started_from_site_plan`: пользователь попадает в owned-канал, появляется Telegram identity, а дальнейшую квалификацию и прогрев проще связать с ботом.

Do:

- hero CTA `получить сценарий` ведёт напрямую в `https://t.me/gromov_wedding_bot?start=site_plan`
- CTA-блок сценария пишет, что в Telegram-боте нужно ответить на 3 коротких вопроса
- основная кнопка CTA-блока называется `Получить сценарий`; канал доставки поясняется текстом блока и kicker `Бесплатно в Telegram`
- внутри CTA-блока можно кратко упоминать план вечера, тайминг, ключевые блоки, калькулятор, план подготовки и полезные материалы
- старый popup-код можно оставить скрытой заготовкой, если активные CTA его не открывают

Do not:

- не возвращать popup-квалификацию для главного сценария без нового продуктового решения или A/B-теста
- не требовать от пользователя заполнять сайт-форму до перехода в Telegram для сценария
- не давать на главной странице прямую ссылку на `/scenario/` из CTA или popup: материал должен открываться только после bot-flow
- не превращать текст CTA в длинное описание всех материалов

Verification:

- hero CTA содержит ссылку `https://t.me/gromov_wedding_bot?start=site_plan`
- CTA-блок содержит текст `В Telegram-боте ответьте на 3 коротких вопроса`
- основная кнопка CTA-блока содержит `Получить сценарий`
- в опубликованном HTML главной нет текста `Посмотреть страницу сценария` / `Посмотреть страницу` и прямого CTA на `/scenario/`
- в опубликованном HTML нет активных элементов `data-plan-popup-open`, кроме пассивной строки селектора legacy-script

## DEC-2026-06-14-SCENARIO-MATERIAL-ROUTE

Status: active
Area: product, ux, deploy, cross-project
Decision date: 2026-06-14
Evidence: отдельная страница из Lovable, текущий bot-first funnel, требование не поднимать лишний runtime-контур
Commits: none
Supersedes: none

Decision:
Материал `Сценарий свадебного вечера`, который бот выдаёт после квалификации `site_plan`, должен жить на основном сайте как отдельный production-route `https://timurgromov.ru/scenario/`.

Why:
Это позволяет не поднимать третий продукт/отдельный deploy-контур ради одного материала. Сайт остаётся владельцем страницы и её дизайна, а `EventBudjet` остаётся владельцем tracked redirect, bot copy и продовой конфигурации ссылки.

Do:

- хранить исходник production-страницы в этом репозитории
- деплоить страницу тем же Pages-потоком, что и остальной сайт
- считать `Страница План Сценарий/` во workspace reference-only source material
- в `EventBudjet` держать `SITE_PLAN_MATERIAL_URL` направленным на `/scenario/`

Do not:

- не заводить отдельный поддомен, VPS-сервис или третий активный репозиторий без нового решения
- не переносить ownership страницы в `EventBudjet`
- не возвращать выдачу материала на главную страницу сайта

Verification:

- в репозитории есть `src/pages/scenario.astro`
- локальная сборка создаёт `/scenario/index.html`
- production redirect `SITE_PLAN_MATERIAL_URL` указывает на `https://timurgromov.ru/scenario/`

## DEC-2026-06-13-VISUAL-PROOF-ON-LIVE

Status: active
Area: process, quality, deploy
Decision date: 2026-06-13
Evidence: повторяющийся разрыв между фактом deploy и восприятием владельца на задачах про компактность кнопок и соответствие старому дизайну
Commits: none
Supersedes: none

Decision:
Для субъективных визуальных задач нужно явно различать `деплой подтвержден` и `визуальный эффект подтвержден`. Но live visual-check не становится обязательным на каждый мелкий проход. По умолчанию агент делает `build + deploy-check + live URL владельцу`, а самостоятельный visual-check обязан делать в UX-рискованных зонах или по прямой просьбе владельца.

Why:
Marker-check и факт deploy доказывают публикацию, но не доказывают, что владелец увидит заметный визуальный эффект. При этом обязательная полная visual-проверка на каждый мелкий шаг тоже замедляет работу и не нужна, если владелец сам быстрее смотрит live.

Do:

- для задач `сделай как раньше`, `уменьши`, `аккуратнее`, `слишком громоздко`, `не похоже на старый дизайн` честно разделять deploy proof и visual proof
- по умолчанию на мелких правках давать live владельцу без обязательной тяжелой self-check
- делать self-check для popup, forms, contacts, footer, hero, video, сложной адаптивности и по прямой просьбе владельца
- в финальном сообщении явно разделять `деплой подтвержден` и `визуальный эффект подтвержден`
- если изменения маленькие по числам, прямо говорить, что эффект subtle

Do not:

- не считать live marker-check достаточным доказательством для подтвержденного визуального эффекта
- не превращать каждый мелкий CSS-твик в обязательную full visual QA-процедуру
- не писать `готово`, если подтверждена только публикация, а не визуальный результат
- не маскировать слабый визуальный эффект формулировкой `сделано`, если пользователь ожидает заметную разницу

Verification:

- в `AGENTS.md`, `docs/quick-edit-playbook.md` и `docs/tilda-zero-editing.md` зафиксировано правило visual proof
- будущие финальные ответы по визуальным задачам разделяют факт deploy и факт визуального подтверждения

## DEC-2026-06-13-TILDA-SPLIT-CTA-STANDARD

Status: active
Area: ux, frontend, quality
Decision date: 2026-06-13
Evidence: original Tilda export `rec862529266`, repeated mismatch when custom CTA buttons were redrawn as one-piece rounded rectangles
Commits: none
Supersedes: none

Decision:
Все новые кастомные CTA-кнопки на главной странице и в pop-up должны использовать общий Tilda-like split-button pattern `tg-tilda-cta`: отдельная левая скругленная плашка, отдельный правый скругленный квадрат со стрелкой и общий кликабельный wrapper.

Why:
В исходном Tilda-дизайне CTA визуально собран из двух соседних элементов, а не из одной цельной кнопки. Когда внутренние скругления убираются и квадрат стрелки превращается в продолжение левой плашки, кнопка визуально становится generic UI и перестает совпадать с языком сайта.

Do:

- использовать helper `tildaCtaLink` / `tildaCtaButton` из `src/site/tilda-cta.ts`
- сохранять отдельные скругления у `tg-tilda-cta__plate` и `tg-tilda-cta__arrow-box`
- сохранять `1px` overlap между левой плашкой и квадратом, как в export
- использовать реальный export asset `images/tild3536-3939-4363-b163-323761323432__vector_8.svg`
- держать hover-поворот стрелки

Do not:

- не рисовать CTA заново через generic rounded button
- не делать стрелку CSS-chevron, если доступен исходный SVG
- не обнулять внутренние скругления между левой частью и квадратом
- не превращать split-button обратно в один визуально сплошной прямоугольник

Verification:

- custom CTA визуально имеет две части: left plate + arrow square
- обе части кликаются через общий `<a>` или `<button>`
- `npm run build` проходит

## DEC-2026-06-13-DEPLOY-REQUIRED-FOR-SITE-TASKS

Status: active
Area: process, deploy
Decision date: 2026-06-13
Evidence: repeated confusion when local changes were reported as "done" before commit/push/deploy
Commits: none
Supersedes: temporary local-only notes from early project-memory records

Decision:
Для задач, которые меняют живой сайт, работа считается завершенной только после `commit -> push в main -> GitHub Pages deploy -> live-check production`.

Why:
Если локальная правка или незапушенный commit описываются как готовый результат, это создает ложный сигнал: пользователь идет на `timurgromov.ru`, не видит изменений и тратит дополнительный прогон на повторную диагностику. Это не вопрос вкуса, а вопрос операционной дисциплины.

Do:

- считать `timurgromov.ru` обязательной финальной точкой проверки для site-task
- в финальном ответе явно разделять: `локально изменено`, `закоммичено`, `запушено`, `production подтвержден`
- если изменения влияют на сайт, не останавливаться на локальной сборке и локальной проверке

Do not:

- не трактовать старые исторические записи про `локально, без deploy` как активное правило
- не сообщать, что задача сделана, если изменения еще не дошли до production

Verification:

- `origin/main` указывает на финальный commit
- `npm run verify:pages` или эквивалентная live-проверка подтверждает production

## DEC-2026-06-14-SITE-STATUS-WORDING-MUST-BE-EXPLICIT

Status: active
Area: process, communication, deploy
Decision date: 2026-06-14
Evidence: repeated operator confusion when local or pushed changes were described with the same wording as live-verified production changes
Commits: none
Supersedes: none

Decision:
Для задач по живому сайту агент обязан явно разделять статусы `локально изменено`, `закоммичено`, `запушено`, `production подтвержден`. Слова `сделано`, `готово`, `исправил` разрешены только после live-проверки production.

Why:
Даже если код уже в `main`, пользователь может открыть сайт и увидеть старое состояние из-за непройденного deploy, кэша или просто потому, что агент сообщил статус слишком общо. Проблема здесь не только в техническом push/deploy, но и в неточной коммуникации о текущем состоянии.

Do:

- в финальном ответе по site-task писать статусы отдельными строками или явными маркерами
- если production еще не проверен, прямо писать `локально/commit/push сделаны, live еще не подтвержден`
- использовать слово `сделано` только после подтвержденного live-state

Do not:

- не смешивать `commit done` и `live done` в одну формулировку
- не писать `исправил`, если подтверждена только локальная правка или push

Verification:

- правило зафиксировано в `AGENTS.md`
- будущие ответы по site-task разделяют локальный, git и production-статусы

## DEC-2026-06-16-COPY-FIRST-CUSTOM-BLOCKS

Status: active
Area: process, UX, frontend, design-system
Decision date: 2026-06-16
Evidence: repeated regressions when new CTA/buttons were rebuilt as similar-looking HTML/CSS instead of copying the existing working main-site pattern
Commits: none
Supersedes: softer wording in `Existing Design Reuse Rule`

Decision:
Когда владелец просит добавить или поправить CTA, карточку, popup, колонку, врезку, кнопку или другой кастомный блок `как на сайте`, `в том же стиле`, `такая же верстка`, `такие же кнопки`, `возьми готовое`, `скопируй паттерн` или `не заново`, агент обязан работать в режиме literal copy-first.

Это значит: сначала найти готовый работающий паттерн в коде/export, скопировать его полный markup/CSS/classes/helper/assets/breakpoints/hover mechanics, и только потом заменить copy, ссылки, IDs и минимально необходимую геометрию.

Дополнение:

- Правило распространяется не только на внешний вид, но и на поведение.
- Если на сайте уже есть готовая механика `mobile horizontal scroll`, slider/swipe row, split CTA, sticky behavior, popup behavior или hover behavior, агент обязан переиспользовать именно её, а не собирать новую механику с тем же эффектом.
- Перед реализацией агент обязан назвать canonical source в первом рабочем апдейте: файл/record/helper/class/mechanic, откуда копируется решение.
- Если source найден, запрещено переходить на fallback `быстрее собрать с нуля`. Нужно чинить причину, почему копия не применяется.

Why:
На этом сайте визуальные детали уже дорого отлажены: Tilda-like split buttons, SVG arrow mask, hover rotation, breakpoint variables, typography rhythm, Tilda cascade and Astro transforms. Когда агент копирует только цвета или имена классов и заново собирает похожую кнопку/сетку, результат выглядит иначе и часто ломается из-за CSS cascade/parser issues.

Do:

- найти и зафиксировать источник копирования: file, `rec...`, helper function, const, CSS block or class pattern
- копировать полный рабочий комплект паттерна, включая helpers, CSS variables, media queries, assets, state classes and hover rules
- менять только content, hrefs, IDs and minimal geometry required by the new context
- если копия не применилась из-за Tilda cascade, `withBasePath`, CSS parser issue or style order, чинить эту причину
- при визуально рискованной правке сравнивать computed styles/source metrics с оригиналом, а не только смотреть на colors/fonts
- в первом рабочем апдейте явно указывать `Источник: ...`
- для mobile/scroll/slider задач сначала искать уже существующую механику на главной

Do not:

- не собирать похожий блок с нуля, если есть готовый паттерн
- не рисовать generic rounded CTA вместо `tg-tilda-cta`
- не менять split-button composition, arrow square, hover rotation, font system, radii or spacing rhythm без прямого запроса
- не выдавать reinterpretation за reuse

Verification:

- source pattern named or obvious in diff
- copied block preserves original helper/classes/CSS mechanics
- compiled CSS parses correctly and expected component rules are visible in computed styles
- если аналога нет, агент остановился и запросил согласование нового визуального языка

## DEC-2026-06-17-CODEX-BROWSER-FIRST-FOR-UX

Status: active
Area: process, UX, QA
Decision date: 2026-06-17
Evidence: repeated wasted time on indirect screenshot/headless workflows for subjective layout checks that could be judged faster in the Codex in-app browser
Commits: pending
Supersedes: narrower wording in visual-check guidance

Decision:
Когда задача про UX, дизайн, визуальный ритм, адаптив, “ровно / криво / слишком большой / слишком тесно / ближе к старому”, default surface для живой проверки — Browser / in-app browser Codex.

Автоматические проверки (`verify:*`, headless Chrome, Playwright scripts, внешние screenshots) остаются полезными, но по умолчанию считаются secondary proof или fallback, а не первой линией проверки субъективного визуального результата.

Why:
Для этого сайта спорные визуальные правки обычно требуют именно человеческой оценки композиции и ритма, а не только HTML-маркеров или headless-картинок. In-app browser Codex позволяет быстрее проверить реальную страницу на нужных брейкпоинтах и не тратить лишние итерации на обходные цепочки.

Do:

- если правка про UX/дизайн, сначала открыть страницу в браузере Codex
- проверять минимум нужные брейкпоинты прямо там, если пользователь просит `посмотри сам` или `проверь на экранах`
- использовать automation/headless как fallback или как дополнительное доказательство
- в финале честно писать, делался ли live visual-check в браузере Codex

Do not:

- не начинать субъективную UX-проверку с тяжёлой скриншотной цепочки, если ту же задачу можно быстрее решить через browser Codex
- не подменять живую визуальную проверку только `build`/`curl`/`verify:pages`, когда вопрос именно про композицию

Verification:

- правило зафиксировано в `AGENTS.md` и `docs/quick-edit-playbook.md`
- будущие UX-задачи по умолчанию используют in-app browser Codex как first check
