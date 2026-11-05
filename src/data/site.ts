export type MenuItem = { icon: string; title: string; body: string; href: string };
export type MenuGroup = { label: string; items: MenuItem[] };

export const PRODUCTS = {
  spend: { title: "AI Spend Intelligence", href: "/products/ai-spend-intelligence" },
  expense: { title: "Expense Management & Corporate Cards", href: "/products/expense-management" },
  procurement: { title: "Procurement & Vendor Intelligence", href: "/products/procurement" },
  invoice: { title: "Invoice & AP/AR Automation", href: "/products/invoice-ap-ar" },
  budget: { title: "Budget, Cash Flow & Financial Analytics", href: "/products/budget-analytics" },
  revenue: { title: "Revenue Intelligence", href: "/products/revenue-intelligence" },
  payments: { title: "Payments", href: "/products/payments" },
  tax: { title: "Tax & Compliance Intelligence", href: "/products/tax-compliance" },
  risk: { title: "Risk, Audit & ESG", href: "/products/risk-audit-esg" },
  ai: { title: "AI Intelligence Layer", href: "/products/ai-intelligence-layer" },
  api: { title: "Integrations & API Platform", href: "/products/integrations-api" },
} as const;

export const SOLUTIONS = {
  cfo: { title: "CFOs & finance teams", href: "/solutions/cfos" },
  procurement: { title: "Procurement teams", href: "/solutions/procurement-teams" },
  sales: { title: "Sales & revenue teams", href: "/solutions/sales-revenue" },
  developers: { title: "Developers", href: "/solutions/developers" },
  growing: { title: "Growing businesses", href: "/solutions/growing-businesses" },
  mid: { title: "Mid-sized companies", href: "/solutions/mid-sized" },
  enterprise: { title: "Enterprises & groups", href: "/solutions/enterprises" },
  retail: { title: "Retail", href: "/solutions/retail" },
  manufacturing: { title: "Manufacturing", href: "/solutions/manufacturing" },
  hospitality: { title: "Hospitality", href: "/solutions/hospitality" },
  healthcare: { title: "Healthcare", href: "/solutions/healthcare" },
  oil: { title: "Oil & Gas", href: "/solutions/oil-gas" },
  education: { title: "Education", href: "/solutions/education" },
} as const;

export const RESOURCES = {
  insights: { title: "Insights / Blog", href: "/resources/insights" },
  hub: { title: "Tax & Compliance Hub", href: "/resources/tax-compliance-hub" },
  calendar: { title: "Compliance Calendar", href: "/resources/compliance-calendar" },
  calculator: { title: "Savings Calculator", href: "/resources/savings-calculator" },
  docs: { title: "Developer Docs", href: "/resources/developers" },
} as const;

export const COMPANY = {
  about: { title: "About", href: "/about" },
  partners: { title: "Partners", href: "/partners" },
  investors: { title: "Investors", href: "/investors" },
  careers: { title: "Careers", href: "/careers" },
  contact: { title: "Contact", href: "/contact" },
} as const;

export const DEMO_HREF = "/request-demo";

type Featured = { image: string; icon?: string; title: string; body: string; link: string; href: string };
export type Mega = { key: string; label: string; width: "full" | "narrow"; columns: MenuGroup[][]; side?: MenuGroup; textLinks?: { label: string; links: { title: string; href: string }[] }; featured: Featured };

