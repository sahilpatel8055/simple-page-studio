import type { LegalDoc as LegalDocData } from "@/data/legal";

/** Shared renderer for the four legal documents (disclaimer, terms, editorial, privacy). */
export function LegalDocView({ doc }: { doc: LegalDocData }) {
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Last updated: {doc.updated}
      </p>

      <div className="mt-4 space-y-4">
        {doc.intro.map((p, i) => (
          <p key={i} className="text-[0.95rem] leading-relaxed text-foreground/85">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 space-y-9">
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold sm:text-xl">{s.h}</h2>
            {s.p?.map((p, i) => (
              <p key={i} className="mt-3 text-[0.95rem] leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
            {s.list && s.list.length > 0 && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed text-foreground/85 marker:text-brand">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
            {s.after?.map((p, i) => (
              <p key={i} className="mt-3 text-[0.95rem] leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
