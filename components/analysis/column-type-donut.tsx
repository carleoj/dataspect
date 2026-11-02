import type { ColumnTypeCount } from '@/types/analysis';

export function ColumnTypeDonut({ data, size = 190 }: { data: ColumnTypeCount[]; size?: number }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const r = size / 2 - 14;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} className="mx-auto block max-w-full -rotate-90" role="img" aria-label="Column types">
        {data.map((d) => {
          const len = (d.count / total) * circumference;
          const circle = (
            <circle key={d.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color}
              strokeWidth="22" strokeDasharray={`${len} ${circumference - len}`} strokeDashoffset={-offset} />
          );
          offset += len;
          return circle;
        })}
      </svg>
      <ul className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-700">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-1.5">
            <span className="size-3 rounded-sm" style={{ background: d.color }} />
            {d.label} {d.count}
          </li>
        ))}
      </ul>
    </div>
  );
}
