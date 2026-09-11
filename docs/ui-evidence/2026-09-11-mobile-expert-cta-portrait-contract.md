# UI change contract

- Change ID: `2026-09-11-mobile-expert-cta-portrait-safe-crop`
- Requested visible change: the portrait in the shared final «Всё для
  подготовки к свадьбе» CTA must keep the full top of Timur's head inside the
  mobile stencil; it must not inherit a desktop/article crop.
- Surface: the literal `renderExpertConversionContour` shared by `/scenario/`,
  `/materials/`, `/articles/plan-podgotovki-k-svadbe/` and
  `/articles/byudzhet-svadby-v-moskve/`.
- User state / fixture: public anonymous visitor; scroll to the final CTA; no
  messenger link or form is opened.
- Exact target: `[data-testid^="expert-conversion-"] .tg-plan-cta__photo img`
  at CSS widths `<=640px`.
- Reporter evidence: the supplied iPhone screenshot of the preparation-plan
  final CTA; device labels are not treated as CSS dimensions, so the contract
  covers `375x812`, `390x844`, `430x932` (iPhone 14 Pro Max) and `440x956`
  (iPhone 16 Pro Max).
- Affected breakpoint: `640px`; `639/640/641` remain in the common responsive
  matrix.
- Baseline visible signature: live preparation-plan CTA applies the page
  desktop crop `object-position: 62% 27%` on mobile. In the wide horizontal
  stencil this removes the top of the head, as shown in the supplied screenshot.
- Expected visible signature: every final CTA at `<=640px` has the mobile-only
  top-safe crop `object-position: 62% 0%`; the head begins with visible space at
  the top of the stencil. Desktop/tablet per-route crops remain unchanged.
- Must remain unchanged: the transparent homepage stencil, image asset,
  four CTA controls, text/phone, sources, links, popup and all content above
  the final contour.
- Required viewports: `375x812`, `390x844`, `430x932`, `440x956`, `639x900`,
  `640x900`, `641x900`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt number for this exact target: `1`.
- Owner reference/selected variant after attempt 2: not applicable.

Acceptance: after a fresh candidate reload, the mobile portrait's computed
position is exactly `62% 0%` on all shared final-CTA routes, a rendered
mobile review visibly keeps the head inside the stencil, and the responsive
matrix reports no overflow or runtime error.
