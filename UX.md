# UX — единый контур конверсии экспертных страниц

Updated: 2026-09-08

## Job and flow

- Product type: expert-content landing inside the public wedding-host site.
- Primary user: пара на этапе подготовки или выбора ведущего, пришедшая на
  экспертную страницу из поиска или по прямой ссылке.
- Primary job: получить полезный следующий шаг либо отдельно договориться о
  бесплатной встрече без смешения этих намерений.
- Primary flow: экспертный ответ → полезный CTA (`site_plan_<page>`) →
  Telegram/MAX material flow **или** отдельный contact CTA
  (`site_meeting_<page>`) → личная встреча.
- The two Telegram/MAX options in each CTA are visually equal. Phone is an
  additional contact option only in the meeting flow.
- Shared routes: `/scenario/`, `/materials/`,
  `/articles/plan-podgotovki-k-svadbe/`. The homepage and its Direct flow are
  outside this contour.

## Page states and responsive contract

- Public state only: no lead is created until a person actually opens a
  messenger deep link. No production test leads are created during QA.
- Each page renders one shared `expert-conversion` module: useful CTA, meeting
  CTA, Timur author card with photo, then the unified footer (materials,
  services, Dzen, reviews, contacts).
- Desktop/wide: CTA cards are two columns; tablet at `900px` and below becomes
  one column; mobile at `640px` and below has 16px gutters and full-width
  split buttons. Footer switches from four columns to two, then one.
- Required checks: `390x844`, `640/641`, `900/901`, `1180x820`, `1366x768`,
  `1440x900`, `1984x1046`; no horizontal overflow and no clipped button text.
- Preserved invariants: homepage, Direct CTA/protection and the useful page
  content above the shared contour are untouched.

## Visible release target

The contour is visible after the useful page content. It makes the two outcomes
explicit: receive a material or book a meeting. The author card and footer
remain consistent across all three expert pages.
