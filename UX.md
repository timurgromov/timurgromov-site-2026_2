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
- `/scenario/` renders one shared `expert-conversion` module as one visual
  card, not two stacked CTA cards: calculator copy and actions on the left,
  the supplied black-and-white Timur portrait on the right. The portrait uses
  centred, symmetric `3:4` cropping and is part of the same card, not a
  separate author block.
- `/materials/` and `/articles/plan-podgotovki-k-svadbe/` retain their current
  shared contour until this scenario prototype is explicitly approved.
- Desktop/wide: the scenario card is two columns; tablet at `900px` and below
  becomes one column; mobile at `640px` and below puts the portrait first and
  has 16px gutters. CTA controls use a compact `2×2` grid from `480px` through
  `640px` and become full-width only below `480px`. Footer switches from four
  columns to two, then one.
- The author portrait is a compact horizontal `16:9` crop in the CTA, never a
  tall column: keep the face and upper body in frame with `object-fit: cover`
  and a centred vertical crop. This is the required media geometry whenever
  the shared CTA is inserted on another expert page.
- Required checks: `390x844`, `640/641`, `900/901`, `1180x820`, `1366x768`,
  `1440x900`, `1984x1046`; no horizontal overflow and no clipped button text.
- Preserved invariants: homepage, Direct CTA/protection and the useful page
  content above the shared contour are untouched.

## Visible release target

The scenario contour is visible after the useful page content. It contains four
equal, explicit controls: Telegram, MAX, «Обсудить свадьбу» and «Сайт
ведущего». The author portrait and the text phone number remain inside the same
card; the contact pop-up opens over the page rather than creating a fifth CTA.
