import Link from "next/link";
import { Home, Menu } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";

const navItems = [
  { href: "/for-boende", label: "För boende" },
  { href: "/fraga", label: "Fråga" },
  { href: "/felguide", label: "Felguide" },
  { href: "/dokument", label: "Dokument" },
  { href: "/maklare", label: "Mäklare" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-warm-50/95 backdrop-blur">
      <PageContainer className="flex h-20 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="flex h-11 w-11 items-center justify-center rounded bg-brand-700 text-white">
            <Home aria-hidden="true" size={22} />
          </span>
          <span>
            <span className="block text-base font-semibold text-brand-900">BRF Malmöhus 17</span>
            <span className="block text-sm text-slate-600">Borgmästaregården, Malmö</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Huvudmeny">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative lg:hidden">
          <summary className="focus-ring flex cursor-pointer list-none items-center rounded-md p-2 text-brand-900">
            <Menu aria-hidden="true" />
            <span className="sr-only">Öppna meny</span>
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded border border-slate-200 bg-white p-2 shadow-soft">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded px-3 py-3 text-sm font-medium text-slate-700 hover:bg-brand-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </PageContainer>
    </header>
  );
}
