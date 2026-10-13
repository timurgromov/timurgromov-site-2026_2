# Wedding guide internal links — 2026-10-13

## Scope

- Add one ordinary contextual link to `/articles/` from `/materials/`.
- Add one ordinary contextual link to `/articles/` at the end of each current
  long-form wedding article.
- Preserve the homepage, Direct flow, primary CTA destinations, attribution,
  canonical metadata, sitemap and robots.

## Implementation

- `/materials/`: the existing post-webinar explanatory paragraph now points
  readers to the complete wedding guide.
- `/articles/plan-podgotovki-k-svadbe/`: a final related-materials note now
  points to the guide after the FAQ.
- `/articles/byudzhet-svadby-v-moskve/`: the existing next-step paragraph now
  also points to the guide.
- All three links use the visible anchor `свадебном гиде` and a crawlable
  ordinary `href="/articles/"`.

## Verification

- `npm run build` — passed.
- `npm run verify:materials-layout` — passed.
- `npm run verify:responsive-layout` — passed: 274 cases.
- Focused matrix at `390x844`, `1180x820`, `1280x720`, `1366x768`,
  `1440x900`, `1984x1046` — passed: 104 cases.
- Built HTML contains exactly one matching link on each target route.
- In-app browser at `390x844` and `1280x720` confirmed one non-zero rendered
  link per route, no horizontal overflow, no console errors and navigation to
  `/articles/`.
- UI evidence:
  `docs/ui-evidence/2026-10-13-wedding-guide-internal-links-evidence.json`.

## Release

Pending commit, push, GitHub Pages deployment and fresh production check.

No media or runtime assets were added.
