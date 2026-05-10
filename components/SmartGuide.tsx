"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileText, Search } from "lucide-react";
import { searchDocuments, tokenize } from "@/lib/searchDocuments";
import { smartGuideFaq, type SmartGuideFaqItem } from "@/data/smartGuideFaq";

export function SmartGuide({ initialQuery = "" }: { initialQuery?: string }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || searchParams.get("q") || "");

  const faqResults = useMemo(() => searchFaq(query), [query]);
  const documentResults = useMemo(() => searchDocuments(query), [query]);
  const hasQuery = query.trim().length > 1;

  return (
    <div className="grid gap-8">
      <form className="rounded border border-slate-200 bg-white p-3 shadow-soft" onSubmit={(event) => event.preventDefault()}>
        <label className="flex items-center gap-3 px-3 text-slate-500">
          <Search aria-hidden="true" size={20} />
          <span className="sr-only">Sök i Fråga Malmöhus 17</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Sök till exempel borra, störning, andrahandsuthyrning, parkering..."
            className="h-14 w-full border-0 bg-transparent text-base text-brand-900 outline-none placeholder:text-slate-500"
          />
        </label>
      </form>

      {!hasQuery ? (
        <div className="rounded border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
          Skriv ett ord eller en fråga för att söka i vanliga svar, stadgar och trivselregler.
        </div>
      ) : null}

      {hasQuery ? (
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <section>
            <h2 className="text-2xl font-semibold text-brand-900">Vanliga svar</h2>
            <div className="mt-5 grid gap-4">
              {faqResults.length > 0 ? (
                faqResults.map((item) => <FaqResultCard key={item.id} item={item} />)
              ) : (
                <p className="rounded border border-slate-200 bg-white p-5 text-sm text-slate-600">Inga vanliga svar matchade sökningen.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-900">Träffar i dokument</h2>
            <div className="mt-5 grid gap-4">
              {documentResults.length > 0 ? (
                documentResults.map((item) => {
                  const pdfUrl = item.page ? `${item.sourceUrl}#page=${item.page}` : item.sourceUrl;

                  return (
                    <article key={item.id} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <FileText aria-hidden="true" size={17} />
                        <span className="font-semibold text-brand-700">{item.documentTitle}</span>
                        {item.page ? <span>Sida {item.page}</span> : null}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-brand-900">{item.sectionTitle}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring mt-4 inline-flex items-center gap-2 rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
                      >
                        Öppna PDF <ArrowRight aria-hidden="true" size={16} />
                      </a>
                    </article>
                  );
                })
              ) : (
                <p className="rounded border border-slate-200 bg-white p-5 text-sm text-slate-600">Inga dokumentträffar hittades.</p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function FaqResultCard({ item }: { item: SmartGuideFaqItem }) {
  const content = (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-900">{item.question}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
      {item.href ? (
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          Gå vidare <ArrowRight aria-hidden="true" size={16} />
        </span>
      ) : null}
    </article>
  );

  return item.href ? (
    <Link className="focus-ring rounded" href={item.href}>
      {content}
    </Link>
  ) : (
    content
  );
}

function searchFaq(query: string): SmartGuideFaqItem[] {
  const terms = tokenize(query);

  if (terms.length === 0) {
    return [];
  }

  return smartGuideFaq
    .map((item) => {
      const haystack = [item.question, item.answer, ...(item.keywords ?? [])].join(" ").toLowerCase();
      const score = terms.reduce((sum, term) => sum + (normalize(haystack).includes(term) ? 1 : 0), 0);
      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o");
}
