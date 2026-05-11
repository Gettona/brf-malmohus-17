import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const source = "https://malmohus17.se";
const outDir = "wordpress-tools/dist";

function xml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cdata(value = "") {
  return String(value).replaceAll("]]>", "]]]]><![CDATA[>");
}

function slugFromUrl(url) {
  const file = decodeURIComponent(url.split("/").pop() ?? "pdf-fil.pdf")
    .replace(/\.pdf$/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return file || "pdf-fil";
}

function titleFromUrl(url) {
  return decodeURIComponent(url.split("/").pop() ?? "PDF-fil").replace(/\.pdf$/i, "");
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json();
}

async function pdfWorks(url) {
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  return res.ok && String(res.headers.get("content-type") ?? "").toLowerCase().includes("pdf");
}

async function collectPdfLinks() {
  const pages = await fetchJson(`${source}/wp-json/wp/v2/pages?per_page=100&_fields=slug,title,content`);
  const links = [];

  for (const page of pages) {
    const content = page.content?.rendered ?? "";
    const matches = content.matchAll(/href=["']([^"']+\.pdf(?:\?[^"']*)?)["']/gi);
    for (const match of matches) {
      const url = match[1];
      if (!url.startsWith(source)) continue;
      links.push({
        page: page.slug,
        pageTitle: page.title?.rendered ?? page.slug,
        title: titleFromUrl(url),
        url,
      });
    }
  }

  const unique = Array.from(new Map(links.map((link) => [link.url, link])).values());
  const working = [];
  for (const link of unique) {
    if (await pdfWorks(link.url).catch(() => false)) {
      working.push(link);
    }
  }

  return working;
}

function buildWxr(pdfLinks) {
  const now = new Date().toUTCString();
  const content = [
    "<p>Den här sidan används för att kontrollera att PDF-filer följer med vid backup och återställning.</p>",
    "<p>Efter import, backup och restore ska varje länk nedan öppna en PDF från testdomänen.</p>",
    "<ul>",
    ...pdfLinks.map((link) => `<li><a href="${xml(link.url)}">${xml(link.title)}</a> <em>(${xml(link.pageTitle)})</em></li>`),
    "</ul>",
  ].join("\n");

  const pageItem = `    <item>
      <title>PDF-kontroll</title>
      <link>${source}/pdf-kontroll/</link>
      <pubDate>${now}</pubDate>
      <dc:creator><![CDATA[malmohus17-import]]></dc:creator>
      <guid isPermaLink="false">${source}/?page_id=1900</guid>
      <description></description>
      <content:encoded><![CDATA[${cdata(content)}]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>
      <wp:post_id>1900</wp:post_id>
      <wp:post_date><![CDATA[2026-05-11 12:00:00]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[2026-05-11 10:00:00]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[2026-05-11 12:00:00]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[2026-05-11 10:00:00]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>
      <wp:post_name><![CDATA[pdf-kontroll]]></wp:post_name>
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>90</wp:menu_order>
      <wp:post_type><![CDATA[page]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
    </item>`;

  const attachmentItems = pdfLinks
    .map((link, index) => {
      const id = 2000 + index;
      const slug = slugFromUrl(link.url);
      const title = titleFromUrl(link.url);
      return `    <item>
      <title>${xml(title)}</title>
      <link>${xml(link.url)}</link>
      <pubDate>${now}</pubDate>
      <dc:creator><![CDATA[malmohus17-import]]></dc:creator>
      <guid isPermaLink="false">${xml(link.url)}</guid>
      <description></description>
      <content:encoded><![CDATA[]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>
      <wp:post_id>${id}</wp:post_id>
      <wp:post_date><![CDATA[2026-05-11 12:00:00]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[2026-05-11 10:00:00]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[2026-05-11 12:00:00]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[2026-05-11 10:00:00]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>
      <wp:post_name><![CDATA[${slug}]]></wp:post_name>
      <wp:status><![CDATA[inherit]]></wp:status>
      <wp:post_parent>1900</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[attachment]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
      <wp:attachment_url>${xml(link.url)}</wp:attachment_url>
      <wp:postmeta>
        <wp:meta_key><![CDATA[_wp_attached_file]]></wp:meta_key>
        <wp:meta_value><![CDATA[${slug}.pdf]]></wp:meta_value>
      </wp:postmeta>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/"
>
  <channel>
    <title>Brf Malmöhus 17 PDF-kontroll</title>
    <link>${source}</link>
    <description>PDF-kontroll för testmiljö</description>
    <pubDate>${now}</pubDate>
    <language>sv-SE</language>
    <wp:wxr_version>1.2</wp:wxr_version>
    <wp:base_site_url>${source}</wp:base_site_url>
    <wp:base_blog_url>${source}</wp:base_blog_url>
${pageItem}
${attachmentItems}
  </channel>
</rss>
`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const pdfLinks = await collectPdfLinks();
  const selected = [
    "Arsredovisning-2025-08-31-Brf-Malmohus-17_sign.pdf",
    "Arsredovisning-2024-08-31-Brf-Malmohus-17_sign.pdf",
    "Stadgar-Brf-Malmöhus-nr-17-Registrerades-2016-06-14165992.pdf",
    "221222_A_Ö_Brf-Malmöhus-17_OK.pdf",
    "InfoMiljöhus200429_1-sida.pdf",
    "Köinformation_2021.pdf",
  ];

  const selectedLinks = pdfLinks.filter((link) => selected.some((name) => decodeURIComponent(link.url).endsWith(name)));
  await writeFile(join(outDir, "malmohus17-pdf-kontroll-import.xml"), buildWxr(selectedLinks), "utf8");
  await writeFile(
    join(outDir, "PDF-KONTROLL.md"),
    `# PDF-kontroll för WordPress-testmiljön

Importera \`malmohus17-pdf-kontroll-import.xml\` via Verktyg -> Importera -> WordPress.

Välj:

- Tilldela författare till din adminanvändare
- Ladda ned och importera bilagor
- Ändra importerade URL:er så att de länkar till denna webbplats

Efter import ska sidan finnas här:

\`https://malmohus17.brfpilot.se/pdf-kontroll/\`

Kontrollera att länkarna på sidan öppnar PDF-filer från \`malmohus17.brfpilot.se/wp-content/uploads/\`.

Valda PDF:er:

${selectedLinks.map((link) => `- ${link.title} (${link.pageTitle})`).join("\n")}
`,
    "utf8"
  );

  console.log(`Created PDF control import with ${selectedLinks.length} PDFs`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
