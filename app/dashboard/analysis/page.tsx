import { Suspense } from 'react';
import { OverviewCards } from '@/components/analysis/overview-cards';
import { DistributionCard } from '@/components/analysis/distribution-card';
import { ColumnTypesCard } from '@/components/analysis/column-types-card';
import { SummaryStatsCard } from '@/components/analysis/summary-stats-card';
import { CorrelationCard } from '@/components/analysis/correlation-card';
import { AnalysisSkeleton } from '@/components/analysis/analysis-skeleton';

export default function StatisticalOverviewPage() {
  return (
    <Suspense fallback={<AnalysisSkeleton />}>
      <div className="space-y-6">
        <OverviewCards />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <DistributionCard />
          <ColumnTypesCard />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SummaryStatsCard />
          <CorrelationCard />
        </div>
      </div>
    </Suspense>
  );
}