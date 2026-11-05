"use client";

import { useState } from "react";
import { useDatasetData } from "@/hooks/useDatasetData";
import { getDistributions } from "@/services/analysisService";
import { AsyncCard } from "./async-card";
import { Histogram } from "./histogram";

export function DistributionCard() {
  const state = useDatasetData("distributions", getDistributions)
  const [picked, setPicked] = useState<string | null>(null);

  const columns = state.data?.columns ?? [];
  const column = picked && columns.includes(picked) ? picked : columns[0];

  return (
    <AsyncCard
      title="Distribution"
      className="lg:col-span-2 shadow-sm"
      state={state}
      isEmpty={(d) => d.columns.length === 0}
      emptyText="No numeric columns found, or this dataset isn’t analyzed yet."
      action={
        columns.length > 0 ? (
          <select
            aria-label="Column"
            value={column}
            onChange={(e) => setPicked(e.target.value)}
            className="rounded-md border-gray-200 py-1 text-xs text-gray-900 shadow-xs"
          >
            {columns.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ) : null
      }
    >
      {(d) => <Histogram bins={d.histograms[column]} label={column} />}
    </AsyncCard>
  );
}