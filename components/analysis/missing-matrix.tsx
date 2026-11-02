export function MissingMatrix({ grid, columns }: { grid: boolean[][]; columns: string[] }) {
  return (
    <svg viewBox={`0 0 ${columns.length * 40} ${grid.length * 5}`} width="100%" role="img" aria-label="Missing value matrix">
      {grid.map((row, y) =>
        row.map((missing, x) => (
          <rect key={`${x}-${y}`} x={x * 40 + 3} y={y * 5} width="34" height="4" rx="1"
            className={missing ? 'fill-red-500' : 'fill-gray-200'} />
        )),
      )}
    </svg>
  );
}