export const MEGA: Mega[] = [
  {
    key: "products",
    label: "Products",
    width: "full",
    columns: [
      [
        {
          label: "Control money out",
          items: [
            { icon: "Scan Eye", title: PRODUCTS.spend.title, body: "Catch avoidable spend early", href: PRODUCTS.spend.href },
            { icon: "Credit Card", title: PRODUCTS.expense.title, body: "Control spend where it happens", href: PRODUCTS.expense.href },
            { icon: "Shopping Cart", title: PRODUCTS.procurement.title, body: "See vendor risk up front", href: PRODUCTS.procurement.href },
            { icon: "Receipt", title: PRODUCTS.invoice.title, body: "Less manual work on both ledgers", href: PRODUCTS.invoice.href },
            { icon: "Chart Line", title: PRODUCTS.budget.title, body: "Real-time numbers, not month-end", href: PRODUCTS.budget.href },
          ],
        },
      ],
      [
        { label: "Grow money in", items: [{ icon: "Trending Up", title: PRODUCTS.revenue.title, body: "Grow revenue with the same rigor", href: PRODUCTS.revenue.href }] },
        { label: "Move money", items: [{ icon: "Arrow Left Right", title: PRODUCTS.payments.title, body: "Every payment, reconciled", href: PRODUCTS.payments.href }] },
        {
          label: "Stay compliant",
          items: [
            { icon: "Landmark", title: PRODUCTS.tax.title, body: "Tax discipline by default", href: PRODUCTS.tax.href },
            { icon: "Shield", title: PRODUCTS.risk.title, body: "Catch problems before they cost", href: PRODUCTS.risk.href },
          ],
        },
      ],
    ],
    side: {
      label: "Platform",
      items: [
        { icon: "Sparkles", title: PRODUCTS.ai.title, body: "Seven AI agents", href: PRODUCTS.ai.href },
        { icon: "Plug", title: PRODUCTS.api.title, body: "Open by design", href: PRODUCTS.api.href },
      ],
    },
    featured: { image: "/images/0baea80a.jpg", title: "Watch a 2-min demo", body: "A quick tour of the platform. Video still to come.", link: "Watch the demo", href: DEMO_HREF },
  },
  {
    key: "solutions",
    label: "Solutions",
    width: "full",
    columns: [
      [
        {
          label: "By role",
          items: [
            { icon: "Wallet", title: SOLUTIONS.cfo.title, body: "Control spend and close faster", href: SOLUTIONS.cfo.href },
            { icon: "Package", title: SOLUTIONS.procurement.title, body: "Buy smarter, see vendor risk", href: SOLUTIONS.procurement.href },
            { icon: "Target", title: SOLUTIONS.sales.title, body: "Turn pipeline into cash", href: SOLUTIONS.sales.href },
            { icon: "Code", title: SOLUTIONS.developers.title, body: "Build on an open, documented API", href: SOLUTIONS.developers.href },
          ],
        },
      ],
      [
        {
          label: "By company size",
          items: [
            { icon: "Trending Up", title: SOLUTIONS.growing.title, body: "Under ₦1bn · e-invoicing in 2027", href: SOLUTIONS.growing.href },
            { icon: "Layers", title: SOLUTIONS.mid.title, body: "₦1bn–₦5bn · e-invoicing now live", href: SOLUTIONS.mid.href },
            { icon: "Building", title: SOLUTIONS.enterprise.title, body: "Over ₦5bn · e-invoicing mandatory", href: SOLUTIONS.enterprise.href },
          ],
        },
      ],
    ],
    textLinks: {
      label: "By industry",
      links: [SOLUTIONS.retail, SOLUTIONS.manufacturing, SOLUTIONS.hospitality, SOLUTIONS.healthcare, SOLUTIONS.oil, SOLUTIONS.education],
    },
    featured: { image: "/images/2cbe1022.jpg", icon: "Landmark", title: "Built for the Nigeria Tax Act 2025", body: "Compliance is built in, not retrofitted.", link: "See Tax & Compliance", href: PRODUCTS.tax.href },
  },
  {
    key: "resources",
    label: "Resources",
    width: "full",
    columns: [
      [
        {
          label: "Learn",
          items: [
            { icon: "Lightbulb", title: RESOURCES.insights.title, body: "Analysis for finance teams", href: RESOURCES.insights.href },
            { icon: "Book Open", title: RESOURCES.hub.title, body: "NTA 2025 and NRS, explained", href: RESOURCES.hub.href },
          ],
        },
        { label: "Build", items: [{ icon: "Terminal", title: "Developer Docs & API Reference", body: "Build on XPensari", href: RESOURCES.docs.href }] },
      ],
      [
        {
          label: "Tools",
          items: [
            { icon: "Calendar", title: RESOURCES.calendar.title, body: "Never miss a filing date", href: RESOURCES.calendar.href },
            { icon: "Calculator", title: RESOURCES.calculator.title, body: "Estimate what you could save", href: RESOURCES.calculator.href },
          ],
        },
      ],
    ],
    featured: { image: "/images/45d79770.jpg", icon: "Calculator", title: "How much could you save?", body: "Estimate your avoidable spend with the Savings Calculator.", link: "Try the calculator", href: RESOURCES.calculator.href },
  },
  {
    key: "about",
    label: "About",
    width: "narrow",
    columns: [
      [
        {
          label: "About XPensari",
          items: [
            { icon: "Info", title: "About XPensari", body: "Our story, mission and roadmap", href: COMPANY.about.href },
            { icon: "Users", title: "Partners", body: "Who we build and sell with", href: COMPANY.partners.href },
            { icon: "Chart Pie", title: "Investors", body: "The market and the deck", href: COMPANY.investors.href },
            { icon: "Briefcase", title: "Careers", body: "Join the team", href: COMPANY.careers.href },
          ],
        },
      ],
    ],
    featured: { image: "/images/4a83b43e.jpg", icon: "Chart Pie", title: "Investing in XPensari?", body: "Request the investor deck and market overview.", link: "Request the deck", href: COMPANY.investors.href + "#request" },
  },
];

export const FOOTER_GROUPS: { label: string; links: { title: string; href: string }[] }[] = [
  {
    label: "Products",
    links: [
      { title: "AI Spend Intelligence", href: PRODUCTS.spend.href },
      { title: "Expense & Corporate Cards", href: PRODUCTS.expense.href },
      { title: "Procurement & Vendors", href: PRODUCTS.procurement.href },
      { title: "Invoice & AP/AR", href: PRODUCTS.invoice.href },
      { title: "Budget & Analytics", href: PRODUCTS.budget.href },
      { title: "Revenue Intelligence", href: PRODUCTS.revenue.href },
      { title: "Payments", href: PRODUCTS.payments.href },
      { title: "Tax & Compliance", href: PRODUCTS.tax.href },
      { title: "Risk, Audit & ESG", href: PRODUCTS.risk.href },
      { title: "AI Intelligence Layer", href: PRODUCTS.ai.href },
      { title: "Integrations & API", href: PRODUCTS.api.href },
    ],
  },
  {
    label: "Solutions",
    links: [SOLUTIONS.cfo, SOLUTIONS.procurement, SOLUTIONS.sales, SOLUTIONS.developers, SOLUTIONS.growing, SOLUTIONS.mid, SOLUTIONS.enterprise],
  },
  {
    label: "Industries",
    links: [SOLUTIONS.retail, SOLUTIONS.manufacturing, SOLUTIONS.hospitality, SOLUTIONS.healthcare, SOLUTIONS.oil, SOLUTIONS.education],
  },
  {
    label: "Resources",
    links: [RESOURCES.insights, RESOURCES.hub, RESOURCES.calendar, RESOURCES.calculator, RESOURCES.docs],
  },
  { label: "Company", links: [COMPANY.about, COMPANY.partners, COMPANY.investors, COMPANY.careers, COMPANY.contact] },
];
