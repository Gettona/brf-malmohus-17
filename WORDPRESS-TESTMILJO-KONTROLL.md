# WordPress-testmiljo - kontrollista

Testmiljo:

- `https://malmohus17.brfpilot.se/`
- Syfte: efterlikna gamla WordPress-sidan och ova backup, restore, URL-kontroll och senare migrering.

## Kontroll efter backup/restore

Efter varje backup/restore ska detta kontrolleras:

1. Startsidan laddar med HTTP 200.
2. Temat `Malmohus 17 Legacy` ar aktivt.
3. Menyn och vansterspalten syns.
4. De viktigaste undersidorna laddar med HTTP 200.
5. Utvalda PDF:er oppnas fran testdomanens egna `wp-content/uploads`.
6. Utvalda interna lankar gar till ratt sidor.

## PDF-baslinje

Foljande PDF:er fungerar i testmiljon och ska anvandas som kontrollbas efter backup/restore:

- Arsredovisning 2025: `http://malmohus17.brfpilot.se/wp-content/uploads/2026/05/Arsredovisning-2025-08-31-Brf-Malmohus-17_sign.pdf`
- Arsredovisning 2024: `http://malmohus17.brfpilot.se/wp-content/uploads/2026/05/Arsredovisning-2024-08-31-Brf-Malmohus-17_sign.pdf`
- Stadgar: `http://malmohus17.brfpilot.se/wp-content/uploads/2026/05/Stadgar-Brf-Malmohus-nr-17-Registrerades-2016-06-14165992.pdf`
- A-O / ordningsinformation: `http://malmohus17.brfpilot.se/wp-content/uploads/2026/05/221222_A_O_Brf-Malmohus-17_OK.pdf`
- Miljohusinfo: `http://malmohus17.brfpilot.se/wp-content/uploads/2026/05/InfoMiljohus200429_1-sida.pdf`
- Koinformation parkering: `http://malmohus17.brfpilot.se/wp-content/uploads/2026/05/Koinformation_2021.pdf`

Det ar inte nodvandigt att alla gamla historiska PDF-lankar fungerar i testmiljon. Flera gamla `/documents/...`-lankar ar trasiga eller saknas aven i underlaget. For backup/restore-testet racker det att representativa PDF:er ovan fungerar.

## Interna lankar att kontrollera

Foljande rena URL:er fungerar och ska fortsatta fungera efter backup/restore:

- Bilder: `https://malmohus17.brfpilot.se/bilder/`
- Kontakt: `https://malmohus17.brfpilot.se/kontakt/`
- Nyhetsarkiv: `https://malmohus17.brfpilot.se/nyhetsarkiv/`
- Ekonomi: `https://malmohus17.brfpilot.se/ekonomi/`
- Garage/parkering: `https://malmohus17.brfpilot.se/garage-parkering/`
- Miljohus: `https://malmohus17.brfpilot.se/hemsidan/`

## Atgardade lankproblem fran importen

Gamla startsidan innehaller nagra importerade lankar med gamla WordPress-ID:n:

- `bildarkiv` pekar pa `https://malmohus17.brfpilot.se/?page_id=38`
- `e-mail.` pekar pa `https://malmohus17.brfpilot.se/?page_id=42`

Dessa gamla ID-lankar ger 404 i testmiljon eftersom sid-ID:n inte blir samma efter import. De har darfor andrats manuellt i WordPress:

- `bildarkiv` ska peka pa `/bilder/`
- `e-mail.` ska peka pa `/kontakt/`

Kontroll 2026-05-11:

- `bildarkiv` pa startsidan leder till `https://malmohus17.brfpilot.se/bilder/`
- `e-mail.` pa startsidan leder till `https://malmohus17.brfpilot.se/kontakt/`
- Bada svarar med HTTP 200.

## Rekommenderad backup/restore-provning

1. Ta backup av WordPress-testmiljon.
2. Aterstall backupen i samma eller ny testmiljo.
3. Kontrollera startsida, tema, meny och vansterspalt.
4. Kontrollera PDF-baslinjen ovan.
5. Kontrollera interna lankar ovan.
6. Kontrollera att inga kontroll-PDF:er ger 404.
