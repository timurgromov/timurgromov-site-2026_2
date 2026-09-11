# UI change contract

- Change ID: `2026-09-11-budget-final-conversion-contour`
- Requested visible change: the literal «Всё для подготовки к свадьбе» final
  conversion island is visible after the useful content of the wedding-budget
  article, instead of the page ending at its local footer.
- Surface: `/articles/byudzhet-svadby-v-moskve/`
- User state / fixture: public anonymous visitor; no messenger link is opened.
- Exact target: `renderExpertConversionContour` rendered as
  `[data-testid="expert-conversion-wedding_budget"]`.
- Action to reveal target: scroll to the end of the article.
- Reported CSS viewport: desktop `1440x900`; mobile `390x844` is the required
  compact layout check.
- Affected breakpoints: `479px`, `640px`, `900px`, `1200px`.
- Baseline visible signature: published page ends after the preparation-plan
  link with only the local footer; it has no
  `[data-testid="expert-conversion-wedding_budget"]`, no «Всё для подготовки
  к свадьбе» heading and no four-path final island.
- Expected visible signature: one final island with the heading, portrait,
  phone, Telegram, MAX, consultation and homepage paths; its final sources are
  `site_plan_timurgromov__wedding_budget__final` and
  `site_meeting_timurgromov__wedding_budget__final`.
- Must remain unchanged: useful article content, calculator CTA pairs and their
  `wedding_budget` hero/mid/final calculator sources; no link is opened during
  QA.
- Required viewports: `390x844`, `640x900`, `1440x900`.
- Attempt number for this exact target: `1`
- Owner reference/selected variant after attempt 2: not applicable.

Acceptance: the current served candidate is proven, the exact target is
deterministically visible, every viewport is observed after the last edit, and
the before/after signatures differ in the requested way.
