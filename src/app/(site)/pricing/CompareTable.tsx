"use client";
import { useState } from "react";
import { Button, Icon, cx } from "@/components/ui";

const Y = "check";
const COMPARE: { group: string; rows: [string, string, string, string, string, string][] }[] = [
  { group: "Spend (FinOps)", rows: [
    ["Expense claims and receipt capture", Y, Y, Y, Y, Y],
    ["Approval workflows", "Simple", "Simple", "Multi-level", "Multi-level", "Multi-level"],
    ["Vendor portal and price comparison", "—", Y, Y, Y, Y],
    ["Purchase requests with history", "—", Y, Y, Y, Y],
    ["Vendors", "Up to 10", "Included", "Unlimited", "Unlimited", "Unlimited"],
    ["Store tracking", "—", "—", Y, Y, Y],
  ] },
  { group: "Revenue (RevOps)", rows: [
    ["CRM: leads, deals and quotes", "—", Y, Y, Y, Y],
    ["Forecasting", "—", "—", Y, Y, Y],
  ] },
  { group: "Bank and compliance", rows: [
    ["Bank accounts", "1", "2", "5", "As agreed", "Quoted"],
    ["Bank reconciliation", Y, Y, Y, Y, Y],
    ["Tax, NRS e-invoicing and payroll", "—", "—", Y, Y, Y],
  ] },
  { group: "AI agents", rows: [
    ["Ask SpendMerate and AI agents", "—", "—", Y, Y, Y],
  ] },
  { group: "Platform and support", rows: [
    ["Paid seats", "2", "5", "15", "Unlimited", "Quoted"],
    ["Requesters and vendors", "Free", "Free", "Free", "Free", "Free"],
    ["Branches", "—", "—", "—", Y, Y],
    ["Custom roles and audit", "—", "—", "—", Y, Y],
    ["Dedicated onboarding", "—", "—", "—", Y, Y],
    ["Single portals, multi-country, API access", "—", "—", "—", "—", Y],
  ] },
];
const PLANS = [["Free", "₦0 / month", "Start free", "/request-demo"], ["Starter", "₦24,000 / month", "Talk to sales", "/contact"], ["Growth", "₦72,000 / month", "Start free trial", "/request-demo"], ["Enterprise", "Quoted", "Talk to sales", "/contact"], ["Custom", "Quoted", "Get a quote", "/contact"]];
const FEAT = 2; // Growth column is highlighted

const Cell = ({ v }: { v: string }) =>
  v === Y ? <Icon name="Check" size={20} className="mx-auto text-teal-text" /> : <span className={cx("text-sm", v === "—" ? "text-ink-3" : "text-ink")}>{v === "—" ? <><span aria-hidden="true">—</span><span className="sr-only">Not included</span></> : v}</span>;

export function CompareTable() {
  const [sel, setSel] = useState(FEAT); // mobile: Growth selected by default, as in the design
  // On mobile only the selected plan's column is shown; desktop shows all five.
  const col = (i: number) => (i === sel ? "table-cell" : "hidden md:table-cell");
  return (
    <div className="flex w-full flex-col gap-4">
      <div role="radiogroup" aria-label="Choose a plan to compare" className="grid grid-cols-5 gap-0.5 rounded-full bg-subtle p-1 md:hidden">
        {PLANS.map(([n], i) => (
          <button key={n} type="button" role="radio" aria-checked={sel === i} onClick={() => setSel(i)} className={cx("press min-h-11 rounded-full px-0.5 text-[11px] font-semibold min-[360px]:text-xs sm:text-sm transition-colors duration-200 ease-in-out", sel === i ? "bg-white text-ink shadow-sm" : "text-ink-2")}>{n}</button>
        ))}
      </div>
      <p className="text-center text-xs text-ink-3 md:hidden">Prices shown for annual billing.</p>
      <div className="w-full overflow-hidden rounded-2xl border border-line bg-white md:overflow-x-auto md:rounded-3xl">
        <table className="w-full border-collapse text-left md:min-w-[980px]">
          <caption className="sr-only">Plan comparison</caption>
          <thead>
            <tr>
              <th className="hidden w-[28%] p-6 align-bottom text-xs font-normal text-ink-3 md:table-cell">Prices shown for annual billing.</th>
              {PLANS.map(([n, p, c, href], i) => (
                <th key={n} scope="col" colSpan={1} className={cx("p-5 text-left align-top md:p-6 md:text-center", i === FEAT && "bg-teal-tint", col(i))}>
                  <div className="flex flex-col gap-2 md:items-center">
                    <span className="text-[15px] font-semibold md:font-display md:text-[32px] md:font-normal md:leading-9">{n}</span>
                    <span className="text-xs font-normal text-ink-2 md:text-sm">{p}</span>
                    <Button href={href} size="sm" variant={i === FEAT ? "primary" : "secondary"} className="w-full md:w-auto">{c}</Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {COMPARE.map((g) => (
            <tbody key={g.group}>
              <tr className="bg-subtle">
                <th colSpan={6} scope="colgroup" className="px-4 py-3 text-[13px] font-semibold text-ink md:px-6 md:t-eyebrow">{g.group}</th>
              </tr>
              {g.rows.map(([label, ...vals]) => (
                <tr key={label} className="border-t border-line">
                  <th scope="row" className="px-4 py-3.5 text-[13px] font-normal text-ink md:px-6 md:py-4 md:text-sm">{label}</th>
                  {vals.map((v, i) => (
                    <td key={i} className={cx("w-28 px-3 py-3.5 text-center md:w-auto md:px-6 md:py-4", i === FEAT && "bg-teal-tint", col(i))}><Cell v={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
