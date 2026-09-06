import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { offeringProfile } from "@/lib/entities";
import { isCourseSection } from "@/lib/courseSections";
import { UNI_COURSE_SECTION_ANCHORS } from "@/lib/uniCourseAnchors";

/**
 * Legacy section sub-URL. The full section content now lives on the programme
 * pillar page, so this route only issues a permanent redirect to the matching
 * anchor there. Keeping the route (instead of deleting it) preserves the old
 * URLs for search engines and existing backlinks.
 */
export const Route = createFileRoute("/universities/$slug/courses/$course/$section")({
  beforeLoad: ({ params }) => {
    if (!isCourseSection(params.section)) throw notFound();
    const profile = offeringProfile(params.slug, params.course);
    if (!profile) throw notFound();
    throw redirect({
      href: `/universities/${params.slug}/courses/${params.course}#${
        UNI_COURSE_SECTION_ANCHORS[params.section]
      }`,
      statusCode: 301,
れ: undefined,
    });
  },
  component: () => null,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-2xl font-bold">Section not found</h1>
    </div>
  ),
});
