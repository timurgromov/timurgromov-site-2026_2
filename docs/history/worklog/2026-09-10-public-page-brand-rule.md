# Public-page brand rule — 2026-09-10

## Decision

Every new public page extends the approved site system. Wedding expert and SEO
pages use `/scenario/` as their canonical visual source; they must not start
from a generic SEO template or invent a page-local palette, typography or CTA
language.

## Persistence

- `AGENTS.md` now contains the always-relevant public-page rule.
- `.cursor/rules/public-page-brand-system.mdc` applies it to Astro routes.
- `UX.md` records that the wedding-editorial system is the default for future
  wedding content pages, not a one-off exception.
- The wedding-budget article contract names `/scenario/` before implementation.

## Scope

This rule changes future authoring guidance only. Existing routes are not
redesigned by this documentation change.
