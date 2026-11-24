"use client";
import { useState } from "react";
import { Badge, Button, Icon, cx } from "@/components/ui";

type Tier = {
  name: string; badge?: string; desc: string; annual: string; monthly: string; noteA: string; noteM: string;
  cta: string; href: string; seats: string; banks: string; incTitle: string; inc: string[]; featured?: boolean; per?: boolean;
};

// Placeholder prices from the design: replace before launch.
const TIERS: Tier[] = [
  { name: "Free", desc: "For teams trying SpendMerate on their own spending.", annual: "₦0", monthly: "₦0", noteA: "Free for as long as you need it.", noteM: "Free for as long as you need it.", cta: "Start free", href: "/request-demo", seats: "2", banks: "1", incTitle: "Includes", inc: ["Expense claims and approvals", "Receipt capture", "Up to 10 vendors", "Basic dashboard"], per: true },
  { name: "Starter", desc: "For small businesses buying from several vendors.", annual: "₦24,000", monthly: "₦30,000", noteA: "Billed annually. ₦30,000 billed monthly.", noteM: "Billed monthly. Save 20% with annual billing.", cta: "Talk to Sales", href: "/contact", seats: "5", banks: "2", incTitle: "Everything in Free, plus:", inc: ["Vendor portal and price comparison", "Purchase requests with history", "Basic CRM: leads, deals and quotes"], per: true },
  { name: "Growth", badge: "Recommended", featured: true, desc: "For mid-sized companies running several teams.", annual: "₦72,000", monthly: "₦90,000", noteA: "Billed annually. ₦90,000 billed monthly. 30-day free trial.", noteM: "Billed monthly. Save 20% with annual billing. 30-day free trial.", cta: "Start free trial", href: "/request-demo", seats: "15", banks: "5", incTitle: "Everything in Starter, plus:", inc: ["Multi-level approvals", "Unlimited vendors", "Store tracking", "AI agents and forecasting", "WorkMerate compliance: tax, NRS e-invoicing and payroll"], per: true },
  { name: "Enterprise", desc: "For large companies with branches.", annual: "Quoted", monthly: "Quoted", noteA: "Priced for your branches, seats and modules.", noteM: "Priced for your branches, seats and modules.", cta: "Talk to Sales", href: "/contact", seats: "Unlimited", banks: "As agreed", incTitle: "Everything in Growth, plus:", inc: ["Multiple branches", "Custom roles", "Audit trail and auditor access", "Dedicated onboarding"] },
];

const CUSTOM = { desc: "For specific needs: one portal only, several countries, or direct API access.", inc: ["Single portals, for example RevOps only", "Multi-country", "API access (coming soon)"] };

const Check = ({ dk }: { dk?: boolean }) => <Icon name="Check" size={20} className={cx("shrink-0", dk ? "text-teal-bright" : "text-teal-text")} />;

export function PricingTiers() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="flex w-full flex-col items-center gap-8 md:gap-12">
      <div role="radiogroup" aria-label="Billing period" className="flex items-center gap-1 rounded-full border border-line bg-subtle p-1">
        <button role="radio" aria-checked={!annual} onClick={() => setAnnual(false)} className={cx("rounded-full px-3 py-2 text-[13px] font-semibold transition-all duration-150 min-[360px]:px-4 min-[360px]:text-sm", !annual ? "bg-white text-ink shadow-sm" : "text-ink-2")}>Monthly</button>
        <button role="radio" aria-checked={annual} onClick={() => setAnnual(true)} className={cx("flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold transition-all duration-150 min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:text-sm", annual ? "bg-white text-ink shadow-sm" : "text-ink-2")}>
          Annually <Badge tone="amber" className="max-[359px]:px-2">Save 20%</Badge>
        </button>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((t) => {
            const dk = t.featured;
            return (
              <div key={t.name} className={cx("card-lift flex flex-col gap-6 rounded-2xl border p-6 md:p-8", dk ? "border-navy-raised bg-navy" : "border-line bg-white")}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className={cx("t-h3", dk ? "text-cream" : "text-ink")}>{t.name}</h3>
                    {t.badge && <Badge tone="amber">{t.badge}</Badge>}
                  </div>
                  <p className={cx("text-sm leading-[22px]", dk ? "text-mist" : "text-ink-2")}>{t.desc}</p>
                </div>
                <div className={cx("flex flex-col gap-1 border-t pt-6", dk ? "border-navy-raised" : "border-line")}>
                  <div className="flex flex-wrap items-baseline gap-x-1">
                    <span key={String(annual)} className={cx("fade-in text-[32px] font-semibold leading-10 min-[360px]:text-4xl", dk ? "text-cream" : "text-ink")}>{annual ? t.annual : t.monthly}</span>
                    {t.per && <span className={cx("text-xs", dk ? "text-muted-dark" : "text-ink-3")}>/ month</span>}
                  </div>
                  <span className={cx("text-xs", dk ? "text-muted-dark" : "text-ink-3")}>{annual ? t.noteA : t.noteM}</span>
                </div>
                <Button href={t.href} variant={dk ? "primary" : "secondary"} className="w-full">{t.cta}</Button>
                <dl className={cx("flex flex-col gap-2 border-t pt-4", dk ? "border-navy-raised" : "border-line")}>
                  {[["Paid seats", t.seats], ["Bank accounts", t.banks], ["Requesters", "Free"]].map(([k, v]) => (
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
                      <li key={f} className={cx("flex gap-2 text-sm leading-[22px]", dk ? "text-mist" : "text-ink-2")}><Check dk={dk} /> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        {/* Custom plan: one full-width row under the four cards */}
        <div className="card-lift grid grid-cols-1 gap-6 rounded-2xl border border-line bg-white p-6 md:p-8 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center lg:gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="t-h3">Custom</h3>
            <p className="text-sm leading-[22px] text-ink-2">{CUSTOM.desc}</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold">Everything in Enterprise, plus:</span>
            <ul className="flex flex-col gap-3">
              {CUSTOM.inc.map((f) => <li key={f} className="flex gap-2 text-sm leading-[22px] text-ink-2"><Check /> {f}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[32px] font-semibold leading-10 min-[360px]:text-4xl">Quoted</span>
              <span className="text-xs text-ink-3">Quoted for the portals and countries you need.</span>
            </div>
            <Button href="/contact" variant="secondary" className="w-full">Get a Custom Quote</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
