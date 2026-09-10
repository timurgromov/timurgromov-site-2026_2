# 2026-09-10 — wedding budget article

- Added the evergreen `/articles/byudzhet-svadby-v-moskve/` route with unique
  metadata, canonical, `Article` and `BreadcrumbList` JSON-LD.
- Rebuilt `/articles/` as a corporate-style editorial hub and featured the new
  budget material. The hub remains navigation, not a keyword landing.
- Reused the `/scenario/` visual system and added three optimized WebP captures
  from the real calculator component without personal data or visible money.
- Added equal Telegram/MAX direct calculator CTA pairs for Hero, middle and
  final placements, plus exact structured source tracking.
- Added the URL to the sitemap and documented the permanent public-page brand
  rule for future pages.
- Local build passed. The responsive gate covered 11 routes across 20
  viewports (220 cases); rendered desktop/mobile checks passed.
- Site commit `6dec7b6` was pushed and deployed by the passing GitHub Pages
  workflow. Production article, hub, sitemap and screenshot assets return
  `200`; the new canonical URL is present in the sitemap.
- EventBudjet runtime `6a199fe` is live. MAX Web proved the exact Hero source,
  provider-specific `calculator_opened` event and original-source preservation.
  Telegram Web proved Mini App open, estimate restoration and copy, while exact
  Telegram article-source retention remains pending because that client reduced
  the tested `startapp` link to generic `/start`.
- After owner review, reduced the Hero H1 so it no longer dominates a short
  desktop viewport and replaced the unclear middle CTA with «Выберите нужные
  расходы и соберите свою смету». A full copy pass removed similarly artificial
  constructions from the article, FAQ and calculator captions.
- Exact local proof at `1232x638`: H1 `62.832px`, text box `301.234px`, no
  horizontal overflow, new CTA present and old CTA absent. The responsive gate
  passed all 11 routes across 20 viewports after the final edit.
- Follow-up commit `3f1ab06` was pushed and deployed. Code health and GitHub
  Pages workflows passed; the production page then rendered the new CTA and a
  `62.832px` H1 with a `298.273px` text box at the reported live viewport.
  Google/Yandex crawl registration is recorded in the separate `SEO/` owner.
- Updated the project rule to avoid a stale fixed route count: every discovered
  static Astro route is automatically included in the responsive matrix, and a
  new dynamic route must provide a fixture before release. No page may opt out.
- Clarified and implemented the permanent native-page boundary: wedding SEO
  articles are standalone Astro routes, not Tilda pages. The budget calculator
  CTA moved from the legacy-named helper/classes to a native
  `corporate-split-cta` helper and neutral asset while preserving the approved
  homepage button anatomy and all six destination/source contracts.
- Added a height-aware compact Hero mode and a reusable
  `data-first-screen-lead` / `data-first-screen-primary-actions` acceptance
  marker. At the reported `1232x582`, the actions moved from `672.35px` (below
  the fold) to `425.23px`; the full H1, lead, two controls and author row are
  visible at `scrollY=0` with no horizontal overflow.
- Added the typography/CTA/native-Astro rule to `UX.md`, `AGENTS.md` and
  `DECISIONS.md`. The full responsive gate passed all 11 routes across 20
  viewports (220 cases), and a live browser screenshot confirmed the exact
  `1232x582` candidate.
- `npm run verify:contacts` also passed after the helper replacement; the
  Telegram/MAX targets and all existing contact contracts remain intact.
