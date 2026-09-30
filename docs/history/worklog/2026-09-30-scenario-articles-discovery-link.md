# Scenario → articles discovery link — 2026-09-30

## Intent

Give search engines and readers one verified contextual route from the existing
scenario article to the wedding-articles hub, without touching the protected
homepage, Direct, messengers or CRM.

## Change

- Added a single normal `<a href="/articles/">` link to the final paragraph of
  the scenario introduction.
- The copy names the next useful material: a step-by-step preparation plan and
  budget overview.
- No CTA source, messenger destination, popup or page metadata changed.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed after the change.
- Fresh local in-app-browser check at `1280x720`: baseline had no ordinary link
  to `/articles/`; the candidate showed one visible link, and activating it
  opened the existing article hub. Console errors: none.

## Release

Commit, push, GitHub Pages deployment and production verification are pending.
