import { Download } from "lucide-react";
import type { DocumentItem } from "@/data/documents";

export function DocumentCard({ item }: { item: DocumentItem }) {
  const isExternal = item.href.startsWith("http");

  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{item.category}</span>
          <span className="rounded bg-warm-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{item.type}</span>
        </div>
        <span className="shrink-0 text-sm font-medium text-slate-500">{item.year}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-brand-900">{item.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
      <a
        className="focus-ring mt-5 inline-flex items-center gap-2 rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        <Download aria-hidden="true" size={16} /> Ladda ner
      </a>
    </article>
  );
}
