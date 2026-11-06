import type { Severity } from '@/types/analysis';

const TONE: Record<Severity, { card: string; pill: string }> = {
  ok:   { card: 'border-green-300 bg-green-300',   pill: 'bg-white/70 text-green-800' },
  warn: { card: 'border-gold-300 bg-yellow-300', pill: 'bg-white/70 text-yellow-800' },
  bad:  { card: 'border-red-300 bg-rose-300',       pill: 'bg-white/70 text-red-800' },
};

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  badge?: { text: string; severity: Severity };
  loading?: boolean;
}

export function StatCard({ label, value, hint, badge, loading = false }: StatCardProps) {
  const tone = badge ? TONE[badge.severity] : null;

  return (
    <article
      className={`flex flex-col gap-4 shadow-sm rounded-lg p-6 transition-colors ${
        tone ? tone.card : 'border-gray-200 bg-white'
      }`}
    >
      <div className="h-6 self-end">
        {tone && badge && (
          <span className={`rounded-sm px-2 py-1 text-xs font-medium ${tone.pill}`}>{badge.text}</span>
        )}
      </div>
      <div>
        <strong className={`block text-sm font-medium ${tone ? 'text-gray-700' : 'text-gray-600'}`}>
          {label}
        </strong>
        <p>
          {loading ? (
            <span className="inline-block h-8 w-24 animate-pulse rounded bg-gray-100 align-middle" aria-hidden="true" />
          ) : (
            <>
              <span className="text-2xl font-medium text-gray-900">{value}</span>{' '}
              {hint && <span className={`text-xs ${tone ? 'text-gray-700' : 'text-gray-600'}`}>{hint}</span>}
            </>
          )}
        </p>
      </div>
    </article>
  );
}