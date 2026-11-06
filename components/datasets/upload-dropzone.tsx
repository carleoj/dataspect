"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadDataset, uploadErrorMessage } from "@/services/datasetService";

const MAX_MB = 500;
const FIELD =
  "mt-1.5 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-500";

function formatSize(bytes: number) {
  if (bytes < 1048576) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1048576).toFixed(bytes < 10 * 1048576 ? 2 : 1)} MB`;
}

function Icon({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const UPLOAD = "M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2";
const FILE = "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zm0 0v5h5";
const CLOSE = "M6 6l12 12M18 6L6 18";

export function UploadDropzone({ onDone }: { onDone: () => void }) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const busy = progress !== null;

  const pick = (f?: File) => {
    if (!f) return;
    setError(null);
    if (!f.name.toLowerCase().endsWith(".csv")) return setError("Please choose a .csv file.");
    if (f.size > MAX_MB * 1024 * 1024) return setError(`The file is larger than ${MAX_MB} MB.`);
    setFile(f);
  };

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData(e.currentTarget);

    setError(null);
    setProgress(0);
    try {
      await uploadDataset(
        { file, delimiter: String(fd.get("delimiter")), header: fd.get("header") === "1" },
        setProgress,
      );
      await queryClient.invalidateQueries({ queryKey: ["datasets"] });
      onDone();
    } catch (err) {
      setError(uploadErrorMessage(err));
      setProgress(null);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {file ? (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md border border-gray-200 bg-white text-gray-500">
            <Icon d={FILE} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">{formatSize(file.size)} · CSV</p>
          </div>
          <button
            type="button"
            onClick={() => { setFile(null); setError(null); }}
            disabled={busy}
            aria-label="Remove file"
            className="cursor-pointer rounded-md p-1.5 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon d={CLOSE} />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files[0]); }}
          className={`flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gray-900 has-[:focus-visible]:ring-offset-2 ${
            dragging ? "border-gray-900 bg-gray-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          <input
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(e) => pick(e.target.files?.[0])}
          />
          <span className="grid size-10 place-items-center rounded-md border border-gray-200 bg-white text-gray-600">
            <Icon d={UPLOAD} />
          </span>
          <span>
            <span className="block text-sm text-gray-900">
              <span className="font-medium underline underline-offset-2">Choose a file</span> or drag it here
            </span>
            <span className="mt-1 block text-xs text-gray-500">CSV, up to {MAX_MB} MB</span>
          </span>
        </label>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-gray-700">
          Delimiter
          <select name="delimiter" defaultValue="auto" disabled={busy} className={FIELD}>
            <option value="auto">Auto-detect</option>
            <option value="comma">Comma ( , )</option>
            <option value="semicolon">Semicolon ( ; )</option>
            <option value="tab">Tab</option>
            <option value="pipe">Pipe ( | )</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          First row
          <select name="header" defaultValue="1" disabled={busy} className={FIELD}>
            <option value="1">Column names</option>
            <option value="0">Data (no header)</option>
          </select>
        </label>
      </div>

      {busy && (
        <div aria-live="polite">
          <div className="mb-1.5 flex justify-between text-xs text-gray-600">
            <span>{progress < 100 ? "Uploading" : "Processing…"}</span>
            {progress < 100 && <span className="tabular-nums">{progress}%</span>}
          </div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1 overflow-hidden rounded-full bg-gray-100"
          >
            <div
              className="h-full rounded-full bg-gray-900 transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onDone}
          disabled={busy}
          className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!file || busy}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy && (
            <span className="size-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
          )}
          {busy ? "Uploading" : "Upload and analyze"}
        </button>
      </div>
    </form>
  );
}