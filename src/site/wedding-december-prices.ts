// Corporate December 2026 tariffs by day of month, also applied to the 2027 wedding calendar.
export const weddingDecemberPricingYears: readonly number[] = [2026, 2027];

export const weddingDecemberPriceRows = [
  { fromDay: 1, toDay: 3, prices: [145_000, 170_000, 320_000], extension: 20_000 },
  { fromDay: 4, toDay: 5, prices: [155_000, 180_000, 350_000], extension: 25_000 },
  { fromDay: 6, toDay: 6, prices: [145_000, 170_000, 320_000], extension: 20_000 },
  { fromDay: 7, toDay: 10, prices: [155_000, 180_000, 340_000], extension: 20_000 },
  { fromDay: 11, toDay: 12, prices: [175_000, 200_000, 390_000], extension: 25_000 },
  { fromDay: 13, toDay: 13, prices: [155_000, 180_000, 350_000], extension: 20_000 },
  { fromDay: 14, toDay: 17, prices: [175_000, 205_000, 395_000], extension: 25_000 },
  { fromDay: 18, toDay: 19, prices: [200_000, 230_000, 450_000], extension: 25_000 },
  { fromDay: 20, toDay: 20, prices: [175_000, 205_000, 405_000], extension: 25_000 },
  { fromDay: 21, toDay: 24, prices: [190_000, 220_000, 440_000], extension: 25_000 },
  { fromDay: 25, toDay: 26, prices: [220_000, 250_000, 500_000], extension: 25_000 },
  { fromDay: 27, toDay: 28, prices: [190_000, 220_000, 440_000], extension: 25_000 },
  { fromDay: 29, toDay: 30, prices: [210_000, 240_000, 490_000], extension: 25_000 },
  { fromDay: 31, toDay: 31, prices: [280_000, 330_000, 630_000], extension: 35_000 },
] as const;

export function weddingDecemberPriceRow(date: Date) {
  if (date.getUTCMonth() !== 11 || !weddingDecemberPricingYears.includes(date.getUTCFullYear())) return undefined;
  const day = date.getUTCDate();
  return weddingDecemberPriceRows.find(({ fromDay, toDay }) => fromDay <= day && day <= toDay);
}
