# 2026-10-21 — Sitewide local typography

## Scope and baseline

- Scope: all 13 public Astro routes on `timurgromov.ru`, with focused visible acceptance on `/privacy/`, `/consent/` and `/offer/`.
- Preserve: document copy and URLs, legal links, Tilda/Zero Block geometry, article roles, Jubilee layout, CTAs and forms.
- Before on production at `1280×720`: privacy and consent headings/body computed to Arial; offer headings computed to Arial and body to Times New Roman. Coolvetica and Manrope were not used on those pages.

## Root cause

The October 16 local-font release fixed the external font files and representative homepage, materials and article routes, but the legal pages still explicitly selected Arial/Times. The standalone Jubilee layout also did not include the shared local font declarations and its CSS selected an unavailable Inter first.

## Change

- Added `src/site/local-fonts.ts` as the one same-origin Coolvetica/Manrope face definition used by both `BaseLayout` and `JubileeLayout`.
- Applied Coolvetica to legal headings and Manrope to legal body copy. Replaced direct system-font primaries in native article/scenario styles and Jubilee CSS with the existing approved local roles.
- Extended the permanent responsive gate: first-party Astro/CSS and Jubilee CSS fail if Arial, Helvetica, Times, Georgia or `system-ui` appears as the primary family; every public route must load Coolvetica and Manrope, editorial routes must also load their two local editorial families; legal font roles are asserted separately.

## Candidate verification

- `npm run build` passed: 13 static pages.
- `npm run verify:contacts` passed at `1911×1064`, `1440×900` and `390×844`.
- `npm run verify:responsive-layout` passed 296 cases: 13 routes across 20 shared viewports plus 36 route-specific breakpoint cases.
- Focused Playwright rendering passed on all three legal routes at `390×844` and `1280×720`: H1/H2 compute to Coolvetica, body copy to Manrope, no horizontal overflow and no console errors. Desktop and mobile screenshots were visually reviewed.

## Release

Pending production publication and fresh live verification.
