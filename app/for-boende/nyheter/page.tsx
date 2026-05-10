import { NewsCard } from "@/components/NewsCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { news } from "@/data/news";

const categories = Array.from(new Set(news.map((item) => item.category)));

export default function ResidentNewsPage() {
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
        {news.map((item) => (
          <NewsCard key={`${item.date}-${item.title}`} item={item} />
        ))}
      </section>
    </PageContainer>
  );
}
