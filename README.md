# BRF Malmöhus 17

Modern första version av en webbplats och boendeportal för BRF Malmöhus 17. Projektet är byggt med Next.js, TypeScript, Tailwind CSS och App Router.

## Funktioner

- Startsida med hero, sökguide, snabblänkar, nyheter och händelser
- För boende-sida med praktiska informationskort
- Interaktiv felguide med rekommendationer och jourinformation
- Dokumentbank med sök och kategorifilter
- Fråga Malmöhus 17 med statisk sökning i FAQ, stadgar och trivselregler
- Kalenderlista med placeholder för "Lägg till i kalender"
- Mäklarsida med föreningsfakta och dokument
- Kontaktsida med öppettider, kontaktuppgifter och formulär
- Exempeldata i separata filer under `data/`

## Installera

```bash
npm install
```

## Kör lokalt

```bash
npm run dev
```

Öppna sedan `http://localhost:3000`.

## Bygg för produktion

```bash
npm run build
npm run start
```

## Ändra innehåll

Det mesta synliga innehållet ligger i separata datafiler:

- `data/news.ts` för nyheter
- `data/events.ts` för kalenderhändelser
- `data/documents.ts` för dokumentbanken
- `data/faq.ts` för boendeinformationen
- `data/contact.ts` för kontaktuppgifter
- `data/faultGuide.ts` för felguidens rekommendationer
- `data/broker.ts` för mäklarfakta
- `data/documentSearchIndex.ts` för sökbart innehåll från PDF-dokument
- `data/smartGuideFaq.ts` för vanliga svar i Fråga Malmöhus 17

Byt texter, datum, länkar och kategorier i dessa filer. Komponenterna läser datan därifrån, så en administratör eller utvecklare kan uppdatera innehållet utan att ändra layouten.

## Dokument och filer

Placeholder-filer finns i `public/placeholder/`. Lägg riktiga PDF:er i `public/` eller koppla senare dokumenten till ett CMS. Uppdatera därefter `href` i `data/documents.ts`.

PDF:er som ska vara sökbara i Fråga Malmöhus 17 ligger i `public/documents/`. Första versionen använder ett manuellt index i `data/documentSearchIndex.ts`. När automatisk PDF-extraktion kopplas på senare kan indexet genereras vid build-tid.

Sökindexet genereras nu med:

```bash
npm run generate:document-index
```

`npm run build` kör samma generator automatiskt före Next.js bygger sidan. Generatorn läser PDF:erna i `public/documents/`, extraherar text per sida och skriver `data/documentSearchIndex.ts`. Några kuraterade toppträffar finns kvar i generatorn för viktiga A-Ö-ord där PDF-rubriker kan vara svåra att tolka automatiskt.

## Framtida kopplingar

Koden innehåller TODO-kommentarer för:

- CMS eller databas för dynamiskt innehåll
- e-post/ärendehantering för kontaktformuläret
- autentisering för boendeportal och skyddade dokument

## Deploy till Vercel

1. Lägg projektet i ett Git-repository.
2. Importera repositoryt i Vercel.
3. Välj Next.js som framework preset.
4. Använd standardinställningar:
   - Build command: `npm run build`
   - Output: `.next`
5. Lägg till miljövariabler när e-post, CMS eller autentisering kopplas på.

## Struktur

```text
app/          Sidor med App Router
components/   Återanvändbara UI-komponenter
data/         Adminvänlig exempeldata
public/       Bilder och placeholder-dokument
```
