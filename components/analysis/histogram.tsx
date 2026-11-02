import type { HistogramBin } from '@/types/analysis';

export function Histogram({ bins, label }: { bins: HistogramBin[]; label: string }) {
  const max = Math.max(...bins.map((b) => b.count));
  const w = 40;

  return (
    <svg viewBox={`0 0 ${bins.length * w} 220`} width="100%" role="img" aria-label={`Distribution of ${label}`}>
      {bins.map((b, i) => {
        const h = (b.count / max) * 170;
        return <rect key={b.label} x={i * w + 4} y={190 - h} width={w - 8} height={h} rx="3" className="fill-indigo-600/85" />;
      })}
      <line x1="0" x2={bins.length * w} y1="190" y2="190" className="stroke-gray-200" />
      {bins.map((b, i) =>
        i % 3 === 0 ? (
          <text key={b.label} x={i * w + 4} y="210" fontSize="11" className="fill-gray-600">{b.label}</text>
        ) : null,
      )}
    </svg>
  );
}
