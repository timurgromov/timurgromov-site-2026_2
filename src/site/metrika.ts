import { messengerStartEndpoint } from './home-data';

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
    var legacySources = {
      site_plan_home: true,
      site_plan_scenario: true,
      site_plan_materials: true,
      site_plan_preparation_plan: true,
      site_meeting_home: true,
      site_meeting_scenario: true,
      site_meeting_materials: true,
      site_meeting_preparation_plan: true
    };
    var endpoint = /^(localhost|127\\.0\\.0\\.1)$/.test(window.location.hostname)
      ? 'http://127.0.0.1:8000/api/v1/site/metrika-attribution'
      : 'https://calcul.timurgromov.ru/api/v1/site/metrika-attribution';
    var promiseBySource = Object.create(null);
    var clientIdPromise = null;
    var trackingParams = null;
    var firstTouch = null;
    var firstTouchStorageKey = 'tg_first_touch_v1';
    var firstTouchTtlMs = 30 * 24 * 60 * 60 * 1000;
    var campaignKeys = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
      'direct_campaign_id', 'direct_source_type', 'direct_region_id'
    ];

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
      }).then(function(value){
        if (value) patchFirstTouchClientId(value);
        else clientIdPromise = null;
        return value;
      });
      return clientIdPromise;
    }

    function safeHost(value){
      try { return new URL(value).hostname.toLowerCase().replace(/^www\\./, '').slice(0, 255); }
      catch (_error) { return ''; }
    }

    function normalizeAiSource(value){
      var normalized = String(value || '').trim().toLowerCase();
      var host = safeHost(/^https?:\\/\\//.test(normalized) ? normalized : 'https://' + normalized) || normalized.replace(/^www\\./, '');
      if (host === 'chatgpt.com' || host.endsWith('.chatgpt.com') || host === 'chat.openai.com' || host.endsWith('.openai.com') || normalized.indexOf('chatgpt') >= 0) return 'chatgpt';
      if (host === 'perplexity.ai' || host.endsWith('.perplexity.ai')) return 'perplexity';
      if (host === 'claude.ai' || host.endsWith('.claude.ai')) return 'claude';
      if (host === 'gemini.google.com') return 'gemini';
      if (host === 'copilot.microsoft.com') return 'copilot';
      return '';
    }

    function buildCurrentFirstTouch(){
      var params = new URLSearchParams(window.location.search);
      var campaign = {};
      campaignKeys.forEach(function(key){
        var value = params.get(key);
        if (value) campaign[key] = String(value).slice(0, 500);
      });
      var yclid = String(params.get('yclid') || '').trim().slice(0, 255);
      var referrerHost = document.referrer ? safeHost(document.referrer) : '';
      var source = '';
      var sourceBasis = '';
      var engine = '';
      var channel = 'direct';
      var aiSource = normalizeAiSource(campaign.utm_source || referrerHost);
      if (aiSource) {
        channel = 'ai'; source = aiSource; sourceBasis = campaign.utm_source ? 'utm_source' : 'referrer';
      } else if (yclid || campaign.direct_campaign_id) {
        channel = 'paid'; source = 'yandex_direct'; sourceBasis = yclid ? 'yclid' : 'direct_campaign_id';
      } else if (campaign.utm_source || campaign.utm_medium || campaign.utm_campaign) {
        channel = 'campaign'; source = String(campaign.utm_source || campaign.utm_medium || 'campaign').toLowerCase().slice(0, 255); sourceBasis = campaign.utm_source ? 'utm_source' : campaign.utm_medium ? 'utm_medium' : 'utm_campaign';
      } else if (/(^|\.)yandex\./.test(referrerHost)) {
        channel = 'organic'; source = 'yandex'; sourceBasis = 'referrer'; engine = 'yandex';
      } else if (/(^|\.)google\./.test(referrerHost)) {
        channel = 'organic'; source = 'google'; sourceBasis = 'referrer'; engine = 'google';
      } else if (referrerHost) {
        channel = 'referral'; source = referrerHost; sourceBasis = 'referrer';
      }
      var context = { channel: channel, source: source, source_basis: sourceBasis, engine: engine, referrer_host: referrerHost, landing_path: (window.location.pathname || '/').slice(0, 500) };
      Object.keys(context).forEach(function(key){ if (!context[key]) delete context[key]; });
      return {
        version: 1,
        captured_at: Date.now(),
        expires_at: Date.now() + firstTouchTtlMs,
        yclid: yclid,
        campaign: campaign,
        context: context,
        landing_url: (window.location.origin + (window.location.pathname || '/')).slice(0, 1000),
        metrika_client_id: ''
      };
    }

    function readStoredFirstTouch(){
      var raw = '';
      try { raw = window.localStorage.getItem(firstTouchStorageKey) || ''; }
      catch (_error) { try { raw = window.sessionStorage.getItem(firstTouchStorageKey) || ''; } catch (_nestedError) {} }
      if (!raw) return null;
      try {
        var parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== 1 || Number(parsed.expires_at || 0) <= Date.now() || !parsed.context || typeof parsed.context !== 'object') return null;
        return parsed;
      } catch (_error) { return null; }
    }

    function writeFirstTouch(value){
      var serialized = JSON.stringify(value);
      try { window.localStorage.setItem(firstTouchStorageKey, serialized); }
      catch (_error) { try { window.sessionStorage.setItem(firstTouchStorageKey, serialized); } catch (_nestedError) {} }
    }

    function getFirstTouch(){
      if (firstTouch) return firstTouch;
      firstTouch = readStoredFirstTouch() || buildCurrentFirstTouch();
      writeFirstTouch(firstTouch);
      return firstTouch;
    }

    function patchFirstTouchClientId(clientId){
      var value = String(clientId || '').trim().slice(0, 80);
      if (!value) return;
      var touch = getFirstTouch();
      if (touch.metrika_client_id === value) return;
      touch.metrika_client_id = value;
      writeFirstTouch(touch);
    }

    function getTrackingParams(){
      if (trackingParams) return trackingParams;
      var touch = getFirstTouch();
      var result = { yclid: String(touch.yclid || '').trim(), campaign: Object.assign({}, touch.campaign || {}) };
      trackingParams = result;
      return trackingParams;
    }

    function getAcquisitionContext(){
      return Object.assign({}, getFirstTouch().context || { channel: 'direct', landing_path: '/' });
    }

    window.tgGetTrackingBundle = function(){
      var tracking = getTrackingParams();
      var touch = getFirstTouch();
      return {
        yclid: tracking.yclid || null,
        campaign_params: Object.assign({}, tracking.campaign),
        attribution_context: getAcquisitionContext(),
        metrika_client_id: touch.metrika_client_id || null
      };
    };
    window.tgGetTrackingBundleAsync = function(){
      return getClientId().catch(function(){ return ''; }).then(function(){
        return window.tgGetTrackingBundle();
      });
    };
    getFirstTouch();
    getClientId().catch(function(){ return ''; });

    var ctaGoals = {
      cta_open: true,
      telegram_click: true,
      phone_click: true,
      form_start: true,
      lead_submit_success: true,
      lead_submit_error: true,
      materials_request: true
    };

    function ctaToken(value, fallback){
      var normalized = String(value || '').trim().toLowerCase();
      return /^[a-z0-9][a-z0-9_-]{0,63}$/.test(normalized) ? normalized : fallback;
    }

    window.tgTrackCtaGoal = function(goal, context){
      if (!ctaGoals[goal] || typeof window.ym !== 'function') return;
      var value = context || {};
      var cta = {
        site: ctaToken(value.site, 'timurgromov'),
        page: ctaToken(value.page, 'jubilee'),
        intent: ctaToken(value.intent, 'consultation'),
        placement: ctaToken(value.placement, 'contact_panel')
      };
      window.ym(${yandexMetrikaId}, 'reachGoal', goal, { cta: cta });
    };

    function messengerLinkData(anchor){
      try {
        var url = new URL(anchor.href, window.location.href);
        var host = url.hostname.toLowerCase();
        var isStableRedirect = url.pathname === '/api/v1/site/messenger-start';
        var stableProvider = url.searchParams.get('provider');
        var provider = isStableRedirect && (stableProvider === 'telegram' || stableProvider === 'max') ? stableProvider
          : host === 'max.ru' || host.endsWith('.max.ru') ? 'max'
          : host === 't.me' || host.endsWith('.t.me') ? 'telegram'
          : null;
        var parameter = isStableRedirect
          ? (url.searchParams.get('mode') === 'startapp' ? 'startapp' : 'start')
          : (url.searchParams.has('startapp') ? 'startapp' : 'start');
        var source = isStableRedirect ? (url.searchParams.get('payload') || '') : (url.searchParams.get(parameter) || '');
        var structuredSource = /^site_(plan|meeting|calculator)_[a-z0-9_-]+__[a-z0-9_-]+__[a-z0-9_-]+$/.test(source) && source.length <= 64;
        if (!provider || (!legacySources[source] && !structuredSource)) return null;
        return { provider: provider, source: source, parameter: parameter, url: url };
      } catch (_error) {
        return null;
      }
    }

    function attributedUrl(anchor, data){
      var promiseKey = [data.provider, data.parameter, data.source].join(':');
      if (!promiseBySource[promiseKey]) {
        promiseBySource[promiseKey] = getClientId().then(function(clientId){
          var tracking = getTrackingParams();
          var context = getAcquisitionContext();
          var touch = getFirstTouch();
          var yclid = tracking.yclid;
          if (!clientId && !yclid) throw new Error('Metrika identifier is unavailable');
          return fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              visit_key: getVisitKey(),
              source_code: data.source,
              provider: data.provider,
              mode: data.parameter,
              client_id: clientId || null,
              yclid: yclid || null,
              campaign_params: Object.assign({}, tracking.campaign, {
                entry_channel: context.channel || 'direct',
                entry_source: context.source || '',
                entry_source_basis: context.source_basis || '',
                entry_engine: context.engine || '',
                entry_referrer_host: context.referrer_host || '',
                entry_landing_path: context.landing_path || '/'
              }),
              landing_url: touch.landing_url || window.location.origin + (window.location.pathname || '/'),
              cta_code: anchor.getAttribute('data-calculator-source') || anchor.getAttribute('data-plan-source') || data.source
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
          var destination = String(payload.destination_url || '');
          var destinationHost = new URL(destination).hostname.toLowerCase();
          var validDestination = data.provider === 'telegram'
            ? destinationHost === 't.me' || destinationHost.endsWith('.t.me')
            : destinationHost === 'max.ru' || destinationHost.endsWith('.max.ru');
          if (!validDestination) throw new Error('Invalid attribution destination');
          return destination;
        });
      }
      return promiseBySource[promiseKey];
    }

    // Contact panels choose their source after the page loads, so they use the
    // same server-issued payload without binding an anchor ahead of time.
    window.tgAttributedTelegramUrl = function(source){
      var anchor = document.createElement('a');
      anchor.href = '${messengerStartEndpoint}?provider=telegram&mode=start&payload=' + encodeURIComponent(source);
      var data = messengerLinkData(anchor);
      return data ? attributedUrl(anchor, data) : Promise.resolve(anchor.href);
    };

    function bindAnchor(anchor){
      if (anchor && anchor.hasAttribute('data-contact-telegram')) return;
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
