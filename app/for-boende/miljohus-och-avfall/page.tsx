import Link from "next/link";
import { AlertTriangle, ExternalLink, Recycle, Trash2, XCircle } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { wasteMistakes, wasteNotAllowed, wasteSections } from "@/data/residentPages";

const sectionIcons = [Recycle, Trash2, ExternalLink];

export default function WastePage() {
  return (
    <PageContainer className="py-16">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <SectionHeader
            eyebrow="För boende"
            title="Miljöhus och avfall"
            description="Miljöhuset fungerar bäst när vi sorterar rätt, delar stora förpackningar och lämnar grovavfall på rätt plats."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/felguide" className="focus-ring inline-flex items-center justify-center rounded bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900">
              Anmäl fel i miljöhuset
            </Link>
            <a
              href="/documents/infomiljohus-200429.pdf"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-brand-200 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
            >
              Öppna miljöhusinformation <ExternalLink aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <aside className="rounded border border-red-200 bg-red-50 p-6 text-red-900">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <AlertTriangle aria-hidden="true" size={22} />
            Felsortering kostar alla
          </h2>
          <p className="mt-3 text-sm leading-6">
            Extra tömningar, städning och felaktigt lämnat avfall blir kostnader för föreningen. Hjälp till genom att sortera rätt och aldrig lämna saker på golvet.
          </p>
        </aside>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {wasteSections.map((section, index) => (
          <InfoCard
            key={section.title}
            title={section.title}
            icon={sectionIcons[index]}
            description={
              <div className="grid gap-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            }
          />
        ))}
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="rounded border border-red-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-brand-900">
            <XCircle aria-hidden="true" size={22} />
            Detta får inte lämnas i miljöhuset
          </h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {wasteNotAllowed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-brand-900">Vanliga misstag</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {wasteMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-6 rounded bg-brand-50 p-4 text-sm leading-6 text-slate-700">
            Grovavfall och farligt avfall lämnas gratis på Sysavs återvinningscentraler, till exempel Norra Hamnens återvinningscentral eller Bunkeflo återvinningscentral.
          </div>
        </article>
      </section>
    </PageContainer>
  );
}
