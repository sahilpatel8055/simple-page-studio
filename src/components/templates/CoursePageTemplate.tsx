import { ActionRow } from "@/components/common/ActionRow";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionTabs, SectionPanel } from "@/components/common/SectionTabs";
import { Faq } from "@/components/common/Faq";
import { LeadCaptureCard, TrustCard } from "@/components/common/Sidebar";
import { AppLink } from "@/components/common/AppLink";
import { QuickEnquiry } from "@/components/common/QuickEnquiry";
import { WriteReview } from "@/components/common/WriteReview";
import { SectionBanner } from "@/components/common/SectionBanner";
import { BlogStrip } from "@/components/common/UniversityBlogs";
import { blogsForCourse } from "@/data/university-blogs";
import { COURSE_GROUPS } from "@/lib/pageGroups";
import { AnswerFirst } from "@/components/university/AnswerFirst";
import { CollapsibleProse } from "@/components/common/CollapsibleProse";
import { QuestionBlock } from "@/components/common/QuestionBlock";
import { TopFeeSnapshot } from "@/components/course/TopFeeSnapshot";
import { FutureOutlook } from "@/components/course/FutureOutlook";
import { familyQuestions, familyVerdict } from "@/lib/pageVerdict";


import { CompareUniversities } from "@/components/course/CompareUniversities";
import {
  AudienceCards,
  ChipList,
  FeeSummaryTable,
  FinalCta,
  GlanceTable,
  InfoBoxGrid,
  LinkTiles,
  Note,
  PlatformTrust,
  Prose,
  QuickFactGrid,
  ReviewList,
  Section,
  SideBySideTable,
  SpecialisationShowcase,
  StepFlow,
  SyllabusGrid,
  TickList,
  TwoColumnLists,
  UniversityTileGrid,
  type CourseReview,
} from "@/components/course/CourseSections";
import { PromoBanner } from "@/components/course/PromoBanner";
import { PubPillarGuidance } from "@/components/pub/PubBlocks";
import type { CourseContent } from "@/data/course-pages/types";
import type { CourseFamily } from "@/lib/courseFamily";

/**
 * The reusable course page. Everything is driven by `family` (dataset) and
 * `content` (editorial), so MBA, MCA, BBA, BCA, M.Com and MA all render from
 * this one template.
 *
 * Sections are grouped into eight tabs (see `COURSE_GROUPS`); every group stays
 * in the served HTML and inactive ones are hidden with CSS only.
 */
