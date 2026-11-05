"use client";
import { useState } from "react";
import { Badge, Icon, cx } from "@/components/ui";

type Freq = "Monthly" | "Quarterly" | "Annual";
const DEADLINES: { date: string; iso: string; title: string; body: string; freq: Freq }[] = [
  { date: "10 Jun", iso: "20260610", title: "PAYE Remittance", body: "Pay-as-you-earn deduction remittance for the prior month.", freq: "Monthly" },
  { date: "21 Jun", iso: "20260621", title: "VAT Return Filing", body: "Monthly value-added tax return and remittance to NRS.", freq: "Monthly" },
  { date: "21 Jun", iso: "20260621", title: "WHT Remittance", body: "Withholding tax deducted from eligible payments in the prior month.", freq: "Monthly" },
  { date: "30 Jun", iso: "20260630", title: "E-Invoice Reconciliation", body: "Quarterly reconciliation of submitted e-invoices against NRS records.", freq: "Quarterly" },
  { date: "30 Jun", iso: "20260630", title: "CIT Filing", body: "Companies Income Tax return for the prior financial year.", freq: "Annual" },
  { date: "31 Jan", iso: "20270131", title: "Annual Returns (CAC)", body: "Yearly filing with the Corporate Affairs Commission.", freq: "Annual" },
];
const RRULE: Record<Freq, string> = { Monthly: "FREQ=MONTHLY", Quarterly: "FREQ=MONTHLY;INTERVAL=3", Annual: "FREQ=YEARLY" };

function ics(list: typeof DEADLINES) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//XPensari//Compliance Calendar//EN"];
  list.forEach((d, i) => lines.push("BEGIN:VEVENT", `UID:xpensari-${i}-${d.iso}@xpensari.com`, `DTSTAMP:20260101T000000Z`, `DTSTART;VALUE=DATE:${d.iso}`, `RRULE:${RRULE[d.freq]}`, `SUMMARY:${d.title}`, `DESCRIPTION:${d.body}`, "END:VEVENT"));
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function Deadlines() {
  const [f, setF] = useState<"All" | Freq>("All");
  const list = DEADLINES.filter((d) => f === "All" || d.freq === f);
  const download = () => {
    const url = URL.createObjectURL(new Blob([ics(list)], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "xpensari-compliance-calendar.ics";
    a.click();
    URL.revokeObjectURL(url);
  };
  const first = list[0];
  const gcal = first ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(first.title)}&dates=${first.iso}/${first.iso}&recur=${encodeURIComponent("RRULE:" + RRULE[first.freq])}&details=${encodeURIComponent(first.body)}` : "#";
  return (
    <div id="deadlines" className="flex scroll-mt-28 flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div role="tablist" aria-label="Filter deadlines" className="flex flex-wrap gap-2">
          {(["All", "Monthly", "Quarterly", "Annual"] as const).map((x) => (
            <button key={x} role="tab" aria-selected={f === x} onClick={() => setF(x)} className={cx("rounded-full border px-4 py-2 text-sm font-medium transition-colors", f === x ? "border-navy bg-navy text-cream" : "border-line bg-white hover:border-navy")}>{x}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={download} className="inline-flex items-center gap-2 rounded-lg border border-navy px-4 py-2 text-sm font-semibold hover:bg-navy hover:text-cream"><Icon name="Calendar" size={16} /> Download .ics</button>
          <a href={gcal} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-navy px-4 py-2 text-sm font-semibold hover:bg-navy hover:text-cream">Add to Google Calendar</a>
        </div>
      </div>
      <ul className="flex flex-col rounded-3xl border border-line bg-white px-6 md:px-8">
        {list.map((d, i) => (
          <li key={d.title} className={cx("fade-in flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:gap-8", i > 0 && "border-t border-line")}>
            <span className="font-display w-24 shrink-0 text-[32px] leading-9 text-teal-text">{d.date}</span>
            <span className="flex flex-1 flex-col gap-1"><span className="text-base font-semibold">{d.title}</span><span className="text-sm text-ink-2">{d.body}</span></span>
            <Badge tone={d.freq === "Monthly" ? "teal" : d.freq === "Quarterly" ? "amber" : "neutral"}>{d.freq}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
