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

## Etapp 4 - WordPress-testmiljo

- Testdomanen `brfpilot.se` anvands for migreringsovning.
- `malmohus17.brfpilot.se` ar uppsatt som WordPress-testkopia av gamla sidan.
- Ett enkelt legacy-tema och importerad sidstruktur finns for att efterlikna gamla WordPress-sidan.
- Representativa PDF:er och interna lankar dokumenteras som kontrollbas for backup/restore.
- Se `WORDPRESS-TESTMILJO-KONTROLL.md`.

## Etapp 5 - Testad lanseringskedja

- `malmohus17.brfpilot.se` pekar nu mot Vercel/Next och fungerar som publik testlansering.
- Restore-miljon ligger kvar som WordPress-backup/testyta.
- Backup/restore ar verifierat med tema, sidor, interna lankar och representativa PDF:er.
- DNS-byte fran WordPress/Simply till Vercel ar verifierat pa testdoman.

## Etapp 6 - Redaktorsflode och CMS-koppling

- Nasta steg ar att testa WordPress-roller for styrelse/redaktorer.
- Redaktorer ska kunna skapa nyheter, ladda upp PDF:er/bilder och uppdatera utvalt innehall.
- Next-sidan visar annu statisk data och behover en separat CMS-proof-of-concept innan WordPress-innehall visas publikt.
- Se `WORDPRESS-REDAKTORSFLODE.md` och `CMS-MAPPNING.md`.

## Etapp 7 - WordPress-nyheter i Next

- `admin.brfpilot.se` anvands som WordPress CMS/admin.
- Startsidan och `/for-boende/nyheter` hamtar nu WordPress-inlagg som nyheter.
- Om WordPress API inte svarar anvands befintlig statisk `data/news.ts` som fallback.
- `/cms-test` finns kvar som intern kontrollvy for WordPress-inlagg och PDF-media.
