import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { DocumentCard } from "@/components/DocumentCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { brokerFacts, renovations } from "@/data/broker";
import { contact } from "@/data/contact";
import { documents } from "@/data/documents";

export default function BrokerPage() {
  const latestAnnualReport = documents.find((document) => document.category === "Årsredovisningar");
  const brokerDocuments = documents.filter((document) => document.category === "Stadgar");

  if (latestAnnualReport) {
    brokerDocuments.push(latestAnnualReport);
  }

  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Mäklare & spekulanter"
        title="Föreningsfakta och dokument"
        description="Samlad information för bostadsförsäljning. Uppgifterna är strukturerade som placeholder-data och bör verifieras innan skarp lansering."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {brokerFacts.map((fact) => (
          <div key={fact.label} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{fact.label}</p>
            <p className="mt-2 text-lg font-semibold text-brand-900">{fact.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded bg-brand-900 p-7 text-white">
          <Mail aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold">Kontaktväg för mäklare</h2>
          <p className="mt-3 leading-7 text-brand-50">
            Skicka frågor till{" "}
            <a href={contact.brokerEmailHref} className="font-semibold underline">
              {contact.brokerEmail}
            </a>
            . Ange objektsadress, mäklarfirma och vad frågan gäller.
          </p>
        </div>
        <div className="rounded border border-slate-200 bg-white p-7 shadow-sm">
          <FileText className="text-brand-700" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold text-brand-900">Renoveringar och underhåll</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
            {renovations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            href="/for-boende/underhall-genom-aren"
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
          >
            Se underhåll genom åren <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader title="Dokument för försäljning" description="De viktigaste dokumenten för mäklare och spekulanter samlas här." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {brokerDocuments.map((document) => (
            <DocumentCard key={document.name} item={document} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
