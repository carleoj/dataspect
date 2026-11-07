import { Suspense } from 'react';
import { MissingCards } from '@/components/analysis/missing-cards';
import { MissingMatrixCard } from '@/components/analysis/missing-matrix-card';
import { MissingByColumnCard } from '@/components/analysis/missing-by-column-card';
import { AnalysisSkeleton } from '@/components/analysis/analysis-skeleton';

export const instant = false;

export default function MissingValuesPage() {
  return (
    <Suspense fallback={<AnalysisSkeleton />}>
      <div className="space-y-6">
        <MissingCards />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <MissingMatrixCard />
          <MissingByColumnCard />
        </div>
      </div>
    </Suspense>
  );
}