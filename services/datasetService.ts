import type { DatasetSummary } from "@/types/dataset";

// Placeholder data. Swap for a call through lib/axios.ts when the Laravel endpoint exists.
export async function getDatasets(): Promise<DatasetSummary[]> {
  return [
    {
      id: "1",
      name: "customer_orders.csv",
      rows: 100000,
      columns: 8,
      sizeLabel: "24.1 MB",
      uploadedLabel: "Today",
      health: "needs_attention",
    },
    {
      id: "2",
      name: "web_sessions.csv",
      rows: 2410550,
      columns: 14,
      sizeLabel: "312 MB",
      uploadedLabel: "Yesterday",
      health: "healthy",
    },
    {
      id: "3",
      name: "survey_q3.csv",
      rows: 8904,
      columns: 42,
      sizeLabel: "3.2 MB",
      uploadedLabel: "Oct 24",
      health: "needs_attention",
    },
    {
      id: "4",
      name: "sensor_readings.csv",
      rows: 640200,
      columns: 6,
      sizeLabel: "58 MB",
      uploadedLabel: "Oct 12",
      health: "healthy",
    },
  ];
}
