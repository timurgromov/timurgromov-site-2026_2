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
