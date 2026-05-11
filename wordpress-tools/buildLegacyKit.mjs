import { mkdir, writeFile, rm } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { join } from "node:path";

const source = "https://malmohus17.se";
const outDir = "wordpress-tools/dist";
const themeDir = join(outDir, "malmohus17-legacy-child");

const pages = [
  "startsida",
  "nyhetsarkiv",
  "om-foreningen",
  "bo-i-malmohus-17",
  "ekonomi",
  "styrelsen",
  "bredband-telefoni-tv",
  "el",
  "garage-parkering",
  "hemsidan",
  "praktiska-lokaler",
  "lagenhetsritningar",
  "trivselregler-stadgar",
  "aktiviteter",
  "bilder",
  "kontakt",
  "underhall-genom-aren",
  "praktisk-information",
  "ordningsregler",
];

const menuOrder = [
  "startsida",
  "nyhetsarkiv",
  "om-foreningen",
  "bo-i-malmohus-17",
  "ekonomi",
  "styrelsen",
  "bredband-telefoni-tv",
  "el",
  "garage-parkering",
  "hemsidan",
  "praktiska-lokaler",
  "lagenhetsritningar",
  "trivselregler-stadgar",
  "aktiviteter",
  "bilder",
  "kontakt",
  "underhall-genom-aren",
  "praktisk-information",
  "ordningsregler",
];

const legacyPageIdMap = new Map([
  ["16", "/"],
  ["18", "/nyhetsarkiv/"],
  ["20", "/om-foreningen/"],
  ["22", "/ekonomi/"],
  ["24", "/bredband-telefoni-tv/"],
  ["26", "/el/"],
  ["28", "/garage-parkering/"],
  ["30", "/praktiska-lokaler/"],
  ["32", "/lagenhetsritningar/"],
  ["34", "/trivselregler-stadgar/"],
  ["36", "/aktiviteter/"],
  ["38", "/bilder/"],
  ["40", "/styrelsen/"],
  ["42", "/kontakt/"],
  ["120", "/hemsidan/"],
  ["390", "/bo-i-malmohus-17/"],
  ["865", "/underhall-genom-aren/"],
  ["1141", "/praktisk-information/"],
  ["1149", "/ordningsregler/"],
]);

function normalizeLegacyLinks(content = "") {
  let normalized = String(content);

  for (const [pageId, path] of legacyPageIdMap) {
    const hrefPattern = new RegExp(`https://malmohus17\\.se/\\?page_id=${pageId}`, "g");
    normalized = normalized.replace(hrefPattern, path);
  }

  return normalized;
}

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

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json();
}

async function fetchPage(slug) {
  const url = `${source}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,date,modified,slug,link,title,content,excerpt`;
  const result = await fetchJson(url);
  if (!result.length) throw new Error(`No page for slug ${slug}`);
  return result[0];
}

