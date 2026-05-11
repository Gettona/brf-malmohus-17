import { NewsCard } from "@/components/NewsCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { news, type NewsItem } from "@/data/news";
import { getWordPressNewsItems } from "@/lib/wordpress";

async function getResidentNews() {
  try {
    const wordpressNews = await getWordPressNewsItems(50);
    return mergeNewsItems(wordpressNews, news);
  } catch {
    return news;
  }
}

function mergeNewsItems(primary: NewsItem[], fallback: NewsItem[]) {
  const seen = new Set<string>();

  return [...primary, ...fallback]
    .filter((item) => {
      const key = `${item.date}-${item.title}`.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export default async function ResidentNewsPage() {
  const newsItems = await getResidentNews();
  const categories = Array.from(new Set(newsItems.map((item) => item.category)));

  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="För boende"
        title="Nyheter"
        description="Senaste informationen och aktuella meddelanden från föreningen."
      />

      <section className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={category} className="rounded bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            {category}
          </span>
        ))}
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {newsItems.map((item) => (
          <NewsCard key={`${item.date}-${item.title}`} item={item} />
        ))}
      </section>
    </PageContainer>
  );
}
