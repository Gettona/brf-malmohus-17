# URL-mappning - BRF Malmohus 17

Denna fil anvands for att mappa gamla WordPress-URL:er till nya Next.js-routes innan domanbyte.

## Princip

- Gamla lankar ska inte ge 404 om de har anvants publikt.
- Viktiga gamla dokumentlankar ska antingen fortsatta fungera eller redirectas.
- Nya routes ska vara korta, begripliga och stabila.

## Nya huvudroutes

| Ny route | Syfte |
| --- | --- |
| `/` | Startsida |
| `/for-boende` | Samlad boendeinformation |
| `/for-boende/nyheter` | Nyhetsflode |
| `/for-boende/parkering` | Parkering och garage |
| `/for-boende/lokaler-och-bokning` | Lokaler och bokning |
| `/for-boende/miljohus-och-avfall` | Miljohus och avfall |
| `/for-boende/bredband-tv-el` | Bredband, TV och el |
| `/for-boende/underhall-genom-aren` | Underhallshistorik |
| `/for-boende/aktiviteter` | Aktiviteter |
| `/kontakt` | Kontakt, expedition och styrelse |
| `/felguide` | Felanmalan och kontaktvag |
| `/dokument` | Dokumentbank |
| `/fraga` | Fraga Malmohus 17 |
| `/maklare` | Maklarinformation |

## Gamla till nya URL:er

Fylls i efter inventering av nuvarande WordPress.

| Gammal WordPress-URL | Ny route | Status | Kommentar |
| --- | --- | --- | --- |
| `/` | `/` | Klar | Startsida |
| `/kontakt` | `/kontakt` | Ska verifieras | Kontaktuppgifter |
| `/maklare` | `/maklare` | Ska verifieras | Maklarinformation |
| `/dokument` | `/dokument` | Ska verifieras | Dokumentbank |

## Dokumentlankar

Viktiga PDF:er som ska testas extra:

- Stadgar.
- Senaste arsredovisning.
- Ordningsregler/trivselregler.
- Parkeringsinformation.
- Blanketter for andrahandsuthyrning.

## Redirect-implementation

Nar gamla URL:er ar inventerade kan redirects laggas i `next.config.ts`.

Exempel:

```ts
async redirects() {
  return [
    {
      source: "/gammal-sida",
      destination: "/ny-route",
      permanent: true,
    },
  ];
}
```
