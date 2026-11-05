"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDatasets } from "@/services/datasetService";
import type { DatasetSummary } from "@/types/dataset";
import { useDatasets } from "@/hooks/useDatasets";

export function DatasetSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rootRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const { data: datasets = [] } = useDatasets();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // No ?dataset= in the URL means the first dataset in the list
  const selectedId = searchParams.get("dataset") ?? datasets[0]?.id;
  const selected = datasets.find((d) => d.id === selectedId);

  const choose = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("dataset", id);
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Dataset: ${selected?.name ?? "none selected"}`}
        title={selected?.name}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-sm text-gray-900 shadow-xs transition hover:bg-gray-50 sm:h-auto sm:w-50 sm:justify-between sm:gap-3 sm:px-4 sm:py-2.5 sm:text-left lg:w-56"
      >
        <span className="hidden truncate text-xs sm:block">
          {selected?.name ?? "Select dataset"}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 10 5"
          className="size-2.5 shrink-0 text-gray-500"
          fill="currentColor"
        >
          <path d="M0 0l5 5 5-5z" />
        </svg>
      </button>

      {open && (
        <fieldset className="absolute right-0 z-20 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          <legend className="sr-only">Dataset</legend>

          {datasets.map((d) => (
            <label
              key={d.id}
              className="flex cursor-pointer items-start gap-3 rounded-md px-3 py-2 hover:bg-gray-50"
            >
              <input
                type="radio"
                name="dataset"
                value={d.id}
                checked={d.id === selectedId}
                onChange={() => choose(d.id)}
                className="mt-1 size-4 shrink-0 accent-gray-900"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm text-gray-900">
                  {d.name}
                </span>
              </span>
            </label>
          ))}

          <div className="mt-1 border-t border-gray-100 p-1">
            <Link
              href="/dashboard/datasets"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              Manage datasets
            </Link>
          </div>
        </fieldset>
      )}
    </div>
  );
}
