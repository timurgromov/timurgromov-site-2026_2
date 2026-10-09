# Jubilee shared pricing UX

Date: 2026-10-09

`/yubiley/` now uses the same pricing and contact interaction pattern as the two corporate routes. One date action controls three compact cards; every card shows the extension rate beside the main price and keeps its package details in an internal disclosure. The selected date is copied into the confirmed callback form.

Approved public prices are 135 000 ₽ / 5 hours with 20 000 ₽ extension, 155 000 ₽ / 6 hours with 25 000 ₽ extension, and from 315 000 ₽ for the third package. The last total combines the 155 000 ₽ host/DJ base with a cover group from 160 000 ₽; venue-dependent technical rider costs remain separate.

The contact panel now uses the simple `ТИМУР ГРОМОВ` eyebrow and the site copy reads `Праздники проходят, впечатления остаются.`

Release:

- runtime source: `1c8a951` on `origin/main`;
- production: `7e21241` on `origin/gh-pages` after successful Deploy to gh-pages and Code health runs;
- checks: build, `verify:jubilee-pricing`, `verify:contacts`, JavaScript syntax, focused responsive matrix and fresh live mobile/desktop review;
- no production callback, bot start or phone action was submitted.
