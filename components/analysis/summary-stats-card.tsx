"use client";

import { useDatasetData } from "@/hooks/useDatasetData";
import { getColumns } from "@/services/analysisService";
import { AsyncCard } from "./async-card";
import { SummaryStatsTable } from "./summary-stats-table";

export function SummaryStatsCard() {
  const state = useDatasetData("columns", getColumns)

  return (
    <AsyncCard
      title="Summary statistics"
      className="lg:col-span-2"
      state={state}
      isEmpty={(cols) => !cols.some((c) => c.stats)}
      emptyText="No numeric columns found, or this dataset isn’t analyzed yet."
    >
      {(cols) => <SummaryStatsTable columns={cols} />}
    </AsyncCard>
  );
}