import { Activity, Bell, Building2, Car, DoorOpen, History, KeyRound, Recycle, Router, ShieldAlert, Users } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { residentCards } from "@/data/faq";

const icons = [Activity, Users, Car, Router, DoorOpen, ShieldAlert, Building2, Recycle, Bell, KeyRound, ShieldAlert, History];
const ids = [
  "aktiviteter",
  "andrahandsuthyrning",
  "parkering",
  "bredband",
  "kontakt",
  "felanmalan",
  "lokaler",
  "avfall",
  "nyheter",
  "ordningsregler",
  "storningar",
  "underhall",
];

export default function ResidentsPage() {
  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="För boende"
        title="Praktisk information för vardagen"
        description="Här samlas sådant du som boende ofta behöver"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {residentCards.map((card, index) => (
          <a key={card.title} href={card.href} className="focus-ring rounded">
            <InfoCard title={card.title} description={card.description} icon={icons[index]} id={ids[index]} />
          </a>
        ))}
      </div>
    </PageContainer>
  );
}
