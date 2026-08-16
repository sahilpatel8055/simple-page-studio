import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { CTASection } from "@/components/common/Primitives";
import { AppLink } from "@/components/common/AppLink";
import { Faq } from "@/components/common/Faq";
import { courseSalaryBaselines, projectedBand, INR } from "@/lib/calculators";
import { universityPlacementFacts } from "@/data/university-placement-facts";
import { canonical, faqSchema, jsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

const title = "Salary After Course Calculator — Online UG & PG Degrees";
const description =
  "Project your indicative salary band after an online MBA, MCA, BBA, BCA, B.Com, M.Com, BA, MA or M.Sc, using experience, city tier and the packages universities publish in their own placement documents.";
const path = "/tools/salary-after-course";

const faqs = [
  {
    question: "How is the projected salary band calculated?",
    answer:
      "We start from an indicative band for the course, weight it by the work experience you enter, then apply a city-tier factor and a factor for whether you continue in the same function or switch roles. The output is a range, never a single guaranteed number.",
  },
  {
    question: "Where do the reported university packages come from?",
    answer:
      "From the placement and approval documents each university publishes, which we have read and summarised on this site — for example LPU reports a highest package of INR 23 LPA and a top-decile average of INR 12.19 LPA. Those figures describe the university's whole learner base, not a promise for any individual.",
  },
  {
    question: "Does an online degree pay the same as an on-campus degree?",
    answer:
      "For working professionals, pay is driven mainly by role, experience and employer. A UGC-entitled online degree unlocks eligibility for promotions and PG-required roles; freshers with no work history usually start lower than campus-placed peers because they lack the campus recruitment channel.",
  },
  {
    question: "Which online course gives the biggest salary jump?",
    answer:
      "In our bands, an online MBA and an online MCA show the largest uplift for candidates who already have two or more years of experience, because both open management and technical tracks that are formally gated behind a PG qualification.",
  },
  {
    question: "Is the uplift immediate after completing the degree?",
    answer:
      "Rarely. Most working learners report the increase at the next appraisal or job change, typically three to nine months after the final semester result, once the degree is on record with HR.",
  },
  {
    question: "Are these numbers a placement guarantee?",
    answer:
      "No. They are indicative ranges compiled from public salary aggregators and university-published documents, meant to help you sanity-check a fee against a realistic outcome before you enrol.",
  },
];

export const Route = createFileRoute("/tools/salary-after-course")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Salary After Course Calculator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      }),
      jsonLd(faqSchema(faqs)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          { name: "Salary after course calculator", href: path },
        ]),
      ),
    ],
  }),
  component: Page,
});

const CITY = [
  { key: "metro", label: "Metro (Bengaluru, Mumbai, Delhi NCR, Hyderabad)", factor: 1.15 },
  { key: "tier2", label: "Tier-2 city (Pune, Jaipur, Kochi, Indore…)", factor: 1 },
  { key: "tier3", label: "Tier-3 city or small town", factor: 0.85 },
  { key: "remote", label: "Remote / work-from-home role", factor: 1.05 },
];

const MOVE = [
  { key: "same", label: "Stay in the same function and grow", factor: 1 },
  { key: "switch", label: "Switch to a new function or industry", factor: 0.92 },
  { key: "promo", label: "Move into a people-management role", factor: 1.12 },
];

const field =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";
const label = "mb-1.5 block text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground";

