import { DataTable, StepList } from "@/components/common/Blocks";
import { Faq } from "@/components/common/Faq";
import { SpecialisationBoxes } from "@/components/common/BoxMarquee";
import { SectionBannerInline } from "@/components/common/SectionBanner";
import { PlacementSupportSection } from "@/components/university/PlacementSupportSection";
import { getSpecialisation } from "@/data";
import { specLandingPath } from "@/lib/courseFamily";
import {
  AdmissionInsightSection,
  CareerOpportunitiesSection,
  ExaminationPatternSection,
  ScholarshipInsightSection,
} from "@/components/university/InsightSections";
import {
  CurriculumSection,
  MasterFacts,
  ScholarshipCategories,
  SpecialisationElectives,
} from "@/components/university/MasterCourseSections";
import { FeeHighlight } from "@/components/university/FeeHighlight";
import { CareerRolePackages } from "@/components/university/CareerRolePackages";
import { defaultRolesFor } from "@/lib/careerSalaries";
import { getCareerInfo } from "@/lib/insightsData";
import { getUniversityCourse, masterResearchDate } from "@/lib/courseMaster";
import type { CourseSectionKey } from "@/lib/courseSections";
import type { FaqItem } from "@/components/common/Faq";

type Profile = NonNullable<ReturnType<typeof import("@/lib/entities").offeringProfile>>;

/**
 * Body of a single university × course section, shared by the pillar page and
 * the standalone `/universities/{u}/courses/{c}/{section}` page.
 */
