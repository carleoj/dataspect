"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDatasets } from "@/services/datasetService";

export function useSelectedDatasetId() {
  const param = useSearchParams().get("dataset");
  // undefined = still loading the list, null = user has no datasets
  const [fallback, setFallback] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (param) return;
    getDatasets()
      .then((list) => setFallback(list[0]?.id ?? null))
      .catch(() => setFallback(null));
  }, [param]);

  if (param) return { id: param, loading: false };
  return { id: fallback ?? null, loading: fallback === undefined };
}