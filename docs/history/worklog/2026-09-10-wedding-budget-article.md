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
