# 2026-06-16 - Bind /materials/ CTA contact buttons to homepage source-of-truth

## Context

The follow-up CTA on `/materials/` had local hardcoded Telegram/MAX URLs instead of reusing the same contact link constants as the homepage.

## Change

- imported `telegramContactUrl` and `maxContactUrl` from `src/site/home-data.ts`;
- removed duplicate local link constants from `src/pages/materials.astro`;
- kept CTA markup unchanged and only switched the source of `href`.

## Why

This keeps the webinar materials CTA aligned with the main page contact destinations and prevents future link drift between pages.

## Verification

- pending local build
- pending production HTML check
