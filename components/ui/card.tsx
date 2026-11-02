export function Card({
  title, children, className = '',
}: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-gray-200 bg-white p-6 ${className}`}>
      {title && <h2 className="mb-4 text-sm font-medium text-gray-900">{title}</h2>}
      {children}
    </section>
  );
}
