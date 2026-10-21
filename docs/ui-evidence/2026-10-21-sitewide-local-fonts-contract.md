# UI change contract — sitewide local fonts

- Change ID: `2026-10-21-sitewide-local-fonts`
- Requested visible change: страницы политики, согласия, оферты и остальные публичные маршруты используют утверждённые локальные шрифты сайта без перехода на Arial, Times или внешний CDN.
- Surface: основной контур `timurgromov.ru`; точные визуальные цели — `/privacy/`, `/consent/`, `/offer/`, representative `/`, `/materials/`, `/articles/`, `/scenario/` and `/404.html`. Отдельные корпоративные сайты и Jubilee-контур не изменяются.
- User state: public, unauthenticated; no forms submitted.
- Exact target: computed font families of legal-page H1/H2/body copy and local font loading through `document.fonts`.
- Action: hard reload each target route, wait for `document.fonts.ready`, inspect computed styles and rendered page.
- Baseline at 1280×720: `/privacy/` and `/consent/` H1/H2/body use Arial; `/offer/` headings use Arial and body uses Times New Roman; `document.fonts.check()` is false because the declared local faces are not used by these pages.
- Expected: legal H1/H2 use Coolvetica; body copy uses Manrope; all public routes can load same-origin Coolvetica and Manrope; editorial routes retain local Cormorant Garamond and Instrument Serif roles.
- Must remain unchanged: document text, route URLs, legal links, section order, page dimensions, Tilda Zero Block geometry, CTAs and forms.
- Required viewports: `390×844` and `1280×720` for all three legal routes; representative desktop/mobile checks for main, editorial and Jubilee surfaces; full responsive route matrix before release.
- Attempt number: 1.

Acceptance: candidate and fresh production pages expose the expected computed families, all required font files return successfully from the site origin, no horizontal overflow or console errors occur, and the responsive gate passes every public route.
