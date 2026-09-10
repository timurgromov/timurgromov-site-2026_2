# Wedding Hero anchor and focal-ratio correction — 2026-09-11

## Cause

Two independent variables were incorrectly treated as one visual fix:

- `background-position: 74% 10%` was activated only below `820px` viewport
  height, while the owner's actual wide-short Chrome content area was about
  `1911x839`, so the rule did not run;
- the shared no-action Hero bottom-aligned the entire copy stack, making its
  service line move according to title and lead length.

## Change

- Select the upper portrait focal point by a `2:1` viewport aspect ratio.
- Anchor no-action desktop service blocks `74px` from the top and author rows
  `88px` from the bottom, leaving flexible breathing room between lead and
  byline.
- Add the exact `1911x839` viewport for all four wedding-editorial routes and
  assert both vertical anchors in the responsive gate.

## Verification

- `npm run verify:responsive-layout` — passed, 230 cases.
- Rendered `/articles/` and `/scenario/` at `1911x839`; both use matching top
  and bottom anchors with visible space above the portrait.
- Rendered `/articles/` at `390x844`; the mobile composition remains intact.
- Runtime commit `65a3910` was pushed to `origin/main`; Code health and Deploy
  to gh-pages completed successfully.
- `npm run verify:pages` confirmed production is deployed from the exact commit.
- Fresh production renders of `/articles/` and `/scenario/` at `1911x839`
  confirmed matching service-line and author-row anchors plus clear portrait
  headroom.
