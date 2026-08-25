import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { CTASection } from "@/components/common/Primitives";
import { CourseExplorer } from "@/components/common/Filters";
import { RelatedLinkGrid } from "@/components/common/Blocks";
import { courseFamilies } from "@/lib/content";
import { canonicalProgrammeLinks } from "@/lib/programmeDirectory";
import { articleLinks, comparisonLinks, scholarshipLinks, universityLinks } from "@/lib/entities";

import {
  breadcrumbSchema,
  canonical,
  collectionSchema,
  itemListSchema,
  jsonLd,
  pageMeta,
  webPageSchema,
} from "@/lib/seo";

const title = "Online Degree Courses in India: UG & PG Programmes 2026";
const description =
  "Programme guides for online MBA, MCA, BBA, BCA, B.Com and M.Com — duration, fee range, specialisations, eligibility and every university that offers them.";
const path = "/courses";
const allProgrammeLinks = canonicalProgrammeLinks();


export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: pageMeta({
      title,
      description,
      path,
      keywords: ["online courses India", "online MBA", "online BCA", "UG PG online degrees"],
    }),
    links: canonical(path),
    scripts: [
      jsonLd(collectionSchema({ name: title, description, path })),
      jsonLd(webPageSchema({ name: title, description, path })),
      jsonLd(
        itemListSchema(
          courseFamilies.map((c) => ({ name: c.displayName, href: `/courses/${c.slug}` })),
          "Online degree programmes",
        ),
      ),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Courses", href: path },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Courses", href: path }]}
      eyebrow="Programmes"
      title="Online Degree Courses & Programmes"
      description={description}
    >
      <CourseExplorer items={courseFamilies} />
      <section className="mt-12" aria-labelledby="all-programmes">
        <h2 id="all-programmes" className="text-lg font-semibold tracking-tight text-foreground">
          All online programmes A–Z
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every UG, PG and diploma programme covered on Degreekhojo, with fees, eligibility and the
          universities that offer it.
        </p>
        <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {allProgrammeLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-12">
        <RelatedLinkGrid
          groups={[
            { title: "Top universities", links: universityLinks() },
            { title: "Course comparisons", links: comparisonLinks() },
            { title: "Scholarships", links: scholarshipLinks() },
            { title: "Guides", links: articleLinks(4) },
          ]}
        />
      </div>

      <div className="mt-12">
        <CTASection />
      </div>
    </PageShell>
  );
}
