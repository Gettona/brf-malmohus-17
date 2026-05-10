# Lanseringsplan - BRF Malmohus 17

## Mal

Byta ut den gamla WordPress-hemsidans publika frontend mot den nya Next.js/Vercel-sidan utan att bryta besokares lankar, dokument, e-post eller redaktorernas mojlighet att uppdatera innehall.

## Nulage

- Ny publik frontend finns pa Vercel.
- Koden finns i GitHub-repot `Gettona/brf-malmohus-17`.
- Nuvarande produktion ar WordPress.
- WordPress ska pa sikt behallas som CMS/admin, men inte som publik frontend.

## Miljoer

| Miljo | Syfte |
| --- | --- |
| Lokal | Utveckling och snabb kontroll |
| Vercel Preview | Release candidate och granskning |
| Vercel Production | Ny publik hemsida |
| WordPress Admin/CMS | Innehallsadministration |
| Gammal WordPress frontend | Rollback/backup under overgangen |

## Releasekontroll innan domanbyte

- `npm run build` gar igenom.
- `npm run lint` ar kant; nuvarande kvarvarande fel ar `next-env.d.ts`.
- Vercel-preview svarar 200 pa huvudroutes.
- Faktisk CSS-fil laddas med HTTP 200.
- Bilder laddas.
- PDF:er laddas.
- Mobil och desktop ar visuellt kontrollerade.
- Inga synliga placeholder- eller TODO-texter i publika vyer.
- Kontaktuppgifter och dokument ar godkanda av foreningen.

## Viktiga routes att testa

- `/`
- `/for-boende`
- `/for-boende/nyheter`
- `/for-boende/parkering`
- `/for-boende/lokaler-och-bokning`
- `/for-boende/miljohus-och-avfall`
- `/for-boende/bredband-tv-el`
- `/for-boende/underhall-genom-aren`
- `/for-boende/aktiviteter`
- `/kontakt`
- `/felguide`
- `/dokument`
- `/fraga`
- `/maklare`
- `/sok?q=parkering`

## DNS och doman

Innan skarpt byte:

1. Identifiera DNS-leverantor.
2. Dokumentera nuvarande DNS-poster.
3. Kontrollera sarskilt MX-poster for e-post.
4. Andra inte e-postposter vid hemsidebyte.
5. Sank TTL i god tid om DNS-leverantoren tillater det.
6. Lagg domanen i Vercel.
7. Folj Vercels instruktioner for A/CNAME-poster.

## WordPress efter byte

WordPress bor inte stangas av direkt.

Rekommenderat:

- Behall WordPress som CMS/admin.
- Separera admin/API fran publik frontend.
- Exempel: `admin.malmohus17.se` eller `cms.malmohus17.se`.
- Gamla WordPress-frontenden behalls som rollback tills nya sidan ar verifierad.

## Rollback-plan

Om nagot gar fel efter domanbyte:

1. Peka DNS tillbaka till gamla WordPress-hostingen.
2. Behall gamla hostingkontot aktivt under overgangsperioden.
3. Dokumentera vilka DNS-poster som andrades.
4. Kontrollera att e-post aldrig paverkas av rollback.

## Efter lansering

- Testa live-doman direkt efter DNS-slag.
- Kontrollera startsida, kontakt, dokument och nyheter.
- Testa PDF:er och bilder.
- Kontrollera Google Search Console om tillgang finns.
- Skapa redirects for gamla URL:er som far trafik.
- Overvaka inkommande rapporter fran boende och maklare.
