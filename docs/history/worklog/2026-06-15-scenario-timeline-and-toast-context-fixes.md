# 2026-06-15 - Scenario timeline and toast context fixes

## Summary

- Tightened the wedding timeline on `/scenario/` and restored the original context for gifts, toasts, and welcome photos.

## Changes

- Shifted the timeline so `Welcome` is `16:00-16:30` and the ceremony/photos block is `16:30-17:00`.
- Reworked the `Welcome` guidance to mention that it is also the best time for guest photos because styling, bouquets, and first-event energy are already there.
- Replaced the vague gifts/toasts wording with a more practical explanation: how and when gifts are handed over, how close relatives and key guests are handled, and how special greetings or creative numbers are gathered in advance via invitation or group chat.
- Simplified the mid-article CTA wording by removing the softer `спокойно` phrasing.
- Kept the article self-sufficient and did not add a separate creative block, because the existing structure already covers the necessary flow.

## Verification

- `npm run build`
- `git diff --check`
- production marker check on `https://timurgromov.ru/scenario/`
