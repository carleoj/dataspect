export interface DatasetSummary {
  id: string;
  name: string;
  rows: number;
  columns: number;
  sizeLabel: string;
  sizeBytes: number;
  uploadedLabel: string;
  uploadedAt: string;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  health: 'healthy' | 'needs_attention' | null;
  healthScore: number | null;
}