import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon, SectionHeader } from "@/components/ui";
import { LibHiw, LibTrust } from "@/components/sections";
import { FaqSection } from "@/components/Accordion";
import { DemoFlow } from "./DemoFlow";

export const metadata: Metadata = { title: "Request a Demo", description: "See XPensari on your own numbers in a 30-minute walkthrough." };

export default function RequestDemoPage() {
  return (
    <>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-[560px]">
            <SectionHeader as="h1" level="page" eyebrow="Request a demo" title="See XPensari on your own numbers." body="A 30-minute walkthrough with our team, built around your spend, tax and compliance workflows." />
            <ul className="flex flex-col gap-3">
              {["Tailored to your industry, size and modules", "See NTA 2025 e-invoicing and VAT checks in action", "Get pricing for your users and entities"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-base">
                  <span className="flex size-6 items-center justify-center rounded-full bg-teal-chip"><Icon name="Check" size={14} /></span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 rounded-[32px] bg-subtle p-4 md:p-10">
            <div className="mx-auto max-w-[520px] rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <Suspense><DemoFlow /></Suspense>
            </div>
          </div>
        </div>
      </section>
      <LibTrust data={{ L: "A", items: [["Building", "Built on WorkMerate ERP"], ["Landmark", "Nigeria Tax Act 2025 rules built in"], ["Receipt", "Identity and payments with ChamsAccess"], ["Sparkles", "Seven AI agents for finance"]] }} />
      <LibHiw data={{ L: "B", h: { e: "What to expect", t: "From request to a plan that fits", b: "Three quick steps here, then a focused call with someone who knows Nigerian finance." }, steps: [
        { t: "Tell us about your business", b: "Your size, turnover band and role help us prepare the right walkthrough.", snip: ["Check", "Mid-sized · ₦1bn–₦5bn"] },
        { t: "Pick a time", b: "Choose a 30-minute slot that suits you. Times are shown in WAT.", snip: ["Sparkles", "Tue 13 Oct · 10:00"] },
        { t: "See it on your workflows", b: "We walk through spend, payables and e-invoicing using examples like yours.", snip: ["Sparkles", "Live walkthrough"] },
        { t: "Get a tailored plan", b: "Leave with pricing for your modules and entities, and next steps if it fits.", snip: ["Check", "Plan sent"] },
      ] }} />
      <FaqSection title="Before you book" items={[
        { q: "Is the demo free?", a: "Yes. The demo and a quote are free, and there’s no commitment." },
        { q: "Who should join the call?", a: "Whoever owns the problem: usually the CFO or finance lead, plus someone from procurement, tax or IT if those workflows matter to you." },
        { q: "Can I look around on my own first?", a: "Start with the product pages and the Savings Calculator. Developers can request a sandbox API key from the Developer Docs." },
      ]} />
    </>
  );
}
