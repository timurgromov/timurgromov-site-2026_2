# 2026-10-16 — Local fonts for the public site

## Layout contract and baseline

- Scope: all routes in the public-site repository that use the Tilda export or shared expert conversion section. The reported state is `/materials/` at `1280×744` CSS pixels, DPR 2, with the same missing headline font on `/` at `1247×583`.
- Preserve: Tilda record positions, card sizes, text, media, CTA actions, desktop/mobile modes and existing breakpoint geometry. Change the font source only; do not compensate with spacing overrides.
- Expected: `Coolvetica` and `Manrope` load from this site's own origin. At the reported viewport, the webinar headline keeps its intended line structure and does not overlap itself or the three columns below. No horizontal overflow.
- Required probes: `390×844`, `639/640/641`, `1199/1200/1201`, `1280×744`, `1366×768`, `1440×900`, `1919/1920/1921`, `1984×1046`. Check page console and font loading after a hard reload.
- Before: live `/materials/` at `1280×744` had `document.fonts.check('16px Coolvetica') === false`; the first headline element wrapped to `139px` height while the next headline line began about `68px` lower. The cards began at `y=337px` while the last line of the title extended to `y=379px`. Live `/` also reported `Coolvetica === false`.

## Root cause

The Tilda CSS points two `Coolvetica` faces at `static.tildacdn.com`. Direct font requests from this environment were intermittent (timeout on the host used by the browser). The shared expert section points `Manrope-Regular.woff` to a Tilda URL that now returns HTTP 404. Browser fallback to Arial changes text widths inside absolutely positioned Zero Blocks.

## Change and verification

- Copied the original Tilda-hosted Coolvetica Condensed and Denistina WOFF files into `public/fonts/`; all four Tilda page CSS files now load them with relative same-origin URLs.
- Replaced the broken Tilda Manrope URL with the official Google Fonts Manrope variable font, hosted in `public/fonts/` with its OFL license. `BaseLayout` and the expert conversion section use the same local files. Removed the redundant external Google Fonts link from the home and materials export heads.
- Replaced the editorial Google Fonts import with local Cormorant Garamond and Instrument Serif files and their OFL licenses. The CSS bundle owns those URLs so the GitHub Pages base path is preserved.
- `npm run build` passed. The built output contains all six font binaries and no references to the old Tilda font URLs or `fonts.googleapis.com`.
- `npm run verify:materials-layout` passed on `1200×900`, `1440×900`, `1911×1064` and `390×844`. `npm run verify:responsive-layout` passed 296 cases across 13 routes; the gate now explicitly checks local font faces and non-overlapping materials title at `1280×744`.
- Live local browser observation after hard reload: `/materials/` at `1280×744` shows three separate Coolvetica title lines above the video/cards, all three font faces loaded, no horizontal overflow or console errors. Additional visual checks passed at `390×844`, `1440×900` and `1984×1046`; `/` and `/articles/` were also visually checked at `390×844` with no console errors.
- A read-only look at `corp.timurgromov.ru` showed an Inter/system font CSS stack and no matching Tilda/Google font dependency in its public stylesheet. No corporate site code was changed.

## Release

- Site runtime commit `e474ce2c722d4d020a54c461510489a05dc0270d` was pushed to `origin/main`. `Deploy to gh-pages` run `38947916666` and `Code health` run `38947916557` both passed; the published `gh-pages` commit is `d9e5d54`.
- Fresh production `/materials/` and `/` browser reloads loaded Coolvetica and Manrope with no horizontal overflow or console errors. The materials title has distinct lines above the cards. Production `/articles/` loaded Cormorant Garamond and italic Instrument Serif, with no overflow or console errors.
- Production font URLs `/fonts/coolvetica-condensed.woff`, `/fonts/denistina.woff` and `/fonts/manrope-variable.ttf` each returned HTTP 200 with the expected byte count. `npm run verify:pages` passed against the published site runtime.
