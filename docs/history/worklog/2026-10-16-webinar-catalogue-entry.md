# Webinar in the materials catalogue — 2026-10-16

## Scope and cause

- The shared footer's «Все материалы» destination was corrected to `/articles/`, but that catalogue listed only three written materials. The existing webinar and short-video page at `/materials/` was absent.
- The owner confirmed the page and card name «Вебинар и видеоматериалы» and chose to keep the `/materials/` URL.

## Implementation

- Added a fourth ordinary catalogue card to `/articles/`, linking to `/materials/` with a viewing action. CollectionPage structured data now describes that item as a `WebPage`; the three written items remain `Article` entries.
- Changed the `/materials/` browser title and Open Graph title. The canonical URL, webinar H1 and video content were preserved.
- The responsive gate now asserts four catalogue cards and the webinar destination.
- UI contract and rendered before/after evidence: `UX.md` and `docs/ui-evidence/2026-10-16-webinar-catalogue-entry.json`.

## Verification

- `npm run verify:responsive-layout` passed: 296 cases across 13 routes.
- `npm run verify:materials-baseline` passed; the Tilda records remain inside Astro.
- The in-app browser observed the final local candidate at `390x844`, `759x900`, `760x900`, `761x900`, `1280x720` and `1440x900`. The fourth card was visible in the existing layout, with no horizontal overflow or console errors. Clicking it at mobile width reached the webinar page with the new title and the unchanged canonical URL.
- The staged UI evidence validator passed before the runtime commit.

## Release and live verification

- Runtime/source commit `57e10c6591c6fcdb617687d54ff7f02281b8c5ec` is pushed to `origin/main`; `gh-pages` output commit `507220013224ea7684be53e609f210e21294f876` was generated from it.
- GitHub Actions `Code health` (`38953969588`), `Deploy to gh-pages` (`38953969603`) and Pages publication (`38954302014`) completed successfully.
- `npm run verify:pages` confirmed fresh live HTML on both `/articles/` and `/materials/` from the runtime commit.
- In the fresh production browser, the fourth card rendered at `390x844` and `1280x720`. Clicking it reached `/materials/`, whose browser and Open Graph titles read «Вебинар и видеоматериалы | Тимур Громов». Both checked widths had no horizontal overflow or console errors.
