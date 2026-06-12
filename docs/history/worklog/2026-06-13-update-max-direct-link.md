# 2026-06-13 - Update MAX contact link to direct max.ru URL

## Scope

- `src/site/home-data.ts`

## Context

Пользователь предоставил финальную прямую ссылку MAX и указал, что CTA `Написать в MAX` на сайте оставался без нужного адреса.

## Changes

- `maxContactUrl` заменен с `https://clck.ru/3RRXHX` на прямой URL `https://max.ru/u/f9LHodD0cOIvnExDiltaWpLlPOHIr5y0qyb51SeYWFVvQJP5FUivyzS2fRM?clckid=c487e7dc`.
- `src/pages/materials.astro` уже использовал тот же прямой MAX URL, поэтому не менялся.
- Legacy `clck.ru` оставлен только в source-transform строке, которая переписывает старые Tilda-export ссылки на актуальный `maxContactUrl`, и в исторических worklog-записях.

## Verification

- `npm run verify:contacts` - passed после повторного запуска с escalated permissions, потому что sandbox заблокировал local preview bind.
- Contact verifier подтвердил новый MAX href для desktop 1911x1064, desktop 1440x900 и mobile 390x844.

## Result

Runtime MAX-ссылки главной страницы теперь берутся из одного source-of-truth и ведут на прямой `max.ru` URL.
