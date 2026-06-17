# 2026-06-17 - Add Playwright Dev Dependency

## Context

Desktop visual checks for `/materials/` needed Playwright, but the project did not include a local `playwright` package. Direct imports failed with `ERR_MODULE_NOT_FOUND`.

## Change

- Added `playwright` as a dev dependency in `package.json`.
- Updated `package-lock.json`.

## Verification

- `node --input-type=module -e 'import { chromium } from "playwright"; console.log(typeof chromium.launch)'` returns `function`.
