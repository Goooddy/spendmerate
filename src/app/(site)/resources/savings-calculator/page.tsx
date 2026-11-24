import type { Metadata } from "next";
import { Button, CtaBand, Icon, SectionHeader } from "@/components/ui";
import { LibHiw } from "@/components/sections";
import { FaqSection } from "@/components/Accordion";
import { InView } from "@/components/motion";
import { MoreResources } from "@/components/resources";
import { Calculator, HeroPreview } from "./Calculator";

export const metadata: Metadata = { title: "Savings Calculator", description: "See your potential savings in under a minute." };

export default function SavingsCalculatorPage() {
  return (
    <>
      <InView as="section" className="bg-page pb-24 pt-16">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full max-w-[560px] flex-col gap-6">
            <SectionHeader as="h1" level="page" eyebrow="Free tool" title="Savings Calculator" body="See your potential savings in under a minute, then talk to our team about the details." />
            <Button href="#calculator" className="self-start">Calculate my savings</Button>
            <p className="text-xs text-ink-2">Results in under 60 seconds · No demo call required</p>
          </div>
          <div className="w-full flex-1"><HeroPreview /></div>
        </div>
      </InView>
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-[440px]">
            <SectionHeader eyebrow="Your details" title="Tell us about your business" body="Four quick questions. Your estimate appears straight away — no sign-up, no demo call." />
            <ul className="flex flex-col gap-3 text-sm text-ink-2">
              {["Results in under 60 seconds, no demo call required", "No credit card or commitment needed", "We'll never share your email or spam you"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Icon name="Check" size={18} className="text-teal-text" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1 rounded-2xl md:rounded-3xl bg-white p-6 md:p-10"><Calculator /></div>
        </div>
      </section>
      <LibHiw data={{ L: "B", h: { e: "How it works", t: "How we estimate your savings", b: "A quick, honest starting point you can refine with our team." }, steps: [
        { t: "Tell us about your business", b: "Your industry, turnover, team size and invoice volume set the baseline.", snip: ["Check", "Logistics · ₦250m–₦1bn"] },
        { t: "We benchmark the workload", b: "We compare typical finance hours and spend leakage for businesses like yours.", snip: ["Sparkles", "Benchmarks applied"] },
        { t: "See your estimate", b: "Your numbers appear straight away, and the full breakdown lands in your inbox.", snip: ["Sparkles", "Estimate ready"] },
        { t: "Talk it through", b: "Our team walks you through the numbers using your real data.", snip: ["Check", "Call booked"] },
      ] }} />
      <FaqSection title="Questions about the calculator" items={[
        { q: "How accurate is the estimate?", a: "It is a starting point based on businesses like yours. A call with our team refines it with your real numbers." },
        { q: "Why do you need my work email?", a: "Only to send you the full breakdown. Your headline estimate shows straight away without it." },
        { q: "Is there a cost?", a: "No. The calculator and the follow-up call are free, with no commitment." },
      ]} />
      <MoreResources keys={["hub", "calendar", "blog", "docs"]} />
      <CtaBand image="3aabbf34" tone="teal" eyebrow="Next step" title="Want the full breakdown?" body="Talk to our team about your numbers and see how SpendMerate would work for your business." />
    </>
  );
}
