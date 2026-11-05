"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDatasetStore } from "../store/useDatasetsStore";
import { useDatasets } from "./useDatasets";

export function useSelectedDatasetId() {
  const param = useSearchParams().get("dataset");
  const stored = useDatasetStore((s) => s.selectedId);
  const setSelectedId = useDatasetStore((s) => s.setSelectedId);
  const { data: list, isPending } = useDatasets();

  useEffect(() => {
    if (param && param !== stored) setSelectedId(param);
  }, [param, stored, setSelectedId]);

  const wanted = param ?? stored;

  if (wanted) {
    if (isPending) return { id: wanted, loading: false };
    if (list?.some((d) => d.id === wanted))
      return { id: wanted, loading: false };
  }
  if (isPending) return { id: null, loading: true };
  return { id: list?.[0]?.id ?? null, loading: false };
}
