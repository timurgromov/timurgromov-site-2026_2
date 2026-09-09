# 2026-09-08 — Home CTA island on SEO pages

## Scope

Public wedding site only: `/scenario/`, `/materials/` and
`/articles/plan-podgotovki-k-svadbe/`. The homepage, bot runtime, CRM and
corporate pages are unchanged.

## Change

- Replaced the bespoke expert-page card/button styling with the homepage
  `tg-plan-cta` / `tg-plan-cta__button` split-button markup and its font,
  palette and hover transition.
- Kept the agreed four paths in one 2×2 control group: Telegram materials,
  MAX materials, the existing contact popup and the homepage of the host.
  The direct phone remains text, not a fifth CTA.
- Rolled the same island to all three SEO routes. A follow-up correction
  removed the bespoke rounded photo rectangles: the supplied portrait now uses
  the exact transparent media stencil from the homepage «Честно о ценах»;
  routes only adjust the visible crop position. The CTA arrow is now the same
  homepage pseudo-element and rotates 45 degrees on hover.
- Removed the former `72px` expert-contour separation. The island begins after
  a measured `32px` desktop / `20px` mobile gap and has its own bottom padding
  before the common footer.
- Added the existing contact popup to Materials and the preparation guide, so
  «Обсудить свадьбу» has the same form/Telegram/MAX/phone journey everywhere.
- Made «Всё для подготовки к свадьбе» the one large universal CTA headline in
  the established homepage headline font; removed route-specific CTA headings.

## Verification target

All three routes must have no horizontal overflow, four visible actions with
canonical source-specific deep links, a functioning local contact popup and no
large empty tail between page content, CTA island and footer.
# Homepage contact popup source reuse

- Replaced the reduced redraw used by the SEO routes with the complete homepage
  consultation-popup structure and interaction model.
- The source-specific Telegram/MAX parameters remain intact. The visual and
  interaction contract now includes the homepage font variables, close icon,
  phone card, split-button arrow animation, form and success state.

## Scenario mid-article materials entry

- Added one compact materials-only CTA after «Церемония, поздравления и
  фотографии». It is deliberately before the existing personal-meeting CTA and
  uses the homepage split-button source for Telegram/MAX only.
- The full author CTA island remains once at the page bottom, avoiding a second
  heavy portrait/contact block in the reading flow.
- The initial divider-style presentation was replaced after visual review with
  one compact white island: no parallel separator lines, orange primary
  Telegram and light secondary MAX. It is the materials-only, smaller-scale
  continuation of the bottom home-style island.

## Durable CTA template contract (2026-09-09)

- Extracted the small materials island from `/scenario/` into the literal
  reusable `src/components/ExpertMaterialsInlineCta.astro`; its Tilda split
  controls, arrow animation and white-card treatment now have one source.
- Defined the two owner-facing commands in `docs/CTA_TEMPLATES.md` and
  `AGENTS.md`: «Большой CTA» is `renderExpertConversionContour`, and
  «Маленький CTA» is `ExpertMaterialsInlineCta`.
- Recorded that plan/contact source codes identify the page while the CRM
  stores the Telegram/MAX provider separately. Current three expert routes
  already have individual codes; a future route must add its own pair and
  EventBudjet labels before release.
