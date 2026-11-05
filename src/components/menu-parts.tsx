"use client";
import Link from "next/link";
import type { Mega, MenuItem } from "@/data/site";
import { Icon, IconChip, cx } from "./ui";

/** Mega menu link. "v2" is for the cream side column: it hovers to white instead of cream. */
export function MegaItem({ it, onNav, v2 = false }: { it: MenuItem; onNav: () => void; v2?: boolean }) {
  return (
    <Link
      href={it.href}
      onClick={onNav}
      className={cx("press flex items-center gap-3 rounded-xl p-3 transition-colors duration-150", v2 ? "hover:bg-white focus-visible:bg-white" : "hover:bg-page focus-visible:bg-page")}
    >
      <IconChip icon={it.icon} round={false} size={40} iconSize={24} />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-semibold leading-5 text-ink">{it.title}</span>
        <span className="text-sm leading-[22px] text-ink-2">{it.body}</span>
      </span>
    </Link>
  );
}

export function GroupLabel({ children }: { children: string }) {
  return <p className="pl-3 t-eyebrow text-ink-3">{children}</p>;
}

export function FeaturedCard({ f, onNav }: { f: Mega["featured"]; onNav: () => void }) {
  return (
    <Link href={f.href} onClick={onNav} className="press group flex flex-col gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={f.image} alt="" className="h-32 w-full rounded-xl object-cover" />
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold leading-5 text-ink">{f.title}</span>
        <span className="text-xs leading-[18px] text-ink-2">{f.body}</span>
      </span>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text group-hover:underline underline-offset-4">
        {f.link} <Icon name="Arrow Right" size={16} />
      </span>
    </Link>
  );
}

