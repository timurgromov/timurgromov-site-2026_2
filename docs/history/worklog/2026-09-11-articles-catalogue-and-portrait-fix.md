# Articles catalogue and portrait fix — 2026-09-11

## Scope

Native Astro `/articles/` catalogue, the shared wedding Hero focal rule,
responsive assertions and owner documentation. Article content, calculator
attribution, homepage and EventBudjet remain unchanged.

## Cause

The catalogue had accumulated a second promotional section, unpublished-topic
showcase and local rectangular buttons although its documented role was only to
index published articles. Separately, the shared `cover` image used a `38%`
vertical focal position at every desktop aspect ratio. At the owner-reported
wide-short `1911x764` window this cropped the portrait from the top.

## Change

- Reduced the page to the shared Hero, three published material rows and the
  existing footer.
- Replaced the positioning copy with a direct catalogue description and removed
  the hub-only CTA/button system.
- Added the shared `74% 10%` portrait focal rule for desktop windows at least
  `1600px` wide and at most `820px` high.
- Added `1911x764` for all four wedding-editorial routes and catalogue-role/type
  assertions to the permanent responsive gate.

## Verification

- `npm run build` — passed.
- `npm run verify:responsive-layout` — passed, 226 cases.
- Rendered local checks passed at `/articles/` `1911x764` and `390x844`, and at
  `/articles/byudzhet-svadby-v-moskve/` `1232x582`.
- Commit, push and production verification are pending.
