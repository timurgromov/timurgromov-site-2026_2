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
if ((index.match(/campaign_params: tracking\.campaign_params/g) || []).length !== 2) {
  throw new Error('consultation and tripwire forms must both send campaign_params');
}
if ((index.match(/yclid: tracking\.yclid/g) || []).length !== 2) {
  throw new Error('consultation and tripwire forms must both send yclid');
}

console.log('Direct attribution contract: OK');
