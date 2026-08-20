import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Lock,
  Plus,
  Search,
  Star,
  Unlock,
  X,
} from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { universityLogo } from "@/lib/assets";
import { submitLead } from "@/lib/leads";
import { savePartialLead } from "@/lib/leadContext";
import {
  NOT_AVAILABLE,
  compareGroups,
  compareUniverse,
  quickVerdicts,
  winnersFor,
  type CompareGroup,
  type CompareUniversity,
} from "@/lib/universityCompare";
import { cn } from "@/lib/utils";
import { usePopupSurface } from "@/components/common/PopupManager";

const MAX = 4;
const UNLOCK_KEY = "degreekhojo-compare-unlocked";

const freeGroups = compareGroups.filter((g) => !g.locked);
const lockedGroups = compareGroups.filter((g) => g.locked);
const lockedRowCount = lockedGroups.reduce((n, g) => n + g.rows.length, 0);

/**
 * University comparison board.
 *
 * The first three blocks (basics, approvals, fees) are always open so the page
 * is useful and indexable; the deeper decision blocks — portfolio, admission,
 * career, editorial view and verification — sit behind a single lead unlock.
 */
export function UniversityCompareBoard() {
  const { openCounselling } = usePopupSurface();
  const universe = useMemo(() => compareUniverse(), []);
  const [selected, setSelected] = useState<string[]>(() => universe.slice(0, MAX).map((u) => u.slug));
  const [picking, setPicking] = useState(false);
  const [query, setQuery] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {
      /* storage blocked — stay locked */
    }
  }, []);

  const chosen = useMemo(
    () =>
      selected
        .map((s) => universe.find((u) => u.slug === s))
        .filter(Boolean) as CompareUniversity[],
    [selected, universe],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return universe.filter(
      (u) =>
        !selected.includes(u.slug) &&
        (!q || u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q)),
    );
  }, [query, selected, universe]);

  const add = (slug: string) => {
    setSelected((prev) => (prev.includes(slug) || prev.length >= MAX ? prev : [...prev, slug]));
    setQuery("");
    setPicking(false);
  };
  const remove = (slug: string) => setSelected((prev) => prev.filter((s) => s !== slug));

  const canCompare = chosen.length >= 2;
  const verdicts = canCompare ? quickVerdicts(chosen) : [];

  const gridStyle = {
    gridTemplateColumns: `7rem repeat(${Math.max(chosen.length, 1)}, minmax(0, 1fr))`,
    minWidth: chosen.length > 2 ? `${7 + chosen.length * 9}rem` : undefined,
  } as const;

  const onUnlocked = () => {
    setUnlocked(true);
    try {
      window.localStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-8">
      {/* ---------------------------- selection ---------------------------- */}
      <section
        aria-labelledby="selection-heading"
        className="rounded-2xl border border-border bg-card p-4 sm:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="selection-heading" className="text-lg font-bold sm:text-xl">
            Select universities
          </h2>
          <p className="text-xs font-semibold text-muted-foreground">
            {chosen.length}/{MAX} selected
          </p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick 2–{MAX} universities. Every value is read from the published 2026-27 dataset — fields
          the university has not published show “{NOT_AVAILABLE}”.
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {chosen.map((u) => (
            <li
              key={u.slug}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-brand/20 bg-brand-soft/40 pl-2 pr-1"
            >
              <UniLogo u={u} className="h-7 w-7" />
              <span className="max-w-[8rem] truncate text-sm font-bold">{u.shortName}</span>
              <button
                type="button"
                onClick={() => remove(u.slug)}
                aria-label={`Remove ${u.shortName}`}
                className="grid h-11 w-9 place-items-center rounded-lg text-muted-foreground hover:text-brand"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
          {chosen.length < MAX && (
            <li>
              <button
                type="button"
                onClick={() => setPicking((p) => !p)}
                aria-expanded={picking}
                className="flex min-h-11 items-center gap-1.5 rounded-xl border border-dashed border-border px-3 text-sm font-bold text-brand hover:bg-brand-soft/40"
              >
                <Plus className="h-4 w-4" aria-hidden="true" /> Add university
              </button>
            </li>
          )}
        </ul>

        {picking && (
          <div className="mt-4">
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="sr-only">Search universities</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search universities"
                className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus-visible:border-brand"
              />
            </label>
            <ul className="mt-3 max-h-64 space-y-1.5 overflow-y-auto">
              {results.map((u) => (
                <li key={u.slug}>
                  <button
                    type="button"
                    onClick={() => add(u.slug)}
                    className="flex min-h-11 w-full items-center gap-2.5 rounded-xl px-2.5 text-left hover:bg-secondary"
                  >
                    <UniLogo u={u} className="h-7 w-7" />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{u.name}</span>
                    <Plus className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-2.5 py-3 text-sm text-muted-foreground">
                  No universities match that search.
                </li>
              )}
            </ul>
          </div>
        )}

        {!canCompare && (
          <p className="mt-4 text-xs font-semibold text-muted-foreground">
            Add at least 2 universities to see the comparison.
          </p>
        )}
      </section>

      {canCompare && (
        <>
          {/* --------------------------- quick verdict --------------------- */}
          {verdicts.length > 0 && (
            <section aria-labelledby="verdict-heading">
              <h2 id="verdict-heading" className="text-lg font-bold sm:text-xl">
                Quick verdict
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Based only on the published figures below — not on rankings or paid placement.
              </p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {verdicts.map((v) => (
                  <li key={v.label} className="rounded-xl border border-border bg-card p-3.5">
                    <p className="text-[0.68rem] font-bold uppercase tracking-wide text-muted-foreground">
                      {v.label}
                    </p>
                    <p className="mt-1 text-base font-extrabold text-brand">{v.winner}</p>
                    <p className="text-xs text-muted-foreground">{v.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* --------------------------- comparison ------------------------ */}
          <section
            aria-labelledby="comparison-heading"
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <h2 id="comparison-heading" className="sr-only">
              Side-by-side comparison
            </h2>
            <div className="overflow-x-auto lg:overflow-x-visible">
              <div style={gridStyle} className="grid">
                <div className="sticky left-0 z-20 border-b border-border bg-secondary px-2.5 py-3 text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground lg:top-24">
                  Compare
                </div>
                {chosen.map((u) => (
                  <div
                    key={u.slug}
                    className="z-10 border-b border-l border-border bg-card px-2.5 py-3 text-center lg:sticky lg:top-24"
                  >
                    <UniLogo u={u} className="mx-auto h-9 w-9" />
                    <p className="mt-1.5 line-clamp-2 text-[0.78rem] font-extrabold leading-tight sm:text-sm">
                      {u.shortName}
                    </p>
                    {u.rating ? (
                      <p className="mt-0.5 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-muted-foreground">
                        <Star className="h-3 w-3 fill-brand text-brand" aria-hidden="true" />
                        {u.rating}
                      </p>
                    ) : null}
                  </div>
                ))}

                {freeGroups.map((group) => (
                  <GroupBlock key={group.id} group={group} chosen={chosen} />
                ))}
              </div>
            </div>

            {/* ---------------------- locked deep comparison ---------------- */}
            <div className="relative">
              <div
                aria-hidden={!unlocked}
                className={cn(
                  "overflow-x-auto lg:overflow-x-visible",
                  !unlocked && "pointer-events-none max-h-[26rem] select-none overflow-hidden blur-[5px]",
                )}
              >
                <div style={gridStyle} className="grid">
                  {lockedGroups.map((group) => (
                    <GroupBlock key={group.id} group={group} chosen={chosen} />
                  ))}
                </div>
              </div>

              {!unlocked && (
                <div className="absolute inset-x-0 bottom-0 top-0 z-30 flex items-end bg-gradient-to-b from-card/90 via-card to-card">
                  <UnlockPanel chosen={chosen} onUnlocked={onUnlocked} />
                </div>
              )}
            </div>
          </section>

          {chosen.length > 2 && (
            <p className="text-xs text-muted-foreground sm:hidden">
              Swipe the comparison sideways to see the other universities.
            </p>
          )}

          {/* ---------------------------- final action --------------------- */}
          <section className="rounded-2xl border border-border bg-brand-soft/30 p-4 sm:p-6">
            <h2 className="text-lg font-bold sm:text-xl">Ready to choose?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Open a full university profile, or talk to a DegreeKhojo counsellor about the
              shortlist.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {chosen.map((u) => (
                <AppLink
                  key={u.slug}
                  to={u.path}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-bold text-brand-foreground hover:opacity-90"
                >
                  View {u.shortName} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </AppLink>
              ))}
              <button
                type="button"
                onClick={openCounselling}
                className="inline-flex min-h-11 items-center rounded-xl border border-border bg-card px-4 text-sm font-bold text-brand"
              >
                Get guidance
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

/* --------------------------------- unlock -------------------------------- */

function UnlockPanel({
  chosen,
  onUnlocked,
}: {
  chosen: CompareUniversity[];
  onUnlocked: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shortlist = chosen.map((u) => u.shortName).join(" vs ");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (digits.length < 10) return setError("Please enter a valid 10-digit mobile number.");
    setError(null);
    setBusy(true);
    savePartialLead({ name: name.trim(), phone: digits });
    await submitLead({
      name: name.trim(),
      phone: digits,
      form: "Comparison Unlock",
      note: shortlist,
    });
    setBusy(false);
    onUnlocked();
  };

  return (
    <div className="w-full px-3 pb-6 pt-16 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-2xl border-2 border-brand bg-card p-4 shadow-[0_24px_70px_-30px_oklch(0_0_0/0.45)] sm:p-6">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wide text-brand">
          <Lock className="h-3 w-3" aria-hidden="true" /> {lockedRowCount} more comparison points
        </p>
        <h3 className="mt-2.5 font-display text-lg font-extrabold sm:text-xl">
          Unlock the full {shortlist} report
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Programme &amp; specialisation depth, admission windows, documents, exam pattern, career
          outcomes, our editorial verdict and the verification trail behind every figure.
        </p>

        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {lockedGroups.map((g) => (
            <li key={g.id} className="flex items-start gap-1.5 text-[0.8rem] text-muted-foreground">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <span className="font-semibold text-foreground">{g.title}</span>
                {g.blurb ? ` — ${g.blurb}` : ""}
              </span>
            </li>
          ))}
        </ul>

        <form onSubmit={onSubmit} className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_1fr_auto]">
          <label className="sm:col-span-1">
            <span className="sr-only">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="h-11 w-full rounded-xl border-2 border-brand bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
            />
          </label>
          <label>
            <span className="sr-only">Mobile number</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              inputMode="numeric"
              autoComplete="tel"
              className="h-11 w-full rounded-xl border-2 border-brand bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-brand px-5 text-sm font-bold text-brand-foreground hover:opacity-90 disabled:opacity-60"
          >
            <Unlock className="h-4 w-4" aria-hidden="true" />
            {busy ? "Unlocking…" : "Unlock comparison"}
          </button>
        </form>
        {error && <p className="mt-2 text-xs font-semibold text-destructive">{error}</p>}
        <p className="mt-2 flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
          <BadgeCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
          Free. We use your number only to send the comparison summary and answer admission
          questions.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------- rows ---------------------------------- */

function GroupBlock({ group, chosen }: { group: CompareGroup; chosen: CompareUniversity[] }) {
  return (
    <>
      <div
        className="col-span-full border-y border-border bg-secondary/70 px-2.5 py-2 sm:px-4"
        role="rowheader"
      >
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand">
          {group.title}
        </p>
        {group.blurb && (
          <p className="mt-0.5 text-[0.7rem] text-muted-foreground">{group.blurb}</p>
        )}
      </div>
      {group.rows.map((row) => {
        const winners = winnersFor(row, chosen);
        return (
          <div key={row.label} className="contents">
            <div className="sticky left-0 z-10 border-b border-border bg-card px-2.5 py-3 text-[0.7rem] font-bold leading-tight text-foreground sm:px-4 sm:text-[0.8rem]">
              {row.label}
            </div>
            {chosen.map((u) => {
              const value = row.value(u);
              const win = winners.has(u.slug);
              return (
                <div
                  key={u.slug}
                  className={cn(
                    "min-w-0 border-b border-l border-border px-2.5 py-3 text-[0.74rem] leading-snug sm:px-4 sm:text-[0.84rem]",
                    win ? "bg-brand-soft/40 font-bold text-brand" : "text-muted-foreground",
                  )}
                >
                  <span className="line-clamp-4 break-words">{value ?? NOT_AVAILABLE}</span>
                  {win && row.hint && (
                    <span className="mt-1 inline-block rounded-md bg-brand px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-brand-foreground">
                      {row.hint}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function UniLogo({ u, className }: { u: CompareUniversity; className?: string }) {
  const logo = universityLogo(u.slug);
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-card p-0.5",
        className,
      )}
    >
      {logo ? (
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="text-[0.6rem] font-extrabold text-brand">{u.shortName.slice(0, 3)}</span>
      )}
    </span>
  );
}
