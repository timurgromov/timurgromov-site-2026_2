# Indexing and HTTPS hardening

Date: 2026-10-27

## Production change

- GitHub Pages `Enforce HTTPS` is enabled for `timurgromov.ru`.
- The existing approved certificate covers `timurgromov.ru` and
  `www.timurgromov.ru`; the Pages source remains `gh-pages` at `/`.
- No source, page content, canonical, sitemap entry or legacy 404 route was
  changed on the main site.
- EventBudjet commit `e8925355` publishes a crawler rule for the POST-only
  technical path `/api/v1/site/metrika-attribution` without changing that API.

## Verification

- GitHub Pages API reports `https_enforced: true`, certificate `approved` and
  site status `built`.
- HTTP requests to apex and `www` return permanent `301` redirects to the apex
  HTTPS URL while preserving `/materials/` and its query string.
- The HTTPS destination returns `200`.
- `sitemap.xml` returns `200`; all seven listed production URLs return `200`.
- EventBudjet production serves the new robots rule. Its frontend and health
  endpoint return `200`; a safe GET to the attribution path returns the
  unchanged `405` and `Allow: POST`. No test lead or attribution was created.

Search Console validation was not started. Historical 404 exclusions were not
changed because no exact semantic replacements were identified.
