"use client";

import { useDatasetData } from "@/hooks/useDatasetData";
import { getColumns } from "@/services/analysisService";
import { AsyncCard } from "./async-card";
import { SchemaTable } from "./schema-table";

export function SchemaCard() {
  const state = useDatasetData("columns", getColumns);

  return (
    <AsyncCard
      title="Schema"
      state={state}
      isEmpty={(cols) => cols.length === 0}
      emptyText="Not analyzed yet."
      skeletonHeight="h-64"
    >
      {(cols) => <SchemaTable columns={cols} />}
    </AsyncCard>
  );
}