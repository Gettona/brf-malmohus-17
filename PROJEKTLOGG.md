# Projektlogg - BRF Malmohus 17

## Etapp 0 - Stabil grundversion

- Next.js-projekt med TypeScript, Tailwind CSS och App Router.
- Boendeportal med startsida, kontakt, felguide, dokumentbank, nyheter och maklarsida.
- Statisk data i TypeScript-filer och ingen backend.
- Dokumentindex genereras vid build via `scripts/generateDocumentSearchIndex.mjs`.

## Kommande etapper

- Etapp 1: Stabiliseringskontroll och lokalt dev-flode.
- Etapp 2: Innehall och struktur.
- Etapp 3: Publicering, doman och driftflode.

## Etapp 1 - Stabiliseringskontroll

- `npm run dev` stoppar nu port 3000 och rensar `.next` innan Next startas.
- `npm run check:dev` kontrollerar huvudroutes och verifierar att faktisk Next CSS laddas med HTTP 200.
- Undvik dold bakgrundsstart for vanligt utvecklingsarbete. Kor `npm run dev` i en terminal sa servern ager port 3000 tydligt.
