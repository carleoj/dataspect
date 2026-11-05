"use client";

import { StatCard } from "@/components/ui/stat-card";
import { useDatasetData } from "@/hooks/useDatasetData";
import { getHealthSummary } from "@/services/analysisService";
import type { Severity } from "@/types/analysis";

type Badge = { text: string; severity: Severity } | undefined;

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-3";
const LABELS = ["Health score", "Issues found", "Checks passed"];
const num = (n: number | null) => (n === null ? "—" : n.toLocaleString("en-US"));

// same 80-point cut-off the datasets list uses for "Healthy"
function scoreBadge(score: number | null): Badge {
  if (score === null) return undefined;
  if (score >= 80) return { text: "Healthy", severity: "ok" };
  if (score >= 60) return { text: "Needs attention", severity: "warn" };
  return { text: "At risk", severity: "bad" };
}

function issuesBadge(issues: number | null, critical: number | null): Badge {
  if (issues === null || critical === null) return undefined;
  if (critical > 0) return { text: `${critical} critical`, severity: "bad" };
  return issues === 0 ? { text: "No issues", severity: "ok" } : { text: "None critical", severity: "warn" };
}

function checksBadge(passed: number | null, total: number | null): Badge {
  if (passed === null || total === null) return undefined;
  const failed = total - passed;
  return failed === 0 ? { text: "All passed", severity: "ok" } : { text: `${failed} failed`, severity: "warn" };
}

export function HealthCards() {
  const { data: h, loading, error, noDataset } = useDatasetData("health", getHealthSummary);

  if (loading) {
    return (
      <div className={GRID} aria-busy="true">
        {LABELS.map((label) => (
          <StatCard key={label} label={label} value="" loading />
        ))}
      </div>
    );
  }
  if (noDataset) {
    return <p className="text-sm text-gray-600">No datasets yet. Upload a file to see its quality report.</p>;
  }
  if (error || !h) {
    return <p role="alert" className="text-sm text-red-600">Could not load this dataset’s health summary.</p>;
  }

  return (
    <div className={GRID}>
      <StatCard
        label="Health score"
        value={num(h.score)}
        hint={h.score !== null ? "out of 100" : undefined}
        badge={scoreBadge(h.score)}
      />
      <StatCard
        label="Issues found"
        value={num(h.issues)}
        hint={h.columnsAffected !== null ? `across ${h.columnsAffected} columns` : undefined}
        badge={issuesBadge(h.issues, h.criticalIssues)}
      />
      <StatCard
        label="Checks passed"
        value={num(h.checksPassed)}
        hint={h.checksTotal !== null ? `of ${h.checksTotal}` : undefined}
        badge={checksBadge(h.checksPassed, h.checksTotal)}
      />
    </div>
  );
}