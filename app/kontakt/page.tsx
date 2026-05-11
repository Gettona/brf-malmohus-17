import Image from "next/image";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone, Users } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { InfoCard } from "@/components/InfoCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { boardMembers, responsibilityGroups, type BoardMember } from "@/data/boardMembers";
import { contact } from "@/data/contact";
import { officeDates2026 } from "@/data/officeHours";
import { getWordPressBoardMembers, getWordPressContactInfo, getWordPressOfficeDates } from "@/lib/wordpress";

export default async function ContactPage() {
  const [contactInfo, contactBoardMembers, contactOfficeDates] = await Promise.all([
    getWordPressContactInfo(contact).catch(() => contact),
    getWordPressBoardMembers(boardMembers).catch(() => boardMembers),
    getWordPressOfficeDates(officeDates2026).catch(() => officeDates2026),
  ]);

  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Kontakt"
        title="Kontakta föreningen"
        description="Här hittar du föreningens kontaktuppgifter, styrelse, övriga roller, expedition och kontaktformulär."
      />

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <InfoCard
          title="E-post"
          icon={Mail}
          description={
            <a href={contactInfo.emailHref} className="font-semibold text-brand-700 underline">
              {contactInfo.email}
            </a>
          }
        />
        <InfoCard
          title="Telefon"
          icon={Phone}
          description={
            <a href={contactInfo.phoneHref} className="font-semibold text-brand-700 underline" aria-label={`Ring föreningen på ${contactInfo.phone}`}>
              {contactInfo.phone}
            </a>
          }
        />
        <InfoCard title="Expedition" icon={MapPin} description={contactInfo.expeditionAddress} />
      </section>

      <section className="mt-16">
        <SectionHeader eyebrow="Styrelsen" title="Styrelsemedlemmar" description="Kontakta gärna rätt person om du vet vem ärendet gäller. Annars går det bra att kontakta styrelsen gemensamt." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {contactBoardMembers.map((member) => (
            <BoardMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader eyebrow="Ansvar" title="Övriga roller och ansvarsområden" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {responsibilityGroups.map((group) => (
            <article key={group.title} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-900">{group.title}</h3>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600">
                {group.people.map((person) => (
                  <li key={`${group.title}-${person.name}`} className="flex flex-wrap items-center justify-between gap-2">
                    <span>{person.name}</span>
                    {person.phone && person.phoneHref ? (
                      <a href={person.phoneHref} className="font-semibold text-brand-700 underline" aria-label={`Ring ${person.name} på ${person.phone}`}>
                        {person.phone}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="kontaktformular" className="scroll-mt-24 mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-5">
          <SectionHeader eyebrow="Expeditionen" title="Besök och telefontid" />
          <InfoCard title="Adress" description={contactInfo.expeditionAddress} icon={MapPin} />
          <InfoCard
            title="Telefon"
            icon={Phone}
            description={
              <a href={contactInfo.phoneHref} className="font-semibold text-brand-700 underline" aria-label={`Ring expeditionen på ${contactInfo.phone}`}>
                {contactInfo.phone}
              </a>
            }
          />
          <InfoCard title="Telefontid" description={contactInfo.telephoneHours} icon={Clock} />
        </div>

        <div>
          <SectionHeader eyebrow="2026" title="Expeditionens öppettider" description="Under 2026 kommer expeditionen att vara öppen mellan kl. 18.00-19.00 under dessa dagar." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {contactOfficeDates.map((item) => (
              <time key={item.date} dateTime={item.date} className="rounded border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-900 shadow-sm">
                {item.label}
              </time>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="Kontaktformulär"
            title="Skicka ett ärende"
            description="Beskriv ditt ärende så tydligt som möjligt. Observera att formuläret ännu är en prototyp och inte skickar e-post."
          />
          <div className="mt-8 rounded bg-brand-900 p-6 text-white">
            <Users aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold">Kontakta föreningen</h3>
            <p className="mt-3 text-brand-50">
              E-post:{" "}
              <a href={contactInfo.emailHref} className="font-semibold underline">
                {contactInfo.email}
              </a>
            </p>
            <p className="mt-2 text-brand-50">
              Telefon:{" "}
              <a href={contactInfo.phoneHref} className="font-semibold underline" aria-label={`Ring föreningen på ${contactInfo.phone}`}>
                {contactInfo.phone}
              </a>
            </p>
            <p className="mt-2 text-brand-50">Expedition: {contactInfo.expeditionAddress}</p>
          </div>
        </div>
        <Suspense fallback={<p className="rounded bg-white p-6 text-slate-600">Laddar kontaktformulär...</p>}>
          <ContactForm />
        </Suspense>
      </section>
    </PageContainer>
  );
}

function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <article className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
      {member.image ? (
        <Image
          src={member.image}
          alt={`Bild på ${member.name}, ${member.role.toLowerCase()}`}
          width={420}
          height={420}
          className="aspect-square h-auto w-full object-cover"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-brand-50 text-4xl font-semibold text-brand-700">
          {member.name.charAt(0)}
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-brand-900">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-slate-600">{member.role}</p>
        {member.phone && member.phoneHref ? (
          <a href={member.phoneHref} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline" aria-label={`Ring ${member.name} på ${member.phone}`}>
            <Phone aria-hidden="true" size={16} />
            {member.phone}
          </a>
        ) : null}
      </div>
    </article>
  );
}
