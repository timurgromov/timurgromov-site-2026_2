export const yandexMetrikaId = "100295805";
export const yandexWebmasterVerification = "c3be09b3da422cb8";

export const yandexMetrikaHead = `<meta name="yandex-verification" content="${yandexWebmasterVerification}" />
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return;
    }
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],
    k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

  window.mainMetrikaId="${yandexMetrikaId}";
  window.TG_METRIKA_ID=${yandexMetrikaId};
  ym(${yandexMetrikaId},"init",{
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true,
    ecommerce:"dataLayer"
  });
</script>
<noscript>
  <div><img src="https://mc.yandex.ru/watch/${yandexMetrikaId}" style="position:absolute; left:-9999px;" alt="" /></div>
</noscript>
<script>
  (function(){
    var allowedSources = {
      site_plan_home: true,
      site_meeting_home: true,
      site_meeting_scenario: true,
      site_meeting_materials: true
    };
    var endpoint = /^(localhost|127\\.0\\.0\\.1)$/.test(window.location.hostname)
      ? 'http://127.0.0.1:8000/api/v1/site/metrika-attribution'
      : 'https://calcul.timurgromov.ru/api/v1/site/metrika-attribution';
    var promiseBySource = Object.create(null);
    var clientIdPromise = null;
    var trackingParams = null;

    function randomVisitKey(){
      var bytes = new Uint8Array(24);
      if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(bytes);
      } else {
        for (var index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
      }
      return Array.prototype.map.call(bytes, function(value){
        return value.toString(16).padStart(2, '0');
      }).join('');
    }

    function getVisitKey(){
      try {
        var existing = window.sessionStorage.getItem('tg_metrika_visit_key');
        if (existing && /^[A-Za-z0-9_-]{20,80}$/.test(existing)) return existing;
        var created = randomVisitKey();
        window.sessionStorage.setItem('tg_metrika_visit_key', created);
        return created;
      } catch (_error) {
        return randomVisitKey();
      }
    }

    function getClientId(){
      if (clientIdPromise) return clientIdPromise;
      clientIdPromise = new Promise(function(resolve){
        var settled = false;
        var finish = function(value){
          if (settled) return;
          settled = true;
          resolve(String(value || '').trim());
        };
        try {
          if (typeof window.ym === 'function') {
            window.ym(${yandexMetrikaId}, 'getClientID', finish);
          }
        } catch (_error) {
          finish('');
        }
        window.setTimeout(function(){ finish(''); }, 2500);
      });
      return clientIdPromise;
    }

    function getTrackingParams(){
      if (trackingParams) return trackingParams;
      var params = new URLSearchParams(window.location.search);
      var result = { yclid: String(params.get('yclid') || '').trim(), campaign: {} };
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function(key){
        var value = params.get(key);
        if (value) result.campaign[key] = value.slice(0, 500);
      });
      try {
        var stored = JSON.parse(window.sessionStorage.getItem('tg_metrika_campaign') || '{}');
        if (!result.yclid && stored.yclid) result.yclid = String(stored.yclid).slice(0, 255);
        if (!Object.keys(result.campaign).length && stored.campaign && typeof stored.campaign === 'object') {
          result.campaign = stored.campaign;
        }
        window.sessionStorage.setItem('tg_metrika_campaign', JSON.stringify(result));
      } catch (_error) {
        // ClientID still provides exact attribution when storage is unavailable.
      }
      trackingParams = result;
      return trackingParams;
    }

    function messengerLinkData(anchor){
      try {
        var url = new URL(anchor.href, window.location.href);
        var host = url.hostname.toLowerCase();
        var provider = host === 'max.ru' || host.endsWith('.max.ru') ? 'max'
          : host === 't.me' || host.endsWith('.t.me') ? 'telegram'
          : null;
        var source = url.searchParams.get('start') || '';
        if (!provider || !allowedSources[source]) return null;
        return { provider: provider, source: source, url: url };
      } catch (_error) {
        return null;
      }
    }

    function attributedUrl(anchor, data){
      if (!promiseBySource[data.source]) {
        promiseBySource[data.source] = getClientId().then(function(clientId){
          var tracking = getTrackingParams();
          var yclid = tracking.yclid;
          if (!clientId && !yclid) throw new Error('Metrika identifier is unavailable');
          return fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              visit_key: getVisitKey(),
              source_code: data.source,
              provider: data.provider,
              client_id: clientId || null,
              yclid: yclid || null,
              campaign_params: tracking.campaign,
              landing_url: window.location.href,
              cta_code: anchor.getAttribute('data-plan-source') || data.source
            }),
            credentials: 'omit'
          });
        }).then(function(response){
          if (!response.ok) throw new Error('Attribution request failed');
          return response.json();
        }).then(function(payload){
          if (!payload || !/^yd_[A-Za-z0-9_-]{20,40}$/.test(payload.start_payload || '')) {
            throw new Error('Invalid attribution payload');
          }
          return payload.start_payload;
        });
      }
      return promiseBySource[data.source].then(function(startPayload){
        var result = new URL(data.url.toString());
        result.searchParams.set('start', startPayload);
        return result.toString();
      });
    }

    function bindAnchor(anchor){
      if (!anchor || anchor.dataset.metrikaAttributionBound === 'true') return;
      var data = messengerLinkData(anchor);
      if (!data) return;
      anchor.dataset.metrikaAttributionBound = 'true';
      var fallbackUrl = anchor.href;
      var pendingUrl = attributedUrl(anchor, data);
      pendingUrl.then(function(url){
        anchor.href = url;
        anchor.dataset.metrikaAttributionReady = 'true';
      }).catch(function(){
        anchor.dataset.metrikaAttributionReady = 'false';
      });
      anchor.addEventListener('click', function(event){
        if (anchor.dataset.metrikaAttributionReady === 'true') return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
        event.preventDefault();
        var popup = anchor.target === '_blank' ? window.open('about:blank', '_blank') : null;
        pendingUrl.catch(function(){ return fallbackUrl; }).then(function(url){
          if (popup) popup.location.href = url;
          else window.location.href = url;
        });
      });
    }

    function bindMessengerLinks(){
      Array.prototype.forEach.call(document.querySelectorAll('a[href]'), bindAnchor);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindMessengerLinks);
    else bindMessengerLinks();
    window.addEventListener('load', bindMessengerLinks);
  }());
</script>`;
