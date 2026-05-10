import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, DoorOpen, Mail, Sparkles, Users } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { contact } from "@/data/contact";
import { facilitiesImages, facilitiesSections } from "@/data/residentPages";

const sectionIcons = [CalendarCheck, Sparkles, DoorOpen, Users, Users];

export default function FacilitiesPage() {
  return (
    <PageContainer className="py-16">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="För boende"
            title="Lokaler och bokning"
            description="Här hittar du information om föreningens gemensamma lokaler, tvättstugor, hobbyrum, förråd och fritidslokaler."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className="focus-ring inline-flex items-center justify-center rounded bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900">
              Kontakta föreningen
            </Link>
            <a href={contact.emailHref} className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-brand-200 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50">
              <Mail aria-hidden="true" size={18} />
              {contact.email}
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/lokaler/fritidslokal-bisittaren-oversikt.jpg"
            alt="Fritidslokal i Bisittaren låghus."
            width={900}
            height={675}
            className="aspect-[4/3] w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {facilitiesSections.map((section, index) => (
          <InfoCard
            key={section.title}
            title={section.title}
            icon={sectionIcons[index]}
            description={
              <div className="grid gap-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.title === "Förråd" ? (
                  <p>
                    E-post:{" "}
                    <a href={contact.emailHref} className="font-semibold text-brand-700 underline">
                      {contact.email}
                    </a>
                  </p>
                ) : null}
                {section.list ? (
                  <ul className="list-disc space-y-1 pl-5">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            }
          />
        ))}
      </section>

      <section className="mt-14 rounded border border-brand-200 bg-brand-50 p-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-brand-900">
          <CheckCircle2 aria-hidden="true" size={22} />
          Bokning och ansvar
        </h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <p>För bokning av fritidslokaler kontaktas Anette Jensen eller Ann-Margreth Lexner. Deras telefonnummer finns anslagna i trapphusen.</p>
          <p>Den som lånar lokal ansvarar för städning, ordning och att lokalen lämnas i gott skick. Eventuell extra städning eller störningsjour debiteras lägenhetsinnehavaren.</p>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader title="Bilder från fritidslokalerna" description="Föreningen har en mindre lokal i Bisittaren låghus och en större lokal på Albinsrogatan 37." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {facilitiesImages.map((image) => (
            <article key={image.src} className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
              <Image src={image.src} alt={image.alt} width={700} height={520} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-brand-900">{image.title}</h3>
                {image.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{image.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
