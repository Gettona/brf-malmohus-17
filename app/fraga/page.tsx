import { Suspense } from "react";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SmartGuide } from "@/components/SmartGuide";

export default function AskPage() {
  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Fråga Malmöhus 17"
        title="Sök i vanliga svar, stadgar och trivselregler"
        description="Skriv vad du undrar över. Guiden söker statiskt i utvalda FAQ-svar och i ett lokalt index från föreningens PDF-dokument."
      />
      <div className="mt-10">
        <Suspense fallback={<p className="rounded bg-white p-6 text-slate-600">Laddar sökguiden...</p>}>
          <SmartGuide />
        </Suspense>
      </div>
    </PageContainer>
  );
}
