import { Suspense } from "react";
import { DocumentBank } from "@/components/DocumentBank";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { documents, type DocumentItem } from "@/data/documents";
import { getWordPressDocumentItems } from "@/lib/wordpress";

async function getDocuments() {
  try {
    const wordpressDocuments = await getWordPressDocumentItems(50);
    return mergeDocuments(wordpressDocuments, documents);
  } catch {
    return documents;
  }
}

function mergeDocuments(primary: DocumentItem[], fallback: DocumentItem[]) {
  const seen = new Set<string>();

  return [...primary, ...fallback].filter((item) => {
    const key = `${item.name}-${item.year}-${item.href}`.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export default async function DocumentsPage() {
  const documentItems = await getDocuments();

  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Dokumentbank"
        title="Sök och filtrera dokument"
        description="Här samlas stadgar, årsredovisningar, ordningsregler, blanketter och praktisk information för boende och mäklare."
      />
      <div className="mt-10">
        <Suspense fallback={<p className="rounded bg-white p-6 text-slate-600">Laddar dokument...</p>}>
          <DocumentBank items={documentItems} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
