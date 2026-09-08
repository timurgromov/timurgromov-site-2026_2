import { getTildaCtaArrowIconUrl, tildaCtaButton, tildaCtaLink } from "./tilda-cta";

interface ConsultationContactPopupOptions {
  basePath: string;
  telegramMeetingUrl: string;
  maxMeetingUrl: string;
}

// Source pattern: src/pages/index.astro → consultationContactPopupMarkup.
// This is the same contact journey, rendered on an expert page with its own
// source-specific deep links so the scenario CTA does not masquerade as a home
// page click.
export const renderConsultationContactPopup = ({
  basePath,
  telegramMeetingUrl,
  maxMeetingUrl,
}: ConsultationContactPopupOptions) => {
  const arrowUrl = getTildaCtaArrowIconUrl(basePath);

  return `<div id="consultation-contact-popup" class="tg-contact-popup" aria-hidden="true">
  <div class="tg-contact-popup__backdrop" data-consultation-popup-close></div>
  <div class="tg-contact-popup__panel" role="dialog" aria-modal="true" aria-labelledby="consultation-contact-title">
    <button class="tg-contact-popup__close" type="button" aria-label="Закрыть" data-consultation-popup-close>×</button>
    <div class="tg-contact-popup__content">
      <div>
        <p class="tg-contact-popup__eyebrow">Бесплатная встреча</p>
        <h2 id="consultation-contact-title">Выберите удобный способ</h2>
        <p class="tg-contact-popup__text">Напишите в Telegram или MAX, позвоните либо оставьте телефон, и я свяжусь с вами.</p>
        <div class="tg-contact-popup__links">
          ${tildaCtaLink("tg-contact-popup__link", telegramMeetingUrl, "Написать в Telegram", 'target="_blank" rel="nofollow" data-contact-channel="telegram"')}
          ${tildaCtaLink("tg-contact-popup__link", maxMeetingUrl, "Написать в MAX", 'target="_blank" rel="nofollow" data-contact-channel="max"')}
        </div>
        <a class="tg-contact-popup__phone" href="tel:+79253900772">+7 925 390 07 72</a>
      </div>
      <form class="tg-contact-popup__form" data-consultation-lead-form>
        <p class="tg-contact-popup__form-title">Оставить заявку</p>
        <input type="hidden" name="form_source" value="site_consultation_popup" />
        <label>Ваше имя *<input name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться" required /></label>
        <label>Ваш телефон *<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 999 123-45-67" required /></label>
        <label>Комментарий<textarea name="comment" placeholder="Дата свадьбы, площадка или любой вопрос"></textarea></label>
        ${tildaCtaButton("tg-contact-popup__submit", "Отправить", "data-contact-submit")}
        <p class="tg-contact-popup__consent">Нажимая «Отправить», вы соглашаетесь с <a href="/privacy/" target="_blank" rel="nofollow">политикой конфиденциальности</a> и <a href="/offer/" target="_blank" rel="nofollow">условиями оферты</a>.</p>
        <p class="tg-contact-popup__status" data-contact-status aria-live="polite"></p>
      </form>
    </div>
  </div>
</div>
<style>
  .tg-contact-popup{position:fixed;inset:0;z-index:10020;display:none;align-items:center;justify-content:center;padding:28px;box-sizing:border-box;color:#1c1b1a;font-family:var(--t-text-font,Arial,sans-serif)}
  .tg-contact-popup.is-open{display:flex}.tg-contact-popup__backdrop{position:absolute;inset:0;background:rgba(28,27,26,.42);backdrop-filter:blur(10px)}
  .tg-contact-popup__panel{position:relative;z-index:1;width:min(920px,100%);max-height:min(760px,calc(100vh - 56px));overflow:auto;padding:54px;border-radius:18px;background:#fffefa;box-shadow:0 24px 80px rgba(28,27,26,.24)}
  .tg-contact-popup__close{position:absolute;top:18px;right:18px;width:52px;height:52px;border:1px solid rgba(28,27,26,.14);border-radius:50%;background:#fffefa;color:#1c1b1a;font-size:38px;font-weight:300;line-height:1;cursor:pointer}
  .tg-contact-popup__content{display:grid;grid-template-columns:minmax(0,.95fr) minmax(280px,.7fr);gap:42px}.tg-contact-popup__eyebrow{margin:0 0 16px;color:#fa4604;font-size:18px;line-height:1.1}.tg-contact-popup h2{margin:0 48px 20px 0;font-family:var(--t-headline-font,Arial,sans-serif);font-size:clamp(38px,5vw,64px);font-weight:700;line-height:.98;text-transform:uppercase}.tg-contact-popup__text{max-width:520px;margin:0 0 28px;color:rgba(28,27,26,.76);font-size:20px;line-height:1.24}.tg-contact-popup__links{display:grid;justify-items:start;gap:12px}.tg-contact-popup .tg-tilda-cta{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 48px;min-height:48px;width:min(320px,100%);color:#1c1b1a;text-decoration:none}.tg-contact-popup .tg-tilda-cta__plate,.tg-contact-popup .tg-tilda-cta__arrow-box{position:absolute;inset:0;border:1px solid currentColor;background:#fffefa}.tg-contact-popup .tg-tilda-cta__plate{right:47px;border-radius:7px 0 0 7px}.tg-contact-popup .tg-tilda-cta__arrow-box{left:auto;width:48px;border-radius:0 7px 7px 0}.tg-contact-popup .tg-tilda-cta__label{z-index:1;align-self:center;padding:0 16px;font-size:15px;font-weight:600;text-align:center}.tg-contact-popup .tg-tilda-cta__icon{z-index:1;align-self:center;justify-self:center;width:15px;height:15px;background:#1c1b1a;mask:url("${arrowUrl}") center/contain no-repeat;-webkit-mask:url("${arrowUrl}") center/contain no-repeat}.tg-contact-popup__phone{display:inline-block;margin-top:24px;color:#fa4604;font-family:var(--t-headline-font,Arial,sans-serif);font-size:32px;font-weight:700;text-decoration:none}.tg-contact-popup__form{display:grid;gap:12px;align-content:start;padding:28px;border:1px solid rgba(28,27,26,.16);border-radius:10px}.tg-contact-popup__form-title{margin:0 0 6px;font-family:var(--t-headline-font,Arial,sans-serif);font-size:30px;font-weight:700;text-transform:uppercase}.tg-contact-popup__form label{display:grid;gap:6px;color:rgba(28,27,26,.68);font-size:15px}.tg-contact-popup__form input,.tg-contact-popup__form textarea{box-sizing:border-box;width:100%;border:1px solid rgba(28,27,26,.18);border-radius:10px;padding:13px 14px;background:#fffefa;color:#1c1b1a;font:inherit}.tg-contact-popup__form textarea{min-height:96px;resize:vertical}.tg-contact-popup__submit{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 48px;min-height:48px;width:100%;margin-top:4px;border:0;background:transparent;color:#fffefa;cursor:pointer}.tg-contact-popup__submit .tg-tilda-cta__plate,.tg-contact-popup__submit .tg-tilda-cta__arrow-box{position:absolute;inset:0;background:#fa4604}.tg-contact-popup__submit .tg-tilda-cta__plate{right:47px;border-radius:7px 0 0 7px}.tg-contact-popup__submit .tg-tilda-cta__arrow-box{left:auto;width:48px;border-radius:0 7px 7px 0}.tg-contact-popup__submit .tg-tilda-cta__label{z-index:1;align-self:center;font-size:15px;font-weight:600}.tg-contact-popup__submit .tg-tilda-cta__icon{z-index:1;align-self:center;justify-self:center;width:15px;height:15px;background:#fffefa}.tg-contact-popup__consent,.tg-contact-popup__status{margin:0;color:rgba(28,27,26,.58);font-size:11px;line-height:1.3}.tg-contact-popup__consent a{color:inherit}.tg-contact-popup__status{min-height:1.3em;color:#fa4604;font-size:13px}@media(max-width:760px){.tg-contact-popup{align-items:flex-end;padding:12px}.tg-contact-popup__panel{max-height:calc(100vh - 24px);padding:42px 18px 20px;border-radius:10px}.tg-contact-popup__content{grid-template-columns:1fr;gap:24px}.tg-contact-popup__close{top:10px;right:10px;width:36px;height:36px;font-size:28px}.tg-contact-popup h2{font-size:38px}.tg-contact-popup__text{font-size:16px}.tg-contact-popup .tg-tilda-cta{width:100%}.tg-contact-popup__phone{font-size:28px}.tg-contact-popup__form{padding:14px}}
</style>
<script>
  (function(){
    var popup=document.getElementById('consultation-contact-popup');
    var endpoint=/^(localhost|127\\.0\\.0\\.1)$/.test(window.location.hostname)?'http://127.0.0.1:8000/api/v1/site/consultation-request':'https://calcul.timurgromov.ru/api/v1/site/consultation-request';
    function close(){if(!popup)return;popup.classList.remove('is-open');popup.setAttribute('aria-hidden','true');document.body.classList.remove('tg-contact-popup-open')}
    document.addEventListener('click',function(event){var open=event.target&&event.target.closest&&event.target.closest('[data-consultation-popup-open]');if(open){event.preventDefault();popup.classList.add('is-open');popup.setAttribute('aria-hidden','false');document.body.classList.add('tg-contact-popup-open');return}var closeButton=event.target&&event.target.closest&&event.target.closest('[data-consultation-popup-close]');if(closeButton){event.preventDefault();close()}});document.addEventListener('keydown',function(event){if(event.key==='Escape')close()});
    document.addEventListener('submit',function(event){var form=event.target&&event.target.closest&&event.target.closest('[data-consultation-lead-form]');if(!form)return;event.preventDefault();var status=form.querySelector('[data-contact-status]');var data=new FormData(form);var name=String(data.get('name')||'').trim();var phone=String(data.get('phone')||'').trim();if(!name||!phone){status.textContent='Укажите имя и телефон.';return}status.textContent='Отправляю...';fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({name:name,phone:phone,comment:String(data.get('comment')||'').trim(),form_source:'site_consultation_popup',page_url:window.location.href}),credentials:'omit'}).then(function(response){if(!response.ok)throw new Error('request failed');form.reset();status.textContent='Заявка отправлена. Тимур свяжется с вами.'}).catch(function(){status.textContent='Не удалось отправить заявку. Выберите Telegram, MAX или телефон.'})});
  })();
</script>`;
};
