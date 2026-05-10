import Image from "next/image";
import { Car, ExternalLink } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { parkingInfo } from "@/data/parking";

export function ParkingContent() {
  return (
    <section className="bg-white py-16">
      <PageContainer>
        <SectionHeader eyebrow="Parkering & garage" title={parkingInfo.title} description={parkingInfo.intro} />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {parkingInfo.prices.map((price) => (
            <div key={price.label} className="rounded border border-slate-200 bg-warm-50 p-6">
              <p className="text-sm font-semibold text-slate-500">{price.label}</p>
              <p className="mt-2 text-2xl font-semibold text-brand-900">{price.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6">
            {parkingInfo.sections.map((section) => (
              <article key={section.heading} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-brand-900">{section.heading}</h3>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded bg-brand-900 p-6 text-white">
            <Car aria-hidden="true" size={28} />
            <h3 className="mt-4 text-2xl font-semibold">Digital kö via Riksbyggen</h3>
            <p className="mt-4 leading-7 text-brand-50">
              Reservation och köhantering för garage- och parkeringsplatser sker via Mitt Riksbyggen.
              Skapa konto eller logga in för att ställa dig i kö.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href={parkingInfo.queueUrl}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-3 font-semibold text-brand-900"
              >
                Till Mitt Riksbyggen <ExternalLink aria-hidden="true" size={17} />
              </a>
              <a
                href={parkingInfo.riksbyggenUrl}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-white/60 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Riksbyggen.se <ExternalLink aria-hidden="true" size={17} />
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-14">
          <SectionHeader
            title="Bifogade filer"
            description="Här visas bilderna och informationsbladen som hör till parkering och boendeparkering."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {parkingInfo.attachments.map((attachment, index) => (
              <article key={attachment.title} className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
                <a href={attachment.image} className="focus-ring block" target="_blank" rel="noreferrer">
                  <Image
                    src={attachment.image}
                    alt={attachment.alt}
                    width={index === 0 ? 2048 : 480}
                    height={index === 0 ? 1024 : 640}
                    className="h-72 w-full object-cover"
                  />
                </a>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-brand-900">{attachment.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{attachment.description}</p>
                  <a
                    href={attachment.image}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring mt-4 inline-flex items-center gap-2 rounded border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                  >
                    Öppna fil <ExternalLink aria-hidden="true" size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
