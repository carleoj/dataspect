import type { CorrelationMatrix } from "@/types/analysis";

export function CorrelationHeatmap({ matrix }: { matrix: CorrelationMatrix }) {
  const n = matrix.columns.length;

  return (
    <div>
      <div
        className="grid max-w-xs gap-1"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {matrix.values.flat().map((v, i) => (
          <div
            key={i}
            className="grid aspect-square place-items-center rounded text-xs text-white"
            style={{
              background: `rgba(79,70,229,${Math.min(1, 0.15 + Math.abs(v) * 0.85)})`,
            }}
          >
            {v.toFixed(2)}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-600">{matrix.columns.join(", ")}</p>
    </div>
  );
}
