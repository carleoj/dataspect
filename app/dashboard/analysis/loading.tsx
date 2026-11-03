export default function Loading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading analysis">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 rounded-lg border border-gray-200 bg-gray-100" />
        ))}
      </div>
      <div className="h-72 rounded-lg border border-gray-200 bg-gray-100" />
    </div>
  );
}