# 2026-06-18 - Homepage Mobile Hero CTA Arrow

## Context

On the homepage mobile hero, the first-screen CTA must match the existing desktop Tilda split-button pattern: one text plate plus a separate square arrow block. The first mobile fix brought the arrow on screen, but overlapped the square too far into the plate, making the CTA read as one solid button.

## Change

- Scoped the fix to the homepage hero record `rec861352716`.
- Repositioned the mobile-only Tilda layers:
  - arrow square: `1738733061526`
  - arrow image: `1738733186214`
- Adjusted the mobile text layer and transparent click layer so the label stays clear of the square and the full split button is clickable.
- Kept the scenario article CTA untouched.

## Verification

- `npm run build`
- Local Playwright mobile geometry check at `375`, `390`, `393`, and `414` CSS px.
- Local screenshot: `/tmp/hero-cta-mobile-split-local.png`.
