import { Suspense } from "react";
import {
  getColumnProfiles,
  getMissingMatrix,
} from "@/services/analysisService";
import { Card } from "@/components/ui/card";
import { MissingBars } from "@/components/analysis/missing-bars";
import { MissingMatrix } from "@/components/analysis/missing-matrix";
import { AnalysisSkeleton } from "@/components/analysis/analysis-skeleton";
import { MissingCards } from "@/components/analysis/missing-cards";

type Props = { searchParams: Promise<{ dataset?: string }> };

export default function MissingValuesPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<AnalysisSkeleton />}>
      <MissingContent searchParams={searchParams} />
    </Suspense>
  );
}

async function MissingContent({ searchParams }: Props) {
  const { dataset } = await searchParams;

  const [columns, grid] = await Promise.all([
    getColumnProfiles(dataset),
    getMissingMatrix(dataset, 40),
  ]);

  return (
    <div className="space-y-6">
      <MissingCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Missing by column" className="lg:col-span-2">
          <MissingBars columns={columns} />
        </Card>
        <Card title="Where the gaps sit">
          <p className="mb-3 -mt-2 text-xs text-gray-600">
            First 40 rows, red marks a gap
          </p>
          <MissingMatrix grid={grid} columns={columns.map((c) => c.name)} />
        </Card>
      </div>
    </div>
  );
}
