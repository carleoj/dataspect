import { api } from '@/lib/axios';

import type {
  ColumnProfile,
  ColumnTypeCount,
  CorrelationMatrix,
  DatasetOverview,
  HealthSummary,
  HistogramBin,
  Distributions,
  MissingSummary,
  MissingData
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

export async function getDatasetOverview(datasetId: string): Promise<DatasetOverview> {
  const { data } = await api.get(`/datasets/${datasetId}/overview`);
  return data.data;
}

export async function getColumnProfiles(_datasetId?: string): Promise<ColumnProfile[]> {
  return COLUMNS;
}

export async function getColumnTypeCounts(datasetId: string): Promise<ColumnTypeCount[]> {
  const { data } = await api.get(`/datasets/${datasetId}/column-types`);
  return data.data;
}

export async function getDistributions(datasetId: string): Promise<Distributions> {
  const { data } = await api.get(`/datasets/${datasetId}/distributions`);
  return data.data;
}

export async function getColumns(datasetId: string): Promise<ColumnProfile[]> {
  const { data } = await api.get(`/datasets/${datasetId}/columns`);
  return data.data;
}

export async function getCorrelation(datasetId: string): Promise<CorrelationMatrix> {
  const { data } = await api.get(`/datasets/${datasetId}/correlation`);
  return data.data;
}

export async function getHealthSummary(datasetId: string): Promise<HealthSummary> {
  const { data } = await api.get(`/datasets/${datasetId}/health`);
  return data.data;
}

export async function getMissingSummary(_datasetId?: string): Promise<MissingSummary> {
  return {
    missingCells: 52840,
    columnsWithGaps: 4,
    totalColumns: 8,
    rowsWithGaps: 47213,
    rowsWithGapsPct: 47.2,
  };
}

export async function getMissing(datasetId: string): Promise<MissingData> {
  const { data } = await api.get(`/datasets/${datasetId}/missing`);
  return data.data;
}

/** rows x columns grid, true = missing. Only the first `rows` rows are sampled. */
export async function getMissingMatrix(_datasetId?: string, rows = 40): Promise<boolean[][]> {
  return Array.from({ length: rows }, (_, y) =>
    COLUMNS.map((c, x) => seeded(x * 100 + y) < (c.missingPct / 100) * 1.4),
  );
}
