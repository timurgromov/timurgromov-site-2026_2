---
name: artifact-cleanup
description: Use before commits, deploys, handoffs, new project bootstrap, or when the repo may contain screenshots, dumps, local DBs, build outputs, debug files, secrets, temp scripts, or generated artifacts.
---

# Artifact Cleanup

Use this skill to keep repos clean before commit/deploy.

## Checklist

Look for and handle:

- `.env`, secrets, tokens, keys, passwords;
- `.DS_Store`;
- screenshots/crops/test images;
- logs;
- local DB files;
- SQL dumps;
- tar/zip archives;
- generated build outputs;
- debug files;
- one-off scripts;
- provider payload dumps.

## Workflow

1. Inspect `git status --short`.
2. Identify untracked and modified files.
3. Keep only files relevant to the current task.
4. Move local handoff/secrets to ignored `.local/` when needed.
5. Delete temporary artifacts only when they are clearly disposable.
6. Update `.gitignore` for recurring artifact classes.

## Acceptance

- No obvious artifacts are staged.
- No secrets are staged.
- `.gitignore` covers recurring local noise.
- Final status mentions cleanup if it affected delivery.
