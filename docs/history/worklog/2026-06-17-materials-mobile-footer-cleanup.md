# 2026-06-17 - Clean up mobile footer on /materials/

## Context

After the recent `/materials/` footer shifts, the mobile footer showed three issues:

- the old `*Принадлежит Meta...` disclaimer was still visible;
- the top mobile footer texts sat too close to the upper edge of the orange block;
- a white tail appeared below the orange footer area on mobile.

## What changed

- In `src/pages/materials.astro`:
  - hid footer element `1738909098668` on `/materials/` together with its inner text node;
  - softened the mobile upward shift for the reused footer elements from `-280px` to `-262px`;
  - pushed the mobile contact/legal texts and icons slightly lower inside the footer;
  - forced the mobile `rec862623921` artboard/carrier/filter background to solid `#fa4604`, so the full mobile footer height stays orange without a white tail.
  - later tightened the same mobile footer geometry again after live review:
    - hard-fixed the mobile `rec862623921` record/artboard height to `660px`;
    - extended the orange footer block to `650px`;
    - moved the email line up slightly;
    - pulled `ИП / ОГРНИП / ИНН`, `Создание сайта`, and `©2025` much closer to the email block to remove the oversized empty gap.
  - added a desktop-only CTA hardening layer for `#materials-followup-cta`, reusing the existing `tg-tilda-cta` pattern but forcing both desktop buttons to stay visible as split-buttons (`display:inline-grid`, visible plate, visible arrow box) even if later cascade/viewport rules try to collapse them.

## Why

This keeps the shared Tilda footer record as the source of truth and fixes only the `/materials/` mobile patch layer. No footer redesign or record replacement was introduced.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`
- Local in-app browser check on `http://127.0.0.1:4324/materials/` at `390x844`:
  - Meta disclaimer hidden;
  - footer background resolved to `rgb(250, 70, 4)`;
  - white bottom gap no longer visible.
- Follow-up local in-app browser geometry check on `http://127.0.0.1:4324/materials/` at `390x844`:
  - computed mobile footer height became `660px`;
  - orange block height became `650px`;
  - gap between email and legal block reduced to `113px`;
  - bottom gap under `©2025` reduced to `34px`.
- Local in-app browser check on `http://127.0.0.1:4324/materials/` at `1911x1064`:
  - both desktop CTA buttons present;
  - each button width `318.5px`;
  - primary/secondary split-button layers (`plate` + `arrow box`) visible on both buttons.