function buildWxr(items) {
  const now = new Date().toUTCString();
  const pageItems = items
    .map((page, index) => {
      const title = page.title?.rendered ?? page.slug;
      const content = normalizeLegacyLinks(page.content?.rendered ?? "");
      const excerpt = page.excerpt?.rendered ?? "";
      const order = menuOrder.indexOf(page.slug);
      const menuIndex = order >= 0 ? order : index;
      const postId = 1000 + index;

      return `    <item>
      <title>${xml(title)}</title>
      <link>${xml(page.link)}</link>
      <pubDate>${new Date(page.date).toUTCString()}</pubDate>
      <dc:creator><![CDATA[malmohus17-import]]></dc:creator>
      <guid isPermaLink="false">${source}/?page_id=${postId}</guid>
      <description></description>
      <content:encoded><![CDATA[${cdata(content)}]]></content:encoded>
      <excerpt:encoded><![CDATA[${cdata(excerpt)}]]></excerpt:encoded>
      <wp:post_id>${postId}</wp:post_id>
      <wp:post_date><![CDATA[${page.date.replace("T", " ")}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${page.date.replace("T", " ")}]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[${page.modified.replace("T", " ")}]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[${page.modified.replace("T", " ")}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>
      <wp:post_name><![CDATA[${page.slug}]]></wp:post_name>
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>${menuIndex}</wp:menu_order>
      <wp:post_type><![CDATA[page]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
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
    <title>Brf Malmöhus 17</title>
    <link>${source}</link>
    <description>Varmt välkommen till oss!</description>
    <pubDate>${now}</pubDate>
    <language>sv-SE</language>
    <wp:wxr_version>1.2</wp:wxr_version>
    <wp:base_site_url>${source}</wp:base_site_url>
    <wp:base_blog_url>${source}</wp:base_blog_url>
${pageItems}
  </channel>
</rss>
`;
}

async function download(url, path) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  const stream = createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipeTo(
      new WritableStream({
        write(chunk) {
          stream.write(Buffer.from(chunk));
        },
        close() {
          stream.end(resolve);
        },
        abort(error) {
          stream.destroy(error);
          reject(error);
        },
      })
    ).catch(reject);
  });
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(themeDir, { recursive: true });

  const fetchedPages = [];
  for (const slug of pages) {
    fetchedPages.push(await fetchPage(slug));
  }

  await writeFile(join(outDir, "malmohus17-wordpress-import.xml"), buildWxr(fetchedPages), "utf8");

  await writeFile(
    join(themeDir, "style.css"),
    `/*
Theme Name: Malmöhus 17 Legacy
Theme URI: https://brfpilot.se/
Description: Standalone legacy-style theme for the Malmöhus 17 migration test.
Author: BRF Malmöhus 17
Version: 0.3.0
Text Domain: malmohus17-legacy
*/

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  background: #f1f1f1;
  color: #373737;
  font-family: Georgia, "Bitstream Charter", serif;
  font-size: 15px;
  line-height: 1.625;
  margin: 0;
  padding: 0 2em;
}

a {
  color: #1b67a6;
}

img {
  height: auto;
  max-width: 100%;
}

#page {
  background: #fff;
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.16);
  margin: 2em auto;
  max-width: 1000px;
  min-height: 100vh;
}

#branding {
  border-top: 2px solid #bbb;
  padding: 3.65625em 7.6% 2.2em;
}

#site-title {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2;
  margin: 0;
}

#site-title a {
  color: #111;
  text-decoration: none;
}

#site-description {
  color: #7a7a7a;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  margin: 0.35em 0 0;
}

#access {
  background: linear-gradient(#252525, #0f0f0f);
  clear: both;
  display: block;
  margin: 0 auto 6px;
  min-height: 43px;
  padding: 0 7.6%;
}

#access ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
}

#access li {
  display: inline-block;
  position: relative;
  vertical-align: top;
}

#access a {
  color: #eee;
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 3.333em;
  padding: 0 0.85em;
  text-decoration: none;
}

#access li:hover > a,
#access .current-menu-item > a {
  background: #333;
}

#main {
  display: grid;
  gap: 5.2%;
  grid-template-columns: 22.8% minmax(0, 1fr);
  padding: 3.125em 7.6%;
}

#primary {
  min-width: 0;
}

#secondary {
  color: #666;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

.widget {
  border-bottom: 1px solid #ddd;
  margin: 0 0 2.2em;
  padding: 0 0 1.6em;
}

.widget-title {
  color: #666;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin: 0 0 1em;
  text-transform: uppercase;
}

.widget ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.widget a {
  color: #555;
  text-decoration: none;
}

.widget li {
  border-top: 1px solid #eee;
  padding: 0.45em 0;
}

.widget li:first-child {
  border-top: 0;
}

.entry-title {
  color: #222;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 26px;
  font-weight: bold;
  line-height: 1.3;
  margin: 0 0 0.7em;
}

.entry-content {
  font-size: 15px;
}

.entry-content h1,
.entry-content h2,
.entry-content h3 {
  color: #222;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  line-height: 1.3;
  margin: 1.25em 0 0.55em;
}

.entry-content h2 {
  font-size: 20px;
}

.entry-content h3 {
  font-size: 16px;
}

.entry-content p,
.entry-content ul,
.entry-content ol {
  margin: 0 0 1.625em;
}

.entry-content ul,
.entry-content ol {
  padding-left: 1.5em;
}

.entry-content table {
  border-collapse: collapse;
  margin: 0 0 1.625em;
  width: 100%;
}

.entry-content th,
.entry-content td {
  border-bottom: 1px solid #ddd;
  padding: 0.45em;
  vertical-align: top;
}

.entry-content .alignleft,
.entry-content img.alignleft {
  float: left;
  margin: 0.35em 1.625em 1em 0;
}

.entry-content .alignright,
.entry-content img.alignright {
  float: right;
  margin: 0.35em 0 1em 1.625em;
}

.entry-content .aligncenter,
.entry-content img.aligncenter {
  clear: both;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.wp-caption {
  background: #eee;
  margin-bottom: 1.625em;
  max-width: 96%;
  padding: 9px;
  text-align: center;
}

.wp-caption-text {
  color: #666;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
  margin: 0.6em 0 0;
}

#primary::after,
.entry-content::after {
  clear: both;
  content: "";
  display: table;
}

#colophon {
  border-top: 1px solid #ddd;
  clear: both;
  color: #777;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
  padding: 2em 7.6%;
}

.malmohus-test-notice {
  background: #fff8db;
  border-bottom: 1px solid #e5d58a;
  color: #5b4b00;
  font: 13px/1.4 Arial, sans-serif;
  padding: 8px 3.8%;
}

  @media (max-width: 760px) {
  body {
    padding: 0;
  }

  #page {
    margin: 0;
  }

  #branding,
  #main,
  #colophon {
    padding-left: 5%;
    padding-right: 5%;
  }

  #access li {
    display: block;
  }

  #access {
    padding: 0;
  }

  #main {
    display: block;
  }

  #secondary {
    margin-top: 3em;
  }
}
`,
    "utf8"
  );

  await writeFile(
    join(themeDir, "functions.php"),
    `<?php
/**
 * Malmöhus 17 Legacy theme.
 */

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'malmohus17-legacy-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );
});

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menu('primary', __('Primary Menu', 'malmohus17-legacy'));
});

function malmohus17_legacy_page_menu() {
    echo '<div class="menu"><ul>';
    wp_list_pages(array(
        'title_li' => '',
        'sort_column' => 'menu_order,post_title',
    ));
    echo '</ul></div>';
}

function malmohus17_legacy_page_list() {
    wp_list_pages(array(
        'title_li' => '',
        'sort_column' => 'menu_order,post_title',
    ));
}

add_action('wp_body_open', function () {
    if (!is_user_logged_in()) {
        echo '<div class="malmohus-test-notice">Testmiljö för Brf Malmöhus 17. Ej skarp webbplats.</div>';
    }
});
`,
    "utf8"
  );

  await writeFile(
    join(themeDir, "header.php"),
    `<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page">
  <header id="branding" role="banner">
    <h1 id="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a></h1>
    <div id="site-description"><?php bloginfo('description'); ?></div>
  </header>
  <nav id="access" role="navigation" aria-label="<?php esc_attr_e('Primary Menu', 'malmohus17-legacy'); ?>">
    <?php
    wp_nav_menu(array(
        'theme_location' => 'primary',
        'menu_class' => 'menu',
        'container' => false,
        'fallback_cb' => 'malmohus17_legacy_page_menu',
    ));
    ?>
  </nav>
  <main id="main">
`,
    "utf8"
  );

  await writeFile(
    join(themeDir, "footer.php"),
    `  </main>
  <footer id="colophon" role="contentinfo">
    <p>Brf Malmöhus 17</p>
  </footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
`,
    "utf8"
  );

  await writeFile(
    join(themeDir, "page.php"),
    `<?php get_header(); ?>
<aside id="secondary" role="complementary">
  <section class="widget">
    <h2 class="widget-title"><?php esc_html_e('Sidor', 'malmohus17-legacy'); ?></h2>
    <ul><?php malmohus17_legacy_page_list(); ?></ul>
  </section>
</aside>
<section id="primary">
  <?php while (have_posts()) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <h1 class="entry-title"><?php the_title(); ?></h1>
      <div class="entry-content">
        <?php the_content(); ?>
      </div>
    </article>
  <?php endwhile; ?>
</section>
<?php get_footer(); ?>
`,
    "utf8"
  );

  await writeFile(
    join(themeDir, "index.php"),
    `<?php get_header(); ?>
<aside id="secondary" role="complementary">
  <section class="widget">
    <h2 class="widget-title"><?php esc_html_e('Sidor', 'malmohus17-legacy'); ?></h2>
    <ul><?php malmohus17_legacy_page_list(); ?></ul>
  </section>
</aside>
<section id="primary">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h1 class="entry-title"><?php the_title(); ?></h1>
        <div class="entry-content">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  <?php else : ?>
    <article>
      <h1 class="entry-title"><?php esc_html_e('Inget innehåll hittades', 'malmohus17-legacy'); ?></h1>
    </article>
  <?php endif; ?>
</section>
<?php get_footer(); ?>
`,
    "utf8"
  );

  await writeFile(
    join(themeDir, "README.txt"),
    `Malmöhus 17 Legacy

This is a standalone theme inspired by the old Malmöhus 17 WordPress site.

Recommended WordPress settings:
- Language: Swedish
- Site title: Brf Malmöhus 17
- Tagline: Varmt välkommen till oss!
- Permalinks: Post name
- Search engine visibility: Discourage search engines
- Front page: static page "Nyheter"
- Posts page: none for this legacy copy
`,
    "utf8"
  );

  await download(`${source}/wp-content/uploads/2023/05/cropped-IMG_9075.jpeg`, join(themeDir, "screenshot.png")).catch(() => {
    // A screenshot is optional for WordPress themes. Skip it if the old header
    // image URL changes or is unavailable.
  });

  await writeFile(
    join(outDir, "INSTALLERA-TESTMILJO.md"),
    `# Installera Malmöhus 17-testmiljö i WordPress

## 1. Tema

- Utseende -> Teman -> Lägg till nytt -> Ladda upp tema
- Ladda upp ZIP-filen \`malmohus17-legacy-child.zip\`
- Aktivera **Malmöhus 17 Legacy**

## 2. Importera sidor

- Verktyg -> Importera
- Installera WordPress-importören om WordPress frågar
- Importera \`malmohus17-wordpress-import.xml\`
- Välj befintlig adminanvändare som författare
- Kryssa i att bifogade filer ska hämtas om WordPress erbjuder valet

## 3. Grundinställningar

- Inställningar -> Allmänt
  - Webbplatstitel: Brf Malmöhus 17
  - Slogan: Varmt välkommen till oss!
- Inställningar -> Läsa
  - Startsidan visar: En statisk sida
  - Startsida: Nyheter
  - Be sökmotorer att inte indexera denna webbplats: ikryssad
- Inställningar -> Permalänkar
  - Inläggsnamn

## 4. Meny

Skapa en huvudmeny under Utseende -> Menyer med denna ordning:

1. Nyheter
2. Nyhetsarkiv
3. Om föreningen
4. Bo i Malmöhus 17
5. Ekonomi
6. Styrelsen
7. Bredband, Telefoni, TV
8. El
9. Garage, Bil- och Lådcykelparkeringar
10. Miljöhus
11. Lokaler
12. Lägenhetsritningar
13. A-Ö, Stadgar
14. Aktiviteter
15. Bilder
16. Kontakt
17. Underhåll genom åren
18. Praktisk information
19. Ordningsregler

Tilldela menyn till platsen **Primary Menu**.
`,
    "utf8"
  );

  console.log(`Created legacy kit in ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
