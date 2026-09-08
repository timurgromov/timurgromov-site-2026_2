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
- Rolled the same island to all three SEO routes. The ending title and photo
  composition are contextual: Scenario `4:3`, Materials `1:1`, preparation
  guide `3:2`; mobile uses a compact `3:2` crop.
- Removed the former `72px` expert-contour separation. The island begins after
  a measured `32px` desktop / `20px` mobile gap and has its own bottom padding
  before the common footer.
- Added the existing contact popup to Materials and the preparation guide, so
  «Обсудить свадьбу» has the same form/Telegram/MAX/phone journey everywhere.

## Verification target

All three routes must have no horizontal overflow, four visible actions with
canonical source-specific deep links, a functioning local contact popup and no
large empty tail between page content, CTA island and footer.
