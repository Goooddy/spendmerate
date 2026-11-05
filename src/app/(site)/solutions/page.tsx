import type { Metadata } from "next";
import { CtaBand } from "@/components/ui";
import { PageHero, StdTrust, TileGroup } from "@/components/page-parts";
import { SOLUTIONS as S } from "@/data/site";

export const metadata: Metadata = { title: "Solutions", description: "Find the fit for your team, your size, your industry." };

const t = (icon: string, key: keyof typeof S, body: string) => ({ icon, title: S[key].title, body, link: `Explore ${S[key].title}`, href: S[key].href });

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="Find the fit for your team, your size, your industry." body="The same platform, framed around how you actually buy: by the role that owns the problem, the size of your business, or the sector you operate in." />
      <StdTrust />
      <section className="section-y bg-subtle">
        <div className="wrap flex flex-col gap-8 md:gap-16">
          <TileGroup id="role" title="By role" body="The person who owns the problem." cols={2} tiles={[
            t("Chart Pie", "cfo", "Control spend and close faster"),
            t("Shopping Cart", "procurement", "Buy smarter, see vendor risk"),
            t("Trending Up", "sales", "Turn pipeline into cash"),
            t("Code", "developers", "Build on an open, documented API"),
          ]} />
          <TileGroup id="size" title="By company size" body="Where you are on the e-invoicing timeline." tiles={[
            t("Target", "growing", "Under ₦1bn · e-invoicing in 2027"),
            t("Building", "mid", "₦1bn–₦5bn · e-invoicing now live"),
            t("Landmark", "enterprise", "Over ₦5bn · e-invoicing mandatory"),
          ]} />
          <TileGroup id="industry" title="By industry" body="Sector-specific spend and compliance patterns." tiles={[
            t("Package", "retail", "High volume, thin margins, many SKUs"),
            t("Layout Grid", "manufacturing", "Materials, production and vendor spend"),
            t("Users", "hospitality", "Multi-site spend, reconciled daily"),
            t("Shield", "healthcare", "Regulated procurement and audit trails"),
            t("Layers", "oil", "Complex contracts, multi-entity reporting"),
            t("Book Open", "education", "Grants, fees and tight budget control"),
          ]} />
        </div>
      </section>
      <CtaBand image="73fee244" eyebrow="Get started" title="NOT SURE WHICH FIT IS YOURS?" body="Tell us your role, size and sector and we will show the shortest path to value." />
    </>
  );
}
