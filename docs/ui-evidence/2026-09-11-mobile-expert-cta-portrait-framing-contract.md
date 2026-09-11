# UI change contract

- Change ID: `2026-09-11-mobile-expert-cta-portrait-framing`
- Requested visible change: correct the excessive empty space above Timur's
  head in the shared final CTA after the former `0%` mobile crop; retain a
  small, balanced top safety gap without clipping the hair.
- Surface: the literal `renderExpertConversionContour` on `/scenario/`,
  `/materials/`, `/articles/plan-podgotovki-k-svadbe/` and
  `/articles/byudzhet-svadby-v-moskve/`.
- User state / action: anonymous visitor scrolls to the final CTA. No link or
  form is opened.
- Exact target: `[data-testid^="expert-conversion-"] .tg-plan-cta__photo img`
  at `<=640px`.
- Baseline visible signature: production `object-position: 62% 0%`; the
  owner screenshot shows the head visibly sunk below the upper stencil edge,
  leaving an oversized empty field above it.
- Expected visible signature: `object-position: 62% 18%`; at `430x932` the
  top of the hair is visibly inside the stencil with an approximately `10–24px`
  upper gap. This is assessed by direct rendered visual review, not CSS alone.
- Preserved invariants: the stencil/portrait asset, horizontal layout, four
  controls, phone, links, sources, popup and all desktop/tablet crops.
- Required viewports: `375x812`, `390x844`, `430x932`, `440x956`,
  `639x900`, `640x900`, `641x900`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt number: `2`; rendered variants `18%`, `20%`, `21%` were compared at
  `430x932`. `18%` is the selected minimal head-safe framing.

Acceptance: a fresh candidate at `430x932` visibly has the approved small top
gap; all mobile CTA routes compute `62% 18%`, the 641px+ crop remains
unchanged, and responsive QA has no overflow or runtime error.
