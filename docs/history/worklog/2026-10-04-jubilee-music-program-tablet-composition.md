# Jubilee music-program tablet composition — 2026-10-04

## Change

The live-music block on `/yubiley/` now follows the same responsive contract as both corporate pages. From `769px` through `1180px`, the show-reel poster sits on the left and the jubilee-specific explanatory copy sits on the right; the package cards remain below.

The poster frame uses the source `1200:843` ratio at mobile and tablet widths. The old tablet-only debug label from the stylesheet was also removed.

## Verification

- `npm run build`: passed.
- `git diff --check`: passed.
- In-app browser matrix: passed at `390x844`, `768x1024`, `769x1024`, `1180x820`, `1181x820` and `1440x900` with zero horizontal overflow.
- At `769x1024` and `1180x820`, poster-left/copy-right order and the source-like poster ratio were confirmed visually and through DOM geometry.
- The tablet debug pseudo-element is absent.
- The desktop workflow connector is constrained to its container, preventing the `1200px` SVG viewBox from creating horizontal overflow at the `1181px` boundary.

## Boundary

No Jubilee image or video asset changed. The page continues to reuse the optimized corporate AVIF/WebP poster; its media verdict remains `ready`.
