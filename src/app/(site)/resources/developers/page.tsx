import type { Metadata } from "next";
import { Badge, Button, CtaBand, ProductTile, SectionHeader, Toast } from "@/components/ui";
import { FaqSection } from "@/components/Accordion";
import { InView } from "@/components/motion";
import { d } from "@/components/seq";

export const metadata: Metadata = { title: "Developer Docs & API", description: "Open, documented endpoints for transactions, invoicing and compliance, built on Odoo." };

function Code({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <pre className={`overflow-x-auto rounded-2xl bg-navy-deep p-6 font-mono text-[13px] leading-6 text-cream ${className}`}>
      <code>
        {lines.map((l, i) => (
          <span key={i} className="seq-x block" style={d(300 + i * 120)}>{l || " "}</span>
        ))}
      </code>
    </pre>
  );
}

const ENDPOINTS: [string, string, string][] = [
  ["GET", "/v1/transactions", "List transactions, with filters for date range, category and status."],
  ["POST", "/v1/invoices", "Create a new invoice, optionally queued for e-invoice submission."],
  ["GET", "/v1/invoices/{id}", "Retrieve a single invoice by id, including its compliance status."],
  ["GET", "/v1/compliance/status", "Current e-invoicing and filing status for the authenticated business."],
  ["POST", "/v1/webhooks", "Register a webhook endpoint for transaction and compliance events."],
  ["GET", "/v1/reports/savings", "Programmatic access to the same savings-estimate engine behind the calculator."],
];

export default function DevDocsPage() {
  return (
    <>
      <InView as="section" className="bg-page pb-24 pt-16">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full max-w-[560px] flex-col gap-6">
            <SectionHeader as="h1" level="page" eyebrow={<span className="inline-flex flex-wrap items-center gap-3">For developers <Badge tone="amber">Coming soon</Badge></span>} title="Developer Docs & API" body="Coming soon: open, documented endpoints for transactions, invoicing and compliance, built on Odoo." />
            <div className="flex flex-wrap gap-3">
              <Button href="/get-api-key">Join the waitlist</Button>
              <Button href="https://github.com" variant="ghost">View on GitHub</Button>
            </div>
          </div>
          <div className="relative w-full flex-1 rounded-3xl md:rounded-[32px] bg-subtle p-4 md:p-8">
            <div className="mb-3 flex justify-end"><Badge tone="neutral">Sample response</Badge></div>
            <Code lines={['curl https://api.spendmerate.com/v1/compliance/status \\', '  -H "Authorization: Bearer YOUR_API_KEY"', "", "{", '  "business_id": "biz_9f2a1c",', '  "e_invoicing": "compliant",', '  "last_filing": "2026-09-21",', '  "next_deadline": "2026-10-21"', "}"]} />
            <Toast icon="Check" tone="success" title="200 OK" body="Compliance status · 142 ms" className="seq-up absolute -bottom-6 left-4 w-[260px] max-w-[calc(100%-2rem)] sm:left-6" />
          </div>
        </div>
      </InView>
      <section className="section-y bg-white">
        <div className="wrap flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-[440px]">
            <SectionHeader eyebrow="Get started" title="Quickstart" body="Three steps from API key to your first response." />
            <ol className="flex flex-col gap-4">
              {["Generate an API key from your dashboard settings.", "Authenticate requests with a Bearer token in the header.", "Call any endpoint below. Responses are JSON."].map((s, i) => (
                <li key={s} className="flex items-center gap-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-semibold">{i + 1}</span><span className="text-base">{s}</span></li>
              ))}
            </ol>
          </div>
          <InView className="flex-1"><Code lines={['curl https://api.spendmerate.com/v1/transactions/txn_81c2 \\', '  -H "Authorization: Bearer YOUR_API_KEY"', "", "{", '  "id": "txn_81c2",', '  "amount": 486000,', '  "currency": "NGN",', '  "category": "fuel_and_power"', "}"]} /></InView>
        </div>
      </section>
      <section id="reference" className="section-y scroll-mt-20 bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Reference" title="Core endpoints" body="REST endpoints for transactions, invoices, compliance status, webhooks and savings reports. All responses are JSON." />
          <ul className="flex flex-col rounded-2xl md:rounded-3xl border border-line bg-white px-6 md:px-8">
            {ENDPOINTS.map(([m, p, b], i) => (
              <li key={p} className={`flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-6 ${i ? "border-t border-line" : ""}`}>
                <Badge tone={m === "GET" ? "teal" : "amber"} className="w-16 justify-center">{m}</Badge>
                <code className="font-mono text-sm font-medium md:w-[240px]">{p}</code>
                <span className="text-sm text-ink-2">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Build" title="Everything you need to build" body="From your first key to production, in one place." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductTile icon="Book Open" title="API reference" body="Every endpoint, parameter and response, with examples." link="Browse the reference" href="#reference" />
            <ProductTile icon="Shield" title="Authentication guide" body="Create keys and authenticate with Bearer tokens." link="Read the guide" href="/get-api-key" />
            <ProductTile icon="Terminal" title="Sandbox & API keys" body="Test against sample data before you go live." link="Join the waitlist" href="/get-api-key" />
            <ProductTile icon="Layers" title="Architecture overview" body="How SpendMerate sits on top of WorkMerate and Odoo." link="See the architecture" href="/products/integrations-api" />
          </div>
        </div>
      </section>
      <FaqSection title="Developer questions" items={[
        { q: "Is there a sandbox?", a: "Not yet. Sandbox access and API keys open when the developer API launches. Join the waitlist to hear first." },
        { q: "How do I authenticate?", a: "Send your API key as a Bearer token in the Authorization header of every request. Keys can be rotated from your dashboard." },
        { q: "Are webhooks supported?", a: "Yes. Register an endpoint with POST /v1/webhooks to receive signed events for transactions, invoices and compliance status changes." },
      ]} />
      <CtaBand image="db465366" title="Need higher rate limits?" body="Reach out and we'll scope a plan that fits your integration." primary={{ label: "Contact us", href: "/contact" }} />
    </>
  );
}
