/**
 * Blog-side readers over the course-pillar dataset.
 *
 * Editorial guides must never restate a fee by hand: these helpers build the
 * university fee / eligibility / specialisation tables straight from the same
 * records the course pillar pages render, so a blog table can never drift from
 * `/courses/{family}`. A missing value stays missing — it is labelled, never
 * invented.
 */
import { getCourseFamily, type FamilyOffer } from "@/lib/courseFamily";
import type { PostBlock } from "@/data/posts";

const ASK = "Shared by the university";

const inr = (n: number | null | undefined) =>
  typeof n === "number" && n > 0 ? `₹${n.toLocaleString("en-IN")}` : ASK;

const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

function offersOf(familySlug: string): FamilyOffer[] {
  const family = getCourseFamily(familySlug);
  if (!family) return [];
  return [...family.offers].sort((a, b) => {
    const av = a.fees.total ?? Number.MAX_SAFE_INTEGER;
    const bv = b.fees.total ?? Number.MAX_SAFE_INTEGER;
    return av - bv || a.universityName.localeCompare(b.universityName);
  });
}

/** Total / semester fee table for a course family, cheapest first. */
export function familyFeeTable(familySlug: string, caption?: string): PostBlock {
  const rows = offersOf(familySlug).map((o) => [
    o.universityShortName || o.universityName,
    inr(o.fees.total),
    inr(o.fees.semester),
    date(o.lastVerified),
  ]);
  return {
    kind: "table",
    caption: caption ?? "University-wise total programme fee (researched, 2026-27 session)",
    head: ["University", "Total programme fee", "Per semester", "Last updated"],
    rows,
  };
}

/** Mandatory extras — registration and examination charges where published. */
export function familyExtrasTable(familySlug: string, caption?: string): PostBlock {
  const rows = offersOf(familySlug)
    .filter((o) => o.fees.registration || o.fees.examination || o.fees.emi)
    .map((o) => [
      o.universityShortName || o.universityName,
      inr(o.fees.registration),
      inr(o.fees.examination),
      inr(o.fees.emi),
    ]);
  return {
    kind: "table",
    caption: caption ?? "Registration, examination and EMI figures where the university publishes them",
    head: ["University", "Registration", "Examination", "EMI from"],
    rows,
  };
}

/** Eligibility + duration table for a course family. */
export function familyEligibilityTable(familySlug: string, caption?: string): PostBlock {
  const rows = offersOf(familySlug).map((o) => [
    o.universityShortName || o.universityName,
    o.eligibility?.trim() || ASK,
    o.duration?.trim() || "—",
  ]);
  return {
    kind: "table",
    caption: caption ?? "Eligibility published by each university for this programme",
    head: ["University", "Eligibility", "Duration"],
    rows,
  };
}

/** Specialisations actually offered, per university. */
export function familySpecialisationTable(familySlug: string, caption?: string): PostBlock {
  const rows = offersOf(familySlug)
    .filter((o) => o.specialisations.length)
    .map((o) => [
      o.universityShortName || o.universityName,
      String(o.specialisations.length),
      o.specialisations.slice(0, 6).join(", "),
    ]);
  return {
    kind: "table",
    caption: caption ?? "Specialisations listed on each university's own programme record",
    head: ["University", "Count", "Examples"],
    rows,
  };
}

/** Fee band summary (lowest / highest researched total) as a short sentence. */
export function familyFeeRangeSentence(familySlug: string): string {
  const family = getCourseFamily(familySlug);
  if (!family || family.feeMin == null || family.feeMax == null) return "";
  return `Across the ${family.offers.length} universities researched on AVEDU, the published total ${family.shortName} fee runs from ₹${family.feeMin.toLocaleString("en-IN")} to ₹${family.feeMax.toLocaleString("en-IN")} for the full programme.`;
}
