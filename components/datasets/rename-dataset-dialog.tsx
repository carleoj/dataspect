"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useDatasetActions } from "@/hooks/useDatasetActions";
import type { DatasetSummary } from "@/types/dataset";

export function RenameDatasetDialog({
  dataset,
  onClose,
}: {
  dataset: DatasetSummary | null;
  onClose: () => void;
}) {
  return (
    <Modal open={!!dataset} title="Rename dataset" onClose={onClose}>
      {dataset && <RenameForm key={dataset.id} dataset={dataset} onClose={onClose} />}
    </Modal>
  );
}

function RenameForm({ dataset, onClose }: { dataset: DatasetSummary; onClose: () => void }) {
  const { rename } = useDatasetActions();
  const [name, setName] = useState(dataset.name);
  const trimmed = name.trim();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!trimmed || trimmed === dataset.name) return onClose();
        rename.mutate({ id: dataset.id, name: trimmed }, { onSuccess: onClose });
      }}
    >
      <label htmlFor="dataset-name" className="block text-sm font-medium text-gray-700">Name</label>
      <input
        id="dataset-name"
        autoFocus
        value={name}
        maxLength={250}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        className="mt-1.5 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
      />

      {rename.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">Could not rename this dataset. Please try again.</p>
      )}

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!trimmed || rename.isPending}
          className="cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {rename.isPending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}