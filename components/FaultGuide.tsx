"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Phone } from "lucide-react";
import { faultOptions, riksbyggenContact, type FaultAction } from "@/data/faultGuide";

export function FaultGuide() {
  const [selectedId, setSelectedId] = useState(faultOptions[0].id);
  const selected = useMemo(() => faultOptions.find((item) => item.id === selectedId) ?? faultOptions[0], [selectedId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-5">
        <div className="rounded border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid gap-2">
            {faultOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                aria-pressed={selectedId === option.id}
                className={`focus-ring flex min-h-14 items-center justify-between gap-3 rounded px-4 py-3 text-left text-sm font-semibold transition ${
                  selectedId === option.id ? "bg-brand-700 text-white" : "text-brand-900 hover:bg-brand-50"
                }`}
              >
                <span>{option.label}</span>
                {option.acute ? <AlertTriangle aria-hidden="true" className="shrink-0" size={17} /> : <ArrowRight aria-hidden="true" className="shrink-0" size={17} />}
              </button>
            ))}
          </div>
        </div>
        <RiksbyggenInfo />
      </div>

      <section className="rounded border border-slate-200 bg-white p-6 shadow-soft" aria-live="polite">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-brand-900">{selected.label}</h2>
          <span className={`rounded px-3 py-1 text-sm font-semibold ${selected.acute ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-700"}`}>
            {selected.acute ? "Akut ärende" : "Kan oftast hanteras ordinarie väg"}
          </span>
        </div>
        <div className="mt-6 grid gap-4">
          <GuideBlock title="Vad du ska göra" text={selected.action} />
          <GuideBlock title="Vem du kontaktar" text={selected.contact} />
          <GuideBlock title="Jour" text={selected.jour} />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {selected.actions.map((action) => (
            <ActionLink key={`${selected.id}-${action.label}`} action={action} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionLink({ action }: { action: FaultAction }) {
  const className =
    action.variant === "primary"
      ? "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded bg-brand-700 px-5 py-3 text-center font-semibold text-white hover:bg-brand-900"
      : "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded border border-brand-200 px-5 py-3 text-center font-semibold text-brand-700 hover:bg-brand-50";

  const icon = action.href.startsWith("tel:") ? <Phone aria-hidden="true" size={18} /> : action.external ? <ExternalLink aria-hidden="true" size={18} /> : <ArrowRight aria-hidden="true" size={18} />;

  if (action.external || action.href.startsWith("tel:")) {
    return (
      <a href={action.href} className={className} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined} aria-label={action.ariaLabel}>
        {action.label} {icon}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label} {icon}
    </Link>
  );
}

function GuideBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded bg-warm-100 p-4">
      <h3 className="flex items-center gap-2 font-semibold text-brand-900">
        <CheckCircle2 aria-hidden="true" size={18} /> {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{renderPhoneLinks(text)}</p>
    </div>
  );
}

function renderPhoneLinks(text: string) {
  const phoneMap: Record<string, { href: string; ariaLabel: string }> = {
    "0771-860 860": { href: "tel:0771860860", ariaLabel: "Ring Riksbyggen Dag och Natt på 0771 860 860" },
    "0704-023 395": { href: "tel:0704023395", ariaLabel: "Ring vaktmästaren på 0704 023 395" },
    "112": { href: "tel:112", ariaLabel: "Ring 112" },
  };
  const pattern = /(0771-860 860|0704-023 395|112)/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const phone = phoneMap[part];

    if (!phone) {
      return part;
    }

    return (
      <a key={`${part}-${index}`} href={phone.href} className="font-semibold text-brand-700 underline" aria-label={phone.ariaLabel}>
        {part}
      </a>
    );
  });
}

function RiksbyggenInfo() {
  return (
    <aside className="rounded border border-brand-200 bg-brand-50 p-5 text-sm leading-6 text-slate-700">
      <h2 className="text-xl font-semibold text-brand-900">{riksbyggenContact.title}</h2>
      <p className="mt-3">
        Telefon:{" "}
        <a href={riksbyggenContact.phoneHref} className="font-semibold text-brand-700 underline" aria-label="Ring Riksbyggen Dag och Natt på 0771 860 860">
          {riksbyggenContact.phone}
        </a>
        , dygnet runt.
      </p>
      <p className="mt-3 rounded border border-red-200 bg-red-50 p-3 font-medium text-red-800">
        OBS! Utryckning mellan 16.00-08.00 sker under jourtid och kan vara kostsam. Ring därför inte jouren i onödan.
      </p>
      <p className="mt-3">
        Hemsida:{" "}
        <a href={riksbyggenContact.websiteHref} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 underline">
          {riksbyggenContact.websiteLabel}
        </a>
      </p>
      <p className="mt-3">
        Felanmälan för fastigheten görs alltid till Riksbyggen Dag & Natt. Dit hör du av dig om saker som behöver åtgärdas i fastigheten.
        Vaktmästarna åtgärdar i normalfallet bara fel som har anmälts via Riksbyggen Dag & Natt.
      </p>
      <div className="mt-4">
        <p className="font-semibold text-brand-900">Exempel på ärenden:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>fönster som kärvar</li>
          <li>problem med belysning i trapphus eller källare</li>
          <li>trasiga maskiner i tvättstugan</li>
          <li>borttappad lägenhetsnyckel eller elektronisk nyckeltagg</li>
          <li>tvättkolv</li>
          <li>nya luftfilter till fönster</li>
        </ul>
      </div>
      <p className="mt-4">Din egen ytterdörr och installationer inne i din lägenhet ansvarar du själv för.</p>
      <p className="mt-3">Du ringer även Riksbyggen Dag & Natt vid akuta fel och vid ordningsproblem i trappa eller på gård.</p>
      <p className="mt-3 font-medium text-red-800">Klockan 16.00-08.00 är jourtid. Utryckningar under denna tid är mycket kostsamma.</p>
      <div className="mt-4 rounded bg-white p-4">
        <p className="font-semibold text-brand-900">Vaktmästare</p>
        <p className="mt-2">
          Vaktmästaren nås på{" "}
          <a href={riksbyggenContact.caretakerPhoneHref} className="font-semibold text-brand-700 underline" aria-label="Ring vaktmästaren på 0704 023 395">
            {riksbyggenContact.caretakerPhone}
          </a>
          , men felanmälan ska fortfarande registreras via Riksbyggen Dag & Natt.
        </p>
        <p className="mt-3 font-semibold text-brand-900">Vaktmästaren är på plats:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>måndag-torsdag 07.30-16.00</li>
          <li>fredag 07.30-14.00</li>
        </ul>
        <p className="mt-3">Övriga tider, eller vid akuta problem, kontakta Riksbyggen Dag & Natt.</p>
      </div>
    </aside>
  );
}
