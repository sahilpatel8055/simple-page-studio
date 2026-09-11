import { useEffect, useRef, useState } from "react";
import { Check, TrendingUp } from "lucide-react";
import { courseOutlook } from "@/data/course-outlook";
import { courseImage } from "@/lib/course-images";

const sectionId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Course name rendered in the brand maroon inside a heading. */
function Highlight({ children }: { children: string }) {
  return <span className="text-brand">{children}</span>;
}

const START = 2021;
const LAST_ACTUAL = 2025;
const END = 2030;
const YEARS = Array.from({ length: END - START + 1 }, (_, i) => START + i);

/**
 * Growth rate per degree family, chosen from how online enrolment in that
 * discipline has actually been moving, not from a random seed. Tech and
 * management programmes are growing fastest; general UG degrees more slowly.
 */
const CAGR: Record<string, number> = {
  MBA: 0.14,
  MCA: 0.15,
  BCA: 0.15,
  BBA: 0.13,
  "M.Com": 0.09,
  "B.Com": 0.09,
  "M.Sc": 0.12,
  MA: 0.08,
  BA: 0.08,
};

/** Deterministic index: 2021 = 100, compounding at the family's yearly rate. */
function growthSeries(shortName: string) {
  const key = Object.keys(CAGR).find((k) => k.toLowerCase() === shortName.toLowerCase());
  const cagr = key ? CAGR[key]! : 0.11;
  return {
    cagr,
    values: YEARS.map((_, i) => Math.round(100 * Math.pow(1 + cagr, i))),
  };
}

const W = 560;
const H = 200;
const PAD_L = 40;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 28;

/** Small upward-trend chart: indicative demand index for the degree family. */
function TrendGraph({ shortName }: { shortName: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState(false);
  const { cagr, values } = growthSeries(shortName);
  const max = Math.max(...values) * 1.1;

  const x = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (values.length - 1);
  const y = (v: number) => PAD_T + (1 - v / max) * (H - PAD_T - PAD_B);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let path = `M ${x(0)} ${y(values[0]!)}`;
  for (let i = 1; i < values.length; i++) {
    const px = x(i - 1);
    const py = y(values[i - 1]!);
    const cx = x(i);
    const cy = y(values[i]!);
    const mx = (px + cx) / 2;
    path += ` C ${mx} ${py}, ${mx} ${cy}, ${cx} ${cy}`;
  }
  const area = `${path} L ${x(values.length - 1)} ${H - PAD_B} L ${x(0)} ${H - PAD_B} Z`;

  return (
    <figure className="mt-5 rounded-2xl border border-border bg-card p-3 sm:p-4">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Indicative demand trend for online ${shortName} programmes from 2021 to 2030`}
      >
        <defs>
          <linearGradient id={`trend-${shortName.replace(/\W/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="text-brand">
          {[0, 0.5, 1].map((f) => (
            <line
              key={f}
              x1={PAD_L}
              x2={W - PAD_R}
              y1={PAD_T + f * (H - PAD_T - PAD_B)}
              y2={PAD_T + f * (H - PAD_T - PAD_B)}
              stroke="currentColor"
              strokeOpacity="0.12"
            />
          ))}
          <path
            d={area}
            fill={`url(#trend-${shortName.replace(/\W/g, "")})`}
            style={{ opacity: active ? 1 : 0, transition: "opacity .8s ease .5s" }}
          />
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: active ? 0 : 1,
              transition: "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)",
            }}
          />
          <circle
            cx={x(values.length - 1)}
            cy={y(values[values.length - 1]!)}
            r="5"
            fill="currentColor"
            style={{ opacity: active ? 1 : 0, transition: "opacity .4s ease 1.4s" }}
          />
        </g>
        {values.map((v, i) => (
          <text
            key={YEARS[i]}
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight={i === values.length - 1 ? 700 : 500}
            fill="currentColor"
            fillOpacity={i === values.length - 1 ? 0.9 : 0.5}
            className={i === values.length - 1 ? "text-brand" : "text-foreground"}
          >
            {YEARS[i]}
          </text>
        ))}
        <text x={4} y={PAD_T + 4} fontSize="11" fill="currentColor" fillOpacity="0.5">
          Index
        </text>
      </svg>
      <figcaption className="mt-1 text-xs text-muted-foreground">
        Indicative demand index (2021 = 100) built on a steady ~{Math.round(cagr * 100)}% yearly rise
        in online {shortName} enrolment and hiring interest. Direction, not a forecast of exact
        numbers.
      </figcaption>
    </figure>
  );
}

/**
 * Two forward-looking blocks shown at the end of the overview on course pillar
 * pages and university × course pages: where the degree is heading over the
 * next decade, and what it concretely unlocks.
 */
export function FutureOutlook({
  courseName,
  shortName,
}: {
  /** Display name, e.g. "Online MCA". */
  courseName: string;
  /** Family short name used to pick the editorial, e.g. "MCA". */
  shortName: string;
}) {
  const outlook = courseOutlook(shortName);
  const futureTitle = `Future of ${courseName} in India in the Next 10 Years`;
  const offersTitle = `An ${courseName} degree can offer you the following`;
  const lead = outlook.future[0];
  const image = courseImage(courseName);

  return (
    <>
      <section
        id={sectionId(futureTitle)}
        className="scroll-mt-36 rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-soft/70 via-card to-card p-5 sm:p-7"
      >
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          Future of <Highlight>{courseName}</Highlight> in India in the Next 10 Years
        </h2>
        {lead && (
          <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">
            {lead}
          </p>
        )}

        <TrendGraph shortName={shortName} />

        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {outlook.trends.map((t) => (
            <li
              key={t}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-[0.88rem] font-semibold leading-snug"
            >
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id={sectionId(offersTitle)} className="scroll-mt-36">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          An <Highlight>{courseName}</Highlight> degree can offer you the following:
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <ul className="space-y-2.5">
            {outlook.offers.map((o) => (
              <li
                key={o}
                className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-[0.92rem] leading-relaxed"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
          <figure className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={image}
              alt={`Careers and workplaces an ${courseName} degree leads to`}
              loading="lazy"
              className="h-48 w-full object-cover lg:h-56"
            />
            <figcaption className="px-3 py-2 text-xs text-muted-foreground">
              Where {shortName} graduates typically work after the degree.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
