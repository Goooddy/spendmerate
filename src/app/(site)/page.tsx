import { Button, CtaBand, Eyebrow, FeatureCard, Icon, IconChip, ImageCard, ProductTile, SectionHeader, Stat, Toast, Badge } from "@/components/ui";
import { ApprovalSnippet, AiRecSnippet, CardSnippet, CashFlowSnippet, DashboardMock, InvoiceStatusSnippet, ReceiptSnippet } from "@/components/snippets";
import { ScaleToFit } from "@/components/ScaleToFit";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Testimonials } from "@/components/Testimonials";
import { DEMO_HREF, PRODUCTS, RESOURCES } from "@/data/site";
import Link from "next/link";

const AGENTS = [
  ["Trending Up", "AI CFO", "Surfaces avoidable spend and cash risks before they hit the books."],
  ["Shield", "AI Tax & Compliance", "Applies VAT, WHT and PAYE rules and keeps every filing NRS-ready."],
  ["Layers", "AI AP/AR", "Matches invoices to payments and flags mismatches before close."],
  ["Trending Up", "AI Sales", "Scores pipeline and forecasts revenue from live deal data."],
  ["Scan Eye", "AI Risk", "Detects anomalies and potential fraud as transactions happen."],
  ["Layers", "AI Procurement", "Compares vendors and catches leakage before purchase orders go out."],
  ["Arrow Up Right", "AI Collections & Cash Flow", "Chases overdue receivables and projects your cash position."],
];

const TILES = [
  ["Scan Eye", "AI Spend Intelligence", "Spot patterns and avoidable spend before it becomes leakage.", PRODUCTS.spend.href],
  ["Layers", "Expense & Corporate Cards", "Capture, approve and control spend at the point it happens.", PRODUCTS.expense.href],
  ["Shield", "Procurement & Vendors", "Better purchasing decisions, with vendor risk visible up front.", PRODUCTS.procurement.href],
  ["Layers", "Invoice & AP/AR", "Reduce manual finance work on both sides of the ledger.", PRODUCTS.invoice.href],
  ["Trending Up", "Budget & Analytics", "See performance in real time, not at month-end.", PRODUCTS.budget.href],
  ["Shield", "Tax & Compliance", "Strengthen tax, regulatory and financial discipline by default.", PRODUCTS.tax.href],
  ["Scan Eye", "Risk, Audit & ESG", "Catch problems before they become expensive.", PRODUCTS.risk.href],
  ["Trending Up", "Revenue Intelligence", "Grow money in with the same rigour you apply to spend.", PRODUCTS.revenue.href],
];

