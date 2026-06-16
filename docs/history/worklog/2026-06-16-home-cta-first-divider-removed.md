# 2026-06-16 - Remove first CTA divider on homepage

## Context

On the homepage Telegram plan CTA, the top divider above the first list item (`01 Тайминг без лишней воды`) was visually too close and looked unnecessary.

## Change

- removed the top border from `.tg-plan-cta__item:first-child` in `src/pages/index.astro`;
- kept the remaining list dividers unchanged.

## Why

The user requested the same cleanup on the homepage as on the `/materials/` CTA: no line directly above the first item.

## Verification

- pending `npm run build`
- pending production check
