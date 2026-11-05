import type { Metadata } from "next";
import { ImageCard, ProductTile, SectionHeader } from "@/components/ui";
import { LibHiw } from "@/components/sections";
import { FormSection, SplitHero } from "@/components/company";
import { RequestForm } from "@/components/RequestForm";

export const metadata: Metadata = { title: "Partners", description: "Building Africa’s financial infrastructure, together." };

const CAPS: [string, string[]][] = [
  ["XPensari", ["AI-native spend intelligence", "XPensari Revenue Intelligence", "AI compliance agents"]],
  ["McGeorge / WorkMerate", ["ERP platform", "Tax & compliance automation", "Implementation & technical team"]],
  ["ChamsAccess", ["Identity & biometrics", "Fintech & payments infrastructure", "Access & workspace management"]],
  ["Banking partner", ["Settlement & distribution rails", "Security & compliance backing", "Partner to be confirmed"]],
];

export default function PartnersPage() {
  return (
    <>
      <SplitHero eyebrow="Partner ecosystem" title="Building Africa’s financial infrastructure, together." body="XPensari doesn’t build every layer alone. ERP, identity, payments and banking rails come from partners we integrate deeply with, so every onboarded business gets one connected experience." cta="Become a partner" ctaHref="#enquiry" alt={null} image="/images/22e64d1e.jpg" imgAlt="Partners in a meeting" />
      <section className="section-y bg-white">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="Our partners" title="Who’s building this with us" body="Each partner owns one layer of the stack, so XPensari can focus on the intelligence on top." />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <ImageCard image="/images/7abe3e51.png" alt="WorkMerate illustration" title="McGeorge / WorkMerate" body="The Odoo-based ERP our AI layer runs on: 60 customised modules, already live with FMCG, banking and manufacturing clients." link="Explore WorkMerate" href="/products/integrations-api" />
            <ImageCard image="/images/f1bab66c.png" alt="ChamsAccess illustration" title="ChamsAccess" body="The biometric identity and payments infrastructure behind Nigeria’s BVN rollout, processing over 500 million verifications a year." link="Explore ChamsAccess" href="/products/payments" />
            <ImageCard image="/images/70adcdb6.png" alt="Banking partner illustration" title="Banking partner" body="Licensed settlement rails and SME distribution for every transaction. Partner to be announced closer to launch." link="Talk to partnerships" href="#enquiry" />
          </div>
        </div>
      </section>
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-12">
          <SectionHeader eyebrow="The stack" title="What each partner brings" body="No single partner covers the full stack. Here is the piece each one contributes." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPS.map(([n, items]) => (
              <div key={n} className="flex flex-col gap-4 rounded-2xl bg-white p-6">
                <p className="t-eyebrow text-teal-text">{n}</p>
                <ul className="flex flex-col">
                  {items.map((i) => <li key={i} className="border-t border-line py-3 text-sm text-ink">{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="Who we partner with" title="Four ways to build with XPensari" body="Banks, ERP consultants, systems integrators, cloud providers and government bodies each plug in differently." />
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductTile icon="Landmark" title="Banks & payment providers" body="Settlement rails, card issuing and distribution to SMEs." link="Partner with us" href="#enquiry" />
            <ProductTile icon="Plug" title="ERP consultants & integrators" body="Implement XPensari on WorkMerate for your clients." link="Partner with us" href="#enquiry" />
            <ProductTile icon="Layers" title="Cloud & infrastructure" body="Hosting, security and data services for regulated finance." link="Partner with us" href="#enquiry" />
            <ProductTile icon="Building" title="Government & regulators" body="Tax, e-invoicing and SME programmes on shared data." link="Partner with us" href="#enquiry" />
          </div>
        </div>
      </section>
      <LibHiw bg="bg-white" data={{ L: "B", h: { e: "How it works", t: "From first conversation to joint launch", b: "A clear path from enquiry to going live together." }, steps: [
        { t: "Tell us where you fit", b: "Share your organisation and the kind of partnership you have in mind.", snip: ["Check", "Enquiry received"] },
        { t: "Scoping call", b: "We map where your product or service meets XPensari and WorkMerate.", snip: ["Sparkles", "Scope agreed"] },
        { t: "Build and pilot", b: "Integrate, test with a small group of businesses and agree the commercials.", snip: ["Sparkles", "Pilot live"] },
        { t: "Launch together", b: "Go live with joint onboarding, support and co-marketing.", snip: ["Check", "Partner listed"] },
      ] }} />
      <FormSection id="enquiry" eyebrow="Partnership enquiry" title="Explore a partnership" body="Tell us where you fit and we will follow up with the right person on our partnerships team.">
        <RequestForm submit="Submit partnership enquiry" success={{ title: "Inquiry sent", body: "Thanks for reaching out. Our partnerships team will review your enquiry and reply within two business days." }} fields={[
          { name: "name", label: "Full name", required: true, placeholder: "Your full name" },
          { name: "email", label: "Work email", required: true, type: "email", placeholder: "you@company.com" },
          { name: "org", label: "Organisation", required: true, placeholder: "Company name", full: true },
          { name: "type", label: "Partnership type", required: true, as: "select", placeholder: "Select a partnership type", options: ["Bank or payment provider", "ERP consultant or integrator", "Cloud or infrastructure", "Government or regulator", "Other"] },
          { name: "message", label: "Message", as: "textarea", placeholder: "What you’re hoping to build together" },
        ]} />
      </FormSection>
    </>
  );
}
