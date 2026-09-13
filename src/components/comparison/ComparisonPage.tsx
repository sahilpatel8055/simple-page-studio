import { ContentSection, DetailLayout } from "@/components/templates/DetailLayout";
import { AuthorBox, References, RelatedLinkGrid, UpdatedStamp } from "@/components/common/Blocks";
import { AppLink } from "@/components/common/AppLink";
import {
  comparableCourses,
  coursePairPath,
  courseSlug,
  feeLabel,
  pairPath,
  pairUniversities,
  relatedPairs,
  type CourseSnapshotSide,
  type PairComparison,
} from "@/lib/comparisonMaster";
import { packFor } from "@/data/comparison-packs";
import { EditorialComparison } from "./EditorialComparison";
import { CompareTable } from "./CompareTable";
import { MatchupHeader } from "./MatchupHeader";
import { DecisionBlock } from "./DecisionBlock";
import { pairDecision } from "@/lib/comparisonDecision";
import { EvidenceModule, SectionAnswer, WhatThisMeans } from "./EvidenceModule";
import { courseKeyForProgramme } from "@/lib/courseMaster";
import { onlineCourseLabel, pairTitle } from "@/lib/comparisonLabels";
import { lastReviewedISO, lastReviewedLabel } from "@/lib/session";

type Row = { label: string; a: React.ReactNode; b: React.ReactNode };

/** Real side-by-side table on every screen; the parameter column stays pinned. */
function CompareRows({
  rows,
  aName,
  bName,
  caption,
}: {
  rows: Row[];
  aName: string;
  bName: string;
  caption: string;
}) {
  return (
    <CompareTable
      caption={caption}
      head={["Parameter", aName, bName]}
      rows={rows.map((r) => [r.label, r.a, r.b])}
    />
  );
}

const list = (items: string[] | undefined, empty: string) =>
  items && items.length > 0 ? items.join(", ") : empty;

const val = (v: string | number | null | undefined, empty = "Not published") =>
  v === null || v === undefined || v === "" ? empty : String(v);

