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
