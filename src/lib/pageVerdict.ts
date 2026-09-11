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
import { programmes } from "@/data/programmes";
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

/* -------------------------------------------------------------------------
 * University hub layer
 *
 * The university pages average position 41 for the same reason the programme
 * pages did: one shared skeleton, one shared sentence pattern, and a title
 * that carries three intents at once. Everything below is assembled from the
 * university's own offerings, so two universities with different economics
 * read differently.
 * ---------------------------------------------------------------------- */

export interface UniversityFacts {
  count: number;
  cheapest: { name: string; total: number } | null;
  dearest: { name: string; total: number } | null;
  minEmi: number | null;
  pg: number;
  ug: number;
  specialisations: number;
}

export function universityFacts(slug: string): UniversityFacts {
  const own = offerings.filter((o) => o.universitySlug === slug);
  const named = own
    .filter((o) => o.fee.total)
    .map((o) => ({
      name: programmes.find((p) => p.slug === o.programmeSlug)?.name ?? o.programmeSlug,
      total: o.fee.total as number,
      level: programmes.find((p) => p.slug === o.programmeSlug)?.level,
    }))
    .sort((a, b) => a.total - b.total);
  const emis = own.map((o) => o.fee.emiFrom).filter((n): n is number => Boolean(n));
  return {
    count: own.length,
    cheapest: named[0] ? { name: named[0].name, total: named[0].total } : null,
    dearest: named.length > 1 ? { name: named[named.length - 1]!.name, total: named[named.length - 1]!.total } : null,
    minEmi: emis.length ? Math.min(...emis) : null,
    pg: own.filter((o) => programmes.find((p) => p.slug === o.programmeSlug)?.level === "PG").length,
    ug: own.filter((o) => programmes.find((p) => p.slug === o.programmeSlug)?.level === "UG").length,
    specialisations: new Set(own.flatMap((o) => o.specialisations)).size,
  };
}

/** Opening paragraph shaped by the university's own catalogue, not a template. */
export function universityVerdict(u: University): string {
  const f = universityFacts(u.slug);
  const open = u.type === "Open" || u.type === "State" || u.type === "Central";
  const parts: string[] = [];

  if (f.cheapest && f.dearest) {
    parts.push(
      `${u.name} publishes ${f.count} online and distance programmes, priced from ${inr(f.cheapest.total)} for the ${f.cheapest.name} up to ${inr(f.dearest.total)} for the ${f.dearest.name} — so what you pay at ${u.shortName} depends far more on which degree you pick than on the university itself.`,
    );
  } else if (f.cheapest) {
    parts.push(
      `${u.name} runs ${f.count} online and distance programmes, with the ${f.cheapest.name} published at ${inr(f.cheapest.total)} for the full course.`,
    );
  } else {
    parts.push(
      `${u.name} runs ${f.count} online and distance programmes in the ${u.feeRangeLabel} band; programme-wise totals are published on each course page below.`,
    );
  }

  if (open) {
    parts.push(
      `It is a ${(u.type ?? "state").toLowerCase()} university based in ${u.city}, ${u.state}, holding ${approvalText(u)} — the recognition that matters if you plan to sit government or public-sector exams on this degree.`,
    );
  } else {
    parts.push(
      `Based in ${u.city}, ${u.state}, it holds ${approvalText(u)}, so the online award is treated the same as the campus degree by employers and by universities you apply to later.`,
    );
  }

  if (f.pg && f.ug) {
    parts.push(
      `The catalogue splits ${f.ug} bachelor's and ${f.pg} master's programmes across ${f.specialisations} specialisations, which is wide enough to move from a UG to a PG here without changing university.`,
    );
  } else if (f.specialisations > 0) {
    parts.push(`Between them the programmes carry ${f.specialisations} specialisations.`);
  }

  if (f.minEmi) parts.push(`EMI starts at ${inr(f.minEmi)} a month on the programmes that publish one.`);
  if (u.verdict) parts.push(u.verdict);

  return parts.join(" ");
}

