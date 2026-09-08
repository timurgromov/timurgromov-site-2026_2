# UX — контур конверсии экспертных страниц

Updated: 2026-09-08

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

## Visible release target

Each shared contour is visible after its useful page content. It contains four
equal, explicit controls: Telegram, MAX, «Обсудить свадьбу» and «Сайт
ведущего». The author portrait and the text phone number remain in the island;
the contact pop-up opens over the page rather than creating a fifth CTA.
