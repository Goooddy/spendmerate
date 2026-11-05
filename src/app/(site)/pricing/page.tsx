import type { Metadata } from "next";
import { Badge, Button, CtaBand, Icon, IconChip, ProductTile, SectionHeader, Toast, cx } from "@/components/ui";
import { InvoiceStatusSnippet, ReceiptSnippet } from "@/components/snippets";
import { LogoMarquee } from "@/components/LogoMarquee";
import { FaqSection } from "@/components/Accordion";
import { PricingTiers } from "./PricingTiers";

export const metadata: Metadata = { title: "Pricing", description: "Naira-priced. Modular. Built to scale with you." };

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

const Cell = ({ v }: { v: string }) => (v === Y ? <Icon name="Check" size={20} className="mx-auto text-teal-text" /> : <span className={cx("text-sm", v === "—" ? "text-ink-3" : "text-ink")}>{v}</span>);

function IncludedTile({ bg, title, body, children }: { bg: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <div className={cx("flex flex-col gap-6 overflow-hidden rounded-3xl p-8", bg)}>
      <div className="flex flex-col gap-2">
        <h3 className="t-h3">{title}</h3>
        <p className="text-sm leading-[22px] text-ink-2">{body}</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">{children}</div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader as="h1" level="page" align="center" eyebrow="Pricing" title="Naira-priced. Modular. Built to scale with you." body="Choose the tier that fits your organisation today and add modules as you grow. Every plan is billed in Naira." />
          <PricingTiers />
          <p className="text-center text-xs text-ink-3">All prices are in Naira (₦) and exclude VAT. Plan contents are confirmed in your proposal.</p>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <p className="text-center t-eyebrow text-ink-3">Built on WorkMerate ERP, with our partners</p>
          <LogoMarquee />
        </div>
      </section>

      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="Every plan" title="The essentials come standard." body="Compliance, controls and AI insight are in every tier, not sold back to you as extras." />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <IncludedTile bg="bg-teal-tint" title="NRS e-invoicing" body="Every invoice signed with an IRN and QR code, then sent to NRS for you."><InvoiceStatusSnippet /></IncludedTile>
            <IncludedTile bg="bg-amber-tint" title="Tax engine" body="VAT, WHT and PAYE worked out on every transaction, with filing reminders.">
              <Toast icon="Clock" tone="warning" title="VAT return due in 3 days" body="Draft ready for review" className="w-full max-w-[300px]" />
              <Toast icon="Check" tone="success" title="WHT credit note issued" body="Adeyemi Logistics Ltd · today" className="w-full max-w-[300px]" />
            </IncludedTile>
            <IncludedTile bg="bg-navy-tint" title="Approvals & budgets" body="Multi-level approvals and live budgets for every team and entity.">
              <div aria-hidden="true" className="illus flex w-full max-w-[300px] flex-col gap-3 rounded-2xl border border-line bg-white p-4" style={{ boxShadow: "var(--shadow-float)" }}>
                <div className="flex items-center justify-between"><span className="text-sm font-semibold">Marketing · Q3</span><Badge tone="teal">On track</Badge></div>
                <div className="flex items-baseline gap-1"><span className="text-[22px] font-semibold">₦3.2M</span><span className="text-xs text-ink-3">of ₦5M</span></div>
                <div className="h-2 rounded-full bg-subtle"><div className="h-2 w-[64%] rounded-full bg-teal" /></div>
                <span className="text-xs text-ink-3">64% used · 23 days left</span>
              </div>
            </IncludedTile>
            <IncludedTile bg="bg-navy-tint" title="AI CFO insights" body="Savings, risks and cash-flow alerts surfaced before month-end, not after.">
              <div aria-hidden="true" className="illus flex w-full max-w-[340px] gap-3 rounded-2xl bg-teal-tint p-4" style={{ boxShadow: "var(--shadow-float)" }}>
                <IconChip icon="Sparkles" size={32} iconSize={18} className="!bg-white" />
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">AI CFO recommendation</span>
                  <span className="text-xs leading-[18px] text-ink-2">Consolidate 3 overlapping software subscriptions to save about ₦1.2M a quarter.</span>
                  <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-teal-chip px-3 py-1 text-xs text-teal-deep">Review <Icon name="Arrow Right" size={14} /></span>
                </span>
              </div>
            </IncludedTile>
            <IncludedTile bg="bg-teal-tint" title="Receipt capture" body="Snap a receipt: merchant, amount and VAT are captured and coded for you."><ReceiptSnippet /></IncludedTile>
            <IncludedTile bg="bg-amber-tint" title="Security & audit trail" body="Role-based access, encryption and a full audit log on every action.">
              <Toast icon="Shield" tone="success" title="Audit log exported" body="142 actions · last 30 days" className="w-full max-w-[300px]" />
            </IncludedTile>
          </div>
        </div>
      </section>

      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="Compare plans" title="Every plan, line by line." body="Prices are per organisation. Every plan includes onboarding support and Naira billing." />
          <div className="w-full overflow-x-auto rounded-3xl border border-line bg-white">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <caption className="sr-only">Plan comparison</caption>
              <thead>
                <tr>
                  <th className="w-[32%] p-6 align-bottom text-xs font-normal text-ink-3">Prices shown for annual billing.</th>
                  {PLANS.map(([n, p, c], i) => (
                    <th key={n} scope="col" className={cx("p-6 text-center align-top", i === 1 && "bg-teal-tint")}>
                      <div className="flex flex-col items-center gap-2">
                        <span className="t-h3">{n}</span>
                        <span className="text-sm font-normal text-ink-2">{p}</span>
                        <Button href={n === "Custom" ? "/contact" : "/request-demo"} size="sm" variant={i === 1 ? "primary" : "secondary"}>{c}</Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              {COMPARE.map((g) => (
                <tbody key={g.group}>
                  <tr className="bg-subtle"><th colSpan={5} scope="colgroup" className="px-6 py-3 t-eyebrow text-ink">{g.group}</th></tr>
                  {g.rows.map(([label, ...vals]) => (
                    <tr key={label} className="border-t border-line">
                      <th scope="row" className="px-6 py-4 text-sm font-normal text-ink">{label}</th>
                      {vals.map((v, i) => <td key={i} className={cx("px-6 py-4 text-center", i === 1 && "bg-teal-tint")}><Cell v={v} /></td>)}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-12">
          <SectionHeader eyebrow="Add-ons" title="Add what you need, when you need it." body="Optional modules on top of any plan, plus clear usage and one-time fees. No surprises on your invoice." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductTile icon="Shield" title="Compliance-as-a-Service" body="We run your statutory filings and NRS submissions alongside your team." link="Ask about this add-on" href="/contact" />
            <ProductTile icon="Layers" title="Card issuance & interchange" body="Issue virtual and physical corporate cards under your programme." link="Ask about this add-on" href="/contact" />
            <ProductTile icon="Scan Eye" title="Premium AI analytics" body="Deeper AI analysis and benchmarking against peers in your sector." link="Ask about this add-on" href="/contact" />
            <ProductTile icon="Trending Up" title="API / ESB access" body="Enterprise integration access for partners and in-house systems." link="Ask about this add-on" href="/contact" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              ["Payments usage", "Charged per transaction, only when you move money through XPensari.", [["Local transfers", "₦25 per transfer"], ["Bulk supplier payouts", "₦20 per transfer"], ["Collections", "0.5%, capped at ₦2,000"], ["Failed or reversed transfers", "Free"]]],
              ["One-time services", "Optional help to get your team live quickly, quoted upfront.", [["Onboarding & data migration", "From ₦500,000"], ["Remote team training", "₦150,000 per session"], ["On-site training", "From ₦350,000 per day"], ["Custom integrations", "Quoted per scope"]]],
            ].map(([t, b, rows]) => (
              <div key={t as string} className="flex flex-col gap-4 rounded-2xl bg-white p-8">
                <h3 className="text-lg font-semibold">{t as string}</h3>
                <p className="text-sm text-ink-2">{b as string}</p>
                <dl>
                  {(rows as string[][]).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-t border-line py-3">
                      <dt className="text-sm text-ink-2">{k}</dt>
                      <dd className="text-sm font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title="Pricing questions" items={[
        { q: "Can we switch plans later?", a: "Yes. Plans are modular, so you can add modules or move tiers as your team grows. Changes apply from your next billing period." },
        { q: "What payment methods do you accept?", a: "Bank transfer and direct debit from Nigerian bank accounts, and corporate cards. Invoices are issued in Naira as NRS e-invoices." },
        { q: "Is there a free trial or pilot?", a: "We run paid pilots for qualifying teams so you can test XPensari on your own numbers before a full rollout. Ask sales for details." },
        { q: "What counts as a user?", a: "Anyone with a login who submits, approves or reviews. Employees who only receive a corporate card can be added at no extra cost." },
        { q: "Are there setup or implementation fees?", a: "Onboarding support is included. Data migration, on-site training and custom integrations are optional one-time services, quoted upfront." },
        { q: "What is the minimum contract length?", a: "Monthly plans can be cancelled with 30 days' notice. Annual plans are billed yearly and include the 20% discount." },
        { q: "How are payment fees charged?", a: "Only when money moves through XPensari, per transfer or as a capped percentage on collections. Failed or reversed transfers are free." },
      ]} />

      <CtaBand tone="teal" eyebrow="Still deciding?" title="Not sure which plan fits?" body="Talk to sales. We’ll map your modules, users and entities to the right tier and send you a Naira quote." secondary={{ label: "Get a Custom Quote", href: "/contact" }} />
    </>
  );
}
