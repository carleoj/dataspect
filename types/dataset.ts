export interface DatasetSummary {
  id: string;
  name: string;
  rows: number;
  columns: number;
  sizeLabel: string;
  uploadedLabel: string;
  health: "healthy" | "needs_attention";
}
