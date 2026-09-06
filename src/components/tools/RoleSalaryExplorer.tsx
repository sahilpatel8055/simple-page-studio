import { useMemo, useState } from "react";
import { AppLink } from "@/components/common/AppLink";
import {
  lpaRange,
  midOf,
  roleSalaries,
  salaryCourseFilters,
  type RoleSalaryRow,
} from "@/lib/salaryData";

type SortKey = "fresher" | "mid" | "senior" | "role";

/**
 * Filterable role-wise salary table — the core utility of
 * /tools/salary-after-course. Filters by course family and free text, sorts by
 * any experience stage. All figures come from `salaryData.ts`.
 */
export function RoleSalaryExplorer() {
  const [course, setCourse] = useState<string>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("mid");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = roleSalaries.filter((r) => {
      const courseOk = course === "all" || r.courses.includes(course);
      const textOk =
        !needle ||
        r.role.toLowerCase().includes(needle) ||
        r.industries.some((i) => i.toLowerCase().includes(needle));
      return courseOk && textOk;
    });
    return filtered.slice().sort((a, b) => {
      if (sort === "role") return a.role.localeCompare(b.role);
      return midOf(b[sort as "fresher" | "mid" | "senior"]) - midOf(a[sort as "fresher" | "mid" | "senior"]);
    });
  }, [course, q, sort]);

  const summary = useMemo(() => {
    if (!rows.length) return null;
    const mids = rows.map((r) => midOf(r.mid)).sort((a, b) => a - b);
    const median = mids[Math.floor(mids.length / 2)] ?? 0;
    const top = rows.slice().sort((a, b) => midOf(b.senior) - midOf(a.senior))[0] as RoleSalaryRow;
    return { median, top };
  }, [rows]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
      active
        ? "border-brand bg-brand text-brand-foreground"
        : "border-border bg-card text-foreground hover:bg-secondary"
    }`;

  return (
    <div className="space-y-4">
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
        <button type="button" className={chip(course === "all")} onClick={() => setCourse("all")}>
          All courses ({roleSalaries.length})
        </button>
        {salaryCourseFilters.map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={course === c.slug}
            className={chip(course === c.slug)}
            onClick={() => setCourse(c.slug)}
          >
            {c.short}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a role or industry — e.g. data analyst, BFSI"
          aria-label="Search roles or industries"
          className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Sort roles"
          className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus-visible:border-brand"
        >
          <option value="mid">Sort: highest at 3–5 years</option>
          <option value="senior">Sort: highest at 8+ years</option>
          <option value="fresher">Sort: highest entry pay</option>
          <option value="role">Sort: A–Z</option>
        </select>
      </div>

      {summary && (
        <p className="text-sm text-muted-foreground">
          {rows.length} role{rows.length === 1 ? "" : "s"} shown. Median mid-career pay across them
          is <span className="font-semibold text-foreground">₹{summary.median.toFixed(1)} LPA</span>
          , and the highest senior ceiling belongs to{" "}
          <span className="font-semibold text-foreground">{summary.top.role}</span> at{" "}
          {lpaRange(summary.top.senior)}.
        </p>
      )}

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          No role matches that filter. Clear the search or pick another course.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[52rem] text-sm">
            <caption className="sr-only">
              Role-wise indicative salary in India by experience stage
            </caption>
            <thead className="bg-secondary/60 text-left">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Role
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
                  Hiring industries
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  What moves the pay
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.role} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3 text-left font-semibold text-foreground">
                    {r.role}
                    <span className="mt-1 block text-[0.7rem] font-medium uppercase tracking-wide text-brand">
                      {r.courses
                        .map((c) => salaryCourseFilters.find((f) => f.slug === c)?.short ?? c)
                        .join(" · ")}
                    </span>
                  </th>
                  <td className="px-4 py-3 whitespace-nowrap">{lpaRange(r.fresher)}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold">{lpaRange(r.mid)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{lpaRange(r.senior)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.industries.join(", ")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.payDriver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {course !== "all" && (
        <AppLink to={`/courses/${course}`} className="text-sm font-semibold text-brand">
          See the full {salaryCourseFilters.find((c) => c.slug === course)?.label} guide — fees,
          eligibility and universities →
        </AppLink>
      )}
    </div>
  );
}
