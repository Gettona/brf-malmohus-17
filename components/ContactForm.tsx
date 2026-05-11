"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, Paperclip } from "lucide-react";
import { contact, type ContactInfo } from "@/data/contact";
import { contactPageTexts, type ContactPageTexts } from "@/data/contactPageContent";

const maxFileSize = 10 * 1024 * 1024;
const acceptedFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const acceptedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];

type ContactFormProps = {
  contactInfo?: ContactInfo;
  texts?: ContactPageTexts;
};

export function ContactForm({ contactInfo = contact, texts = contactPageTexts }: ContactFormProps) {
  const searchParams = useSearchParams();
  const requestedType = searchParams.get("arende");
  const caseTypes = texts.formCaseTypes.length > 0 ? texts.formCaseTypes : contactPageTexts.formCaseTypes;
  const defaultCaseType = caseTypes[0] ?? "Felanmälan";
  const [caseType, setCaseType] = useState(caseTypes.includes(requestedType ?? "") ? requestedType ?? defaultCaseType : defaultCaseType);
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
      setFileError(texts.formFileTypeError);
      return;
    }

    if (file.size > maxFileSize) {
      event.target.value = "";
      setFileError(texts.formFileSizeError);
      return;
    }

    setFileName(file.name);
  }

  return (
    <form
      className="rounded border border-slate-200 bg-white p-6 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        window.alert(texts.formSubmitAlert);
      }}
    >
      {/* TODO: Koppla formuläret, inklusive bifogade filer, till backend/e-posttjänst/CMS/server action/formulärtjänst. */}
      <div className="grid gap-5">
        <p className="rounded bg-brand-50 p-4 text-sm leading-6 text-slate-700">
          {texts.formIntroBeforeEmail}{" "}
          <a href={contactInfo.emailHref} className="font-semibold text-brand-700 underline">
            {contactInfo.email}
          </a>
          {texts.formIntroAfterEmail}
        </p>

        <label className="grid gap-2 text-sm font-semibold text-brand-900">
          {texts.formCaseTypeLabel}
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
              {texts.formFaultAlertTitle}
            </p>
            <p className="mt-2">
              {texts.formFaultAlertBeforePhone}{" "}
              <a href={contactInfo.riksbyggenPhoneHref} className="font-semibold underline" aria-label={`Ring Riksbyggen på ${contactInfo.riksbyggenPhone}`}>
                {contactInfo.riksbyggenPhone}
              </a>
              {texts.formFaultAlertAfterPhone}
            </p>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-brand-900">
            {texts.formNameLabel}
            <input className="focus-ring min-h-12 rounded border border-slate-300 px-3 text-slate-800" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-brand-900">
            {texts.formEmailLabel}
            <input className="focus-ring min-h-12 rounded border border-slate-300 px-3 text-slate-800" type="email" required />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-brand-900">
          {texts.formAddressLabel}
          <input className="focus-ring min-h-12 rounded border border-slate-300 px-3 text-slate-800" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-900">
          {texts.formMessageLabel}
          <textarea className="focus-ring min-h-40 rounded border border-slate-300 p-3 text-slate-800" required />
        </label>

        <label className="grid gap-2 rounded border border-dashed border-slate-300 bg-warm-50 p-4 text-sm font-semibold text-brand-900">
          <span className="flex items-center gap-2">
            <Paperclip aria-hidden="true" size={18} />
            {texts.formFileLabel}
          </span>
          <input
            className="focus-ring w-full rounded border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800"
            type="file"
            accept={acceptedExtensions.join(",")}
            aria-describedby="file-help"
            onChange={handleFileChange}
          />
          <span id="file-help" className="text-sm font-normal leading-6 text-slate-600">
            {texts.formFileHelpText}
          </span>
          {fileName ? <span className="text-sm font-medium text-brand-700">{texts.formSelectedFileLabel} {fileName}</span> : null}
          {fileError ? <span className="text-sm font-semibold text-red-700">{fileError}</span> : null}
        </label>

        <button className="focus-ring rounded bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900" type="submit">
          {texts.formSubmitLabel}
        </button>
      </div>
    </form>
  );
}