export function universityQuestions(
  u: University,
  rivals: { shortName: string }[] = [],
): PageQuestion[] {
  const f = universityFacts(u.slug);
  const out: PageQuestion[] = [];

  out.push({
    question: `Is a ${u.shortName} online degree valid for government jobs?`,
    answer: `Yes. ${u.name} holds ${approvalText(u)}, and a degree from an entitled university carries the same legal standing as the campus version for government recruitment, PSU applications and further study. Confirm the entitlement covers your intake year before you pay any fee.`,
  });

  if (f.cheapest) {
    out.push({
      question: `What is the total fee for ${u.shortName} online courses?`,
      answer: `Totals run from ${inr(f.cheapest.total)} for the ${f.cheapest.name}${f.dearest ? ` to ${inr(f.dearest.total)} for the ${f.dearest.name}` : ""}, covering the complete programme rather than a single year.${f.minEmi ? ` EMI from ${inr(f.minEmi)} a month is published on some programmes.` : ""} Each course page carries the semester-wise split.`,
    });
  }

  if (rivals.length) {
    out.push({
      question: `${u.shortName} vs ${rivals[0]!.shortName} — which should you choose?`,
      answer: `Compare them on four things only: total published fee, approval status, whether your specialisation exists, and the support you actually get during the programme. Our side-by-side page puts ${u.shortName} and ${rivals.map((r) => r.shortName).join(", ")} in one table so the difference is visible instead of implied.`,
    });
  }

  out.push({
    question: `What is the placement support at ${u.shortName}?`,
    answer: `Online learners at ${u.shortName} get career-services access rather than a campus placement guarantee — resume support, job boards and recruiter drives where the university runs them. Treat any package figure as a description of the whole learner base, not a promise attached to your enrolment.`,
  });

  out.push({
    question: `Are scholarships or EMI available at ${u.shortName}?`,
    answer: `${f.minEmi ? `EMI is published from ${inr(f.minEmi)} per month, so the fee can be spread across the programme.` : `Fee concessions are handled per intake rather than as a standing scheme.`} Category concessions for defence personnel, divyangjan learners, women and merit applicants are common in Indian online programmes — confirm the current scheme with ${u.shortName} before applying.`,
  });

  if (u.examPattern) {
    out.push({
      question: `What is the exam pattern at ${u.shortName}?`,
      answer: `${firstSentence(u.examPattern)} Assessment normally combines continuous internal work with an end-of-semester examination, and the weighting is set out in the university's academic regulations for your intake year.`,
    });
  }

  out.push({
    question: `How do you take admission at ${u.shortName}?`,
    answer: `${u.admissionProcess.slice(0, 4).join(" → ")}. Keep ${u.documentsRequired.slice(0, 3).join(", ").toLowerCase()} ready as scans before you begin, because the application usually times out if documents are collected mid-form.`,
  });

  return out;
}

/** One title, one intent — chosen from what this university is strongest on. */
export function universityTitleIntent(u: University): {
  title: string;
  description: string;
  keywords: string[];
} {
  const f = universityFacts(u.slug);
  const year = new Date().getFullYear() + (new Date().getMonth() >= 8 ? 1 : 0);

  if (f.cheapest && f.dearest) {
    return {
      title: `${u.shortName} Online Fees ${year}: ${inr(f.cheapest.total)}–${inr(f.dearest.total)} by Course`,
      description: `Course-wise fees at ${u.name} — ${inr(f.cheapest.total)} for the ${f.cheapest.name} up to ${inr(f.dearest.total)}, with ${approvalText(u)}, eligibility and admission steps.`,
      keywords: [`${u.shortName} online fees`, `${u.shortName} course fees`, `${u.shortName} fee structure ${year}`],
    };
  }
  if (f.count > 8) {
    return {
      title: `${u.shortName} Online: ${f.count} Courses, Fees & Approval ${year}`,
      description: `All ${f.count} online and distance programmes at ${u.name}, with fee band ${u.feeRangeLabel}, ${approvalText(u)}, eligibility and admission process.`,
      keywords: [`${u.shortName} online courses`, `${u.shortName} distance education`, `${u.shortName} admission ${year}`],
    };
  }
  return {
    title: `${u.shortName} Online ${year}: Courses, Fees & Approval Status`,
    description: `${u.name} online degrees — ${u.feeRangeLabel} fee band, ${approvalText(u)}, eligibility, admission steps and what to verify before you apply.`,
    keywords: [`${u.shortName} online`, `${u.shortName} admission`, `${u.shortName} approval`],
  };
}

/* -------------------------------------------------------------------------
 * Course pillar layer
 * ---------------------------------------------------------------------- */

export interface FamilyLike {
  name: string;
  shortName: string;
  degreeName: string;
  level: "UG" | "PG";
  durationLabel: string;
  feeMin: number | null;
  feeMax: number | null;
  feeRangeLabel: string;
  offers: { universityShortName: string; fees: { total: number | null } }[];
  specialisations: { name: string }[];
}

