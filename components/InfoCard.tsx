import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function InfoCard({
  title,
  description,
  icon: Icon,
  id,
}: {
  title: string;
  description: ReactNode;
  icon?: LucideIcon;
  id?: string;
}) {
  return (
    <article id={id} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
      {Icon ? (
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded bg-brand-50 text-brand-700">
          <Icon aria-hidden="true" size={21} />
        </span>
      ) : null}
      <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-slate-600">{description}</div>
    </article>
  );
}
