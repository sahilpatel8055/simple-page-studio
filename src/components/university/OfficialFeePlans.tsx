import { BadgeCheck, CalendarDays, CreditCard, Wallet } from "lucide-react";
import { coursePlanFor, feePlansFor } from "@/data/official-fee-plans";
import type { CourseFeePlan, FeePlanOffer } from "@/data/official-fee-plans";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/60 py-1.5 last:border-0">
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
      <span className="text-right text-xs font-bold text-foreground sm:text-sm">{value}</span>
    </div>
  );
}

function OfferCard({ offer }: { offer: FeePlanOffer }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border-2 p-4 sm:p-5 ${
        offer.highlight ? "border-brand bg-brand-soft/50" : "border-border bg-card"
      }`}
    >
      <p className="font-display text-sm font-bold text-foreground sm:text-base">{offer.label}</p>

      <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="text-sm font-semibold text-muted-foreground line-through">
          {inr(offer.regularFee)}
        </span>
        <span className="font-display text-2xl font-extrabold leading-none text-brand sm:text-3xl">
          {inr(offer.payableFee)}
        </span>
        {offer.savingLabel && (
          <span className="rounded-full bg-brand px-2.5 py-1 text-[0.68rem] font-bold text-brand-foreground">
            {offer.savingLabel}
          </span>
        )}
      </div>
      {offer.discountAmount ? (
        <p className="mt-1 text-xs text-muted-foreground">
          Discount / scholarship applied: {inr(offer.discountAmount)}
        </p>
      ) : null}

      <div className="mt-3">
        {offer.oneTime ? <Row label="One-time (full) payment" value={inr(offer.oneTime)} /> : null}
        {offer.perSemester ? <Row label="Semester wise" value={inr(offer.perSemester)} /> : null}
        {offer.perYear ? <Row label="Annually" value={inr(offer.perYear)} /> : null}
        {offer.emiFrom ? <Row label="EMI from" value={`${inr(offer.emiFrom)}*/month`} /> : null}
        {offer.schedule ? <Row label="Payment schedule" value={offer.schedule} /> : null}
        {offer.payableBeforePlacement ? (
          <Row label="Payable before placement" value={offer.payableBeforePlacement} />
        ) : null}
        {offer.payAfterPlacement ? (
          <Row label="Pay after placement" value={offer.payAfterPlacement} />
        ) : null}
      </div>
    </div>
  );
}

function CourseBlock({ plan, showCourse }: { plan: CourseFeePlan; showCourse: boolean }) {
  return (
    <div className="space-y-3">
      {showCourse && (
        <h4 className="flex flex-wrap items-center gap-2 font-display text-base font-bold text-foreground">
          {plan.course}
          {plan.duration && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[0.68rem] font-semibold text-muted-foreground">
              <CalendarDays className="h-3 w-3" aria-hidden="true" />
              {plan.duration}
            </span>
          )}
        </h4>
      )}
      <div className={`grid gap-3 ${plan.offers.length > 1 ? "md:grid-cols-2" : ""}`}>
        {plan.offers.map((o) => (
          <OfferCard key={o.label} offer={o} />
        ))}
      </div>
      {plan.note && (
        <p className="flex items-start gap-2 text-xs leading-snug text-muted-foreground">
          <Wallet className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
          {plan.note}
        </p>
      )}
    </div>
  );
}

/**
 * Published fee plans (early-bird bands, pay-after-placement tracks) for a
 * university, optionally narrowed to a single programme. Every figure is the
 * university's own published amount — nothing is derived here.
 */
export function OfficialFeePlans({
  universitySlug,
  universityShort,
  programmeSlug,
  heading = true,
}: {
  universitySlug: string;
  universityShort: string;
  programmeSlug?: string;
  heading?: boolean;
}) {
  const plans = feePlansFor(universitySlug);
  if (!plans) return null;

  const courses = programmeSlug
    ? [coursePlanFor(universitySlug, programmeSlug)].filter(Boolean as unknown as (v: unknown) => v is CourseFeePlan)
    : plans.courses;
  if (!courses.length) return null;

  return (
    <section className="space-y-4">
      {heading && (
        <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
          {universityShort} fee plans <span className="text-brand">2026-27</span>
        </h3>
      )}
      <p className="text-sm leading-relaxed text-muted-foreground">{plans.intro}</p>

      <div className="space-y-6">
        {courses.map((c) => (
          <CourseBlock key={c.course} plan={c} showCourse={!programmeSlug} />
        ))}
      </div>

      {plans.scholarshipNote && (
        <p className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs leading-snug text-muted-foreground">
          <CreditCard className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
          {plans.scholarshipNote}
        </p>
      )}
      <p className="flex items-center gap-2 text-xs font-semibold text-brand">
        <BadgeCheck className="h-4 w-4" aria-hidden="true" />
        Source: {plans.source} — verified on {plans.verifiedOn}
      </p>
    </section>
  );
}
