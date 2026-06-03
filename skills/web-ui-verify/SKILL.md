---
name: web-ui-verify
description: Use when building or changing landing pages, websites, frontend apps, Telegram Mini Apps, funnels, mobile flows, responsive layouts, forms, UI copy, animations, or visual states that should be checked in a browser.
---

# Web UI Verify

Use this skill after meaningful frontend changes.

## Workflow

1. Start the existing dev server using the repo's command. Do not invent a new server flow if scripts already exist.
2. Open the local URL in a browser testing tool.
3. Check at least:
   - desktop viewport;
   - mobile viewport;
   - console errors;
   - first screen and primary flow;
   - forms/buttons/links;
   - loading, empty, error, success states when relevant;
   - text overflow in buttons/cards/nav;
   - important images/video/assets render.
4. Capture screenshots when layout changed or when verification is visual.
5. Fix obvious issues immediately and rerun the relevant check.

## Domain Defaults

- SaaS/admin tools: dense, calm, scan-friendly, workflow-first.
- Landing pages/funnels: real product/place/person signal in first viewport.
- Apps/tools/games: first screen should be usable experience, not a marketing page.
- Telegram Mini Apps: mobile-first, safe-area aware, fast first interaction.

## Acceptance

- No blocking console errors.
- Mobile and desktop are both usable.
- Primary CTA/flow works.
- No obvious text overlap or broken media.
- Final response includes what was checked and what remains unverified.
