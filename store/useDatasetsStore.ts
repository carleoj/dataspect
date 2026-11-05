import { create } from "zustand";

interface DatasetSelectionState {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const useDatasetStore = create<DatasetSelectionState>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));