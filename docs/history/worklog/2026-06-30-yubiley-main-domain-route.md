# 2026-06-30 - Jubilee Landing On Main Domain Route

## Context

The jubilee landing was first prepared as a standalone project, but the owner clarified that the SEO target must be the main domain path:

```text
https://timurgromov.ru/yubiley/
```

not a separate subdomain:

```text
yubiley.timurgromov.ru
```

## Changes

- Added the jubilee landing route to the main site:
  - `src/pages/yubiley/index.astro`
  - `src/pages/yubiley/contact/index.astro`
- Added scoped jubilee implementation files:
  - `src/yubiley/components/`
  - `src/yubiley/data/jubilee.ts`
  - `src/yubiley/layouts/JubileeLayout.astro`
- Added scoped static assets under `public/yubiley-assets/`.
- Updated jubilee canonical, OG image, contact page URL, structured data URL, and asset paths to `timurgromov.ru/yubiley/`.
- Added `https://timurgromov.ru/yubiley/` to `public/sitemap.xml`.
- Added decision `DEC-2026-06-30-JUBILEE-SEO-PATH`.

## Verification

- `npm run build` passed.
- Astro generated `/yubiley/index.html` and `/yubiley/contact/index.html`.
- Built HTML contains canonical `https://timurgromov.ru/yubiley/`.
- Local static smoke check returned 200 for `/yubiley/` and `/yubiley/contact/`.
- Commit `ba2a3fb` was pushed to `main`.
- GitHub Actions deploy run `28403965428` completed successfully.
- Production `https://timurgromov.ru/yubiley/` returned 200.
- Production `https://timurgromov.ru/yubiley/contact/` returned 200.
- Production HTML contains canonical `https://timurgromov.ru/yubiley/`.
- Production sitemap contains `https://timurgromov.ru/yubiley/`.
- Production CSS and hero image under `/yubiley-assets/` returned 200.

## Follow-up

- Disable/remove any accidental custom-domain configuration for `yubiley.timurgromov.ru` in the standalone repo if it was saved in GitHub UI.
- Replace or explicitly approve inherited B2B photos, videos, and thank-you letters before paid traffic.
