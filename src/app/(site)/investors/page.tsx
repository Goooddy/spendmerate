import type { Metadata } from "next";
import { Icon, SectionHeader, Stat, Toast } from "@/components/ui";
import { DashboardMock } from "@/components/snippets";
import { ScaleToFit } from "@/components/ScaleToFit";
import { LibTrust } from "@/components/sections";
import { FormSection, Roadmap, SplitHero } from "@/components/company";
import { RequestForm } from "@/components/RequestForm";

export const metadata: Metadata = { title: "Investors", description: "A ₦700bn+ addressable market, and the compliance moat to defend it." };

const WHY_NOW = [
  ["Landmark", "Regulatory mandate", "E-invoicing under the Nigeria Tax Act 2025 turns compliance from optional to mandatory, creating durable, non-discretionary demand."],
  ["Trending Up", "SME digitisation wave", "Nigerian SMEs are moving off spreadsheets and chat-based bookkeeping as banks and regulators push digital-first requirements."],
  ["Clock", "Early-mover timing", "Few platforms combine AI-native spend intelligence with built-in Nigerian tax compliance."],
];
const MOAT = [
  ["96d0c81d", "Compliance built in", "Nigeria Tax Act 2025 rules, e-invoicing and statutory reporting live inside the product, not in a bolt-on."],
  ["e0b66d17", "Distribution through partners", "WorkMerate’s client base and ChamsAccess infrastructure give XPensari a running start."],
  ["ca4697a5", "Seven AI agents", "Agents work across spend, payables, tax, risk and revenue, all on one data model."],
  ["e501b354", "Built on a proven ERP", "XPensari runs on WorkMerate, a customised Odoo ERP with 60 modules already live."],
];

export default function InvestorsPage() {
  return (
    <>
      <SplitHero eyebrow="For investors" title="A ₦700bn+ addressable market, and the compliance moat to defend it." body="Nigeria’s Tax Act 2025 is making e-invoicing and digital compliance mandatory. XPensari is the AI-native finance platform built for that window." cta="Request the investor deck" ctaHref="#request" alt={null} image="/images/94759cc3.jpg" imgAlt="Lagos skyline" />
      <LibTrust data={{ L: "A", items: [["Building", "Built on WorkMerate ERP"], ["Landmark", "Nigeria Tax Act 2025 rules built in"], ["Receipt", "Identity and payments with ChamsAccess"], ["Sparkles", "Seven AI agents for finance"]] }} />
      <section className="section-y bg-white">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Market opportunity" title="The opportunity, by the numbers" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value="₦2.1T" label="TAM: Nigeria SME finance and compliance software spend" />
            <Stat value="₦700bn+" label="SAM: formal SMEs in scope for the e-invoicing mandate" />
            <Stat value="₦35bn" label="SOM: obtainable share at our current go-to-market pace" />
            <div className="flex flex-col gap-2 rounded-r-2xl border-l-2 border-teal bg-teal-tint py-3 pl-6">
              <span className="t-stat text-teal-text">18,000</span>
              <span className="text-sm text-ink-2">SMEs onboarded by FY29, up from 1,200 in FY27</span>
            </div>
          </div>
          <p className="text-xs text-ink-3">Planning estimates. Full methodology in the investor deck.</p>
        </div>
      </section>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="relative w-full overflow-hidden rounded-3xl md:rounded-[32px] bg-teal-tint p-6 lg:w-[600px]">
            <ScaleToFit width={960} height={580}><DashboardMock /></ScaleToFit>
            <Toast icon="Check" tone="success" title="NRS e-invoice accepted" body="INV-2026-0142 · just now" className="absolute bottom-4 right-4 w-[280px]" />
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <SectionHeader eyebrow="Timing" title="Why now" body="A regulatory window is opening, and the category is still being defined." />
            <ul className="flex flex-col gap-6">
              {WHY_NOW.map(([i, t, b]) => (
                <li key={t} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-chip"><Icon name={i} size={20} /></span>
                  <span className="flex flex-col gap-1"><span className="text-base font-semibold">{t}</span><span className="text-sm leading-[22px] text-ink-2">{b}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader align="center" eyebrow="The moat" title="Why XPensari wins" body="Compliance that is built in, not bolted on, with distribution and intelligence on top." />
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOAT.map(([img, t, b]) => (
              <div key={t} className="card-lift flex flex-col gap-6 rounded-2xl bg-white p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/${img}.png`} alt="" className="mx-auto size-[200px] object-contain" loading="lazy" />
                <div className="flex flex-col gap-2">
                  <h3 className="t-h3">{t}</h3>
                  <p className="text-sm leading-[22px] text-ink-2">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Roadmap eyebrow="The plan" title="From launch to 18,000 SMEs" current={0} items={[
        ["FY27", "Launch and first 1,200 SMEs", "Go live with early customers through WorkMerate and partner channels."],
        ["FY28", "Scale distribution", "Grow through banks, accounting firms and integrators across Nigeria."],
        ["FY29", "18,000 SMEs onboarded", "Reach the FY29 target with the full product suite live."],
      ]} />
      <FormSection id="request" eyebrow="Investor request" title="Get the full investor deck" body="Tell us about your fund and focus, and we will share the deck and set up a call with the founding team.">
        <RequestForm submit="Request the investor deck" success={{ title: "Deck requested", body: "Thanks. We'll email the investor deck within one business day and suggest times for a call with the founding team." }} fields={[
          { name: "name", label: "Full name", required: true, placeholder: "Your full name" },
          { name: "email", label: "Work email", required: true, type: "email", placeholder: "you@fund.com" },
          { name: "firm", label: "Firm or fund", required: true, placeholder: "Firm / fund name" },
          { name: "focus", label: "Investment focus", placeholder: "Stage, sector, cheque size" },
          { name: "message", label: "Message", as: "textarea", placeholder: "Tell us about your investment thesis…" },
        ]} />
      </FormSection>
    </>
  );
}
