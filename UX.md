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
  `/articles/plan-podgotovki-k-svadbe/` and
  `/articles/byudzhet-svadby-v-moskve/`. The homepage and its Direct flow are
  outside this contour.

## Page states and responsive contract

- Public state only: no lead is created until a person actually opens a
  messenger deep link. No production test leads are created during QA.
- `/scenario/`, `/materials/`, `/articles/plan-podgotovki-k-svadbe/` and
  `/articles/byudzhet-svadby-v-moskve/` render the same home-site CTA island:
  the literal `tg-plan-cta` split-button pattern, home fonts, split cells and
  arrow pseudo-element. Hover rotates the arrow by 45 degrees and switches the
  button to orange exactly as on the homepage. There are no page-specific
  button redraws or stacked material/meeting cards.
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
  the copy on mobile. Desktop/tablet may use the existing route crop; mobile
  at `<=640px` always uses the shared head-safe `object-position: 62% 18%`.
  The visible top of the hair must have a small balanced `10–24px` safety gap
  at `430x932`: no clipping, but also no blank ceiling above the portrait. This
  is a universal CTA rule, not a page-specific adjustment; manual visual crop
  review is required in addition to the responsive CSS assertion.
- Every public visual crop has the same acceptance order: inspect the actual
  rendered before/after frame at the reported CSS viewport; verify that the
  subject is whole, visual mass is compositionally balanced, and the apparent
  frame/mask breathing space is symmetric or deliberately asymmetric. A CSS
  value, a selector assertion and a no-overflow result prove mechanics only,
  never the crop composition.
- Required checks: `375x812`, `390x844`, `430x932`, `440x956`, `640/641`,
  `900/901`, `1180x820`, `1366x768`,
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
  title, introductory lead and the byline «Автор: Тимур Громов»; the second
  line keeps the page's role/time or role/guide context;
- body: readable warm-neutral long form, a compact three-step start, optional
  contents disclosure, then twelve numbered editorial sections;
- `1100px` and below: stage metadata becomes static above its content;
  `640px` and below: Hero has dedicated crop, type and padding rules with no
  horizontal overflow.

Pages may vary in content structure, but must not introduce a separate palette,
generic card template or page-local type system. The homepage, Direct flow,
conversion CTA island and all bot/CRM contracts remain unchanged.

The implementation source of truth is `docs/ARTICLE_UI_KIT.md`:

- `WeddingArticleHero.astro` owns the common portrait, service line, title,
  lead and author byline;
- `WeddingArticleIntro.astro` owns the first editorial block and reading
  measure;
- `wedding-article-ui.css` owns shared tokens, fonts, type scale, spacing,
  focal point and responsive modes.

Existing and new wedding articles must use these primitives. Page-local Hero
or introduction CSS is not an allowed way to customize an article.

The Hero is one layout system, not a set of article exceptions: `/articles/`,
`/scenario/`, the preparation guide and the budget article share the same
type scale, service-line anchor, byline anchor and portrait focal point at the
same viewport. CTA presence and title length may change only the content inside
the shared slots. They must not select another Hero mode, font size or height.

### Permanent typography and CTA rule

- Typography follows the role of the surface, not a requirement to make every
  page visually identical. Commercial homepage/offer headings may use the
  approved condensed `Coolvetica` treatment; wedding editorial and SEO pages
  use the approved `Cormorant Garamond` display role with `Instrument Serif`
  accents. Body and control text use the shared sans-serif role. A new route
  must choose one of these existing roles; inventing another page-local type
  system is a release blocker.
- CTA controls are one shared interface family across the public site: the
  corporate split-button anatomy, Manrope label, orange primary/light or
  dark secondary states, separate arrow cell, established radius and hover
  behaviour. Width may follow the local layout and touch height may increase on
  mobile, but a new page must reuse the shared component/pattern rather than
  redraw the button.
- Wedding editorial and SEO routes are native Astro pages. They do not import
  Tilda runtime, Zero Block layout, Tilda `zoom` or its responsive behaviour.
  Matching the homepage means reusing approved visual tokens and interaction
  anatomy through standalone Astro components, not coupling new routes to the
  homepage's legacy export.
