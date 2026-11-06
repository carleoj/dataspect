import type { ColumnProfile, Severity } from '@/types/analysis';

const severityOf = (pct: number): Severity => (pct > 20 ? 'bad' : pct > 2 ? 'warn' : 'ok');
const FILL: Record<Severity, string> = { ok: 'bg-green-500', warn: 'bg-yellow-500', bad: 'bg-red-500' };
const LABEL: Record<Severity, string> = { ok: 'Healthy', warn: 'Review', bad: 'Critical' };

export function MissingBars({ columns }: { columns: ColumnProfile[] }) {
  return (
    <ul className="space-y-3 text-sm">
      {columns.map((c) => {
        const sev = severityOf(c.missingPct);
        return (
          <li key={c.name} className="grid grid-cols-[minmax(0,6.5rem)_1fr_3rem] items-center gap-3">
            <span className="truncate text-gray-900" title={c.name}>{c.name}</span>
            <div className="h-2 rounded bg-gray-100">
              <div
                className={`h-full rounded ${FILL[sev]}`}
                style={{ width: `${Math.max(c.missingPct, 0.6)}%` }}
              />
            </div>
            <span className="text-right tabular-nums text-gray-700">
              {c.missingPct}%<span className="sr-only"> missing, {LABEL[sev]}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}