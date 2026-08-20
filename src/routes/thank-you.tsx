import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock,
  GraduationCap,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { courseFamilies, articles, universities } from "@/lib/content";
import { universityLogo } from "@/lib/assets";
import { AVEDU_PHONE, AVEDU_WHATSAPP } from "@/components/common/ContactQuickMenu";
import { trackContactClick } from "@/lib/leads";
import { canonical, pageMeta } from "@/lib/seo";

const title = "Thank You — Your Counselling Request Is Confirmed";
const description =
  "Your free counselling request has reached the DegreeKhojo desk. While you wait for the call, compare universities, check fees and read verified admission guides.";
const path = "/thank-you";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    // Confirmation page: valuable to users, not to search — keep it out of the index.
    meta: pageMeta({ title, description, path, noindexFollow: true }),
    links: canonical(path),
  }),
  component: Page,
});

const STEPS = [
  {
    icon: Phone,
    title: "A counsellor calls you",
    body: "Usually within 30 minutes during 10 AM – 7 PM, else first thing next morning.",
  },
  {
    icon: GraduationCap,
    title: "You get a matched shortlist",
    body: "3–5 UGC-entitled universities picked for your course, budget and goal.",
  },
  {
    icon: ShieldCheck,
    title: "Verified fees & approvals",
    body: "Exact fee structure, EMI options and scholarships — in writing, no surprises.",
  },
];

function Page() {
  const topCourses = courseFamilies.slice(0, 6);
  const topUniversities = universities.slice(0, 8);
  const reads = articles.slice(0, 3);

  return (
    <main className="bg-background">
      {/* Confirmation banner */}
      <section className="border-b border-border bg-gradient-to-br from-[#fdf3f3] via-background to-[#fbeaea]">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:py-16">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#7f1813] text-white">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Thank you — your counselling session is booked
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your request has reached our admission desk. A DegreeKhojo counsellor will call you shortly with a
            university shortlist, verified fees and the scholarships you qualify for.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a
              href={`https://wa.me/${AVEDU_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("WhatsApp", "Thank you page")}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#128C7E] px-6 text-sm font-bold text-white sm:w-auto"
            >
              <img src="/whatsapp-icon.png" alt="" className="h-5 w-5 object-contain" /> Get an instant reply on
              WhatsApp
            </a>
            <a
              href={`tel:${AVEDU_PHONE}`}
              onClick={() => trackContactClick("Call", "Thank you page")}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#7f1813]/30 bg-card px-6 text-sm font-bold text-[#7f1813] sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> Call us now
            </a>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Counsellors online · Mon–Sat, 10 AM – 7 PM
          </p>
        </div>
      </section>

      {/* What happens next */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">What happens next</h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-brand">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-base font-bold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Keep exploring — courses */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
            While you wait, explore your options
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Verified fees, eligibility and specialisations for India&apos;s most-applied online degrees.
          </p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {topCourses.map((c) => (
              <AppLink
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <span className="truncate">{c.displayName}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </AppLink>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <AppLink
              to="/compare/universities"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-bold text-brand-foreground"
            >
              <GraduationCap className="h-4 w-4" aria-hidden="true" /> Compare universities
            </AppLink>
            <AppLink
              to="/tools/fee-emi-calculator"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-foreground"
            >
              <Calculator className="h-4 w-4" aria-hidden="true" /> Fee &amp; EMI calculator
            </AppLink>
            <AppLink
              to="/scholarships"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold text-foreground"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Check scholarships
            </AppLink>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
          Universities students shortlist most
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {topUniversities.map((u) => {
            const logo = universityLogo(u.slug);
            return (
              <AppLink
                key={u.slug}
                to={`/universities/${u.slug}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3.5 text-center transition-colors hover:border-brand"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={`${u.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-auto max-w-[6rem] object-contain"
                  />
                ) : (
                  <span className="text-sm font-extrabold text-brand">{u.shortName}</span>
                )}
                <span className="line-clamp-2 text-xs font-semibold text-foreground">{u.name}</span>
              </AppLink>
            );
          })}
        </div>
      </section>

      {/* Reading */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
            Read before your call
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {reads.map((a) => (
              <AppLink
                key={a.slug}
                to={`/blogs/${a.slug}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand"
              >
                <BookOpen className="h-5 w-5 text-brand" aria-hidden="true" />
                <h3 className="mt-3 text-base font-bold leading-snug text-foreground">{a.title}</h3>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  Read guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
