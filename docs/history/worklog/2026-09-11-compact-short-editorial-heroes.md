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
approved routes: `clamp(480px, 75svh, 640px)`. It grows with content and
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
- At `1911x764`, the preparation Hero measures `573px` and the portrait
  head remains inside the image with upper breathing room.
- At `390x844`, both use natural height; no horizontal overflow was observed.
- `npm run verify:responsive-layout` passed after the change.

## Guardrail

`scripts/check-responsive-layout.mjs` asserts the compact role and exact
desktop height rule for the two approved routes. Another article cannot acquire
this height role silently.

## Release

- Initial commit `a1ba666` correctly exposed a wide-desktop air defect in CI:
  the fallback-font preparation-plan lead had only `30.61px` before the author
  row at `1911x839`. It was not released.
- Corrective commit `855ac44` changes the shared role to
  `clamp(480px, 75svh, 640px)`. `Code health` and `Deploy to gh-pages` passed.
- Production HTML on both routes contains `data-hero-height="compact"`.
  Fresh in-app browser inspection confirms the following reading section is
  visible after the cover, the shared type hierarchy remains intact, and the
  portrait head has room above it.
- The production responsive runner passed against `https://timurgromov.ru`.

## Portrait framing follow-up

At the owner-reported `1232x582` viewport, the old `74% 0%` compact cover had
about `164px` of ceiling above Timur's hair. A first `74% 30%` candidate
over-corrected: the hair became flush with the Hero edge. The released bounded
correction is `74% 25%` for the same two desktop compact routes only.

- Commit `8d3cc0e` — `Refine compact hero portrait framing`.
- Fresh local and production in-app-browser screenshots show a small visible
  gap above the hair in both covers, with no head clipping.
- `npm run build`, `npm run verify:responsive-layout`, GitHub `Code health`,
  GitHub `Deploy to gh-pages`, and the production responsive runner passed.
- Default screen Heroes still use `74% 0%`; mobile remains `72% 0%`.
