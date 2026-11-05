"use client";

import { useQuery } from "@tanstack/react-query";
import { getDatasets } from "@/services/datasetService";

export function useDatasets() {
  return useQuery({ queryKey: ["datasets"], queryFn: getDatasets });
}