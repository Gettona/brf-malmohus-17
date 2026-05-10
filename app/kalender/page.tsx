import { EventCard } from "@/components/EventCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { events } from "@/data/events";

export default function CalendarPage() {
  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="Kalender"
        title="Händelser i föreningen"
        description="En enkel händelselista för expedition, möten och gemensamma aktiviteter. Kalenderknappen är en placeholder i första versionen."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {events.map((item) => (
          <EventCard key={`${item.date}-${item.title}`} item={item} />
        ))}
      </div>
    </PageContainer>
  );
}
