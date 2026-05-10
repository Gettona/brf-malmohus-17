export type DocumentCategory =
  | "Stadgar"
  | "Årsredovisningar"
  | "Ordningsregler"
  | "Blanketter"
  | "Renovering"
  | "Mäklare"
  | "Parkering"
  | "Ekonomi";

export type DocumentItem = {
  name: string;
  category: DocumentCategory;
  type: "PDF";
  year: string;
  description: string;
  href: string;
};

export const documentCategories: DocumentCategory[] = [
  "Stadgar",
  "Årsredovisningar",
  "Ordningsregler",
  "Blanketter",
  "Renovering",
  "Mäklare",
  "Parkering",
  "Ekonomi",
];

export const documents: DocumentItem[] = [
  {
    name: "Stadgar för BRF Malmöhus 17",
    category: "Stadgar",
    type: "PDF",
    year: "2016",
    description: "Föreningens grundläggande regler, ansvar och beslutsordning.",
    href: "/documents/stadgar-brf-malmohus-17-2016.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2024-2025",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2024-2025.",
    href: "/documents/arsredovisningar/arsredovisning-2024-2025.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2023-2024",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2023-2024.",
    href: "/documents/arsredovisningar/arsredovisning-2023-2024.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2022-2023",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2022-2023.",
    href: "/documents/arsredovisningar/arsredovisning-2022-2023.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2021-2022",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2021-2022.",
    href: "/documents/arsredovisningar/arsredovisning-2021-2022.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2020-2021",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2020-2021.",
    href: "/documents/arsredovisningar/arsredovisning-2020-2021.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2019-2020",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2019-2020.",
    href: "/documents/arsredovisningar/arsredovisning-2019-2020.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2018-2019",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2018-2019.",
    href: "/documents/arsredovisningar/arsredovisning-2018-2019.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2017-2018",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2017-2018.",
    href: "/documents/arsredovisningar/arsredovisning-2017-2018.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2016-2017",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2016-2017.",
    href: "/documents/arsredovisningar/arsredovisning-2016-2017.pdf",
  },
  // TODO: Källsidan listar äldre årsredovisningar, men PDF-länkarna returnerar 404. Behåll käll-länkar som fallback tills föreningen kan tillhandahålla fungerande filer.
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2012-2013",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2012-2013.",
    href: "https://malmohus17.se/documents/Arsredovisning_2012-2013_Malmohus17.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2011-2012",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2011-2012.",
    href: "https://malmohus17.se/documents/Arsredovisning_2011-2012_Malmohus17.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2010-2011",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2010-2011.",
    href: "https://malmohus17.se/documents/Arsredovisning_2010-2011_Malmohus17.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2009-2010",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2009-2010.",
    href: "https://malmohus17.se/documents/Arsredovisning_2009-2010_Malmohus17.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2008-2009",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2008-2009.",
    href: "https://malmohus17.se/documents/Arsredovisning_2008-2009_Malmohus17.pdf",
  },
  {
    name: "Årsredovisning Riksbyggen Brf Malmöhus 17",
    category: "Årsredovisningar",
    type: "PDF",
    year: "2007-2008",
    description: "Årsredovisning för BRF Malmöhus 17, verksamhetsår 2007-2008.",
    href: "https://malmohus17.se/documents/Arsredovisning_2007-2008_Malmohus17.pdf",
  },
  {
    name: "A-Ö för boende",
    category: "Ordningsregler",
    type: "PDF",
    year: "2022",
    description: "Trivselregler och praktisk information för boende i föreningen.",
    href: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
  },
  {
    name: "Ansökan om andrahandsuthyrning",
    category: "Blanketter",
    type: "PDF",
    year: "2026",
    description: "Blankett för ansökan innan uthyrning i andra hand.",
    href: "/placeholder/andrahandsuthyrning.pdf",
  },
  {
    name: "Renoveringsinformation",
    category: "Renovering",
    type: "PDF",
    year: "2026",
    description: "Vad du behöver veta innan du renoverar i lägenheten.",
    href: "/placeholder/renovering.pdf",
  },
  {
    name: "Mäklarinformation",
    category: "Mäklare",
    type: "PDF",
    year: "2026",
    description: "Samlad föreningsfakta för mäklare och spekulanter.",
    href: "/placeholder/maklare.pdf",
  },
  {
    name: "Parkering och garage",
    category: "Parkering",
    type: "PDF",
    year: "2026",
    description: "Kö, avgifter och kontaktvägar för parkering och garage.",
    href: "/placeholder/parkering.pdf",
  },
  {
    name: "Avgifter och betalning",
    category: "Ekonomi",
    type: "PDF",
    year: "2026",
    description: "Information om månadsavgifter, avier och autogiro.",
    href: "/placeholder/avgifter.pdf",
  },
];
