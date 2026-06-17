# 2026-06-17 - Fix white tail under /materials/ footer

## Context

Live `/materials/` desktop still showed a white tail under the orange footer block.

The root cause was not CTA spacing. The desktop-only override for `#rec862623921` clipped the footer record to `638px`, while the orange footer background element `1738906924130` continued roughly `208px` lower.

## Source

- file: `src/pages/materials.astro`
- record: `#rec862623921`
- element: `1738906924130`
- reference behavior: production homepage footer on `https://timurgromov.ru/`, where the footer record ends at the same bottom edge as the orange footer background

## What changed

- Changed the desktop `1200..1919` forced height for `#rec862623921`, `.t396__artboard`, `.t396__filter`, and `.t396__carrier` from `638px` to `846px`.

## Why

The previous fix solved the bottom symptom in the wrong way: it shortened the record instead of matching the record bottom to the real orange footer bottom.

With `846px`, `/materials/` now closes at the same visible footer edge as the orange background, following the same ending principle as the homepage.

## Verification

- `npm run build`
- Production Playwright measurement on `https://timurgromov.ru/materials/` before code edit:
  - footer record bottom: `3227.58`
  - orange footer bottom: `3435.44`
  - mismatch: about `208px`
- Simulated Playwright check with `846px` footer height:
  - footer record bottom: `3435.58`
  - orange footer bottom: `3435.44`
  - mismatch: less than `1px`
