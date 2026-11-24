import type { Metadata } from "next";
import { CtaBand } from "@/components/ui";
import { PageHero, StdTrust, TileGroup } from "@/components/page-parts";
import { PRODUCTS as P } from "@/data/site";

export const metadata: Metadata = { title: "Products", description: "Twelve products. One data model." };

const t = (icon: string, key: keyof typeof P, body: string) => ({ icon, title: P[key].title, body, link: `Explore ${P[key].title}`, href: P[key].href });

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Twelve products. One data model." body="Every SpendMerate product writes to the same ledger, so spend, revenue, payments and compliance stay in step without reconciliation." />
      <StdTrust />
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-8 md:gap-16">
          <TileGroup title="Control money out" body="Stop leakage before it reaches the ledger." tiles={[
            t("Scan Eye", "spend", "Catch avoidable spend early"),
            t("Credit Card", "expense", "Control spend where it happens"),
            t("Shopping Cart", "procurement", "See vendor risk up front"),
            t("Receipt", "invoice", "Less manual work on both ledgers"),
            t("Chart Line", "budget", "Real-time numbers, not month-end"),
          ]} />
          <TileGroup title="Grow money in" body="Apply the same rigour to revenue." tiles={[t("Trending Up", "revenue", "Grow revenue with the same rigour")]} />
          <TileGroup title="Move money" body="Every naira in and out, reconciled." tiles={[t("Check", "bank", "Bank lines matched every day"), t("Wallet", "payments", "Every payment, reconciled")]} />
          <TileGroup title="Stay compliant" body="Built for the Nigeria Tax Act 2025." tiles={[t("Shield", "tax", "Tax discipline by default"), t("Layers", "risk", "Catch problems before they cost")]} />
          <TileGroup title="Platform" body="The layer everything else runs on." tiles={[t("Sparkles", "ai", "Seven AI agents"), { ...t("Plug", "api", "Open by design"), badge: "Coming soon" }]} />
        </div>
      </section>
      <CtaBand image="73fee244" eyebrow="Get started" title="SEE THE WHOLE PLATFORM IN ONE SESSION." body="Thirty minutes on your own numbers, across spend, revenue, payments and compliance." />
    </>
  );
}
