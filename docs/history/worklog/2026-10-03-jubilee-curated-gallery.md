# Jubilee curated event gallery — 2026-10-03

## Intent

Apply the approved current-photo curation to `/yubiley/`, not only to the two
corporate routes: lead with the new stage photograph, place the black-and-white
guest portrait third and alternate current portraits with documentary event
frames.

## Candidate

- Preserved the existing Jubilee `Gallery` component, 14-frame length,
  horizontal scroll, arrows and desktop lightbox.
- Added the three approved current photographs as responsive `640/1024`
  AVIF/WebP derivatives; original PNG files remain outside `public/`.
- Reordered the gallery to mix current and legacy event frames. Removed legacy
  `P3`, `P4` and `P13` from the rendered sequence because their stage/portrait
  roles are covered more clearly by the current images.
- Preserved the previously published guest-conversation image at position six.
- Corrected the responsive runner so its stylesheet-ready check ignores
  external stylesheets that the same runner intentionally blocks; runtime page
  behavior is unchanged.

## Local verification

- `npm run build` and `git diff --check`: passed.
- Strict media-budget audit: passed; added delivery files are `29–113 KiB`.
- Fresh in-app-browser review passed at `1440x900` and `390x844`: frames 1, 3
  and 8 have complete heads/hands and balanced `contain` framing; 14 items and
  horizontal overflow `0`.
- `npm run verify:responsive-layout`: passed `246` cases across `11` routes
  after the runner dead-wait fix.
- No form was submitted.

## Release

- Pending commit, push, Pages deployment and fresh production verification.
