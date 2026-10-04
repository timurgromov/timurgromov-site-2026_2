# Jubilee music-program poster head-safe crop — 2026-10-04

## Change

The live-music poster on `/yubiley/` now uses the same top-anchored crop as the two corporate pages. The Jubilee stylesheet cache key was bumped, and the permanent responsive gate now checks that the poster keeps this focal point across the full route matrix.

## Verification

- `npm run build`: passed.
- `npm run verify:responsive-layout`: passed, 246 cases across 11 routes and the shared plus route-specific viewport matrix.
- `git diff --check`: passed.
- In-app browser visual review: passed at `390x844`, `768x1024`, `1180x820` and `1440x900`.
- Show-reel start: overlay disappears, native video controls remain and playback starts.

## Boundary

No Jubilee photo or video file changed. The page continues to reuse the optimized corporate AVIF/WebP poster and provider-hosted show-reel; only framing, the cache key and responsive regression coverage changed.
