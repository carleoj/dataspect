"use client";

import { useDatasets } from "@/hooks/useDatasets";
import { DatasetsTable } from "./datasets-table";

export function DatasetsList() {
  const { data: datasets, isPending, isError } = useDatasets();

  if (isPending)
    return <div className="h-40 animate-pulse rounded-lg bg-gray-100" />;
  if (isError)
    return (
      <p role="alert" className="text-sm text-red-600">
        Could not load datasets.
      </p>
    );
  if (!datasets?.length)
    return (
      <p className="text-sm text-gray-600">
        No datasets yet. Upload your first file.
      </p>
    );

  return <DatasetsTable datasets={datasets} />;
}
