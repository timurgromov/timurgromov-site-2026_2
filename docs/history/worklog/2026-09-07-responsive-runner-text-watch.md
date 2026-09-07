# Responsive runner text-watch contract

Date: 2026-09-07
Scope: responsive QA tooling only; no public UI, source layout or deploy configuration changed.

## Change

`scripts/check-responsive-layout.mjs` now accepts repeatable
`--watch-text-selector <css-selector>` arguments (also forwarded by
`scripts/verify-responsive-layout.mjs`). For every route and viewport it
reports whether the selector exists plus computed and effective rendered font
size, rendered width/height, line count and `white-space`.

Effective font is computed from the label's computed font size multiplied by
all ancestor `zoom` and 2D transform scales. This prevents a Tilda/Zero Block
ancestor scale from being mistaken for unchanged typography.

## Verification

- `npm run verify:responsive-layout`: PASS (build plus the existing complete
  responsive matrix).
- Direct one-viewport smoke run with the homepage CTA label selector: PASS on
  `390x844`; the label was found with `computedFontPx=14`,
  `effectiveFontPx=14`, `renderedWidth=183.98`, `lineCount=1`.
- Canonical portable `responsive-qa-gate` dry-run passed with an exact
  `1180x820` viewport and `B-1/B/B+1` probes for 768 and 1024.

## Follow-up use

When a reported CTA or text control is susceptible to ancestor `zoom` or
`transform`, invoke the repository gate with a stable text selector and turn
its expected effective font/range, rendered geometry and wrap state into the
route-specific assertion. A watched selector alone records facts; it does not
invent a universal target font size.
