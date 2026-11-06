interface MissingMatrixProps {
  grid: boolean[][];
  columns: string[];
}

export function MissingMatrix({ grid, columns }: MissingMatrixProps) {
  const n = columns.length;
  const template = { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` };

  return (
    <div className="overflow-x-auto pb-1">
      <div className="w-full" style={{ minWidth: n * 18, maxWidth: n * 72 }}>
        <div
          role="img"
          aria-label={`Missing values in ${grid.length} rows across ${n} columns`}
          className="grid gap-x-1"
          style={template}
        >
          {columns.map((col, x) => (
            <div key={col} className="flex flex-col gap-0.5">
              {grid.map((row, y) => (
                <span
                  key={y}
                  title={`${col} · row ${y + 1} · ${row[x] ? "empty" : "has a value"}`}
                  className={`h-1 rounded-[1px] ${row[x] ? "bg-red-500" : "bg-gray-200"}`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-2 grid gap-x-1" style={template} aria-hidden="true">
          {columns.map((col) => (
            <span
              key={col}
              title={col}
              className="mx-auto h-20 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] leading-none text-gray-600 [writing-mode:vertical-rl]"
            >
              {col}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}