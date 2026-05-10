"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DocumentCard } from "@/components/DocumentCard";
import { SearchInput } from "@/components/SearchInput";
import { documentCategories, documents, type DocumentCategory } from "@/data/documents";

export function DocumentBank() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DocumentCategory | "Alla">(
    documentCategories.includes(initialCategory as DocumentCategory) ? (initialCategory as DocumentCategory) : "Alla",
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return documents.filter((document) => {
      const matchesCategory = category === "Alla" || document.category === category;
      const matchesQuery =
        !normalized ||
        [document.name, document.description, document.category, document.year].some((value) => value.toLowerCase().includes(normalized));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <SearchInput value={query} onChange={setQuery} placeholder="Sök dokument, år eller kategori" />
        <label className="flex min-h-12 items-center gap-3 rounded border border-slate-200 bg-white px-4 text-sm font-semibold text-brand-900 shadow-sm">
          Kategori
          <select
            className="h-10 min-w-48 border-0 bg-transparent text-sm text-slate-700 outline-none"
            value={category}
            onChange={(event) => setCategory(event.target.value as DocumentCategory | "Alla")}
          >
            <option>Alla</option>
            {documentCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((document) => (
          <DocumentCard key={`${document.name}-${document.year}`} item={document} />
        ))}
      </div>
      {filtered.length === 0 ? <p className="mt-8 rounded bg-white p-6 text-slate-600">Inga dokument matchar din sökning.</p> : null}
    </div>
  );
}
