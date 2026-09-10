# Wedding Article UI Kit

This is the source of truth for native Astro wedding-editorial and SEO pages.
It does not apply to the legacy Tilda layer on `/`.

## Required primitives

- `src/components/WeddingArticleHero.astro` owns the portrait, overlay, service
  line, H1/lead hierarchy and author byline.
- `src/components/WeddingArticleIntro.astro` owns the first editorial block,
  including eyebrow, optional H2, body measure and optional drop cap.
- `src/styles/wedding-article-ui.css` owns their palette, fonts, type scale,
  spacing, portrait focal point and responsive rules.
- CTA controls use their existing shared components. Article pages must not
  redraw split buttons locally.

## Allowed Hero variants

- `standard`: editorial titles such as «Свадебный сценарий» and the preparation
  guide.
- `compact`: long SEO titles that need a smaller maximum display size.
- `withActions`: only when primary controls are inside the Hero. This variant
  adds the first-screen markers and height-aware compact desktop layout.

Variants change only measure and fit. They do not create another font family,
palette, service line, author block or photo treatment.

## Fixed roles

- H1/H2: `Cormorant Garamond`, semibold.
- Italic display accent: `Instrument Serif`.
- Paragraphs, service lines, metadata and controls: shared sans-serif role.
- Desktop introduction H2: at most `38px`.
- Desktop body: `19px / 1.68`; mobile body: `17px / 1.55`.
- Desktop service-line-to-H1 gap: `34px`; mobile: `20px`.
- A short desktop Hero with CTA keeps at least `24px` from H1 to lead,
  `28px` from lead to actions and `32px` from actions to author metadata.
  These are semantic group gaps, not spare pixels to remove merely to make the
  content fit.
- Primary split controls are at least `42px` high on desktop; short viewport
  mode must not turn them into miniature controls.
- Introduction prose measure: at most `660px`.
- Portrait: shared black-and-white asset, upper focal point, no decorative
  scaling that can crop the head.

## New article rule

Start from these primitives. Do not copy page-local Hero or introduction CSS
from an older article. Content sections may use their own layout only after the
shared introduction, and must continue the same heading/body roles. Every new
or changed route runs the repository responsive matrix before release. Passing
overflow and first-screen bounds is necessary but not sufficient: the rendered
candidate must also preserve the semantic gaps above and receive a visual
composition check at the shortest required desktop viewport.
