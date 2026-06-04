export const videoMediaBaseUrl = "https://media.89-22-227-133.sslip.io";

export const heroCloudDesktopVideoUrl =
  `${videoMediaBaseUrl}/hero_desc_RF28.mp4`;
export const heroCloudMobileVideoUrl =
  `${videoMediaBaseUrl}/hero_mob_RF28.mp4`;

const showreelPopupCloudVideoUrl =
  `${videoMediaBaseUrl}/morozovkaRF24.mp4`;

const adviceVideoUrls = {
  weddingLaughter: `${videoMediaBaseUrl}/tg26_advice_wedding_laughter_20260602.mp4`,
  awkwardToasts: `${videoMediaBaseUrl}/tg26_advice_awkward_toasts_20260602.mp4`,
  weddingChaos: `${videoMediaBaseUrl}/tg26_advice_wedding_chaos_20260602.mp4`,
} as const;

export const casePreviewVideoItems = [
  {
    shapeSelector: ".tn-elem__8623471761738859374619",
    src: `${videoMediaBaseUrl}/demo_komoRF28.mp4`,
  },
  {
    shapeSelector: ".tn-elem__8623471761738861518577",
    src: `${videoMediaBaseUrl}/demo_morozRF28_576.mp4`,
  },
  {
    shapeSelector: ".tn-elem__8623471761738862757939",
    src: `${videoMediaBaseUrl}/demo_toscanaRF28.mp4`,
  },
  {
    shapeSelector: ".tn-elem__8623471761738863568198",
    src: `${videoMediaBaseUrl}/demo_nemchRF28_576.mp4`,
  },
] as const;

export const cleanVideoPopupItems = [
  {
    hook: "#popup:showreel",
    title: "Ведущий Тимур Громов",
    src: showreelPopupCloudVideoUrl,
  },
  {
    hook: "#popup:ozero-komo",
    title: "Камерная свадьба на о. Комо",
    src: `${videoMediaBaseUrl}/KomoRF26.mp4`,
  },
  {
    hook: "#popup:morozovka",
    title: "Грандиозная свадьба в Морозовке",
    src: showreelPopupCloudVideoUrl,
  },
  {
    hook: "#popup:toskana",
    title: "Веселая свадьба в Тоскане",
    src: `${videoMediaBaseUrl}/ToscanaRF26.mp4`,
  },
  {
    hook: "#popup:kolizei",
    title: "Красивая свадьба в Колизее",
    src: `${videoMediaBaseUrl}/NemchinovkaRF28.mp4`,
  },
  {
    hook: "#popup:anton-i-kristina",
    title: "Антон и Кристина",
    src: `${videoMediaBaseUrl}/review_anton_kristina_RF.mp4`,
  },
  {
    hook: "#popup:temur-i-yana",
    title: "Темур и Яна",
    src: `${videoMediaBaseUrl}/review_temur_margo_RF.mp4`,
  },
  {
    hook: "#popup:katya-i-zhenia",
    title: "Катя и Женя",
    src: `${videoMediaBaseUrl}/review_katya_zhenya_RF.mp4`,
  },
  {
    hook: "#popup:russko-kubinskaya",
    title: "Антон и Лея",
    src: `${videoMediaBaseUrl}/review_russian_cuban_RF.mp4`,
  },
  {
    hook: "#popup:video-sovet-1",
    title: "Почему на моих свадьбах гости смеются, а не краснеют?",
    src: adviceVideoUrls.weddingLaughter,
  },
  {
    hook: "#popup:video-sovet-2",
    title: "Страшный момент на свадьбе? Как избежать неловких тостов",
    src: adviceVideoUrls.awkwardToasts,
  },
  {
    hook: "#popup:video-sovet-3",
    title: "Как ведущий спасает свадьбу от хаоса: неочевидные моменты",
    src: adviceVideoUrls.weddingChaos,
  },
] as const;

export const heroPosterVersion = "2306bab";

export const telegramContactUrl = "https://t.me/timurgromovv";
export const maxContactUrl =
  "https://max.ru/u/f9LHodD0cOIvnExDiltaWpLlPOHIr5y0qyb51SeYWFVvQJP5FUivyzS2fRM?clckid=c487e7dc";

export const pricePhotoPrimaryUrl =
  "images/tild3134-3130-4739-b462-666632633730______3iiwa_mnwni_1_2_.png";
export const pricePhotoTeamUrl =
  "images/tild3131-3339-4434-b133-363636653433____548_2.png";
export const pricePhotoContactUrl =
  "images/tild3835-6631-4561-a637-323435623332__y6mmbvcd9l8_1.png";

