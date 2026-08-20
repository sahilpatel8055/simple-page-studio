import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { LegalDocView } from "@/components/common/LegalDoc";
import { CTASection } from "@/components/common/Primitives";
import { privacyDoc as doc } from "@/data/legal";
import { canonical, jsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: pageMeta({ title: doc.metaTitle, description: doc.description, path: doc.path }),
    links: canonical(doc.path),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: doc.label, href: doc.path },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell
      crumbs={[{ name: doc.label, href: doc.path }]}
      eyebrow={doc.label}
      title={doc.title}
      description={doc.description}
    >
      <LegalDocView doc={doc} />
      <div className="mt-16">
        <CTASection />
      </div>
    </PageShell>
  );
}
