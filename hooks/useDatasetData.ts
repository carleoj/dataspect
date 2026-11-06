"use client";

import { useQuery } from "@tanstack/react-query";
import { useDatasets } from "./useDatasets";
import { useSelectedDatasetId } from "./useSelectedDatasetId";

export function useDatasetData<T>(key: string, fetcher: (datasetId: string) => Promise<T>) {
  const { id, loading: idLoading } = useSelectedDatasetId();
  const { data: list } = useDatasets();
  const status = list?.find((d) => d.id === id)?.status;

  const query = useQuery({
    queryKey: ["dataset", id, status, key],
    queryFn: () => fetcher(id!),
    enabled: !!id && !!list,
  });

  return {
    data: query.data ?? null,
    error: query.isError,
    loading: idLoading || (!!id && query.isPending),
    noDataset: !idLoading && !id,
  };
}