export const hiddenMarketingVideoAdviceRecordIds = [
  // Legacy Anex hero autoplay; replaced by a native background video layer.
  "rec861372811",
  // Webinar block and related popup. Temporarily moved off the sales landing page.
  "rec862714733",
  "rec905176327",
  "rec861962232",
  "rec862050095",
  "rec863346882",
  "rec862643056",
  "rec862643109",
  // Section anchor and title.
  "rec862713715",
  "rec862055949",
  // Video advice carousel and its ScrollBooster controller. Temporarily hidden for Direct traffic.
  "rec862301619",
  "rec862070380",
  // Legacy Tilda popup wrappers and contents for the visible advice videos.
  // The clean popup keeps these videos lazy and loads them only after a click.
  "rec892727590",
  "rec892727326",
  "rec892742671",
  "rec893263294",
  "rec892744252",
  "rec893264341",
  // Popup wrappers and popup contents for the advice videos.
  "rec893268511",
  "rec893268655",
  "rec893271079",
  "rec893271232",
  "rec893273557",
  "rec893273581",
  "rec893275111",
  "rec893275240",
  "rec893277967",
  "rec893278048",
  "rec893280313",
  "rec893281054",
  // Legacy Tilda showreel popups; clean-showreel-popup is the single active popup.
  "rec862614275",
  "rec862592933",
  // Legacy duplicate showreel popup.
  "rec862584405",
  // Legacy Tilda case video popups; clean-showreel-popup owns these hooks now.
  "rec862660772",
  "rec862660859",
  "rec862666264",
  "rec862666433",
  "rec862667392",
  "rec862667414",
  "rec862668031",
  "rec862668074",
  // Legacy Tilda review video popups; clean-showreel-popup owns these hooks now.
  "rec862674603",
  "rec862674662",
  "rec862683025",
  "rec862683069",
  "rec862685732",
  "rec862685694",
  "rec862687402",
  "rec862687388",
  // Legacy Annex case preview autoplay; replaced by native muted VPS demo loops.
  "rec862376352",
  "rec862385545",
  "rec862392569",
  "rec862397203",
] as const;

export const hiddenMarketingVideoAdviceElementIds = [
  // Menu items pointing to the hidden expert-content sections.
  "1739347764973",
  "1738924888789",
  "1738924888784",
  "1738924888793",
  "1738908837275",
] as const;

export const priceFormatsMarkup = `<div class="tg-price-formats">
  <article class="tg-price-format">
    <p class="tg-price-kicker">До 45 гостей</p>
    <h3>Камерная свадьба</h3>
    <p class="tg-price-offer">Ведущий + DJ</p>
    <p class="tg-price-meta">5 часов программы</p>
    <strong class="tg-price-number">115 000 ₽</strong>
    <p class="tg-price-meta">Дополнительный час — 15 000 ₽</p>
    <p class="tg-price-note">Для уютных свадеб с самыми близкими, где важна теплая атмосфера и внимание к каждому гостю.</p>
    <p class="tg-price-under"><button class="tg-price-includes-link" type="button" data-price-tab-target="includes">что входит в работу</button></p>
  </article>
  <article class="tg-price-format">
    <p class="tg-price-kicker">Более 45 гостей</p>
    <h3>Классическая свадьба</h3>
    <p class="tg-price-offer">Ведущий + DJ</p>
    <p class="tg-price-meta">6 часов программы</p>
    <strong class="tg-price-number">145 000 ₽</strong>
    <p class="tg-price-meta">Дополнительный час — 20 000 ₽</p>
    <p class="tg-price-note">Для свадеб с большим количеством гостей, насыщенной программой и более активной динамикой вечера.</p>
    <p class="tg-price-under"><button class="tg-price-includes-link" type="button" data-price-tab-target="includes">что входит в работу</button></p>
  </article>
</div>`;

export const priceValueMarkup = `<ul class="tg-price-value-list">
  <li>Выстраиваю тайминг вечера, чтобы он работал в реальности, а не на бумаге</li>
  <li>Координирую программу с площадкой и всеми подрядчиками</li>
  <li>Выстраиваю программу, чтобы важные моменты не терялись в хаосе и скучных тостах</li>
  <li>Контролирую техническую готовность площадки: звук, свет, рассадку и логистику</li>
  <li>Помогаю собрать свадебную команду из проверенной базы подрядчиков</li>
  <li>Подсказываю, как избежать частых ошибок</li>
</ul>`;

export const priceFineprintMarkup = ``;

export const priceConsultationMarkup =
  `На встрече разберем масштаб свадьбы, подберем подходящий формат и честно обсудим, что понадобится именно вашей площадке. Встреча бесплатная и ни к чему не обязывает.`;

export const priceTextReplacements = [
  ["rec862317152", "1738854720285", "Два формата под ключ"],
  ["rec862317152", "1738854720290", priceFormatsMarkup],
  ["rec862334119", "1738854720285", "Что входит в работу"],
  ["rec862334119", "1738854720290", priceValueMarkup],
  ["rec862334119", "1738855581124", priceFineprintMarkup],
  ["rec862336377", "1738854720285", "Бесплатная консультация"],
  ["rec862336377", "1738854720290", priceConsultationMarkup],
  ["rec862336377", "1738855821506", "Написать в MAX"],
] as const;

export const priceLegacyElementRemovals = [
  ["rec862317152", "1738854964490"],
  ["rec862317152", "1738855086828"],
  ["rec862317152", "1738855153779"],
  ["rec862317152", "1738855283679"],
  ["rec862317152", "1738855283674"],
  ["rec862334119", "1738855283679"],
] as const;
