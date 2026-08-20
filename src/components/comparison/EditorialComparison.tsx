import { AppLink } from "@/components/common/AppLink";
import { ContentSection } from "@/components/templates/DetailLayout";
import type { ComparisonPack, PackFactor, PackSection } from "@/data/comparison-packs";
import { CheckCircle2, Scale } from "lucide-react";
import { CompareTable } from "./CompareTable";

/**
 * Renders a researched comparison pack.
 *
 * Every board is a real side-by-side table (factor | A | B) on desktop and
 * mobile alike; the factor column stays pinned while the table scrolls.
 */

function FactorBoard({ pack }: { pack: ComparisonPack }) {
  return (
    <CompareTable
      caption={`${pack.aLabel} vs ${pack.bLabel} — factor-by-factor comparison`}
      head={["Parameter", pack.aLabel, pack.bLabel]}
      rows={pack.factors.map((f: PackFactor) => [f.label, f.a, f.b])}
    />
  );
}

function PackTable({ table }: { table: NonNullable<PackSection["table"]> }) {
  return <CompareTable caption="Comparison table" head={table.head} rows={table.rows} />;
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
