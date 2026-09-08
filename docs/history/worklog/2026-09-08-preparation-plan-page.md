# Open preparation-plan SEO page — 2026-09-08

## Released surface

- New public route: `/articles/plan-podgotovki-k-svadbe/`.
- The article hub now links to it and `public/sitemap.xml` includes the route.
- The page gives a direct answer and twelve preparation stages, then offers a
  voluntary continuation to existing materials or a discussion in Telegram/MAX.

## Attribution boundary

- The outbound messenger deep links keep the established `site_meeting_home`
  intent, avoiding a behavioural change to the bot flow.
- The site handoff records the exact landing path and CTA code. EventBudjet
  release `635090b` stores the bounded acquisition context on a CRM request;
  `0da565c` protects paid traffic from organic classification. No production
  test lead is created for this static-site release.

## Verification

- `npm run build` passed.
- `npm run verify:responsive-layout` passed after localhost preview permission:
  the site-wide matrix includes the new route.
- In-app browser check passed at `390x844`, `480x900`, `768x900`,
  `899x900`, `900x900`, `901x900`, `1180x820` and `1440x900`: document width
  equalled viewport width, page and primary CTA existed, and browser console
  had no errors.

## Explicit non-claims

- Telegram/MAX were not clicked through to a bot start: doing that would create
  a production visitor/lead. The link targets and tracking code were checked
  in the rendered page; a real messenger conversion remains a later,
  consented test.
