import Link from "next/link";
import { ButtonLink } from "./button-link";
import { ArrowRight } from "./icons";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
      <Link
        href="#features"
        className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-sm text-neutral-800 transition hover:bg-neutral-100"
      >
        Introducing DataSpect
        <ArrowRight />
      </Link>

      <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight text-neutral-700 sm:text-6xl lg:text-7xl">
        Profile your datasets in seconds.
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl lg:text-2xl lg:leading-9">
        Upload a CSV and get a clear report on data quality, missing values, schema issues and
        statistics, built for analysts and data scientists.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/signup" size="lg">
          Get Started
          <ArrowRight className="size-5" />
        </ButtonLink>
        <ButtonLink href="#features" variant="outline" size="lg">
          Learn More
        </ButtonLink>
      </div>
    </section>
  );
}