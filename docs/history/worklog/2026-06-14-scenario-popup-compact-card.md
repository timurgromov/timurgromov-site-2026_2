# 2026-06-14 — Scenario popup compact card

## Context

After switching Hero CTA back to popup, the popup still used the old wide two-column form layout. With only one Telegram CTA this looked empty and stretched.

The lower scenario block also lost the more explanatory subtitle about evening structure and risk points.

## Changes

- Scenario popup changed to a compact one-column card.
- Popup CTA is orange by default.
- Lower scenario block subtitle restored to a richer explanation:
  - evening structure;
  - risk points;
  - questions to discuss with the host before contract;
  - Telegram bot step for receiving the material.

## Checks

- `npm run build` - passed.
- `git diff --check` - passed.
- Local browser preview - popup opens from Hero CTA, compact card is about 640px wide, CTA is orange.
- Pending: live GitHub Pages verification after push.
