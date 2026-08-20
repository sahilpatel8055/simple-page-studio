import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/templates/PageShell";
import { CTASection } from "@/components/common/Primitives";
import { AppLink } from "@/components/common/AppLink";
import { Faq } from "@/components/common/Faq";
import { courseFamilyList } from "@/lib/courseFamily";
import { INR, emiPlan, roi, baselineFor, projectedBand } from "@/lib/calculators";
import { canonical, faqSchema, howToSchema, jsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

const title = "Fee, EMI & ROI Calculator for Online Degrees (2026-27)";
const description =
  "Pick a university and online course, see the verified 2026-27 fee, split it into a monthly EMI and calculate your payback period and return on investment.";
const path = "/tools/fee-emi-calculator";

const faqs = [
  {
    question: "Where do the fees in this calculator come from?",
    answer:
      "Every fee is read from our 2026-27 university dataset, which is compiled from official university fee pages, prospectuses and admission documents. Nothing is estimated — if a university does not publish a total programme fee, that option simply does not appear in the dropdown.",
  },
  {
    question: "How is the EMI calculated?",
    answer:
      "We use the standard reducing-balance EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the financed amount, r is the monthly interest rate and n is the tenure in months. Set the interest rate to 0% to model a no-cost EMI plan offered directly by a university.",
  },
  {
    question: "What does the ROI figure actually mean?",
    answer:
      "It compares the total money you spend on the degree (fee plus any interest) with the extra income you expect after finishing. Payback period is how many months of that extra income it takes to recover the outlay; net gain is what you are left with over the horizon you choose.",
  },
  {
    question: "Are no-cost EMI options genuinely free?",
    answer:
      "On most online programmes the university absorbs the interest for tenures that match the semester cycle, so the amount you pay equals the fee. Longer tenures arranged through a lender usually carry interest, which is why the calculator lets you enter a rate.",
  },
  {
    question: "Does the fee shown include exam and registration charges?",
    answer:
      "The total programme fee is shown as the university publishes it. Registration and examination charges are listed separately in our dataset and are called out on each university course page, so add them in the extra-cost field if your university bills them on top.",
  },
  {
    question: "Can I use this for a distance (ODL) programme?",
    answer:
      "Yes, wherever the university publishes an ODL fee. Online and distance fees are stored separately in our dataset and never mixed, so the number you see belongs to the exact mode listed on the course page.",
  },
];

export const Route = createFileRoute("/tools/fee-emi-calculator")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Fee, EMI & ROI Calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      }),
      jsonLd(faqSchema(faqs)),
      jsonLd(
        howToSchema({
          name: "How to calculate the EMI and ROI of an online degree",
          steps: [
            "Choose the online course you plan to study.",
            "Choose a university to load its published 2026-27 total fee.",
            "Set your down payment, EMI tenure and interest rate.",
            "Enter your current salary and the salary you expect after the degree.",
            "Read the payback period and net gain over your chosen horizon.",
          ],
        }),
      ),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          { name: "Fee, EMI & ROI calculator", href: path },
        ]),
      ),
    ],
  }),
  component: Page,
});

const field =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";
const label = "mb-1.5 block text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground";

