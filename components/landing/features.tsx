import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { HeatmapPreview, HistogramPreview, MatrixPreview, SchemaPreview, ScorePreview } from "./previews";

function Tile({
  title,
  text,
  className = "",
  children,
}: {
  title: string;
  text: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Reveal className={className}>
      <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-xs">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{text}</p>
        <div className="mt-6 flex-1">{children}</div>
      </div>
    </Reveal>
  );
}

const PRIVACY = [
  { title: "Private storage", text: "Files are never reachable by a public URL." },
  { title: "Tied to your account", text: "Only you can open your datasets." },
  { title: "Real deletion", text: "Deleting a dataset removes its file too." },
];

export function Features() {
  return (
    <section id="features" className="border-y border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <p className="text-sm font-medium text-neutral-500">Features</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-800 sm:text-4xl lg:text-5xl">
            Everything you need to trust a dataset
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
            Answers to the questions you ask before any modelling starts, with no code to write.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Tile
            className="md:col-span-4"
            title="See exactly where data is missing"
            text="Every empty cell mapped across your rows and ranked by column, so you know what to fix before it breaks a model."
          >
            <MatrixPreview />
          </Tile>
          <Tile
            className="md:col-span-2"
            title="One number for dataset health"
            text="A score from 0 to 100 that combines missing values, duplicates and column-level issues."
          >
            <ScorePreview />
          </Tile>
          <Tile
            className="md:col-span-2"
            title="Schema issues, spelled out"
            text="Inferred types plus plain flags: constant columns, mixed casing, dates stored as text."
          >
            <SchemaPreview />
          </Tile>
          <Tile
            className="md:col-span-2"
            title="Distributions at a glance"
            text="Pick any numeric column to see its shape, with mean, median, spread and skew alongside."
          >
            <HistogramPreview />
          </Tile>
          <Tile
            className="md:col-span-2"
            title="Spot related columns"
            text="A correlation matrix for your numeric columns, so linked or redundant features stand out."
          >
            <HeatmapPreview />
          </Tile>

          <Reveal className="md:col-span-6">
            <div className="flex flex-col gap-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-xs md:flex-row md:items-center md:justify-between">
              <div className="max-w-sm">
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900">Your files stay yours</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                  Uploads are handled privately from the moment they arrive.
                </p>
              </div>
              <ul className="grid gap-5 sm:grid-cols-3 md:gap-10">
                {PRIVACY.map((p) => (
                  <li key={p.title}>
                    <p className="text-sm font-medium text-neutral-900">{p.title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}