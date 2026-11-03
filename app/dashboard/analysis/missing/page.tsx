import { Suspense } from 'react';
import { getColumnProfiles, getMissingMatrix, getMissingSummary } from '@/services/analysisService';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { MissingBars } from '@/components/analysis/missing-bars';
import { MissingMatrix } from '@/components/analysis/missing-matrix';
import { AnalysisSkeleton } from '@/components/analysis/analysis-skeleton';

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

  const [summary, columns, grid] = await Promise.all([
    getMissingSummary(dataset),
    getColumnProfiles(dataset),
    getMissingMatrix(dataset, 40),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Missing cells" value={summary.missingCells.toLocaleString('en-US')} />
        <StatCard label="Columns with gaps" value={String(summary.columnsWithGaps)} hint={`of ${summary.totalColumns}`} />
        <StatCard label="Rows with any gap" value={`${summary.rowsWithGapsPct}%`} hint={`${summary.rowsWithGaps.toLocaleString('en-US')} rows`} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Missing by column" className="lg:col-span-2"><MissingBars columns={columns} /></Card>
        <Card title="Where the gaps sit">
          <p className="mb-3 -mt-2 text-xs text-gray-600">First 40 rows, red marks a gap</p>
          <MissingMatrix grid={grid} columns={columns.map((c) => c.name)} />
        </Card>
      </div>
    </div>
  );
}