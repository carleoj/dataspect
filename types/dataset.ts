export interface DatasetSummary {
  id: string;
  name: string;
  rows: number;
  columns: number;
  sizeLabel: string;
  uploadedLabel: string;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  health: 'healthy' | 'needs_attention' | null;
}