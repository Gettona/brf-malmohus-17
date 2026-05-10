# Projektlogg - BRF Malmohus 17

## Etapp 0 - Stabil grundversion

- Next.js-projekt med TypeScript, Tailwind CSS och App Router.
- Boendeportal med startsida, kontakt, felguide, dokumentbank, nyheter och maklarsida.
- Statisk data i TypeScript-filer och ingen backend.
- Dokumentindex genereras vid build via `scripts/generateDocumentSearchIndex.mjs`.

## Kommande etapper

- Etapp 1: Stabiliseringskontroll och lokalt dev-flode.
- Etapp 2: UX-stabilisering och innehallspolish.
- Etapp 3: Vercel-preview, lanseringsplan och WordPress som CMS.

## Etapp 1 - Stabiliseringskontroll

- `npm run dev` stoppar nu port 3000 och rensar `.next` innan Next startas.
- `npm run check:dev` kontrollerar huvudroutes och verifierar att faktisk Next CSS laddas med HTTP 200.
- Undvik dold bakgrundsstart for vanligt utvecklingsarbete. Kor `npm run dev` i en terminal sa servern ager port 3000 tydligt.

## Etapp 2 - UX-stabilisering

- Vercel-preview ar kontrollerad pa huvudroutes.
- Synliga prototyptexter har tagits bort fran publika vyer.
- Dev-kontroll verifierar nu faktisk CSS, inte bara CSS-lank i HTML.

## Etapp 3 - CMS och lanseringsplan

- WordPress ska pa sikt behallas som headless CMS/admin.
- Next.js/Vercel ersatter den publika WordPress-frontenden.
- Agarna ska kunna uppdatera nyheter, dokument, bilder och enklare innehall utan att kunna andra UX.
- Se `CMS-PLAN.md`, `LANSERINGSPLAN.md` och `URL-MAPPNING.md`.
