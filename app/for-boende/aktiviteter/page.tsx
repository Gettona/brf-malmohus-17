import Link from "next/link";
import { CalendarDays, ExternalLink, Phone, Users } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { activities, activityInfo } from "@/data/activities";

export default function ActivitiesPage() {
  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="För boende"
        title="Aktiviteter"
        description="Information om föreningens aktiviteter, gemenskap och återkommande evenemang."
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <InfoCard
          title="Återkommande aktiviteter"
          icon={CalendarDays}
          description="Föreningen har återkommande fritidsaktiviteter. Särskilda arrangemang annonseras här, på nyhetssidan och på anslagstavlorna i trapphusen."
        />
        <InfoCard
          title="Skådebanan"
          icon={ExternalLink}
          description={activityInfo.skadebanan}
        />
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {activities.map((activity) => (
          <article key={activity.title} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded bg-brand-50 text-brand-700">
              <Users aria-hidden="true" size={21} />
            </span>
            <h2 className="text-xl font-semibold text-brand-900">{activity.title}</h2>
            <p className="mt-3 text-sm font-semibold text-brand-700">{activity.schedule}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{activity.description}</p>
            {activity.contact && activity.phoneHref ? (
              <a href={activity.phoneHref} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline" aria-label={`Ring ${activity.contact} på ${activity.phone}`}>
                <Phone aria-hidden="true" size={16} />
                {activity.contact}: {activity.phone}
              </a>
            ) : null}
          </article>
        ))}
      </section>

      <section className="mt-14 rounded bg-brand-900 p-6 text-white">
        <h2 className="text-2xl font-semibold">Fritidslokaler och privata träffar</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-50">{activityInfo.facilities}</p>
        <Link href="/for-boende/lokaler-och-bokning" className="focus-ring mt-5 inline-flex rounded bg-white px-5 py-3 font-semibold text-brand-900">
          Läs om lokaler och bokning
        </Link>
      </section>
    </PageContainer>
  );
}
