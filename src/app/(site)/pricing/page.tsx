import type { Metadata } from "next";
import { Badge, Button, CtaBand, Icon, IconChip, ProductTile, SectionHeader, Toast, cx } from "@/components/ui";
import { InvoiceStatusSnippet, ReceiptSnippet } from "@/components/snippets";
import { LogoMarquee } from "@/components/LogoMarquee";
import { FaqSection } from "@/components/Accordion";
import { PricingTiers } from "./PricingTiers";
import { CompareTable } from "./CompareTable";

export const metadata: Metadata = { title: "Pricing", description: "Naira-priced. Modular. Built to scale with you." };

function IncludedTile({ bg, title, body, children }: { bg: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <div className={cx("flex flex-col gap-6 overflow-hidden rounded-2xl md:rounded-3xl p-8", bg)}>
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
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader as="h1" level="page" align="center" eyebrow="Pricing" title="Naira-priced. Modular. Built to scale with you." body="Start free, then pay only for finance, approver and sales seats. Requesters and vendors are free on every plan, and every price is in Naira." />
          <PricingTiers />
          <p className="text-center text-xs text-ink-3">All prices are in Naira (₦) and exclude VAT. Plan contents are confirmed in your proposal.</p>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <p className="text-center t-eyebrow text-ink-3">Built on WorkMerate ERP, with our partners</p>
          <LogoMarquee />
        </div>
      </section>

      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader align="center" eyebrow="Every plan" title="The essentials come standard." body="Approvals, receipt capture and a full audit trail come with every plan. Tax compliance and AI agents start on Growth." />
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
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader align="center" eyebrow="Compare plans" title="Every plan, line by line." body="Prices are per organisation. You pay for finance, approver and sales seats; requesters and vendors are free." />
          <CompareTable />
        </div>
      </section>

      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Add-ons" title="Add what you need, when you need it." body="Optional extras on top of any plan. No surprises on your invoice." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductTile icon="Shield" title="Compliance-as-a-Service" body="WorkMerate runs your statutory filings and NRS submissions alongside your team." link="Ask about this add-on" href="/contact" />
            <ProductTile icon="Layers" title="Extra paid seats" body="Add finance, approver or sales seats for about ₦3,000 to ₦5,000 each a month." link="Ask about this add-on" href="/contact" />
            <ProductTile icon="Scan Eye" title="Extra branches" body="Bring more branches under one head-office account." link="Ask about this add-on" href="/contact" />
            <ProductTile icon="Trending Up" title="Extra bank accounts" body="Connect more bank accounts than your plan includes." link="Ask about this add-on" href="/contact" />
          </div>
        </div>
      </section>

      <FaqSection title="Pricing questions" items={[
        { q: "Can we switch plans later?", a: "Yes. Plans are modular, so you can add modules or move tiers as your team grows. Changes apply from your next billing period." },
        { q: "What payment methods do you accept?", a: "Bank transfer and card payments in Naira. Annual plans can be paid by invoice." },
        { q: "Is there a free trial or pilot?", a: "Yes. The Free plan has no time limit, and Growth comes with a 30-day free trial so you can try the AI agents." },
        { q: "What counts as a user?", a: "You pay only for finance, approver and sales seats. Requesters and vendors are free on every plan, so everyone who spends money can log requests." },
        { q: "Are there setup or implementation fees?", a: "No. Onboarding support comes with every plan, and Enterprise includes dedicated onboarding." },
        { q: "What is the minimum contract length?", a: "Annual plans run for 12 months. Monthly plans can be cancelled with 30 days’ notice." },
        { q: "Can we pay suppliers from SpendMerate?", a: "Yes, as an add-on. Payments run through ChamsSwitch and its partner banks, and fees are confirmed in your proposal." },
      ]} />

      <CtaBand image="a03beb62" tone="teal" eyebrow="Still deciding?" title="Not sure which plan fits?" body="Talk to sales. We’ll map your seats, branches and modules to the right plan and send you a Naira quote." secondary={{ label: "Get a Custom Quote", href: "/contact" }} />
    </>
  );
}
