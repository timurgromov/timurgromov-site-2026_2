export const weddingPackages = [
  {
    key: 'chamber', label: 'Камерная свадьба', guests: 'До 45 гостей',
    duration: 5, extension: 20_000, base: 135_000, liveMusic: false,
  },
  {
    key: 'classic', label: 'Классическая свадьба', guests: 'От 46 гостей',
    duration: 6, extension: 25_000, base: 155_000, liveMusic: false,
  },
  {
    key: 'music', label: 'С живой музыкой', guests: 'От 46 гостей',
    duration: 6, extension: 25_000, base: 155_000, liveMusic: true,
  },
] as const;

export const weddingDateTiers = {
  regular: { label: 'Обычные даты', note: 'Сентябрь–июнь; вс–чт в июле и августе', percent: 100 },
  summer: { label: 'Летние пятницы и субботы', note: 'Июль и август', percent: 110 },
  special: { label: 'Красивые даты', note: 'С воскресенья по четверг', percent: 115 },
  peak: { label: 'Пиковые даты', note: 'Красивая дата в пятницу или субботу', percent: 125 },
} as const;

type WeddingDateTier = (typeof weddingDateTiers)[keyof typeof weddingDateTiers];
type WeddingPackage = (typeof weddingPackages)[number];

const specialDates = new Set(['2027-07-07', '2027-08-08', '2027-08-27']);
// The base includes two vocalists. Expanded lineups and the venue rider are quoted separately.
const baseMusicFee = 185_000;
const musicFeesByDate: Readonly<Record<string, number>> = {};
const rubles = new Intl.NumberFormat('ru-RU');
const moscowCalendar = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit',
});
const russianCalendar = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
});

export function formatWeddingRubles(value: number) {
  return rubles.format(value) + ' ₽';
}

export function weddingToday(now = new Date()) {
  const parts = moscowCalendar.formatToParts(now);
  return ['year', 'month', 'day'].map((part) => parts.find(({ type }) => type === part)?.value).join('-');
}

function parseCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(value + 'T00:00:00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

export function weddingPackagePrice(weddingPackage: WeddingPackage, tier: WeddingDateTier, date = '') {
  const roundedBase = Math.round(weddingPackage.base * tier.percent / 500_000) * 5_000;
  return roundedBase + (weddingPackage.liveMusic ? (musicFeesByDate[date] ?? baseMusicFee) : 0);
}

export function weddingQuote(value: string, today = weddingToday()) {
  const date = parseCalendarDate(value);
  if (!date || value < today) return null;

  const weekday = date.getUTCDay();
  const peakWeekday = weekday === 5 || weekday === 6;
  const summerMonth = date.getUTCMonth() === 6 || date.getUTCMonth() === 7;
  const tier = specialDates.has(value)
    ? (peakWeekday ? weddingDateTiers.peak : weddingDateTiers.special)
    : (summerMonth && peakWeekday ? weddingDateTiers.summer : weddingDateTiers.regular);

  return {
    dateLabel: russianCalendar.format(date),
    prices: weddingPackages.map((pack) => weddingPackagePrice(pack, tier, value)),
  };
}
