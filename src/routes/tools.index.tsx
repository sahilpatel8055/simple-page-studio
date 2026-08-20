import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { CTASection } from "@/components/common/Primitives";
import { ToolCard } from "@/components/cards";
import { tools } from "@/lib/content";
import {
  canonical,
  collectionSchema,
  itemListSchema,
  jsonLd,
  pageMeta,
  breadcrumbSchema,
} from "@/lib/seo";

const title = "Free Student Tools & Calculators";
const description =
  "Fee & EMI calculator, degree ROI estimator and a salary-after-course projector built on verified 2026-27 university fee data.";
const path = "/tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      jsonLd(collectionSchema({ name: title, description, path })),
      jsonLd(
        itemListSchema(
          tools.map((t) => ({ name: t.name, href: t.to ?? path })),
          title,
        ),
      ),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Tools", href: path },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Tools", href: path }]}
      eyebrow="Utilities"
      title="Free Student Tools & Calculators"
      description={description}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((i) => (
          <ToolCard key={i.slug} item={i} />
        ))}
      </div>
      <div className="mt-16">
        <CTASection />
      </div>
    </PageShell>
  );
}
