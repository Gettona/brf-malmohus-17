# CMS-plan - BRF Malmohus 17

## Mal

Den nya Next.js-sidan ska ersatta den gamla WordPress-hemsidans publika frontend, men agarna ska fortfarande kunna uppdatera innehall sjalva. WordPress bor darfor leva vidare som ett begransat headless CMS, medan design, navigation och UX ligger last i Next.js.

## Princip

- Next.js/Vercel visar den publika hemsidan.
- WordPress anvands som adminpanel for redaktorer.
- Redaktorer kan skapa och uppdatera innehall.
- Redaktorer ska inte kunna andra layout, komponenter, farger, navigation eller UX.
- Innehall hamtas strukturerat fran WordPress via REST API eller GraphQL.

## Redigerbart i WordPress

| Omrade | Nuvarande kalla | CMS-typ |
| --- | --- | --- |
| Nyheter | `data/news.ts` | Inlagg eller custom post type `nyhet` |
| Nyhetsevent | `data/news.ts` `event` | Custom fields pa nyhet |
| Dokument/PDF | `data/documents.ts`, `public/documents` | Custom post type `dokument` + media |
| Kontaktuppgifter | `data/contact.ts` | Options-sida/global settings |
| Styrelse | `data/boardMembers.ts` | Custom post type eller repeater field |
| Expeditionstider | `data/officeHours.ts` | Repeater field |
| Aktiviteter | `data/activities.ts` | Custom post type eller repeater field |
| Underhallshistorik | `data/maintenanceHistory.ts` | Custom post type eller repeater field |
| Bredband/TV/el | `data/residentPages.ts` | Strukturerade sidfalt |
| Parkering | `data/parking.ts` | Strukturerade sidfalt |
| FAQ/fraga | `data/smartGuideFaq.ts` | Custom post type `faq` |
| Felguide | `data/faultGuide.ts` | Strukturerade sidfalt, helst begransat till ansvariga |

## Last i kod

- Sidstruktur och routes.
- Header, footer och navigation.
- Komponentdesign och layout.
- Farger, typografi och spacing.
- Kortmallar for nyheter, dokument, kontakt och boendesidor.
- Sokrutiner och filtrerings-UX.

## Rekommenderad WordPress-modell

Anvand befintlig WordPress som CMS om den ar frisk och administrativt tillganglig.

Rekommenderade byggblock:

- WordPress REST API eller WPGraphQL.
- Advanced Custom Fields, eller motsvarande faltlosning.
- Begransade redaktorsroller.
- Inga sidbyggare for publika layouts.
- Media Library for PDF:er och bilder.

## Roller

- Administrator: teknisk forvaltning av WordPress och integration.
- Editor: far skapa nyheter, dokument och uppdatera godkanda innehallsfalt.
- Contributor/Author: endast vid behov for nyheter.

Redaktorer ska inte ha tillgang till att andra tema, plugins, menyer eller layout om det inte behovs.

## Stegvis migration

1. Inventera befintlig WordPress.
   - Sidor.
   - Inlagg.
   - Media/PDF:er.
   - Kategorier.
   - Anvandare och roller.

2. Skapa CMS-schema.
   - Definiera post types och falt.
   - Mappa varje nuvarande `data/*.ts`-fil till CMS eller fortsatt kod.

3. Bygg dataadapter i Next.js.
   - En modul per innehallstyp.
   - Fallback till nuvarande statiska data under migrationen.
   - Tydlig typning i TypeScript.

4. Koppla nyheter och dokument forst.
   - Detta ar de viktigaste sjalvservice-flodena.
   - Dokument ska kunna ha titel, kategori, ar, beskrivning och PDF-fil.

5. Koppla kontakt/styrelse/oppettider.
   - Mindre risk, men hog praktisk nytta.

6. Testa staging.
   - Next.js preview mot WordPress staging eller kopia.
   - Kontrollera att redaktor kan skapa innehall utan att paverka UX.

7. Lansera.
   - Publik doman pekar till Vercel.
   - WordPress admin/API ligger kvar pa separat adminadress.

## Viktiga beslut innan implementation

- Ska WordPress ligga kvar pa nuvarande hosting, eller flyttas till separat CMS-host?
- Ska admin ligga pa `admin.malmohus17.se`, `cms.malmohus17.se` eller annan adress?
- Ska API vara publikt lasbart, eller skyddas med token och ISR/webhooks?
- Vilka personer ska ha redaktorsroller?
- Vilka gamla WordPress-sidor ska redirectas till nya routes?

## Rekommenderad startordning

1. Behall nuvarande statiska sida som release candidate.
2. Skapa `URL-MAPPNING.md` for gamla till nya sidor.
3. Inventera WordPress-admin och media.
4. Koppla nyheter och dokument till WordPress i en separat etapp.
5. Lat redaktorer testa sjalvservice pa staging innan skarp doman flyttas.

Detaljerad mappning mellan befintliga `data/*.ts`-filer, WordPress-innehallstyper och Next-routes finns i `CMS-MAPPNING.md`.
