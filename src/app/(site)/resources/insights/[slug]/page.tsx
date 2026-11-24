import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button, CtaBand, SectionHeader } from "@/components/ui";
import { Accordion } from "@/components/Accordion";
import { PillSubscribe } from "@/components/forms";
import { ArticleCard } from "@/components/resources";
import { ARTICLES } from "@/data/articles";
import { ShareLinks } from "./ShareLinks";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = (await params).slug;
  const art = ARTICLES.find((x) => x.slug === s);
  return art ? { title: art.title, description: art.excerpt } : {};
}

const TOC = ["What changed", "Who needs to e-invoice, and when", "What it means for your finance team", "Three things to do this quarter", "How SpendMerate helps", "FAQs"];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  const related = ARTICLES.filter((x) => x.slug !== slug).slice(0, 3);
  const H2 = ({ t }: { t: string }) => <h2 id={slugify(t)} className="t-h3 scroll-mt-28 pt-4">{t}</h2>;
  return (
    <>
      <section className="bg-page pb-12 pt-16">
        <div className="wrap flex max-w-[960px] flex-col gap-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink-2">
            <Link href="/resources/insights" className="hover:text-teal-text">Insights</Link><span aria-hidden="true">/</span><span className="text-teal-text">{a.cat}</span>
          </nav>
          <p className="text-sm text-ink-3">{a.date.replace("Sep", "September").replace("Aug", "August").replace("Jul", "July")}</p>
          <h1 className="t-h1 rise">{a.title}</h1>
          <p className="t-lead text-ink-2">{a.excerpt}</p>
          <div className="flex items-center gap-3 text-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/e57ac192.jpg" alt="" className="size-10 rounded-full object-cover" />
            <span className="font-semibold">[Author name]</span><span className="text-ink-3">Finance writer, SpendMerate · {a.read}</span>
          </div>
        </div>
      </section>
      <div className="wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image} alt="" className="h-[280px] w-full rounded-3xl md:rounded-[32px] object-cover md:h-[520px]" />
      </div>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:w-[260px] lg:self-start">
            <nav aria-label="In this article">
              <p className="t-eyebrow mb-3 text-ink-3">In this article</p>
              <ol>{TOC.map((t) => <li key={t}><a href={`#${slugify(t)}`} className="block py-2 text-sm text-ink-2 hover:text-teal-text">{t}</a></li>)}</ol>
            </nav>
            <ShareLinks title={a.title} />
            <div className="flex flex-col gap-3 rounded-2xl bg-navy p-6 text-cream">
              <p className="t-eyebrow text-teal-bright">SpendMerate</p>
              <p className="text-lg font-semibold">Get NTA 2025-ready</p>
              <p className="text-sm text-mist">E-invoicing, VAT, WHT and PAYE in one platform, with an AI agent checking every transaction.</p>
              <Button href="/request-demo" size="sm" className="self-start">Request a Demo</Button>
            </div>
          </aside>
          <article className="flex max-w-[720px] flex-1 flex-col gap-6 text-lg leading-8 text-ink-2">
            <p>The Nigeria Tax Act 2025 brings several older tax laws into one statute and moves enforcement toward digital, system-to-system reporting. For small and mid-sized businesses, the biggest change is not a new rate but a new way of working: invoices, filings and records increasingly flow to the Nigeria Revenue Service (NRS) electronically.</p>
            <H2 t="What changed" />
            <p>The Act brings company income tax, VAT, withholding tax and PAYE rules together, and pairs them with mandatory e-invoicing. Instead of reconciling at year-end, businesses are expected to keep records that match what the tax authority already sees.</p>
            <aside className="flex flex-col gap-2 rounded-2xl border-l-4 border-teal bg-teal-tint p-6">
              <span className="t-eyebrow text-teal-text">Key takeaway</span>
              <p className="text-base text-ink">Compliance is shifting from an annual filing exercise to a continuous one. The businesses that adapt fastest are the ones whose invoices and books already live in one system.</p>
            </aside>
            <H2 t="Who needs to e-invoice, and when" />
            <p>E-invoicing is being phased in by turnover: larger businesses first, smaller businesses after. Check which band your turnover falls in, and plan the switch before your deadline rather than after it.</p>
            <figure className="flex flex-col gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/2cbe1022.jpg" alt="Finance team reviewing e-invoices" className="h-72 w-full rounded-2xl object-cover" loading="lazy" />
              <figcaption className="text-sm text-ink-3">E-invoices reach the NRS as transactions happen, not at year-end.</figcaption>
            </figure>
            <H2 t="What it means for your finance team" />
            <p>Month-end stops being the moment you find problems. Missing VAT on an invoice, a supplier without a TIN or a late WHT remittance now surfaces when it happens, so teams need clean records and clear owners every week, not just at filing time.</p>
            <H2 t="Three things to do this quarter" />
            <ol className="list-decimal pl-6">
              <li>Confirm your turnover band and e-invoicing start date.</li>
              <li>Get invoices, receipts and payments into one system of record.</li>
              <li>Give one person ownership of VAT, WHT and PAYE deadlines, on a shared calendar.</li>
            </ol>
            <H2 t="How SpendMerate helps" />
            <p>SpendMerate is built for the Nigeria Tax Act 2025: e-invoices go to the NRS through a system-to-system gateway, VAT and WHT are checked on every transaction, and the <Link href="/resources/compliance-calendar" className="text-teal-text underline">Compliance Calendar</Link> keeps every filing date in view.</p>
            <div className="flex flex-col gap-2 border-y border-line py-6 text-base">
              <p className="font-semibold text-ink">[Author name] · Finance writer, SpendMerate</p>
              <p>[Short author bio: background, areas of expertise, and what they cover for SpendMerate.]</p>
              <p className="text-sm text-ink-3">Reviewed by [Reviewer name], Tax &amp; Compliance lead</p>
            </div>
            <p className="text-sm text-ink-3">This article is general information about the Nigeria Tax Act 2025, not tax advice. Check current rules with the NRS or your tax adviser before acting.</p>
            <H2 t="FAQs" />
            <Accordion items={[
              { q: "Does the Nigeria Tax Act 2025 apply to small businesses?", a: "Yes. Small companies below the Act’s thresholds may be exempt from some taxes, but most still have filing and record-keeping duties." },
              { q: "When do I need to start e-invoicing?", a: "It depends on your turnover band. Large taxpayers are already in scope, ₦1bn–₦5bn businesses joined in 2026, and smaller businesses are expected from 2027." },
              { q: "Can SpendMerate submit e-invoices for me?", a: "Yes. SpendMerate signs each invoice and submits it to the NRS through the system-to-system gateway, then records the acceptance on the invoice." },
            ]} />
          </article>
        </div>
      </section>
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Keep reading" title="Don’t miss these" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{related.map((r) => <ArticleCard key={r.slug} a={r} />)}</div>
        </div>
      </section>
      <CtaBand image="12071550" tone="mint" eyebrow="Newsletter" title="Get the monthly digest" body="Compliance deadlines, product updates and FinOps tips. Once a month, no spam.">
        <PillSubscribe />
      </CtaBand>
    </>
  );
}
