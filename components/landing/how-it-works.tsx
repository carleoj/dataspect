"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { Reveal } from "./reveal";
import { AnalyzePreview, ReviewPreview, UploadPreview } from "./previews";

const STEPS = [
  {
    title: "Upload a CSV",
    text: "Drop in a file up to 500 MB. The delimiter and encoding are detected for you, and nothing needs to be cleaned first.",
    preview: <UploadPreview />,
  },
  {
    title: "We analyze it",
    text: "Every row is checked for types, empty cells, duplicates and outliers. It runs in the background, so you can keep working.",
    preview: <AnalyzePreview />,
  },
  {
    title: "Read the report",
    text: "Open a health score, a schema with flagged issues, and a map of exactly where values are missing.",
    preview: <ReviewPreview />,
  },
];

export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({ 
    target: listRef, 
    offset: ["start 80%", "end 60%"] 
  });

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
      <Reveal>
        <p className="text-sm font-medium text-neutral-500">How it works</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-800 sm:text-4xl lg:text-5xl">
          From raw CSV to a clear report in three steps
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
          Data profiling is the first look at a dataset: which types it holds, what is missing, what is duplicated.
          DataSpect runs that check for you and shows the result in plain language.
        </p>
      </Reveal>

      <div className="relative mt-14">
        <div aria-hidden="true" className="absolute inset-x-0 top-4 hidden h-px bg-neutral-200 md:block">
          {isMounted && (
            <motion.div 
              className="h-full origin-left bg-neutral-900" 
              style={{ scaleX: reduce ? 1 : scrollYProgress }} 
            />
          )}
        </div>

        <ol ref={listRef} className="grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.1}>
                <span className="relative z-10 grid size-8 place-items-center rounded-full border border-neutral-300 bg-white text-sm font-medium text-neutral-900">
                  {i + 1}
                </span>
                <div className="mt-6">{s.preview}</div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-neutral-900">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}