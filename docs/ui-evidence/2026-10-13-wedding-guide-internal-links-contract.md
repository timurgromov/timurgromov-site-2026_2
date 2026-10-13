# UI change contract — wedding guide internal links

- Change ID: `2026-10-13-wedding-guide-internal-links`
- Requested visible change: connect `/materials/` and both long-form articles
  to the existing wedding-guide hub with ordinary contextual links.
- Surfaces: `/materials/`, `/articles/plan-podgotovki-k-svadbe/`,
  `/articles/byudzhet-svadby-v-moskve/`.
- User state: anonymous public reader.
- Exact targets:
  - explanatory paragraph in `#materials-followup-cta`;
  - final reader-next-step after the preparation-plan FAQ;
  - existing `.budget-plan-link` at the end of the budget article.
- Baseline: fresh production at `1280x720` had zero visible
  `<a href="/articles/">` links on each of the three target routes.
- Expected visible signature: each target route has exactly one visible
  contextual link labelled `свадебный гид` and resolving to `/articles/`.
- Must remain unchanged: homepage, hero, price, primary CTA, Direct flow,
  Telegram/MAX URLs and source IDs, contact forms, titles, H1, canonical,
  schema, sitemap and robots.
- Required viewports: `390x844`, `1180x820`, `1280x720`, `1366x768`,
  `1440x900`, `1984x1046`; the project responsive gate also covers its full
  route and breakpoint matrix.
- Attempt number: `1`.

Acceptance: the current served candidate contains one visible contextual link
to `/articles/` on every target route, the links open the existing hub, no
horizontal overflow or browser console errors appear, and the protected
homepage remains unchanged.
