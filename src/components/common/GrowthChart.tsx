import { useEffect, useRef, useState } from "react";

const points = [
  { year: "2021", value: 800 },
  { year: "2022", value: 1900 },
  { year: "2023", value: 3600 },
  { year: "2024", value: 6200 },
  { year: "2025", value: 8400 },
  { year: "Today", value: 10000 },
];

const W = 620;
const H = 300;
const PAD_L = 46;
const PAD_B = 34;
const PAD_T = 40;
const max = 11000;

const x = (i: number) => PAD_L + (i * (W - PAD_L - 20)) / (points.length - 1);
const y = (v: number) => PAD_T + (1 - v / max) * (H - PAD_T - PAD_B);

function curve() {
  let d = `M ${x(0)} ${y(points[0]!.value)}`;
  for (let i = 1; i < points.length; i++) {
    const px = x(i - 1);
    const py = y(points[i - 1]!.value);
    const cx = x(i);
    const cy = y(points[i]!.value);
    const mx = (px + cx) / 2;
    d += ` C ${mx} ${py}, ${mx} ${cy}, ${cx} ${cy}`;
  }
  return d;
}

export function GrowthChart() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);

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
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 10000));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const path = curve();
  const area = `${path} L ${x(points.length - 1)} ${H - PAD_B} L ${x(0)} ${H - PAD_B} Z`;

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Growth in learners counselled by Degreekhojo from 2021 to today"
      >
        <defs>
          <linearGradient id="gk-growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f1813" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7f1813" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 2750, 5500, 8250, 11000].map((v) => (
          <g key={v}>
            <line
              x1={PAD_L}
              x2={W - 20}
              y1={y(v)}
              y2={y(v)}
              stroke="#060606"
              strokeOpacity="0.07"
            />
            <text
              x={PAD_L - 10}
              y={y(v) + 4}
              textAnchor="end"
              fontSize="11"
              fill="#060606"
              fillOpacity="0.45"
            >
              {v === 0 ? "0" : `${v / 1000}k`}
            </text>
          </g>
        ))}

        <path
          d={area}
          fill="url(#gk-growth-fill)"
          style={{ opacity: active ? 1 : 0, transition: "opacity 1s ease 0.6s" }}
        />
        <path
          d={path}
          fill="none"
          stroke="#7f1813"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: active ? 0 : 1,
            transition: "stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)",
          }}
        />

        <g style={{ opacity: active ? 1 : 0, transition: "opacity .4s ease 1.6s" }}>
          <circle
            cx={x(points.length - 1)}
            cy={y(10000)}
            r="12"
            fill="#7f1813"
            fillOpacity="0.18"
          />
          <circle cx={x(points.length - 1)} cy={y(10000)} r="6" fill="#7f1813" />
        </g>

        {points.map((p, i) => (
          <text
            key={p.year}
            x={x(i)}
            y={H - 10}
            textAnchor="middle"
            fontSize="12"
            fontWeight={p.year === "Today" ? 700 : 500}
            fill={p.year === "Today" ? "#7f1813" : "#060606"}
            fillOpacity={p.year === "Today" ? 1 : 0.5}
          >
            {p.year}
          </text>
        ))}

        <g transform={`translate(${x(2) - 30}, ${PAD_T - 26})`}>
          <rect width="170" height="54" rx="14" fill="#7f1813" fillOpacity="0.08" />
          <text x="16" y="24" fontSize="17" fontWeight="800" fill="#060606">
            {count.toLocaleString("en-IN")}+
          </text>
          <text x="16" y="42" fontSize="11" fill="#060606" fillOpacity="0.6">
            Learners counselled
          </text>
        </g>
      </svg>
    </div>
  );
}
