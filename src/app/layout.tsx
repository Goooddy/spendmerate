import type { Metadata } from "next";
import { Inter, League_Gothic } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const league = League_Gothic({ subsets: ["latin"], variable: "--font-league-gothic", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://xpensari.vercel.app"),
  title: { default: "XPensari — Spend Less. Decide Smarter.", template: "%s · XPensari" },
  description:
    "The AI-native Financial & Revenue Operating System for Nigerian and African enterprises: FinOps, RevOps, Payments and Compliance in one intelligence layer.",
  icons: { icon: "/images/logo-mark.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${league.variable}`}>
      <body className="min-h-screen bg-page">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
