# CMS-mappning - WordPress till Next

Malet ar att WordPress ska vara en enkel redaktorsyta medan Next/Vercel fortsatter aga UX, layout, navigation och design.

Publik sida:

- `https://malmohus17.brfpilot.se`

CMS/admin:

- `https://admin.brfpilot.se/wp-admin`

## Principer

- WordPress ska lagra innehall, inte layout.
- Redaktorer ska kunna skapa och uppdatera texter, nyheter, PDF:er och bilder.
- Next ska hamta strukturerad data och rendera den i befintliga komponenter.
- Alla publika routes, menyer, sidlayout, kortdesign, filter och interaktioner ska ligga kvar i kod.
- Varje CMS-koppling ska ha fallback till nuvarande statiska TypeScript-data tills funktionen ar bevisad.

## Prioriterad ordning

1. Nyheter
2. Dokument/PDF
3. Kontakt, expedition och styrelse
4. FAQ / Fraga Malmohus 17
5. Aktiviteter och underhall genom aren
6. Boendesidor med mer strukturerad text
7. Felguide

Denna ordning minskar risk: forst flyttar vi innehall som ar naturligt redaktionellt, sedan mer strukturerade och verksamhetskritiska sidor.

## Mappning

| Next-omrade | Nuvarande kalla | WordPress-modell | Redigerbart for styrelse | Rekommendation |
| --- | --- | --- | --- | --- |
| Nyheter | `data/news.ts` | Inlagg, kategori `Nyhet` eller post type `nyhet` | Ja | Koppla forst |
| Nyhetsevent/kalenderknapp | `data/news.ts` `event` | Custom fields pa nyhet | Ja, begransat | Koppla efter vanliga nyheter |
| Dokumentbank | `data/documents.ts` + `public/documents` | Post type `dokument` + Media Library | Ja | Koppla som etapp 2 |
| Kontaktuppgifter | `data/contact.ts` | Options-sida eller sida `Kontaktuppgifter` med falt | Ja | Koppla efter dokument |
| Styrelse | `data/boardMembers.ts` | Post type `styrelsemedlem` | Ja | Koppla efter kontakt |
| Expeditionstider | `data/officeHours.ts` | Repeater/options-falt | Ja | Koppla efter kontakt |
| FAQ/smart guide | `data/smartGuideFaq.ts` | Post type `faq` | Ja | Koppla efter kontakt/styrelse |
| Aktiviteter | `data/activities.ts` | Post type `aktivitet` | Ja | Koppla nar nyheter/dokument ar stabilt |
| Underhall genom aren | `data/maintenanceHistory.ts` | Post type `underhall` | Ja | Enkel koppling, lag risk |
| Parkering | `data/parking.ts` | CMS-sida `parkering` med strukturerade falt | Delvis | Hall layout last |
| Lokaler/bokning | `data/residentPages.ts` | CMS-sida `lokaler` med sektioner och bilder | Delvis | Hall layout last |
| Miljohus/avfall | `data/residentPages.ts` | CMS-sida `miljohus` med sektioner/listor | Delvis | Hall layout last |
| Bredband/TV/el | `data/residentPages.ts` | CMS-sida `bredband-tv-el` med sektioner/listor | Delvis | Hall layout last |
| Felguide | `data/faultGuide.ts` | Post type eller options for arendetyper | Ja, men forsiktigt | Senare, hogre risk |
| Maklarsida | `data/broker.ts` | CMS-sida eller options-falt | Delvis | Koppla efter dokument |
| Navigation/header/footer | Komponenter | Kod | Nej | Ska vara last |

## Innehallstyper

### 1. Nyheter

WordPress-modell:

- Vanliga WordPress-inlagg till en borjan.
- Kategori: `Nyhet`, `Boende`, `Ekonomi`, `Fastighet`, `Aktivitet`, `Gemenskap`.
- Utvald bild anvands som nyhetsbild.

Falt:

- Titel
- Publiceringsdatum
- Kategori
- Utdrag
- Brodtext
- Utvald bild
- Valfri lank till intern sida
- Event start
- Event slut
- Event plats

Next-map:

- `/`
  - visar de tre senaste nyheterna
- `/for-boende/nyheter`
  - visar alla nyheter
- `NewsCard`
  - fortsatter aga designen

Forsta implementation:

- Las WordPress-inlagg via REST API.
- Konvertera till befintlig `NewsItem`-form.
- Fallback till `data/news.ts` om WordPress API inte svarar.

### 2. Dokument/PDF

WordPress-modell:

- Rekommenderad post type: `dokument`
- PDF laddas upp i Media Library.
- Dokumentposten pekar pa PDF-filen.

Falt:

- Dokumenttitel
- Kategori
- Ar/period
- Beskrivning
- PDF-fil
- Publik/arkivstatus

