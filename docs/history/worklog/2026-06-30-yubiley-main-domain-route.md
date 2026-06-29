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

## Remaining

- Commit and push to `main`.
- Wait for GitHub Actions `deploy-gh-pages`.
- Live-check `https://timurgromov.ru/yubiley/`.
- Disable/remove any accidental custom-domain configuration for `yubiley.timurgromov.ru` in the standalone repo if it was saved in GitHub UI.
