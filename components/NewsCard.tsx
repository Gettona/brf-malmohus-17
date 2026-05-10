import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarPlus } from "lucide-react";
import type { NewsItem } from "@/data/news";

export function NewsCard({ item }: { item: NewsItem }) {
  const paragraphs = item.excerpt.split(/\n\s*\n/).filter(Boolean);
  const calendarHref = item.event ? createCalendarHref(item) : undefined;

  return (
    <article className="h-full overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
      {item.image ? (
        <Image src={item.image} alt={item.imageAlt ?? ""} width={720} height={420} className="aspect-[16/9] w-full object-cover" />
      ) : null}
      <div className="p-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <time dateTime={item.date} className="font-medium text-brand-700">{item.date}</time>
          <span className="rounded bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{item.category}</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-brand-900">{item.title}</h3>
        <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-600">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {item.href ? (
          <Link href={item.href} className="focus-ring mt-4 inline-flex items-center gap-2 rounded text-sm font-semibold text-brand-700">
            Läs mer <ArrowRight aria-hidden="true" size={16} />
          </Link>
        ) : null}
        {calendarHref ? (
          <a
            href={calendarHref}
            download={`${slugify(item.title)}.ics`}
            className="focus-ring mt-4 inline-flex items-center gap-2 rounded border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            <CalendarPlus aria-hidden="true" size={16} />
            Lägg till i kalender
          </a>
        ) : null}
      </div>
    </article>
  );
}

function createCalendarHref(item: NewsItem): string {
  const event = item.event;

  if (!event) {
    return "";
  }

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BRF Malmöhus 17//Nyheter//SV",
    "BEGIN:VEVENT",
    `UID:${slugify(item.title)}-${event.start}@malmohus17.se`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsValue(event.start)}`,
    event.end ? `DTEND:${formatIcsValue(event.end)}` : "",
    `SUMMARY:${escapeIcsText(item.title)}`,
    `DESCRIPTION:${escapeIcsText(item.excerpt)}`,
    event.location ? `LOCATION:${escapeIcsText(event.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function formatIcsValue(value: string): string {
  if (!value.includes("T")) {
    return `;VALUE=DATE:${value.replaceAll("-", "")}`;
  }

  return `:${formatIcsDate(new Date(value))}`;
}

function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
