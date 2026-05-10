import { CalendarPlus, MapPin } from "lucide-react";
import type { EventItem } from "@/data/events";

export function EventCard({ item }: { item: EventItem }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <time dateTime={item.date} className="text-sm font-semibold text-brand-700">{item.date}</time>
          <h3 className="mt-2 text-xl font-semibold text-brand-900">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <MapPin aria-hidden="true" size={16} /> {item.location}
          </p>
        </div>
        <button className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-brand-200 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50" type="button">
          <CalendarPlus aria-hidden="true" size={16} /> Lägg till
        </button>
      </div>
    </article>
  );
}
