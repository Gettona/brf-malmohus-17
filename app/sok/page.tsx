import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";

const suggestions = [
  { href: "/fraga", title: "Fråga Malmöhus 17" },
  { href: "/felguide", title: "Felanmälan och jour" },
  { href: "/dokument", title: "Dokumentbank" },
  { href: "/for-boende/parkering", title: "Parkering och garage" },
  { href: "/kontakt", title: "Kontakta expeditionen" },
  { href: "/maklare", title: "Mäklare och spekulanter" },
];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim();

  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Sök"
        title={query ? `Förslag för “${query}”` : "Vad letar du efter?"}
        description="Sökfunktionen är en guide i första versionen. Använd Fråga Malmöhus 17 för att söka i FAQ, stadgar och trivselregler."
      />
      {/* TODO: Koppla sökfältet till framtida CMS/databas när innehållet blir dynamiskt. */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {suggestions.map((item) => (
          <Link key={item.href} href={item.href} className="focus-ring rounded border border-slate-200 bg-white p-5 font-semibold text-brand-900 shadow-sm hover:bg-brand-50">
            {item.title}
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
