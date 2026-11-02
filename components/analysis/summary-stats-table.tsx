import type { ColumnProfile } from '@/types/analysis';

const HEADS = ['Column', 'Mean', 'Median', 'Std dev', 'Min', 'Max', 'Skew'];

export function SummaryStatsTable({ columns }: { columns: ColumnProfile[] }) {
  const numeric = columns.filter((c) => c.stats);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            {HEADS.map((h) => <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-900">
          {numeric.map(({ name, stats: s }) => (
            <tr key={name}>
              <td className="px-3 py-2 font-medium whitespace-nowrap">{name}</td>
              {[s!.mean, s!.median, s!.std, s!.min, s!.max, s!.skew].map((v, i) => (
                <td key={i} className="px-3 py-2 whitespace-nowrap tabular-nums">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
