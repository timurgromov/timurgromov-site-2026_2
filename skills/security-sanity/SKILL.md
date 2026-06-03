---
name: security-sanity
description: Use for lightweight security review of web apps, public APIs, admin areas, uploads, secrets, auth, rate limits, provider callbacks, runtime version endpoints, or before launch/deploy.
---

# Security Sanity

Use this skill for pragmatic security checks, not enterprise compliance.

## Checklist

1. Secrets:
   - no `.env`, tokens, keys, passwords in git;
   - `.env.example` contains names only.
2. Admin/auth:
   - `/admin` and `/api/admin/*` require auth;
   - no empty/default production admin token.
3. Public API:
   - no private lists or user data exposed without auth;
   - uploads/generation/payment endpoints have reasonable limits.
4. Provider callbacks:
   - verify signatures/tokens where applicable;
   - do not trust client-provided payment/provider status.
5. Runtime/debug:
   - `/api/version` does not expose secrets, full DSNs, private paths.
6. Files/uploads:
   - validate type/size;
   - avoid serving private uploads publicly unless intended.

## Acceptance

- Obvious public/admin leaks are checked.
- Secret handling is checked.
- Launch blockers are named.
- Security-relevant docs/tasks are updated.
