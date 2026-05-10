import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";

export function Hero() {
  return (
    <section className="relative min-h-[680px] overflow-hidden bg-brand-900 text-white">
      <Image
        src="/images/gårdsbild 2.jpg"
        alt="Grön gård med bostadshus i BRF Malmöhus 17"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-900/55 sm:bg-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/92 via-brand-900/72 to-brand-900/24 sm:from-brand-900/88 sm:via-brand-900/60 sm:to-brand-900/10" />
      <PageContainer className="relative flex min-h-[680px] items-center pb-24 pt-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-100">Boendeportal</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">BRF Malmöhus 17</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white sm:text-xl">
            En tydlig och praktisk plats för boende, styrelse, mäklare och spekulanter. Här hittar du rätt kontakt,
            dokument, felanmälan och aktuell information.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-3 font-semibold text-brand-900" href="/felguide">
              Starta felguiden <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900" href="/dokument">
              Gå till dokument
            </Link>
          </div>
          <form action="/fraga" className="mt-10 flex max-w-2xl flex-col gap-3 rounded bg-white p-2 shadow-soft sm:flex-row">
            <label className="sr-only" htmlFor="hero-search">Vad letar du efter?</label>
            <div className="flex flex-1 items-center gap-3 px-3 text-slate-500">
              <Search aria-hidden="true" size={20} />
              <input
                id="hero-search"
                name="q"
                placeholder="Vad letar du efter?"
                className="h-12 w-full border-0 bg-transparent text-base text-brand-900 outline-none placeholder:text-slate-500"
              />
            </div>
            <button className="focus-ring rounded bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900" type="submit">
              Sök
            </button>
          </form>
        </div>
      </PageContainer>
    </section>
  );
}
