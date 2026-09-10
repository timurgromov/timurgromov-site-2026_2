# Unified wedding Hero system — 2026-09-11

## Scope

Unify the Hero of `/articles/`, `/scenario/`, the preparation guide and the
budget article. Homepage, EventBudjet, bot destinations and editorial body
content are out of scope.

## Change

- Removed `titleSize` and page-level Hero sizing branches.
- Moved the title, lead and optional action slot into one shared content group.
- Added one universal desktop grid plus global short-height modes at `780px`
  and `650px`; action presence never changes the Hero grid.
- Set one desktop type scale, fixed shared top/bottom anchors and one upper
  portrait focal point so the head remains visible.
- Extended the responsive gate to compare all four routes at the same viewport
  for anchors, H1/lead type, byline placement and portrait focal point.

## Local verification

- `npm run build` passed.
- The targeted browser matrix passed: 21 cases covering all 11 routes at
  `390x844`, plus `1232x582`, `1280x720`, `1911x764` and `1911x839` route
  probes. It checks the four wedding routes together at both owner-reported
  wide-short sizes.
- Local browser observation at the top of all four routes confirmed the same
  author line hierarchy and visible head; the budget Hero retained both
  calculator controls and author row in a `720px`-high window.

## Release

Commit/push/deploy/production verification remain pending at this worklog
point.
