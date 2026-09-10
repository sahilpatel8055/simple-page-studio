/**
 * Query-expansion + de-templating layer.
 *
 * Two problems this solves, both visible in Search Console:
 *
 * 1. Every university x course page shared one heading skeleton and one
 *    sentence pattern, so Google clustered them and suppressed most. The
 *    verdict paragraph here is selected by the *shape of the data* (cheap vs
 *    premium, open vs private, verified vs pending), so two programmes with
 *    different economics read differently.
 * 2. The pages only ever matched three phrasings ("fees", "eligibility",
 *    "admission"). `offeringQuestions` renders the question shapes people
 *    actually type — validity, comparison, placement salary, scholarship/EMI,
 *    exam pattern, total fee — so one page can enter dozens of auctions.
 *
 * Nothing here invents a fact: every sentence is assembled from dataset
 * values, and a missing value drops the sentence instead of guessing.
 */
import type { Offering, Programme, University } from "@/data/types";
import { offerings } from "@/data/offerings";
import { approvalText } from "@/lib/entities";
import { averagePackageFor, defaultRolesFor } from "@/lib/careerSalaries";

export interface OfferingFacts {
  offering: Offering;
  university: University;
  programme: Programme;
  path: string;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Median published total fee for the same programme across all universities. */
function programmeMedianFee(programmeSlug: string): number | null {
  const totals = offerings
    .filter((o) => o.programmeSlug === programmeSlug && o.fee.total)
    .map((o) => o.fee.total as number)
    .sort((a, b) => a - b);
  if (totals.length < 3) return null;
  return totals[Math.floor(totals.length / 2)] ?? null;
}

export type FeePosition = "well-below" | "below" | "typical" | "above" | "unknown";

export function feePosition(o: Offering): FeePosition {
  const total = o.fee.total;
  const median = programmeMedianFee(o.programmeSlug);
  if (!total || !median) return "unknown";
  const ratio = total / median;
  if (ratio <= 0.55) return "well-below";
  if (ratio <= 0.85) return "below";
  if (ratio >= 1.25) return "above";
  return "typical";
}

const firstSentence = (s: string) => (s.split(/(?<=\.)\s/)[0] ?? s).trim();

/**
 * A verdict paragraph whose sentence order and framing depend on the
 * programme's own economics — deliberately not one template.
 */
export function offeringVerdict({ offering, university, programme }: OfferingFacts): string {
  const u = university;
  const p = programme;
  const pos = feePosition(offering);
  const total = offering.fee.total ? inr(offering.fee.total) : null;
  const median = programmeMedianFee(offering.programmeSlug);
  const specs = offering.specialisations.length;
  const open = u.type === "Open" || u.type === "State" || u.type === "Central";

  const parts: string[] = [];

  // Opening framing is chosen by where the fee sits, so cheap state
  // programmes and premium private ones do not read alike.
  if (pos === "well-below" && total) {
    parts.push(
      `At ${total} for the full ${offering.durationLabel}, the ${p.name} at ${u.shortName} is one of the lowest-cost recognised routes to this degree${median ? ` — roughly half the ${inr(median)} that the same programme costs on average` : ""}.`,
    );
  } else if (pos === "below" && total) {
    parts.push(
      `The ${p.name} at ${u.shortName} costs ${total} in total, which lands under the ${median ? inr(median) : "category"} average for the same degree online.`,
    );
  } else if (pos === "above" && total) {
    parts.push(
      `${u.shortName} prices its ${p.name} at ${total}, above the ${median ? inr(median) : "category"} mid-point — you are paying for brand, placement access and cohort quality rather than the certificate itself.`,
    );
  } else if (total) {
    parts.push(
      `The ${p.name} at ${u.shortName} is priced at ${total} for the ${offering.durationLabel} programme, squarely in the middle of what this degree costs online.`,
    );
  } else {
    parts.push(
      `${u.shortName} runs its ${p.name} over ${offering.durationLabel} in the ${p.feeRangeLabel} band; the university has not published a single consolidated figure, so confirm the exact amount before you pay.`,
    );
  }

  // Recognition angle differs for state/open universities vs private ones.
  if (open) {
    parts.push(
      `As a ${(u.type ?? "state").toLowerCase()} university, it carries ${approvalText(u)}, which is what matters if you intend to sit government or public-sector exams.`,
    );
  } else {
    parts.push(
      `The award is backed by ${approvalText(u)}, so it is treated the same as the on-campus degree by employers and by universities you apply to later.`,
    );
  }

  if (specs > 6) {
    parts.push(
      `${specs} specialisations means you can steer the degree towards a specific role rather than taking a generalist qualification.`,
    );
  } else if (specs > 0) {
    parts.push(
      `There ${specs === 1 ? "is one specialisation" : `are ${specs} specialisations`}, so pick on the strength of the core curriculum rather than on breadth of choice.`,
    );
  }

  if (offering.fee.emiFrom) {
    parts.push(`EMI starts at ${inr(offering.fee.emiFrom)} a month if you would rather not pay upfront.`);
  } else if (offering.fee.perSemester) {
    parts.push(`Payment is per semester at ${inr(offering.fee.perSemester)}, which spreads the cost across the programme.`);
  }

  if (u.verdict) parts.push(u.verdict);

  return parts.join(" ");
}

export interface PageQuestion {
  question: string;
  answer: string;
}

/**
 * The question shapes the pages were not matching. Each answer is 40-60 words,
 * lifts a real dataset value, and is rendered visibly *and* into FAQPage
 * schema so the visible text and the markup agree.
 */
export function offeringQuestions(
  facts: OfferingFacts,
  rivals: { shortName: string; slug: string }[] = [],
): PageQuestion[] {
  const { offering: o, university: u, programme: p } = facts;
  const out: PageQuestion[] = [];
  const total = o.fee.total ? inr(o.fee.total) : null;

  out.push({
    question: `Is the ${u.shortName} ${p.name} valid for government jobs?`,
    answer: `Yes. ${u.name} holds ${approvalText(u)}, and an online or distance degree from an entitled university carries the same legal standing as the campus version for government recruitment, PSU applications and further study. Always check the entitlement covers your exact intake year before you pay the fee.`,
  });

  if (total) {
    out.push({
      question: `What is the total fee for the ${u.shortName} ${p.name}?`,
      answer: `The published total is ${total} for the complete ${o.durationLabel} programme${o.fee.perSemester ? `, or ${inr(o.fee.perSemester)} per semester` : ""}${o.fee.perYear ? `, which works out to about ${inr(o.fee.perYear)} a year` : ""}.${o.fee.registrationFee ? ` A registration fee of ${inr(o.fee.registrationFee)} applies separately.` : ""} Verified against the university's own fee notification on ${o.lastUpdated || "the date shown above"}.`,
    });
  }

  if (rivals.length) {
    const names = rivals.map((r) => r.shortName).join(", ");
    out.push({
      question: `${u.shortName} ${p.shortName} vs ${rivals[0]!.shortName} — which is better?`,
      answer: `The honest answer depends on what you are optimising for. Compare ${u.shortName} against ${names} on total fee, approval status, specialisation fit and placement support rather than on brand alone. Our side-by-side pages put those parameters in one table so you can see where the extra money actually goes.`,
    });
  }

  const roles = defaultRolesFor(p.slug).slice(0, 3);
  if (roles.length) {
    const band = averagePackageFor(roles[0]!);
    out.push({
      question: `What salary can you expect after the ${u.shortName} ${p.name}?`,
      answer: `Graduates typically move into roles such as ${roles.join(", ")}. Reported pay for ${roles[0]} sits around ${band}, though an online degree is a qualification rather than a placement guarantee — outcomes depend on your prior experience, specialisation and location far more than on the university name.`,
    });
  }

  if (o.fee.emiFrom || o.fee.discountPercent) {
    out.push({
      question: `Are scholarships or EMI available for the ${u.shortName} ${p.name}?`,
      answer: `${o.fee.emiFrom ? `EMI is available from ${inr(o.fee.emiFrom)} per month, so the fee can be spread across the programme instead of paid upfront.` : ""}${o.fee.discountPercent ? ` A published concession of up to ${o.fee.discountPercent}% applies to eligible categories such as defence, divyangjan and merit applicants.` : ""} Confirm the current scheme with the university before you apply — concessions change each intake.`.trim(),
    });
  }

  if (u.examPattern) {
    out.push({
      question: `What is the exam pattern for the ${u.shortName} ${p.name}?`,
      answer: `${firstSentence(u.examPattern)} Assessment usually combines continuous internal work with an end-of-semester examination, and the weighting is published in the university's own academic regulations for your intake.`,
    });
  }

  out.push({
    question: `How long does the ${u.shortName} ${p.name} take to complete?`,
    answer: `The standard duration is ${o.durationLabel}. Most Indian universities also allow a maximum period of roughly double that for learners who need to pause, so a working professional can stretch the programme without losing credits. ${p.eligibility}`,
  });

  return out;
}

/**
 * One title, one intent. The previous single template made every page match
 * "fees", "eligibility" and "admission" weakly instead of owning one — which
 * is why the fee query family averaged position 61.
 */
export function offeringTitleIntent(facts: OfferingFacts): {
  title: string;
  description: string;
  keywords: string[];
} {
  const { offering: o, university: u, programme: p } = facts;
  const pos = feePosition(o);
  const total = o.fee.total ? inr(o.fee.total) : p.feeRangeLabel;
  const year = new Date().getFullYear() + (new Date().getMonth() >= 8 ? 1 : 0);

  // Lead with whatever this programme is genuinely strongest on.
  if (o.fee.total && (pos === "well-below" || pos === "below")) {
    return {
      title: `${u.shortName} ${p.name} Fees ${year}: ${total} Total — Full Breakdown`,
      description: `${u.shortName} ${p.name} costs ${total} for the full ${o.durationLabel}${o.fee.perSemester ? ` (${inr(o.fee.perSemester)} per semester)` : ""}. Verified fee breakdown, eligibility, approvals and admission dates.`,
      keywords: [
        `${u.shortName} ${p.shortName} fees`,
        `${u.shortName} ${p.name} total fee`,
        `${p.name} fees ${year}`,
      ],
    };
  }
  if (o.admissionOpen) {
    return {
      title: `${u.shortName} ${p.name} Admission ${year}: Dates, Eligibility & Fees`,
      description: `Admission is open for the ${u.shortName} ${p.name}${o.nextSessionLabel ? ` (${o.nextSessionLabel} intake)` : ""}. Eligibility, documents, step-by-step application, ${total} fee and approval status.`,
      keywords: [
        `${u.shortName} ${p.shortName} admission`,
        `${u.shortName} ${p.name} last date`,
        `${p.name} admission ${year}`,
      ],
    };
  }
  if (o.specialisations.length > 6) {
    return {
      title: `${u.shortName} ${p.name}: ${o.specialisations.length} Specialisations, Fees & Eligibility`,
      description: `Compare all ${o.specialisations.length} specialisations in the ${u.shortName} ${p.name}, with ${total} fees, ${o.durationLabel} duration, eligibility and approval status verified against official sources.`,
      keywords: [
        `${u.shortName} ${p.shortName} specialisations`,
        `${u.shortName} ${p.name}`,
        `${p.name} subjects`,
      ],
    };
  }
  return {
    title: `${u.shortName} ${p.name} ${year}: Fees, Eligibility & Approval`,
    description: `${p.name} at ${u.name} — ${o.durationLabel}, ${total}, ${approvalText(u)}. Eligibility, admission steps, curriculum and placement support in one verified page.`,
    keywords: [
      `${u.shortName} ${p.shortName}`,
      `${u.shortName} ${p.name} eligibility`,
      `${p.name} online`,
    ],
  };
}
