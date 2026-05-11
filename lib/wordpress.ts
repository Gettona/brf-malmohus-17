const WORDPRESS_API_BASE = process.env.WORDPRESS_API_BASE ?? "https://admin.brfpilot.se/wp-json/wp/v2";

import type { NewsItem } from "@/data/news";
import type { BoardMember, ResponsibilityGroup } from "@/data/boardMembers";
import type { ContactInfo } from "@/data/contact";
import type { ContactPageTexts } from "@/data/contactPageContent";
import { documentCategories, type DocumentCategory, type DocumentItem } from "@/data/documents";
import type { OfficeDate } from "@/data/officeHours";

const WORDPRESS_REST_BASE = WORDPRESS_API_BASE.replace(/\/wp\/v2\/?$/, "");

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

export type WordPressBoardMember = {
  id: number;
  menu_order?: number;
  title: WordPressRendered;
  meta?: {
    brf_role?: string;
    brf_phone?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
    }>;
  };
};

export type WordPressOfficeDate = {
  id: number;
  menu_order?: number;
  title: WordPressRendered;
  meta?: {
    brf_date?: string;
    brf_label?: string;
  };
};

export type WordPressResponsibilityGroup = {
  id: number;
  menu_order?: number;
  title: WordPressRendered;
  meta?: {
    brf_people?: string;
  };
};

export type WordPressContact = {
  brf_contact_email?: string;
  brf_contact_phone?: string;
  brf_expedition_address?: string;
  brf_telephone_hours?: string;
  brf_riksbyggen_phone?: string;
  brf_caretaker_phone?: string;
  brf_fault_report_url?: string;
  brf_broker_email?: string;
};

export type WordPressContactPageTexts = Partial<Record<keyof ContactPageTexts, string>>;

async function fetchWordPress<T>(path: string): Promise<T> {
  const response = await fetch(`${WORDPRESS_API_BASE}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API svarade ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

async function fetchWordPressRest<T>(path: string): Promise<T> {
  const response = await fetch(`${WORDPRESS_REST_BASE}${path}`, {
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

export async function getWordPressContactInfo(fallback: ContactInfo): Promise<ContactInfo> {
  const item = await fetchWordPressRest<WordPressContact>("/brf/v1/contact");

  const email = valueOrFallback(item.brf_contact_email, fallback.email);
  const phone = valueOrFallback(item.brf_contact_phone, fallback.phone);
  const riksbyggenPhone = valueOrFallback(item.brf_riksbyggen_phone, fallback.riksbyggenPhone);
  const caretakerPhone = valueOrFallback(item.brf_caretaker_phone, fallback.caretakerPhone);
  const brokerEmail = valueOrFallback(item.brf_broker_email, fallback.brokerEmail);

  return {
    ...fallback,
    email,
    emailHref: toEmailHref(email),
    phone,
    phoneHref: toPhoneHref(phone),
    expeditionAddress: valueOrFallback(item.brf_expedition_address, fallback.expeditionAddress),
    telephoneHours: valueOrFallback(item.brf_telephone_hours, fallback.telephoneHours),
    riksbyggenPhone,
    riksbyggenPhoneHref: toPhoneHref(riksbyggenPhone),
    caretakerPhone,
    caretakerPhoneHref: toPhoneHref(caretakerPhone),
    faultReportUrl: valueOrFallback(item.brf_fault_report_url, fallback.faultReportUrl),
    boardEmail: email,
    boardEmailHref: toEmailHref(email),
    brokerEmail,
    brokerEmailHref: toEmailHref(brokerEmail),
  };
}

export async function getWordPressBoardMembers(fallback: BoardMember[]): Promise<BoardMember[]> {
  const items = await fetchWordPress<WordPressBoardMember[]>("/brf-board-members?per_page=100&status=publish&_embed=1&orderby=menu_order&order=asc");
  const members = items
    .map(wordPressBoardMemberToBoardMember)
    .filter((item): item is BoardMember => Boolean(item));

  return members.length > 0 ? members : fallback;
}

export async function getWordPressOfficeDates(fallback: OfficeDate[]): Promise<OfficeDate[]> {
  const items = await fetchWordPress<WordPressOfficeDate[]>("/brf-office-dates?per_page=100&status=publish&orderby=menu_order&order=asc");
  const dates = items
    .map(wordPressOfficeDateToOfficeDate)
    .filter((item): item is OfficeDate => Boolean(item));

  return dates.length > 0 ? dates : fallback;
}

export async function getWordPressResponsibilityGroups(fallback: ResponsibilityGroup[]): Promise<ResponsibilityGroup[]> {
  const items = await fetchWordPress<WordPressResponsibilityGroup[]>("/brf-responsibility-groups?per_page=100&status=publish&orderby=menu_order&order=asc");
  const groups = items
    .map(wordPressResponsibilityGroupToResponsibilityGroup)
    .filter((item): item is ResponsibilityGroup => Boolean(item));

  return groups.length > 0 ? groups : fallback;
}

export async function getWordPressContactPageTexts(fallback: ContactPageTexts): Promise<ContactPageTexts> {
  const item = await fetchWordPressRest<WordPressContactPageTexts>("/brf/v1/contact-page-texts");
  const merged = { ...fallback };

  for (const key of Object.keys(fallback) as Array<keyof ContactPageTexts>) {
    const value = item[key]?.trim();

    if (!value) {
      continue;
    }

    if (key === "formCaseTypes") {
      merged.formCaseTypes = value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
      continue;
    }

    merged[key] = value as never;
  }

  return merged;
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

function wordPressBoardMemberToBoardMember(item: WordPressBoardMember): BoardMember | null {
  const name = plainTextFromHtml(item.title.rendered);

  if (!name) {
    return null;
  }

  const role = valueOrFallback(item.meta?.brf_role, "Styrelsemedlem");
  const phone = item.meta?.brf_phone?.trim();
  const image = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    name,
    role,
    ...(phone ? { phone, phoneHref: toPhoneHref(phone) } : {}),
    ...(image ? { image } : {}),
  };
}

function wordPressOfficeDateToOfficeDate(item: WordPressOfficeDate): OfficeDate | null {
  const date = item.meta?.brf_date?.trim();

  if (!date) {
    return null;
  }

  return {
    date,
    label: valueOrFallback(item.meta?.brf_label, plainTextFromHtml(item.title.rendered) || date),
  };
}

function wordPressResponsibilityGroupToResponsibilityGroup(item: WordPressResponsibilityGroup): ResponsibilityGroup | null {
  const title = plainTextFromHtml(item.title.rendered);

  if (!title) {
    return null;
  }

  const people = parseResponsibilityPeople(item.meta?.brf_people ?? "");

  if (people.length === 0) {
    return null;
  }

  return {
    title,
    people,
  };
}

function parseResponsibilityPeople(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", phone = ""] = line.split("|").map((part) => part.trim());
      return {
        name,
        ...(phone ? { phone, phoneHref: toPhoneHref(phone) } : {}),
      };
    })
    .filter((person) => Boolean(person.name));
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

function valueOrFallback(value: string | undefined, fallback: string) {
  const cleaned = value?.trim();
  return cleaned ? cleaned : fallback;
}

function toEmailHref(email: string) {
  return `mailto:${email.trim()}`;
}

function toPhoneHref(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "";
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
