"use client";

import { StatCard } from "@/components/ui/stat-card";
import { useDatasetData } from "@/hooks/useDatasetData";
import { getMissing } from "@/services/analysisService";

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-3";
const LABELS = ["Missing cells", "Columns with missing values", "Rows with missing values"];
const num = (n: number | null) => (n === null ? "—" : n.toLocaleString("en-US"));
const none = { text: "None", severity: "ok" as const };

export function MissingCards() {
  const { data: m, loading, error, noDataset } = useDatasetData("missing", getMissing);

  if (loading) {
    return (
      <div className={GRID} aria-busy="true">
        {LABELS.map((label) => (
          <StatCard key={label} label={label} value="" loading />
        ))}
      </div>
    );
  }
  if (noDataset) {
    return <p className="text-sm text-gray-600">No datasets yet. Upload a file to see its missing values.</p>;
  }
  if (error || !m) {
    return <p role="alert" className="text-sm text-red-600">Could not load this dataset’s missing values.</p>;
  }

  return (
    <div className={GRID}>
      <StatCard
        label="Missing cells"
        value={num(m.cells)}
        hint={m.cells !== null && m.totalCells ? `of ${num(m.totalCells)} cells` : undefined}
        badge={m.cells === 0 ? none : undefined}
      />
      <StatCard
        label="Columns with missing values"
        value={num(m.columnsWithGaps)}
        hint={m.columnsWithGaps !== null && m.totalColumns ? `of ${m.totalColumns}` : undefined}
        badge={m.columnsWithGaps === 0 ? none : undefined}
      />
      <StatCard
        label="Rows with missing values"
        value={m.rowsWithGapsPct === null ? "—" : `${m.rowsWithGapsPct}%`}
        hint={m.rowsWithGaps !== null ? `${num(m.rowsWithGaps)} rows` : undefined}
        badge={m.rowsWithGaps === 0 ? none : undefined}
      />
    </div>
  );
}