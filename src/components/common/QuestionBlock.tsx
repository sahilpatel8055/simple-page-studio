import type { PageQuestion } from "@/lib/pageVerdict";

/**
 * Visible question-and-answer block for the query shapes the page previously
 * could not match ("is X valid", "X vs Y", "X placement salary", …).
 *
 * Rendered as real headings and paragraphs — not an accordion that hides the
 * answer behind JavaScript — so the text is in the served HTML and matches the
 * FAQPage schema emitted by the route.
 */
export function QuestionBlock({
  id = "common-questions",
  heading,
  questions,
}: {
  id?: string;
  heading: string;
  questions: PageQuestion[];
}) {
  if (!questions.length) return null;
  return (
    <section id={id} className="scroll-mt-36">
      <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">{heading}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {questions.map((q) => (
          <article
            key={q.question}
            className="rounded-2xl border border-border bg-background p-4 sm:p-5"
          >
            <h3 className="text-[0.95rem] font-bold leading-snug text-foreground">{q.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{q.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
