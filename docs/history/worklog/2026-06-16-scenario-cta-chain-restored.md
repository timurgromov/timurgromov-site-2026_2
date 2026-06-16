# 2026-06-16 - Scenario CTA chain restored after overwrite

## Summary

- Restored the intended CTA sequence on `/scenario/`: one compact mid-article CTA plus one final closing CTA.

## Changes

- Brought back the compact `scenario-inline-cta` block between the engagement section and the emotional peak.
- Removed the duplicate lower `Разобрать свою свадьбу` section that repeated the same meeting offer right before the final CTA.
- Kept the newer final CTA wording (`Встреча-знакомство`, `давайте познакомимся`, `30–50 минут...`) intact.
- Rounded the `Главная мысль` thesis block to match the rest of the page language.
- Cleaned leftover `scenario-card` references and added the tablet breakpoint for the restored inline CTA.

## Cause

- The duplicate/lost CTA state came from overlapping edits in the same large file: one pass removed the mid-CTA, later passes kept evolving the final CTA, and the older lower offer section stayed in place.

## Verification

- Pending: `npm run build`
- Pending: `git diff --check`
- Pending: production/live verification after deploy
