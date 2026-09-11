# CTA templates for expert pages

These names are an implementation contract, not a design brief. When the
owner says either phrase, use the exact source below; do not rebuild a similar
card, buttons or pop-up.

## «Большой CTA»

- Source: `src/site/expert-conversion.ts` → `renderExpertConversionContour`.
- It is the complete home-site conversion island: the four literal Tilda split
  controls, portrait in the homepage stencil, text phone number and the same
  consultation pop-up as the homepage.
- Required paths: Telegram materials, MAX materials, «Обсудить свадьбу»
  (opens the pop-up) and «Сайт ведущего».
- Required input: page `entrypoint`. The renderer emits the final-island
  source automatically; Telegram/MAX materials and the contact pop-up receive
  different, exact source codes.
- Mobile portrait rule: at `<=640px` the common horizontal stencil uses the
  dedicated top-safe crop `object-position: 62% 0%` for every entrypoint. Do
  not inherit or introduce a page/desktop crop on mobile: the full top of
  Timur's head must stay in frame. Desktop and tablet can retain only the
  existing route-specific crop where it serves their composition.

## Default rule for wedding articles

Every public wedding SEO or editorial article ends with exactly one «Большой
CTA» after all useful content and before the shared footer. This is the default
template rule, not a per-article design choice. A mid-article «Маленький CTA»
may be added for reading flow, but never replaces or duplicates the final
island. Exceptions require the owner's explicit decision for that route.

The `/articles/` hub is a catalogue, not an article, so it remains outside this
default. Other public page types are discussed per scenario.

## «Маленький CTA»

- Source: `src/components/ExpertMaterialsInlineCta.astro`.
- It is one compact white materials island: one copy line and exactly two
  literal Tilda split controls. Telegram is orange; MAX is light.
- Required input: `entrypoint`, `placement` and `copy`.
- It must not add portrait, phone, personal-contact controls or a second
  heavy conversion block. The page receives one big CTA at its end; small CTA
  placements are only reading-flow entries before it.

Example:

```astro
<ExpertMaterialsInlineCta
  entrypoint="scenario"
  placement="mid_article"
  copy="Хотите собрать свой вечер по этой логике? В Telegram или MAX можно получить калькулятор, пример сценария и план подготовки."
/>
```

## Source attribution is mandatory

The messenger provider and the CTA identity are different dimensions.
Telegram/MAX identifies the provider; the `start` payload identifies the
site, page, intent and exact CTA placement. The source format is:

```
site_<plan|meeting>_<site>__<page>__<placement>
```

This is a universal public-site rule: every Telegram/MAX bot or Mini App start
and every consultation-form submit must use its own structured source. A source
must name the real `intent`, `site`, `page` and `placement`; never use a raw
payload, a generic `site_plan` / `site_meeting`, or another page's code. The
provider remains a separate EventBudjet dimension, so the same page code is
used for Telegram and MAX while the admin shows which channel the visitor used.

For example, the compact reading CTA on `/scenario/` sends
`site_plan_timurgromov__scenario__mid_article`; the final conversion island
sends `site_plan_timurgromov__scenario__final` or
`site_meeting_timurgromov__scenario__final`.

Current expert routes use these final-island pairs:

| Route | Materials | Contact |
| --- | --- | --- |
| `/scenario/` | `site_plan_timurgromov__scenario__final` | `site_meeting_timurgromov__scenario__final` |
| `/materials/` | `site_plan_timurgromov__materials__final` | `site_meeting_timurgromov__materials__final` |
| `/articles/plan-podgotovki-k-svadbe/` | `site_plan_timurgromov__preparation_plan__final` | `site_meeting_timurgromov__preparation_plan__final` |
| `/articles/byudzhet-svadby-v-moskve/` | `site_plan_timurgromov__wedding_budget__final` | `site_meeting_timurgromov__wedding_budget__final` |

EventBudjet writes the payload to `leads.source`; the admin response exposes
both `source` and the human-readable `source_label`, while `entry_provider`
separately records Telegram or MAX. These existing paths are already distinct;
they must not be collapsed into one generic `site_plan` or `site_meeting`.

### Before publishing a new expert page

1. Add its exact entrypoint to `PublicSiteEntrypoint` and the conversion
   renderer, then use the literal templates. Pass only a placement from the
   contract (`mid_article` for the small CTA; the big CTA owns `final`). Do not
   type raw `start` payloads.
2. The common Metrika helper accepts the structured source and forwards it to
   EventBudjet. Telegram and MAX parse the same format; the admin derives a
   Russian source label even before a separate source-directory record exists.
3. For another public site, change the `site` token in the shared builder;
   preserve the `site__page__placement` separators. That creates a distinct
   CRM source without a new Telegram/MAX allow-list.
4. Verify a real messenger start only when authorised to create a test lead;
   confirm the resulting admin request shows the expected `source`,
   `source_label` and provider.

The live messenger step is intentionally not replaced by a source-code check:
it changes production lead data and needs explicit authorisation.
