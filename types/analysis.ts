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
  rows: number;
  columns: number;
  missingCellsPct: number;
  missingTargetPct: number;
  duplicateRows: number;
  duplicateRowsPct: number;
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

export interface HistogramBin {
  label: string;
  count: number;
}

export interface CorrelationMatrix {
  columns: string[];
  values: number[][];
}