export function ComparisonPage({ pair, course }: { pair: PairComparison; course?: string }) {
  const { a: uniA, b: uniB } = pairUniversities(pair);
  const aName = pair.university_a;
  const bName = pair.university_b;
  const courses = comparableCourses(pair);
  const snapshot = course ? pair.course_snapshots?.[course] : undefined;
  const sa: CourseSnapshotSide | undefined = snapshot?.university_a;
  const sb: CourseSnapshotSide | undefined = snapshot?.university_b;

  /** Hand-researched editorial pack for this course + pair, when we have one. */
  const pack =
    course && uniA?.slug && uniB?.slug
      ? packFor(courseSlug(course), uniA.slug, uniB.slug)
      : undefined;
  const packLinks = pack
    ? [
        { label: `${pack.aLabel} — university profile`, href: `/universities/${pack.aSlug}` },
        { label: `${pack.bLabel} — university profile`, href: `/universities/${pack.bSlug}` },
        {
          label: `Online ${course} — fees, eligibility & universities`,
          href: `/courses/online-${pack.course}`,
        },
        {
          label: `Compare more online ${course} universities`,
          href: `/compare/online-${pack.course}`,
        },
      ]
    : undefined;

  // Some master pairs ship without an editorial `content` block; fall back so SSR never crashes.
  const content = pair.content ?? {
    intro: `A side-by-side look at ${aName} and ${bName} — approvals, fees, specialisations and student support.`,
    angle: `Both ${aName} and ${bName} run UGC-entitled online programmes, so the choice comes down to fee band, specialisation depth and support.`,
    decision_framework: `Shortlist on approvals first, then compare total programme fee, specialisation fit and placement support before applying.`,
    fit_statement: `${aName} suits learners who want its programme mix, while ${bName} works better if its fee band and specialisations match your plan.`,
  };

  const title = pairTitle(aName, bName, course);
  const specWinner =
    (sa?.specialisations?.length ?? 0) === (sb?.specialisations?.length ?? 0)
      ? undefined
      : (sa?.specialisations?.length ?? 0) > (sb?.specialisations?.length ?? 0)
        ? aName
        : bName;

  const faqs = [
    ...(pack?.faqs ?? []),

    {
      question: `${aName} vs ${bName} — which is better${course ? ` for online ${course}` : ""}?`,
      answer: content.fit_statement,
    },
    {
      question: `How should I decide between ${aName} and ${bName}?`,
      answer: content.decision_framework,
    },
    course
      ? {
          question: `What is the ${course} fee at ${aName} and ${bName}?`,
          answer: `${aName}: ${feeLabel(sa, { universitySlug: uniA?.slug, course })}. ${bName}: ${feeLabel(sb, { universitySlug: uniB?.slug, course })}. Every figure is manually researched from the official university website linked in Sources.`,
        }
      : {
          question: `Which courses can I compare across ${aName} and ${bName}?`,
          answer: `Both universities publish: ${list(courses, "no overlapping programmes in this dataset")}.`,
        },
  ];

  /** Answer-first decision block — identical shape on every comparison page. */
  const decision =
    uniA?.slug && uniB?.slug
      ? pairDecision(
          uniA.slug,
          uniB.slug,
          course ? (courseKeyForProgramme(courseSlug(course)) ?? undefined) : undefined,
          course,
        )
      : undefined;

  const decisionRelated = relatedPairs(pair, 3).map((p) => ({
    label: `${p.university_a} vs ${p.university_b}`,
    href: pairPath(p),
  }));



  return (
    <DetailLayout
      crumbs={[
        { name: "Compare", href: "/compare" },
        { name: `${aName} vs ${bName}`, href: pairPath(pair) },
        ...(course ? [{ name: course, href: coursePairPath(pair, course) }] : []),
      ]}
      eyebrow={course ? `${onlineCourseLabel(course)} comparison` : "University comparison"}
      title={title}
      subtitle={content.intro}
      meta={<UpdatedStamp date={lastReviewedISO().slice(0, 10)} verified />}
      tocSections={(pair.comparison_sections ?? []).map((s) => s.heading)}
      faqs={faqs}
      related={
        <RelatedLinkGrid
          groups={[
            {
              title: "Related comparisons",
              links: relatedPairs(pair).map((p) => ({
                label: `${p.university_a} vs ${p.university_b}`,
                href: pairPath(p),
              })),
            },
            ...(courses.length
              ? [
                  {
                    title: "Compare by course",
                    links: courses.map((c) => ({
                      label: `${aName} vs ${bName} — ${c}`,
                      href: coursePairPath(pair, c),
                    })),
                  },
                ]
              : []),
          ]}
        />
      }
    >
      <MatchupHeader
        aName={aName}
        bName={bName}
        uniA={uniA}
        uniB={uniB}
        course={course}
        decision={decision}
        verified={lastReviewedLabel()}
        specWinner={specWinner}
      />

      {/* Course selector */}
      {courses.length > 0 && (
        <div className="mb-6 rounded-xl border border-border bg-secondary/60 p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Compare a specific course
          </p>
          <div className="flex flex-wrap gap-2">
            <AppLink
              to={pairPath(pair)}
              className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                course
                  ? "border-border bg-background"
                  : "border-transparent bg-[#7f1813] text-white"
              }`}
            >
              Overall
            </AppLink>
            {courses.map((c) => (
              <AppLink
                key={courseSlug(c)}
                to={coursePairPath(pair, c)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                  course === c
                    ? "border-transparent bg-[#7f1813] text-white"
                    : "border-border bg-background"
                }`}
              >
                {c}
              </AppLink>
            ))}
          </div>
        </div>
      )}

      {decision && <DecisionBlock decision={decision} related={decisionRelated} />}

      <EvidenceModule
        aName={aName}
        bName={bName}
        reviewed={lastReviewedLabel()}
        gaps={decision?.gaps ?? []}
        sources={[
          ...(sa?.official_source?.programme_url
            ? [{ label: `${aName} official page`, href: sa.official_source.programme_url }]
            : []),
          ...(sb?.official_source?.programme_url
            ? [{ label: `${bName} official page`, href: sb.official_source.programme_url }]
            : []),
          { label: "UGC-DEB entitled list", href: "https://deb.ugc.ac.in/" },
        ]}
      />

      <ContentSection title={`${aName} vs ${bName}: Overview`}>
        <p>{content.angle}</p>
        <p>{content.decision_framework}</p>
      </ContentSection>


      {pack ? (
        <EditorialComparison pack={pack} links={packLinks} />
      ) : (
        <ContentSection title="Quick Comparison">
          <CompareRows
            caption={`${aName} vs ${bName} quick comparison`}
            aName={aName}
            bName={bName}
            rows={[
              { label: "Full name", a: val(uniA?.university_name), b: val(uniB?.university_name) },
              { label: "Location", a: val(uniA?.location), b: val(uniB?.location) },
              { label: "Mode", a: val(uniA?.mode), b: val(uniB?.mode) },
              {
                label: "Programmes tracked",
                a: val(uniA?.programme_count),
                b: val(uniB?.programme_count),
              },
              {
                label: "Overlapping courses",
                a: String(courses.length),
                b: String(courses.length),
              },
              ...(course
                ? [
                    {
                      label: `${course} fee`,
                      a: feeLabel(sa, { universitySlug: uniA?.slug, course }),
                      b: feeLabel(sb, { universitySlug: uniB?.slug, course }),
                    },
                    { label: "Duration", a: val(sa?.duration), b: val(sb?.duration) },
                  ]
                : []),
            ]}
          />
        </ContentSection>
      )}

      <ContentSection title="Courses Offered by Both Universities">
        <SectionAnswer>
          {courses.length > 0
            ? `${aName} and ${bName} both publish ${courses.length} overlapping programme${courses.length === 1 ? "" : "s"}, so a like-for-like comparison is possible on ${courses.slice(0, 3).join(", ")}.`
            : `${aName} and ${bName} publish no overlapping programmes in the verified dataset, so compare them on recognition and fee band instead.`}
        </SectionAnswer>
        <CompareRows
          caption="Degrees available"
          aName={aName}
          bName={bName}
          rows={[
            {
              label: "Degrees published",
              a: list(uniA?.degrees_available, "Not published"),
              b: list(uniB?.degrees_available, "Not published"),
            },
            {
              label: "Programmes tracked",
              a: val(uniA?.programme_count),
              b: val(uniB?.programme_count),
            },
          ]}
        />
        {courses.length > 0 && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {courses.map((c) => (
              <li key={c} className="rounded-lg bg-secondary px-3 py-2 text-sm">
                <AppLink
                  to={coursePairPath(pair, c)}
                  className="font-semibold text-brand hover:underline"
                >
                  {aName} vs {bName} — {c}
                </AppLink>
              </li>
            ))}
          </ul>
        )}
        <WhatThisMeans>
          Shortlist on the programme you actually want. A university with a wider catalogue only
          helps if your course and specialisation are running this session.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Recognition, Accreditation & Mode">
        <SectionAnswer>
          {decision?.recognised?.name === "Both"
            ? `Recognition is comparable: ${decision?.recognised?.detail}`
            : `${decision?.recognised?.name ?? "Neither university"} carries the stronger published approval stack${decision?.recognised?.detail ? ` — ${decision.recognised.detail}` : ""}.`}
        </SectionAnswer>
        <CompareRows
          caption="Recognition"
          aName={aName}
          bName={bName}
          rows={[
            "UGC_status",
            "UGC_DEB_status",
            "NAAC_status",
            "NIRF_information",
            "accreditation",
          ].map((k) => ({
            label: k.replace(/_/g, " ").replace("information", "info"),
            a: val(uniA?.recognition?.[k], "Not published"),
            b: val(uniB?.recognition?.[k], "Not published"),
          }))}
        />
        <WhatThisMeans>
          For jobs, higher study and government recruitment, UGC entitlement for your admission year
          is the fact that matters. Rankings and grades are secondary signals.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Fees & Payment Considerations">
        <SectionAnswer>
          {decision?.cheaper
            ? `${decision.cheaper.name} is cheaper on published figures — ${decision.cheaper.detail}`
            : "Neither university publishes a complete, comparable fee for this comparison, so cost cannot be decided here — ask both for a written break-up."}
        </SectionAnswer>
        {course ? (
          <CompareRows
            caption={`${course} fees`}
            aName={aName}
            bName={bName}
            rows={[
              {
                label: "Total programme fee",
                a: feeLabel(sa, { universitySlug: uniA?.slug, course }),
                b: feeLabel(sb, { universitySlug: uniB?.slug, course }),
              },
              { label: "Fee status", a: val(sa?.fee_status), b: val(sb?.fee_status) },
              { label: "Semesters", a: val(sa?.semesters), b: val(sb?.semesters) },
              { label: "Last updated", a: val(sa?.last_verified), b: val(sb?.last_verified) },
            ]}
          />
        ) : (
          <CompareRows
            caption="Fees by course"
            aName={aName}
            bName={bName}
            rows={courses.map((c) => ({
              label: c,
              a: feeLabel(pair.course_snapshots?.[c]?.university_a, {
                universitySlug: uniA?.slug,
                course: c,
              }),
              b: feeLabel(pair.course_snapshots?.[c]?.university_b, {
                universitySlug: uniB?.slug,
                course: c,
              }),
            }))}
          />
        )}
        {decision?.cost && decision.cost.length > 0 && (
          <div className="mt-4">
            <CompareRows
              caption="Total cost of ownership"
              aName={aName}
              bName={bName}
              rows={decision.cost.map((c) => ({ label: c.label, a: c.a, b: c.b }))}
            />
          </div>
        )}
        <WhatThisMeans>
          Compare the total outgo, not the sticker fee: registration and examination charges and the
          EMI plan decide what leaves your account each month.
        </WhatThisMeans>
        <p className="mt-3 text-sm text-muted-foreground">
          Fees are shown only where the university publishes them. Every figure is manually
          researched from the official university website — confirm on the official page linked
          under Sources.
        </p>
      </ContentSection>

      <ContentSection title="Eligibility & Admission Requirements">
        <SectionAnswer>
          {course
            ? `${aName} asks for ${val(sa?.eligibility, "eligibility it has not published")}; ${bName} asks for ${val(sb?.eligibility, "eligibility it has not published")}.`
            : "Eligibility is set per programme, so pick a course below to see the exact requirement for each university."}
        </SectionAnswer>
        {course ? (
          <CompareRows
            caption="Eligibility"
            aName={aName}
            bName={bName}
            rows={[
              { label: "Eligibility", a: val(sa?.eligibility), b: val(sb?.eligibility) },
              {
                label: "Entrance exam",
                a: val(sa?.entrance_exam, "No entrance exam listed"),
                b: val(sb?.entrance_exam, "No entrance exam listed"),
              },
              { label: "Mode", a: val(sa?.mode), b: val(sb?.mode) },
              { label: "Duration", a: val(sa?.duration), b: val(sb?.duration) },
            ]}
          />
        ) : (
          <p>
            Eligibility is programme-specific. Pick a course above to see the exact eligibility,
            entrance-exam requirement and duration published by each university.
          </p>
        )}
        <WhatThisMeans>
          If one university lists an entrance test and the other does not, your admission timeline
          changes — factor that in before you pay any registration fee.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Specialisations & Curriculum">
        <SectionAnswer>
          {specWinner
            ? `${specWinner} publishes the wider specialisation list for this programme.`
            : course
              ? "Both universities publish a comparable specialisation range for this programme."
              : "Specialisation depth differs by programme — choose a course to compare the actual lists."}
        </SectionAnswer>
        {course ? (
          <CompareRows
            caption="Specialisations"
            aName={aName}
            bName={bName}
            rows={[
              {
                label: "Specialisations",
                a: list(sa?.specialisations, "Not published for this programme"),
                b: list(sb?.specialisations, "Not published for this programme"),
              },
              { label: "Programme name", a: val(sa?.programme_name), b: val(sb?.programme_name) },
            ]}
          />
        ) : (
          <p>Choose a course to see the university-specific specialisations for that programme.</p>
        )}
        <WhatThisMeans>
          A longer list only helps if the one specialisation you want is running. Confirm your
          specialisation is open for this intake before you apply.
        </WhatThisMeans>
        <p className="mt-3 text-sm text-muted-foreground">
          Where a university does not publish a detailed syllabus, treat the common course
          curriculum as a reference structure rather than that university's official syllabus.
        </p>
      </ContentSection>

      <ContentSection title="Admission Process">
        <SectionAnswer>
          Both universities run a fully online admission flow; the practical difference is the
          document check and how quickly LMS access is released.
        </SectionAnswer>
        <ol className="ml-5 list-decimal space-y-1.5">
          <li>Shortlist the exact programme and specialisation on the official university page.</li>
          <li>Check eligibility and keep 10th, 12th, graduation marksheets, ID and photo ready.</li>
          <li>Register on the university admission portal and complete the application form.</li>
          <li>Upload documents and pay the applicable registration or first-semester fee.</li>
          <li>Wait for verification and enrolment confirmation with LMS access.</li>
        </ol>
        <WhatThisMeans>
          Apply early in the intake window: late applications are the usual reason a preferred
          specialisation is no longer available.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Examination Pattern & Assessment">
        <SectionAnswer>
          Both run online proctored end-semester examinations with internal assessment weightage;
          neither publishes a full weightage break-up in this dataset.
        </SectionAnswer>
        <p>
          Both universities assess online learners through a mix of internal assignments/quizzes and
          end-semester examinations conducted online under proctoring. Exact weightage, proctoring
          method and re-appear rules are set by each university for each session — confirm in the
          current student handbook.
        </p>
        <WhatThisMeans>
          If you travel or work shifts, ask whether examinations are slot-based or fixed-date before
          you choose.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Scholarships & Financial Support">
        <SectionAnswer>
          Fee concessions exist at both, but neither publishes a guaranteed amount — treat every
          waiver as conditional until confirmed in writing.
        </SectionAnswer>
        <p>
          Fee support typically appears as merit waivers, defence-personnel and divyangjan
          concessions, single-girl-child or women's scholarships, alumni discounts and no-cost EMI
          plans. Amounts and eligibility change every session, so only the university's current
          published scholarship page should be treated as final.
        </p>
        <WhatThisMeans>
          Ask for the waiver on your written fee quotation. A verbal discount is not a fee
          reduction.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Learning Experience & Student Support">
        <SectionAnswer>
          Both deliver through a self-paced LMS; the real difference is live-session frequency and
          how fast the support desk responds.
        </SectionAnswer>
        <p>
          Expect a self-paced LMS with recorded lectures, live doubt sessions, e-library access,
          discussion forums and a student-support desk. The practical difference between {aName} and{" "}
          {bName} usually lies in live-session frequency, mentor access and how responsive the
          support team is.
        </p>
        <WhatThisMeans>
          Ask for a demo login before paying. Fifteen minutes inside the LMS tells you more than any
          brochure.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Degree & Academic Value">
        <SectionAnswer>
          Both degrees are UGC-entitled online degrees and are treated on par with on-campus degrees
          for employment and higher study.
        </SectionAnswer>
        <p>
          Online degrees from UGC-entitled universities carry the same academic value as their
          on-campus counterparts and are accepted for higher study and employment. The degree
          certificate does not state "online" as a lower-value qualification, though it may record
          the mode of study.
        </p>
        <WhatThisMeans>
          Keep the UGC-DEB entitlement notification for your admission year with your documents —
          that is what recruitment boards and foreign evaluators ask for.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Career Opportunities & Placement Support">
        <SectionAnswer>
          Both publish career assistance, not a placement guarantee, and neither publishes
          online-cohort placement percentages in this dataset.
        </SectionAnswer>
        <p>
          Both universities offer placement or career assistance — resume support, interview
          preparation and access to hiring drives. Career assistance is not a placement guarantee,
          and neither university publishes salary or placement percentages for online cohorts in
          this dataset.
        </p>
        <WhatThisMeans>
          Ask specifically for last session's online-cohort numbers. Institution-wide campus
          placement data does not describe an online programme.
        </WhatThisMeans>
      </ContentSection>

      <ContentSection title="Strengths, Limitations & Fit">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-base font-bold text-foreground">{aName}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {courses.length} overlapping programmes with {bName}
              {course
                ? `; ${course} at ${feeLabel(sa, { universitySlug: uniA?.slug, course })}`
                : ""}
              . Recognition: {val(uniA?.recognition?.["UGC_status"])}.
            </p>
            {decision?.aHref && (
              <AppLink
                to={decision.aHref}
                className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
              >
                View {aName} profile →
              </AppLink>
            )}
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-base font-bold text-foreground">{bName}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {courses.length} overlapping programmes with {aName}
              {course
                ? `; ${course} at ${feeLabel(sb, { universitySlug: uniB?.slug, course })}`
                : ""}
              . Recognition: {val(uniB?.recognition?.["UGC_status"])}.
            </p>
            {decision?.bHref && (
              <AppLink
                to={decision.bHref}
                className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
              >
                View {bName} profile →
              </AppLink>
            )}
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Which University May Suit You?">
        <p>{content.fit_statement}</p>
      </ContentSection>

      <AuthorBox />

      <ContentSection title="Helpful official links">
        <References
          items={[
            ...(sa?.official_source?.programme_url
              ? [
                  {
                    label: `${aName} official programme page`,
                    href: sa.official_source.programme_url,
                  },
                ]
              : []),
            ...(sb?.official_source?.programme_url
              ? [
                  {
                    label: `${bName} official programme page`,
                    href: sb.official_source.programme_url,
                  },
                ]
              : []),
            { label: "UGC-DEB entitled programme list", href: "https://deb.ugc.ac.in/" },
          ]}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: August 2026 (2026-27 session).
        </p>
      </ContentSection>
    </DetailLayout>
  );
}
