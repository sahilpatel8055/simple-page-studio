/**
 * Page narrative generation.
 *
 * Builds page-specific prose from the dataset that already exists — published
 * fees, approvals, delivery modes, specialisation counts, placement support and
 * peer positioning. Nothing here invents a statistic, ranking, salary,
 * recruiter, approval or placement claim: every sentence is emitted only when
 * the underlying record carries the fact it describes.
 *
 * The point is content differentiation: two universities with genuinely
 * different published records produce genuinely different paragraphs, and no
 * page falls back on a template with the name swapped.
 */
import {
  formatINR,
  getProgramme,
  getUniversity,
  listOfferingsByProgramme,
  listOfferingsByUniversity,
  type Offering,
} from "@/data";
import { archetypeOf, offeringValue } from "@/lib/pageDifferentiation";

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
};

const sentences = (list: (string | null | undefined)[]) =>
  list.filter((s): s is string => typeof s === "string" && s.trim().length > 0);

/** Delivery-mode wording that reflects what the university actually runs. */
function modeSentence(shortName: string, modes: string[], duration: string) {
  if (modes.includes("Online") && modes.includes("Distance"))
    return `${shortName} runs the programme in both online and distance mode over ${duration}, so the study pattern you get depends on the mode you apply under.`;
  if (modes.includes("Online"))
    return `Delivery is fully online over ${duration} — recorded and live sessions through the university's own learning platform rather than postal study material.`;
  if (modes.includes("Distance"))
    return `${shortName} delivers this as distance study over ${duration}, built around self-paced material and scheduled examinations rather than a live class timetable.`;
  return null;
}

/* --------------------------- university × course -------------------------- */

export interface OfferingNarrative {
  /** 2–4 fact-derived paragraphs unique to this university-course record. */
  paragraphs: string[];
  /** Suitability bullets — who this specific record fits, and who it does not. */
  suits: string[];
  notFor: string[];
}

