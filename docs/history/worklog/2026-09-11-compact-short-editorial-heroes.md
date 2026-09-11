# Compact short editorial Heroes — 2026-09-11

## Scope

Only the short-copy public covers:

- `/articles/`
- `/articles/plan-podgotovki-k-svadbe/`

The budget conversion Hero and `/scenario/` remain in the default `screen`
role.

## Decision

Keep the shared wedding Article Hero, typography, portrait focal point and
desktop anchors. Introduce the explicit `compact` height role for the two
approved routes: `clamp(480px, 64svh, 640px)`. It grows with content and
returns to natural flow on mobile.

The change removes lower empty field instead of making type smaller. Portrait
focus remains top-safe (`74% 0%` desktop, `72% 0%` mobile), so there is still
air above Timur's head.

## Local evidence before release

- At the owner viewport `1232x638`, both compact Heroes are `481px` high;
  their next section enters the initial screen, while the title and lead retain
  the shared scale.
- The article hub content lane measures `112.23px` above and below the main
  group; the preparation plan measures `80.37px` above and below it.
- At `1911x764`, the preparation Hero measures `489.95px` and the portrait
  head remains inside the image with upper breathing room.
- At `390x844`, both use natural height; no horizontal overflow was observed.
- `npm run verify:responsive-layout` passed after the change.

## Guardrail

`scripts/check-responsive-layout.mjs` asserts the compact role and exact
desktop height rule for the two approved routes. Another article cannot acquire
this height role silently.

## Release

Pending commit, push, GitHub Pages deployment and production recheck.
