# WordPress CMS-plugin

Detta plugin används för att göra delar av BRF Malmöhus 17 redigerbara i WordPress utan att styrelsen ändrar webbplatsens UX, navigation eller layout.

## Installera pluginet

1. Logga in på `https://admin.brfpilot.se/wp-admin`.
2. Gå till `Tillägg` -> `Lägg till nytt`.
3. Klicka på `Ladda upp tillägg`.
4. Välj filen:
   `wordpress-tools/dist/malmohus17-cms-single-file.zip`
5. Klicka på `Installera nu`.
6. Klicka på `Aktivera`.

## Redigera kontaktuppgifter

Efter aktivering finns sidan:

`Inställningar` -> `BRF kontaktuppgifter`

Där kan administratören ändra:

- Styrelsens e-post
- Telefon
- Expeditionens adress
- Telefontid
- Riksbyggen telefon
- Vaktmästare telefon
- Felanmälan-länk
- Mäklare e-post

## Redigera styrelse

Efter aktivering finns menyn:

`Styrelse`

Varje styrelsemedlem läggs in som ett eget objekt:

- Rubrik = namn
- Roll = exempelvis ordförande, ledamot eller suppleant
- Telefon = valfritt
- Utvald bild = valfri porträttbild
- Sidordning = kan användas för sortering

Om en styrelsemedlem finns både i WordPress och i den befintliga Vercel-datan matchas personen på namn. Tomma WordPress-fält använder då befintlig roll, telefon och bild som fallback tills redaktören fyller i dem i WordPress.

För att byta bild:

1. Öppna styrelsemedlemmen i WordPress.
2. Välj `Utvald bild`.
3. Ladda upp eller välj en bild från mediebiblioteket.
4. Uppdatera posten.

## Redigera expeditionstider

Efter aktivering finns menyn:

`Expeditionstider`

Varje öppet datum läggs in som ett eget objekt:

- Datum = maskinläsbart datum
- Visningstext = exempelvis `11 maj`
- Rubrik = kan vara samma som visningstexten
- Sidordning = kan användas för sortering

## Redigera ansvar och roller

Efter aktivering finns menyn:

`Ansvar och roller`

Varje ansvarsområde läggs in som ett eget objekt:

- Rubrik = ansvarsområdets titel
- Personer = en person per rad
- Telefonnummer är valfritt och skrivs efter `|`

Exempel:

```text
Anette Jensen
Marcus Odelstig | 0760-273559
```

## Redigera kontaktsidans texter

Efter aktivering finns sidan:

`Inställningar` -> `BRF kontaktsida`

Där kan administratören redigera kontaktsidans synliga texter:

- Sidrubrik och ingress
- Rubriker för e-post, telefon och expedition
- Styrelsesektionens rubriker och ingress
- Ansvarssektionens rubriker
- Expeditionens rubriker och öppettidstext
- Kontaktformulärets rubriker, hjälptrader, fältetiketter, felmeddelanden och knapptext

Tomma fält använder fortfarande standardtexten från Vercel/Next. Det gör att sidan inte går sönder om ett fält saknas i WordPress.

## API som Next.js ska läsa

När pluginet är installerat ska dessa endpoints finnas:

- `https://admin.brfpilot.se/wp-json/brf/v1/contact`
- `https://admin.brfpilot.se/wp-json/brf/v1/contact-page-texts`
- `https://admin.brfpilot.se/wp-json/wp/v2/brf-board-members?_embed=1&orderby=menu_order&order=asc`
- `https://admin.brfpilot.se/wp-json/wp/v2/brf-office-dates?orderby=menu_order&order=asc`
- `https://admin.brfpilot.se/wp-json/wp/v2/brf-responsibility-groups?orderby=menu_order&order=asc`

`/kontakt` i Next.js läser dessa endpoints med fallback till befintliga TypeScript-data.
