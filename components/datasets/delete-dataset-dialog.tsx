"use client";

import { Modal } from "@/components/ui/modal";
import { useDatasetActions } from "@/hooks/useDatasetActions";
import type { DatasetSummary } from "@/types/dataset";

export function DeleteDatasetDialog({
  dataset,
  onClose,
}: {
  dataset: DatasetSummary | null;
  onClose: () => void;
}) {
  return (
    <Modal open={!!dataset} title="Delete dataset" onClose={onClose}>
      {dataset && <DeleteForm dataset={dataset} onClose={onClose} />}
    </Modal>
  );
}

// separate component so its mutation state (including any error) resets each time it opens
function DeleteForm({ dataset, onClose }: { dataset: DatasetSummary; onClose: () => void }) {
  const { remove } = useDatasetActions();

  return (
    <>
      <p className="text-sm text-gray-600">
        Delete <strong className="break-all font-medium text-gray-900">{dataset.name}</strong>? The file and its
        analysis will be removed. This can’t be undone.
      </p>

      {remove.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">Could not delete this dataset. Please try again.</p>
      )}

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={remove.isPending}
          className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => remove.mutate(dataset.id, { onSuccess: onClose })}
          disabled={remove.isPending}
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
        >
          {remove.isPending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </>
  );
}