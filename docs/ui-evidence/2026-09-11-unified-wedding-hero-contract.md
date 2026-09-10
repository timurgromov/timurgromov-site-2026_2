# UI change contract

- Change ID: `2026-09-11-unified-wedding-hero`.
- Requested visible change: all four wedding surfaces must look like one
  corporate editorial system, with the same service block, portrait framing,
  type hierarchy and author placement.
- Surface: `/articles/`, `/scenario/`,
  `/articles/plan-podgotovki-k-svadbe/`,
  `/articles/byudzhet-svadby-v-moskve/`.
- User state: anonymous visitor, Hero at `scrollY=0`.
- Exact target: `.tg-article-hero` from `WeddingArticleHero.astro`.
- Action to reveal target: direct navigation to each route at the top of the
  document.
- Reported CSS viewports: permanent comparison probes `1911x764` and
  `1911x839`; first-screen calculator fit `1232x582`; mobile `390x844`.
- Affected modes: `650px`, `780px` and `640px` height/width boundaries, with
  the adjacent full responsive matrix run before release.
- Baseline visible signature: production had page-level `compact`/CTA modes,
  different vertical anchors and focal positions; the owner observed mismatched
  service-line placement, clipped hair and a plan H1 outside the first screen.
- Expected visible signature: all routes share one H1/lead scale, one portrait
  focal position, shared top/bottom anchors and a complete first screen. The
  budget article adds buttons inside that same composition only.
- Must remain unchanged: route URLs, copy, SEO metadata, calculator CTA sources
  and destinations, Astro-only boundary, dark portrait treatment and homepage.
- Attempt number: 3; owner-selected reference is the composition of
  `/scenario/` from the supplied comparison screenshot.

Acceptance: exact route comparison must show equal shared Hero metrics at one
viewport, no horizontal overflow, visible head, full author row and no console
errors after the candidate is freshly served.
