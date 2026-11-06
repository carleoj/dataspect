"use client";

import { useState } from "react";
import { useDatasetData } from "@/hooks/useDatasetData";
import { getColumns } from "@/services/analysisService";
import { AsyncCard } from "./async-card";
import { MissingBars } from "./missing-bars";

const LIMIT = 10;

export function MissingByColumnCard() {
  const state = useDatasetData("columns", getColumns);
  const [showAll, setShowAll] = useState(false);

  return (
    <AsyncCard
      title="Missing by column"
      state={state}
      isEmpty={(cols) => cols.length === 0}
      emptyText="Not analyzed yet."
      skeletonHeight="h-64"
    >
      {(cols) => {
        const sorted = [...cols].sort((a, b) => b.missingPct - a.missingPct);

        if (sorted[0].missingPct === 0) {
          return <p className="text-sm text-gray-600">No missing values in this dataset.</p>;
        }

        const visible = showAll ? sorted : sorted.slice(0, LIMIT);

        return (
          <>
            <MissingBars columns={visible} />
            {sorted.length > LIMIT && (
              <button
                type="button"
                onClick={() => setShowAll((s) => !s)}
                className="mt-4 cursor-pointer text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
              >
                {showAll ? "Show fewer" : `Show all ${sorted.length} columns`}
              </button>
            )}
          </>
        );
      }}
    </AsyncCard>
  );
}