# Wedding article UI kit contract

- Change ID: `2026-09-10-wedding-article-ui-kit`.
- Canonical visual source: production `/scenario/`.
- Surfaces: `/scenario/`, `/articles/plan-podgotovki-k-svadbe/` and
  `/articles/byudzhet-svadby-v-moskve/`.
- State: anonymous visitor, Hero at `scrollY=0`; first editorial block directly
  below the Hero.

## Measured baseline

At the owner-reported `1232x582` CSS viewport and DPR 2:

- the budget Hero kicker ends at `131.5px`, H1 starts at `143.5px`, so their
  visible gap is only `12px`; the Scenario source uses the `34px` editorial
  kicker gap;
- the budget introduction H2 renders at `61.6px` in Cormorant Garamond and its
  answer paragraph at `34px` in italic Instrument Serif;
- Scenario body prose renders at `19px` in the shared Arial/sans role;
- the budget image uses a centered background plus `scale(1.02)`, which crops
  the upper portrait edge in the short desktop window.

## Expected visible delta

- All three wedding articles use one reusable Hero primitive and one reusable
  introduction primitive.
- Desktop Hero service lines keep the same `34px` gap before H1. The compact
  CTA Hero starts at a `52px` top safe area instead of vertically
  centering the shorter content block.
- At a short desktop viewport the CTA Hero keeps at least `24px` from H1 to
  lead, `28px` from lead to controls and `32px` from controls to the author
  block. Fitting the controls by collapsing those relationships is not an
  acceptable result.
- Split controls remain at least `42px` high instead of becoming miniature
  `30-31px` controls at windowed desktop widths.
- The portrait uses an explicit upper focal point and no decorative scale, so
  Timur's complete hair/head silhouette remains visible.
- A long SEO H1 may use the documented compact title variant, but it keeps the
  same families, line-height, kicker, lead and byline roles as the other
  articles.
- Introduction headings use the article H2 scale (`30-38px`); introduction
  prose uses the shared body scale (`19px` desktop, `17px` mobile) and sans
  family. Italic display text is an accent, not a body-copy style.
- The budget H1, lead and both calculator controls remain fully visible at
  `scrollY=0` with at least a `12px` bottom safety gap.

## Preserved invariants

- Exact article copy, SEO metadata/schema, links, CTA source codes and
  calculator behavior do not change.
- The homepage and its Tilda/Zero Block layer are untouched.
- Pages remain native Astro routes; the shared UI kit does not import Tilda
  runtime, classes, `zoom` or responsive behavior.
- Each article may retain its own information architecture after the shared
  Hero and introduction.

## Required verification

- `390x844`, `479/480/481x900`, `639/640/641x900`, `768x1024`,
  `1023/1024/1025x768`, `1199/1200/1201x650`, `1232x582`, `1366x768`,
  `1440x900`, `1504x900`, `1728x900`, `1984x1046`;
- no horizontal overflow, clipped type, hidden Hero controls or uncaught page
  errors;
- automatic checks for the H1/lead, lead/actions and actions/byline semantic
  gaps, plus the `660px` maximum introduction measure;
- live comparison of `/scenario/` and the budget article at `1232x582`, plus
  the budget introduction immediately below the Hero.