function Page() {
  const families = useMemo(
    () =>
      courseFamilyList()
        .map((f) => ({
          slug: f.slug,
          name: f.name,
          offers: f.offers
            .filter((o) => typeof o.fees.total === "number" && (o.fees.total ?? 0) > 0)
            .map((o) => ({
              slug: o.universitySlug,
              name: o.universityName,
              total: o.fees.total as number,
              semester: o.fees.semester,
              emi: o.fees.emi,
              path: o.path,
            }))
            .sort((a, b) => a.total - b.total),
        }))
        .filter((f) => f.offers.length > 0)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const [familySlug, setFamilySlug] = useState(families[0]?.slug ?? "");
  const family = families.find((f) => f.slug === familySlug) ?? families[0];
  const [uniSlug, setUniSlug] = useState(family?.offers[0]?.slug ?? "");
  const offer = family?.offers.find((o) => o.slug === uniSlug) ?? family?.offers[0];

  const [extraCost, setExtraCost] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(0);
  const [currentSalary, setCurrentSalary] = useState(360000);
  const [expectedSalary, setExpectedSalary] = useState(600000);
  const [horizon, setHorizon] = useState(5);

  const fee = (offer?.total ?? 0) + extraCost;
  const financed = Math.max(0, fee - downPayment);
  const plan = emiPlan(financed, rate, months);
  const totalCost = downPayment + plan.totalPayable;
  const result = roi({ totalCost, currentSalary, expectedSalary, horizonYears: horizon });
  const baseline = baselineFor(familySlug);
  const band = baseline ? projectedBand(baseline, 3) : undefined;

  const onFamily = (slug: string) => {
    setFamilySlug(slug);
    const next = families.find((f) => f.slug === slug);
    setUniSlug(next?.offers[0]?.slug ?? "");
  };

  return (
    <PageShell
      crumbs={[
        { name: "Tools", href: "/tools" },
        { name: "Fee, EMI & ROI calculator", href: path },
      ]}
      eyebrow="Interactive tool"
      title="Fee, EMI & ROI Calculator"
      description={description}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
          <h2 className="font-display text-lg font-bold">1. Your programme</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="course">
                Course
              </label>
              <select
                id="course"
                className={field}
                value={familySlug}
                onChange={(e) => onFamily(e.target.value)}
              >
                {families.map((f) => (
                  <option key={f.slug} value={f.slug}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="university">
                University
              </label>
              <select
                id="university"
                className={field}
                value={uniSlug}
                onChange={(e) => setUniSlug(e.target.value)}
              >
                {family?.offers.map((o) => (
                  <option key={o.slug} value={o.slug}>
                    {o.name} — {INR(o.total)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="extra">
                Extra charges (exam, registration)
              </label>
              <input
                id="extra"
                type="number"
                min={0}
                step={500}
                className={field}
                value={extraCost}
                onChange={(e) => setExtraCost(Math.max(0, Number(e.target.value) || 0))}
              />
            </div>
            <div>
              <label className={label} htmlFor="down">
                Down payment
              </label>
              <input
                id="down"
                type="number"
                min={0}
                step={1000}
                className={field}
                value={downPayment}
                onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value) || 0))}
              />
            </div>
          </div>

          <h2 className="mt-8 font-display text-lg font-bold">2. EMI plan</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="tenure">
                Tenure: {months} months
              </label>
              <input
                id="tenure"
                type="range"
                min={6}
                max={48}
                step={3}
                className="w-full accent-[color:var(--brand,#7f1813)]"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
            </div>
            <div>
              <label className={label} htmlFor="rate">
                Interest rate: {rate}% p.a. {rate === 0 && "(no-cost EMI)"}
              </label>
              <input
                id="rate"
                type="range"
                min={0}
                max={18}
                step={0.5}
                className="w-full accent-[color:var(--brand,#7f1813)]"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
          </div>

          <h2 className="mt-8 font-display text-lg font-bold">3. Return on investment</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="cur">
                Current annual salary
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
            <div>
              <label className={label} htmlFor="exp">
                Expected annual salary after the degree
              </label>
              <input
                id="exp"
                type="number"
                min={0}
                step={10000}
                className={field}
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(Math.max(0, Number(e.target.value) || 0))}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="hz">
                Horizon: {horizon} years after completion
              </label>
              <input
                id="hz"
                type="range"
                min={1}
                max={10}
                step={1}
                className="w-full accent-[color:var(--brand,#7f1813)]"
                value={horizon}
                onChange={(e) => setHorizon(Number(e.target.value))}
              />
            </div>
          </div>
          {band && (
            <p className="mt-4 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
              For reference, learners three years after an {baseline?.label} typically report an
              indicative band of{" "}
              <strong className="text-foreground">
                {INR(band.min)} – {INR(band.max)}
              </strong>{" "}
              per year. Indicative only — not a placement guarantee.
            </p>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-6">
            <h2 className="font-display text-base font-bold">Your numbers</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row k="Programme fee" v={INR(fee)} />
              <Row k="Financed amount" v={INR(financed)} />
              <Row k="Monthly EMI" v={INR(plan.monthly)} strong />
              <Row k="Interest payable" v={INR(plan.totalInterest)} />
              <Row k="Total cost of degree" v={INR(totalCost)} strong />
              <hr className="border-border" />
              <Row k="Extra income per year" v={INR(result.annualGain)} />
              <Row
                k="Payback period"
                v={result.paybackMonths ? `${Math.ceil(result.paybackMonths)} months` : "—"}
                strong
              />
              <Row k={`Net gain over ${horizon} yrs`} v={INR(result.netGain)} />
              <Row
                k="ROI"
                v={result.roiPercent === null ? "—" : `${Math.round(result.roiPercent)}%`}
                strong
              />
            </dl>
            {offer && (
              <AppLink to={offer.path} className="btn btn-primary mt-5 w-full">
                See {offer.name} fee details
              </AppLink>
            )}
            <AppLink to="/counselling" className="btn btn-secondary mt-2 w-full">
              Get an EMI plan on call
            </AppLink>
          </div>
        </aside>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-bold">How to read these results</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            [
              "Payback under 18 months",
              "The fee is recovered within about a year and a half of the salary jump — a strong case for enrolling now rather than waiting.",
            ],
            [
              "Payback 18–36 months",
              "Reasonable for a career switch. Check whether the university's specialisation actually maps to the role you are targeting.",
            ],
            [
              "Payback beyond 36 months",
              "Either the fee is high for the outcome, or the salary expectation is optimistic. Compare a lower-fee university with the same UGC entitlement.",
            ],
          ].map(([h, p]) => (
            <div key={h} className="rounded-2xl border border-border bg-card p-4">
              <h3 className="font-display text-sm font-bold">{h}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <Faq items={faqs} />
      </div>
      <div className="mt-16">
        <CTASection />
      </div>
    </PageShell>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={strong ? "font-display text-base font-bold text-brand" : "font-semibold"}>
        {v}
      </dd>
    </div>
  );
}
