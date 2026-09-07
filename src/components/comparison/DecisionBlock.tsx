import { AppLink } from "@/components/common/AppLink";
import type { PairDecision } from "@/lib/comparisonDecision";

/**
 * The single decision block every comparison page opens with: the answer in
 * the first 60 words, a verdict per reader type, and the real cost of
 * ownership. Same shape on every comparison so quality never depends on which
 * data path a page falls into.
 */
export function DecisionBlock({
  decision,
  related,
}: {
  decision: PairDecision;
  related?: { label: string; href: string }[];
}) {
  const { aName, bName } = decision;

  return (
    <section aria-labelledby="decision" className="mb-10 space-y-6">
      {/* Answer first */}
      <div className="rounded-2xl border-2 border-[#7f1813]/25 bg-[#7f1813]/5 p-4 sm:p-5">
        <h2 id="decision" className="text-base font-extrabold text-foreground sm:text-lg">
          {aName} or {bName}? The short answer
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
          {decision.answer}
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-3">
            <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Cheaper
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {decision.cheaper?.name ?? "Not decidable — fees unpublished"}
            </dd>
            {decision.cheaper && (
              <dd className="mt-1 text-sm text-muted-foreground">{decision.cheaper.detail}</dd>
            )}
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Better recognised
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {decision.recognised?.name ?? "Comparable"}
            </dd>
            <dd className="mt-1 text-sm text-muted-foreground">{decision.recognised?.detail}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          Reviewed {decision.reviewed}. Figures are taken from the universities' own published
          material.
        </p>
      </div>

      {/* Verdict by reader type */}
      <div>
        <h3 className="text-base font-bold text-foreground sm:text-lg">
          Which one suits you, by learner type
        </h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <caption className="sr-only">
              {aName} vs {bName} — recommendation by learner type
            </caption>
            <thead>
              <tr className="bg-secondary text-left">
                <th scope="col" className="border-b border-border px-3 py-2 font-bold">
                  You are
                </th>
                <th scope="col" className="border-b border-border px-3 py-2 font-bold">
                  Pick
                </th>
                <th scope="col" className="border-b border-border px-3 py-2 font-bold">
                  Why
                </th>
              </tr>
            </thead>
            <tbody>
              {decision.readers.map((r) => (
                <tr key={r.reader} className="align-top">
                  <th
                    scope="row"
                    className="border-b border-border px-3 py-2 text-left font-semibold text-foreground"
                  >
                    {r.reader}
                  </th>
                  <td className="border-b border-border px-3 py-2 font-semibold text-[#7f1813]">
                    {r.pick}
                  </td>
                  <td className="border-b border-border px-3 py-2 text-muted-foreground">
                    {r.why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost of ownership */}
      <div>
        <h3 className="text-base font-bold text-foreground sm:text-lg">
          What you actually pay{decision.courseLabel ? ` — ${decision.courseLabel}` : ""}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tuition is only part of it. This is the full published outgo, including registration and
          examination fees.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <caption className="sr-only">
              Cost of ownership: {aName} vs {bName}
            </caption>
            <thead>
              <tr className="bg-secondary text-left">
                <th scope="col" className="border-b border-border px-3 py-2 font-bold">
                  Cost head
                </th>
                <th scope="col" className="border-b border-border px-3 py-2 font-bold">
                  {aName}
                </th>
                <th scope="col" className="border-b border-border px-3 py-2 font-bold">
                  {bName}
                </th>
              </tr>
            </thead>
            <tbody>
              {decision.cost.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="border-b border-border px-3 py-2 text-left font-semibold text-foreground"
                  >
                    {row.label}
                  </th>
                  <td className="border-b border-border px-3 py-2">{row.a}</td>
                  <td className="border-b border-border px-3 py-2">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {decision.gaps.length > 0 && (
          <div className="mt-3 rounded-xl border border-border bg-secondary/60 p-3 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">What is still missing</p>
            <ul className="mt-1 ml-5 list-disc space-y-1">
              {decision.gaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="mt-2">
              We publish the gap rather than an estimate. Ask the admission desk for it in writing
              before you pay.
            </p>
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <AppLink
            to={decision.aHref}
            className="rounded-full bg-[#7f1813] px-4 py-2 text-sm font-semibold text-white"
          >
            {aName} full profile
          </AppLink>
          <AppLink
            to={decision.bHref}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
          >
            {bName} full profile
          </AppLink>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            People comparing this also read
          </h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {related.slice(0, 3).map((l) => (
              <li key={l.href}>
                <AppLink
                  to={l.href}
                  className="block rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-brand hover:underline"
                >
                  {l.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
