import { getColumnProfiles, getHealthSummary } from '@/services/analysisService';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { SchemaTable } from '@/components/analysis/schema-table';

export default async function SchemaQualityPage() {
  const [health, columns] = await Promise.all([getHealthSummary(), getColumnProfiles()]);

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
