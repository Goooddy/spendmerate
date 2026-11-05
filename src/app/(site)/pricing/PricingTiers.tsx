"use client";
import { useState } from "react";
import { Badge, Button, Icon, cx } from "@/components/ui";

type Tier = { name: string; badge?: string; desc: string; annual: string; monthly: string; noteA: string; noteM: string; cta: string; users: string; entities: string; volume: string; incTitle: string; inc: string[]; featured?: boolean; per?: boolean };

const TIERS: Tier[] = [
  { name: "Starter", desc: "For mid-market finance teams replacing spreadsheets and manual approvals.", annual: "₦250,000", monthly: "₦300,000", noteA: "Billed annually. ₦300,000 billed monthly.", noteM: "Billed monthly. Save 20% with annual billing.", cta: "Talk to Sales", users: "Up to 10", entities: "1", volume: "Up to ₦500M", incTitle: "Includes", inc: ["Expense management & corporate cards", "Budgets & approval workflows", "VAT, WHT & PAYE tax engine", "NRS e-invoicing", "AI CFO insights", "Email & chat support"], per: true },
  { name: "Growth", badge: "Recommended", featured: true, desc: "For upper mid-market teams running multiple departments or entities.", annual: "₦650,000", monthly: "₦780,000", noteA: "Billed annually. ₦780,000 billed monthly.", noteM: "Billed monthly. Save 20% with annual billing.", cta: "Talk to Sales", users: "Up to 50", entities: "Up to 3", volume: "Up to ₦5B", incTitle: "Everything in Starter, plus:", inc: ["Procurement & vendor intelligence", "Invoice & AP/AR automation", "Automated bank reconciliation", "AI CFO & AI Procurement agents", "Multi-entity consolidation", "Priority support"], per: true },
  { name: "Enterprise", desc: "For large enterprises that need the full platform and governance.", annual: "₦1.5M+", monthly: "₦1.8M+", noteA: "Starting price, billed annually. Final price depends on modules.", noteM: "Starting price, billed monthly. Final price depends on modules.", cta: "Talk to Sales", users: "Unlimited", entities: "Up to 10", volume: "Unlimited", incTitle: "Everything in Growth, plus:", inc: ["All seven AI agents", "RevOps: CRM, pipeline & collections", "Risk, audit & ESG reporting", "SSO & advanced roles", "Dedicated success manager"], per: true },
  { name: "Custom", desc: "For groups operating across countries or integrating at scale.", annual: "Custom", monthly: "Custom", noteA: "Quoted for your entities, countries and integrations.", noteM: "Quoted for your entities, countries and integrations.", cta: "Get a Custom Quote", users: "Unlimited", entities: "Multi-country", volume: "Unlimited", incTitle: "Everything in Enterprise, plus:", inc: ["Multi-country entities & currencies", "API / ESB access", "Custom integrations", "Custom SLAs"] },
];

export function PricingTiers() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="flex w-full flex-col items-center gap-12">
      <div role="radiogroup" aria-label="Billing period" className="flex items-center gap-1 rounded-full border border-line bg-subtle p-1">
        <button role="radio" aria-checked={!annual} onClick={() => setAnnual(false)} className={cx("rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150", !annual ? "bg-white text-ink shadow-sm" : "text-ink-2")}>Monthly</button>
        <button role="radio" aria-checked={annual} onClick={() => setAnnual(true)} className={cx("flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150", annual ? "bg-white text-ink shadow-sm" : "text-ink-2")}>
          Annually <Badge tone="amber">Save 20%</Badge>
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TIERS.map((t) => {
          const dk = t.featured;
          return (
            <div key={t.name} className={cx("card-lift flex flex-col gap-6 rounded-2xl border p-8", dk ? "border-navy-raised bg-navy" : "border-line bg-white")}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h3 className={cx("t-h3", dk ? "text-cream" : "text-ink")}>{t.name}</h3>
                  {t.badge && <Badge tone="teal">{t.badge}</Badge>}
                </div>
                <p className={cx("text-sm leading-[22px]", dk ? "text-mist" : "text-ink-2")}>{t.desc}</p>
              </div>
              <div className={cx("flex flex-col gap-1 border-t pt-6", dk ? "border-navy-raised" : "border-line")}>
                <div className="flex items-baseline gap-1">
                  <span key={String(annual)} className={cx("fade-in text-4xl font-semibold leading-10", dk ? "text-cream" : "text-ink")}>{annual ? t.annual : t.monthly}</span>
                  {t.per && <span className={cx("text-xs", dk ? "text-muted-dark" : "text-ink-3")}>/ month</span>}
                </div>
                <span className={cx("text-xs", dk ? "text-muted-dark" : "text-ink-3")}>{annual ? t.noteA : t.noteM}</span>
              </div>
              <Button href={t.name === "Custom" ? "/contact" : "/request-demo"} variant={dk ? "primary" : "secondary"} className="w-full">{t.cta}</Button>
              <dl className={cx("flex flex-col gap-2 border-t pt-4", dk ? "border-navy-raised" : "border-line")}>
                {[["Users", t.users], ["Entities", t.entities], ["Annual volume", t.volume]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <dt className={cx("text-xs", dk ? "text-muted-dark" : "text-ink-3")}>{k}</dt>
                    <dd className={cx("text-sm font-medium", dk ? "text-cream" : "text-ink")}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-3">
                <span className={cx("text-sm font-semibold", dk ? "text-cream" : "text-ink")}>{t.incTitle}</span>
                <ul className="flex flex-col gap-3">
                  {t.inc.map((f) => (
                    <li key={f} className={cx("flex gap-2 text-sm leading-[22px]", dk ? "text-mist" : "text-ink-2")}>
                      <Icon name="Check" size={20} className={cx("shrink-0", dk ? "text-teal-bright" : "text-teal-text")} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