export function offeringNarrative(
  universitySlug: string,
  programmeSlug: string,
): OfferingNarrative | null {
  const u = getUniversity(universitySlug);
  const p = getProgramme(programmeSlug);
  if (!u || !p) return null;
  const offering: Offering | undefined = listOfferingsByUniversity(universitySlug).find(
    (o) => o.programmeSlug === programmeSlug,
  );
  if (!offering) return null;

  const value = offeringValue(universitySlug, programmeSlug);
  const arch = archetypeOf(u);
  const bodies = u.approvals.map((a) => a.body.toUpperCase());
  const specCount = offering.specialisations.length;
  const total = offering.fee.total;
  const peers = listOfferingsByProgramme(programmeSlug).length;

  /* ------------------------------ paragraph 1 ----------------------------- */
  const opening = sentences([
    `${u.name} lists the ${p.name} as ${
      arch === "open"
        ? "an open-university programme"
        : arch === "central" || arch === "state"
          ? `a ${u.type?.toLowerCase()}-university programme`
          : "a private-university online programme"
    } based out of ${u.city}, ${u.state}${u.establishedYear ? `, on a campus established in ${u.establishedYear}` : ""}.`,
    modeSentence(u.shortName, u.modes, offering.durationLabel),
    u.approvals.length
      ? `The award carries ${u.approvals
          .map((a) => (a.status ? `${a.body} ${a.status}` : a.body))
          .join(", ")} on record — the recognition line worth checking before any fee payment.`
      : null,
  ]).join(" ");

  /* ------------------------- paragraph 2 — pricing ------------------------ */
  const pricing = sentences([
    total
      ? `The published total for the full programme is ${formatINR(total)}${
          offering.fee.perSemester ? `, billed at roughly ${formatINR(offering.fee.perSemester)} a semester` : ""
        }${offering.fee.emiFrom ? `, with the university advertising instalments from ${formatINR(offering.fee.emiFrom)} a month` : ""}.`
      : `${u.shortName} does not publish a single headline total for this programme, so the fee has to be confirmed for your intake and mode before you commit.`,
    value && value.peerMedian && total
      ? total < value.peerMedian
        ? `Against the ${formatINR(value.peerMedian)} median published by the other universities tracked here for the same degree, that is ${formatINR(value.peerMedian - total)} lower.`
        : total > value.peerMedian
          ? `That sits ${formatINR(total - value.peerMedian)} above the ${formatINR(value.peerMedian)} median published elsewhere for the same degree, so the extra has to be justified by what ${u.shortName} adds around the syllabus.`
          : `That matches the median published elsewhere for the same degree almost exactly.`
      : null,
    value?.rank && value.peers > 2
      ? `On published totals alone it is the ${ordinal(value.rank)} most affordable of ${value.peers} priced options for this degree on this site.`
      : null,
    offering.fee.discountPercent && offering.fee.listTotal
      ? `The current figure reflects a ${offering.fee.discountPercent}% reduction on a list price of ${formatINR(offering.fee.listTotal)}, which the university revises by intake.`
      : null,
  ]).join(" ");

  /* --------------------- paragraph 3 — study & outcomes -------------------- */
  const study = sentences([
    specCount
      ? `${specCount} specialisation${specCount === 1 ? "" : "s"} ${specCount === 1 ? "is" : "are"} published under this programme at ${u.shortName}${
          specCount >= 6 ? ", which is a wide branch list by the standards of this degree" : ""
        } — the elective choice is made at admission, so it is worth settling before you apply.`
      : `No branch-wise specialisation list is published for this programme at ${u.shortName}; the curriculum runs as a single track.`,
    offering.placement?.supportAvailable
      ? `${u.shortName} publishes career-support provision alongside this programme; treat it as support services rather than a placement guarantee, and ask what is contractually included for online learners.`
      : `No placement support is published against this programme in the ${u.shortName} record, so plan your job search independently of the university.`,
    peers > 1
      ? `${peers} universities on this site publish this degree, which makes a direct fee-and-recognition comparison the fastest way to sanity-check ${u.shortName}.`
      : null,
  ]).join(" ");

  /* ------------------------------ suitability ----------------------------- */
  const suits = sentences([
    total && value?.peerMedian && total < value.peerMedian
      ? `You want the recognised degree at a below-median published cost (${formatINR(total)} in total here).`
      : null,
    u.modes.includes("Online")
      ? `You need a fully online timetable that fits around work, not campus attendance.`
      : null,
    arch === "open" || arch === "state" || arch === "central"
      ? `You would rather hold a government/open-university degree than a privately priced online programme.`
      : `You want admission, learning platform and student support handled as one managed service.`,
    bodies.some((b) => b.includes("AICTE"))
      ? `Your employer or PSU application asks for AICTE recognition on a technical programme.`
      : null,
    bodies.some((b) => b.includes("WES"))
      ? `You may take the degree abroad later and want a university that appears in WES evaluation records.`
      : null,
    specCount >= 5 ? `You want to pick a named specialisation rather than a general degree.` : null,
    offering.fee.emiFrom
      ? `You would rather pay monthly than fund a semester in one go.`
      : null,
  ]);

  const notFor = sentences([
    total && value?.peerMedian && total > value.peerMedian && value.cheapest
      ? `Cost is your first filter — ${value.cheapest.name} publishes the same degree at ${formatINR(value.cheapest.total)}.`
      : null,
    !offering.placement?.supportAvailable
      ? `You are enrolling primarily for placement assistance — none is published for this programme.`
      : null,
    !u.modes.includes("Online")
      ? `You expect live online classes; this record is distance-mode study.`
      : null,
    specCount === 0 ? `You need a specific specialisation on the final marksheet.` : null,
    !bodies.some((b) => b.includes("AICTE"))
      ? `Your role requires AICTE approval on the programme itself — confirm that in writing first.`
      : null,
    !total ? `You need a fixed, published all-in cost before applying.` : null,
  ]);

  return { paragraphs: sentences([opening, pricing, study]), suits, notFor };
}

/* ---------------------------- university intro ---------------------------- */

/** One differentiated context paragraph for a university hub page. */
export function universityIntro(slug: string): string | null {
  const u = getUniversity(slug);
  if (!u) return null;
  const offers = listOfferingsByUniversity(slug);
  const levels = new Set(
    offers.map((o) => getProgramme(o.programmeSlug)?.level).filter(Boolean) as string[],
  );
  const totals = offers.map((o) => o.fee.total).filter((n): n is number => !!n && n > 0);
  return sentences([
    `${u.name} is ${u.type ? `a ${u.type.toLowerCase()} university` : "a university"} in ${u.city}, ${u.state}${
      u.establishedYear ? `, operating since ${u.establishedYear}` : ""
    }.`,
    offers.length
      ? `${offers.length} programme${offers.length === 1 ? "" : "s"} ${offers.length === 1 ? "is" : "are"} tracked here${
          levels.size > 1 ? ` across ${[...levels].join(" and ")} levels` : ""
        }${totals.length ? `, with published totals from ${formatINR(Math.min(...totals))} to ${formatINR(Math.max(...totals))}` : ""}.`
      : null,
    u.modes.length ? `Delivery on record: ${u.modes.join(" and ")}.` : null,
    u.approvals.length
      ? `Recognition on record: ${u.approvals.map((a) => (a.status ? `${a.body} ${a.status}` : a.body)).join(", ")}.`
      : null,
  ]).join(" ");
}
