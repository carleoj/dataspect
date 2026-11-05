"use client";

import { useDatasetData } from "@/hooks/useDatasetData";
import { getCorrelation } from "@/services/analysisService";
import { AsyncCard } from "./async-card";
import { CorrelationHeatmap } from "./correlation-heatmap";

export function CorrelationCard() {
  const state = useDatasetData("correlation", getCorrelation)

  return (
    <AsyncCard
      title="Correlation"
      state={state}
      isEmpty={(m) => m.values.length === 0}
      emptyText="Needs at least two numeric columns."
    >
      {(m) => <CorrelationHeatmap matrix={m} />}
    </AsyncCard>
  );
}