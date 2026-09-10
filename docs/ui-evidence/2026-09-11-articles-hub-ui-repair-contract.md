# Articles hub UI repair contract

- Change ID: `2026-09-11-articles-hub-ui-repair`.
- Surface: `/articles/`, public anonymous state, `scrollY=0`.
- Canonical visual source: shared native wedding Article UI kit used by
  `/scenario/` and the published wedding guides.

## Measured production baseline

At `1280x720`:

- the page-local H1 rendered at `89.6px` across five lines;
- the Hero was `775.27px` high and exceeded the initial viewport;
- the absolutely positioned top service line overlapped the separate library
  eyebrow/title group;
- the portrait used `scale(1.02)` instead of the shared no-scale focal rule.

At `390x844`, the page-local Hero was fixed at `760px`; its `58.5px` H1 occupied
`324.38px`, delaying the first article entry unnecessarily.

## Expected visible delta

- Replace the page-local Hero with `WeddingArticleHero.astro`.
- Use the concise H1 «Статьи о свадьбе: по делу» and retain the existing lead.
- Keep the shared kicker, portrait, overlay, author row and semantic spacing.
- At `1280x720` the complete Hero ends inside the viewport with no overlapping
  service text. On mobile the first content section begins substantially
  earlier without losing the author identity.

## Preserved invariants

- Existing article cards, order, descriptions and destinations.
- CollectionPage/Breadcrumb schema, canonical, title and description.
- Planned-topics section, start links and footer.
- Homepage and individual article routes.

## Required verification

- Full repository responsive matrix plus route-specific `1280x720` for
  `/articles/`.
- Fresh rendered checks at `1280x720` and `390x844`.
- No horizontal overflow, service-line overlap, clipped portrait or runtime
  errors.
