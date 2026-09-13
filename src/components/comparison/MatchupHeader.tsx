import { AppLink } from "@/components/common/AppLink";
import { universityLogo } from "@/lib/assets";
import { siteSlugForMasterSlug } from "@/lib/courseMaster";
import { onlineCourseLabel } from "@/lib/comparisonLabels";
import type { MasterUniversity } from "@/lib/comparisonMaster";
import type { PairDecision } from "@/lib/comparisonDecision";

/**
 * The first screen of every comparison page: both universities established
 * visually, side by side on mobile as well, with the winner chips and the
 * one-paragraph answer immediately below.
 */

type Side = {
  name: string;
  fullName: string;
  location: string;
  recognition: string;
  href: string;
  logo?: string | undefined;
};

function sideOf(name: string, uni: MasterUniversity | undefined): Side {
  const slug = uni?.slug;
  const siteSlug = slug ? (siteSlugForMasterSlug(slug) ?? slug) : undefined;
  const rec = uni?.recognition ?? {};
  const badges = [rec["UGC_DEB_status"], rec["NAAC_status"]]
    .filter((v): v is string => Boolean(v))
    .slice(0, 2)
    .join(" · ");
  return {
    name,
    fullName: uni?.university_name ?? name,
    location: [uni?.location, uni?.mode].filter(Boolean).join(" · ") || "Location not published",
    recognition: badges || "Recognition not published",
    href: slug ? `/universities/${siteSlug}` : "/universities",
    ...(siteSlug ? { logo: universityLogo(siteSlug) } : {}),
  };
}

function Identity({ side }: { side: Side }) {
  return (
    <AppLink
      to={side.href}
      className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center"
      aria-label={`${side.fullName} profile`}
    >
      <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-border bg-background p-1.5 sm:h-20 sm:w-20">
        {side.logo ? (
          <img
            src={side.logo}
            alt={`${side.fullName} logo`}
            width={72}
            height={72}
            className="h-full w-full object-contain"
            loading="eager"
          />
        ) : (
          <span className="text-lg font-extrabold text-brand">{side.name.slice(0, 2)}</span>
        )}
      </span>
      <span className="text-sm font-extrabold leading-tight text-foreground sm:text-base">
        {side.name}
      </span>
      <span className="text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">
        {side.location}
      </span>
      <span className="rounded-full bg-secondary px-2 py-1 text-[0.65rem] font-semibold leading-snug text-brand sm:text-[0.72rem]">
        {side.recognition}
      </span>
    </AppLink>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <li className="rounded-full border border-border bg-background px-3 py-1.5 text-[0.72rem] font-semibold text-foreground sm:text-xs">
      <span className="text-muted-foreground">{label}: </span>
      {value}
    </li>
  );
}

export function MatchupHeader({
  aName,
  bName,
  uniA,
  uniB,
  course,
  decision,
  verified,
  specWinner,
}: {
  aName: string;
  bName: string;
  uniA: MasterUniversity | undefined;
  uniB: MasterUniversity | undefined;
  course?: string | undefined;
  decision?: PairDecision | undefined;
  verified: string;
  specWinner?: string | undefined;
}) {
  const a = sideOf(aName, uniA);
  const b = sideOf(bName, uniB);
  const scope = course ? `${onlineCourseLabel(course)} comparison` : "University comparison";

  return (
    <section aria-labelledby="matchup" className="mb-8">
      <h2 id="matchup" className="sr-only">
        {aName} vs {bName} at a glance
      </h2>

      <div className="flex items-center gap-2 sm:gap-6">
        <Identity side={a} />
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-extrabold text-brand-foreground sm:h-12 sm:w-12 sm:text-sm"
        >
          VS
        </span>
        <Identity side={b} />
      </div>

      <p className="mt-4 text-center text-[0.72rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {scope} · verified {verified}
      </p>

      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        <Chip label="Lower fee" value={decision?.cheaper?.name ?? "Not decidable"} />
        <Chip label="Recognition" value={decision?.recognised?.name ?? "Comparable"} />
        {specWinner && <Chip label="More specialisations" value={specWinner} />}
      </ul>

      {/* The one-paragraph answer lives in the DecisionBlock directly below,
          so it is stated once per page (no repeated verdict). */}

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <a
          href="#fees-payment-considerations"
          className="min-h-[44px] rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground"
        >
          Compare fees
        </a>
        <a
          href="#eligibility-admission-requirements"
          className="min-h-[44px] rounded-full border border-border px-4 py-2.5 text-sm font-semibold"
        >
          Check eligibility
        </a>
        <AppLink
          to="/counselling"
          className="min-h-[44px] rounded-full border border-brand px-4 py-2.5 text-sm font-semibold text-brand"
        >
          Get unbiased guidance
        </AppLink>
      </div>
    </section>
  );
}
