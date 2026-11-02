// Placeholder data. Every function is async so pages stay unchanged when the bodies
// are swapped for calls through lib/axios.ts to the Laravel API.

import type {
  ColumnProfile,
  ColumnTypeCount,
  CorrelationMatrix,
  DatasetOverview,
  HealthSummary,
  HistogramBin,
  MissingSummary,
} from "@/types/analysis";

const COLUMNS: ColumnProfile[] = [
  {
    name: "order_id",
    type: "integer",
    uniquePct: 100,
    missingPct: 0,
    issues: [{ label: "ID-like", severity: "ok" }],
    stats: {
      mean: "50,214",
      median: "50,214",
      std: "2,887",
      min: "1",
      max: "100,000",
      skew: "0.00",
    },
  },
  {
    name: "customer_age",
    type: "integer",
    uniquePct: 71,
    missingPct: 4.2,
    issues: [{ label: "3 outliers", severity: "bad" }],
    stats: {
      mean: "38.4",
      median: "36",
      std: "12.1",
      min: "18",
      max: "94",
      skew: "0.62",
    },
  },
  {
    name: "order_total",
    type: "float",
    uniquePct: 88,
    missingPct: 0.8,
    issues: [{ label: "Right-skewed", severity: "warn" }],
    stats: {
      mean: "84.20",
      median: "61.50",
      std: "72.9",
      min: "1.99",
      max: "1,240.00",
      skew: "3.41",
    },
  },
  {
    name: "order_date",
    type: "string",
    uniquePct: 12,
    missingPct: 0,
    issues: [{ label: "Looks like a date", severity: "warn" }],
  },
  {
    name: "country",
    type: "category",
    uniquePct: 1.2,
    missingPct: 6.9,
    issues: [{ label: "Mixed casing", severity: "warn" }],
  },
  {
    name: "status",
    type: "category",
    uniquePct: 0.01,
    missingPct: 0,
    issues: [],
  },
  {
    name: "currency",
    type: "category",
    uniquePct: 0,
    missingPct: 0,
    issues: [{ label: "Constant column", severity: "warn" }],
  },
  {
    name: "notes",
    type: "text",
    uniquePct: 34,
    missingPct: 41.3,
    issues: [{ label: "Mostly empty", severity: "bad" }],
  },
];

const seeded = (i: number) => {
  const x = Math.sin(i * 97.3) * 10000;
  return x - Math.floor(x);
};

export async function getDatasetOverview(): Promise<DatasetOverview> {
  return {
    rows: 100000,
    columns: 8,
    missingCellsPct: 6.6,
    missingTargetPct: 2,
    duplicateRows: 412,
    duplicateRowsPct: 0.4,
  };
}

export async function getColumnProfiles(): Promise<ColumnProfile[]> {
  return COLUMNS;
}

export async function getColumnTypeCounts(): Promise<ColumnTypeCount[]> {
  return [
    { label: "Numeric", count: 3, color: "#4f46e5" },
    { label: "Categorical", count: 3, color: "#10b981" },
    { label: "Datetime", count: 1, color: "#f59e0b" },
    { label: "Text", count: 1, color: "#f43f5e" },
  ];
}

export async function getHistogram(
  _column = "customer_age",
): Promise<HistogramBin[]> {
  const counts = [4, 9, 18, 30, 44, 52, 41, 30, 19, 11, 6, 3, 2, 1];
  return counts.map((count, i) => ({ label: String(18 + i * 6), count }));
}

export async function getCorrelation(): Promise<CorrelationMatrix> {
  return {
    columns: ["order_id", "customer_age", "order_total"],
    values: [
      [1, 0.02, 0.01],
      [0.02, 1, 0.31],
      [0.01, 0.31, 1],
    ],
  };
}

export async function getHealthSummary(): Promise<HealthSummary> {
  return {
    score: 74,
    issues: 9,
    criticalIssues: 3,
    columnsAffected: 6,
    checksPassed: 21,
    checksTotal: 30,
  };
}

export async function getMissingSummary(): Promise<MissingSummary> {
  return {
    missingCells: 52840,
    columnsWithGaps: 4,
    totalColumns: 8,
    rowsWithGaps: 47213,
    rowsWithGapsPct: 47.2,
  };
}

/** rows x columns grid, true = missing. Only the first `rows` rows are sampled. */
export async function getMissingMatrix(rows = 40): Promise<boolean[][]> {
  return Array.from({ length: rows }, (_, y) =>
    COLUMNS.map((c, x) => seeded(x * 100 + y) < (c.missingPct / 100) * 1.4),
  );
}
