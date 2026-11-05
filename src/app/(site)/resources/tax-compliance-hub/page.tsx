import type { Metadata } from "next";
import { Badge, Button, CtaBand, Icon, ProductTile, SectionHeader, Toast } from "@/components/ui";
import { FaqSection } from "@/components/Accordion";
import { InView } from "@/components/motion";
import { d } from "@/components/seq";
import { MoreResources } from "@/components/resources";
import { HubSearch } from "./HubSearch";

export const metadata: Metadata = { title: "Tax & Compliance Hub", description: "Everything your finance team needs to stay ahead of the Nigeria Tax Act 2025." };

const GUIDES = [
  { icon: "Book Open", title: "Nigeria Tax Act 2025 Overview", body: "What changed, what it means for SMEs, and the timeline for mandatory compliance." },
  { icon: "Receipt", title: "E-Invoicing Requirements", body: "Format, submission and record-keeping rules for electronic invoices under the new Act." },
  { icon: "Calendar", title: "NRS Filing Deadlines", body: "A running list of monthly, quarterly and annual filing dates, kept current as they're published." },
  { icon: "Calculator", title: "VAT & WHT Essentials", body: "Rates, thresholds and the filing mechanics for value-added and withholding tax." },
  { icon: "Layers", title: "Record-Keeping Requirements", body: "What documentation to retain, for how long, and in what format for an audit-ready trail." },
  { icon: "Shield", title: "Compliance Checklist", body: "A practical, downloadable checklist to track your business against every requirement above." },
];

export default function TaxHubPage() {
  return (
    <>
      <InView as="section" className="bg-page pb-24 pt-16">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full max-w-[560px] flex-col gap-6">
            <SectionHeader as="h1" level="page" eyebrow="Compliance" title="Tax & Compliance Hub" body="Everything your finance team needs to stay ahead of Nigeria Tax Act 2025, in one place, kept current." />
            <HubSearch />
            <span className="flex flex-wrap items-center gap-2 text-xs text-ink-2">Next deadline coming up? <Button href="/resources/compliance-calendar" variant="link" size="sm" icon="Arrow Right">View compliance calendar</Button></span>
          </div>
          <div aria-hidden="true" className="illus relative flex h-[460px] w-full flex-1 flex-col justify-center gap-5 rounded-3xl md:rounded-[32px] bg-subtle p-6 md:p-12">
            <Toast icon="Check" tone="success" title="NRS e-invoice accepted" body="INV-2026-0142 · just now" className="seq-up w-full max-w-[320px] self-end" />
            <div className="seq-up flex w-full max-w-[400px] flex-col rounded-2xl border border-line bg-white px-6 py-5" style={d(800)}>
              <div className="flex items-center justify-between pb-3">
                <span className="flex items-center gap-2 text-sm font-semibold"><Icon name="Shield" size={18} className="text-teal-text" /> Compliance status</span>
                <Badge tone="neutral">Sample data</Badge>
              </div>
              {[["E-invoicing", "Compliant", true], ["VAT return filing", "Due 21 Jun", false], ["WHT remittance", "Due 21 Jun", false]].map(([l, v, ok], i) => (
                <div key={l as string} className="seq-x flex items-center justify-between border-t border-line py-2.5" style={d(1300 + i * 250)}>
                  <span className="text-xs text-ink-2">{l}</span>
                  <Badge tone={ok ? "teal" : "amber"}>{v}</Badge>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-line pt-3">
                <span className="text-xs text-ink-2">June filings complete</span>
                <span className="text-sm font-medium">2 of 3</span>
              </div>
            </div>
          </div>
        </div>
      </InView>
      <section id="guides" className="section-y scroll-mt-20 bg-white">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Guides" title="Core topics" body="Plain-language guides to every part of the Nigeria Tax Act 2025 that affects your finance team." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => <ProductTile key={g.title} {...g} link="Read guide" href="/resources/insights/nigeria-tax-act-2025-smes" />)}
          </div>
        </div>
      </section>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="What’s new" title="Latest updates to the hub" body="Guides are reviewed whenever official guidance changes." />
          <ul className="flex flex-col rounded-2xl md:rounded-3xl border border-line bg-white px-6 md:px-8">
            {[["28 Sep", "E-invoicing requirements guide updated", "Clearer steps for submitting invoices through the NRS gateway.", "Updated"], ["15 Sep", "New: Record-keeping requirements", "What to keep, for how long, and in what format.", "New"], ["02 Sep", "Filing deadlines refreshed for Q4", "Monthly, quarterly and annual dates checked and updated.", "Updated"]].map(([dt, t, b, tag], i) => (
              <li key={t} className={`flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:gap-8 ${i ? "border-t border-line" : ""}`}>
                <span className="w-20 shrink-0 text-sm font-medium text-teal-text">{dt}</span>
                <span className="flex flex-1 flex-col gap-1"><span className="text-base font-semibold">{t}</span><span className="text-sm text-ink-2">{b}</span></span>
                <Badge tone={tag === "New" ? "amber" : "teal"}>{tag}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <MoreResources keys={["calendar", "calc", "docs", "expert"]} eyebrow="Tools" title="Put the guides to work" body="Free tools that turn the rules into next steps." />
      <FaqSection title="Questions about the hub" items={[
        { q: "Is this tax advice?", a: "No. The hub explains the rules in plain language. Always confirm decisions with your tax adviser." },
        { q: "How often is the hub updated?", a: "Guides are reviewed whenever the NRS or the Federal Government publishes new guidance, and at least once a quarter." },
        { q: "Can XPensari apply these rules for us?", a: "Yes. Tax & Compliance Intelligence applies VAT, WHT and PAYE rules on every transaction and sends e-invoices to the NRS gateway." },
      ]} />
      <CtaBand image="e57ac192" tone="mint" title="Need a compliance review before the deadline?" body="Our team can walk through your current setup against the Tax Act 2025 requirements on a 20-minute call." />
    </>
  );
}
