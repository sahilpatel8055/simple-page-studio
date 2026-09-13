import { AppLink } from "@/components/common/AppLink";

/**
 * "How this comparison was checked" — the visible evidence module the
 * comparison plan asks for: method, reviewer, review date, honest gaps and a
 * correction route. Placed immediately after the decision centre.
 */
export function EvidenceModule({
  aName,
  bName,
  reviewed,
  gaps = [],
  sources = [],
}: {
  aName: string;
  bName: string;
  reviewed: string;
  gaps?: string[];
  sources?: { label: string; href: string }[];
}) {
  return (
    <section
      aria-labelledby="how-checked"
      className="mb-8 rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5"
    >
      <h2 id="how-checked" className="text-base font-bold text-foreground sm:text-lg">
        How this comparison was checked
      </h2>
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-foreground">Method</dt>
          <dd className="text-muted-foreground">
            Every fee, approval and eligibility value is manually researched from the official{" "}
            {aName} and {bName} websites and regulator listings. Nothing is estimated.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Reviewed by</dt>
          <dd className="text-muted-foreground">
            DegreeKhojo editorial desk — admissions research team. Last reviewed {reviewed}.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">Interpretation</dt>
          <dd className="text-muted-foreground">
            University claims are reported as published; the "what this means for you" lines are
            DegreeKhojo interpretation, not university statements.
          </dd>
        </div>
      </dl>

      {gaps.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-foreground">What is not published</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {gaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        {sources.map((s) => (
          <a
            key={s.href}
            href={s.href}
            rel="nofollow noopener"
            target="_blank"
            className="font-semibold text-brand hover:underline"
          >
            {s.label} ↗
          </a>
        ))}
        <AppLink to="/contact" className="font-semibold text-brand hover:underline">
          Report a correction
        </AppLink>
      </div>
    </section>
  );
}

/** One-sentence answer printed above a criterion table. */
export function SectionAnswer({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 rounded-xl border-l-4 border-brand bg-brand-soft/30 px-3 py-2 text-sm font-semibold leading-relaxed text-foreground">
      {children}
    </p>
  );
}

/** Short interpretation printed below a criterion table. */
export function WhatThisMeans({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
      <span className="font-semibold text-foreground">What this means for you: </span>
      {children}
    </p>
  );
}
