import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LibraryPageView } from "@/components/sections";
import { SOLUTION_PAGES } from "@/data/pages";

export function generateStaticParams() {
  return Object.keys(SOLUTION_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = SOLUTION_PAGES[(await params).slug];
  return p ? { title: `For ${p.name}`, description: p.hero.h.b } : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = SOLUTION_PAGES[(await params).slug];
  if (!p) notFound();
  return <LibraryPageView page={p} kind="solution" />;
}
