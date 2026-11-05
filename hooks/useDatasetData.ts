"use client";

import { useQuery } from "@tanstack/react-query";
import { useSelectedDatasetId } from "./useSelectedDatasetId";

export function useDatasetData<T>(key: string, fetcher: (datasetId: string) => Promise<T>) {
  const { id, loading: idLoading } = useSelectedDatasetId();

  const query = useQuery({
    queryKey: ["dataset", id, key],
    queryFn: () => fetcher(id!),
    enabled: !!id,
  });

  return {
    data: query.data ?? null,
    error: query.isError,
    loading: idLoading || (!!id && query.isPending), 
    noDataset: !idLoading && !id,
  };
}