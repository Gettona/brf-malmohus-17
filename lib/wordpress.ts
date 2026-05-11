const WORDPRESS_API_BASE = process.env.WORDPRESS_API_BASE ?? "https://admin.brfpilot.se/wp-json/wp/v2";

export type WordPressRendered = {
  rendered?: string;
};

export type WordPressPost = {
  id: number;
  date: string;
  link: string;
  slug: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
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

export async function getLatestWordPressPdfMedia(limit = 20) {
  const media = await fetchWordPress<WordPressMedia[]>(`/media?per_page=${limit}`);
  return media.filter((item) => item.mime_type === "application/pdf" || item.source_url.toLowerCase().endsWith(".pdf"));
}

export function plainTextFromHtml(html = "") {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
