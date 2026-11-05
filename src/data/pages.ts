import p1 from "./products-1.json";
import p2 from "./products-2.json";
import s1 from "./solutions-1.json";
import s2 from "./solutions-2.json";
import s3 from "./solutions-3.json";
import type { LibraryPage } from "./library";

const P = { ...p1, ...p2 } as unknown as Record<string, LibraryPage>;
const S = { ...s1, ...s2, ...s3 } as unknown as Record<string, LibraryPage>;

export const PRODUCT_PAGES: Record<string, LibraryPage> = {
  "ai-spend-intelligence": P["436:17839"],
  "expense-management": P["436:17805"],
  procurement: P["436:17771"],
  "invoice-ap-ar": P["436:17737"],
  "budget-analytics": P["436:17703"],
  "revenue-intelligence": P["436:17596"],
  payments: P["510:29866"],
  "tax-compliance": P["436:17669"],
  "risk-audit-esg": P["436:17635"],
  "ai-intelligence-layer": P["507:20454"],
  "integrations-api": P["507:20481"],
};

export const SOLUTION_PAGES: Record<string, LibraryPage> = {
  cfos: S["402:21620"],
  "procurement-teams": S["402:21646"],
  "sales-revenue": S["402:21672"],
  developers: S["402:21697"],
  "growing-businesses": S["402:21722"],
  "mid-sized": S["402:21748"],
  enterprises: S["402:21774"],
  retail: S["402:21800"],
  manufacturing: S["402:21826"],
  hospitality: S["402:21852"],
  healthcare: S["402:21878"],
  "oil-gas": S["402:21904"],
  education: S["402:21930"],
};
