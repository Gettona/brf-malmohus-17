import { CheckCircle2, History } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { maintenanceHistory } from "@/data/maintenanceHistory";

export default function MaintenanceHistoryPage() {
  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="För boende"
        title="Underhåll genom åren"
        description="Här visas ett urval av större underhållsåtgärder, renoveringar och förbättringar som har genomförts i BRF Malmöhus 17 genom åren."
      />

      <section className="mt-10 rounded border border-brand-200 bg-brand-50 p-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-brand-900">
          <History aria-hidden="true" size={24} />
          Större genomförda åtgärder
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
          Listan visar större projekt och förbättringar över tid. Mindre löpande reparationer, service och skötsel ingår inte alltid i sammanställningen.
        </p>
      </section>

      <section className="mt-12">
        <div className="grid gap-5">
          {maintenanceHistory.map((item, index) => (
            <article key={`${item.period}-${item.title}`} className="grid gap-4 rounded border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[8rem_1fr]">
              <div className="flex items-center gap-3 sm:block">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-brand-700 text-white sm:mb-3">{index + 1}</span>
                <p className="text-lg font-semibold text-brand-900">{item.period}</p>
              </div>
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-brand-900">
                  <CheckCircle2 aria-hidden="true" size={20} />
                  {item.title}
                </h2>
                {item.details ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.details}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
