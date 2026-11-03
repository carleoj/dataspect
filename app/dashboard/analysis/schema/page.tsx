import { Suspense } from 'react';
import { getColumnProfiles, getHealthSummary } from '@/services/analysisService';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { SchemaTable } from '@/components/analysis/schema-table';
import { AnalysisSkeleton } from '@/components/analysis/analysis-skeleton';

type Props = { searchParams: Promise<{ dataset?: string }> };

export default function SchemaQualityPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<AnalysisSkeleton />}>
      <SchemaContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SchemaContent({ searchParams }: Props) {
  const { dataset } = await searchParams;

  const [health, columns] = await Promise.all([
    getHealthSummary(dataset),
    getColumnProfiles(dataset),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Health score" value={String(health.score)} hint="out of 100" badge={{ text: 'Needs attention', severity: 'warn' }} />
        <StatCard label="Issues found" value={String(health.issues)} hint={`across ${health.columnsAffected} columns`}
          badge={{ text: `${health.criticalIssues} critical`, severity: 'bad' }} />
        <StatCard label="Checks passed" value={String(health.checksPassed)} hint={`of ${health.checksTotal}`} badge={{ text: 'Passed', severity: 'ok' }} />
      </div>
      <Card title="Schema"><SchemaTable columns={columns} /></Card>
    </div>
  );
}