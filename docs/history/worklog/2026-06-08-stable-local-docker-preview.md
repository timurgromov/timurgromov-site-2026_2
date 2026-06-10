# 2026-06-08 Stable Local Docker Preview

## Context

There was repeated confusion between the permanent local Docker preview and temporary one-off `npm run preview` ports. The actual stable local site needed one fixed entry point.

## Changes

- Added explicit npm scripts for the Docker preview workflow:
  - `npm run docker:up`
  - `npm run docker:down`
  - `npm run docker:logs`
- Updated `docs/local-docker-preview.md` to mark `http://127.0.0.1:4323/` as the only permanent local URL.
- Documented that temporary ports like `4325` or `4326` are not the main local entry point.
- Updated `docs/history/CURRENT_STATE.md` to point to the stable Docker preview instead of an old preview port.

## Verification

- `npm run docker:up` completed successfully.
- `curl -I http://127.0.0.1:4323/` returned `HTTP/1.1 200 OK`.
- Container logs confirmed Astro preview is serving on port `4323`.

## Deploy

No deploy. This change is local workflow/documentation only.
