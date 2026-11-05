"use client";
import { useState } from "react";
import { ArticleCard } from "@/components/resources";
import { ARTICLES } from "@/data/articles";
import { cx } from "@/components/ui";

const FILTERS = ["All", "FinOps", "Compliance", "Product", "Case Studies"] as const;

export function ArticleGrid() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const [more, setMore] = useState(false);
  const list = ARTICLES.filter((a) => f === "All" || a.cat === f);
  const shown = more ? list : list.slice(0, 7);
  return (
    <div id="articles" className="flex scroll-mt-28 flex-col gap-8">
      <div role="tablist" aria-label="Filter articles" className="flex flex-wrap gap-2">
        {FILTERS.map((x) => (
          <button key={x} role="tab" aria-selected={f === x} onClick={() => setF(x)} className={cx("rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150", f === x ? "border-navy bg-navy text-cream" : "border-line bg-white hover:border-navy")}>{x}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a, i) => <ArticleCard key={a.slug} a={a} large={i === 0 && f === "All"} />)}
      </div>
      {!more && list.length > 7 && (
        <button onClick={() => setMore(true)} className="self-center rounded-lg border border-navy px-6 py-3 font-semibold hover:bg-navy hover:text-cream">Load more articles</button>
      )}
      {list.length <= 7 && f === "All" && (
        <p className="text-center text-sm text-ink-3">You’ve reached the latest articles. New guides are added every month.</p>
      )}
    </div>
  );
}
