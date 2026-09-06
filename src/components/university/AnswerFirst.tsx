import { AppLink } from "@/components/common/AppLink";

export type AnswerFirstFact = { label: string; value: string; href?: string };

/**
 * Phase B "answer-first" block. Sits directly under the H1 on a programme
 * pillar so the page states the fee, eligibility, duration and verdict before
 * any marketing copy. One page, one intent: this is the snippet-eligible
 * answer for "<university> <course> fees / eligibility / admission".
 */
export function AnswerFirst({
  heading,
  answer,
  facts,
  verifiedOn,
}: {
  heading: string;
  answer: string;
  facts: AnswerFirstFact[];
  verifiedOn?: string;
}) {
  return (
    <section
      id="quick-answer"
      className="scroll-mt-36 rounded-2xl border-2 border-brand/30 bg-cream p-4 sm:p-6"
    >
      <h2 className="font-display text-lg font-bold text-foreground sm:text-xl">{heading}</h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{answer}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-xl border border-border bg-background p-3">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {f.label}
            </dt>
            <dd className="mt-1 text-sm font-bold leading-snug text-foreground">
              {f.href ? (
                <AppLink to={f.href} className="text-brand hover:underline">
                  {f.value}
                </AppLink>
              ) : (
                f.value
              )}
            </dd>
          </div>
        ))}
      </dl>
      {verifiedOn && (
        <p className="mt-3 text-xs text-muted-foreground">
          Fees and eligibility last verified on {verifiedOn} against the university's official
          pages.
        </p>
      )}
    </section>
  );
}
