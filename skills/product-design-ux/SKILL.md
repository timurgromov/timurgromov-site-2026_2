---
name: product-design-ux
description: Use when designing or improving UX, visual direction, landing pages, funnels, Telegram Mini Apps, onboarding flows, dashboards, SaaS/admin tools, conversion pages, mobile-first interfaces, or before major frontend implementation.
---

# Product Design UX

Use this skill before meaningful UI/frontend work, not only after implementation.

## Workflow

1. Identify the product type:
   - landing/funnel;
   - Telegram Mini App;
   - SaaS/admin/dashboard;
   - content/portfolio/site;
   - game/interactive tool.
2. Define the primary user and one primary flow.
3. Write or update `UX.md` before building:
   - screens;
   - states;
   - primary CTA;
   - mobile/desktop behavior;
   - copy that affects conversion or clarity.
4. Choose visual direction based on domain:
   - SaaS/admin: dense, calm, scan-friendly, workflow-first.
   - Landing/funnel: clear offer, trust signals, first-viewport product/person/place signal.
   - TMA/mobile: mobile-first, safe areas, fast first action, no cramped controls.
5. Avoid decoration that does not support the flow.
6. After implementation, hand off to `web-ui-verify` for browser/mobile screenshot checks.

## Acceptance

- `UX.md` exists or is updated for the changed flow.
- First screen supports the actual user task.
- Primary CTA is visible and unambiguous.
- Mobile layout is not an afterthought.
- Copy, layout, and states match the product goal.
