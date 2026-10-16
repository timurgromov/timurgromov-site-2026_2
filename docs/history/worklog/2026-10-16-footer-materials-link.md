# 2026-10-16 — Footer «Все материалы» destination

## Scope and cause

- The shared expert footer on `/materials/`, `/scenario/` and two wedding articles labeled its link «Все материалы» but pointed it to `/materials/`. That route is the Tilda materials/webinar page; `/articles/` is the published catalogue of all articles. On `/materials/`, the old link led back to the same page.
- Changed only the shared footer href from `${basePath}materials/` to `${basePath}articles/`. Link label, layout, other footer targets, CTA actions and article content are unchanged.

## Local verification

- `npm run verify:contacts` passed, including desktop and mobile footer checks.
- `npm run verify:materials-layout` passed, including the fragile materials CTA/footer geometry.
- `npm run verify:responsive-layout` passed 296 cases across 13 routes.
- Built HTML for all four pages using the shared footer has one «Все материалы» link to `/articles/`.
- A route-target scan of all 13 built HTML pages found 148 same-site links and no missing target files. Tilda popup and dynamic fragment links require interaction checks; they cannot be judged by static ID matching alone.
- Read-only HEAD probes of external destinations returned 200 for the corporate site, Dzen, Gorko/shortlink, Telegram public page, Instagram, YouTube, Komarova and Yandex. VK returned 418 to automated probes, so its browser behavior remains unconfirmed by that probe.

## Release and live link check

- Runtime/source commit `8c61fabb72bb20f03bb65b99e5f36202b2c98e8b` was pushed to `origin/main`; `gh-pages` commit `6361ff7` was built from it. GitHub Actions `Deploy to gh-pages` run `38951433184` and `Code health` run `38951433185` passed. `npm run verify:pages` confirmed the published `/materials/` footer has the new href and lacks the old one.
- Fresh production HTML on all four affected routes has exactly one «Все материалы» link to `/articles/`. In the in-app browser, clicking it from `/materials/` reached the article catalogue at desktop width and again at `390×844`; the mobile destination had no horizontal overflow or console errors. Footer links «Сценарий вечера» and «Свадебный ведущий» also opened their expected live pages.
- All 12 published same-site page routes returned HTTP 200. The footer's corporate, Dzen and reviews destinations returned HTTP 200; the reviews shortlink resolved to the Gorko rating page. The phone link has a `tel:` target; no call was placed. The Telegram footer redirect returned 307 to the named wedding bot with the expected start payload, and that bot appeared in an authorized Telegram search. A full bot conversation was not exercised.
- VK returned HTTP 418 to automated requests, and the browser safety policy rejected opening its page. No alternate browser path was attempted; VK usability remains `not_checked`. Static ID matching also cannot validate Tilda popup/scroll fragments, so those interactive flows are outside this link-target audit.
