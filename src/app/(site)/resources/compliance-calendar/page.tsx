import type { Metadata } from "next";
import { Badge, Button, CtaBand, Icon, SectionHeader, Toast } from "@/components/ui";
import { FaqSection } from "@/components/Accordion";
import { InView } from "@/components/motion";
import { d } from "@/components/seq";
import { MoreResources } from "@/components/resources";
import { Deadlines } from "./Deadlines";

export const metadata: Metadata = { title: "Compliance Calendar", description: "Every recurring tax and regulatory deadline for a Nigerian business, in one list." };

export default function CompliancePage() {
  return (
    <>
      <InView as="section" className="bg-page pb-24 pt-16">
        <div className="wrap flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full max-w-[560px] flex-col gap-6">
            <SectionHeader as="h1" level="page" eyebrow="Stay ahead of deadlines" title="Compliance Calendar" body="Every recurring tax and regulatory deadline that applies to a Nigerian business, in one list." />
            <Button href="#deadlines" className="self-start">View all deadlines</Button>
            <span className="flex flex-wrap items-center gap-2 text-xs text-ink-2">Prefer a conversation? <Button href="/contact" variant="link" size="sm" icon="Arrow Right">Talk to sales</Button></span>
          </div>
          <div aria-hidden="true" className="illus flex w-full flex-1 flex-col justify-center gap-5 rounded-[32px] bg-subtle p-6 md:min-h-[480px] md:p-12">
            <div className="seq-up flex w-full max-w-[380px] flex-col gap-3 self-end rounded-2xl border border-line bg-white p-5">
              <Toast icon="Clock" tone="warning" title="VAT return due in 3 days" body="Draft ready for review" className="!border-0 !p-0 !shadow-none" />
              <div className="flex items-center justify-between border-t border-line pt-3"><span className="text-xs text-ink-2">21 Jun · Status</span><Badge tone="amber">Due soon</Badge></div>
              <span className="flex items-center gap-2 text-xs text-teal-text"><Icon name="Check" size={14} /> Reminder sent to finance team</span>
            </div>
            <div className="seq-up flex w-full max-w-[400px] flex-col rounded-2xl border border-line bg-white px-6 py-5" style={d(800)}>
              <div className="flex items-center justify-between pb-3"><span className="flex items-center gap-2 text-sm font-semibold"><Icon name="Clock" size={18} className="text-teal-text" /> Upcoming deadlines</span><Badge tone="neutral">Sample data</Badge></div>
              {[["VAT Return Filing · 21 Jun", "Monthly"], ["WHT Remittance · 21 Jun", "Monthly"], ["E-Invoice Reconciliation · 30 Jun", "Quarterly"]].map(([l, v], i) => (
                <div key={l} className="seq-x flex justify-between border-t border-line py-2.5" style={d(1300 + i * 250)}><span className="text-xs text-ink-2">{l}</span><span className="text-sm font-medium">{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </InView>
      <section className="section-y bg-white">
        <div className="wrap flex flex-col gap-12">
          <SectionHeader eyebrow="Deadlines" title="Upcoming filing deadlines" body="Recurring tax and regulatory deadlines for Nigerian businesses, in date order." />
          <Deadlines />
        </div>
      </section>
      <FaqSection title="Questions about deadlines" items={[
        { q: "Do all of these deadlines apply to my business?", a: "Not always. Your obligations depend on your size, sector and registrations. Use the filters and check with your adviser." },
        { q: "What if a deadline falls on a weekend or holiday?", a: "File on the previous working day to be safe. The NRS publishes any official extensions, and we update this list when it does." },
        { q: "Can I get reminders?", a: "Yes. Download the .ics file or add the dates to Google Calendar. XPensari customers also get reminders and draft returns inside the platform." },
      ]} />
      <MoreResources keys={["hub", "calc", "blog", "docs"]} />
      <CtaBand eyebrow="Reminders" title="Never miss a deadline" body="XPensari prepares VAT, WHT and PAYE returns from your books and reminds the right person before every due date." />
    </>
  );
}
