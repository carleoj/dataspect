'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export function UploadDropzone() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  const pick = (f?: File) => f && setFile(f);

  const analyze = () => {
    if (!file) return;
    setBusy(true);
    // Upload and profiling are wired up later; for now this just opens the analysis view.
    router.push('/dashboard/analysis');
  };

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files[0]); }}
        className={`block cursor-pointer rounded-xl border-2 border-dashed px-6 py-14 text-center hover:bg-gray-50 ${
          dragging ? 'border-indigo-600 bg-gray-50' : 'border-gray-200'
        }`}
      >
        <input ref={inputRef} type="file" accept=".csv,text/csv" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
        <strong className="block text-gray-900">{file ? file.name : 'Drop a CSV file here, or choose a file'}</strong>
        <span className="mt-1 block text-sm text-gray-600">
          {file ? `${(file.size / 1048576).toFixed(2)} MB ready to analyze` : 'Up to 500 MB. Delimiter and encoding are detected automatically.'}
        </span>
      </label>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-gray-900">
          Delimiter
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-2">
            <option>Auto-detect</option><option>Comma</option><option>Semicolon</option><option>Tab</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm text-gray-900">
          First row
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-2">
            <option>Column names</option><option>Data</option>
          </select>
        </label>
      </div>

      <button type="button" onClick={analyze} disabled={!file || busy}
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40">
        {busy ? 'Analyzing…' : 'Analyze dataset'}
      </button>
    </div>
  );
}
