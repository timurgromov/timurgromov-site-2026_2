# SEO page technical hardening — 2026-10-13

## Scope

- Connect the protected homepage to `/articles/` through one ordinary footer
  navigation link without changing the Hero, prices or primary CTA.
- Give `/materials/` one real H1 and truthful `VideoObject` markup for the
  existing webinar.
- Add `Article` and `BreadcrumbList` structured data to `/scenario/`.
- Preserve Direct, attribution, contact and messenger contracts.

## Implementation

- The existing hidden Tilda footer slot formerly labelled `Полезности` is now
  visible as `Свадебный гид` and links to `/articles/`.
- `/materials/` reuses its existing webinar title as the only H1; no visible
  copy or geometry was added. Its JSON-LD describes the already published
  video, poster, author and verified publication date.
- `/scenario/` now publishes the page's existing editorial identity as
  `Article` plus its real home → articles → scenario breadcrumb chain.
- The footer regression gate now verifies the new item's text, href,
  visibility and mobile order. Its browser startup timeout was increased from
  8 to 15 seconds because the current local Chrome exposes DevTools after
  roughly 9 seconds.

## Verification

- `npm run build` — passed.
- Built HTML/schema assertions — passed: one H1 on `/materials/`, valid
  `VideoObject`, valid `Article` and `BreadcrumbList`, one homepage guide link.
- `npm run verify:materials-baseline` — passed.
- `npm run verify:contacts` — passed at `1911x1064`, `1440x900`, `390x844`.
- `npm run verify:responsive-layout` — passed: 274 cases across 12 routes.
- `npm run check:direct-attribution` — passed.
- Fresh local in-app browser review confirmed the footer item and navigation
  to `/articles/` without changing the homepage's commercial controls.
- UI evidence:
  `docs/ui-evidence/2026-10-13-home-wedding-guide-footer-evidence.json`.

## Release

- Runtime/source commit: pending.
- Production output: pending.
- Fresh live verification: pending.

No media or runtime assets were added.