export function CoursePageTemplate({
  family,
  content,
  year,
  reviews = [],
  relatedCourses,
  relatedArticles,
}: {
  family: CourseFamily;
  content: CourseContent;
  year: number;
  reviews?: CourseReview[];
  relatedCourses: { label: string; href: string; note?: string | undefined }[];
  relatedArticles: { label: string; href: string; note?: string | undefined }[];
}) {
  const h1 = content.seo.h1.replace("{year}", String(year)).replace("{course}", family.name);

  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-cream">
        <div className="container-page py-6 sm:py-10">
          <Breadcrumbs
            items={[
              { name: "Courses", href: "/courses" },
              { name: family.name, href: family.path },
            ]}
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {family.level === "PG" ? "Postgraduate" : "Undergraduate"} · {family.degreeName}
          </p>
          <h1 className="mt-2 max-w-4xl font-display text-[1.6rem] font-bold leading-tight sm:text-4xl">
            {h1}
          </h1>
          <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-muted-foreground">
            {content.intro}
          </p>

          <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.78rem] font-semibold text-muted-foreground">
            <li>{family.offers.length} universities tracked</li>
            <li aria-hidden="true">·</li>
            <li>Fees stated by the university</li>
            <li aria-hidden="true">·</li>
            <li>No sponsored ranking</li>
          </ul>

          <div className="mt-5 max-w-xl">
            <QuickEnquiry
              heading="Take a step towards your"
              highlight={`${family.shortName} career`}
            />
          </div>

          <div className="mt-5">
            <ActionRow
              waMessage={`Hi, please share ${family.shortName} fees, eligibility and EMI options.`}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-start gap-2.5">
            <a href="#universities" className="btn btn-primary">
              Explore universities
            </a>
            <a href="#compare-universities" className="btn btn-secondary">
              Compare universities
            </a>
            <AppLink to="/contact" className="btn btn-ghost">
              Get free counselling
            </AppLink>
          </div>

          <div className="mt-6">
            <QuickFactGrid
              items={[
                { label: "Duration", value: family.durationLabel },
                { label: "Mode", value: "100% Online" },
                {
                  label: "Eligibility",
                  value: family.level === "PG" ? "Bachelor's degree" : "10+2 or equivalent",
                },
                { label: "Fee range", value: family.feeRangeLabel },
                {
                  label: "Specialisations",
                  value: family.specialisations.length
                    ? `${family.specialisations.length} tracked`
                    : "University dependent",
                },
                { label: "Learning", value: "Live + recorded" },
              ]}
            />
          </div>
        </div>
      </div>

      <SectionTabs groups={COURSE_GROUPS}>
        <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <main className="min-w-0">
            {/* 1 — Overview */}
            <SectionPanel id="overview">
              <AnswerFirst
                heading={`All about ${family.name}: fees, eligibility, admission, syllabus, specialisations and placements`}
                answer={familyVerdict(family)}
                facts={[
                  { label: "Fee range", value: family.feeRangeLabel },
                  { label: "Duration", value: family.durationLabel },
                  {
                    label: "Eligibility",
                    value: family.level === "PG" ? "Bachelor's degree" : "10+2 or equivalent",
                  },
                  { label: "Universities", value: String(family.offers.length) },
                ]}
                {...(family.lastVerified ? { verifiedOn: family.lastVerified } : {})}
              />

              <TopFeeSnapshot
                offers={family.offers}
                courseName={family.name}
                feesHref={`${family.path}/fees`}
              />

              <QuestionBlock
                heading={`${family.name}: the questions people actually ask`}
                questions={familyQuestions(family)}
              />

              <Section title={`${family.name} at a glance`} tone="cream">

                <GlanceTable
                  rows={[
                    { parameter: "Course", detail: family.name },
                    {
                      parameter: "Level",
                      detail: family.level === "PG" ? "Postgraduate" : "Undergraduate",
                    },
                    { parameter: "Duration", detail: family.durationLabel },
                    {
                      parameter: "Semesters",
                      detail: family.semesters ? String(family.semesters) : "University dependent",
                    },
                    { parameter: "Mode", detail: "Online" },
                    {
                      parameter: "Eligibility",
                      detail:
                        family.level === "PG"
                          ? "Bachelor's degree from a recognised institution"
                          : "10+2 or equivalent",
                    },
                    {
                      parameter: "Entrance exam",
                      detail: family.entranceUniversities.length
                        ? "University dependent"
                        : "Not published by the universities tracked here",
                    },
                    { parameter: "Fee range", detail: family.feeRangeLabel },
                    { parameter: "Learning", detail: "Live classes + recorded lectures" },
                    { parameter: "Assessment", detail: "University dependent" },
                    {
                      parameter: "Specialisations",
                      detail: family.specialisations.length
                        ? `${family.specialisations.length} across ${family.offers.length} universities`
                        : "University dependent",
                    },
                    {
                      parameter: "Suitable for",
                      detail:
                        family.level === "PG"
                          ? "Graduates and working professionals"
                          : "Students and early-career learners",
                    },
                  ]}
                />
              </Section>

              <Section title="Overview">
                <CollapsibleProse paragraphs={content.overview} visible={2} />
              </Section>

              <Section title="Who should consider it">
                <AudienceCards items={content.audience} />
              </Section>

              <Section title="Who it may not suit">
                <TickList items={content.worthItNo} />
              </Section>

              <FutureOutlook courseName={family.name} shortName={family.shortName} />
            </SectionPanel>

            {/* 2 — Universities & Fees */}
            <SectionPanel id="universities-fees">
              <Section
                title="Universities"
                intro={`${family.offers.length} universities in our dataset publish ${family.name}. Figures below are what each university states officially — nothing is estimated.`}
                tone="tint"
              >
                <UniversityTileGrid offers={family.offers} />
              </Section>

              <Section title="Fees" intro={content.feeNotes[0]} tone="cream">
                <ul className="mb-5 space-y-2">
                  {content.feeNotes.slice(1).map((n) => (
                    <li key={n} className="text-[0.86rem] leading-relaxed text-muted-foreground">
                      • {n}
                    </li>
                  ))}
                </ul>
                <FeeSummaryTable offers={family.offers} />
              </Section>

              <PromoBanner
                variant="offer"
                title="Save big on your dream university"
                subtitle="Ask us about live scholarship and early-admission fee waivers before you pay the first instalment."
                ctaLabel="Claim now"
              />

              <Section
                title="Compare universities"
                intro="Pick the universities you are shortlisting and compare them field by field."
                tone="tint"
              >
                <CompareUniversities family={family} />
              </Section>
            </SectionPanel>

            {/* 3 — Eligibility & Admission */}
            <SectionPanel id="eligibility-admission">
              <Section title="Eligibility" intro="Check the basic requirements before you apply.">
                <InfoBoxGrid items={content.eligibility} />
                <Note>{content.eligibilityNote}</Note>
              </Section>

              <Section title="Documents">
                <TickList items={content.documents} />
                <Note>{content.documentsNote}</Note>
              </Section>

              <Section title="Admission" tone="cream">
                <SectionBanner kind="admission" />
                <StepFlow steps={content.admissionSteps} />
              </Section>

              <Section title="How it works">
                <StepFlow steps={content.howItWorks} />
              </Section>
            </SectionPanel>

            {/* 4 — Syllabus & Specialisations */}
            <SectionPanel id="syllabus-specialisations">
              <Section
                title="Specialisations"
                intro={
                  family.specialisations.length
                    ? `Specialisations published by the universities offering ${family.name}. Each links to the universities that run it.`
                    : undefined
                }
              >
                {family.specialisations.length ? (
                  <SpecialisationShowcase items={family.specialisations} courseSlug={family.slug} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No specialisation list has been published by the universities tracked for this
                    course yet.
                  </p>
                )}
              </Section>

              {content.syllabus.length > 0 && (
                <Section title="Curriculum" tone="mint">
                  <SyllabusGrid semesters={content.syllabus} />
                  <Note>{content.syllabusNote}</Note>
                </Section>
              )}

              <Section title="Learning & exams">
                <InfoBoxGrid items={content.learningFormat} />
                <Note>{content.learningNote}</Note>
                <div className="mt-6">
                  <h3 className="font-display text-base font-bold">Examination pattern</h3>
                  <div className="mt-3">
                    <SectionBanner kind="examination" />
                    <InfoBoxGrid items={content.examPattern} />
                  </div>
                  <Note>{content.examNote}</Note>
                </div>
              </Section>
            </SectionPanel>

            {/* 5 — Career & Salary */}
            <SectionPanel id="career-salary">
              <Section title="Career" tone="mint">
                {content.careers.length ? (
                  <InfoBoxGrid items={content.careers} />
                ) : (
                  <ChipList
                    items={[...new Set(family.offers.flatMap((o) => o.careerRoles))].slice(0, 12)}
                  />
                )}
                <div className="mt-6">
                  <h3 className="font-display text-base font-bold">Industries and career areas</h3>
                  <div className="mt-3">
                    <ChipList
                      items={
                        content.industries.length
                          ? content.industries
                          : [...new Set(family.offers.flatMap((o) => o.industries))]
                      }
                    />
                  </div>
                </div>
              </Section>

              <Section title="Salary">
                <TickList items={content.salaryFactors} />
                <Note>{content.salaryNote}</Note>
              </Section>

              <Section title="Placement support">
                <SectionBanner kind="placement" />
                <InfoBoxGrid items={content.placementServices} />
                <Note>{content.placementNote}</Note>
              </Section>
            </SectionPanel>

            {/* 6 — Validity & Worth It */}
            <SectionPanel id="validity-worth-it">
              <Section title="Validity" tone="cream">
                <Prose paragraphs={content.recognition} />
                <div className="mt-5">
                  <h3 className="font-display text-base font-bold">How to verify before you pay</h3>
                  <div className="mt-3">
                    <TickList items={content.verifyChecklist} />
                  </div>
                </div>
              </Section>

              <Section title="Advantages & limitations">
                <TwoColumnLists
                  left={{ title: "Advantages", items: content.advantages }}
                  right={{ title: "Limitations", items: content.limitations }}
                />
              </Section>

              <Section title="Is it worth it" tone="cream">
                <TwoColumnLists
                  left={{ title: "It can be worth it when", items: content.worthItYes }}
                  right={{ title: "It may not suit you if", items: content.worthItNo }}
                />
              </Section>

              <Section title={`${family.name} vs regular`}>
                <SideBySideTable
                  caption={`${family.name} compared with a regular campus programme`}
                  head={["Factor", family.name, `Regular ${family.shortName}`]}
                  rows={content.vsRegular.map((r) => [r.factor, r.online, r.regular])}
                />
              </Section>

              <Section title={`${family.name} vs distance`}>
                <SideBySideTable
                  caption={`${family.name} compared with the distance mode`}
                  head={["Factor", family.name, `Distance ${family.shortName}`]}
                  rows={content.vsDistance.map((r) => [r.factor, r.online, r.distance])}
                />
              </Section>

              <Section title="How to choose" tone="tint">
                <InfoBoxGrid items={content.selectionGuide} />
              </Section>

              <Section title={`Why compare ${family.name} here`}>
                <PlatformTrust family={family} />
              </Section>

              <Section title="How to compare universities for this course">
                <PubPillarGuidance familySlug={family.slug} />
              </Section>
            </SectionPanel>

            {/* 7 — Reviews */}
            <SectionPanel id="reviews">
              <Section title="Reviews">
                <ReviewList reviews={reviews} />
                <div className="mt-6">
                  <WriteReview />
                </div>
              </Section>
            </SectionPanel>

            {/* 8 — FAQs */}
            <SectionPanel id="faqs">
              <section id="faqs-block" className="scroll-mt-36">
                <Faq items={content.faqs} title={`${family.name} FAQs`} />
              </section>

              {blogsForCourse(family.shortName).length > 0 && (
                <Section title={`${family.name} guides & articles`}>
                  <BlogStrip
                    items={blogsForCourse(family.shortName, 6)}
                    title={`${family.shortName} articles`}
                    intro={`University-published research and guides relevant to ${family.name}.`}
                  />
                </Section>
              )}

              <Section title="Related courses">
                <LinkTiles links={relatedCourses} />
                {relatedArticles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-display text-base font-bold">Related reading</h3>
                    <div className="mt-3">
                      <LinkTiles links={relatedArticles} />
                    </div>
                  </div>
                )}
              </Section>

              <PromoBanner
                variant="guidance"
                title={`Not sure which ${family.shortName} fits you?`}
                subtitle="Get a free shortlist based on your budget, work schedule and career goal — no cost, no obligation."
                ctaLabel="Talk to a counsellor"
              />

              <FinalCta family={family} />
            </SectionPanel>
          </main>

          <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
            <LeadCaptureCard title={`Get free ${family.name} guidance`} />
            <TrustCard />
          </aside>
        </div>
      </SectionTabs>
    </>
  );
}
