import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const documents = [
  {
    documentTitle: "A-Ö för boende i Brf Malmöhus 17",
    sourceUrl: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    filePath: path.join(root, "public", "documents", "trivselregler-a-o-brf-malmohus-17.pdf"),
    documentKeywords: ["trivsel", "ordningsregler", "boende"],
  },
  {
    documentTitle: "Stadgar för Brf Malmöhus nr 17",
    sourceUrl: "/documents/stadgar-brf-malmohus-17-2016.pdf",
    filePath: path.join(root, "public", "documents", "stadgar-brf-malmohus-17-2016.pdf"),
    documentKeywords: ["stadgar", "bostadsrätt", "förening"],
  },
];

const curatedSynonyms = [
  ["rökning", "röka", "rök", "fimpar", "cigaretter"],
  ["container", "containerdag", "grovavfall", "avfall"],
  ["skadegörelse", "skada", "åverkan", "klotter", "sabotage"],
  ["andrahandsuthyrning", "andra hand", "uthyrning", "hyra ut"],
  ["parkering", "garage", "bilplats", "lådcykel"],
  ["borra", "borrning", "renovering", "störande arbeten"],
  ["störning", "störningar", "ljud", "fest", "grannar"],
  ["stadgar", "medlemskap", "avgift", "styrelse", "stämma"],
  ["trivsel", "ordningsregler", "hänsyn", "gemensamma utrymmen"],
];

const manualFallbackItems = [
  {
    id: "manual-trivsel-oversikt",
    documentTitle: "A-Ö för boende i Brf Malmöhus 17",
    sourceUrl: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    sectionTitle: "Trivselregler och A-Ö för boende",
    page: 1,
    text:
      "A-Ö för boende samlar praktisk information och trivselregler för vardagen i föreningen, till exempel gemensamma utrymmen, hänsyn, avfall, störningar och frågor som rör boendet.",
    keywords: ["trivsel", "trivselregler", "ordningsregler", "A-Ö", "boende", "hänsyn"],
  },
  {
    id: "manual-stadgar-oversikt",
    documentTitle: "Stadgar för Brf Malmöhus nr 17",
    sourceUrl: "/documents/stadgar-brf-malmohus-17-2016.pdf",
    sectionTitle: "Stadgar",
    page: 1,
    text:
      "Stadgarna beskriver föreningens regler, medlemskap, avgifter, ansvarsfördelning, styrelse, föreningsstämma och bostadsrättshavarens rättigheter och skyldigheter.",
    keywords: ["stadgar", "förening", "medlemskap", "avgifter", "styrelse", "stämma", "ansvar"],
  },
  {
    id: "manual-trivsel-borra",
    documentTitle: "A-Ö för boende i Brf Malmöhus 17",
    sourceUrl: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    sectionTitle: "Borra, renovera och störande arbeten",
    page: 1,
    text:
      "Vid renovering, borrning och andra arbeten som kan störa grannar ska du visa hänsyn och följa föreningens trivselregler. Informera gärna berörda grannar och undvik störande arbeten på sena kvällar, nätter och tidiga morgnar.",
    keywords: ["borra", "borrning", "renovering", "störande arbeten", "hänsyn", "trivsel"],
  },
  {
    id: "manual-trivsel-rokning",
    documentTitle: "A-Ö för boende i Brf Malmöhus 17",
    sourceUrl: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    sectionTitle: "Rökning",
    page: 1,
    text:
      "Rökning ska ske med hänsyn till grannar och gemensamma utrymmen. Undvik rökning där rök stör andra boende och lämna inte fimpar på gård, balkong eller vid entréer.",
    keywords: ["rökning", "röka", "rök", "fimpar", "cigaretter", "balkong", "entré"],
  },
  {
    id: "manual-trivsel-container",
    documentTitle: "A-Ö för boende i Brf Malmöhus 17",
    sourceUrl: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    sectionTitle: "Container och grovavfall",
    page: 1,
    text:
      "När container finns på plats ska föreningens anvisningar följas. Lämna bara tillåtet grovavfall och lägg inte farligt avfall eller elavfall i container om inget annat anges.",
    keywords: ["container", "containerdag", "grovavfall", "avfall", "miljöhus", "sopor"],
  },
  {
    id: "manual-trivsel-skadegorelse",
    documentTitle: "A-Ö för boende i Brf Malmöhus 17",
    sourceUrl: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    sectionTitle: "Skadegörelse",
    page: 1,
    text:
      "Skadegörelse, åverkan och klotter på fastighet eller gemensamma utrymmen ska anmälas. Dokumentera plats, tidpunkt och vad som har hänt.",
    keywords: ["skadegörelse", "skada", "åverkan", "klotter", "sabotage", "anmälan"],
  },
  {
    id: "manual-stadgar-andrahandsuthyrning",
    documentTitle: "Stadgar för Brf Malmöhus nr 17",
    sourceUrl: "/documents/stadgar-brf-malmohus-17-2016.pdf",
    sectionTitle: "Andrahandsuthyrning",
    page: 4,
    text:
      "Upplåtelse i andra hand kräver normalt styrelsens samtycke. Ansökan bör göras innan uthyrningen börjar och innehålla skäl, tidsperiod och uppgifter om den som ska bo i lägenheten.",
    keywords: ["andrahandsuthyrning", "andra hand", "uthyrning", "hyra ut", "styrelsens samtycke"],
  },
  {
    id: "manual-trivsel-parkering",
    documentTitle: "A-Ö för boende i Brf Malmöhus 17",
    sourceUrl: "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    sectionTitle: "Parkering, garage och fordon",
    page: 1,
    text:
      "Information om parkering, garage, köer och fordon hanteras enligt föreningens rutiner. Kontrollera skyltning, avgifter och köhantering via de kontaktvägar föreningen anger.",
    keywords: ["parkering", "garage", "bilplats", "fordon", "kö", "riksbyggen"],
  },
];

