"use client";
import { useState } from "react";
import { Button, Icon, cx } from "@/components/ui";

const Y = "check";
const COMPARE: { group: string; rows: [string, string, string, string, string][] }[] = [
  { group: "FinOps", rows: [
    ["Expense management & receipt capture", Y, Y, Y, Y],
    ["Budgets & approval workflows", Y, Y, Y, Y],
    ["Procurement & vendor intelligence", "—", Y, Y, Y],
    ["Invoice & AP/AR automation", "—", Y, Y, Y],
  ] },
  { group: "RevOps", rows: [
    ["CRM, pipeline & quotations", "—", "—", Y, Y],
    ["Collections & cash-flow forecasting", "—", "Basic", Y, Y],
  ] },
  { group: "Payments", rows: [
    ["Supplier payments & bulk transfers", Y, Y, Y, Y],
    ["Automated bank reconciliation", "—", Y, Y, Y],
    ["Multi-currency accounts", "—", "—", Y, Y],
  ] },
  { group: "Compliance", rows: [
    ["VAT, WHT & PAYE tax engine", Y, Y, Y, Y],
    ["NRS e-invoicing", Y, Y, Y, Y],
    ["Risk, audit & ESG reporting", "—", "—", Y, Y],
  ] },
  { group: "AI agents", rows: [
    ["AI CFO", "Insights", Y, Y, Y],
    ["AI Procurement", "—", Y, Y, Y],
    ["All seven AI agents", "—", "—", Y, Y],
  ] },
  { group: "Platform & support", rows: [
    ["Users", "Up to 10", "Up to 50", "Unlimited", "Unlimited"],
    ["Entities", "1", "Up to 3", "Up to 10", "Multi-country"],
    ["SSO & advanced roles", "—", "—", Y, Y],
    ["API / ESB access", "—", "—", "Add-on", Y],
    ["Support", "Email & chat", "Priority", "Dedicated manager", "Custom SLA"],
  ] },
];
const PLANS = [["Starter", "₦250,000 / month", "Talk to Sales"], ["Growth", "₦650,000 / month", "Talk to Sales"], ["Enterprise", "₦1.5M+ / month", "Talk to Sales"], ["Custom", "Custom quote", "Get a Quote"]];

const Cell = ({ v }: { v: string }) =>
  v === Y ? <Icon name="Check" size={20} className="mx-auto text-teal-text" /> : <span className={cx("text-sm", v === "—" ? "text-ink-3" : "text-ink")}>{v === "—" ? <><span aria-hidden="true">—</span><span className="sr-only">Not included</span></> : v}</span>;

export function CompareTable() {
  const [sel, setSel] = useState(1); // mobile: Growth selected by default, as in the design
  // On mobile only the selected plan's column is shown; desktop shows all four.
  const col = (i: number) => (i === sel ? "table-cell" : "hidden md:table-cell");
  return (
    <div className="flex w-full flex-col gap-4">
      <div role="radiogroup" aria-label="Choose a plan to compare" className="grid grid-cols-4 gap-1 rounded-full bg-subtle p-1 md:hidden">
        {PLANS.map(([n], i) => (
          <button key={n} type="button" role="radio" aria-checked={sel === i} onClick={() => setSel(i)} className={cx("press min-h-11 rounded-full px-1 text-sm font-semibold transition-colors duration-200 ease-in-out", sel === i ? "bg-white text-ink shadow-sm" : "text-ink-2")}>{n}</button>
        ))}
      </div>
      <p className="text-center text-xs text-ink-3 md:hidden">Prices shown for annual billing.</p>
      <div className="w-full overflow-hidden rounded-2xl border border-line bg-white md:overflow-x-auto md:rounded-3xl">
        <table className="w-full border-collapse text-left md:min-w-[880px]">
          <caption className="sr-only">Plan comparison</caption>
          <thead>
            <tr>
              <th className="hidden w-[32%] p-6 align-bottom text-xs font-normal text-ink-3 md:table-cell">Prices shown for annual billing.</th>
              {PLANS.map(([n, p, c], i) => (
                <th key={n} scope="col" colSpan={1} className={cx("p-5 text-left align-top md:p-6 md:text-center", i === 1 && "bg-teal-tint", col(i))}>
                  <div className="flex flex-col gap-2 md:items-center">
                    <span className="text-[15px] font-semibold md:font-display md:text-[32px] md:font-normal md:leading-9">{n}</span>
                    <span className="text-xs font-normal text-ink-2 md:text-sm">{p}</span>
                    <Button href={n === "Custom" ? "/contact" : "/request-demo"} size="sm" variant={i === 1 ? "primary" : "secondary"} className="w-full md:w-auto">{c}</Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {COMPARE.map((g) => (
            <tbody key={g.group}>
              <tr className="bg-subtle">
                <th colSpan={5} scope="colgroup" className="px-4 py-3 text-[13px] font-semibold text-ink md:px-6 md:t-eyebrow">{g.group}</th>
              </tr>
              {g.rows.map(([label, ...vals]) => (
                <tr key={label} className="border-t border-line">
                  <th scope="row" className="px-4 py-3.5 text-[13px] font-normal text-ink md:px-6 md:py-4 md:text-sm">{label}</th>
                  {vals.map((v, i) => (
                    <td key={i} className={cx("w-28 px-3 py-3.5 text-center md:w-auto md:px-6 md:py-4", i === 1 && "bg-teal-tint", col(i))}><Cell v={v} /></td>
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
