import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { CTASection } from "@/components/common/Primitives";
import { LeadCaptureCard } from "@/components/common/Sidebar";
import { canonical, jsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";
import { submitLead } from "@/lib/leads";
import { savePartialLead } from "@/lib/leadContext";

const title = "Contact & Free Admission Guidance";
const description =
  "Talk to an Degreekhojo counsellor about eligibility, fees and university shortlisting — free of cost.";
const path = "/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: path },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Contact", href: path }]}
      eyebrow="Contact"
      title={title}
      description={description}
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={(e) => {
            const data = new FormData(e.currentTarget);
            e.preventDefault();
            const name = String(data.get("name") ?? "");
            const email = String(data.get("email") ?? "");
            const phone = String(data.get("phone") ?? "");
            savePartialLead({ name, email, phone });
            void submitLead({
              name,
              email,
              phone,
              form: "Contact page form",
              note: String(data.get("message") ?? "").slice(0, 200),
            });
            e.currentTarget.reset();
          }}
          className="surface-card space-y-4 p-7"
        >
          {[
            ["Full name", "text", "name"],
            ["Email address", "email", "email"],
            ["Phone number", "tel", "phone"],
          ].map(([label, type, fieldName]) => (
            <div key={label}>
              <label className="mb-1.5 block text-sm font-medium" htmlFor={label}>
                {label}
              </label>
              <input
                id={label}
                name={fieldName}
                required
                type={type}
                className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-brand"
                placeholder={label}
              />
            </div>
          ))}
          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="msg">
              How can we help?
            </label>
            <textarea
              id="msg"
              name="message"
              rows={4}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-brand"
              placeholder="Tell us about your background and goal"
            />
          </div>
          <button
            type="submit"
            className="h-11 w-full rounded-full bg-brand text-sm font-semibold text-brand-foreground"
          >
            Request callback
          </button>
        </form>
        <LeadCaptureCard title="Prefer a quick call?" />
      </div>
      <div className="mt-16">
        <CTASection />
      </div>
    </PageShell>
  );
}
