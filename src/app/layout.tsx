import type { Metadata } from "next";
import { Inter, League_Gothic } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const league = League_Gothic({ subsets: ["latin"], variable: "--font-league-gothic", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://spendmerate.vercel.app"),
  title: { default: "SpendMerate — Spend Less. Decide Smarter.", template: "%s · SpendMerate" },
  description:
    "The AI-native Financial & Revenue Operating System for Nigerian and African enterprises: FinOps, RevOps, Payments and Compliance in one intelligence layer.",
  icons: { icon: "/images/logo-mark.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${league.variable}`}>
      <body className="min-h-screen bg-page">
        {children}
      </body>
    </html>
  );
}
