# WordPress-redaktorsflode

Mal:

- Styrelse/redaktorer ska kunna logga in i WordPress.
- De ska kunna skapa nyheter/inlagg, ladda upp PDF:er/bilder och uppdatera utvalt innehall.
- De ska inte kunna andra UX, tema, navigation, plugins eller tekniska installningar.
- Next/Vercel ska vara publik frontend.

## Nuvarande testlage

- Publik Next-sida: `https://malmohus17.brfpilot.se/`
- WordPress backup/admin-test: `https://restore.malmohus17.brfpilot.se.brfpilot.se/`
- Backup/restore ar bevisat med tema, sidor, lankar och PDF:er.

Obs: Just nu visar Next-sidan fortfarande statisk data fran koden. WordPress kan anvandas for redaktorstest, men nya WordPress-inlagg syns inte automatiskt i Next forran vi bygger CMS-kopplingen.

## Rekommenderade roller

### Administrator

For tekniskt ansvarig.

Far:

- hantera tema
- hantera plugins
- hantera backup/restore
- hantera anvandare
- andra installningar

Ska endast ges till tekniskt ansvarig, inte vanlig styrelse-redaktor.

### Redaktor

For styrelsepersoner som ska publicera innehall.

Far:

- skapa och redigera nyheter/inlagg
- skapa och redigera sidor om vi tillater det
- ladda upp bilder och PDF:er
- hantera publicerat innehall

Ska inte:

- andra tema
- installera plugins
- andra menyer/layout
- andra tekniska installningar

### Forfattare

Valfri lagre roll for personer som bara ska skriva egna nyheter.

Far:

- skapa egna inlagg
- ladda upp media om rollen/plugin tillater det

## Testanvandare att skapa

Skapa minst dessa i WordPress:

| Anvandare | Roll | Syfte |
| --- | --- | --- |
| `styrelse-redaktor` | Redaktor | Testa normalt styrelseflode |
| `nyhetsforfattare` | Forfattare | Testa begransat nyhetsflode |

Anvand starka losenord och dela inte riktiga losenord i projektfiler eller chatt.

## Testfall for redaktorer

Kor dessa test med `styrelse-redaktor`:

1. Logga in i WordPress-admin.
2. Skapa ett nytt inlagg med rubrik `Testnyhet - redaktor`.
3. Lagg in brodtext, bild och en PDF-lank.
4. Publicera inlagget.
5. Kontrollera att inlagget syns i WordPress.
6. Ladda upp en ny PDF i Media.
7. Kopiera PDF-lanken och kontrollera att den oppnar med HTTP 200.
8. Redigera en befintlig sida, till exempel Kontakt, och spara.
9. Kontrollera att redaktoren inte kan installera plugins eller andra tema.

Kor dessa test med `nyhetsforfattare`:

1. Logga in i WordPress-admin.
2. Skapa ett eget inlagg.
3. Kontrollera om anvandaren kan publicera direkt eller bara skicka for granskning.
4. Kontrollera att anvandaren inte kan redigera andra anvandares innehall.
5. Kontrollera att anvandaren inte kan andra sidor, tema, plugins eller installningar.

## Innehallstyper for forsta CMS-kopplingen

Forsta tekniska kopplingen mellan WordPress och Next bor vara liten:

1. Nyheter
   - WordPress `posts`
   - titel
   - datum
   - utdrag
   - brodtext
   - utvald bild

2. Dokument/PDF
   - WordPress Media eller enkel dokument-sida
   - titel
   - kategori
   - PDF-url

3. Kontaktuppgifter
   - kan borja som vanlig WordPress-sida
   - senare battre som strukturerade falt

## Krav innan styrelsedemo

Innan detta visas som fungerande redaktorlosning ska vi kunna visa:

- en redaktor kan logga in
- redaktor kan skapa en nyhet i WordPress
- redaktor kan ladda upp en PDF
- Next-sidan hamtar minst en testnyhet fran WordPress API
- Next-sidan behaller samma UX/design
- backup/restore fungerar efter att redaktorsinnehall har skapats

## Rekommenderad nasta tekniska etapp

Bygg en liten CMS-proof-of-concept i Next:

- Las WordPress REST API fran restore/test-WordPress.
- Skapa en intern test-route i Next, till exempel `/cms-test`.
- Visa senaste WordPress-inlagg och en PDF/media-lank.
- Behall ordinarie nyhetssida statisk tills testet ar godkant.

Nar detta fungerar kan vi stegvis ersatta statisk `data/news.ts` och dokumentdata med WordPress-data.
