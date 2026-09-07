import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { CTASection } from "@/components/common/Primitives";
import { AppLink } from "@/components/common/AppLink";
import { Faq } from "@/components/common/Faq";
import { RoleSalaryExplorer } from "@/components/tools/RoleSalaryExplorer";
import {
  cityFactors,
  courseSalarySnapshots,
  experienceLadder,
  industryDemand,
  lpaRange,
  midOf,
  roleSalaries,
} from "@/lib/salaryData";
import { courseSalaryBaselines, projectedBand, INR } from "@/lib/calculators";
import { universityPlacementFacts } from "@/data/university-placement-facts";
import { canonical, faqSchema, jsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

const title = "Salary After Online Degree in India — Role-Wise Pay 2026";
const description =
  "Role-wise salary after an online MBA, MCA, BBA, BCA, B.Com, M.Com, BA, MA or M.Sc in India: entry, mid and senior pay bands for 45 roles, city-wise pay, hiring industries and a personalised projection.";
const path = "/tools/salary-after-course";

const faqs = [
  {
    question: "What is the average salary after an online MBA in India?",
    answer:
      "Across the management roles in our table, an online MBA holder with 3–5 years of experience sits in a ₹7–₹16 LPA band, with entry roles from about ₹3.5 LPA and senior roles reaching ₹30 LPA and above. The band depends far more on the function you work in — sales, product, supply chain, finance — than on the university name.",
  },
  {
    question: "Does an online degree pay less than a regular degree?",
    answer:
      "For the same role and the same years of experience, pay is set by the role, not by the mode of study. A UGC-entitled online degree is treated as equivalent for eligibility. The real difference is that online learners do not get a campus-placement channel, so freshers with no work history usually take longer to land the first offer.",
  },
  {
    question: "Which online course gives the biggest salary jump?",
    answer:
      "An online MBA and an online MCA show the largest uplift for candidates who already have two or more years of experience, because both unlock management and senior technical tracks that formally require a postgraduate qualification.",
  },
  {
    question: "How is the projected salary band on this page calculated?",
    answer:
      "We start from the indicative band for your course, weight it by the work experience you enter, then apply a city-tier factor and a factor for whether you continue in the same function or switch roles. The output is always a range, never a single guaranteed number.",
  },
  {
    question: "How much does the city change the salary?",
    answer:
      "A lot. The same role pays roughly 20% above the national band in Bengaluru and about 15% below it in a tier-3 town. Fully remote roles on an Indian payroll usually settle slightly above the national band but below metro pay.",
  },
  {
    question: "When does the salary increase actually arrive?",
    answer:
      "Rarely on the day of the result. Most working learners report the increase at the next appraisal or the next job change, typically three to nine months after the final semester result, once the degree is on record with HR.",
  },
  {
    question: "Where do the university package figures come from?",
    answer:
      "From the placement and approval documents each university publishes, which we have read and summarised on this site. Those figures describe the university's whole learner base across programmes, not a promise for any individual.",
  },
  {
    question: "Are these numbers a placement guarantee?",
    answer:
      "No. They are indicative ranges compiled from public Indian salary aggregators and university-published documents, meant to help you sanity-check a fee against a realistic outcome before you enrol.",
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
        name: "Salary After Online Degree — Role-Wise Calculator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      }),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Role-wise salary after online degrees in India (2026)",
        description:
          "Indicative entry, mid-career and senior salary bands in INR LPA for roles hired from online UG and PG degrees in India, with hiring industries and city-wise pay factors.",
        creator: { "@type": "Organization", name: "DegreeKhojo" },
        variableMeasured: "Annual salary in INR lakhs per annum",
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
const h2 = "font-display text-xl font-bold";

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

  const snapshots = useMemo(() => courseSalarySnapshots(), []);
  const industries = useMemo(() => industryDemand(10), []);
  const nationalMedian = useMemo(() => {
    const mids = roleSalaries.map((r) => midOf(r.mid)).sort((a, b) => a - b);
    return mids[Math.floor(mids.length / 2)] ?? 0;
  }, []);

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
      crumbs={[
        { name: "Tools", href: "/tools" },
        { name: "Salary after course", href: path },
      ]}
      eyebrow="Role-wise salary data · 2026"
      title="Salary After an Online Degree in India"
      description={description}
    >
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {roleSalaries.length} roles hired from online UG and PG degrees, with the pay band at entry,
        at 3–5 years and at 8+ years. The median mid-career pay across every role here is{" "}
        <span className="font-semibold text-foreground">₹{nationalMedian.toFixed(1)} LPA</span>.
        Filter by your course, then use the projection panel to test your own city and career move.
      </p>

      {/* 1 — Role-wise explorer, the primary utility */}
      <section aria-labelledby="role-wise" className="mt-10">
        <h2 id="role-wise" className={h2}>
          Role-wise salary after an online degree
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Bands are Indian market averages for the role, compiled from public salary aggregators for
          the 2025-26 hiring year. They describe the role, not any single university's placements.
        </p>
        <div className="mt-4">
          <RoleSalaryExplorer />
        </div>
      </section>

      {/* 2 — Course-wise comparison */}
      <section aria-labelledby="course-wise" className="mt-14">
        <h2 id="course-wise" className={h2}>
          Which online course pays what
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          The spread below is the full range across every role that course commonly feeds, so the
          low end is the weakest entry role and the high end the strongest senior one.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[44rem] text-sm">
            <caption className="sr-only">Salary range by online course in India</caption>
            <thead className="bg-secondary/60 text-left">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Course
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Roles tracked
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  0–2 yrs
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  3–5 yrs
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  8+ yrs
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Highest-paying role
                </th>
              </tr>
            </thead>
            <tbody>
              {snapshots.map((s) => (
                <tr key={s.slug} className="border-t border-border">
                  <th scope="row" className="px-4 py-3 text-left">
                    <AppLink
                      to={`/courses/${s.slug}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      {s.label}
                    </AppLink>
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">{s.roleCount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{lpaRange(s.fresher)}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold">{lpaRange(s.mid)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{lpaRange(s.senior)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.topRole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3 — Personalised projection */}
      <section aria-labelledby="projection" className="mt-14">
        <h2 id="projection" className={h2}>
          Project your own salary band
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={label} htmlFor="course">
                  Course you plan to complete
                </label>
                <select
                  id="course"
                  className={field}
                  value={familySlug}
                  onChange={(e) => setFamilySlug(e.target.value)}
                >
                  {courseSalaryBaselines.map((b) => (
                    <option key={b.familySlug} value={b.familySlug}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="yrs">
                  Work experience at completion: {years} year{years === 1 ? "" : "s"}
                </label>
                <input
                  id="yrs"
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  className="w-full accent-[color:var(--brand,#7f1813)]"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
              <div>
                <label className={label} htmlFor="city">
                  Where you will work
                </label>
                <select
                  id="city"
                  className={field}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {CITY.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="move">
                  Career move after the degree
                </label>
                <select
                  id="move"
                  className={field}
                  value={move}
                  onChange={(e) => setMove(e.target.value)}
                >
                  {MOVE.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="cur">
                  Current annual salary (leave 0 if you are a fresher)
                </label>
                <input
                  id="cur"
                  type="number"
                  min={0}
                  step={10000}
                  className={field}
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(Math.max(0, Number(e.target.value) || 0))}
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-secondary/60 p-4">
              <h3 className="font-display text-sm font-bold">
                Roles this course typically leads to
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {baseline.roles.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-6">
              <h3 className="font-display text-base font-bold">Indicative salary band</h3>
              <p className="mt-3 font-display text-2xl font-bold text-brand">
                {INR(band.min)} – {INR(band.max)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                per year, after completing {baseline.label}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Mid-point</dt>
                  <dd className="font-semibold">{INR(mid)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Change vs today</dt>
                  <dd className="font-semibold">
                    {uplift === null ? "—" : `${uplift >= 0 ? "+" : ""}${Math.round(uplift)}%`}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Typical reported uplift</dt>
                  <dd className="font-semibold">{baseline.typicalUpliftPercent}%</dd>
                </div>
              </dl>
              <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
                Indicative ranges compiled from public salary aggregators and university placement
                documents. Not a placement guarantee.
              </p>
              <AppLink to="/tools/fee-emi-calculator" className="btn btn-primary mt-5 w-full">
                Check the fee & payback
              </AppLink>
              <AppLink to="/counselling" className="btn btn-secondary mt-2 w-full">
                Talk to a counsellor
              </AppLink>
            </div>
          </aside>
        </div>
      </section>

      {/* 4 — Experience ladder */}
      <section aria-labelledby="ladder" className="mt-14">
        <h2 id="ladder" className={h2}>
          How pay moves with experience
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {experienceLadder.map((s) => (
            <div key={s.stage} className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <p className="text-[0.7rem] font-bold uppercase tracking-wide text-brand">
                {s.stage}
              </p>
              <h3 className="mt-1 font-display text-base font-bold">{s.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — City-wise */}
      <section aria-labelledby="city-wise" className="mt-14">
        <h2 id="city-wise" className={h2}>
          City-wise pay for the same role
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          The factor is applied to the national band. The example column shows what the median
          mid-career role (₹{nationalMedian.toFixed(1)} LPA nationally) becomes in that city.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[36rem] text-sm">
            <caption className="sr-only">City-wise salary factors in India</caption>
            <thead className="bg-secondary/60 text-left">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  City
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Tier
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Pay factor
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Median mid-career role
                </th>
              </tr>
            </thead>
            <tbody>
              {cityFactors.map((c) => (
                <tr key={c.city} className="border-t border-border">
                  <th scope="row" className="px-4 py-3 text-left font-semibold">
                    {c.city}
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">{c.tier}</td>
                  <td className="px-4 py-3">
                    {c.factor > 1 ? "+" : ""}
                    {Math.round((c.factor - 1) * 100)}%
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    ₹{(nationalMedian * c.factor).toFixed(1)} LPA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 — Industry demand */}
      <section aria-labelledby="industries" className="mt-14">
        <h2 id="industries" className={h2}>
          Industries hiring these roles in volume
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[40rem] text-sm">
            <caption className="sr-only">Industry demand for online-degree roles</caption>
            <thead className="bg-secondary/60 text-left">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Industry
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Roles hired
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Median mid-career pay
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Example roles
                </th>
              </tr>
            </thead>
            <tbody>
              {industries.map((i) => (
                <tr key={i.industry} className="border-t border-border">
                  <th scope="row" className="px-4 py-3 text-left font-semibold">
                    {i.industry}
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">{i.roleCount}</td>
                  <td className="px-4 py-3 font-semibold">₹{i.medianMidPay.toFixed(1)} LPA</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.sampleRoles.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7 — University reported packages */}
      {reported.length > 0 && (
        <section aria-labelledby="reported" className="mt-14">
          <h2 id="reported" className={h2}>
            Packages universities report in their own documents
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Read from each university's placement and approval document. These describe the whole
            learner base across programmes — use them as context for the bands above, not as an
            individual outcome.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="bg-secondary/60 text-left">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    University
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Reported metric
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {reported.map((r, i) => (
                  <tr key={`${r.slug}-${i}`} className="border-t border-border">
                    <td className="px-4 py-3">
                      <AppLink
                        to={`/universities/${r.slug}`}
                        className="font-semibold text-brand hover:underline"
                      >
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
        </section>
      )}

      {/* 8 — How to read this */}
      <section aria-labelledby="method" className="mt-14">
        <h2 id="method" className={h2}>
          How to read these numbers
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Every band is a role average for the Indian market, not a university placement figure.
          </li>
          <li>
            Pay follows the function you work in. Two people with the same degree sit far apart
            depending on whether they own a revenue or a cost number.
          </li>
          <li>
            A UGC-entitled online degree makes you eligible for roles that require a postgraduate
            qualification; it does not, by itself, set the offer.
          </li>
          <li>
            Sanity-check any fee against the mid-career band for the role you actually want — that
            is the payback test, and the{" "}
            <AppLink to="/tools/fee-emi-calculator" className="font-semibold text-brand underline">
              fee &amp; EMI calculator
            </AppLink>{" "}
            does the arithmetic.
          </li>
        </ul>
      </section>

      <div className="mt-14">
        <Faq items={faqs} />
      </div>
      <div className="mt-16">
        <CTASection />
      </div>
    </PageShell>
  );
}
