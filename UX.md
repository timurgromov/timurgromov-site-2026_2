# UX — контур конверсии экспертных страниц

Updated: 2026-09-10

## Job and flow

- Product type: expert-content landing inside the public wedding-host site.
- Primary user: пара на этапе подготовки или выбора ведущего, пришедшая на
  экспертную страницу из поиска или по прямой ссылке.
- Primary job: после прочтения сценария выбрать один из четырёх понятных путей:
  получить материалы в боте, обсудить свадьбу в уже готовом pop-up, увидеть
  телефон или перейти на сайт ведущего.
- Scenario flow: экспертный ответ → один компактный бренд-навигационный блок →
  Telegram-бот или MAX-бот (калькулятор, полезные материалы, порядок вечера,
  пример сценария и план подготовки) **или** «Обсудить свадьбу» (готовый
  `consultation-contact-popup`) **или** главная страница ведущего.
- В карточке всегда виден номер `+7 925 390 07 72` как текстовая ссылка, без
  отдельной CTA-кнопки. Кнопка «Обсудить свадьбу» открывает тот же pop-up, что
  на главной: Telegram, MAX, телефон и форма заявки.
- Shared routes: `/scenario/`, `/materials/`,
  `/articles/plan-podgotovki-k-svadbe/`. The homepage and its Direct flow are
  outside this contour.

## Page states and responsive contract

- Public state only: no lead is created until a person actually opens a
  messenger deep link. No production test leads are created during QA.
- `/scenario/`, `/materials/` and `/articles/plan-podgotovki-k-svadbe/` render
  the same home-site CTA island: the literal `tg-plan-cta` split-button
  pattern, home fonts, split cells and arrow pseudo-element. Hover rotates the
  arrow by 45 degrees and switches the button to orange exactly as on the
  homepage. There are no page-specific button redraws or stacked
  material/meeting cards.
- The sole CTA headline on every route is «Всё для подготовки к свадьбе» in
  the large homepage headline treatment. Route-specific CTA headings are not
  used.
- The CTA starts directly after the useful content with a controlled gap:
  `32px` desktop and `20px` mobile. Its own bottom spacing separates the island
  from the common footer; neither a large empty tail nor a glued footer is
  acceptable.
- Desktop/wide: copy and supplied black-and-white Timur portrait are two
  columns; mobile at `640px` and below puts the portrait first and has 16px
  gutters. Four controls use a compact `2×2` grid until `479px`, then one
  column. Footer switches from four columns to two, then one.
- The portrait is not a generic rounded rectangle or a fixed `16:9` crop. It
  uses the existing transparent photo stencil from the homepage block «Честно
  о ценах». The same wide stencil is compact on desktop/tablet and moves above
  the copy on mobile; each route may adjust only `object-position` so Timur's
  face remains inside the visible part of the stencil.
- Required checks: `390x844`, `640/641`, `900/901`, `1180x820`, `1366x768`,
  `1440x900`, `1984x1046`; no horizontal overflow and no clipped button text.
- Preserved invariants: homepage, Direct CTA/protection and the useful page
  content above the shared contour are untouched.

## Shared wedding-editorial visual system

`/scenario/` is the canonical visual source for wedding expert content. Its
black-and-white Timur portrait Hero, dark layered overlay, warm neutral body,
orange accent, `Cormorant Garamond` display role and `Instrument Serif` italic
role belong to the public Timur Gromov wedding-site identity, not just to the
scenario article.

`/articles/plan-podgotovki-k-svadbe/` uses this system while retaining a
long-form guide's information architecture:

- first screen: `timurgromov.ru`, «Авторский материал — Тимур Громов», portrait,
  title, introductory lead and author metadata;
- body: readable warm-neutral long form, a compact three-step start, optional
  contents disclosure, then twelve numbered editorial sections;
- `1100px` and below: stage metadata becomes static above its content;
  `640px` and below: Hero has dedicated crop, type and padding rules with no
  horizontal overflow.

Pages may vary in content structure, but must not introduce a separate palette,
generic card template or page-local type system. The homepage, Direct flow,
conversion CTA island and all bot/CRM contracts remain unchanged.

## Visible release target

Each shared contour is visible after its useful page content. It contains four
equal, explicit controls: Telegram, MAX, «Обсудить свадьбу» and «Сайт
ведущего». The author portrait and the text phone number remain in the island;
the contact pop-up opens over the page rather than creating a fifth CTA.

## Shared consultation popup on SEO routes

`/scenario/`, `/materials/` and `/articles/plan-podgotovki-k-svadbe/` use the
literal homepage consultation-popup pattern: Coolvetica/Manrope typography,
the compact split-button system with rotating arrow, phone card, form and
success state. Only Telegram/MAX deep-link values vary by source route; this is
not a separate SEO-page popup design.

## Scenario article material entry

After «Церемония, поздравления и фотографии» and before the personal meeting
CTA, `/scenario/` has one compact white materials island. Its copy describes
the calculator, scenario example and preparation plan; Telegram is the orange
primary split-control and MAX is the light secondary one. It has no article
divider lines. The personal-discussion CTA remains later in the article; the
full four-path author island remains once at the bottom.

## Named CTA templates for future expert pages

- «Большой CTA» is the literal `renderExpertConversionContour` home-site
  island: four paths, the author photo stencil, text phone and the existing
  contact pop-up. It appears once at the end of useful page content.
- «Маленький CTA» is the literal `ExpertMaterialsInlineCta` white materials
  island: one contextual copy line, orange Telegram and light MAX. It can be
  placed during reading, but never replaces or duplicates the final big CTA.
- The templates are defined in `docs/CTA_TEMPLATES.md`. They automatically
  emit one structured source per intent and placement: `site`, `page`,
  `placement`, then `plan` or `meeting`; provider is recorded separately in
  the CRM. A new page must not reuse another page's entrypoint.
