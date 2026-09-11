import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LeadHeadline } from "@/components/common/Headline";
import type { PageQuestion } from "@/lib/pageVerdict";

/**
 * Question-and-answer block for the query shapes the page previously could not
 * match ("is X valid", "X vs Y", "X placement salary", …).
 *
 * One answer is expanded at a time so the block stays scannable, but every
 * answer stays in the served HTML (only visually collapsed), so it still
 * matches the FAQPage schema emitted by the route.
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
  const [open, setOpen] = useState(0);
  if (!questions.length) return null;
  return (
    <section id={id} className="scroll-mt-36">
      <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
        <LeadHeadline text={heading} />
      </h2>
      <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
        {questions.map((q, i) => {
          const isOpen = open === i;
          return (
            <article key={q.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-[0.95rem] font-bold leading-snug text-foreground sm:px-5"
                >
                  <span className="min-w-0">{q.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-brand transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
                    {q.answer}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
