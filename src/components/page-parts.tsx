import { Button, ProductTile, SectionHeader, cx } from "./ui";
import { LibTrust } from "./sections";
import { DEMO_HREF } from "@/data/site";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, body, actions = true, children, className = "" }: { eyebrow: string; title: string; body?: string; actions?: boolean; children?: ReactNode; className?: string }) {
  return (
    <section className={cx("bg-page section-y", className)}>
      <div className="wrap flex flex-col items-center gap-8 md:gap-12">
        <SectionHeader as="h1" level="page" align="center" eyebrow={eyebrow} title={title} body={body} className="rise" />
        {actions && (
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button href={DEMO_HREF}>Request a Demo</Button>
            <Button href="/contact" variant="link" icon="Arrow Right">Talk to sales</Button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export const StdTrust = () => <LibTrust data={{ L: "A", std: 1 }} />;

export type Tile = { icon: string; title: string; body: string; link: string; href: string };
export function TileGroup({ id, title, body, tiles, cols = 3 }: { id?: string; title: string; body: string; tiles: Tile[]; cols?: 2 | 3 }) {
  return (
    <div id={id} className="flex scroll-mt-28 flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="flex flex-col gap-4 lg:w-[240px] lg:shrink-0">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-xs text-ink-2">{body}</p>
      </div>
      <div className={cx("grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2", cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
        {tiles.map((t) => <ProductTile key={t.title} {...t} />)}
      </div>
    </div>
  );
}
