import { AppLink } from "@/components/common/AppLink";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { FilterBar, SimplePagination, CTASection } from "@/components/common/Primitives";
import { ReviewCard } from "@/components/cards";
import { WriteReview } from "@/components/common/WriteReview";
import { reviews } from "@/lib/content";
import { canonical, collectionSchema, jsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

const title = "Student Reviews";
const description = "Honest reviews from learners enrolled in online and distance programmes across India.";
const path = "/reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      jsonLd(collectionSchema({ name: title, description, path })),
      jsonLd(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Reviews", href: path }])),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Reviews", href: path }]}
      eyebrow="Student voices"
      title="Student Reviews"
      description={description}
    >
      {reviews.length > 0 ? (
        <>
          <FilterBar groups={[{ label: "Rating", options: ["All", "4.5+", "4.0+", "3.5+"] }]} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((i) => (<ReviewCard key={i.slug} item={i} />))}
          </div>
          <SimplePagination />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-8 text-center">
          <h2 className="font-display text-lg font-bold text-foreground">Learner reviews are coming soon</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            We only publish reviews we can trace back to a real enrolled learner. Collection for the 2026-27 session is
            in progress — meanwhile, compare universities on fees, approvals and curriculum.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <AppLink to="/compare/universities" className="btn btn-primary">Compare universities</AppLink>
            <AppLink to="/courses" className="btn btn-secondary">Browse courses</AppLink>
          </div>
        </div>
      )}
      <div className="mt-14"><WriteReview /></div>
      <div className="mt-16"><CTASection /></div>
    </PageShell>
  );
}
