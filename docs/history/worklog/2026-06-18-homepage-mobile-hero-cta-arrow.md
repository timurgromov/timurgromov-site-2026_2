# 2026-06-18 - Homepage Mobile Hero CTA Arrow

## Context

On the homepage mobile hero, the first-screen CTA showed only the orange text plate. The separate Tilda arrow-square layer was positioned offscreen, so Safari/mobile users saw an empty left plate without the expected arrow block.

## Change

- Scoped the fix to the homepage hero record `rec861352716`.
- Repositioned the mobile-only Tilda layers:
  - arrow square: `1738733061526`
  - arrow image: `1738733186214`
- Kept the scenario article CTA untouched.

## Verification

- `npm run build`
- Local Playwright mobile geometry check at `375`, `390`, `393`, and `414` CSS px.
- Local screenshot: `/tmp/hero-cta-local-final.png`.
