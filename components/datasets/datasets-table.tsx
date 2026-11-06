import Link from "next/link";
import type { DatasetSummary } from "@/types/dataset";
import { Badge } from "@/components/ui/badge";

export function DatasetsTable({ datasets }: { datasets: DatasetSummary[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            {["Name", "Rows", "Columns", "Size", "Uploaded", "Health"].map(
              (h) => (
                <th key={h} className="px-3 py-2 font-medium whitespace-nowrap">
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-900">
          {datasets.map((d) => (
            <tr key={d.id}>
              <td className="px-3 py-2 font-medium whitespace-nowrap">
                <Link
                  href={`/dashboard/analysis?dataset=${d.id}`}
                  className="hover:underline"
                >
                  {d.name}
                </Link>
              </td>
              <td className="px-3 py-2 tabular-nums">
                {d.rows.toLocaleString("en-US")}
              </td>
              <td className="px-3 py-2 tabular-nums">{d.columns}</td>
              <td className="px-3 py-2 whitespace-nowrap">{d.sizeLabel}</td>
              <td className="px-3 py-2 whitespace-nowrap">{d.uploadedLabel}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {d.health ? (
                  <Badge severity={d.health === "healthy" ? "ok" : "warn"}>
                    {d.health === "healthy" ? "Healthy" : "Needs attention"}
                  </Badge>
                ) : d.status === "failed" ? (
                  <Badge severity="bad">Failed</Badge>
                ) : (
                  <span className="text-gray-500">
                    {d.status === "processing" ? "Analyzing…" : "Queued"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
