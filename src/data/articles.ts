export type Article = { slug: string; cat: "Compliance" | "FinOps" | "Product" | "Case Studies"; title: string; excerpt: string; date: string; read: string; image: string; featured?: boolean };

export const ARTICLES: Article[] = [
  { slug: "nigeria-tax-act-2025-smes", cat: "Compliance", featured: true, title: "Understanding the Nigeria Tax Act 2025: What SMEs Need to Know", excerpt: "A plain-language walkthrough of the new e-invoicing and filing rules, and what changes for finance teams this year.", date: "Sep 18, 2026", read: "7 min read", image: "/images/2376e85e.jpg" },
  { slug: "paye-under-nta-2025", cat: "Compliance", title: "PAYE Under the Nigeria Tax Act 2025: What Changes for Employers", excerpt: "New bands, reliefs and filing steps for payroll teams, explained with worked examples.", date: "Sep 25, 2026", read: "6 min read", image: "/images/2069de14.jpg" },
  { slug: "expense-process-automation-signs", cat: "FinOps", title: "5 Signs Your Expense Process Needs Automation", excerpt: "If your team is still reconciling receipts in spreadsheets, here's how to spot the moment it's costing you more than it saves.", date: "Sep 10, 2026", read: "5 min read", image: "/images/4be01f3a.jpg" },
  { slug: "inside-ai-spend-intelligence", cat: "Product", title: "Inside XPensari's AI Spend Intelligence Layer", excerpt: "A look at how the seven-agent AI layer flags anomalies, forecasts cash position, and drafts your monthly close.", date: "Aug 29, 2026", read: "6 min read", image: "/images/69f88811.jpg" },
  { slug: "lagos-logistics-close-time", cat: "Case Studies", title: "How a Lagos Logistics Firm Cut Close Time by 60%", excerpt: "A walkthrough of the AP automation and reconciliation workflow that took their month-end close from 12 days to 5.", date: "Aug 14, 2026", read: "4 min read", image: "/images/4a83b43e.jpg" },
  { slug: "e-invoicing-readiness-checklist", cat: "Compliance", title: "E-Invoicing Readiness: A Checklist for Finance Teams", excerpt: "Seven steps to get your invoicing, VAT records and NRS reporting ready ahead of the compliance deadline.", date: "Aug 2, 2026", read: "6 min read", image: "/images/2cbe1022.jpg" },
  { slug: "finops-vs-traditional-accounting", cat: "FinOps", title: "FinOps vs. Traditional Accounting: What's Actually Different", excerpt: "Same numbers, different discipline. Why modern finance teams are organizing around FinOps instead of the monthly close.", date: "Jul 22, 2026", read: "5 min read", image: "/images/1a091798.jpg" },
];

export const TOPICS = [
  { cat: "FinOps", body: "Spend control, close and reporting.", image: "/images/45d79770.jpg" },
  { cat: "Compliance", body: "Tax Act 2025, VAT, WHT and e-invoicing.", image: "/images/e57ac192.jpg" },
  { cat: "Product", body: "What’s new inside XPensari.", image: "/images/1e54c159.jpg" },
  { cat: "Case Studies", body: "How teams cut close time and leakage.", image: "/images/0baea80a.jpg" },
] as const;
