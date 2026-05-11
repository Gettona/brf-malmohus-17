const WORDPRESS_API_BASE = process.env.WORDPRESS_API_BASE ?? "https://admin.brfpilot.se/wp-json/wp/v2";

import type { NewsItem } from "@/data/news";
import { documentCategories, type DocumentCategory, type DocumentItem } from "@/data/documents";

export type WordPressRendered = {
  rendered?: string;
};

export type WordPressPost = {
  id: number;
  date: string;
  link: string;
  slug: string;
  featured_media: number;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      title?: WordPressRendered;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        taxonomy: string;
      }>
    >;
  };
};

export type WordPressMedia = {
  id: number;
  date: string;
  link: string;
  mime_type: string;
  source_url: string;
  title: WordPressRendered;
};

async function fetchWordPress<T>(path: string): Promise<T> {
  const response = await fetch(`${WORDPRESS_API_BASE}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API svarade ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getLatestWordPressPosts(limit = 5) {
  return fetchWordPress<WordPressPost[]>(`/posts?per_page=${limit}&status=publish&_embed=1`);
}

export async function getWordPressPosts(limit = 50) {
  return fetchWordPress<WordPressPost[]>(`/posts?per_page=${limit}&status=publish&_embed=1`);
}

export async function getWordPressNewsItems(limit = 20): Promise<NewsItem[]> {
  const posts = await getLatestWordPressPosts(limit);

  return posts
    .map(wordPressPostToNewsItem)
    .filter((item): item is NewsItem => Boolean(item));
}

export async function getLatestWordPressPdfMedia(limit = 20) {
  const media = await fetchWordPress<WordPressMedia[]>(`/media?per_page=${limit}`);
  return media.filter((item) => item.mime_type === "application/pdf" || item.source_url.toLowerCase().endsWith(".pdf"));
}

export async function getWordPressDocumentItems(limit = 50): Promise<DocumentItem[]> {
  const posts = await getWordPressPosts(limit);

  return posts
    .map(wordPressPostToDocumentItem)
    .filter((item): item is DocumentItem => Boolean(item));
}

export function plainTextFromHtml(html = "") {
  return decodeHtmlEntities(html)
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordPressPostToNewsItem(post: WordPressPost): NewsItem | null {
  const title = plainTextFromHtml(post.title.rendered);

  if (!title) {
    return null;
  }

  const excerpt =
    plainTextFromHtml(post.excerpt.rendered) ||
    plainTextFromHtml(post.content.rendered).slice(0, 360) ||
    "Nyheten saknar sammanfattning.";

  return {
    title,
    date: post.date.split("T")[0] ?? post.date,
    category: getPostCategory(post),
    excerpt,
    ...getPostImage(post),
  };
}

function getPostCategory(post: WordPressPost) {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  const category = terms.find((term) => term.taxonomy === "category" && term.name !== "Uncategorized");
  return category?.name ? plainTextFromHtml(category.name) : "Nyhet";
}

function getPostImage(post: WordPressPost): Pick<NewsItem, "image" | "imageAlt"> {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];

  if (featuredMedia?.source_url) {
    return {
      image: featuredMedia.source_url,
      imageAlt: featuredMedia.alt_text || plainTextFromHtml(featuredMedia.title?.rendered),
    };
  }

  const contentImage = post.content.rendered?.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);

  if (!contentImage?.[1]) {
    return {};
  }

  const alt = contentImage[0].match(/alt=["']([^"']*)["']/i)?.[1];

  return {
    image: decodeHtmlEntities(contentImage[1]),
    imageAlt: alt ? decodeHtmlEntities(alt) : "",
  };
}

function wordPressPostToDocumentItem(post: WordPressPost): DocumentItem | null {
  const pdfHref = findPdfHref(post.content.rendered);

  if (!pdfHref) {
    return null;
  }

  const name = plainTextFromHtml(post.title.rendered);

  if (!name) {
    return null;
  }

  return {
    name,
    category: getPostDocumentCategory(post, name),
    type: "PDF",
    year: getDocumentYear(name, post.date),
    description:
      plainTextFromHtml(post.excerpt.rendered) ||
      `PDF-dokument publicerat i WordPress ${new Intl.DateTimeFormat("sv-SE", { dateStyle: "medium" }).format(new Date(post.date))}.`,
    href: pdfHref,
  };
}

function findPdfHref(html = "") {
  const hrefMatch = html.match(/href=["']([^"']+\.pdf(?:\?[^"']*)?)["']/i);

  if (hrefMatch?.[1]) {
    return decodeHtmlEntities(hrefMatch[1]);
  }

  const dataMatch = html.match(/data=["']([^"']+\.pdf(?:\?[^"']*)?)["']/i);
  return dataMatch?.[1] ? decodeHtmlEntities(dataMatch[1]) : "";
}

function getPostDocumentCategory(post: WordPressPost, title: string): DocumentCategory {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  const category = terms.find(
    (term) => term.taxonomy === "category" && documentCategories.includes(plainTextFromHtml(term.name) as DocumentCategory),
  );

  if (category?.name) {
    return plainTextFromHtml(category.name) as DocumentCategory;
  }

  if (/årsredovisning|arsredovisning/i.test(title)) {
    return "Årsredovisningar";
  }

  return "Ekonomi";
}

function getDocumentYear(title: string, date: string) {
  const period = title.match(/\b(20\d{2})\s*[-/]\s*(20\d{2})\b/);

  if (period) {
    return `${period[1]}-${period[2]}`;
  }

  const year = title.match(/\b(20\d{2})\b/);
  return year?.[1] ?? date.slice(0, 4);
}

function decodeHtmlEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, codePoint: string) => String.fromCodePoint(Number(codePoint)))
    .replace(/&#x([a-f0-9]+);/gi, (_, codePoint: string) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
