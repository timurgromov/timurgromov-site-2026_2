# 2026-06-15 - Scenario welcome context fixes

## Summary

- Restored the original context in the `Welcome` and early reception blocks on `/scenario/`.

## Changes

- Rewrote the warning about guests arriving too early so it matches the real wedding-flow logic: early arrivals wait, late arrivals are still late.
- Added the photography angle to the `Welcome` block so it explains why this window is the best moment for guest photos.
- Replaced the vague meeting reference in the congratulations/photos block with the actual sequence: after `Welcome`, when most guests have gathered and everyone still looks fresh.
- Changed the opening of the first banquet block to `не только для того, чтобы сразу всех развлечь`.
- Tightened the gifts, toasts, and engagement copy to sound more like Timur's own method and less like generic advice.

## Verification

- `npm run build`
- `git diff --check`
