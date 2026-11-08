import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

const LINK = "underline underline-offset-2 hover:text-gray-900";

interface Group {
  title: string;
  items: { q: string; a: ReactNode }[];
}

const GROUPS: Group[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "What files can I upload?",
        a: (
          <p>
            CSV files up to 500 MB. The delimiter is detected automatically, or you can choose comma, semicolon, tab
            or pipe in the upload form. If your file has no header row, set <strong>First row</strong> to{" "}
            <strong>Data (no header)</strong> so the first row isn’t read as column names.
          </p>
        ),
      },
      {
        q: "What happens after I upload?",
        a: (
          <p>
            The file is saved and the analysis starts in the background, so you can keep working. On the{" "}
            <Link href="/dashboard/datasets" className={LINK}>Datasets</Link> page it shows as Queued, then
            Analyzing, and then gets a health badge.
          </p>
        ),
      },
      {
        q: "How do I switch between datasets?",
        a: (
          <p>
            Use the dataset menu at the top right of the Analysis pages. All three tabs show the selected dataset,
            and DataSpect remembers your choice as you move around the app.
          </p>
        ),
      },
    ],
  },
  {
    title: "Reading your report",
    items: [
      {
        q: "How is the health score calculated?",
        a: (
          <>
            <p>
              It starts at 100 and loses points for column issues (critical ones cost more), missing cells and
              duplicate rows. A score of 80 or more is <strong>Healthy</strong>, 60 to 79 <strong>Needs
              attention</strong>, and below 60 <strong>At risk</strong>.
            </p>
            <p className="mt-2">
              In the datasets list, anything under 80 shows as Needs attention. Treat the score as a quick pointer
              to where to look first, not a verdict on whether the data is usable.
            </p>
          </>
        ),
      },
      {
        q: "What does “missing” mean?",
        a: (
          <>
            <p>
              A missing value is an empty cell. <strong>Missing cells</strong> counts all of them, and{" "}
              <strong>Rows with missing values</strong> counts rows with at least one.
            </p>
            <p className="mt-2">
              In the Missing by column chart, a column with more than 20% missing is Critical, more than 2% is
              Review, and anything lower is Healthy.
            </p>
          </>
        ),
      },
      {
        q: "What does the “Where values are missing” grid show?",
        a: (
          <p>
            One column per field, with a red mark for each empty cell, for the first 40 rows (or every row, if your
            file is shorter). Files with more than 20 columns show the 20 with the most missing values. Hover a cell
            to see its column and row.
          </p>
        ),
      },
      {
        q: "What counts as an outlier?",
        a: (
          <p>
            A numeric value far outside the typical range: more than 1.5 × the interquartile range below the first
            quartile or above the third. Outliers aren’t always mistakes, so check them before removing anything.
          </p>
        ),
      },
      {
        q: "What do the badges on the Schema tab mean?",
        a: (
          <ul className="space-y-1.5">
            <li><strong>Constant column:</strong> every row has the same value.</li>
            <li><strong>Mixed casing:</strong> the same word written in different cases, like “Japan” and “japan”.</li>
            <li><strong>Stored as text:</strong> a column of dates saved as plain text.</li>
            <li><strong>Mostly empty:</strong> at least 40% of the values are missing.</li>
            <li><strong>ID-like:</strong> every value is unique, like an order number.</li>
            <li><strong>Outliers and skew:</strong> unusual values, or a distribution leaning heavily to one side.</li>
          </ul>
        ),
      },
      {
        q: "How do I read the correlation grid?",
        a: (
          <p>
            It compares numeric columns on a scale from −1 to 1. Values near 1 mean two columns rise together, near
            −1 means one rises as the other falls, and near 0 means no linear relationship. It needs at least two
            numeric columns and shows up to 12.
          </p>
        ),
      },
      {
        q: "Why do some cards show “—” or “Not analyzed yet”?",
        a: (
          <p>
            The dataset hasn’t finished its analysis (Queued, Analyzing or Failed), or it was analyzed with an older
            version. Open the ⋮ menu on its row in{" "}
            <Link href="/dashboard/datasets" className={LINK}>Datasets</Link> and choose <strong>Re-analyze</strong>.
          </p>
        ),
      },
    ],
  },
  {
    title: "Managing datasets",
    items: [
      {
        q: "How do I rename or delete a dataset?",
        a: (
          <p>
            On the Datasets page, use the pencil to rename and the trash can to delete. Deleting removes the file
            and its analysis permanently and can’t be undone.
          </p>
        ),
      },
      {
        q: "A dataset is stuck on “Queued” or says “Failed”. What now?",
        a: (
          <>
            <p>
              Large files take longer, so give it a few minutes. If it says Failed, open the ⋮ menu on its row and
              choose Re-analyze.
            </p>
            <p className="mt-2">
              If it fails again, open the file in a spreadsheet and check that it’s a valid CSV, with the same number
              of columns on every row. Then upload it again with the right delimiter selected.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Privacy",
    items: [
      {
        q: "Are my files private?",
        a: (
          <p>
            Yes. Uploads are stored privately and are never reachable by a public link, and only your account can
            open your datasets. Deleting a dataset removes its file as well.
          </p>
        ),
      },
    ],
  },
];

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Faq() {
  return (
    <div className="space-y-6">
      {GROUPS.map((g) => (
        <Card key={g.title} title={g.title}>
          <div className="-mt-2 divide-y divide-gray-100">
            {g.items.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-3.5 text-sm font-medium text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Chevron />
                </summary>
                <div className="pb-4 pr-8 text-sm leading-relaxed text-gray-600">{item.a}</div>
              </details>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}