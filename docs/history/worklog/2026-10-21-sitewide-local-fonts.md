# 2026-10-21 — Sitewide local typography

## Scope and baseline

- Scope: the main `timurgromov.ru` contour, with focused visible acceptance on `/privacy/`, `/consent/` and `/offer/`. Separate corporate sites and Jubilee typography are unchanged.
- Preserve: document copy and URLs, legal links, Tilda/Zero Block geometry, article roles, Jubilee layout, CTAs and forms.
- Before on production at `1280×720`: privacy and consent headings/body computed to Arial; offer headings computed to Arial and body to Times New Roman. Coolvetica and Manrope were not used on those pages.

## Root cause

The October 16 local-font release fixed the external font files and representative homepage, materials and article routes, but the legal pages still explicitly selected Arial/Times.

## Change

- Applied Coolvetica to legal headings and Manrope to legal body copy. Replaced direct system-font primaries in native main-site article/scenario styles with the existing approved local roles.
- Extended the permanent responsive gate: main-contour Astro/CSS fails if Arial, Helvetica, Times, Georgia or `system-ui` appears as the primary family; every main-contour route must load Coolvetica and Manrope, editorial routes must also load their two local editorial families; legal font roles are asserted separately.

## Candidate verification

- `npm run build` passed: 13 static pages.
- `npm run verify:contacts` passed at `1911×1064`, `1440×900` and `390×844`.
- `npm run verify:responsive-layout` passed 296 cases: 13 routes across 20 shared viewports plus 36 route-specific breakpoint cases.
- Focused Playwright rendering passed on all three legal routes at `390×844` and `1280×720`: H1/H2 compute to Coolvetica, body copy to Manrope, no horizontal overflow and no console errors. Desktop and mobile screenshots were visually reviewed.

## Release

- Final source commit `1fdcf4db80112dd416d8d0e490c2c1047472d0ec` is pushed to `origin/main`; production output `508835b67de39464d6562b25a024591ee761cd07` is on `origin/gh-pages`.
- `Code health` run `39622869836` and `Deploy to gh-pages` run `39622869806` completed successfully. The deploy repeated the complete 296-case responsive gate.
- `npm run verify:pages` confirmed that production is built from the final source commit and that `/privacy/` contains the new font role without the former Arial declaration. Coolvetica 500, Coolvetica 300 and Manrope assets return HTTP 200 with expected byte counts.
- Fresh production Playwright checks at `390×844` and `1280×720` confirmed Coolvetica H1/H2 and Manrope body copy on `/privacy/`, `/consent/` and `/offer/`, with no horizontal overflow or console errors. A visible in-app-browser review confirmed the rendered desktop privacy page.
- The final Jubilee stylesheet still exposes its original `Inter, system-ui, Arial` stack, and `corp.timurgromov.ru` was not edited. An intermediate broader commit was immediately narrowed by `1fdcf4d` before final verification; the final static release contains the scoped version.
