# Wedding Article UI Kit

This is the source of truth for native Astro wedding-editorial and SEO pages.
It does not apply to the legacy Tilda layer on `/`.

Covered routes include the `/articles/` library hub as well as individual
wedding articles. The hub may keep its own card grid and navigation sections,
but its Hero uses the same primitive and type roles.

The hub is a catalogue, not a landing page. After the shared Hero it lists only
published materials. It must not add an independent sales promise, calculator
CTA, preparation-plan CTA or unpublished-topic promo between the catalogue and
footer. Links to individual materials are editorial rows, not a second button
system.

## Required primitives

- `src/components/WeddingArticleHero.astro` owns the portrait, overlay, service
  line, H1/lead hierarchy and author byline.
- `src/components/WeddingArticleIntro.astro` owns the first editorial block,
  including eyebrow, optional H2, body measure and optional drop cap.
- `src/styles/wedding-article-ui.css` owns their palette, fonts, type scale,
  spacing, portrait focal point and responsive rules.
- CTA controls use their existing shared components. Article pages must not
  redraw split buttons locally.

## One Hero composition, two shared height roles

Every wedding-editorial route uses one `WeddingArticleHero` construction. A
page may add its conversion controls in the action slot, but that must not
change the Hero's font scale, top anchor, bottom anchor, portrait crop or
vertical grid.

Desktop Hero height has only two owner-approved shared roles:

- `screen` (the default): first-screen conversion or a substantial editorial
  cover. It occupies the available viewport height.
- `compact`: an explicitly approved short editorial cover. It is
  `clamp(480px, 64svh, 640px)` and may grow naturally if its content requires
  it. It never crops text. Current approved routes are `/articles/` and
  `/articles/plan-podgotovki-k-svadbe/`.

This is not permission to tune title size or height page by page. The same
tokens, portrait crop, top/bottom anchors, type roles and grid remain shared.

The only adaptive modes are global viewport modes applied to every route:

- desktop: shared `72px` top anchor, `76px` author bottom anchor;
- short desktop (`<=780px` high): shared `40px` top/bottom anchors and one
  smaller type scale for all routes;
- very short desktop (`<=650px` high): the same global grid reduces the type
  scale, but keeps the main content vertically balanced between the service
  line and author row; it must not strand the free space below the CTA or lead;
- mobile: one dedicated mobile scale and crop for all routes.

Mobile has one shared natural document flow. Compact mode is desktop-only.

## Fixed roles

- H1/H2: `Cormorant Garamond`, semibold.
- Italic display accent: `Instrument Serif`.
- Paragraphs, service lines, metadata and controls: shared sans-serif role.
- Desktop introduction H2: at most `38px`.
- Desktop body: `19px / 1.68`; mobile body: `17px / 1.55`.
- One desktop H1 scale: `48–58px`; one desktop lead scale: `21–22px`.
  The shared desktop H1 measure is `660px` (or `54vw` in the global
  short-height mode). Title length changes wrapping only, never the selected
  type role or a page-local measure.
- Desktop Hero is a three-row grid: service line at the top, author row at the
  bottom and the H1/lead/action group centred in the remaining lane. On desktop
  the free gap above and below that group must be equal within `2px`; metadata
  receives no artificial top padding that would create a lower empty void.
- The internal group rhythm is `28px` H1-to-lead and `32px` lead-to-actions on
  regular desktop, `20px`/`24px` on short desktop and `24px`/`28px` in the
  very-short mode. Mobile keeps its own natural document flow.
- Every desktop Hero starts its service block at the shared top anchor and ends
  the author row at the shared bottom anchor, regardless of CTA presence or
  copy length. Title length may move a centred content group slightly, but may
  not create a page-local grid or leave all free space below the group.
- Semantic group gaps are never below `24px` on regular desktop, `20px` on
  short desktop and `18px` on mobile. Primary controls remain at least `42px`
  high.
- Primary split controls are at least `42px` high on desktop; short viewport
  mode must not turn them into miniature controls.
- Introduction prose measure: at most `660px`.
- Portrait: shared black-and-white asset, no decorative scaling and one upper
  focal point (`74% 0%` desktop; `72% 0%` mobile). The head must remain fully
  visible. Both `1911x764` and the owner-observed `1911x839` viewport are
  mandatory for all four wedding-editorial routes. The owner-reported
  `1232x638` desktop viewport is also a required four-route composition probe.

## New article rule

Start from these primitives. Do not add props, classes or CSS branches that
change Hero composition by route, title length or action presence. Content
sections may use their own layout only after the shared introduction, and must
continue the same heading/body roles. Every new or changed route runs the
repository responsive matrix before release. The runner compares all four
routes at the same viewport and fails if their anchors, H1/lead font sizes,
byline anchor or portrait focal point diverge. Passing overflow and
first-screen bounds is necessary but not sufficient: visually inspect the
rendered candidate at the shortest required desktop viewport.
