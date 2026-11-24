import type { Metadata } from "next";
import { Icon, ProductTile, SectionHeader } from "@/components/ui";
import { FaqSection } from "@/components/Accordion";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Talk to sales, get support, partner with us or reach investor relations." };

export default function ContactPage() {
  return (
    <>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader as="h1" level="page" align="center" eyebrow="Contact us" title="How can we help?" body="Pick the team you need and your message goes straight to the people who can answer it." />
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <ProductTile icon="Briefcase" title="Talk to sales" body="See a demo, get a quote, or find the right plan for your business." link="Request a Demo" href="/request-demo" />
            <ProductTile icon="Mail" title="Get support" body="Help with your account, setup or data. Call +234 803 601 4972." link="support@spendmerate.com" href="mailto:support@spendmerate.com" />
            <ProductTile icon="Plug" title="Partner with us" body="Banks, ERP consultants, systems integrators and cloud providers." link="Explore partnerships" href="/partners" />
            <ProductTile icon="Chart Pie" title="Investor relations" body="The market opportunity, our plan and the investor deck." link="Request the deck" href="/investors#request" />
            <ProductTile icon="Book Open" title="Press & media" body="Interviews, stories and brand assets for journalists." link="Send a press enquiry" href="#message" />
          </div>
        </div>
      </section>

      <section id="message" className="section-y scroll-mt-20 bg-subtle">
        <div className="wrap flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-[480px]">
            <SectionHeader eyebrow="Send a message" title="Prefer to write to us?" body="Tell us a little about what you need and we’ll pass it to the right team." />
            <ul className="flex flex-col gap-3 text-sm text-ink-2">
              <li className="flex items-center gap-2"><Icon name="Clock" size={20} className="text-teal-text" /> We usually reply within one business day.</li>
              <li className="flex items-center gap-2"><Icon name="Shield" size={20} className="text-teal-text" /> We only use your details to answer your message.</li>
            </ul>
          </div>
          <div className="flex-1 rounded-2xl md:rounded-3xl bg-white p-6 md:p-10"><ContactForm /></div>
        </div>
      </section>

      <section className="section-y-sm bg-page">
        <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6 lg:w-[400px]">
            <SectionHeader eyebrow="Office" title="Where to find us" />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Office address</p>
              <address className="text-sm not-italic leading-[22px] text-ink-2">Development &amp; Innovation Centre No 23, Ven Adefila Street, Off Lajorin Road, G.R.A Ilorin, Kwara State, Nigeria.</address>
              <p className="text-xs text-ink-3">Office details to be confirmed.</p>
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-2xl md:rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/c192736a.png" alt="Map showing the SpendMerate office in G.R.A Ilorin" className="h-56 w-full object-cover md:h-[224px]" />
            <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-teal-bright shadow-lg"><Icon name="Building" size={20} /></span>
          </div>
        </div>
      </section>

      <FaqSection title="Quick answers" items={[
        { q: "Is a demo free?", a: "Yes. Demos and quotes are free, and there’s no commitment." },
        { q: "I’m a developer. Where do I start?", a: "Start with the Developer Docs for the quickstart and API reference, then request a sandbox key from the Get API Key page." },
        { q: "I’m already a customer. How do I get help fastest?", a: "Email support@spendmerate.com or use in-app chat. Priority and Enterprise plans have a dedicated support contact." },
      ]} />
    </>
  );
}
