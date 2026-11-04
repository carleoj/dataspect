// Shapes the UI expects. Keep these in sync with the Laravel API resources later.

export type Severity = "ok" | "warn" | "bad";
export type ColumnType =
  | "integer"
  | "float"
  | "category"
  | "string"
  | "text"
  | "datetime"
  | "boolean";

export interface NumericStats {
  mean: string;
  median: string;
  std: string;
  min: string;
  max: string;
  skew: string;
}

export interface ColumnIssue {
  label: string;
  severity: Severity;
}

export interface ColumnProfile {
  name: string;
  type: ColumnType;
  uniquePct: number;
  missingPct: number;
  issues: ColumnIssue[];
  stats?: NumericStats;
}

export interface DatasetOverview {
  status: 'pending' | 'processing' | 'ready' | 'failed';
  rows: number | null;
  columns: number | null;
  missingCellsPct: number | null;
  missingTargetPct: number | null;
  duplicateRows: number | null;
  duplicateRowsPct: number | null;
}

export interface MissingSummary {
  missingCells: number;
  columnsWithGaps: number;
  totalColumns: number;
  rowsWithGaps: number;
  rowsWithGapsPct: number;
}

export interface HealthSummary {
  score: number;
  issues: number;
  criticalIssues: number;
  columnsAffected: number;
  checksPassed: number;
  checksTotal: number;
}

export interface ColumnTypeCount {
  label: string;
  count: number;
  color: string;
}

export interface CorrelationMatrix {
  columns: string[];
  values: number[][];
}

export interface HistogramBin {
  label: string;
  count: number;
}

export interface Distributions {
  columns: string[];
  histograms: Record<string, HistogramBin[]>;
}