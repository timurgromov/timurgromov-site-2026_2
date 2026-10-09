import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const [html, contactScript, pricingScript] = await Promise.all([
  readFile(resolve(root, 'dist/yubiley/index.html'), 'utf8'),
  readFile(resolve(root, 'public/yubiley-assets/contact-choice.js'), 'utf8'),
  readFile(resolve(root, 'public/yubiley-assets/pricing.js'), 'utf8')
]);

function expect(source, text, label) {
  if (!source.includes(text)) throw new Error(`${label}: missing ${JSON.stringify(text)}`);
}

function reject(source, text, label) {
  if (source.includes(text)) throw new Error(`${label}: unexpected ${JSON.stringify(text)}`);
}

expect(html, 'data-testid="jubilee-pricing"', 'pricing block');
expect(html, 'data-section-nav', 'shared section navigation');
expect(html, 'href="#formats" data-nav-target="formats">Цены</a>', 'prices navigation');
expect(html, 'href="#evening-flow" data-nav-target="evening-flow">Программа</a>', 'programme navigation');
expect(html, 'href="#cases" data-nav-target="cases">Видео</a>', 'video navigation');
expect(html, 'href="#letters" data-nav-target="letters">Отзывы</a>', 'reviews navigation');
expect(html, '/yubiley-assets/header-nav.css?v=20261009d', 'header navigation stylesheet');
expect(html, '/yubiley-assets/header-nav.js?v=20261009d', 'header navigation behavior');
expect(html, 'от 135 000 ₽', 'five-hour price');
expect(html, 'от 155 000 ₽', 'six-hour price');
expect(html, 'от 315 000 ₽', 'cover-band total');
expect(html, 'Кавер-группа в смете — от 160 000 ₽', 'cover-band breakdown');
expect(html, '<span>Доп. час</span>', 'extension label');
expect(html, 'Что входит', 'package disclosure');
expect(html, 'Выбрать дату', 'date action');
expect(html, '<p class="contact-choice__eyebrow">ТИМУР ГРОМОВ</p>', 'contact owner');
reject(html, 'КАЛЬКУЛЯТОР МЕРОПРИЯТИЙ · ТИМУР ГРОМОВ', 'removed calculator label');
expect(html, 'Праздники проходят, впечатления остаются.', 'corrected punctuation');
expect(html, 'name="event_date"', 'callback date field');
expect(contactScript, 'Дата юбилея:', 'date forwarded to CRM comment');
expect(pricingScript, 'window.tgJubileeSelectedDate', 'pricing-to-contact date bridge');

console.log('PASS: Jubilee pricing, date bridge, contact copy and punctuation contract');
