"use client";

import { Search } from "lucide-react";

export function SearchInput({
  value,
  onChange,
  placeholder = "Sök",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded border border-slate-200 bg-white px-4 text-slate-500 shadow-sm">
      <Search aria-hidden="true" size={18} />
      <span className="sr-only">{placeholder}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full border-0 bg-transparent text-sm text-brand-900 outline-none placeholder:text-slate-500"
      />
    </label>
  );
}
