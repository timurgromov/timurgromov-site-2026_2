# 2026-08-03 - Single Pages deploy and code health

## Context

Repository contained two workflows triggered by every push to `main`: one
published an Actions artifact through `actions/deploy-pages`, while the other
built Astro and pushed `dist/` to `gh-pages`.

Live GitHub checks confirmed that both workflows were running. GitHub Pages is
configured as `Deploy from a branch`, source `gh-pages` `/`, matching the
documented project workflow.

## Changes

- Removed the parallel artifact-based `.github/workflows/deploy.yml`.
- Kept `.github/workflows/deploy-gh-pages.yml` as the only production deploy.
- Added `.github/workflows/code-health.yml` for `npm ci` plus production Astro
  build on pull requests and runtime-relevant pushes to `main`.
- Kept code health read-only, bounded to 10 minutes and free of deploy,
  production secrets, providers and runtime mutations.
- Updated project rules, deploy documentation, current state and decision log.

## Verification

- GitHub Pages API: `build_type=legacy`, source `gh-pages` `/`.
- Local equivalent: `ASTRO_TELEMETRY_DISABLED=1 npm run build`.
- Workflow scope reviewed: PR/main triggers, docs-only ignore, concurrency
  cancellation, read-only permissions and bounded timeout.

## Result

Production has one explicit deploy path, while pull requests receive an
economical build gate that cannot publish the site.
