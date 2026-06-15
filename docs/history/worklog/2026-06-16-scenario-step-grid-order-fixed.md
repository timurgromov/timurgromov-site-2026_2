# 2026-06-16 - Scenario step grid now reads row by row

## Summary

- Rebuilt the step map on `/scenario/` so the numbered items read left-to-right, top-to-bottom within each row.

## Changes

- Grouped the `Карта свадебного вечера` items into explicit rows of two steps each.
- Kept the numbering sequence intact while making the reading order visually unambiguous.
- Added a mobile breakpoint that collapses each row into a single column.

## Verification

- Pending: `npm run build`
- Pending: `git diff --check`
- Pending: production/live verification after deploy
