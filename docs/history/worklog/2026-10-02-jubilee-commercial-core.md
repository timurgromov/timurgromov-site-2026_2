# Jubilee commercial core — 2026-10-02

## Intent

Transfer the approved commercial pattern from the corporate page to
`/yubiley/`, without turning the anniversary landing into a corporate page.

## Delivered scope

- Added the three anniversary packages: `Камерный`, `Праздничный`, and
  `С живой музыкой`.
- Added the third-package explanation: two vocalists, three 30-minute vocal
  sets, optional saxophone or guitar, and the cost logic versus a full
  instrument-based cover band.
- Reused the already published corporate photo and show-reel URL; no group
  name, contacts, source PDF, or duplicate media files were published here.
- Added a separate `Как проходит юбилей` section and kept `Порядок работы` as
  the client collaboration sequence.
- Kept the existing contact-popup modal as the destination of the new CTAs.

## Explicitly unchanged

- Hero, SEO metadata, public prices, lead form, analytics, the existing
  anniversary videos, the gallery, letters/archive, corporate landing, and
  Direct.

## Local verification

- `npm run build` passed.
- `npm run verify:contacts` and `npm run verify:responsive-layout` passed.
- Fresh local browser checks confirmed the package link, the contact-popup CTA,
  no horizontal overflow, and show-reel transition from poster/overlay to the
  native video-control state.

## Release

- Site commit `f6ed180` was pushed to `main`.
- GitHub `Code health` and `Deploy to gh-pages` completed successfully for
  that SHA.
- Fresh production checks confirmed `/yubiley/` returns the new package,
  music, anniversary-flow and workflow content. The unchanged root route
  `https://timurgromov.ru/` also returned its normal wedding landing.