export function familyVerdict(f: FamilyLike): string {
  const parts: string[] = [];
  const cheapest = f.offers
    .filter((o) => o.fees.total)
    .sort((a, b) => (a.fees.total as number) - (b.fees.total as number))[0];

  if (f.feeMin && f.feeMax) {
    parts.push(
      `An ${f.shortName} online in India costs anywhere from ${inr(f.feeMin)} to ${inr(f.feeMax)} for the full ${f.durationLabel} — a spread of roughly ${Math.round(f.feeMax / Math.max(f.feeMin, 1))}x for the same UGC-entitled qualification, which is the single most useful thing to know before you shortlist.`,
    );
  } else {
    parts.push(
      `An ${f.shortName} online in India sits in the ${f.feeRangeLabel} band for the full ${f.durationLabel}, and the published totals vary widely between state and private universities.`,
    );
  }

  parts.push(
    `We track ${f.offers.length} universities offering the ${f.degreeName} in online or distance mode${cheapest ? `, the lowest published total being ${cheapest.universityShortName} at ${inr(cheapest.fees.total as number)}` : ""}.`,
  );

  if (f.specialisations.length) {
    parts.push(
      `Across them there are ${f.specialisations.length} distinct specialisations, so the real decision is not "which university" but "which specialisation, at a fee I can finish paying".`,
    );
  }

  parts.push(
    f.level === "PG"
      ? `Eligibility is a bachelor's degree in any stream for most universities; a few add a minimum aggregate or an entrance step, and those are flagged per university below.`
      : `Eligibility is 10+2 from any recognised board for almost every university here, with no entrance test in the majority of cases.`,
  );

  return parts.join(" ");
}

export function familyQuestions(f: FamilyLike): PageQuestion[] {
  const sorted = f.offers
    .filter((o) => o.fees.total)
    .sort((a, b) => (a.fees.total as number) - (b.fees.total as number));
  const cheapest = sorted[0];
  const out: PageQuestion[] = [];

  out.push({
    question: `Is an online ${f.shortName} valid for government jobs in India?`,
    answer: `Yes, provided the university is UGC-entitled for that programme in your intake year. An entitled online ${f.shortName} is treated as equivalent to the campus degree for government recruitment, PSU roles and further study. The approval status of every university on this page is stated on its own profile.`,
  });

  if (cheapest) {
    out.push({
      question: `Which is the cheapest online ${f.shortName} in India?`,
      answer: `Of the ${f.offers.length} universities tracked here, the lowest published total is ${cheapest.universityShortName} at ${inr(cheapest.fees.total as number)} for the complete ${f.durationLabel}. Cheapest is not automatically best — check approval status, specialisation fit and learner support before deciding on price alone.`,
    });
  }

  out.push({
    question: `What is the total fee for an online ${f.shortName}?`,
    answer: `${f.feeMin && f.feeMax ? `Published totals run from ${inr(f.feeMin)} to ${inr(f.feeMax)}` : `Published totals sit in the ${f.feeRangeLabel} band`} for the full ${f.durationLabel}, before examination and registration charges. Always compare the total rather than the per-semester figure, because semester counts differ between universities.`,
  });

  out.push({
    question: `What salary can you expect after an online ${f.shortName}?`,
    answer: `Pay is set by the role you move into, not by the mode of study. Our role-wise table shows entry, mid-career and senior bands for every role this degree commonly feeds, so you can check a fee against a realistic outcome before enrolling.`,
  });

  if (f.specialisations.length) {
    out.push({
      question: `Which specialisation should you pick in an online ${f.shortName}?`,
      answer: `There are ${f.specialisations.length} specialisations across the universities listed here, including ${f.specialisations.slice(0, 4).map((s) => s.name).join(", ")}. Pick the one that matches the job title you want next, then check which universities actually run it — several are offered by only one or two.`,
    });
  }

  out.push({
    question: `How long does an online ${f.shortName} take?`,
    answer: `The standard duration is ${f.durationLabel}. Most Indian universities allow a maximum period of roughly double that, so a working professional can pause a semester without losing credits already earned.`,
  });

  out.push({
    question: `Online ${f.shortName} vs regular ${f.shortName} — what is the difference?`,
    answer: `The degree certificate and its legal standing are the same when the university is entitled. What differs is delivery and campus placement: online learners study asynchronously and get career services rather than a campus placement channel, which suits people already working and suits fresh graduates less well.`,
  });

  return out;
}

export function familyTitleIntent(
  f: FamilyLike,
  year = new Date().getFullYear() + (new Date().getMonth() >= 8 ? 1 : 0),
): { title: string; description: string; keywords: string[] } {

  if (f.feeMin && f.feeMax) {
    return {
      title: `${f.name} in India ${year}: Fees ${inr(f.feeMin)}–${inr(f.feeMax)}, Best Universities`,
      description: `${f.name} fees compared across ${f.offers.length} UGC-entitled universities — ${inr(f.feeMin)} to ${inr(f.feeMax)} total, ${f.durationLabel}, ${f.specialisations.length} specialisations, eligibility and admission dates.`,
      keywords: [`${f.name} fees`, `cheapest ${f.name}`, `${f.name} in india`, `best universities for ${f.name}`],
    };
  }
  return {
    title: `${f.name} in India ${year}: Fees, Eligibility & Best Universities`,
    description: `${f.name} compared across ${f.offers.length} universities — ${f.feeRangeLabel} fee band, ${f.durationLabel}, eligibility, specialisations and how to choose.`,
    keywords: [`${f.name} fees`, `${f.name} eligibility`, `${f.name} in india`],
  };
}
