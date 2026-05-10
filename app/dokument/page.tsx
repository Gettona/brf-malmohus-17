import { Suspense } from "react";
import { DocumentBank } from "@/components/DocumentBank";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";

export default function DocumentsPage() {
  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Dokumentbank"
        title="Sök och filtrera dokument"
        description="Här finns placeholder-dokument för första versionen. Byt ut länkarna i data/documents.ts när riktiga filer läggs till."
      />
      <div className="mt-10">
        <Suspense fallback={<p className="rounded bg-white p-6 text-slate-600">Laddar dokument...</p>}>
          <DocumentBank />
        </Suspense>
      </div>
    </PageContainer>
  );
}