function Page() {
  const [familySlug, setFamilySlug] = useState(courseSalaryBaselines[0]!.familySlug);
  const [years, setYears] = useState(2);
  const [city, setCity] = useState(CITY[0]!.key);
  const [move, setMove] = useState(MOVE[0]!.key);
  const [currentSalary, setCurrentSalary] = useState(360000);

  const baseline = courseSalaryBaselines.find((b) => b.familySlug === familySlug)!;
  const cityFactor = CITY.find((c) => c.key === city)!.factor;
  const moveFactor = MOVE.find((m) => m.key === move)!.factor;

  const band = useMemo(() => {
    const b = projectedBand(baseline, years);
    return { min: b.min * cityFactor * moveFactor, max: b.max * cityFactor * moveFactor };
  }, [baseline, years, cityFactor, moveFactor]);

  const mid = (band.min + band.max) / 2;
  const uplift = currentSalary > 0 ? ((mid - currentSalary) / currentSalary) * 100 : null;

  const reported = useMemo(
    () =>
      Object.entries(universityPlacementFacts)
        .flatMap(([slug, f]) =>
          f.stats
            .filter((s) => /package|salary|ctc/i.test(s.label))
            .map((s) => ({ slug, university: slug, label: s.label, value: s.value })),
        )
        .slice(0, 8),
    [],
  );

  return (
    <PageShell
      crumbs={[{ name: "Tools", href: "/tools" }, { name: "Salary after course", href: path }]}
      eyebrow="Interactive tool"
      title="Salary After Course Calculator"
      description={description}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label} htmlFor="course">Course you plan to complete</label>
              <select id="course" className={field} value={familySlug} onChange={(e) => setFamilySlug(e.target.value)}>
                {courseSalaryBaselines.map((b) => (
                  <option key={b.familySlug} value={b.familySlug}>{b.label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="yrs">Work experience at completion: {years} year{years === 1 ? "" : "s"}</label>
              <input id="yrs" type="range" min={0} max={10} step={1} className="w-full accent-[color:var(--brand,#7f1813)]"
                value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div>
              <label className={label} htmlFor="city">Where you will work</label>
              <select id="city" className={field} value={city} onChange={(e) => setCity(e.target.value)}>
                {CITY.map((c) => (<option key={c.key} value={c.key}>{c.label}</option>))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="move">Career move after the degree</label>
              <select id="move" className={field} value={move} onChange={(e) => setMove(e.target.value)}>
                {MOVE.map((m) => (<option key={m.key} value={m.key}>{m.label}</option>))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="cur">Current annual salary (leave 0 if you are a fresher)</label>
              <input id="cur" type="number" min={0} step={10000} className={field} value={currentSalary}
                onChange={(e) => setCurrentSalary(Math.max(0, Number(e.target.value) || 0))} />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-secondary/60 p-4">
            <h2 className="font-display text-sm font-bold">Roles this course typically leads to</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {baseline.roles.map((r) => (
                <li key={r} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold">{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-6">
            <h2 className="font-display text-base font-bold">Indicative salary band</h2>
            <p className="mt-3 font-display text-2xl font-bold text-brand">
              {INR(band.min)} – {INR(band.max)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">per year, after completing {baseline.label}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Mid-point</dt>
                <dd className="font-semibold">{INR(mid)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Change vs today</dt>
                <dd className="font-semibold">{uplift === null ? "—" : `${uplift >= 0 ? "+" : ""}${Math.round(uplift)}%`}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Typical reported uplift</dt>
                <dd className="font-semibold">{baseline.typicalUpliftPercent}%</dd>
              </div>
            </dl>
            <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
              Indicative ranges compiled from public salary aggregators and university placement documents. Not a
              placement guarantee.
            </p>
            <AppLink to="/tools/fee-emi-calculator" className="btn btn-primary mt-5 w-full">Check the fee & payback</AppLink>
            <AppLink to="/counselling" className="btn btn-secondary mt-2 w-full">Talk to a counsellor</AppLink>
          </div>
        </aside>
      </div>

      {reported.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-xl font-bold">Packages universities report in their own documents</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Read from each university's placement and approval document. These describe the whole learner base across
            programmes — use them as context for the band above, not as an individual outcome.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="bg-secondary/60 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">University</th>
                  <th className="px-4 py-3 font-semibold">Reported metric</th>
                  <th className="px-4 py-3 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {reported.map((r, i) => (
                  <tr key={`${r.slug}-${i}`} className="border-t border-border">
                    <td className="px-4 py-3">
                      <AppLink to={`/universities/${r.slug}`} className="font-semibold text-brand hover:underline">
                        {r.university.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </AppLink>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.label}</td>
                    <td className="px-4 py-3 font-semibold">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-14"><Faq items={faqs} /></div>
      <div className="mt-16"><CTASection /></div>
    </PageShell>
  );
}
