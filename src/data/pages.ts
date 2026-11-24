import p1 from "./products-1.json";
import p2 from "./products-2.json";
import s1 from "./solutions-1.json";
import s2 from "./solutions-2.json";
import s3 from "./solutions-3.json";
import added from "./new-pages.json";
import type { LibraryPage } from "./library";

const N = added as unknown as Record<string, LibraryPage>;
const P = { ...p1, ...p2, ...N } as unknown as Record<string, LibraryPage>;
const S = { ...s1, ...s2, ...s3, ...N } as unknown as Record<string, LibraryPage>;

/** Inner-orbit image of each page's CTA band (each Figma instance overrides it). */
const PRODUCT_CTA_IMG: Record<string, string> = {
  "ai-spend-intelligence": "2069de14", "expense-management": "1e54c159", procurement: "22e64d1e", "invoice-ap-ar": "1a091798",
  "budget-analytics": "69f88811", "revenue-intelligence": "4be01f3a", "bank-reconciliation": "1a091798", payments: "1a091798", "tax-compliance": "2376e85e",
  "risk-audit": "00039d94", "ai-intelligence-layer": "1a091798", "integrations-api": "1a091798",
};
const SOLUTION_CTA_IMG: Record<string, string> = {
  cfos: "ee9b89bb", "procurement-teams": "21991faf", "sales-revenue": "d6ece747", developers: "be3d6935", vendors: "21991faf", "growing-businesses": "21e66b35",
  "mid-sized": "3aabbf34", enterprises: "12071550", retail: "e66af21b", manufacturing: "b5bb59cd", hospitality: "9199f133",
  healthcare: "e834fbad", "oil-gas": "e0b43624", education: "00c8bc4d", "public-sector": "e834fbad",
};
const withImg = (pages: Record<string, LibraryPage>, imgs: Record<string, string>) => {
  for (const [slug, p] of Object.entries(pages)) if (p?.cta) p.cta.img = imgs[slug];
  return pages;
};

export const PRODUCT_PAGES: Record<string, LibraryPage> = {
  "ai-spend-intelligence": P["436:17839"],
  "expense-management": P["436:17805"],
  procurement: P["436:17771"],
  "invoice-ap-ar": P["436:17737"],
  "budget-analytics": P["436:17703"],
  "revenue-intelligence": P["436:17596"],
  "bank-reconciliation": P["1042:23828"],
  payments: P["510:29866"],
  "tax-compliance": P["436:17669"],
  "risk-audit": P["436:17635"],
  "ai-intelligence-layer": P["507:20454"],
  "integrations-api": P["507:20481"],
};
withImg(PRODUCT_PAGES, PRODUCT_CTA_IMG);

export const SOLUTION_PAGES: Record<string, LibraryPage> = {
  cfos: S["402:21620"],
  "procurement-teams": S["402:21646"],
  "sales-revenue": S["402:21672"],
  developers: S["402:21697"],
  vendors: S["1044:24353"],
  "growing-businesses": S["402:21722"],
  "mid-sized": S["402:21748"],
  enterprises: S["402:21774"],
  retail: S["402:21800"],
  manufacturing: S["402:21826"],
  hospitality: S["402:21852"],
  healthcare: S["402:21878"],
  "oil-gas": S["402:21904"],
  education: S["402:21930"],
  "public-sector": S["1044:25007"],
};
withImg(SOLUTION_PAGES, SOLUTION_CTA_IMG);
