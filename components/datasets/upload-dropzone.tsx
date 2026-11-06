"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadDataset, uploadErrorMessage } from "@/services/datasetService";

const MAX_MB = 500;
const SELECT = "mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs";

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
    <form onSubmit={submit} className="space-y-5">
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); if (!busy) pick(e.dataTransfer.files[0]); }}
        className={`block cursor-pointer rounded-xl border-2 border-dashed px-6 py-12 text-center hover:bg-gray-50 ${
          dragging ? "border-indigo-600 bg-gray-50" : "border-gray-200"
        }`}
      >
        <input
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          disabled={busy}
          onChange={(e) => pick(e.target.files?.[0])}
        />
        <strong className="block break-all text-gray-900">
          {file ? file.name : "Drop a CSV file here, or choose a file"}
        </strong>
        <span className="mt-1 block text-sm text-gray-600">
          {file ? `${(file.size / 1048576).toFixed(2)} MB ready to upload` : `Up to ${MAX_MB} MB.`}
        </span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-gray-700">
          Delimiter
          <select name="delimiter" defaultValue="auto" disabled={busy} className={SELECT}>
            <option value="auto">Auto-detect</option>
            <option value="comma">Comma ( , )</option>
            <option value="semicolon">Semicolon ( ; )</option>
            <option value="tab">Tab</option>
            <option value="pipe">Pipe ( | )</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          First row
          <select name="header" defaultValue="1" disabled={busy} className={SELECT}>
            <option value="1">Column names</option>
            <option value="0">Data (no header)</option>
          </select>
        </label>
      </div>

      {busy && (
        <div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 overflow-hidden rounded bg-gray-100"
          >
            <div className="h-full rounded bg-gray-900 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-xs text-gray-600">{progress < 100 ? `Uploading… ${progress}%` : "Saving…"}</p>
        </div>
      )}

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={!file || busy}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? "Uploading…" : "Upload and analyze"}
      </button>
    </form>
  );
}