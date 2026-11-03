import { Suspense } from 'react';
import {
  getColumnProfiles,
  getColumnTypeCounts,
  getCorrelation,
  getDatasetOverview,
  getHistogram,
} from '@/services/analysisService';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { ColumnTypeDonut } from '@/components/analysis/column-type-donut';
import { CorrelationHeatmap } from '@/components/analysis/correlation-heatmap';
import { Histogram } from '@/components/analysis/histogram';
import { SummaryStatsTable } from '@/components/analysis/summary-stats-table';
import { AnalysisSkeleton } from '@/components/analysis/analysis-skeleton';

type Props = { searchParams: Promise<{ dataset?: string }> };

export default function StatisticalOverviewPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<AnalysisSkeleton />}>
      <OverviewContent searchParams={searchParams} />
    </Suspense>
  );
}

async function OverviewContent({ searchParams }: Props) {
  const { dataset } = await searchParams;

  const [overview, typeCounts, bins, columns, correlation] = await Promise.all([
    getDatasetOverview(dataset),
    getColumnTypeCounts(dataset),
    getHistogram('customer_age', dataset),
    getColumnProfiles(dataset),
    getCorrelation(dataset),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Rows" value={overview.rows.toLocaleString('en-US')} badge={{ text: 'Parsed', severity: 'ok' }} />
        <StatCard label="Columns" value={String(overview.columns)} badge={{ text: 'Parsed', severity: 'ok' }} />
        <StatCard label="Missing cells" value={`${overview.missingCellsPct}%`} hint={`target ${overview.missingTargetPct}%`}
          badge={{ text: 'Above target', severity: 'bad' }} />
        <StatCard label="Duplicate rows" value={`${overview.duplicateRowsPct}%`} hint={`${overview.duplicateRows} rows`}
          badge={{ text: 'Review', severity: 'warn' }} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Distribution: customer_age" className="lg:col-span-2">
          <Histogram bins={bins} label="customer_age" />
        </Card>
        <Card title="Column types"><ColumnTypeDonut data={typeCounts} /></Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Summary statistics" className="lg:col-span-2">
          <SummaryStatsTable columns={columns} />
        </Card>
        <Card title="Correlation"><CorrelationHeatmap matrix={correlation} /></Card>
      </div>
    </div>
  );
}