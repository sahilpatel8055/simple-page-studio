import { AppLink } from "@/components/common/AppLink";
import { ContentSection } from "@/components/templates/DetailLayout";
import type { ComparisonPack, PackFactor, PackSection } from "@/data/comparison-packs";
import { CheckCircle2, Scale } from "lucide-react";

/**
 * Renders a researched comparison pack.
 *
 * Desktop keeps the classic A | factor | B board; mobile switches to stacked
 * factor cards with the university names repeated on every row, so nothing
 * relies on horizontal scrolling.
 */

function FactorBoard({ pack }: { pack: ComparisonPack }) {
  return (
    <>
      {/* Desktop board */}
      <div className="hidden overflow-hidden rounded-xl border border-border md:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            {pack.aLabel} vs {pack.bLabel} — factor-by-factor comparison
          </caption>
          <thead>
            <tr className="bg-secondary text-left">
              <th scope="col" className="w-[30%] px-3 py-3 font-bold text-foreground">
                {pack.aLabel}
              </th>
              <th scope="col" className="w-[22%] px-3 py-3 text-center font-bold text-brand">
                Comparison factor
              </th>
              <th scope="col" className="w-[30%] px-3 py-3 font-bold text-foreground">
                {pack.bLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {pack.factors.map((f: PackFactor) => (
              <tr key={f.label} className="border-t border-border align-top odd:bg-card">
                <td className="px-3 py-3 text-muted-foreground">{f.a}</td>
                <th scope="row" className="px-3 py-3 text-center font-semibold text-foreground">
                  {f.label}
                </th>
                <td className="px-3 py-3 text-muted-foreground">{f.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="grid gap-3 md:hidden">
        {pack.factors.map((f) => (
          <li key={f.label} className="rounded-xl border border-border bg-card p-3.5">
            <p className="text-[0.74rem] font-bold uppercase tracking-wide text-brand">{f.label}</p>
            <div className="mt-2.5 space-y-2.5">
              <div className="rounded-lg bg-secondary/70 p-2.5">
                <p className="text-[0.72rem] font-bold uppercase tracking-wide text-muted-foreground">
                  {pack.aLabel}
                </p>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-foreground">{f.a}</p>
              </div>
              <div className="rounded-lg bg-secondary/70 p-2.5">
                <p className="text-[0.72rem] font-bold uppercase tracking-wide text-muted-foreground">
                  {pack.bLabel}
                </p>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-foreground">{f.b}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function PackTable({ table }: { table: NonNullable<PackSection["table"]> }) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-border sm:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-secondary text-left">
              {table.head.map((h) => (
                <th key={h} scope="col" className="px-3 py-2.5 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-t border-border align-top">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5 text-muted-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="grid gap-3 sm:hidden">
        {table.rows.map((row, i) => (
          <li key={i} className="rounded-xl border border-border bg-card p-3">
            <p className="text-[0.74rem] font-bold uppercase tracking-wide text-brand">{row[0]}</p>
            <dl className="mt-2 space-y-1.5">
              {row.slice(1).map((cell, j) => (
                <div key={j}>
                  <dt className="text-[0.7rem] font-semibold text-muted-foreground">
                    {table.head[j + 1]}
                  </dt>
                  <dd className="text-[0.9rem] text-foreground">{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

export function EditorialComparison({
  pack,
  links,
}: {
  pack: ComparisonPack;
  links?: { label: string; href: string }[] | undefined;
}) {
  return (
    <>
      <ContentSection title={`${pack.aLabel} vs ${pack.bLabel}: side-by-side`}>
        <p>{pack.intro}</p>
        {pack.scopeNote && (
          <p className="my-4 rounded-xl border border-brand/30 bg-brand/5 p-3 text-sm text-foreground">
            <Scale className="mr-1.5 inline h-4 w-4 text-brand" aria-hidden />
            {pack.scopeNote}
          </p>
        )}
        <div className="mt-4">
          <FactorBoard pack={pack} />
        </div>
      </ContentSection>

      {pack.sections.map((s) => (
        <ContentSection key={s.heading} title={s.heading}>
          {s.body && <p>{s.body}</p>}
          {s.bullets?.length ? (
            <ul className="ml-5 list-disc space-y-1.5">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {s.table && (
            <div className="mt-4">
              <PackTable table={s.table} />
            </div>
          )}
          {s.verdict && (
            <p className="mt-4 rounded-xl border-l-4 border-brand bg-secondary/70 p-3 text-sm font-semibold text-foreground">
              {s.verdict}
            </p>
          )}
        </ContentSection>
      ))}

      {(pack.aBestFor.length > 0 || pack.bBestFor.length > 0) && (
        <ContentSection title="Who should choose which">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: pack.aLabel, items: pack.aBestFor },
              { label: pack.bLabel, items: pack.bBestFor },
            ]
              .filter((c) => c.items.length > 0)
              .map((c) => (
                <div key={c.label} className="rounded-2xl border border-border bg-card p-4">
                  <h3 className="font-display text-base font-bold text-foreground">
                    Choose {c.label} if you
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {c.items.map((i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </ContentSection>
      )}

      <ContentSection title="Final verdict">
        <p>{pack.verdict}</p>
        {links?.length ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.href} className="rounded-lg bg-secondary px-3 py-2 text-sm">
                <AppLink to={l.href} className="font-semibold text-brand hover:underline">
                  {l.label}
                </AppLink>
              </li>
            ))}
          </ul>
        ) : null}
      </ContentSection>
    </>
  );
}
