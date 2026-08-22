# Existing Design Reuse Rule

Это обязательный contract для заметных визуальных изменений. Он вынесен из root
`AGENTS.md`, чтобы root оставался router; перед UI-работой прочитай его целиком.

- Новый блок не нужно дизайнить заново: сначала найди такой же или максимально
  близкий паттерн в существующем коде и переиспользуй именно его markup/CSS/classes.
- Canonical CTA source: `src/site/tilda-cta.ts` (`tildaCtaInner`, `tildaCtaLink`,
  `tildaCtaButton`) и `.tg-tilda-cta` / `.tg-plan-cta__button` /
  `.tg-consultation-cta__button` в `src/pages/index.astro` и
  `src/pages/materials.astro`.
- CTA — split-button: левая скруглённая плашка, отдельный правый квадрат со
  стрелкой и общий кликовый слой. Одна rounded-кнопка со стрелкой внутри неверна.
- Для Tilda Zero hero CTA на главной двигай только слои `rec861352716`; не
  создавай replacement-компонент.
- Формулировки «как на сайте», «в том же стиле», «возьми готовое», «не заново»
  означают literal copy-first: сначала копируй паттерн целиком, затем меняй
  только copy, ссылки, IDs и минимальную геометрию.
- Для horizontal scroll, slider, swipe row, CTA/popup/hover/sticky/mobile
  overflow сначала найди и перенеси существующую механику, не собирай аналог.
- Порядок: найти source → зафиксировать файл/record/function/classes →
  скопировать markup/classes/CSS variables/breakpoints/assets/hover/helpers/state
  → изменить только контент/ссылки/IDs/минимальную геометрию → чинить cascade,
  Tilda, basePath или parser cause, а не рисовать похожий блок.
- Не меняй шрифты, композицию кнопок, скругления, hover и ритм без прямого
  запроса. В первом рабочем апдейте назови `Источник: <file/record/helper/class>`.
- Если найден рабочий аналог, нельзя переключаться на fallback «с нуля». При
  двух аналогах выбери один canonical source; для mobile сначала проверь готовый
  mobile pattern на главной.
- Запрещено брать только цвета/шрифты и собирать похожий элемент: это redesign.
  Если точного аналога нет, остановись и запроси отдельное согласование.
