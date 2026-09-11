import { getTildaCtaArrowIconUrl, tildaCtaLink } from "./tilda-cta";

export type ExpertConversionEntrypoint = "scenario" | "materials" | "preparation_plan" | "wedding_budget";

interface ExpertConversionContourOptions {
  basePath: string;
  entrypoint: ExpertConversionEntrypoint;
  telegramPlanUrl: string;
  maxPlanUrl: string;
  telegramMeetingUrl: string;
  maxMeetingUrl: string;
  planSource: string;
}

const pagePhotoClasses: Record<ExpertConversionEntrypoint, string> = {
  scenario: "tg-plan-cta__photo--scenario",
  materials: "tg-plan-cta__photo--materials",
  preparation_plan: "tg-plan-cta__photo--preparation-plan",
  wedding_budget: "tg-plan-cta__photo--wedding-budget",
};

// The public home page owns the visual language. This renderer deliberately
// uses the same `tg-plan-cta` and `tg-plan-cta__button` markup/classes rather
// than a second expert-page button design. The only route-level variable is
// the portrait crop, because each article ends at a different visual rhythm.
export const renderExpertConversionContour = ({
  basePath,
  entrypoint,
  telegramPlanUrl,
  maxPlanUrl,
  telegramMeetingUrl,
  maxMeetingUrl,
  planSource,
}: ExpertConversionContourOptions) => {
  const arrowUrl = getTildaCtaArrowIconUrl(basePath);
  const portraitAvifUrl = `${basePath}images/timur-calculator-contact-portrait.avif`;
  const portraitWebpUrl = `${basePath}images/timur-calculator-contact-portrait.webp`;
  // This is the transparent image stencil from the home-page price section
  // ("Честно о ценах"). Keeping its alpha shape means the SEO CTA is an
  // actual extension of the home page rather than a new rounded rectangle.
  const homePhotoMaskUrl = `${basePath}images/tild3134-3130-4739-b462-666632633730______3iiwa_mnwni_1_2_.png`;
  const safeAttrs = 'target="_blank" rel="noopener noreferrer nofollow"';
  const photoClass = pagePhotoClasses[entrypoint];

  return `<section class="expert-conversion" data-testid="expert-conversion-${entrypoint}" aria-label="Материалы и связь с Тимуром">
  <section class="tg-plan-cta tg-plan-cta--expert" aria-label="Всё для подготовки к свадьбе">
    <div class="tg-plan-cta__inner">
      <div class="tg-plan-cta__content">
        <h2>Всё для подготовки к свадьбе</h2>
        <p class="tg-plan-cta__text">В Telegram- и MAX-боте вы получите свадебный калькулятор, полезные материалы, порядок вечера, пример сценария и пошаговый план подготовки к свадьбе. Можно обсудить свою свадьбу с Тимуром или посмотреть сайт ведущего.</p>
        <div class="tg-plan-cta__actions" aria-label="Выбрать следующий шаг">
          ${tildaCtaLink("tg-plan-cta__button tg-plan-cta__button--primary", telegramPlanUrl, "Получить в Telegram", `${safeAttrs} data-plan-source="${planSource}" data-expert-cta="plan-telegram"`)}
          ${tildaCtaLink("tg-plan-cta__button tg-plan-cta__button--secondary", maxPlanUrl, "Получить в MAX", `${safeAttrs} data-plan-source="${planSource}" data-expert-cta="plan-max"`)}
          ${tildaCtaLink("tg-plan-cta__button tg-plan-cta__button--secondary", "#consultation-contact", "Обсудить свадьбу", 'data-consultation-popup-open data-expert-cta="meeting-popup"')}
          ${tildaCtaLink("tg-plan-cta__button tg-plan-cta__button--secondary", basePath, "Сайт ведущего", 'data-expert-cta="host-home"')}
        </div>
        <a class="tg-plan-cta__phone" href="tel:+79253900772">+7 925 390 07 72</a>
      </div>
      <picture class="tg-plan-cta__photo ${photoClass}" style="--tg-home-photo-mask:url('${homePhotoMaskUrl}')">
        <source srcset="${portraitAvifUrl}" type="image/avif" />
        <img src="${portraitWebpUrl}" alt="Тимур Громов" width="900" height="1200" loading="lazy" />
      </picture>
    </div>
  </section>

  <footer class="expert-conversion__footer">
    <div class="expert-conversion__shell expert-conversion__footer-grid">
      <section><h3>Материалы</h3><a href="${basePath}materials/">Все материалы</a><a href="${basePath}scenario/">Сценарий вечера</a></section>
      <section><h3>Услуги</h3><a href="${basePath}">Свадебный ведущий</a><a href="https://corp.timurgromov.ru" target="_blank" rel="noopener noreferrer">Корпоративы</a></section>
      <section><h3>Доверие</h3><a href="https://dzen.ru/timurgromov" target="_blank" rel="noopener noreferrer">Дзен</a><a href="https://clck.ru/TZjT6" target="_blank" rel="noopener noreferrer">Отзывы</a></section>
      <section><h3>Контакты</h3><a href="${telegramMeetingUrl}" ${safeAttrs}>Telegram</a><a href="${maxMeetingUrl}" ${safeAttrs}>MAX</a><a href="tel:+79253900772">+7 925 390-07-72</a></section>
    </div>
  </footer>

  <style>
    @font-face{font-family:"Coolvetica";src:url("https://static.tildacdn.com/tild6636-6134-4531-a265-333565666232/AnyConvcom__coolveti.woff") format("woff");font-weight:500;font-style:normal;font-display:swap}
    @font-face{font-family:"Manrope";src:url("https://static.tildacdn.com/tild6132-3564-4737-b331-633763333536/Manrope-Regular.woff") format("woff");font-weight:400;font-style:normal;font-display:swap}
    .expert-conversion{--t-headline-font:"Coolvetica",Arial,sans-serif;--t-text-font:"Manrope",Arial,sans-serif;color:#1c1b1a;background:#fffefa;font-family:var(--t-text-font)}
    .tg-plan-cta--expert{margin-top:32px;margin-bottom:0;padding:48px 0 56px;background:#fffefa;color:#1c1b1a}
    .tg-plan-cta--expert .tg-plan-cta__inner{display:grid;grid-template-columns:minmax(0,.9fr) minmax(260px,.56fr);gap:52px;width:min(1120px,calc(100% - 48px));margin:0 auto;align-items:center}
    .tg-plan-cta--expert .tg-plan-cta__text{margin:0;font-family:var(--t-text-font);font-weight:400;letter-spacing:0}
    .tg-plan-cta--expert h2{max-width:720px;margin:0 0 22px;color:#1c1b1a;font-family:var(--t-headline-font);font-size:clamp(48px,4vw,60px);font-weight:500;line-height:1;text-transform:uppercase;letter-spacing:0}
    .tg-plan-cta--expert .tg-plan-cta__text{max-width:680px;color:rgba(28,27,26,.78);font-size:20px;line-height:1.28}
    .tg-plan-cta--expert .tg-plan-cta__actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;width:min(100%,640px);margin-top:26px}
    .tg-plan-cta--expert .tg-tilda-cta{--tg-cta-height:30px;--tg-cta-arrow-box:30px;--tg-cta-overlap:1px;--tg-cta-pad-left:20px;--tg-cta-pad-right:18px;--tg-cta-radius:5px;--tg-cta-fill:#fffefa;--tg-cta-border:#fa4604;--tg-cta-color:#1c1b1a;--tg-cta-arrow-fill:#fffefa;--tg-cta-arrow-color:#1c1b1a;--tg-cta-icon-size:10px;--tg-cta-font-size:12px;position:relative;display:grid;grid-template-columns:minmax(0,1fr) calc(var(--tg-cta-arrow-box) - var(--tg-cta-overlap));align-items:stretch;min-height:0!important;height:var(--tg-cta-height)!important;padding:0!important;border:0!important;border-radius:0!important;box-sizing:border-box;background:transparent!important;color:var(--tg-cta-color)!important;font-family:var(--t-text-font);font-size:var(--tg-cta-font-size)!important;font-weight:400;line-height:1;text-decoration:none!important;background-image:none!important;transition:background-color .18s ease,color .18s ease,border-color .18s ease,box-shadow .18s ease,transform .18s ease;appearance:none;-webkit-appearance:none;cursor:pointer}
    .tg-plan-cta--expert .tg-tilda-cta__plate,.tg-plan-cta--expert .tg-tilda-cta__arrow-box{grid-row:1;border:1px solid var(--tg-cta-border);box-sizing:border-box;background:var(--tg-cta-fill);transition:background-color .18s ease,border-color .18s ease}
    .tg-plan-cta--expert .tg-tilda-cta__plate{grid-column:1;min-width:0;border-radius:var(--tg-cta-radius)}
    .tg-plan-cta--expert .tg-tilda-cta__arrow-box{grid-column:2;width:var(--tg-cta-arrow-box);margin-left:calc(-1 * var(--tg-cta-overlap));border-radius:var(--tg-cta-radius);background:var(--tg-cta-arrow-fill)}
    .tg-plan-cta--expert .tg-tilda-cta__label{grid-column:1;grid-row:1;z-index:1;display:flex;align-items:center;justify-content:center;min-width:0;padding:0 var(--tg-cta-pad-right) 0 var(--tg-cta-pad-left);color:var(--tg-cta-color);font:inherit;line-height:1;white-space:nowrap;pointer-events:none}
    .tg-plan-cta--expert .tg-tilda-cta__icon{grid-column:2;grid-row:1;z-index:1;display:grid;place-items:center;width:var(--tg-cta-arrow-box);margin-left:calc(-1 * var(--tg-cta-overlap));pointer-events:none}
    .tg-plan-cta--expert .tg-tilda-cta__icon::before{content:"";width:var(--tg-cta-icon-size);height:var(--tg-cta-icon-size);background:var(--tg-cta-arrow-color);-webkit-mask:url("${arrowUrl}") center / contain no-repeat;mask:url("${arrowUrl}") center / contain no-repeat;transform:rotate(0deg);transform-origin:center;transition:transform .2s ease,background-color .18s ease}
    .tg-plan-cta--expert .tg-plan-cta__button{width:100%;min-width:0;max-width:100%;--tg-cta-fill:#fffefa;--tg-cta-color:#1c1b1a;--tg-cta-arrow-fill:#fffefa;--tg-cta-arrow-color:#1c1b1a}
    .tg-plan-cta--expert .tg-plan-cta__button--primary{--tg-cta-fill:#fa4604;--tg-cta-color:#fffefa;--tg-cta-arrow-fill:#fa4604;--tg-cta-arrow-color:#fffefa}
    @media (min-width:1200px){.tg-plan-cta--expert .tg-tilda-cta{--tg-cta-height:clamp(30px,2.5vw,48px);--tg-cta-arrow-box:clamp(30px,2.5vw,48px);--tg-cta-pad-left:clamp(20px,1.6667vw,34px);--tg-cta-pad-right:clamp(18px,1.5vw,26px);--tg-cta-radius:clamp(5px,.4167vw,8px);--tg-cta-icon-size:clamp(10px,.8333vw,16px);--tg-cta-font-size:clamp(12px,1vw,19px)}}
    @media (min-width:1920px){.tg-plan-cta--expert .tg-tilda-cta{--tg-cta-height:48px;--tg-cta-arrow-box:48px;--tg-cta-pad-left:34px;--tg-cta-pad-right:26px;--tg-cta-radius:8px;--tg-cta-icon-size:16px;--tg-cta-font-size:19px}}
    @media (max-width:1199px){.tg-plan-cta--expert .tg-tilda-cta{--tg-cta-height:35px;--tg-cta-arrow-box:35px;--tg-cta-pad-left:18px;--tg-cta-pad-right:16px;--tg-cta-radius:5px;--tg-cta-icon-size:13px;--tg-cta-font-size:13px}}
    @media (hover:hover){.tg-plan-cta--expert .tg-tilda-cta:hover .tg-tilda-cta__icon::before{transform:rotate(45deg)}.tg-plan-cta--expert .tg-plan-cta__button:hover{--tg-cta-fill:#fa4604;--tg-cta-color:#fffefa;--tg-cta-arrow-fill:#fa4604;--tg-cta-arrow-color:#fffefa;box-shadow:0 14px 28px rgba(250,70,4,.16);transform:translateY(-1px)}.tg-plan-cta--expert .tg-plan-cta__button--primary:hover{--tg-cta-fill:#fa4604;--tg-cta-color:#fffefa;--tg-cta-arrow-fill:#fa4604;--tg-cta-arrow-color:#fffefa}}
    .tg-plan-cta--expert .tg-plan-cta__phone{display:inline-block;margin-top:22px;color:#fa4604;font-family:var(--t-headline-font);font-size:34px;font-weight:500;line-height:1;text-decoration:none}
    .tg-plan-cta--expert .tg-plan-cta__photo{display:block;justify-self:end;width:min(100%,460px);aspect-ratio:1760/960;overflow:hidden;background:#d8d0c8;-webkit-mask:var(--tg-home-photo-mask) center / 100% 100% no-repeat;mask:var(--tg-home-photo-mask) center / 100% 100% no-repeat}
    .tg-plan-cta--expert .tg-plan-cta__photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:62% 23%;filter:grayscale(1)}
    .tg-plan-cta--expert .tg-plan-cta__photo--materials img{object-position:60% 19%}.tg-plan-cta--expert .tg-plan-cta__photo--preparation-plan img{object-position:62% 27%}
    .expert-conversion__shell{width:min(1120px,calc(100% - 48px));margin:0 auto}.expert-conversion__footer{padding:44px 0;background:#241d19;color:#fffaf4;font-family:var(--t-text-font)}.expert-conversion__footer-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px}.expert-conversion__footer h3{margin:0 0 14px;color:rgba(255,250,244,.66);font-family:var(--t-headline-font);font-size:24px;font-weight:500}.expert-conversion__footer a{display:block;margin-top:10px;color:#fffaf4;font-size:15px;line-height:1.35;text-decoration:underline;text-decoration-color:rgba(255,250,244,.28);text-underline-offset:4px}
    @media(max-width:900px){.tg-plan-cta--expert{margin-top:28px;padding:40px 0 48px}.tg-plan-cta--expert .tg-plan-cta__inner{grid-template-columns:minmax(0,1fr) minmax(210px,.5fr);gap:30px;width:min(100% - 40px,1120px)}.tg-plan-cta--expert .tg-plan-cta__photo{width:min(100%,380px)}.tg-plan-cta--expert h2{font-size:clamp(42px,5.4vw,54px)}.expert-conversion__footer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:640px){.tg-plan-cta--expert{margin-top:20px;padding:34px 0 38px}.tg-plan-cta--expert .tg-plan-cta__inner{grid-template-columns:1fr;gap:26px;width:min(100% - 32px,1120px)}.tg-plan-cta--expert .tg-plan-cta__photo{order:-1;justify-self:start;width:min(100%,430px)}.tg-plan-cta--expert h2{margin-bottom:18px;font-size:38px}.tg-plan-cta--expert .tg-plan-cta__text{font-size:17px;line-height:1.25}.tg-plan-cta--expert .tg-plan-cta__actions{gap:9px;margin-top:24px}.tg-plan-cta--expert .tg-plan-cta__phone{margin-top:20px;font-size:30px}.expert-conversion__shell{width:min(100% - 32px,1120px)}.expert-conversion__footer{padding:32px 0}.expert-conversion__footer-grid{grid-template-columns:1fr;gap:24px}.expert-conversion__footer h3{font-size:22px}}
    @media(max-width:479px){.tg-plan-cta--expert .tg-plan-cta__actions{grid-template-columns:1fr}.tg-plan-cta--expert .tg-tilda-cta{--tg-cta-height:48px;--tg-cta-arrow-box:48px;--tg-cta-font-size:13px}}
  </style>
</section>`;
};