export function UniCourseSectionBody({
  section,
  profile,
  faqs,
}: {
  section: CourseSectionKey;
  profile: Profile;
  faqs: FaqItem[];
}) {
  const { offering, university, programme } = profile;
  const u = university.record;
  const p = programme.record;
  const master = getUniversityCourse(u.slug, p.slug);

  switch (section) {
    case "fees":
      return (
        <>
          <FeeHighlight fee={offering.fee} duration={offering.durationLabel} />
          <DataTable
            caption="Fee components"
            head={["Component", "Amount"]}
            rows={[
              ["Programme fee band", p.feeRangeLabel],
              [
                "Total programme fee",
                offering.fee.total
                  ? `₹${offering.fee.total.toLocaleString("en-IN")}`
                  : "Shared by the university on request",
              ],
              [
                "Per semester",
                offering.fee.perSemester
                  ? `₹${offering.fee.perSemester.toLocaleString("en-IN")}`
                  : "Shared by the university on request",
              ],
              [
                "EMI from",
                offering.fee.emiFrom
                  ? `₹${offering.fee.emiFrom.toLocaleString("en-IN")}/month`
                  : "Available via university partners",
              ],
            ]}
          />
          <MasterFacts data={master} universityShort={u.shortName} />
          <p className="text-xs">Research data last reviewed {masterResearchDate}.</p>
        </>
      );
    case "eligibility":
      return (
        <>
          <p>{p.eligibility}</p>
          {master.eligibility && <p>{master.eligibility}</p>}
          <h3 className="pt-2 font-display text-base font-bold text-foreground">Documents required</h3>
          <ul className="list-inside list-disc">
            {u.documentsRequired.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </>
      );
    case "admission":
      return (
        <div className="rounded-2xl border-2 border-brand p-4 sm:p-5">
          <AdmissionInsightSection
            banner={<SectionBannerInline kind="admission" />}
            universitySlug={u.slug}
            universityShort={u.shortName}
            courseSlug={p.slug}
            courseName={`${u.shortName} ${p.shortName}`}
          />
          <div className="mt-5">
            <StepList steps={u.admissionProcess} />
          </div>
        </div>
      );
    case "syllabus":
      return master.course ? (
        <CurriculumSection
          course={master.course}
          universityShort={u.shortName}
          universitySpecificNote={master.curriculumNote}
          {...(master.universityCurriculum
            ? {
                verifiedSource: {
                  sourceLabel: master.universityCurriculum.sourceLabel,
                  sourceUrl: master.universityCurriculum.sourceUrl,
                  verifiedOn: master.universityCurriculum.verifiedOn,
                },
              }
            : {})}
        />
      ) : (
        <div className="space-y-3">
          <p>
            {u.shortName} does not publish a semester-wise subject list for its {p.name} on its
            public pages, so nothing is reproduced here rather than filling the section with a
            generic syllabus copied from another university.
          </p>
          <p>
            What the university does state for this programme: a{" "}
            {offering.durationLabel || p.durationYears + "-year"} duration
            {p.level ? `, ${p.level} level` : ""}, delivered in{" "}
            {p.mode.join(" / ").toLowerCase()} mode, with {p.eligibility.toLowerCase()} The
            examination pattern and assessment weightage for this course are covered in the exam
            pattern section of this page.
          </p>
          <p>
            The detailed syllabus is shared in the {u.shortName} prospectus and inside the learning
            management system after enrolment
            {u.websiteUrl ? (
              <>
                {" "}— you can request the current copy from the official site at{" "}
                <a
                  href={u.websiteUrl}
                  target="_blank"
                  rel="nofollow noopener"
                  className="font-semibold text-brand hover:underline"
                >
                  {u.websiteUrl.replace(/^https?:\/\//, "")}
                </a>
              </>
            ) : null}
            . We update this section the moment {u.shortName} publishes a semester table.
          </p>
        </div>
      );
    case "specialisations":
      return (
        <>
          <SpecialisationBoxes
            scrolling
            label={`${p.name} specialisations at ${u.shortName}`}
            items={offering.specialisations.map((s) => {
              const spec = getSpecialisation(p.slug, s);
              return {
                name: spec?.name ?? s,
                href: specLandingPath(p.slug, spec?.name ?? s),
                meta: spec?.careerPaths.slice(0, 2).join(", ") || undefined,
              };
            })}
          />
          {master.course && (
            <SpecialisationElectives
              course={master.course}
              universitySpecialisations={master.specialisations}
              universityShort={u.shortName}
            />
          )}
        </>
      );
    case "exam-pattern":
      return (
        <>
          <ExaminationPatternSection
          banner={<SectionBannerInline kind="examination" />}
          universitySlug={u.slug}
          universityShort={u.shortName}
          courseSlug={p.slug}
            courseName={`${u.shortName} ${p.shortName}`}
          />
        </>
      );
    case "placement":
      return (
        <>
          <PlacementSupportSection universitySlug={u.slug} universityShort={u.shortName} />
          <CareerRolePackages
            roles={
              getCareerInfo(u.slug, p.slug)?.data.roles?.length
                ? getCareerInfo(u.slug, p.slug)!.data.roles!
                : Array.from(
                    new Set(
                      offering.specialisations.flatMap(
                        (s) => getSpecialisation(p.slug, s)?.careerPaths ?? [],
                      ),
                    ),
                  ).slice(0, 10)
            }
            fallbackRoles={defaultRolesFor(p.slug)}
            universitySlug={u.slug}
            universityShort={u.shortName}
          />
          <CareerOpportunitiesSection
            universitySlug={u.slug}
            universityShort={u.shortName}
            courseSlug={p.slug}
            courseName={`${u.shortName} ${p.shortName}`}
          />
        </>
      );
    case "scholarships":
      return (
        <>
          <ScholarshipCategories
            scholarships={master.scholarships}
            note={master.scholarshipNote}
            universityShort={u.shortName}
          />
          <ScholarshipInsightSection
            universitySlug={u.slug}
            universityShort={u.shortName}
            courseSlug={p.slug}
            courseName={`${u.shortName} ${p.shortName}`}
          />
        </>
      );
    case "faq":
      return <Faq items={faqs} title={`${u.shortName} ${p.shortName} FAQs`} />;
  }
}