- Wedding Article Heroes preserve the whole head silhouette. The media layer
  uses the shared upper focal point and no decorative scale/zoom. On desktop,
  the service line and author row are outer anchors; H1, lead and optional CTA
  are centred as one group in the lane between them. The free space above and
  below that group must match within `2px`. On mobile the Hero returns to its
  natural document flow with its own shared padding.
- Desktop height has two shared roles. `screen` is reserved for a conversion
  Hero or substantial editorial cover; `compact` is the approved short-cover
  role for `/articles/` and the preparation guide. Compact is
  `clamp(480px, 75svh, 640px)` and remains content-safe: it grows rather than
  cropping text. It does not alter typography or the author hierarchy. It has
  one approved desktop portrait adjustment: `74% 25%` removes surplus ceiling
  for its short cover; `screen` remains `74% 0%` and mobile remains `72% 0%`.
- The first editorial block uses the shared hierarchy: H2 is capped at `38px`
  on desktop, body copy is `19px / 1.68` sans on desktop and `17px / 1.55` on
  mobile. `Instrument Serif` is reserved for display emphasis, not entire
  explanatory paragraphs.
- The Hero type scale is subordinate to the conversion job. On every public
  page whose primary CTA sits in the Hero, the complete H1, introductory lead
  and all primary Hero controls must be fully visible at `scrollY=0` in the
  route's required portrait and desktop viewport matrix. Font size, line
  measure and vertical gaps must respond to both viewport width and viewport
  height; inheriting a large heading that pushes the CTA below the fold is a
  release failure.
- Such a Hero must mark its lead with `data-first-screen-lead` and its primary
  action wrapper with `data-first-screen-primary-actions`. The responsive gate measures that marker
  and fails if it ends below the initial viewport. Author metadata may continue
  below the first screen when the viewport is unusually short; it must not push
  the primary controls out of view.

This is the default for every new wedding expert or SEO route, not a one-off
decision for the preparation guide. Before implementation, each new route must
name the shared wedding Article UI Kit as its canonical source and define only
the content structure that differs. A generic SEO template, a page-local brand
system or a per-page Hero mode is a release blocker unless the owner explicitly
approves it.

### Mandatory Hero composition check

Passing a no-overflow test alone is not visual acceptance. Every visible change
to the shared wedding Hero must be reviewed at the owner-reported `1232x638`
desktop viewport on all four routes (`/articles/`, `/scenario/`, the
preparation guide and the budget article). The responsive gate measures the
space from the service block to the content group and from that group to the
author row, and fails if either side is too small or the two gaps differ by
more than `2px`. The reviewer must also inspect a rendered browser frame at
that viewport, plus the required mobile frame, before release.

## Wedding-budget Hero typography correction

- Change ID: `2026-09-10-budget-hero-title-and-copy`.
- Surface: `/articles/byudzhet-svadby-v-moskve/`, public state, Hero at the top
  and the middle calculator CTA after section 05.
- Reported production viewport: `1232x638` CSS px at DPR 2. Before the change,
  the Hero H1 rendered at `82.544px` with a `452px` text box and occupied most
  of the short first screen.
- Expected visible delta: keep the approved H1 text and type roles, but reduce
  the desktop font to at most `70px`, widen its readable measure slightly and
  keep the text box under `340px` at `1232x638`. Mobile uses a separate compact
  size; the H1 must stay legible without dominating the first screen.
- Editorial correction: replace the unnatural middle CTA «Отметьте нужные
  статьи — без чужой “средней свадьбы”» with the direct promise «Выберите
  нужные расходы и соберите свою смету» and remove similarly artificial
  constructions throughout the article without changing its SEO intent.
- Preserved invariants: exact H1 semantics, portrait crop, dark Hero, orange
  italic accent, lead, all six Telegram/MAX CTA links and their source codes,
  calculator screenshots, metadata/schema and the rest of the corporate style.
- Required viewports after the last edit: `390x844`, `639x900`, `640x900`,
  `641x900`, `1180x820`, reported `1232x638`, `1366x768`, `1440x900` and
  `1984x1046`; no horizontal overflow or JavaScript errors. `/scenario/` and
  `/` remain regression controls.

## Wedding-budget Hero first-viewport fit

- Change ID: `2026-09-10-budget-hero-first-viewport-fit`.
- Surface/state: `/articles/byudzhet-svadby-v-moskve/`, public anonymous state,
  `scrollY=0`.
