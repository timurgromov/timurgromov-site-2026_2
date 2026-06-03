---
name: smart-vps-deploy
description: Use when deploying or preparing a small web project on VPS/Docker, adding deploy scripts, fixing production release flow, adding deploy modes, health checks, runtime passport, or preventing manual one-off server patches.
---

# Smart VPS Deploy

Use this skill for reproducible VPS/Docker deploys.

## Source Preset

Use `DEPLOY_TEMPLATE.md` as the deploy preset. Adapt it to the project's stack instead of copying it blindly.

## Required Properties

- Deploy is tied to a git commit or build artifact.
- Production deploy refuses dirty or unpushed work unless explicitly designed otherwise.
- Secrets stay on the VPS/secret manager/local ignored files, never in git.
- Deploy modes are explicit:
  - `full`
  - `code`
  - `frontend`
  - `backend`
  - `data`
- Health checks prove the touched surface is live.
- Runtime passport proves the deployed commit/runtime when backend exists.

## Workflow

1. Inspect existing deploy files and production handoff.
2. Add or repair one deploy entrypoint, for example `scripts/deploy-production.sh`.
3. Add `docs/DEPLOY_HANDOFF.md` with non-secret host/protocol/checks.
4. Verify locally before deploy when feasible.
5. Deploy only the intended surface.
6. Check frontend, backend `/health`, runtime passport, database/queue if relevant.

## Acceptance

- Deploy is repeatable.
- No manual file patching on the server is required.
- Final status says `Production deploy: да` or `Production deploy: нет` with the blocker.
