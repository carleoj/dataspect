"use client";

import { useDatasetData } from "@/hooks/useDatasetData";
import { getColumnTypeCounts } from "@/services/analysisService";
import { AsyncCard } from "./async-card";
import { ColumnTypeDonut } from "./column-type-donut";

export function ColumnTypesCard() {
  const state = useDatasetData(getColumnTypeCounts);

  return (
    <AsyncCard title="Column types" state={state} isEmpty={(d) => d.length === 0}>
      {(d) => <ColumnTypeDonut data={d} />}
    </AsyncCard>
  );
}