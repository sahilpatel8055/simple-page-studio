import { AppLink } from "@/components/common/AppLink";
import type { FamilyOffer } from "@/lib/courseFamily";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * Compact "cheapest first" fee answer shown directly under the answer-first
 * block on a course pillar. It exists so a visitor arriving on a fee query
 * sees a real number in the first screen instead of a tab they have to open.
 * The full university-wise table stays in the Fees section.
 */
export function TopFeeSnapshot({
  offers,
  courseName,
  feesHref,
  limit = 6,
}: {
  offers: FamilyOffer[];
  courseName: string;
  feesHref: string;
  limit?: number;
}) {
  const rows = offers
    .filter((o) => o.fees.total)
    .sort((a, b) => (a.fees.total as number) - (b.fees.total as number))
    .slice(0, limit);

  if (!rows.length) return null;

  return (
    <section id="fee-snapshot" className="scroll-mt-36">
      <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">
        {courseName} fees: lowest published totals
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Total programme fee as published by each university. Sorted cheapest first.
      </p>

      <div className="mt-3 overflow-hidden rounded-2xl border-2 border-brand/30 bg-card">
        <table className="w-full text-left">
          <caption className="sr-only">{courseName} lowest published total fees</caption>
          <thead>
            <tr className="bg-brand text-brand-foreground">
              <th
                scope="col"
                className="px-3 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wide sm:px-4 sm:text-[0.78rem]"
              >
                University
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-right text-[0.7rem] font-semibold uppercase tracking-wide sm:px-4 sm:text-[0.78rem]"
              >
                Total fee
              </th>
              <th
                scope="col"
                className="hidden px-3 py-2.5 text-right text-[0.7rem] font-semibold uppercase tracking-wide sm:table-cell sm:px-4 sm:text-[0.78rem]"
              >
                EMI from
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((o) => (
              <tr key={o.key} className="even:bg-secondary/40">
                <td className="px-3 py-3 sm:px-4">
                  <AppLink
                    to={o.path}
                    className="text-[0.83rem] font-semibold text-brand hover:underline sm:text-[0.9rem]"
                  >
                    {o.universityShortName}
                  </AppLink>
                </td>
                <td className="px-3 py-3 text-right text-[0.83rem] font-bold text-foreground sm:px-4 sm:text-[0.9rem]">
                  {inr(o.fees.total as number)}
                </td>
                <td className="hidden px-3 py-3 text-right text-[0.83rem] text-muted-foreground sm:table-cell sm:px-4">
                  {o.fees.emi ? `${inr(o.fees.emi)}/mo` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2.5 text-sm">
        <AppLink to={feesHref} className="font-bold text-brand hover:underline">
          See all university fees, semester split and EMI →
        </AppLink>
      </p>
    </section>
  );
}
