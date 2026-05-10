import Link from "next/link";
import { contact } from "@/data/contact";
import { PageContainer } from "@/components/PageContainer";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <PageContainer className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-brand-900">{contact.associationName}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{contact.area}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{contact.address}</p>
        </div>
        <div>
          <p className="font-semibold text-brand-900">Snabbt till</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <Link href="/felguide">Felguide</Link>
            <Link href="/dokument">Dokumentbank</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-brand-900">Kontakt</p>
          <p className="mt-3 text-sm text-slate-600">
            <a href={contact.emailHref} className="underline">
              {contact.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <a href={contact.phoneHref} className="underline" aria-label={`Ring expeditionen på ${contact.phone}`}>
              {contact.phone}
            </a>
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