- Exact owner-reported browser state: `1232x582` CSS px at DPR 2. Baseline Hero
  height is `806.35px`; the calculator actions end at `672.35px`, which leaves
  the two primary controls `90.35px` below the initial viewport.
- Expected visible delta: the complete H1, lead and both calculator buttons are
  visible together in the first screen with at least a `12px` bottom safety
  gap. The portrait, dark overlay, exact copy, editorial type roles and all CTA
  destinations/source codes remain unchanged.
- Desktop height at `700px` and below is a compact mode: shorten vertical gaps,
  widen and reduce the H1 measure, reduce the lead proportionally and use the
  homepage's compact split-button sizing. Normal-height desktop preserves the
  editorial scale. Compact does not mean compressed: keep at least `24px`
  between H1 and lead, `28px` between lead and actions and `32px` between
  actions and the author block, with controls at least `42px` high. Mobile
  portrait retains touch-size controls and its own readable type scale.
- Required viewports: `390x844`, `479/480/481x900`, `639/640/641x900`,
  `768x1024`, `1023/1024/1025x768`, `1199/1200/1201x650`, reported
  `1232x582`, `1366x768`, `1440x900`, `1504x900`, `1728x900` and
  `1984x1046`. No horizontal overflow, clipped labels or JavaScript errors.
  Bounds-only acceptance is insufficient: the exact shortest desktop viewport
  also needs a rendered composition review for grouping, hierarchy and air.

## Articles library Hero

- Change ID: `2026-09-11-articles-hub-ui-repair`.
- `/articles/` is the navigation hub for the wedding editorial system, not a
  separate visual product. Its Hero uses `WeddingArticleHero.astro` and the
  compact shared title role.
- The collection H1 is «Статьи о свадьбе». The lead directly explains the
  page's only job: it contains the published materials about budget,
  preparation and scenario.
- At the owner-reported `1280x720` window the complete Hero must be no taller
  than the viewport; service lines must not overlap. `1280x720` is a permanent
  route-specific responsive case alongside the full shared matrix.
- After the Hero, show only a restrained list of published materials and the
  footer. The hub has no independent conversion CTA, no unpublished-topic
  showcase and no page-specific button family.
- On desktop Heroes without primary actions, the service block starts `74px`
  from the top and the author row finishes `88px` above the bottom. Shorter copy
  creates breathing room in the middle instead of moving the service line.
- At `1911x764`, `1911x839` and equivalent windows with at least a `2:1`
  aspect ratio, the portrait uses the upper focal rule so the full head remains
  visible. Both exact viewports are checked on the hub and every wedding article.

## Visible release target

Each shared contour is visible after its useful page content. It contains four
equal, explicit controls: Telegram, MAX, «Обсудить свадьбу» and «Сайт
ведущего». The author portrait and the text phone number remain in the island;
the contact pop-up opens over the page rather than creating a fifth CTA.

Every public wedding SEO or editorial article receives this final contour by
default, exactly once, after its useful content and before the shared footer.
The catalogue `/articles/` is not an article and has no such contour; any other
exception requires an explicit owner decision.

Every Telegram/MAX start and consultation-form submission from a public CTA
keeps a distinct structured `source` for its intent, site, page and placement.
The admin shows that source alongside the separate Telegram/MAX provider; no
new public CTA may use a generic or copied source code.

## Shared consultation popup on SEO routes

`/scenario/`, `/materials/`, `/articles/plan-podgotovki-k-svadbe/` and
`/articles/byudzhet-svadby-v-moskve/` use the literal homepage
consultation-popup pattern: Coolvetica/Manrope typography, the compact
split-button system with rotating arrow, phone card, form and success state.
Only Telegram/MAX deep-link values vary by source route; this is not a separate
SEO-page popup design.

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
  contact pop-up. It appears once at the end of useful page content and is
  mandatory by default for every wedding SEO/editorial article.
- «Маленький CTA» is the literal `ExpertMaterialsInlineCta` white materials
  island: one contextual copy line, orange Telegram and light MAX. It can be
  placed during reading, but never replaces or duplicates the final big CTA.
- The templates are defined in `docs/CTA_TEMPLATES.md`. They automatically
  emit one structured source per intent and placement: `site`, `page`,
  `placement`, then `plan` or `meeting`; provider is recorded separately in
  the CRM. A new page must not reuse another page's entrypoint.
