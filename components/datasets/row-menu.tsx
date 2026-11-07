"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDatasetActions } from "@/hooks/useDatasetActions";
import type { DatasetSummary } from "@/types/dataset";

const ITEM =
  "flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

export function RowMenu({ dataset }: { dataset: DatasetSummary }) {
  const { reanalyze } = useDatasetActions();
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const busy = dataset.status === "pending" || dataset.status === "processing";

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [pos]);

  const toggle = () => {
    if (pos) return setPos(null);
    const r = btnRef.current!.getBoundingClientRect();
    setPos({ top: r.bottom + 4, right: window.innerWidth - r.right });
  };

  return (
    <div ref={rootRef} className="inline-block">
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={!!pos}
        aria-label={`More actions for ${dataset.name}`}
        className="grid size-8 cursor-pointer place-items-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
          <circle cx="12" cy="5.5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="18.5" r="1.5" />
        </svg>
      </button>

      {pos && (
        <div
          role="menu"
          style={{ top: pos.top, right: pos.right }}
          className="fixed z-30 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
        >
          <Link role="menuitem" href={`/dashboard/analysis?dataset=${dataset.id}`} onClick={() => setPos(null)} className={ITEM}>
            View analysis
          </Link>
          <button
            role="menuitem"
            type="button"
            disabled={busy || reanalyze.isPending}
            onClick={() => {
              reanalyze.mutate(dataset.id);
              setPos(null);
            }}
            className={ITEM}
          >
            Re-analyze
          </button>
        </div>
      )}
    </div>
  );
}