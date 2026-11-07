---
name: smart-vps-deploy
version: 1.0.0
source: Tamplates/skills/smart-vps-deploy/SKILL.md
description: Use when deploying or preparing a small web project on VPS/Docker, adding deploy scripts, fixing production release flow, adding deploy modes, health checks, runtime passport, or preventing manual one-off server patches.
---

# Smart VPS Deploy

Use this skill for reproducible VPS/Docker deploys.

## Source Preset

Use `DEPLOY_TEMPLATE.md` version `1.0.0` as the deploy preset. Preserve its
`Version:` and source identity in exact project copies; adapt project-specific
deploy files to the real stack instead of copying the preset blindly.

## Required Properties

- Deploy is tied to a git commit or build artifact.
- Production deploy refuses tracked dirty or unpushed candidate work. Classified non-runtime owner files may remain untracked only when the release is built from an exact commit/artifact that excludes them; conflict copies, secrets, and unknown runtime files fail closed.
- Secrets stay on the VPS/secret manager/local ignored files, never in git.
- Deploy modes are explicit:
  - `full`
  - `code`
  - `frontend`
  - `backend`
  - `data`
- Health checks prove the touched surface is live.
- Every independently deployed surface has a verifiable commit/build passport or immutable artifact identity. A backend runtime passport does not prove frontend.
- Pure docs/tests/local operator tooling ahead of live is non-runtime ahead and does not trigger a rebuild.
- SPA/frontend delivery checks prove JS/CSS/JSON are compressed and keep-alive/HTTP2 are not disabled.
- Ordinary deploys report comparable phase timings keyed by mode and commit:
  upload, build (or stable pull), checks and total. Warm-cache rebuilds of one
  commit are cache evidence, not proof of end-to-end release savings.

## Workflow

1. Inspect existing deploy files and production handoff.
2. Add or repair one deploy entrypoint, for example `scripts/deploy-production.sh`.
3. Add `docs/DEPLOY_HANDOFF.md` with non-secret host/protocol/checks.
4. Verify locally before deploy when feasible.
5. Compare the release branch with each live surface and classify changed paths. Unknown paths fail closed until the project maps them.
6. Deploy only surfaces with runtime drift; skip rebuild for confirmed docs/tests/operator-only changes.
7. Check frontend, backend `/health`, every touched surface passport, database/queue if relevant.
8. For SPA/frontend behind nginx/CDN, check a real JS/CSS asset with `curl --compressed -D -`: compression must be present and `Connection: close` must not be the normal delivery mode.
9. Record a baseline only against the same mode, artifact/image scope, host and
   check set. Treat historical logs without phase timing as `total_s` evidence
   only and do not double-count an inclusive remote phase.

## Acceptance

- Deploy is repeatable.
- No manual file patching on the server is required.
- Final status distinguishes release branch, origin, and live commits per surface.
- Final status says `Production deploy: да` or `Production deploy: нет` with the blocker.
- Timing output identifies mode and commit and separates upload, build/pull,
  checks and total; any speedup claim names the comparable baseline.
