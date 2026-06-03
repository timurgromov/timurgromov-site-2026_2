---
name: provider-integration
description: Use when integrating external providers, APIs, SDKs, Telegram, OpenAI, S3/Cloud.ru, payments, GitHub, Notion, webhooks, storage, email, auth, analytics, or any third-party service.
---

# Provider Integration

Use this skill before and during third-party integrations.

## Workflow

1. Identify provider, API surface, auth method, SDK/version, and environment variables.
2. Check current official docs before implementation when API behavior may have changed.
3. Update `.env.example` without secrets.
4. Define failure handling:
   - timeout;
   - retry policy;
   - rate limits;
   - webhook verification;
   - error states;
   - user/admin-facing diagnostics.
5. Avoid logging tokens, raw personal data, full provider payloads, or secrets.
6. Add smoke checks for the integrated surface.
7. Update `README.md`, `PROJECT_SPEC.md`, `TASKS.md`, and deploy docs when integration affects setup/runtime.

## Acceptance

- Env vars are documented.
- Secrets are not committed.
- Failure modes are handled or explicitly blocked.
- Official docs/source were checked for unstable APIs.
- Integration has a real smoke check.
