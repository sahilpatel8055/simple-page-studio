import { Check, TrendingUp } from "lucide-react";
import { courseOutlook } from "@/data/course-outlook";

const sectionId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Two forward-looking blocks shown at the end of the overview on course pillar
 * pages and university × course pages: where the degree is heading over the
 * next decade, and what it concretely unlocks.
 */
export function FutureOutlook({
  courseName,
  shortName,
}: {
  /** Display name, e.g. "Online MCA". */
  courseName: string;
  /** Family short name used to pick the editorial, e.g. "MCA". */
  shortName: string;
}) {
  const outlook = courseOutlook(shortName);
  const futureTitle = `Future of ${courseName} in India in the Next 10 Years`;
  const offersTitle = `An ${courseName} degree can offer you the following`;

  return (
    <>
      <section
        id={sectionId(futureTitle)}
        className="scroll-mt-36 rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-soft/70 via-card to-card p-5 sm:p-7"
      >
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{futureTitle}</h2>
        <div className="mt-4 space-y-3.5">
          {outlook.future.map((p) => (
            <p key={p} className="text-[0.95rem] leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {outlook.trends.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-[0.88rem] font-semibold leading-snug"
            >
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id={sectionId(offersTitle)} className="scroll-mt-36">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {offersTitle}:
        </h2>
        <ul className="mt-5 space-y-2.5">
          {outlook.offers.map((o) => (
            <li
              key={o}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-[0.92rem] leading-relaxed"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
