# Jubilee current gallery photo — 2026-10-03

## Intent

Continue the approved current-photo rollout on `/yubiley/` by publishing the
selected guest-interaction portrait in the existing gallery.

## Candidate

- Replaced the first gallery position with the owner-approved `23423.png`.
- The original remains outside `public/`; responsive AVIF/WebP derivatives are
  served at `640px` and `1024px`.
- Existing gallery content, order after the first position, Hero, letters,
  packages, copy and forms remain unchanged.

## Local verification

- `npm run build` and `git diff --check`: passed.
- The complete responsive gate passed `246` cases across `11` routes.
- Strict media-budget audit: passed; delivery files are `27–73 KiB`.
- Fresh in-app-browser review passed at `390x844` and `1440x900`: the complete
  portrait remains visible, horizontal overflow and console errors are `0`.
- No form was submitted.
