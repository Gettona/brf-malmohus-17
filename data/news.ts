export type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  event?: {
    start: string;
    end?: string;
    location?: string;
  };
};

export const news: NewsItem[] = [
  {
    title: "Grillfesten på gården",
    date: "2026-06-06",
    category: "Gemenskap",
    excerpt: `Lördag den 6 juni bjuder vi på grillad korv med bröd och tillbehör på gården. Det kommer att finnas vanlig grillkorv, kycklingkorv och vegokorv, kaffe och kaka. Övrig dryck tar var och en med sig. Vi träffas kl. 14:00-16:00. Styrelsen kommer att vara på plats, så det finns möjlighet att ställa frågor till styrelsen.
Vänligen anmäl er om ni önskar komma, allra senast måndag 1 juni. OBS! Om ni anmäler er, KOM, annars blir det många korvar över! Varmt välkomna!`,

    image: "/images/nyheter/grillfest.jpg",
    imageAlt: "Grillad mat på galler.",
    event: {
      start: "2026-06-06T14:00:00",
      end: "2026-06-06T16:00:00",
      location: "Gården",
    },
  },
  {
    title: "Containerdag på gården",
    date: "2026-04-24",
    category: "Boende",
    excerpt: "Container finns på området fredag 24 april till söndag 26 april på brandgatan bakom hus 2. Grovavfall ska delas ner, och kemikalier, miljöfarligt avfall och vitvaror får inte lämnas där.",
    href: "/for-boende/miljohus-och-avfall",
    event: {
      start: "2026-04-24",
      end: "2026-04-26",
      location: "Brandgatan bakom hus 2",
    },
  },
  {
    title: "Ärtsoppa 19 mars 2026",
    date: "2026-03-19",
    category: "Aktivitet",
    excerpt: "Föreningen bjuder in till ärtsoppa med pannkaka, kaffe och kaka i festlokalen på Albinsrogatan 37. Delar av styrelsen är på plats och svarar på frågor.",
    image: "/images/nyheter/artsoppa.jpg",
    imageAlt: "Dukat bord inför gemensam måltid.",
    event: {
      start: "2026-03-19T18:00:00",
      location: "Festlokalen på Albinsrogatan 37",
    },
  },
  {
    title: "Föreningen fyller 60 år",
    date: "2026-03-01",
    category: "Föreningen",
    excerpt: "BRF Malmöhus 17 fyller 60 år i augusti. Mer information kommer när planeringen är klar.",
    image: "/images/nyheter/foreningen-60-ar.jpg",
    imageAlt: "Färgglada ballonger som symboliserar jubileum.",
  },
  {
    title: "Expeditionens öppettider 2026",
    date: "2026-01-12",
    category: "Kontakt",
    excerpt: "Under 2026 är expeditionen öppen kl. 18.00-19.00 vid utvalda datum. Alla datum finns samlade på kontaktsidan och i kalendern.",
    href: "/kontakt",
  },
  {
    title: "Årsberättelsen för 2024-2025 är klar",
    date: "2025-11-01",
    category: "Ekonomi",
    excerpt: "Årsredovisningen för räkenskapsåret 2024-2025 finns tillgänglig via dokumentbanken och ekonomisidan.",
    href: "/dokument?kategori=Årsredovisningar",
    image: "/images/nyheter/arsredovisning-2024-2025.jpg",
    imageAlt: "Framsida till årsredovisning 2024-2025.",
  },
  {
    title: "Avgiftshöjning 1 november 2025",
    date: "2025-11-01",
    category: "Ekonomi",
    excerpt: "På grund av ökade kostnader höjs avgiften med 4 procent från den 1 november 2025.",
  },
  {
    title: "Nya passersystemet - så öppnar du porten med svarsapparaten",
    date: "2025-05-01",
    category: "Fastighet",
    excerpt: "För att öppna porten från svarsapparaten trycker du först på den övre högra knappen för att tala med besökaren och därefter på den blå knappen för att öppna.",
    image: "/images/nyheter/porttelefon-svarsapparat.jpg",
    imageAlt: "Svarsapparat för porttelefon i lägenhet.",
  },
  {
    title: "Porttelefonsystemet byts ut",
    date: "2025-03-01",
    category: "Fastighet",
    excerpt: "Arbetet med att byta porttelefoner, svarsapparater och taggar pågår etappvis. Alla lägenheter får kuvert med användarhandledningar och instruktioner.",
    image: "/images/nyheter/porttelefon.jpg",
    imageAlt: "Porttelefon vid entré.",
  },
];
