import { useState } from "react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { getCourseFamily, type CourseFamily, type FamilyOffer } from "@/lib/courseFamily";

/** Compact rupee display used inside blog cards: ₹1.75L / ₹85k. */
function money(v: number | null | undefined) {
  if (typeof v !== "number" || v <= 0) return "Shared by the university";
  if (v >= 100000) return `₹${Number((v / 100000).toFixed(2))}L`;
  return `₹${Number((v / 1000).toFixed(1))}k`;
}

function OfferCard({ offer, family }: { offer: FamilyOffer; family: CourseFamily }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-[0_10px_30px_-26px_oklch(0_0_0/0.6)]">
      <div className="flex items-start gap-3">
        {offer.logo && (
          <img src={offer.logo} alt="" loading="lazy" className="h-10 w-10 shrink-0 rounded-lg object-contain" />
        )}
        <div className="min-w-0">
          <AppLink
            to={`/universities/${offer.universitySlug}`}
            className="line-clamp-2 font-display text-[0.92rem] font-bold leading-snug text-foreground hover:text-brand"
          >
            {offer.universityName}
          </AppLink>
          {offer.location && <p className="mt-0.5 text-[0.72rem] text-muted-foreground">{offer.location}</p>}
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-[0.75rem]">
        <div className="rounded-lg bg-secondary/60 p-2">
          <dt className="text-muted-foreground">Total fee</dt>
          <dd className="font-bold text-foreground">{money(offer.fees.total)}</dd>
        </div>
        <div className="rounded-lg bg-secondary/60 p-2">
          <dt className="text-muted-foreground">Duration</dt>
          <dd className="font-bold text-foreground">{offer.duration ?? "—"}</dd>
        </div>
      </dl>
      {offer.ugcStatus && (
        <p className="mt-2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-brand">
          <BadgeCheck className="h-3.5 w-3.5" /> UGC recognised
        </p>
      )}
      <AppLink
        to={`/universities/${offer.universitySlug}/courses/${offer.programmeSlug}`}
        className="mt-3 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-brand/40 px-3 text-[0.8rem] font-bold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
      >
        View {family.shortName} course <ArrowRight className="h-3.5 w-3.5" />
      </AppLink>
    </div>
  );
}

/**
 * "Universities offering this course" strip used inside course blogs — same
 * cards as the pillar page, but only four are shown until the reader expands.
 */
export function BlogUniversities({ familySlug }: { familySlug: string }) {
  const family = getCourseFamily(familySlug);
  const [open, setOpen] = useState(false);
  if (!family || !family.offers.length) return null;

  const seen = new Set<string>();
  const offers = family.offers.filter((o) => {
    if (seen.has(o.universitySlug)) return false;
    seen.add(o.universitySlug);
    return true;
  });
  const shown = open ? offers : offers.slice(0, 4);

  return (
    <section id="universities" className="scroll-mt-36 content-block">
      <h2 className="border-b border-border pb-3 text-2xl font-bold">Universities</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {offers.length} universities researched on Degreekhojo offer an {family.name}. Fees below are the
        researched total programme fee — open a card for the full verified record.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {shown.map((o) => (
          <OfferCard key={o.key} offer={o} family={family} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {offers.length > 4 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-10 items-center rounded-full border border-brand/40 px-5 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
          >
            {open ? "Show less" : `See more (${offers.length - 4})`}
          </button>
        )}
        <AppLink
          to={`/courses/${family.slug}`}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#7f1813] px-5 text-sm font-bold text-white"
        >
          Full {family.name} guide <ArrowRight className="h-4 w-4" />
        </AppLink>
      </div>
    </section>
  );
}

/**
 * Contextual links from an article to the exact entity pages it discusses.
 * Renders only when the article maps to a university (and, where detected, to
 * that university's programme page) — never as a generic link block.
 */
export function BlogEntityLinks({
  universitySlug,
  familySlug,
}: {
  universitySlug?: string | undefined;
  familySlug?: string | undefined;
}) {
  const family = familySlug ? courseFamilyList().find((f) => f.slug === familySlug) : undefined;
  const uni = universitySlug ? getUniversity(universitySlug) : undefined;
  const offer = family && universitySlug ? family.offers.find((o) => o.universitySlug === universitySlug) : undefined;
  const links: { label: string; href: string }[] = [];
  if (uni) links.push({ label: `${uni.shortName} — fees, approvals & admission`, href: `/universities/${uni.slug}` });
  if (offer) links.push({ label: `${offer.universityShortName} ${offer.programmeName} — fee structure & eligibility`, href: offer.path });
  if (family) links.push({ label: `${family.name} — universities, fees & specialisations`, href: family.path });
  if (links.length === 0) return null;
  return (
    <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-4">
      <h2 className="text-sm font-bold">Check the data pages referenced in this article</h2>
      <ul className="mt-2 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <AppLink to={l.href} className="text-sm font-semibold text-brand hover:underline">
              {l.label} →
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
