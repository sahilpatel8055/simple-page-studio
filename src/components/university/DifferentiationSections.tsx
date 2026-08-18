import { Check, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { DataTable } from "@/components/common/Blocks";
import { formatINR } from "@/data";
import {
  offeringValue,
  universityDecision,
  universityFeeValue,
} from "@/lib/pageDifferentiation";

/**
 * Phase 2 sections. Each one renders only when the dataset supports it, so a
 * university with no published fee totals simply does not get a value analysis.
 */

export function UniversityDecisionGuide({ slug }: { slug: string }) {
  const guide = universityDecision(slug);
  if (!guide) return null;
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-2xl border border-success/30 bg-success/5 p-4">
        <h3 className="text-sm font-bold text-success">Choose it if</h3>
        <ul className="mt-2.5 space-y-2">
          {guide.choose.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="text-sm font-bold">Look elsewhere if</h3>
        <ul className="mt-2.5 space-y-2">
          {guide.avoid.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function universityDecisionHeading(slug: string) {
  return universityDecision(slug)?.heading;
}

export function UniversityFeeValueAnalysis({ slug }: { slug: string }) {
  const value = universityFeeValue(slug);
  if (!value) return null;
  return (
    <div className="space-y-4">
      <DataTable
        caption="Published total fee against the median for the same programme elsewhere"
        head={["Programme", "Total fee", "Median elsewhere", "Difference"]}
        rows={value.rows.map((r) => [
          <AppLink key={r.href} to={r.href} className="font-semibold text-brand">
            {r.programme}
          </AppLink>,
          formatINR(r.total),
          formatINR(r.marketMedian),
          <span
            key={`${r.href}-d`}
            className={r.difference <= 0 ? "inline-flex items-center gap-1 text-success" : "inline-flex items-center gap-1 text-foreground"}
          >
            {r.difference <= 0 ? (
              <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {r.difference === 0 ? "Same" : `${r.difference < 0 ? "−" : "+"}${formatINR(Math.abs(r.difference))}`}
          </span>,
        ])}
      />
      <p className="text-sm text-muted-foreground">{value.note}</p>
    </div>
  );
}

/** University × course page: where this exact programme sits on published price. */
export function OfferingValueCheck({
  universitySlug,
  programmeSlug,
  universityShort,
  programmeName,
}: {
  universitySlug: string;
  programmeSlug: string;
  universityShort: string;
  programmeName: string;
}) {
  const v = offeringValue(universitySlug, programmeSlug);
  if (!v || v.total === null || v.peerMedian === null || v.peers < 2) return null;
  const diff = v.total - v.peerMedian;
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">
        {universityShort} publishes {formatINR(v.total)} as the total {programmeName} fee. Across the{" "}
        {v.peers} universities on this site that publish a total for the same programme, the median is{" "}
        {formatINR(v.peerMedian)} — this option is{" "}
        <span className="font-semibold text-foreground">
          {diff === 0 ? "at the median" : diff < 0 ? `${formatINR(Math.abs(diff))} below it` : `${formatINR(diff)} above it`}
        </span>
        {v.rank ? ` and ranks ${v.rank} of ${v.peers} from lowest published total.` : "."}
      </p>
      {v.cheapest && v.cheapest.href !== `/universities/${universitySlug}/courses/${programmeSlug}` && (
        <p className="text-sm text-muted-foreground">
          Lowest published total for this programme:{" "}
          <AppLink to={v.cheapest.href} className="font-semibold text-brand">
            {v.cheapest.name} — {formatINR(v.cheapest.total)}
          </AppLink>
          . Fee alone should not decide it — check approvals, exam mode and support on both pages.
        </p>
      )}
    </div>
  );
}
