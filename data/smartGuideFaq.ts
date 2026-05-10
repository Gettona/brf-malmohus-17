export type SmartGuideFaqItem = {
  id: string;
  question: string;
  answer: string;
  href?: string;
  keywords?: string[];
};

export const smartGuideFaq: SmartGuideFaqItem[] = [
  {
    id: "felanmalan",
    question: "Hur gör jag en felanmälan?",
    answer: "Använd felguiden för att välja ärendetyp. Vid akuta fel, följ jourråden innan du skickar ärendet vidare.",
    href: "/felguide",
    keywords: ["felanmälan", "vattenläcka", "elfel", "jour", "trasigt"],
  },
  {
    id: "parkering",
    question: "Hur fungerar parkering och garage?",
    answer: "Garage, utomhusplatser och lådcykelplatser hanteras via digital kö hos Riksbyggen.",
    href: "/for-boende/parkering",
    keywords: ["parkering", "garage", "bilplats", "lådcykel", "kö"],
  },
  {
    id: "andrahandsuthyrning",
    question: "Vad gäller för andrahandsuthyrning?",
    answer: "Andrahandsuthyrning kräver normalt styrelsens godkännande. Använd blankett och skicka ansökan innan uthyrningen börjar.",
    href: "/dokument?kategori=Blanketter",
    keywords: ["andrahandsuthyrning", "andra hand", "hyra ut", "uthyrning"],
  },
  {
    id: "storning",
    question: "Vad gör jag vid störningar?",
    answer: "Dokumentera tidpunkt och vad som hänt. Vid akut fara ringer du 112, annars kontaktar du styrelsen eller rätt kontaktväg.",
    href: "/felguide",
    keywords: ["störning", "störningar", "granne", "ljud", "fest"],
  },
  {
    id: "dokument",
    question: "Var hittar jag stadgar och trivselregler?",
    answer: "Dokumentbanken samlar stadgar, ordningsregler, blanketter och mäklarinformation.",
    href: "/dokument",
    keywords: ["stadgar", "trivsel", "ordningsregler", "dokument"],
  },
  {
    id: "rokning",
    question: "Vad gäller för rökning?",
    answer: "Rökning ska ske med hänsyn till grannar och gemensamma ytor. Sökresultaten visar också relevanta avsnitt i A-Ö för boende.",
    href: "/fraga?q=rökning",
    keywords: ["rökning", "röka", "rök", "fimpar", "balkong"],
  },
  {
    id: "container",
    question: "Vad gäller när container finns på plats?",
    answer: "Följ föreningens anvisningar för container och lämna bara sådant avfall som är tillåtet.",
    href: "/fraga?q=container",
    keywords: ["container", "containerdag", "grovavfall", "avfall"],
  },
  {
    id: "skadegorelse",
    question: "Hur anmäler jag skadegörelse?",
    answer: "Dokumentera plats, tidpunkt och vad som hänt. Använd felguiden eller kontakta föreningen beroende på ärendets typ.",
    href: "/felguide",
    keywords: ["skadegörelse", "klotter", "åverkan", "skada", "sabotage"],
  },
];
