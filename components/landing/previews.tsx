"use client";

import type { ReactNode } from "react";
import { motion, type Variants, useReducedMotion } from "motion/react";
import { usePrefersReducedMotion } from "./use-reduced-motion";
import { Badge } from "@/components/ui/badge";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "-60px" } as const;

const stagger = (each = 0.06, delay = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
const grow: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.5, ease: EASE } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
};

// deterministic pseudo-random (integer math), so server and browser render the same cells
const rand = (n: number) => {
  let h = Math.imul(n + 1, 2654435761);
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
};

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4">
      {children}
    </div>
  );
}

function Stagger({
  children,
  className,
  each,
  delay,
}: {
  children: ReactNode;
  className?: string;
  each?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(each, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
    >
      {children}
    </motion.div>
  );
}

/* ---------- the three steps ---------- */

export function UploadPreview() {
  return (
    <Frame>
      <div className="flex items-center gap-3 rounded-md border border-neutral-200 bg-white p-3 shadow-xs">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-neutral-100 text-neutral-500">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zm0 0v5h5" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-neutral-800">
            customer_orders.csv
          </p>
          <p className="text-xs text-neutral-500">
            24.1 MB · delimiter detected: comma
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              className="h-full origin-left rounded-full bg-neutral-900"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEW}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            />
          </div>
        </div>
      </div>
    </Frame>
  );
}

const CHECKS = [
  "Column types inferred",
  "Missing values counted",
  "Duplicate rows found",
  "Outliers flagged",
];

export function AnalyzePreview() {
  return (
    <Frame>
      <Stagger className="space-y-2.5" each={0.25} delay={0.2}>
        {CHECKS.map((c) => (
          <motion.div
            key={c}
            variants={fadeUp}
            className="flex items-center gap-2.5 text-sm text-neutral-700"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            {c}
          </motion.div>
        ))}
      </Stagger>
    </Frame>
  );
}

export function ReviewPreview() {
  return (
    <Frame>
      <div className="rounded-lg bg-yellow-300 p-4 shadow-sm">
        <div className="flex justify-end">
          <span className="rounded-sm bg-white/70 px-2 py-1 text-xs font-medium text-yellow-800">
            Needs attention
          </span>
        </div>
        <p className="mt-3 text-sm font-medium text-neutral-700">
          Health score
        </p>
        <p>
          <span className="text-3xl font-medium text-neutral-900">74</span>{" "}
          <span className="text-xs text-neutral-700">out of 100</span>
        </p>
      </div>
    </Frame>
  );
}

/* ---------- feature tiles ---------- */

const MISSING = [0, 0.04, 0, 0, 0.12, 0, 0.92, 0, 0.03, 0, 0.3, 0];

export function MatrixPreview() {
  return (
    <div>
      <Stagger className="grid grid-cols-12 gap-1.5" each={0.05}>
        {MISSING.map((p, x) => (
          <motion.div key={x} variants={fade} className="flex flex-col gap-1">
            {Array.from({ length: 14 }, (_, y) => (
              <span
                key={y}
                className={`h-1.5 rounded-[1px] ${rand(x * 100 + y) < p ? "bg-red-500" : "bg-neutral-200"}`}
              />
            ))}
          </motion.div>
        ))}
      </Stagger>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
        <span className="size-2 rounded-[2px] bg-red-500" /> Empty cell
      </p>
    </div>
  );
}

export function ScorePreview() {
  const reduce = usePrefersReducedMotion();

  return (
    <div>
      <p>
        <span className="text-5xl font-medium tracking-tight text-neutral-900">
          74
        </span>{" "}
        <span className="text-sm text-neutral-500">/ 100</span>
      </p>
      <div className="relative mt-5">
        <div className="flex h-2 overflow-hidden rounded-full">
          <span className="w-[60%] bg-red-400" />
          <span className="w-[20%] bg-yellow-400" />
          <span className="w-[20%] bg-green-500" />
        </div>
        <motion.span
          className="absolute -top-1 h-4 w-1 -translate-x-1/2 rounded-full bg-neutral-900 ring-2 ring-white"
          initial={{ left: "0%" }}
          whileInView={{ left: "74%" }}
          viewport={VIEW}
          transition={{
            duration: reduce ? 0 : 1,
            delay: reduce ? 0 : 0.2,
            ease: EASE,
          }}
        />
      </div>
      <ul className="mt-4 space-y-1 text-xs text-neutral-600">
        <li className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-400" /> Below 60: at risk
        </li>
        <li className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-yellow-400" /> 60 to 79: needs
          attention
        </li>
        <li className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-500" /> 80 and up:
          healthy
        </li>
      </ul>
    </div>
  );
}

const SCHEMA = [
  { name: "order_id", type: "integer", label: "ID-like", severity: "ok" },
  {
    name: "country",
    type: "category",
    label: "Mixed casing",
    severity: "warn",
  },
  {
    name: "currency",
    type: "category",
    label: "Constant column",
    severity: "warn",
  },
  { name: "notes", type: "text", label: "Mostly empty", severity: "bad" },
] as const;

export function SchemaPreview() {
  return (
    <Stagger className="space-y-2" each={0.12}>
      {SCHEMA.map((r) => (
        <motion.div
          key={r.name}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-md border border-neutral-100 bg-white px-3 py-2"
        >
          <span className="text-sm text-neutral-800">
            {r.name}{" "}
            <span className="ml-1 text-xs text-neutral-500">{r.type}</span>
          </span>
          <Badge severity={r.severity}>{r.label}</Badge>
        </motion.div>
      ))}
    </Stagger>
  );
}

const BARS = [10, 22, 40, 62, 84, 100, 78, 52, 34, 20, 12, 6];

export function HistogramPreview() {
  return (
    <div>
      <Stagger className="flex h-28 items-end gap-1.5" each={0.04}>
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            variants={grow}
            style={{ height: `${h}%`, originY: 1 }}
            className="flex-1 rounded-t-[3px] bg-[#1a7af2]/80"
          />
        ))}
      </Stagger>
      <div className="mt-2 flex justify-between text-xs text-neutral-500">
        <span>18</span>
        <span>customer_age</span>
        <span>94</span>
      </div>
    </div>
  );
}

const CORR = [
  [1, 0.12, 0.05, 0.31, 0.08],
  [0.12, 1, 0.64, 0.2, 0.1],
  [0.05, 0.64, 1, 0.45, 0.18],
  [0.31, 0.2, 0.45, 1, 0.7],
  [0.08, 0.1, 0.18, 0.7, 1],
];

export function HeatmapPreview() {
  return (
    <div>
      <Stagger
        className="mx-auto grid max-w-[220px] grid-cols-5 gap-1"
        each={0.025}
      >
        {CORR.flat().map((v, i) => (
          <motion.span
            key={i}
            variants={pop}
            style={{ backgroundColor: `rgba(26,122,242,${0.1 + v * 0.9})` }}
            className="aspect-square rounded-[3px]"
          />
        ))}
      </Stagger>
      <p className="mt-3 text-center text-xs text-neutral-500">
        Darker means more closely related
      </p>
    </div>
  );
}
