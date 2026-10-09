# Jubilee package contact CTA — 2026-10-09

## Scope

The Jubilee pricing cards now follow the same contact UX as the corporate
routes. Wedding pages and wedding calculator behavior are unchanged.

## UX

- Each Jubilee package has `Обсудить этот вариант`.
- The shared panel shows the selected package, optional date, displayed price
  and extension rate.
- The callback form contains only name and phone; the panel keeps the attributed
  Telegram bot and direct phone call.
- Success remains gated by backend HTTP `201`.

## Verification

- `npm run verify:jubilee-pricing` passed.
- `npm run verify:contacts` passed.
- `npm run verify:responsive-layout` passed 274 cases over 12 routes.
- The in-app browser verified 390x844 package presentation plus local success
  and error states without sending a production request.

## Release

- Runtime: `ccf51eb` on `origin/main`.
- Production: `5c6afef` on `origin/gh-pages`; both deployment and code-health
  workflows completed successfully.
- Fresh live mobile and desktop checks passed for package context, short-form
  geometry, Escape/focus return, overflow and browser console errors.
