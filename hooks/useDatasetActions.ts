"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDataset, reanalyzeDataset, renameDataset } from "@/services/datasetService";

export function useDatasetActions() {
  const qc = useQueryClient();
  const refresh = () => qc.invalidateQueries({ queryKey: ["datasets"] });

  const remove = useMutation({
    mutationFn: deleteDataset,
    onSuccess: (_data, id) => {
      qc.removeQueries({ predicate: (q) => q.queryKey[0] === "dataset" && q.queryKey[1] === id });
      return refresh();
    },
  });

  const rename = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => renameDataset(id, name),
    onSuccess: refresh,
  });

  const reanalyze = useMutation({ mutationFn: reanalyzeDataset, onSuccess: refresh });

  return { remove, rename, reanalyze };
}