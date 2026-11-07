import { Inter } from "next/font/google";
import { LandingHeader } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { LandingFooter } from "@/components/landing/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const FONT_STACK = '"Segoe UI", var(--font-inter), system-ui, -apple-system, sans-serif';

export default function Home() {
  return (
    <div
      className={`${inter.variable} flex min-h-screen flex-col bg-white text-neutral-700 antialiased`}
      style={{ fontFamily: FONT_STACK }}
    >
      <LandingHeader />
      <main className="flex-1">
        <Hero />
      </main>
      <LandingFooter />
    </div>
  );
}