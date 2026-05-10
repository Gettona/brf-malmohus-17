import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, Phone, PlugZap, Router, Tv } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { contact } from "@/data/contact";
import { tvChannels, utilityFaq, utilityHighlights } from "@/data/residentPages";

const highlightIcons = [Router, Tv, PlugZap];

export default function UtilitiesPage() {
  return (
    <PageContainer className="py-16">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="För boende"
            title="Bredband, TV och el"
            description="Här finns praktisk information om föreningens bredband, IP-telefoni, kabel-TV och gemensamma elavtal."
          />
        </div>
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
          <Image src="/images/bredband-tv-el/elcentral.jpg" alt="Elcentral efter föreningens elstamsbyte." width={900} height={675} className="aspect-[4/3] w-full object-cover" priority />
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {utilityHighlights.map((item, index) => (
          <InfoCard
            key={item.title}
            title={item.title}
            icon={highlightIcons[index]}
            description={
              <div>
                <p className="text-2xl font-semibold text-brand-900">{item.value}</p>
                <p className="mt-3">{item.text}</p>
              </div>
            }
          />
        ))}
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-brand-900">
            <Router aria-hidden="true" size={22} />
            Bredband och telefoni
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
            <p>Föreningen har avtal med NetAtOnce för bredband och IP-telefoni. Bredband på 1000/1000 Mbps ingår i avgiften.</p>
            <p>Alla lägenheter är anslutna till bredbandsnätet. Koppla dator eller router till bredbandsuttaget. Vill du ansluta flera enheter, eller använda wifi, behöver du en egen router.</p>
            <p>Är du intresserad av IP-telefoni kontaktar du NetAtOnce. Basavgiften ingår i avgiften, men startavgift och samtalskostnader eller abonnemangskostnad kan tillkomma.</p>
          </div>
          <div className="mt-5 grid gap-3 text-sm">
            <a href="tel:0470729900" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <Phone aria-hidden="true" size={16} />
              NetAtOnce: 0470-72 99 00
            </a>
            <a href="https://www.netatonce.se" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <ExternalLink aria-hidden="true" size={16} />
              www.netatonce.se
            </a>
            <a href="/documents/netatonce-ip-telefoni-avtal.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <ExternalLink aria-hidden="true" size={16} />
              Avtal för IP-telefoni
            </a>
          </div>
        </article>

        <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-brand-900">
            <Tv aria-hidden="true" size={22} />
            TV
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
            <p>Föreningen är ansluten till kabel-TV via Tele2. Nätet kopplades in 2016 och uppdaterades då med nya kablar och uttag.</p>
            <p>Basutbudet finns både analogt och digitalt. Vid inflyttning kontaktar du Tele2 för att beställa TV-box. Vid avflyttning ska boxen returneras till Tele2.</p>
          </div>
          <div className="mt-5 grid gap-3 text-sm">
            <a href="tel:90222" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <Phone aria-hidden="true" size={16} />
              Tele2: 90222
            </a>
            <a href="mailto:kundservice@tele2.se" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <Mail aria-hidden="true" size={16} />
              kundservice@tele2.se
            </a>
            <a href="https://www.tele2.se" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <ExternalLink aria-hidden="true" size={16} />
              www.tele2.se
            </a>
          </div>
        </article>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-brand-900">
            <PlugZap aria-hidden="true" size={22} />
            El
          </h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
            <p>Föreningen bytte elstammar 2019. Alla lägenheter har därmed möjlighet att koppla in 3-fas.</p>
            <p>Medlemmar kan fortfarande få ny elcentral installerad till föreningens reducerade pris. Säkerhetsuppgraderingen kostar 4 000 kronor och faktureras efter montering på avgiftsavin.</p>
            <p>Sedan 2010 är föreningen ansluten till gruppinköp av el. Varje hushåll betalar för sin egen förbrukning via avgiftsavin och mätaravläsning sker automatiskt, även vid avflyttning.</p>
          </div>
          <div className="mt-5 grid gap-3 text-sm">
            <a href={contact.emailHref} className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <Mail aria-hidden="true" size={16} />
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 font-semibold text-brand-700 underline">
              <Phone aria-hidden="true" size={16} />
              {contact.phone}
            </a>
          </div>
        </article>

        <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-brand-900">Vanliga frågor</h2>
          <div className="mt-5 grid gap-4">
            {utilityFaq.map((item) => (
              <div key={item.question} className="rounded bg-warm-100 p-4">
                <h3 className="font-semibold text-brand-900">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-14 rounded border border-brand-200 bg-brand-50 p-6">
        <h2 className="text-2xl font-semibold text-brand-900">TV-kanaler i basutbudet</h2>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {tvChannels.map((channel) => (
            <span key={channel} className="rounded bg-white px-3 py-2 text-sm font-medium text-slate-700">
              {channel}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded bg-brand-900 p-6 text-white">
        <h2 className="text-2xl font-semibold">Kontakt och support</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-50">
          Kontakta i första hand leverantören vid frågor om bredband, telefoni eller TV. För frågor om elcentral, energideklaration eller föreningens gemensamma elavtal kontaktar du styrelsen.
        </p>
        <div className="mt-5">
          <Link href="/kontakt" className="focus-ring inline-flex rounded bg-white px-5 py-3 font-semibold text-brand-900">
            Kontakta föreningen
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
