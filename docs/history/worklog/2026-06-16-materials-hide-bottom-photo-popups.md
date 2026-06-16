# 2026-06-16 - Hide leftover bottom photo popups on /materials/

## Context

On `/materials/`, the section between the lower advice videos and the footer still rendered extra photo-heavy Tilda records inherited from the main page popup stack. On this page they were visually redundant and interrupted the funnel before the footer.

## Change

- removed the `rec893...` popup-related records from `materialRecordIds` in `src/pages/materials.astro`;
- kept the visible lower advice video strip records intact;
- scoped the change to `/materials/` only, without touching the homepage record composition.

## Why

The user asked to remove the leftover photos on the webinar materials page while preserving the page structure and not redesigning the section.

## Verification

- pending local build
- pending live check after push
