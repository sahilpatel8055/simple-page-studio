import { Calculator, Columns3, LineChart, Search } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";

const items = [
  {
    to: "/tools/fee-emi-calculator",
    name: "Fee & EMI calculator",
    hint: "Split any programme fee into monthly EMIs",
    Icon: Calculator,
  },
  {
    to: "/tools/salary-after-course",
    name: "Salary after course",
    hint: "Project your salary band after the degree",
    Icon: LineChart,
  },
  {
    to: "/compare/universities",
    name: "Compare universities",
    hint: "Put any two universities side by side",
    Icon: Columns3,
  },
  {
    to: "/universities",
    name: "University finder",
    hint: "Filter by budget, mode and specialisation",
    Icon: Search,
  },
];

/**
 * Compact, in-page tool strip. Dropped between content sections so a reader can
 * act on what they just read without leaving the page flow.
 */
export function ToolsStrip({ title = "Use these free tools while you decide" }: { title?: string }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-base font-bold sm:text-lg">{title}</h2>
        <AppLink to="/tools" className="text-xs font-bold text-brand sm:text-sm">
          All tools ›
        </AppLink>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ to, name, hint, Icon }) => (
          <AppLink
            key={to + name}
            to={to}
            className="hover-lift flex items-start gap-2.5 rounded-xl bg-secondary p-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-card text-brand">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-foreground">{name}</span>
              <span className="block text-[0.72rem] leading-snug text-muted-foreground">{hint}</span>
            </span>
          </AppLink>
        ))}
      </div>
    </section>
  );
}
