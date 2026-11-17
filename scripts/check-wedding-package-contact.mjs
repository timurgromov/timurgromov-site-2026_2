import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const url = process.env.WEDDING_CONTACT_URL || 'http://127.0.0.1:4327/';
assert.equal(new URL(url).hostname, '127.0.0.1', 'This check uses the local test API');
const browser = await chromium.launch({ headless: true });
let checks = 0;

try {
  const context = await browser.newContext();
  await context.route('https://mc.yandex.ru/**', route => route.abort());
  await context.route('https://t.me/**', route => route.fulfill({ body: 'Local handoff test' }));
  await context.route('https://max.ru/**', route => route.fulfill({ body: 'Local handoff test' }));
  await context.addInitScript(() => {
    window.contactTestGoals = [];
    window.ym = (...args) => {
      if (args[1] === 'getClientID') args[2]('');
      if (args[1] === 'reachGoal') window.contactTestGoals.push({ goal: args[2], params: args[3] });
    };
  });
  const page = await context.newPage();
  const errors = [];
  const requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (request.method() === 'POST' && request.url().endsWith('/site/metrika-attribution')) {
      requests.push(request.postDataJSON());
    }
  });
  const popup = page.locator('#plan-delivery-popup');
  const close = () => popup.locator('[data-plan-popup-close]').last().click();
  const selection = popup.locator('[data-wedding-package-selection]');
  const openPackage = async (key) => {
    await page.locator(`[data-pricing-package="${key}"] [data-wedding-package-contact]`).click();
    await popup.waitFor({ state: 'visible' });
  };
  const ready = async () => {
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#plan-delivery-popup [data-wedding-call-dynamic]'))
      .every(link => /^yd_/.test(new URL(link.href).searchParams.get('start') || '')));
  };

  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto(url + '?check=wedding-package-contact&width=' + viewport.width + '#price');
    const date = page.getByLabel('Выбрать дату свадьбы');
    await date.fill('2027-07-02');
    for (const [key, price] of [['chamber', 150000], ['classic', 170000], ['music', 355000]]) {
      await openPackage(key);
      await ready();
      assert.match(await selection.innerText(), /2 июля 2027/);
      assert.match((await selection.innerText()).replace(/\s/g, ''), new RegExp(String(price)));
      for (const provider of ['telegram', 'max']) {
        const source = `site_meeting_timurgromov__home__pricing_${key}`;
        const mode = key === 'music' ? 'from' : 'exact';
        assert(requests.some(request => request.provider === provider && request.source_code === source &&
          request.cta_code === `package:wedding_${key}:2027-07-02:${price}:${key === 'chamber' ? 20000 : 25000}:${mode}`));
        const handoff = context.waitForEvent('page');
        await popup.locator(`[data-wedding-call-channel="${provider}"]`).click();
        const destination = await handoff;
        await destination.waitForURL(provider === 'telegram' ? /https:\/\/t.me\// : /https:\/\/max.ru\//);
        await destination.close();
        const events = await page.evaluate(() => window.contactTestGoals);
        const last = events.filter(event => event.goal === 'wedding_call_contact_click').at(-1);
        assert.equal(last.params.package_code, `wedding_${key}`);
        assert.equal(last.params.channel, provider);
        assert.equal(last.params.price, price);
        assert.equal(last.params.placement, `pricing_${key}`);
        checks += 1;
      }
      await page.evaluate(() => document.querySelector('#plan-delivery-popup [data-wedding-call-channel="phone"]')
        .addEventListener('click', event => event.preventDefault(), { once: true }));
      await popup.locator('[data-wedding-call-channel="phone"]').click();
      const phoneGoal = await page.evaluate(() => window.contactTestGoals.at(-1));
      assert.equal(phoneGoal.goal, 'wedding_call_contact_click');
      assert.equal(phoneGoal.params.channel, 'phone');
      assert.equal(phoneGoal.params.package_code, `wedding_${key}`);
      checks += 1;
      if (key === 'music' && process.env.WEDDING_CONTACT_SCREENSHOT_DIR) {
        await mkdir(process.env.WEDDING_CONTACT_SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: join(process.env.WEDDING_CONTACT_SCREENSHOT_DIR, `wedding-package-popup-${viewport.width}.png`) });
      }
      await close();
    }
    await page.getByRole('button', { name: 'Обсудить музыкальный состав' }).click();
    await ready();
    assert.match(await popup.locator('h2').innerText(), /МУЗЫКАЛЬНЫЙ СОСТАВ/);
    const musicGoal = await page.evaluate(() => window.contactTestGoals.filter(event => event.goal === 'wedding_call_popup_open').at(-1));
    assert.equal(musicGoal.params.placement, 'music');
    assert.equal(musicGoal.params.package_code, 'wedding_music');
    assert(requests.some(request => request.source_code.endsWith('__home__music') &&
      request.cta_code === 'package:wedding_music:2027-07-02:355000:25000:from'));
    await close();
    await date.fill('');
    await openPackage('chamber');
    await ready();
    assert.match((await selection.innerText()).replace(/\s/g, ''), /от135000/);
    assert(!/июля/.test(await selection.innerText()));
    await close();
    await page.getByRole('link', { name: 'Получить сценарий свадьбы', exact: true }).click();
    assert.equal(await selection.isVisible(), false);
    assert.match(await popup.locator('h2').innerText(), /ВАШУ СВАДЬБУ/);
    await page.keyboard.press('Escape');
    assert.equal(await popup.isVisible(), false);
    const events = await page.evaluate(() => window.contactTestGoals);
    assert.equal(events.filter(event => event.goal === 'wedding_call_contact_click').length, 9);
    checks += 3;
  }

  // Previously issued links must keep their quote after another date is chosen.
  const date = page.getByLabel('Выбрать дату свадьбы');
  await date.fill('2027-07-02');
  await openPackage('music');
  await ready();
  const oldLink = await popup.locator('[data-wedding-call-channel="telegram"]').getAttribute('href');
  await close();
  await date.fill('2027-08-27');
  await openPackage('music');
  await ready();
  const newLink = await popup.locator('[data-wedding-call-channel="telegram"]').getAttribute('href');
  assert.notEqual(oldLink, newLink);
  assert.match((await selection.innerText()).replace(/\s/g, ''), /380000/);
  const musicRequests = requests.filter(request => request.source_code.endsWith('__home__pricing_music'));
  const earlier = musicRequests.find(request => request.cta_code.includes(':2027-07-02:355000:'));
  const later = musicRequests.find(request => request.cta_code.includes(':2027-08-27:380000:'));
  assert.notEqual(earlier.visit_key, later.visit_key);
  await close();
  const failingEndpoint = '**/site/metrika-attribution';
  await page.route(failingEndpoint, route => route.fulfill({ status: 503, body: '{}' }));
  await date.fill('2027-08-08');
  await openPackage('music');
  const failedPopup = context.waitForEvent('page');
  await popup.locator('[data-wedding-call-channel="telegram"]').click();
  const blank = await failedPopup;
  await popup.getByRole('status').getByText('Не удалось подготовить переход.', { exact: false }).waitFor();
  assert.equal(blank.isClosed(), true);
  await page.unroute(failingEndpoint);
  const retry = context.waitForEvent('page');
  await popup.locator('[data-wedding-call-channel="telegram"]').click();
  const destination = await retry;
  await destination.waitForURL(/https:\/\/t.me\//);
  await destination.close();
  checks += 2;
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log(`PASS: ${checks + 1} local package/contact checks, both providers, distinct goals and quotes, no browser errors`);
} finally {
  await browser.close();
}
