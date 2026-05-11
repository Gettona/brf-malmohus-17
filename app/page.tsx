import { ArrowRight, Car, FileText, Gavel, LifeBuoy, Mail, Scale, Users } from "lucide-react";
import { Hero } from "@/components/Hero";
import { NewsCard } from "@/components/NewsCard";
import { PageContainer } from "@/components/PageContainer";
import { QuickLinkCard } from "@/components/QuickLinkCard";
import { SectionHeader } from "@/components/SectionHeader";
import { news } from "@/data/news";
import { getWordPressNewsItems } from "@/lib/wordpress";

const quickLinks = [
  { title: "Felanmälan", description: "Få hjälp att välja rätt kontaktväg.", href: "/felguide", icon: LifeBuoy },
  { title: "Kontakt", description: "Expedition, styrelse och formulär.", href: "/kontakt", icon: Mail },
  { title: "Dokument", description: "Stadgar, blanketter och årsredovisning.", href: "/dokument", icon: FileText },
  { title: "Parkering & garage", description: "Kö, platser och praktisk information.", href: "/for-boende/parkering", icon: Car },
  { title: "Ordningsregler", description: "Tryggt och tydligt för alla boende.", href: "/dokument?kategori=Ordningsregler", icon: Scale },
  { title: "Mäklarsida", description: "Fakta och dokument för försäljning.", href: "/maklare", icon: Gavel },
];

async function getHomeNews() {
  try {
    const wordpressNews = await getWordPressNewsItems(3);
    return wordpressNews.length > 0 ? wordpressNews : news.slice(0, 3);
  } catch {
    return news.slice(0, 3);
  }
}

export default async function HomePage() {
  const latestNews = await getHomeNews();

  return (
    <>
      <Hero />
      <PageContainer className="-mt-16 relative z-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((link) => (
            <QuickLinkCard key={link.title} {...link} />
          ))}
        </div>
      </PageContainer>

      <PageContainer className="py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Om föreningen"
            title="En stor och etablerad förening på Borgmästaregården"
            description="BRF Malmöhus 17 samlar 312 lägenheter vid Albinsrogatan och Bisittaregatan i Malmö. Den här portalen är byggd för att göra vardagsinformationen enklare att hitta."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded bg-white p-6 shadow-sm">
              <p className="text-3xl font-semibold text-brand-900">312</p>
              <p className="mt-2 text-sm text-slate-600">lägenheter</p>
            </div>
            <div className="rounded bg-white p-6 shadow-sm">
              <p className="text-3xl font-semibold text-brand-900">2</p>
              <p className="mt-2 text-sm text-slate-600">huvudadresser</p>
            </div>
            <div className="rounded bg-white p-6 shadow-sm">
              <Users className="text-brand-700" aria-hidden="true" />
              <p className="mt-3 text-sm text-slate-600">Boende, styrelse och mäklare på samma plats</p>
            </div>
          </div>
        </div>
      </PageContainer>

      <section className="bg-white py-20">
        <PageContainer>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader eyebrow="Aktuellt" title="Senaste nyheter" description="Kort information om sådant som påverkar boende och vardag i föreningen." />
            <a
              href="/for-boende/nyheter"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
            >
              Alla nyheter <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-brand-900 py-16 text-white">
        <PageContainer className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
              <ArrowRight aria-hidden="true" size={18} /> Snabb väg vidare
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Osäker på vart du ska vända dig?</h2>
          </div>
          <a className="focus-ring inline-flex items-center justify-center rounded bg-white px-5 py-3 font-semibold text-brand-900" href="/felguide">
            Starta felguiden
          </a>
        </PageContainer>
      </section>
    </>
  );
}
