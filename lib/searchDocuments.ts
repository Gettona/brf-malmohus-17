import { documentSearchIndex, type DocumentSearchItem, type DocumentSearchResult } from "@/data/documentSearchIndex";

const fieldWeights = {
  documentTitle: 10,
  sectionTitle: 14,
  text: 4,
  keywords: 12,
};

export function searchDocuments(query: string, items: DocumentSearchItem[] = documentSearchIndex): DocumentSearchResult[] {
  const terms = tokenize(query);

  if (terms.length === 0) {
    return [];
  }

  return items
    .map((item) => {
      const documentTitle = normalize(item.documentTitle);
      const sectionTitle = normalize(item.sectionTitle);
      const text = normalize(item.text);
      const keywords = normalize((item.keywords ?? []).join(" "));
      const phrase = normalize(query);
      const exactSection = sectionTitle === phrase;

      let score = 0;
      const matchedTerms = new Set<string>();

      for (const term of terms) {
        if (documentTitle.includes(term)) {
          score += fieldWeights.documentTitle;
          matchedTerms.add(term);
        }
        if (sectionTitle.includes(term)) {
          score += fieldWeights.sectionTitle;
          matchedTerms.add(term);
        }
        if (keywords.includes(term)) {
          score += fieldWeights.keywords;
          matchedTerms.add(term);
        }
        if (text.includes(term)) {
          score += fieldWeights.text;
          matchedTerms.add(term);
        }
      }

      if (phrase.length > 2) {
        if (exactSection) score += 30;
        if (sectionTitle.includes(phrase)) score += 18;
        if (documentTitle.includes(phrase)) score += 12;
        if (keywords.includes(phrase)) score += 12;
        if (text.includes(phrase)) score += 8;
      }

      return {
        ...item,
        score,
        matchedTerms: Array.from(matchedTerms),
        excerpt: createExcerpt(item.text, terms),
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.documentTitle.localeCompare(b.documentTitle, "sv"))
    .slice(0, 8);
}

export function tokenize(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9åäö]+/i)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o");
}

function createExcerpt(text: string, terms: string[]): string {
  const normalizedText = normalize(text);
  const firstMatch = terms
    .map((term) => normalizedText.indexOf(term))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (firstMatch === undefined) {
    return text.length > 180 ? `${text.slice(0, 180).trim()}...` : text;
  }

  const start = Math.max(0, firstMatch - 70);
  const end = Math.min(text.length, firstMatch + 170);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";

  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}
