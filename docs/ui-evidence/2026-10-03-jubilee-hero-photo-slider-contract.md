# UI change contract — Jubilee current-photo hero slider

- Change ID: `2026-10-03-jubilee-hero-photo-slider`.
- Surface: `/yubiley/`, hero media only.
- Canonical source: the approved corporate hero frame, styling and five-photo
  order.
- Baseline: one old square portrait.
- Requested visible change: the same five selected current photos and dissolve
  mechanic as both corporate routes.
- Exact target: `[data-hero-slider]`; deterministic frame:
  `?hero-slide=<data-slide-id>`.
- Expected signature: first frame is the smiling current portrait; the other
  frames rotate without moving the Jubilee H1, subtitle, tags or CTAs.
- Timing: `4500ms` first frame, `4000ms` other frames, `650ms` dissolve.
- Formats: responsive AVIF with WebP fallback, no original PNG in `public/`.
- Preserved invariants: Jubilee copy, CTA behavior, square hero geometry,
  videos, packages, music block, forms, analytics and the root homepage.
- Accessibility: pause in hidden tabs; reduced-motion mode keeps the sequence
  but changes frames without the opacity animation.
- Required viewports: `390x844`, `767/768/769x900`, `1023/1024/1025x820`,
  `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