Kategorier:

- Stadgar
- Arsredovisningar
- Ordningsregler
- Blanketter
- Renovering
- Maklare
- Parkering
- Ekonomi

Next-map:

- `/dokument`
  - filter och sok ligger kvar i Next
  - dokumentdata hamtas fran WordPress

Forsta implementation:

- Borja med PDF:er fran Media Library eller enkel `dokument`-post type.
- Fallback till `data/documents.ts`.
- Uppdatera dokumentindexet sa WordPress-dokument kan sokas.

### 3. Kontakt, expedition och styrelse

WordPress-modell:

- Kontaktuppgifter: options-sida eller privat sida med strukturerade falt.
- Styrelse: post type `styrelsemedlem`.
- Expeditionstider: repeater/options-falt.

Kontaktfalt:

- Foreningsnamn
- Adress
- E-post till styrelsen
- Telefon
- Expeditionens adress
- Telefontider
- Riksbyggen telefon/lank
- Vaktmastare telefon
- Felanmalan-lank
- Maklar-e-post

Styrelsefalt:

- Namn
- Roll
- Telefon
- Bild
- Sorteringsordning
- Aktiv/inaktiv

Next-map:

- `/kontakt`
- `/maklare`
- Footer vid behov

### 4. FAQ / Fraga Malmohus 17

WordPress-modell:

- Post type `faq`

Falt:

- Fraga
- Svar
- Intern lank
- Sokord/keywords
- Kategori
- Sorteringsordning

Next-map:

- `/fraga`
- smart guide
- sokresultat

### 5. Aktiviteter

WordPress-modell:

- Post type `aktivitet`

Falt:

- Titel
- Schema/tid
- Beskrivning
- Kontaktperson
- Telefon
- Aktiv/inaktiv

Next-map:

- `/for-boende/aktiviteter`

### 6. Underhall genom aren

WordPress-modell:

- Post type `underhall`

Falt:

- Period/ar
- Titel
- Detaljer
- Sorteringsordning

Next-map:

- `/for-boende/underhall-genom-aren`

### 7. Boendesidor

Galler:

- `/for-boende/parkering`
- `/for-boende/lokaler-och-bokning`
- `/for-boende/miljohus-och-avfall`
- `/for-boende/bredband-tv-el`

WordPress-modell:

- En CMS-sida per omrade.
- Strukturerade falt for rubrik, ingress, sektioner, listor, bilder och lankar.

Viktigt:

- Redaktoren ska inte bygga layout med block fritt.
- Next ska placera texten i befintliga komponenter.
- Om en sida behover helt ny struktur ska det vara en kodandring, inte redaktorsandring.

## WordPress-installation

Rekommenderade plugin-typer:

- Advanced Custom Fields eller motsvarande faltplugin.
- Eventuellt Custom Post Type UI under uppbyggnad.
- UpdraftPlus for backup.
- Eventuellt ett SMTP-plugin om WordPress ska skicka mail.

Undvik:

- Sidbyggare for publik layout.
- Manga design-/tema-plugins.
- Plugins som andrar frontend-UX.

## Redaktorsflode

Redaktoren ska helst se tydliga val:

- Nyheter
- Dokument
- Styrelse
- Kontaktuppgifter
- FAQ
- Aktiviteter
- Underhall

Redaktoren ska inte behova forsta:

- React
- Next
- Vercel
- GitHub
- Tailwind
- DNS

## Tekniskt genomforande i Next

1. Skapa WordPress-adaptrar i `lib/wordpress.ts`.
2. Skapa typed mappers:
   - `wordpressPostToNewsItem`
   - `wordpressMediaToDocumentItem`
   - `wordpressBoardMemberToBoardMember`
3. Anvand fallback till statisk data.
4. Hall CMS-test route kvar tills allt ar verifierat.
5. Koppla en publik sida i taget.
6. Kontrollera build och Vercel efter varje koppling.

## Publiceringsmodell

Forsta version:

- Next hamtar WordPress-data server-side med revalidate.
- Redaktor publicerar i WordPress.
- Andring syns efter en kort stund.

Senare version:

- WordPress webhook triggar Vercel redeploy eller on-demand revalidation.

## Beslut innan nasta kodetapp

1. Ska vi borja med vanliga WordPress-inlagg for nyheter?
2. Ska dokument vara Media Library direkt eller egen post type `dokument`?
3. Ska vi installera ACF for strukturerade falt?
4. Vilka anvandare ska vara Administrator, Redaktor och Forfattare?

Rekommenderat beslut:

- Borja med vanliga WordPress-inlagg for nyheter.
- Borja med Media Library for PDF-test.
- Installera ACF innan vi flyttar kontakt, styrelse och boendesidor.
- Koppla riktiga nyhetssidan forst, med fallback till `data/news.ts`.
