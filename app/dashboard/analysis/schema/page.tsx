import { Suspense } from 'react';
import { HealthCards } from '@/components/analysis/health-cards';
import { SchemaCard } from '@/components/analysis/schema-card';
import { AnalysisSkeleton } from '@/components/analysis/analysis-skeleton';

export default function SchemaQualityPage() {
  return (
    <Suspense fallback={<AnalysisSkeleton />}>
      <div className="space-y-6">
        <HealthCards />
        <SchemaCard />
      </div>
    </Suspense>
  );
}