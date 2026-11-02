import type { Severity } from '@/types/analysis';

const STYLES: Record<Severity, string> = {
  ok: 'bg-green-100 text-green-700',
  warn: 'bg-yellow-100 text-yellow-700',
  bad: 'bg-red-100 text-red-700',
};

export function Badge({ severity, children }: { severity: Severity; children: React.ReactNode }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs ${STYLES[severity]}`}>{children}</span>
  );
}
