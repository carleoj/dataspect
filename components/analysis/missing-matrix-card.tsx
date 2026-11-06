"use client";

import { useDatasetData } from "@/hooks/useDatasetData";
import { getMissing } from "@/services/analysisService";
import { AsyncCard } from "./async-card";
import { MissingMatrix } from "./missing-matrix";

export function MissingMatrixCard() {
  const state = useDatasetData("missing", getMissing);

  return (
    <AsyncCard
      title="Where values are missing"
      className="lg:col-span-2"
      state={state}
      isEmpty={(m) => m.matrix.rows.length === 0}
      emptyText="Not analyzed yet."
      skeletonHeight="h-64"
    >
      {(m) => {
        if (m.cells === 0) {
          return <p className="text-sm text-gray-600">No missing values in this dataset.</p>;
        }

        const { columns, rows } = m.matrix;
        const trimmed = m.totalColumns !== null && m.totalColumns > columns.length;

        return (
          <>
            <p className="mb-4 text-xs text-gray-600">
              {rows.length < 40 ? `All ${rows.length} rows` : "First 40 rows"}
              {trimmed
                ? `, showing the ${columns.length} of ${m.totalColumns} columns with the most missing values`
                : ""}
              . Hover a cell for details.
            </p>

            <MissingMatrix grid={rows} columns={columns} />

            <div className="mt-3 flex gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] bg-red-500" /> Empty cell
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] bg-gray-200" /> Has a value
              </span>
            </div>
          </>
        );
      }}
    </AsyncCard>
  );
}