"use client";

import { useQuery } from "@tanstack/react-query";
import { getDatasets } from "@/services/datasetService";

export function useDatasets() {
  return useQuery({
    queryKey: ["datasets"],
    queryFn: getDatasets,
    refetchInterval: (query) =>
      query.state.data?.some((d) => d.status === "pending" || d.status === "processing") ? 3000 : false,
  });
}