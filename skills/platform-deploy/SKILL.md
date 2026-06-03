---
name: platform-deploy
description: Use when deploying or configuring Vercel, Railway, Fly.io, Render, GitHub Pages, Cloudflare Pages, Kubernetes, or other managed deployment platforms.
---

# Platform Deploy

Use this skill when deployment target is not the standard VPS/Docker flow.

## Workflow

1. Identify target platform and project structure.
2. Check official/current platform docs when behavior may have changed.
3. Define build command, output directory, runtime, env vars, domains, and previews.
4. Keep secrets in platform env/secret manager, not repo.
5. Add or update deployment docs:
   - `README.md`;
   - `docs/DEPLOY_HANDOFF.md`;
   - platform config files.
6. Verify deployed URL and the changed user/API flow.

## Acceptance

- Build/deploy commands are documented.
- Env vars are documented without secrets.
- Preview/production distinction is explicit.
- Final response includes deploy status and URL/checks.
