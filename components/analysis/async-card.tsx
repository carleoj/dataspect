import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface State<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
  noDataset: boolean;
}

interface AsyncCardProps<T> {
  title: string;
  state: State<T>;
  children: (data: T) => ReactNode;
  isEmpty?: (data: T) => boolean;
  emptyText?: string;
  action?: ReactNode;
  className?: string;
  skeletonHeight?: string;
}

function Message({
  children,
  error,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <p
      role={error ? "alert" : undefined}
      className={`text-sm ${error ? "text-red-600" : "text-gray-600"}`}
    >
      {children}
    </p>
  );
}

export function AsyncCard<T>({
  title,
  state,
  children,
  isEmpty,
  action,
  className = "",
  emptyText = "Not analyzed yet.",
  skeletonHeight = "h-56",
}: AsyncCardProps<T>) {
  const { data, loading, error, noDataset } = state;

  let body: ReactNode;
  if (loading)
    body = (
      <div
        className={`${skeletonHeight} animate-pulse rounded-lg bg-gray-100`}
        aria-busy="true"
      />
    );
  else if (noDataset) body = <Message>No datasets yet.</Message>;
  else if (error || !data)
    body = <Message error>Could not load this section.</Message>;
  else if (isEmpty?.(data)) body = <Message>{emptyText}</Message>;
  else body = children(data);

  return (
    <Card className={className}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-gray-900">{title}</h2>
        {action}
      </div>
      {body}
    </Card>
  );
}
