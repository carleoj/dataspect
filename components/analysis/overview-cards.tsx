"use client";

import { StatCard } from "@/components/ui/stat-card";
import { useDatasetData } from "@/hooks/useDatasetData";
import { getDatasetOverview } from "@/services/analysisService";

const num = (n: number | null) => (n === null ? "—" : n.toLocaleString("en-US"));
const pct = (n: number | null) => (n === null ? "—" : `${n}%`);
const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4";

export function OverviewCards() {
  const { data: o, loading, error, noDataset } = useDatasetData(getDatasetOverview);

  if (loading) {
    return (
      <div className={`${GRID} animate-pulse`} aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-lg border border-gray-200 bg-gray-100" />
        ))}
      </div>
    );
  }
  if (noDataset) {
    return <p className="text-sm text-gray-600">No datasets yet. Upload a file to see its analysis.</p>;
  }
  if (error || !o) {
    return <p role="alert" className="text-sm text-red-600">Could not load this dataset’s overview.</p>;
  }

  const parsed =
    o.status === "ready"
      ? { text: "Parsed", severity: "ok" as const }
      : { text: o.status, severity: "warn" as const };

  const aboveTarget =
    o.missingCellsPct !== null && o.missingTargetPct !== null && o.missingCellsPct > o.missingTargetPct;

  return (
    <div className={GRID}>
      <StatCard label="Rows" value={num(o.rows)} badge={parsed} />
      <StatCard label="Columns" value={num(o.columns)} badge={parsed} />
      <StatCard
        label="Missing cells"
        value={pct(o.missingCellsPct)}
        hint={o.missingTargetPct !== null ? `target ${o.missingTargetPct}%` : undefined}
        badge={
          o.missingCellsPct === null
            ? undefined
            : aboveTarget
              ? { text: "Above target", severity: "bad" }
              : { text: "Within target", severity: "ok" }
        }
      />
      <StatCard
        label="Duplicate rows"
        value={pct(o.duplicateRowsPct)}
        hint={o.duplicateRows !== null ? `${num(o.duplicateRows)} rows` : undefined}
        badge={
          o.duplicateRows === null
            ? undefined
            : o.duplicateRows === 0
              ? { text: "None", severity: "ok" }
              : { text: "Review", severity: "warn" }
        }
      />
    </div>
  );
}