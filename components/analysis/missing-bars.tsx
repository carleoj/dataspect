import type { ColumnProfile, Severity } from '@/types/analysis';
import { Badge } from '@/components/ui/badge';

const severityOf = (pct: number): Severity => (pct > 20 ? 'bad' : pct > 2 ? 'warn' : 'ok');
const FILL: Record<Severity, string> = { ok: 'bg-green-500', warn: 'bg-yellow-500', bad: 'bg-red-500' };
const LABEL: Record<Severity, string> = { ok: 'Healthy', warn: 'Review', bad: 'Critical' };

export function MissingBars({ columns }: { columns: ColumnProfile[] }) {
  const sorted = [...columns].sort((a, b) => b.missingPct - a.missingPct);

  return (
    <ul className="space-y-3 text-sm">
      {sorted.map((c) => {
        const sev = severityOf(c.missingPct);
        return (
          <li key={c.name} className="grid grid-cols-[8rem_1fr_3.5rem_5rem] items-center gap-3">
            <span className="truncate text-gray-900">{c.name}</span>
            <div className="h-2 rounded bg-gray-100">
              <div className={`h-full rounded ${FILL[sev]}`} style={{ width: `${Math.max(c.missingPct, 0.6)}%` }} />
            </div>
            <span className="text-right tabular-nums text-gray-700">{c.missingPct}%</span>
            <Badge severity={sev}>{LABEL[sev]}</Badge>
          </li>
        );
      })}
    </ul>
  );
}
