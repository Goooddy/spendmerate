import Link from "next/link";
import { Badge, Icon, ProductTile, SectionHeader } from "./ui";
import type { Article } from "@/data/articles";
import { RESOURCES } from "@/data/site";

const ALL = {
  hub: { icon: "Landmark", title: "Tax & Compliance Hub", body: "Plain-language guides to the Nigeria Tax Act 2025.", link: "Open the hub", href: RESOURCES.hub.href },
  calendar: { icon: "Calendar", title: "Compliance Calendar", body: "Every recurring filing deadline, in one list.", link: "See deadlines", href: RESOURCES.calendar.href },
  blog: { icon: "Book Open", title: "Insights & Blog", body: "FinOps practice, compliance guidance and product updates.", link: "Read the blog", href: RESOURCES.insights.href },
  calc: { icon: "Calculator", title: "Savings Calculator", body: "Estimate your savings in under a minute.", link: "Try the calculator", href: RESOURCES.calculator.href },
  docs: { icon: "Code", title: "Developer Docs & API", body: "Open, documented endpoints and sandbox access.", link: "Read the docs", href: RESOURCES.docs.href },
  expert: { icon: "Users", title: "Talk to an expert", body: "Walk through your setup against the Tax Act 2025.", link: "Book a call", href: "/request-demo" },
};
export type ResKey = keyof typeof ALL;

export function MoreResources({ keys, eyebrow = "Resources", title = "More from XPensari", body = "Tools and guides that work together.", bg = "bg-subtle" }: { keys: ResKey[]; eyebrow?: string; title?: string; body?: string; bg?: string }) {
  return (
    <section className={`section-y ${bg}`}>
      <div className="wrap flex flex-col gap-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((k) => <ProductTile key={k} {...ALL[k]} />)}
        </div>
      </div>
    </section>
  );
}

export function ArticleCard({ a, large }: { a: Article; large?: boolean }) {
  return (
    <Link href={`/resources/insights/${a.slug}`} className={`card-lift group flex overflow-hidden rounded-2xl border border-line bg-white ${large ? "flex-col md:col-span-2 md:flex-row" : "flex-col"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a.image} alt="" className={large ? "h-60 w-full object-cover md:h-auto md:w-1/2" : "h-[222px] w-full object-cover"} loading="lazy" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex gap-2">
          {a.featured && <Badge tone="amber">Featured</Badge>}
          {large ? <Badge tone="teal">{a.cat}</Badge> : <span className="t-eyebrow text-teal-text">{a.cat === "Case Studies" ? "Case study" : a.cat}</span>}
        </div>
        <h3 className={large ? "t-h3" : "text-lg font-semibold leading-6"}>{a.title}</h3>
        <p className="text-sm leading-[22px] text-ink-2">{a.excerpt}</p>
        <span className="mt-auto text-xs text-ink-3">{a.date} · {a.read}</span>
        {large && <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text group-hover:underline">Read the article <Icon name="Arrow Right" size={16} /></span>}
      </div>
    </Link>
  );
}