const items = [];

for (const documentConfig of documents) {
  const bytes = await fs.readFile(documentConfig.filePath);
  const pdf = await getDocument({
    data: new Uint8Array(bytes),
    disableWorker: true,
    useSystemFonts: true,
  }).promise;

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = normalizeWhitespace(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));

    if (!pageText || pageText.length < 20) {
      continue;
    }

    const chunks = chunkText(pageText, 700);

    chunks.forEach((chunk, chunkIndex) => {
      items.push({
        id: slugify(`${documentConfig.documentTitle}-${pageNumber}-${chunkIndex + 1}`),
        documentTitle: documentConfig.documentTitle,
        sourceUrl: documentConfig.sourceUrl,
        sectionTitle: guessSectionTitle(chunk, pageNumber, chunkIndex),
        page: pageNumber,
        text: chunk,
        keywords: buildKeywords(chunk, documentConfig.documentKeywords),
      });
    });
  }
}

const outputItems = dedupeItems([...manualFallbackItems, ...items]);

const output = `export type DocumentSearchItem = {
  id: string;
  documentTitle: string;
  sourceUrl: string;
  sectionTitle: string;
  page?: number;
  text: string;
  keywords?: string[];
};

export type DocumentSearchResult = DocumentSearchItem & {
  score: number;
  excerpt: string;
  matchedTerms: string[];
};

// TODO: Byt gärna denna generator till ett mer avancerat byggsteg om PDF:erna växer:
// - extrahera rubriker mer exakt
// - spara sidkoordinater för träffar
// - skapa separata index per dokumentkategori
// Kör: npm run generate:document-index
export const documentSearchIndex: DocumentSearchItem[] = ${JSON.stringify(outputItems, null, 2)};
`;

await fs.writeFile(path.join(root, "data", "documentSearchIndex.ts"), output, "utf8");
console.log(`Generated ${outputItems.length} document search items.`);

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function chunkText(text, maxLength) {
  const sentences = text.match(/[^.!?]+[.!?]?/g) ?? [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    const next = normalizeWhitespace(`${current} ${sentence}`);
    if (next.length > maxLength && current.length > 120) {
      chunks.push(current);
      current = normalizeWhitespace(sentence);
    } else {
      current = next;
    }
  }

  if (current.length > 0) {
    chunks.push(current);
  }

  return chunks;
}

function guessSectionTitle(text, pageNumber, chunkIndex) {
  const headingMatch = text.match(/^([A-ZÅÄÖ0-9][^.!?]{3,80})(?:\.|\s{2,}|$)/);
  if (headingMatch?.[1]) {
    return headingMatch[1].trim();
  }

  return `Sida ${pageNumber}, avsnitt ${chunkIndex + 1}`;
}

function buildKeywords(text, documentKeywords) {
  const normalized = normalizeForSearch(text);
  const matched = new Set();

  for (const group of curatedSynonyms) {
    if (group.some((term) => normalized.includes(normalizeForSearch(term)))) {
      group.forEach((term) => matched.add(term));
    }
  }

  for (const keyword of documentKeywords) {
    if (normalized.includes(normalizeForSearch(keyword))) {
      matched.add(keyword);
    }
  }

  return Array.from(matched);
}

function normalizeForSearch(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o");
}

function slugify(value) {
  return normalizeForSearch(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dedupeItems(input) {
  const seen = new Set();

  return input.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}
