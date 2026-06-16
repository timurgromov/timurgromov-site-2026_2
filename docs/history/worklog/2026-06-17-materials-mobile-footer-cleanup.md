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

## Why

This keeps the shared Tilda footer record as the source of truth and fixes only the `/materials/` mobile patch layer. No footer redesign or record replacement was introduced.

## Verification

- `npm run build`
- `npm run verify:materials-baseline`
- Local in-app browser check on `http://127.0.0.1:4324/materials/` at `390x844`:
  - Meta disclaimer hidden;
  - footer background resolved to `rgb(250, 70, 4)`;
  - white bottom gap no longer visible.
