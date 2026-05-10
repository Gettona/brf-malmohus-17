"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, Paperclip } from "lucide-react";
import { contact } from "@/data/contact";

const caseTypes = ["Felanmälan", "Fråga till styrelsen", "Parkering", "Dokument", "Mäklare", "Annat"];
const maxFileSize = 10 * 1024 * 1024;
const acceptedFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const acceptedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];
const fileHelpText = "Tillåtna filtyper: PDF, JPG, PNG, DOC och DOCX. Maxstorlek: 10 MB.";

export function ContactForm() {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("arende");
  const [caseType, setCaseType] = useState(caseTypes.includes(requestedType ?? "") ? requestedType ?? "Felanmälan" : "Felanmälan");
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");

  function handleCaseTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    setCaseType(event.target.value);
  }

  function handleCaseTypeInput(event: FormEvent<HTMLSelectElement>) {
    setCaseType(event.currentTarget.value);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileError("");
    setFileName("");

    if (!file) {
      return;
    }

    const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
    const isAllowedType = acceptedFileTypes.includes(file.type) || acceptedExtensions.includes(extension);

    if (!isAllowedType) {
      event.target.value = "";
      setFileError("Filtypen stöds inte. Välj PDF, JPG, PNG, DOC eller DOCX.");
      return;
    }

    if (file.size > maxFileSize) {
      event.target.value = "";
      setFileError("Filen är för stor. Maxstorlek är 10 MB.");
      return;
    }

    setFileName(file.name);
  }

  return (
    <form
      className="rounded border border-slate-200 bg-white p-6 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        window.alert("Tack. Formuläret är en prototyp och skickar ännu inte e-post.");
      }}
    >
      {/* TODO: Koppla formuläret, inklusive bifogade filer, till backend/e-posttjänst/CMS/server action/formulärtjänst. */}
      <div className="grid gap-5">
        <p className="rounded bg-brand-50 p-4 text-sm leading-6 text-slate-700">
          Formuläret är ett förberett kontaktflöde. Tills e-postkoppling är på plats når du styrelsen direkt via{" "}
          <a href={contact.emailHref} className="font-semibold text-brand-700 underline">
            {contact.email}
          </a>
          .
        </p>

        <label className="grid gap-2 text-sm font-semibold text-brand-900">
          Ärendetyp
          <select
            className="focus-ring min-h-12 rounded border border-slate-300 bg-white px-3 text-slate-800"
            value={caseType}
            onChange={handleCaseTypeChange}
            onInput={handleCaseTypeInput}
          >
            {caseTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        {caseType === "Felanmälan" ? (
          <div className="rounded border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800" role="alert">
            <p className="flex gap-2 font-semibold">
              <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
              Viktigt
            </p>
            <p className="mt-2">
              Ordinarie felanmälan görs till Riksbyggen på{" "}
              <a href="tel:0771860860" className="font-semibold underline" aria-label="Ring Riksbyggen på 0771 860 860">
                0771-860 860
              </a>
              . Detta formulär skickas till styrelsen och ersätter inte en felanmälan till Riksbyggen.
            </p>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-brand-900">
            Namn
            <input className="focus-ring min-h-12 rounded border border-slate-300 px-3 text-slate-800" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-brand-900">
            E-post
            <input className="focus-ring min-h-12 rounded border border-slate-300 px-3 text-slate-800" type="email" required />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-brand-900">
          Adress eller lägenhetsnummer
          <input className="focus-ring min-h-12 rounded border border-slate-300 px-3 text-slate-800" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-900">
          Meddelande
          <textarea className="focus-ring min-h-40 rounded border border-slate-300 p-3 text-slate-800" required />
        </label>

        <label className="grid gap-2 rounded border border-dashed border-slate-300 bg-warm-50 p-4 text-sm font-semibold text-brand-900">
          <span className="flex items-center gap-2">
            <Paperclip aria-hidden="true" size={18} />
            Bifoga fil
          </span>
          <input
            className="focus-ring w-full rounded border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800"
            type="file"
            accept={acceptedExtensions.join(",")}
            aria-describedby="file-help"
            onChange={handleFileChange}
          />
          <span id="file-help" className="text-sm font-normal leading-6 text-slate-600">
            Du kan bifoga en fil till alla ärendetyper. {fileHelpText}
          </span>
          {fileName ? <span className="text-sm font-medium text-brand-700">Vald fil: {fileName}</span> : null}
          {fileError ? <span className="text-sm font-semibold text-red-700">{fileError}</span> : null}
        </label>

        <button className="focus-ring rounded bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900" type="submit">
          Skicka ärende
        </button>
      </div>
    </form>
  );
}
