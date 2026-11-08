import { Inter } from "next/font/google";
import Link from "next/link";
import { LandingHeader } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { LandingFooter } from "@/components/landing/footer";
import { MotionProvider } from "@/components/landing/motion-provider";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { ButtonLink } from "@/components/landing/button-link";
import { ArrowRight } from "@/components/landing/icons";
import { Reveal } from "@/components/landing/reveal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const FONT_STACK =
  '"Segoe UI", var(--font-inter), system-ui, -apple-system, sans-serif';

export default function Home() {
  return (
    <div
      className={`${inter.variable} flex min-h-screen flex-col bg-white text-neutral-700 antialiased`}
      style={{ fontFamily: FONT_STACK }}
    >
      <LandingHeader />
      <main className="flex-1">
        <MotionProvider>
          <Hero />
          <HowItWorks />
          <Features />
          <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <Reveal>
              <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-semibold tracking-tight text-neutral-800 sm:text-4xl lg:text-5xl">
                    <span className="block">Know your data</span>
                    <span className="block">before you use it</span>
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-neutral-600">
                    Upload a CSV and get a full quality report: a health score,
                    schema issues and exactly where values are missing.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <ButtonLink href="/signup" size="lg">
                    Get Started
                    <ArrowRight className="size-5" />
                  </ButtonLink>
                  <Link
                    href="/login"
                    className="text-[15px] text-neutral-700 transition hover:text-neutral-950"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </MotionProvider>
      </main>
      <LandingFooter />
    </div>
  );
}
