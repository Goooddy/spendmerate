import type { Metadata } from "next";
import Link from "next/link";
import { Badge, CtaBand, Icon, SectionHeader } from "@/components/ui";
import { NewsletterForm, PillSubscribe } from "@/components/forms";
import { InView } from "@/components/motion";
import { d } from "@/components/seq";
import { MoreResources } from "@/components/resources";
import { ARTICLES, TOPICS } from "@/data/articles";
import { ArticleGrid } from "./ArticleGrid";

export const metadata: Metadata = { title: "Insights", description: "Insights & resources for modern finance teams." };

export default function InsightsPage() {
  const [feat, ...rest] = ARTICLES;
  return (
    <>
      <InView as="section" className="bg-page pb-24 pt-16">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full max-w-[560px] flex-col gap-6">
            <SectionHeader as="h1" level="page" eyebrow="Insights" title="Insights & resources for modern finance teams" body="FinOps practice, compliance guidance and product updates from the SpendMerate team." />
            <div className="max-w-[480px]"><NewsletterForm /></div>
            <p className="text-xs text-ink-2">Compliance deadlines, product updates and FinOps tips. Once a month.</p>
          </div>
          <div className="flex w-full flex-1 flex-col gap-4 rounded-3xl md:rounded-[32px] bg-subtle px-2 py-6 md:p-10">
            <Link href={`/resources/insights/${feat.slug}`} className="seq-up flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 hover:shadow-md" style={d(300)}>
              <div className="flex flex-wrap items-center justify-between gap-2"><span className="t-eyebrow text-ink-3">Featured</span><Badge tone="amber">Compliance</Badge></div>
              <span className="text-lg font-semibold leading-6">{feat.title}</span>
              <span className="text-xs text-ink-3">{feat.date} · {feat.read}</span>
              <span className="flex items-center gap-2 text-xs text-teal-text"><Icon name="Check" size={14} /> A plain-language walkthrough of the new e-invoicing rules</span>
            </Link>
            <div className="seq-up flex flex-col rounded-2xl border border-line bg-white px-6 py-4" style={d(900)}>
              <span className="flex items-center gap-2 pb-2 text-sm font-semibold"><Icon name="Trending Up" size={18} className="text-teal-text" /> Latest insights</span>
              {[rest[1], rest[2], rest[3]].map((a, i) => (
                <Link key={a.slug} href={`/resources/insights/${a.slug}`} className="seq-x flex items-center justify-between gap-3 border-t border-line py-3 text-sm hover:text-teal-text" style={d(1400 + i * 250)}>
                  <span>{a.title}</span><span className="shrink-0 text-xs text-ink-3">{a.cat === "Case Studies" ? "Case study" : a.cat}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </InView>
      <section className="section-y bg-white">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Latest" title="Latest articles" body="Guides, explainers and stories for finance teams working under the Nigeria Tax Act 2025." />
          <ArticleGrid />
        </div>
      </section>
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow="Topics" title="Explore by topic" body="Jump straight to the subjects your team cares about." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map((t) => (
              <Link key={t.cat} href="#articles" className="card-lift group overflow-hidden rounded-2xl border border-line bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt="" className="h-[150px] w-full object-cover" loading="lazy" />
                <div className="flex flex-col gap-1 p-5">
                  <span className="flex items-center justify-between text-base font-semibold">{t.cat === "Case Studies" ? "Case studies" : t.cat}<Icon name="Arrow Right" size={18} className="text-teal-text transition-transform group-hover:translate-x-1" /></span>
                  <span className="text-sm text-ink-2">{t.body}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <MoreResources keys={["hub", "calendar", "calc", "docs"]} />
      <CtaBand image="12071550" tone="mint" eyebrow="Newsletter" title="Get the monthly digest" body="Compliance deadlines, product updates and FinOps tips. Once a month, no spam.">
        <PillSubscribe />
      </CtaBand>
    </>
  );
}
