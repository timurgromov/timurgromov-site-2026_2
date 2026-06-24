# 2026-06-24 - Scenario inline CTA note centered

## Context

Owner reported that on `/scenario/` the note under the first `Обсудить вашу свадьбу` button in the `Короткая встреча` block was visually starting from the left edge instead of sitting directly under the button.

## Changes

- In `src/pages/scenario.astro`, changed `.scenario-inline-cta__actions` from left-aligned to centered stacking.
- Added centered text alignment for `.scenario-inline-cta__note` so the duration line stays on the same axis as the CTA button.

## Verification

- `ASTRO_TELEMETRY_DISABLED=1 npm run build`
