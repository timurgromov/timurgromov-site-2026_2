import { readFile } from 'node:fs/promises';

const metrika = await readFile(new URL('../src/site/metrika.ts', import.meta.url), 'utf8');
const index = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

for (const key of [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'direct_campaign_id', 'direct_source_type', 'direct_region_id',
]) {
  if (!metrika.includes(`'${key}'`)) throw new Error(`tracking key is missing: ${key}`);
}

if (!metrika.includes('window.tgGetTrackingBundle')) {
  throw new Error('shared tracking bundle is not exposed');
}
if (!metrika.includes('tg_first_touch_v1') || !metrika.includes('entry_source_basis')) {
  throw new Error('durable first-touch attribution is missing');
}
if (!metrika.includes('isTelegramReferrer') || !metrika.includes("source = 'telegram'")) {
  throw new Error('Telegram referrer attribution classifier is missing');
}
if (!metrika.includes("channel = 'ai'") || !metrika.includes("return 'chatgpt'")) {
  throw new Error('AI assistant attribution classifier is missing');
}
if ((index.match(/campaign_params: tracking\.campaign_params/g) || []).length !== 2) {
  throw new Error('consultation and tripwire forms must both send campaign_params');
}
if ((index.match(/yclid: tracking\.yclid/g) || []).length !== 2) {
  throw new Error('consultation and tripwire forms must both send yclid');
}
if ((index.match(/metrika_client_id: tracking\.metrika_client_id/g) || []).length !== 2) {
  throw new Error('consultation and tripwire forms must both send Metrika ClientID');
}

const telegramInbound = await readFile(new URL('../src/pages/from/telegram.astro', import.meta.url), 'utf8');
for (const marker of ['utm_source=telegram', 'utm_medium=messenger', 'utm_campaign', 'window.location.replace']) {
  if (!telegramInbound.includes(marker)) throw new Error(`Telegram inbound marker is missing: ${marker}`);
}
if (!telegramInbound.includes('define:vars={{ basePath }}') || telegramInbound.includes('JSON.stringify(basePath)')) {
  throw new Error('Telegram inbound redirect must emit its Astro base path into the browser script');
}

console.log('Direct attribution contract: OK');
