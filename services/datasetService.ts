import { api } from "@/lib/axios";
import type { DatasetSummary } from "@/types/dataset";
import axios from "axios";

export interface UploadInput {
  file: File;
  delimiter: string;
  header: boolean;
}

export async function uploadDataset(
  { file, delimiter, header }: UploadInput,
  onProgress?: (percent: number) => void,
): Promise<DatasetSummary> {
  const body = new FormData();
  body.append("file", file);
  body.append("delimiter", delimiter);
  body.append("header", header ? "1" : "0");

  const { data } = await api.post("/datasets", body, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) =>
      e.total && onProgress?.(Math.round((e.loaded / e.total) * 100)),
  });
  return data.data;
}

export function uploadErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 413)
      return "The file is larger than the server allows.";
    const errors = err.response?.data?.errors as
      | Record<string, string[]>
      | undefined;
    const first = errors && Object.values(errors)[0]?.[0];
    if (first) return first;
  }
  return "Upload failed. Please try again.";
}

export async function getDatasets(): Promise<DatasetSummary[]> {
  const { data } = await api.get("/datasets");
  const datasets = Array.isArray(data?.data) ? data.data : data;

  if (!Array.isArray(datasets)) {
    throw new Error("The datasets response was invalid.");
  }

  return datasets;
}

export async function renameDataset(id: string, name: string): Promise<DatasetSummary> {
  const { data } = await api.patch(`/datasets/${id}`, { name });
  return data.data;
}

export async function deleteDataset(id: string): Promise<void> {
  await api.delete(`/datasets/${id}`);
}

export async function reanalyzeDataset(id: string): Promise<void> {
  await api.post(`/datasets/${id}/reanalyze`);
}