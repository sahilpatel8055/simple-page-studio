import type { ReactNode } from "react";

/**
 * Shared side-by-side comparison table for the /compare/* pages.
 *
 * Same visual language as the course-page comparison engine: brand header row,
 * sticky first column and horizontal scroll on small screens — so the layout is
 * a real table on desktop AND mobile instead of stacked cards.
 */
export function CompareTable({
  head,
  rows,
  caption,
  className,
}: {
  /** Column headings; the first one is the sticky parameter column. */
  head: string[];
  rows: ReactNode[][];
  caption: string;
  className?: string;
}) {
  if (rows.length === 0) return null;
  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[30rem] text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-brand text-brand-foreground">
              {head.map((h, i) => (
                <th
                  key={h + i}
                  scope="col"
                  className={
                    i === 0
                      ? "sticky left-0 z-10 bg-brand px-2.5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-wide sm:px-4 sm:py-3 sm:text-[0.75rem]"
                      : "px-2.5 py-2.5 text-[0.7rem] font-semibold sm:px-4 sm:py-3 sm:text-[0.8rem]"
                  }
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, ri) => (
              <tr key={ri} className="align-top even:bg-secondary/40">
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="sticky left-0 z-10 bg-inherit px-2.5 py-2.5 text-[0.7rem] font-semibold text-foreground sm:px-4 sm:py-3 sm:text-[0.8rem]"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={ci}
                      className="px-2.5 py-2.5 text-[0.74rem] leading-snug text-muted-foreground sm:px-4 sm:py-3 sm:text-[0.84rem]"
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[0.72rem] text-muted-foreground sm:hidden">
        Swipe the table sideways to see all columns.
      </p>
    </div>
  );
}
