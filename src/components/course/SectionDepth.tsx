import { Note, Prose, ResponsiveTable, Section } from "@/components/course/CourseSections";
import type { CourseFamily, FamilyOffer } from "@/lib/courseFamily";
import type { CourseSectionKey } from "@/lib/courseSections";

/**
 * University-wise depth block appended to a standalone course-section page.
 *
 * Everything here is derived from the verified offer records — no filler prose.
 * Each section only gets the extra table + analysis that answers a *further*
 * question a searcher on that URL actually has; where the dataset has nothing
 * new to say, the block renders nothing.
 */

const inr = (n: number | null | undefined) => (n == null ? "—" : `₹${n.toLocaleString("en-IN")}`);
const dash = (s: string | null | undefined) => (s && s.trim() ? s.trim() : "—");
const trim = (s: string | null | undefined, max = 120) => {
  const v = dash(s);
  return v.length > max ? `${v.slice(0, max - 1).trimEnd()}…` : v;
};

const sortedByFee = (offers: FamilyOffer[]) =>
  offers
    .filter((o) => o.fees.total != null)
    .slice()
    .sort((a, b) => (a.fees.total ?? 0) - (b.fees.total ?? 0));

function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? (s[mid] as number) : Math.round((((s[mid - 1] as number) + (s[mid] as number)) / 2));
}

function commonItems(lists: string[][], threshold: number): string[] {
  const counts = new Map<string, number>();
  for (const list of lists) for (const item of new Set(list)) counts.set(item, (counts.get(item) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, c]) => c >= threshold)
    .sort((a, b) => b[1] - a[1])
    .map(([item]) => item);
}

