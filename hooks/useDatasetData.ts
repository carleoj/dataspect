"use client";

import { useEffect, useState } from "react";
import { useSelectedDatasetId } from "./useSelectedDatasetId";

type Result<T> = { forId: string; data?: T; error?: boolean };

export function useDatasetData<T>(fetcher: (datasetId: string) => Promise<T>) {
  const { id, loading: idLoading } = useSelectedDatasetId();
  const [result, setResult] = useState<Result<T> | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    fetcher(id)
      .then((data) => !cancelled && setResult({ forId: id, data }))
      .catch(() => !cancelled && setResult({ forId: id, error: true }));
    return () => {
      cancelled = true;
    };
  }, [id, fetcher]);

  // Ignore a result that belongs to a previously selected dataset
  const current = result && result.forId === id ? result : null;

  return {
    data: current?.data ?? null,
    error: !!current?.error,
    loading: idLoading || (!!id && !current),
    noDataset: !idLoading && !id,
  };
}