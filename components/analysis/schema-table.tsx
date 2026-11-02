import type { ColumnProfile } from '@/types/analysis';
import { Badge } from '@/components/ui/badge';

export function SchemaTable({ columns }: { columns: ColumnProfile[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            {['Column', 'Inferred type', 'Unique', 'Missing', 'Issues'].map((h) => (
              <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-900">
          {columns.map((c) => (
            <tr key={c.name}>
              <td className="px-3 py-2 font-medium whitespace-nowrap">{c.name}</td>
              <td className="px-3 py-2 whitespace-nowrap">{c.type}</td>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">{c.uniquePct}%</td>
              <td className="px-3 py-2 whitespace-nowrap tabular-nums">{c.missingPct}%</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {c.issues.length ? (
                  <span className="flex gap-1.5">
                    {c.issues.map((i) => <Badge key={i.label} severity={i.severity}>{i.label}</Badge>)}
                  </span>
                ) : <span className="text-gray-600">None</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
