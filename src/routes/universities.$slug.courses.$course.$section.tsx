import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { offeringProfile } from "@/lib/entities";
import { isCourseSection } from "@/lib/courseSections";

/**
 * Legacy section sub-URL. The full section content now lives on the programme
 * pillar page, so this route only issues a permanent redirect to the parent
 * canonical URL. No fragment is used: fragments are client-side only and are
 * never sent to the server, so the redirect target must be the clean canonical
 * pillar URL. The pillar itself carries the matching anchor section.
 */
export const Route = createFileRoute("/universities/$slug/courses/$course/$section")({
  beforeLoad: ({ params }) => {
    if (!isCourseSection(params.section)) throw notFound();
    const profile = offeringProfile(params.slug, params.course);
    if (!profile) throw notFound();
    throw redirect({
      href: `/universities/${params.slug}/courses/${params.course}`,
      statusCode: 301,
    });
  },

  component: () => null,
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-2xl font-bold">Section not found</h1>
    </div>
  ),
});
