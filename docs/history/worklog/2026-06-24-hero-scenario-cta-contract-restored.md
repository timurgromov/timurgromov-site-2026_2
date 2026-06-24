# 2026-06-24 - Hero scenario CTA contract restored

## Context

Owner found a production regression: the hero CTA still said `получить сценарий свадьбы`, but its click-layer opened the direct-contact bot entry `site_meeting`. That broke the funnel contract because scenario CTAs and direct-contact CTAs are different intents.

## Decision

Site and bot copy must stay separated by CTA intent:

- `Получить сценарий свадьбы` and other scenario/material CTAs go only to `site_plan`;
- direct-contact CTAs go only to `site_meeting`;
- the direct-contact message `Напишите сообщение прямо здесь...` must never appear on the scenario entry.

## Changes

- In `src/pages/index.astro`, pinned the existing hero click-layer `rec861352716` / `1738735136250` to `telegramPlanUrl`.
- Extended `scripts/check-contact-layout.mjs` so `npm run verify:contacts` now also asserts that the hero scenario CTA still points to `start=site_plan` and never to `start=site_meeting`.
- Updated funnel docs and project memory to make the per-button contract explicit.

## Verification

- `npm run build` passed.
- `npm run verify:contacts` passed and now also confirms the hero scenario CTA stays on `site_plan` across desktop and mobile viewports.
- Static built HTML check passed: hero click-layer `1738735136250` contains `start=site_plan`, while public contact shortcuts still contain `start=site_meeting`, and personal `t.me/timurgromovv` is absent.
