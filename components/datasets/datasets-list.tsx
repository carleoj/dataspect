"use client";

import { useEffect, useState } from "react";
import { getDatasets } from "@/services/datasetService";
import { DatasetsTable } from "./datasets-table";
import type { DatasetSummary } from "@/types/dataset";

export function DatasetsList() {
  const [datasets, setDatasets] = useState<DatasetSummary[] | null>(null);

  useEffect(() => {
    getDatasets().then(setDatasets).catch(() => setDatasets([]));
  }, []);

  if (!datasets) return <div className="h-40 animate-pulse rounded-lg bg-gray-100" />;
  if (datasets.length === 0) return <p className="text-sm text-gray-600">No datasets yet. Upload your first file.</p>;

  return <DatasetsTable datasets={datasets} />;
}