---
name: github-private-launch
description: Use when creating a new GitHub repository, deciding public/private visibility, preparing initial commit, pushing first project state, setting up branch defaults, or connecting deploy/CI for a new project.
---

# GitHub Private Launch

Use this skill when a new project is ready to become a real repository.

## Workflow

1. Inspect whether the project is already a git repository.
2. Check `.gitignore` before staging anything.
3. Scan for secrets and artifacts:
   - `.env`
   - tokens/passwords/keys
   - local DB
   - dumps/archives/screenshots
   - generated build outputs
4. Recommend repo visibility:
   - private by default for commercial/client/pre-release projects;
   - public only when the user explicitly wants public release or open source.
5. Create a small initial commit only after docs and startup commands are coherent.
6. Push `main` to GitHub.
7. If deploy is configured, connect the pushed commit to deploy flow.

## Acceptance

- No secrets are staged.
- Repo visibility decision is explicit.
- `main` exists and is pushed.
- README explains how to run/check the project.
- Final response includes commit hash and push status when applicable.
