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
- Required input: page `entrypoint`, so Telegram/MAX receive
  `site_plan_<entrypoint>` and the pop-up receives
  `site_meeting_<entrypoint>`.

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
  placement="scenario_mid_article"
  copy="Хотите собрать свой вечер по этой логике? В Telegram или MAX можно получить калькулятор, пример сценария и план подготовки."
/>
```

## Source attribution is mandatory

The messenger provider and the page are different dimensions. Telegram/MAX
identifies the provider; the `start` payload identifies the page and intent.
Current routes use their own pairs:

| Route | Materials | Contact |
| --- | --- | --- |
| `/scenario/` | `site_plan_scenario` | `site_meeting_scenario` |
| `/materials/` | `site_plan_materials` | `site_meeting_materials` |
| `/articles/plan-podgotovki-k-svadbe/` | `site_plan_preparation_plan` | `site_meeting_preparation_plan` |

EventBudjet writes the payload to `leads.source`; the admin response exposes
both `source` and the human-readable `source_label`, while `entry_provider`
separately records Telegram or MAX. These existing paths are already distinct;
they must not be collapsed into one generic `site_plan` or `site_meeting`.

### Before publishing a new expert page

1. Add its exact entrypoint to `PublicSiteEntrypoint` and use the two template
   components with it; do not reuse another page’s code.
2. Add `site_plan_<entrypoint>` and `site_meeting_<entrypoint>` to the public
   site Metrika source map.
3. Add both codes and Russian labels to EventBudjet `lead_sources`, then allow
   them in the Telegram and MAX start-payload validation lists.
4. Verify a real messenger start only when authorised to create a test lead;
   confirm the resulting admin request shows the expected `source`,
   `source_label` and provider.

The live messenger step is intentionally not replaced by a source-code check:
it changes production lead data and needs explicit authorisation.