function HeroStage() {
  return (
    <div className="relative h-[580px] w-[1248px]">
      <div aria-hidden="true" className="absolute left-[-26px] top-[-103px] h-[806px] w-[1300px] rounded-full bg-teal opacity-[0.05] blur-[60px]" />
      <div aria-hidden="true" className="absolute left-[274px] top-[83px] h-[434px] w-[700px] rounded-full bg-teal opacity-[0.06] blur-[60px]" />
      <div className="absolute left-[144px] top-0 rise" style={{ animationDelay: "200ms" }}><DashboardMock /></div>
      <div className="absolute left-0 top-[120px] w-[312px] rise-drift" style={{ animationDelay: "500ms, 1000ms" }}>
        <Toast icon="Sparkles" tone="ai" title="AI CFO found ₦1.2M in savings" body="3 overlapping subscriptions" />
      </div>
      <div className="absolute left-[40px] top-[272px] rise-drift" style={{ animationDelay: "800ms, 1800ms" }}><ApprovalSnippet /></div>
      <div className="absolute left-[960px] top-[56px] w-[280px] rise-drift" style={{ animationDelay: "1100ms, 2600ms" }}>
        <Toast icon="Check" tone="success" title="NRS e-invoice accepted" body="INV-2026-0142 · just now" />
      </div>
      <div className="absolute left-[968px] top-[420px] w-[280px] rise-drift" style={{ animationDelay: "1400ms, 3400ms" }}>
        <Toast icon="Clock" tone="warning" title="VAT return due in 3 days" body="Draft ready for review" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-page pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/globe.svg" alt="" className="absolute left-1/2 top-[-120px] w-[1240px] max-w-none -translate-x-1/2" style={{ maskImage: "linear-gradient(#0000008c, #000 40%)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/globe-halo.svg" alt="" className="absolute left-1/2 top-[-10px] w-[1100px] max-w-none -translate-x-1/2" />
        </div>
        <div className="wrap relative flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2">
              <span className="size-1.5 rounded-full bg-amber" />
              <span className="t-eyebrow">AI-native FinOps &amp; RevOps for Africa</span>
            </span>
            <h1 className="t-display text-ink">Spend Less. Decide Smarter.</h1>
            <p className="t-lead max-w-[720px] text-ink-2">
              The AI-native Financial &amp; Revenue Operating System for Nigerian and African enterprises: FinOps, RevOps, Payments and Compliance in one intelligence layer.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={DEMO_HREF} icon="Arrow Right">Request a Demo</Button>
              <Button href="#platform" variant="ghost">See How It Works</Button>
            </div>
          </div>
          <div className="w-full max-w-[1248px] overflow-hidden">
            <ScaleToFit width={1248} height={520}><HeroStage /></ScaleToFit>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-10 border-y border-line bg-subtle py-10">
        <p className="mb-6 text-center t-eyebrow text-ink-3">Built on WorkMerate ERP, with our partners</p>
        <LogoMarquee />
      </section>

      {/* Problem */}
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-12">
          <SectionHeader eyebrow="The problem" title="Nigerian finance teams are drowning in fragmentation." body="Spreadsheets, disconnected tools and manual compliance slow every close and hide where the money goes." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value="39.7M" label="Nigerian MSMEs, only ~3% formally registered" />
            <Stat value="86%" label="of African firms have basic digital access" />
            <Stat value="11%" label="use advanced technology intensively" />
            <Stat value="35%" label="higher tech costs for African firms, at the upper end" />
          </div>
          <p className="text-xs leading-[18px] text-ink-3">Source: IFC/World Bank 2026.</p>
        </div>
      </section>

      {/* Solution bento */}
      <section id="platform" className="section-y bg-subtle">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="One platform" title="One platform. One data model. One source of truth." body="FinOps, RevOps, Payments and Compliance in one system, so your team stops reconciling between tools." />
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[718fr_506fr]">
            <BentoTile bg="bg-teal-tint" kicker="Control money out" title="FinOps" body="Expenses, procurement, payables, budgets and treasury in one flow, with approvals that happen where the money moves." link="Explore FinOps" href={PRODUCTS.expense.href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/1a091798.jpg" alt="Finance team reviewing spend in a Lagos office" className="h-full w-full rounded-2xl object-cover sm:w-[86%]" />
              <ApprovalSnippet className="absolute bottom-[-24px] right-0 hidden scale-90 sm:flex origin-bottom-right" />
            </BentoTile>
            <BentoTile bg="bg-navy-tint" kicker="Grow money in" title="Revenue Intelligence" body="Leads, pipeline, quotations, orders and collections in one system that talks to finance." link="Explore RevOps" href={PRODUCTS.revenue.href}>
              <CashFlowSnippet className="absolute left-0 top-4" />
              <Toast icon="Sparkles" tone="ai" title="AI Sales: 4 deals likely to close" body="Forecast updated today" className="absolute bottom-6 right-0 w-[300px]" />
            </BentoTile>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[506fr_718fr]">
            <BentoTile bg="bg-amber-tint" kicker="Move money" title="Payments" body="Collections, supplier payments, transfers and cards, reconciled automatically." link="Explore Payments" href={PRODUCTS.payments.href}>
              <CardSnippet className="absolute left-0 top-0 scale-[0.85] origin-top-left" />
              <ReceiptSnippet className="absolute bottom-0 right-0" />
            </BentoTile>
            <BentoTile bg="bg-teal-tint" kicker="Stay compliant" title="Compliance" body="VAT, WHT, PAYE and NRS e-invoicing built into every transaction, not bolted on at month-end." link="Explore Compliance" href={PRODUCTS.tax.href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/2376e85e.jpg" alt="SME owner checking invoices on a laptop" className="ml-auto h-full w-full rounded-2xl object-cover sm:w-[70%]" />
              <InvoiceStatusSnippet className="absolute left-0 top-4 hidden sm:flex" />
              <Toast icon="Clock" tone="warning" title="VAT return due in 3 days" body="Draft ready for review" className="absolute bottom-[-16px] right-4 w-[280px]" />
            </BentoTile>
          </div>
          <Button href="/solutions" variant="link" icon="Arrow Right">Explore Solutions</Button>
        </div>
      </section>

      {/* AI layer */}
      <section className="section-y bg-navy">
        <div className="wrap flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader dark eyebrow="AI Intelligence Layer" title="Seven AI agents, working the books with you." body="Each agent watches one part of your finance operation and acts before problems reach month-end." />
            <div className="flex flex-wrap gap-6">
              <Button href={PRODUCTS.ai.href} variant="link-light" icon="Arrow Right">Meet the AI Layer</Button>
              <Button href={PRODUCTS.api.href} variant="link-light" icon="Arrow Right">Explore the API platform</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[540fr_644fr]">
            <ul className="flex flex-col">
              {AGENTS.map(([icon, name, body], i) => (
                <li key={name} className={"flex items-center gap-4 py-3 " + (i < AGENTS.length - 1 ? "border-b border-navy-raised" : "")}>
                  <IconChip icon={icon} round={false} tone="dark" iconSize={20} />
                  <span className="flex flex-col gap-1">
                    <span className="text-base font-semibold leading-[22px] text-cream">{name}</span>
                    <span className="text-xs leading-[18px] text-mist">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="relative h-[580px] overflow-hidden rounded-3xl border border-navy-raised bg-navy-deep">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6">
                <AiRecSnippet className="self-start sm:ml-6" />
                <CashFlowSnippet dark className="sm:self-end sm:mr-6" />
                <Toast dark icon="Check" tone="success" title="AI AP/AR matched 128 invoices" body="3 mismatches sent for review" className="w-[300px] self-start sm:ml-16" />
                <Toast dark icon="Clock" tone="warning" title="AI Risk flagged a duplicate payment" body="Supplier: Adeyemi Logistics · ₦2.45M" className="w-[330px] sm:self-end" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="Products" title="Built for every finance and revenue function." />
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TILES.map(([icon, title, body, href]) => <ProductTile key={title} icon={icon} title={title} body={body} link={`Explore ${title}`} href={href} />)}
          </div>
          <Button href="/products" variant="link" icon="Arrow Right">See All Products</Button>
        </div>
      </section>

      {/* Product preview */}
      <section className="section-y bg-subtle">
        <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-[400fr_784fr]">
          <div className="flex flex-col gap-8">
            <SectionHeader eyebrow="Product preview" title="Every naira, one clear view." body="Total spend, savings and compliance in one executive dashboard, with AI recommendations your team can act on." />
            <Button href={DEMO_HREF} variant="ghost" icon="Arrow Right" className="self-start">Watch a 2-min Demo</Button>
          </div>
          <div aria-hidden="true" className="illus flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="text-base font-semibold">Executive overview · Q3</span>
              <Badge tone="neutral">Illustrative data</Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["Total spend", "₦48.2M", "+4.1% vs Q2", "text-ink-3"],
                ["Potential savings", "₦6.1M", "12 actions found", "text-teal-text"],
                ["Compliance", "98%", "2 filings due", "text-amber-text"],
              ].map(([l, v, s, c]) => (
                <span key={l} className="flex flex-col gap-1 rounded-xl bg-page p-4">
                  <span className="text-xs text-ink-3">{l}</span>
                  <span className="text-[22px] font-semibold leading-7">{v}</span>
                  <span className={"text-xs " + c}>{s}</span>
                </span>
              ))}
            </div>
            <div className="flex gap-3 rounded-xl bg-teal-tint p-4">
              <Icon name="Scan Eye" className="shrink-0" />
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold">AI CFO recommendation</span>
                <span className="text-sm leading-[22px] text-ink-2">Three overlapping software subscriptions found. Consolidating them saves about ₦1.2M a quarter.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Starting point */}
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="Find your starting point" title="One platform, three ways in." />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <ImageCard image="/images/00039d94.jpg" alt="Finance leadership meeting" title="For your role" body="CFOs, procurement, sales and developers: each team gets the workflows for the problem it owns." link="Find your role" href="/solutions#role" />
            <ImageCard image="/images/2376e85e.jpg" alt="SME owner checking invoices" title="For your company size" body="From growing businesses to enterprise groups, start where you sit on the e-invoicing timeline." link="Find your size" href="/solutions#size" />
            <ImageCard image="/images/94759cc3.jpg" alt="Lagos skyline" title="For your industry" body="Retail, manufacturing, hospitality, healthcare, oil and gas, and education." link="Find your industry" href="/solutions#industry" />
          </div>
        </div>
      </section>

      {/* Compliance & trust */}
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-12">
          <SectionHeader eyebrow="Compliance & security" title="Built for the Nigeria Tax Act 2025, not retrofitted to it." body="Tax rules, e-invoicing and audit trails are part of the core, so compliance happens as you work." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard icon="Shield" title="NRS e-invoicing ready" body="System-to-system e-invoicing through the NRS gateway, with VAT, WHT and PAYE handled by the tax engine." />
            <FeatureCard icon="Scan Eye" title="Security posture" body="Encryption in transit and at rest, role-based access and a full audit trail on every transaction." />
            <FeatureCard icon="Layers" title="Data residency" body="Data hosted in Nigeria to meet NDPA requirements. Final details confirmed before launch." />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-y-sm bg-page">
        <div className="wrap flex flex-col items-center gap-12">
          <SectionHeader align="center" eyebrow="Pilot results" title="Less chasing. Faster month-ends." body="Early numbers from finance teams piloting XPensari across Lagos and Abuja." />
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <Stat value="4 days" label="faster month-end close in the first quarter" />
            <Stat value="96%" label="of receipts captured and coded automatically" />
            <Stat value="12 hrs" label="saved per finance team member, every week" />
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Resources */}
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-12">
          <SectionHeader eyebrow="Resources" title="Start with the numbers, not a sales call." body="Estimate your savings, check what the Nigeria Tax Act 2025 changes for you, or read how other finance teams are handling it." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ProductTile icon="Calculator" title="Savings Calculator" body="Estimate what you could save in under a minute." link="Open" href={RESOURCES.calculator.href} />
            <ProductTile icon="Shield" title="Tax & Compliance Hub" body="NTA 2025 and NRS e-invoicing, explained plainly." link="Open" href={RESOURCES.hub.href} />
            <ProductTile icon="Lightbulb" title="Insights / Blog" body="Analysis for Nigerian finance teams." link="Open" href={RESOURCES.insights.href} />
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Get started" title="Let’s build the platform Nigeria and Africa’s enterprises deserve." />
    </>
  );
}

function BentoTile({ bg, kicker, title, body, link, href, children }: { bg: string; kicker: string; title: string; body: string; link: string; href: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-6 overflow-hidden rounded-3xl p-6 md:p-8 ${bg}`}>
      <div className="flex flex-col gap-2">
        <Eyebrow className="[&>span:first-child]:hidden [&>span]:!text-teal-text">{kicker}</Eyebrow>
        <h3 className="t-h3">{title}</h3>
        <p className="text-sm leading-[22px] text-ink-2">{body}</p>
        <Link href={href} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-text hover:underline underline-offset-4">
          {link} <Icon name="Arrow Right" size={16} />
        </Link>
      </div>
      <div className="relative h-[300px]">{children}</div>
    </div>
  );
}
