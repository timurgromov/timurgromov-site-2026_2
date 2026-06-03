---
name: ci-git-hygiene
description: Use when GitHub Actions, CI checks, build pipelines, tests, PR checks, branch hygiene, changelog/update docs, commits, or push/release readiness need to be inspected or repaired.
---

# CI Git Hygiene

Use this skill for CI repair and clean delivery.

## Workflow

1. Inspect git state before changing anything.
2. Inspect untracked artifacts before staging anything.
3. Identify whether failures are local, CI-only, dependency, env, workflow, test, lint, typecheck, or deploy-related.
4. Read the failing workflow/check logs before editing.
5. Make the smallest fix that addresses the failure.
6. Run the closest local equivalent:
   - lint
   - typecheck
   - test
   - build
   - project `check-local`
7. Update docs/changelog only when behavior, setup, or commands changed.
8. Before commit:
   - review `git diff`;
   - remove temp artifacts;
   - avoid committing secrets, `.env`, dumps, screenshots, local DB.

## Commit Rule

Commit messages should describe behavior, not process.

Good:

```text
Fix frontend build env fallback
```

Avoid:

```text
Update files
```

## Acceptance

- Root cause is named.
- Local equivalent check passed or blocker is explicit.
- CI/workflow change is scoped.
- Final response includes commit/push/check status when applicable.