export function SectionDepth({
  section,
  family,
}: {
  section: CourseSectionKey;
  family: CourseFamily;
}) {
  const offers = family.offers;
  if (offers.length < 2) return null;

  switch (section) {
    case "fees": {
      const ranked = sortedByFee(offers);
      if (ranked.length < 2) return null;
      const cheapest = ranked[0] as FamilyOffer;
      const costliest = ranked[ranked.length - 1] as FamilyOffer;
      const mid = median(ranked.map((o) => o.fees.total as number));
      const verified = offers.filter((o) => o.fees.verified).length;
      const withEmi = offers.filter((o) => o.fees.emi != null).length;
      return (
        <Section title={`What the ${family.shortName} fee table actually tells you`} tone="cream">
          <Prose
            paragraphs={[
              `Across ${ranked.length} universities publishing a full ${family.name} fee, the spread runs from ${inr(cheapest.fees.total)} at ${cheapest.universityShortName} to ${inr(costliest.fees.total)} at ${costliest.universityShortName} — a difference of ${inr((costliest.fees.total ?? 0) - (cheapest.fees.total ?? 0))} for the same UGC-entitled degree. The median sits at ${inr(mid)}, which is the number to judge any quote against: anything far above it should be buying you something specific such as placement support, a stronger NAAC grade or an industry-certified elective track.`,
              `${verified} of ${offers.length} fees on this page are verified against the university's own published schedule, and ${withEmi} universities publish a monthly EMI figure rather than only a lump-sum total. Registration, examination and application charges are billed separately by most universities, so the "total programme fee" column below is the comparable figure — not the amount you pay on day one.`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} fee break-up by university`}
            head={[
              "University",
              "Total fee",
              "Per semester",
              "EMI / month",
              "Application",
              "Exam fee",
            ]}
            rows={ranked.map((o) => [
              o.universityShortName,
              inr(o.fees.total),
              inr(o.fees.semester),
              inr(o.fees.emi),
              inr(o.fees.application),
              inr(o.fees.examination),
            ])}
          />
          <Note>
            Cheapest is not automatically best value. Compare the total against the median above,
            then check the approvals and placement columns on each university page before deciding.
          </Note>
        </Section>
      );
    }

    case "eligibility": {
      const withEntrance = offers.filter((o) => o.entranceExam);
      const withMarks = offers.filter((o) => o.minimumMarks);
      return (
        <Section title={`University-wise ${family.shortName} eligibility`} tone="cream">
          <Prose
            paragraphs={[
              `Eligibility for the ${family.name} is not a single national rule — each university sets its own qualifying marks, relaxations and entrance requirement inside the UGC framework. ${withEntrance.length === 0 ? "None of the universities tracked here run an entrance test for this course, so admission is merit-based on your last qualifying degree." : `${withEntrance.length} of ${offers.length} universities here reference an entrance or aptitude test (${withEntrance.map((o) => o.universityShortName).join(", ")}); the rest admit directly on qualifying marks.`} ${withMarks.length ? `${withMarks.length} publish an explicit minimum-marks bar, and reserved-category relaxations usually apply on top of it.` : ""}`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} eligibility by university`}
            head={["University", "Eligibility", "Minimum marks", "Entrance", "Duration"]}
            rows={offers.map((o) => [
              o.universityShortName,
              trim(o.eligibility, 140),
              dash(o.minimumMarks),
              dash(o.entranceExam),
              dash(o.duration),
            ])}
          />
          <Note>
            If you fall just short of a marks bar at one university, check the next row before
            assuming you are ineligible — the same degree is often open elsewhere at a lower cut-off.
          </Note>
        </Section>
      );
    }

    case "admission": {
      const shared = commonItems(
        offers.map((o) => o.documents),
        Math.max(2, Math.ceil(offers.length / 2)),
      ).slice(0, 8);
      return (
        <Section title={`Intake windows and application routes by university`} tone="cream">
          <Prose
            paragraphs={[
              `Online degrees in India run on two admission cycles a year — a January session and a July session — and each university closes its window on its own date. The practical risk is not eligibility but timing: register after a session closes and your degree completion slides by six months. ${shared.length ? `Documents asked for by most universities on this list: ${shared.join(", ")}.` : ""}`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} intake and application route by university`}
            head={["University", "Next intake", "Steps published", "Apply via"]}
            rows={offers.map((o) => [
              o.universityShortName,
              dash(o.intake),
              o.admissionSteps.length ? `${o.admissionSteps.length}-step process` : "—",
              o.applicationUrl ? "Official online portal" : "Counselling assisted",
            ])}
          />
        </Section>
      );
    }

    case "syllabus": {
      const rows = offers.map((o) => [
        o.universityShortName,
        dash(o.duration),
        o.semesters ? `${o.semesters} semesters` : "—",
        o.specialisations.length ? String(o.specialisations.length) : "—",
      ]);
      return (
        <Section title={`Curriculum structure by university`} tone="cream">
          <Prose
            paragraphs={[
              `The core ${family.shortName} syllabus is broadly common because UGC entitlement requires parity with the on-campus programme. What actually differs between universities is the elective load — how many specialisation subjects you get, and in which semester the track begins. Use the table to see which universities give you the widest elective choice for the same duration.`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} structure by university`}
            head={["University", "Duration", "Structure", "Elective tracks"]}
            rows={rows}
          />
        </Section>
      );
    }

    case "specialisations": {
      const ranked = family.specialisations
        .slice()
        .sort((a, b) => b.universities.length - a.universities.length)
        .slice(0, 12);
      if (!ranked.length) return null;
      const widest = ranked[0];
      return (
        <Section title={`Which ${family.shortName} specialisations are widely available`} tone="cream">
          <Prose
            paragraphs={[
              `A specialisation offered by one university only is harder to compare on fee and harder to switch out of if the batch does not run. ${widest ? `${widest.name} is the most widely offered track here, available at ${widest.universities.length} universities` : ""} — availability across several universities usually means a stable batch and a recognisable line on your transcript.`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} specialisation availability`}
            head={["Specialisation", "Universities offering", "Available at"]}
            rows={ranked.map((s) => [
              s.name,
              String(s.universities.length),
              s.universities
                .slice(0, 4)
                .map((u) => u.name)
                .join(", "),
            ])}
          />
        </Section>
      );
    }

    case "exam-pattern": {
      return (
        <Section title={`Exam mode and assessment load by university`} tone="cream">
          <Prose
            paragraphs={[
              `Every university on this list runs remote-proctored end-semester exams, but the number of exam events you sit differs with the semester count, and the examination fee is charged separately from tuition at several of them. If you travel for work, check both columns — a four-semester structure with a per-semester exam fee is a different commitment from an annual pattern.`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} exam load by university`}
            head={["University", "Mode", "Exam events", "Exam fee"]}
            rows={offers.map((o) => [
              o.universityShortName,
              dash(o.mode),
              o.semesters ? `${o.semesters} end-semester exams` : "—",
              inr(o.fees.examination),
            ])}
          />
        </Section>
      );
    }

    case "placement": {
      const roles = commonItems(offers.map((o) => o.careerRoles), 2).slice(0, 6);
      return (
        <Section title={`Career outcomes claimed by each university`} tone="cream">
          <Prose
            paragraphs={[
              `Online programmes provide placement *assistance* — resume support, portal access and drives — rather than a placement guarantee, and that distinction matters when you read any package claim. ${roles.length ? `Roles named by more than one university, which is a fair signal of where this degree actually lands people: ${roles.join(", ")}.` : ""}`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} roles and hiring industries by university`}
            head={["University", "Roles published", "Industries"]}
            rows={offers.map((o) => [
              o.universityShortName,
              o.careerRoles.slice(0, 4).join(", ") || "—",
              o.industries.slice(0, 3).join(", ") || "—",
            ])}
          />
        </Section>
      );
    }

    case "scholarships": {
      const ranked = sortedByFee(offers);
      if (!ranked.length) return null;
      return (
        <Section title={`What a waiver is worth against each fee`} tone="cream">
          <Prose
            paragraphs={[
              `A scholarship headline only means something next to the fee it is cut from. The table below puts each university's published waiver categories against its total programme fee, so a 20% waiver on a high fee can be compared with a lower sticker price that carries no waiver at all.`,
            ]}
          />
          <ResponsiveTable
            caption={`${family.name} waivers against total fee`}
            head={["University", "Total fee", "Waiver categories published"]}
            rows={ranked.map((o) => [
              o.universityShortName,
              inr(o.fees.total),
              o.scholarships.slice(0, 3).join("; ") || "None published",
            ])}
          />
        </Section>
      );
    }

    case "faq": {
      const ranked = sortedByFee(offers);
      if (!ranked.length) return null;
      return (
        <Section title={`Quick university-wise answers`} tone="cream">
          <ResponsiveTable
            caption={`${family.name} fee and eligibility at a glance`}
            head={["University", "Total fee", "Duration", "Eligibility"]}
            rows={ranked.map((o) => [
              o.universityShortName,
              inr(o.fees.total),
              dash(o.duration),
              trim(o.eligibility, 110),
            ])}
          />
        </Section>
      );
    }
  }
}
