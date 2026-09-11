# UI change contract

- Change ID: `2026-09-11-tall-article-hero-title-scale`
- Requested visible change: make the H1 feel less lost in the generous vertical
  lane of the two shown editorial Heroes, while keeping it vertically centred
  between the service block and author row.
- Surface: shared `WeddingArticleHero` on `/scenario/` and `/articles/`, using
  the explicit `prominent` role for these two owner-selected short-copy covers.
- User state / fixture: public anonymous reader at the top of each route.
- Exact target: `.tg-article-hero__title h1` in a wide, tall desktop viewport.
- Action to reveal target: open the route directly at `scrollY=0`.
- Reported CSS viewport: not available from screenshot chrome; `1911x839` is
  the established wide-desktop Hero probe and the closest repeatable anchor.
- Affected breakpoints: new tall-desktop range starts at `min-width:1200px`
  and `min-height:781px`; `<=780px` and mobile retain their existing compact
  scales.
- Baseline visible signature: at `1911x839`, both H1s render at `58px`; their
  content group is already geometrically centred, but the one-line title looks
  visually too slight in the available vertical lane.
- Expected visible signature: at `1911x839`, both selected prominent H1s are
  `68px`; their content groups remain centred with equal free space above and
  below, while the service block, lead and author row retain their anchors.
- Must remain unchanged: photo crop, Hero height roles, title measure, lead,
  top service anchor, bottom author anchor, all mobile/short-desktop scales and
  the base title scale on `/articles/plan-podgotovki-k-svadbe/` and
  `/articles/byudzhet-svadby-v-moskve/`.
- Required viewports: `390x844`, `1232x582`, `1366x768`, `1440x900`,
  `1911x764`, `1911x839`.
- Attempt number for this exact target: `1`.

Acceptance: the tall-desktop H1 has visibly stronger hierarchy on `/scenario/`
and `/articles/`, the other two shared routes keep their breathable base scale,
the main group stays centred in its lane, and the existing short-height/mobile
guards remain intact.
