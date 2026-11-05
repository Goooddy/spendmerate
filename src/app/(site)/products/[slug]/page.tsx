import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LibraryPageView } from "@/components/sections";
import { PRODUCT_PAGES } from "@/data/pages";

export function generateStaticParams() {
  return Object.keys(PRODUCT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = PRODUCT_PAGES[(await params).slug];
  return p ? { title: p.name, description: p.hero.h.b } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = PRODUCT_PAGES[(await params).slug];
  if (!p) notFound();
  return <LibraryPageView page={p} kind="product" />;
}
