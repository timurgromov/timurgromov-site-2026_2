# Wedding article UI kit and composition gate — 2026-09-11

## Scope

Native Astro wedding articles only: `/scenario/`, the preparation-plan guide
and the wedding-budget article. The homepage Tilda/Astro layer, SEO content,
calculator destinations and EventBudjet runtime are unchanged.

## Problem found in owner review

The previous responsive check proved only that the budget H1, lead and controls
fit inside `1232x582`. Its compact mode reduced the semantic gaps to
`12/16/18px` and the controls to about `30.8px`, so the page passed geometry
while the composition looked cramped and visually weaker than the approved
preparation-plan article.

## Implementation

- Extracted the shared native Astro Hero and introduction into
  `WeddingArticleHero.astro`, `WeddingArticleIntro.astro` and
  `wedding-article-ui.css`; all three wedding articles consume them.
- Kept the budget title in a documented compact variant, but restored its short
  desktop scale and breathing room: `24px` H1-to-lead, `28px` lead-to-actions,
  `32px` actions-to-byline and `42px` split controls.
- Standardized the introduction hierarchy: H2 up to `38px`, body `19px`
  desktop / `17px` mobile, Arial/sans body role and `660px` maximum measure.
- Preserved the portrait without transform scaling and moved its focal point
  upward so the complete head silhouette remains visible.
- Extended the responsive checker to wait for applied stylesheets and fail on
  undersized controls, compressed semantic gaps, oversized intro headings or
  overlong body measure.
- Added permanent route-specific coverage for the exact `1232x582` budget
  viewport instead of relying on an ad hoc manual run.

## Local verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed: 221 cases (11 routes x 20
  shared viewports plus the budget-only `1232x582` case).
- `npm run verify:contacts` — passed.
- Fresh rendered checks passed at `1232x582` and `390x844`. Exact local metrics
  are recorded in
  `docs/ui-evidence/2026-09-11-wedding-article-ui-kit-evidence.json`.

## Release

Runtime commit, push, GitHub Pages deploy and production visual verification
are pending.
