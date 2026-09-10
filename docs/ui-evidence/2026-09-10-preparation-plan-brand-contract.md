# UI change contract

- Change ID: `2026-09-10-preparation-plan-brand`
- Requested visible change: the preparation-plan page must visibly belong to the same Timur Gromov wedding-site system as `/scenario/`: a portrait-led author Hero, dark/photo/orange palette, and the same editorial typography rather than an unrelated beige SEO template.
- Surface: `/articles/plan-podgotovki-k-svadbe/`
- User state / fixture: public anonymous visitor; direct route load; no CTA click or messenger navigation.
- Exact target: `[data-testid="preparation-plan-hero"]`, its media layer, author metadata and the first content section.
- Action to reveal target: open the route directly at scroll position `0`.
- Reported CSS viewport: not supplied; the owner screenshot establishes a desktop comparison only. The verification anchor is `1180x820` and recorded browser `innerWidth/innerHeight` is authoritative.
- Affected breakpoints: `639/640/641` for the Hero/content stack and `1099/1100/1101` for the stage layout.
- Baseline visible signature: light peach background, text-only Hero, `Georgia` type, rounded “Начните сегодня” card, no author portrait or author metadata.
- Expected visible signature: black-and-white Timur portrait with dark layered overlay; `timurgromov.ru`, “Авторский материал — Тимур Громов”, title with orange italic emphasis and an author metadata row; the body uses the same warm neutral/orange editorial language as `/scenario/` without changing the plan content or conversion contour.
- Must remain unchanged: twelve stages and their anchors, article schema/canonical URL, final `renderExpertConversionContour`, consultation popup, CTA hrefs/source data, homepage and Direct-sensitive surface.
- Required viewports: `390x844`, `639x844`, `640x844`, `641x844`, `768x1024`, `1099x900`, `1100x900`, `1101x900`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt number for this exact target: `1`.

## Responsive layout contract

- Mobile: the portrait Hero stays legible with Timur’s face preserved on the right; author copy remains in the left/bottom readable dark area; all stage metadata precedes its text and no horizontal overflow is allowed.
- Tablet and desktop: the Hero remains a full author cover; each stage has one `280px` metadata column and one content column; the title, lead and author metadata form one left-aligned copy module.
- At `1100px` and below: stage columns intentionally collapse to one column and sticky metadata becomes static. At `640px` and below: Hero padding, media positioning and type scale use their mobile values.
- Preserved interaction: direct loading is the only required action; the existing final CTA and contact popup continue to use their established source-specific markup.

Acceptance: a freshly served candidate visibly differs from the baseline in the requested Hero and editorial system at every required mode, while the plan content and shared conversion contour remain present and usable.
