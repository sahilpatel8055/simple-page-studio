import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { CTASection } from "@/components/common/Primitives";
import { AccentHeadline } from "@/components/common/Headline";
import { CheckCircle2 } from "lucide-react";
import { GrowthChart } from "@/components/common/GrowthChart";
import { canonical, jsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

const title = "About DegreeKhojo";
const description = "We research India’s online and distance education market so learners can choose a degree on evidence, not advertising.";
const path = "/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [jsonLd(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: path }]))],
  }),
  component: Page,
});

const values = [
  {
    title: "Independent Research",
    body: "We do not take money to rank universities. Every comparison is built from official approvals, published fees and verified learner outcomes.",
  },
  {
    title: "Learner-First Guidance",
    body: "Our counsellors recommend what fits your career goal and budget — even if that means saying ‘don’t enrol’ when a programme is not right.",
  },
  {
    title: "Verified Facts",
    body: "Fees, eligibility and accreditation data are traced to university pages and UGC-DEB records, then re-checked each admission cycle.",
  },
];

function Page() {
  return (
    <PageShell crumbs={[{ name: "About", href: path }]} eyebrow="About" title={title} description={description}>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-[#060606] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060606] via-[#0f172a] to-[#7f1813]/30" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#7f1813]/20 blur-3xl" />
        <div className="relative container-page grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7f1813]">Discover Our Story</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              Meet The <span className="text-[#7f1813]">Movers</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              DegreeKhojo is an independent education research platform. We help working professionals and students in India find the right online or distance degree — without the sales pitch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/counselling"
                className="inline-flex items-center justify-center rounded-xl bg-[#7f1813] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7f1813]/90"
              >
                Talk to an advisor
              </a>
              <a
                href="/universities"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Explore universities
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <img
              src="/banner-girl.png"
              alt="DegreeKhojo advisor helping a learner choose an online degree"
              className="relative z-10 mx-auto w-full max-w-sm drop-shadow-2xl lg:max-w-md"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-[#060606] sm:text-4xl">
            <AccentHeadline text="Time To Level Up! Let's Start Hustlin'" />
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#060606]/70">
            There are hundreds of online degrees in India today — but finding the right one is still hard. Marketing claims hide weak approvals, fee breakdowns are buried in PDFs, and counsellors often push the programme that pays them the most.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#060606]/70">
            We built DegreeKhojo to fix that. Our team researches universities, verifies fees and approvals, and publishes what we find — so you can compare programmes with confidence and enrol in the degree that actually moves your career forward.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: "UGC-approved universities", value: "50+" },
              { label: "Programmes covered", value: "200+" },
              { label: "Learners counselled", value: "10,000+" },
              { label: "Cities served", value: "Across India" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-2xl font-extrabold text-[#7f1813]">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#7f1813]/10 blur-3xl" />
          <div className="relative z-10">
            <GrowthChart />
          </div>
        </div>
      </section>

      {/* Meet the squad */}
      <section className="mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-xl">
            <img
              src="/experts.png"
              alt="DegreeKhojo education experts and admission counsellors"
              className="h-full w-full rounded-2xl object-cover"
              width={1280}
              height={912}
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-[#7f1813] p-4 text-white shadow-lg">
              <p className="text-sm font-bold">Source-First Research</p>
              <p className="text-xs text-white/80">Every fact traced to official records</p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Who we are</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#060606] sm:text-4xl">
            <AccentHeadline text="Meet the Squad. Here's the Scoop on Us" />
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#060606]/70">
            We are a mix of education researchers, data analysts and former admission counsellors. Some of us have worked inside universities; others have spent years helping learners pick the right course. Together, we are building the most transparent education discovery platform in India.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              "Shortlist UGC-approved online and distance universities",
              "Get expert, unbiased guidance from real advisors",
              "Compare fees, approvals and placement support side by side",
              "Enrol with confidence with verified facts",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#7f1813]" />
                <span className="text-[#060606]/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="mt-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Our principles</p>
          <h2 className="mt-3 text-3xl font-bold text-[#060606] sm:text-4xl">
            <AccentHeadline text="What Makes Us Different" />
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="surface-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#7f1813]/10 text-[#7f1813]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#060606]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#060606]/70">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-24">
        <CTASection />
      </div>
    </PageShell>
  );
}
