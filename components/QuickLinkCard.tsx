import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export function QuickLinkCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link href={href} className="focus-ring group rounded border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-brand-50 text-brand-700">
          <Icon aria-hidden="true" size={22} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold text-brand-900">{title}</span>
          <span className="mt-2 block text-sm leading-6 text-slate-600">{description}</span>
        </span>
        <ArrowRight className="mt-1 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-700" aria-hidden="true" size={18} />
      </div>
    </Link>
  );
}
