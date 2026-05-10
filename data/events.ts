import { officeDates2026 } from "@/data/officeHours";

export type EventItem = {
  date: string;
  title: string;
  description: string;
  category: string;
  location: string;
};

const officeEvents: EventItem[] = officeDates2026.map((item) => ({
  date: item.date,
  title: "Expeditionen öppen",
  description: "Expeditionen är öppen kl. 18.00-19.00.",
  category: "Expedition",
  location: "Albinsrogatan 23, gaveln",
}));

export const events: EventItem[] = [
  ...officeEvents,
  {
    date: "2026-05-19",
    title: "Styrelsemöte",
    description: "Ordinarie styrelsemöte. Ärenden skickas helst in minst en vecka innan.",
    category: "Styrelse",
    location: "Föreningslokalen",
  },
  {
    date: "2026-06-06",
    title: "Gårdsdag",
    description: "Vi hjälps åt att göra gården fin inför sommaren. Fika serveras.",
    category: "Gemenskap",
    location: "Innergården",
  },
  {
    date: "2026-06-18",
    title: "Årsstämma",
    description: "Kallelse och underlag publiceras i dokumentbanken när de är klara.",
    category: "Beslut",
    location: "Malmö, lokal meddelas",
  },
].sort((a, b) => a.date.localeCompare(b.date));
