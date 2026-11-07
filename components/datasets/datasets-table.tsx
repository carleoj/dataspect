"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DatasetSummary } from "@/types/dataset";
import { Badge } from "@/components/ui/badge";
import { DeleteDatasetDialog } from "./delete-dataset-dialog";
import { RenameDatasetDialog } from "./rename-dataset-dialog";
import { RowMenu } from "./row-menu";

type SortKey = "name" | "rows" | "columns" | "size" | "uploaded" | "health";
type Sort = { key: SortKey; dir: "asc" | "desc" };

const COLUMNS: { key: SortKey; label: string; hide?: string }[] = [
  { key: "name", label: "Name" },
  { key: "rows", label: "Rows" },
  { key: "columns", label: "Columns", hide: "hidden sm:table-cell" },
  { key: "size", label: "Size", hide: "hidden sm:table-cell" },
  { key: "uploaded", label: "Uploaded", hide: "hidden md:table-cell" },
  { key: "health", label: "Health" },
];

const COMPARE: Record<SortKey, (a: DatasetSummary, b: DatasetSummary) => number> = {
  name: (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }),
  rows: (a, b) => a.rows - b.rows,
  columns: (a, b) => a.columns - b.columns,
  size: (a, b) => a.sizeBytes - b.sizeBytes,
  uploaded: (a, b) => Date.parse(a.uploadedAt) - Date.parse(b.uploadedAt),
  health: (a, b) => (a.healthScore ?? -1) - (b.healthScore ?? -1),
};

const PATHS = {
  file: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zm0 0v5h5",
  trash:
    "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  pencil:
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
};

function Icon({ d, className = "size-[18px]" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function SortIcon({ dir }: { dir: "asc" | "desc" | null }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.25 9L12 5.25 15.75 9" stroke="currentColor" className={dir === "asc" ? "text-gray-900" : "text-gray-300"} />
      <path d="M8.25 15L12 18.75 15.75 15" stroke="currentColor" className={dir === "desc" ? "text-gray-900" : "text-gray-300"} />
    </svg>
  );
}

const ICON_BTN =
  "grid size-8 cursor-pointer place-items-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900";

export function DatasetsTable({ datasets }: { datasets: DatasetSummary[] }) {
  const [sort, setSort] = useState<Sort>({ key: "uploaded", dir: "desc" });
  const [toDelete, setToDelete] = useState<DatasetSummary | null>(null);
  const [toRename, setToRename] = useState<DatasetSummary | null>(null);

  const rows = useMemo(() => {
    const sorted = [...datasets].sort(COMPARE[sort.key]);
    return sort.dir === "asc" ? sorted : sorted.reverse();
  }, [datasets, sort]);

  const toggle = (key: SortKey) =>
  setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-900">
              {COLUMNS.map((c) => {
                const dir = sort.key === c.key ? sort.dir : null;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none"}
                    className={`px-3 py-3 font-medium whitespace-nowrap ${c.hide ?? ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(c.key)}
                      className="-mx-1 inline-flex cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 hover:bg-gray-100"
                    >
                      {c.key === "name" && <Icon d={PATHS.file} className="size-4 text-gray-500" />}
                      {c.label}
                      <SortIcon dir={dir} />
                    </button>
                  </th>
                );
              })}
              <th scope="col" className="px-3 py-3 text-right font-medium whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-900">
            {rows.map((d) => (
              <tr key={d.id} className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50">
                <td className="px-3 py-3 font-medium whitespace-nowrap">
                  <Link href={`/dashboard/analysis?dataset=${d.id}`} className="inline-flex items-center gap-2 hover:underline">
                    <Icon d={PATHS.file} className="size-4 shrink-0 text-gray-500" />
                    <span className="max-w-[16rem] truncate">{d.name}</span>
                  </Link>
                </td>
                <td className="px-3 py-3 tabular-nums">{d.rows.toLocaleString("en-US")}</td>
                <td className="hidden px-3 py-3 tabular-nums sm:table-cell">{d.columns}</td>
                <td className="hidden px-3 py-3 whitespace-nowrap sm:table-cell">{d.sizeLabel}</td>
                <td className="hidden px-3 py-3 whitespace-nowrap md:table-cell">{d.uploadedLabel}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  {d.health ? (
                    <Badge severity={d.health === "healthy" ? "ok" : "warn"}>
                      {d.health === "healthy" ? "Healthy" : "Needs attention"}
                    </Badge>
                  ) : d.status === "failed" ? (
                    <Badge severity="bad">Failed</Badge>
                  ) : (
                    <span className="text-gray-500">{d.status === "processing" ? "Analyzing…" : "Queued"}</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      type="button"
                      onClick={() => setToDelete(d)}
                      aria-label={`Delete ${d.name}`}
                      title="Delete"
                      className={`${ICON_BTN} hover:!bg-red-50 hover:!text-red-600`}
                    >
                      <Icon d={PATHS.trash} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setToRename(d)}
                      aria-label={`Rename ${d.name}`}
                      title="Rename"
                      className={ICON_BTN}
                    >
                      <Icon d={PATHS.pencil} />
                    </button>
                    <RowMenu dataset={d} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteDatasetDialog dataset={toDelete} onClose={() => setToDelete(null)} />
      <RenameDatasetDialog dataset={toRename} onClose={() => setToRename(null)} />
    </>
  );
}