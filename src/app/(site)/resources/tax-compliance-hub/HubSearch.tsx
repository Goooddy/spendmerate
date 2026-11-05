"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui";

const INDEX = [
  ["Nigeria Tax Act 2025 Overview", "#guides"],
  ["E-Invoicing Requirements", "#guides"],
  ["NRS Filing Deadlines", "/resources/compliance-calendar"],
  ["VAT & WHT Essentials", "#guides"],
  ["Record-Keeping Requirements", "#guides"],
  ["Compliance Checklist", "#guides"],
  ["VAT return deadline", "/resources/compliance-calendar"],
  ["PAYE remittance", "/resources/compliance-calendar"],
  ["E-invoicing readiness checklist", "/resources/insights/e-invoicing-readiness-checklist"],
];

export function HubSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const hits = useMemo(() => (q.trim() ? INDEX.filter(([t]) => t.toLowerCase().includes(q.trim().toLowerCase())) : []), [q]);
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); setOpen(true); }} className="relative w-full max-w-[480px]">
      <div className="flex items-center gap-2 rounded-2xl border border-line-strong bg-white py-1.5 pl-5 pr-1.5">
        <label htmlFor="hub-q" className="sr-only">Search the hub</label>
        <input id="hub-q" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} placeholder="Search guides, deadlines, checklists…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-3" autoComplete="off" />
        <button type="submit" className="rounded-lg bg-teal px-6 py-3 text-sm font-semibold hover:bg-[#13a382]">Search</button>
      </div>
      {open && q.trim() && (
        <ul className="fade-in absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-md">
          {hits.length ? hits.map(([t, h]) => (
            <li key={t}><Link href={h} onClick={() => setOpen(false)} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-page">{t}<Icon name="Arrow Right" size={16} className="text-teal-text" /></Link></li>
          )) : <li className="px-5 py-3 text-sm text-ink-3">No guides match “{q}”.</li>}
        </ul>
      )}
    </form>
  );
}
