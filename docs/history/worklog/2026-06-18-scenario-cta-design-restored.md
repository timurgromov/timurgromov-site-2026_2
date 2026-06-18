# 2026-06-18 - Scenario CTA design restored

## Context

The CTA unification task was intended for the homepage and webinar/materials page buttons only. The scenario article page has its own visual design and should not use the homepage split-button pattern.

## Changes

- Restored `/scenario/` CTA links to the article-specific `scenario-inline-cta__button` and `scenario-cta__button` markup.
- Removed the scenario-only `tg-tilda-cta` import, helper usage, SVG mask variable, and copied split-button CSS.
- Kept the homepage and `/materials/` CTA sizing fixes intact.

## Verification

- `npm run build`
- Confirmed `src/pages/scenario.astro` no longer contains `tildaCta`, `tg-tilda-cta`, `tg-plan-cta__button`, or `ctaArrowIcon`.
