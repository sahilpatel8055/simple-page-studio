import { CalendarClock } from "lucide-react";
import type { ReactNode } from "react";
import { NOT_PUBLISHED, type VerificationStatus } from "@/lib/phaseSpec";

/**
 * Shared fact primitives.
 *
 * Consumer-facing rule: we never show research metadata (verification status,
 * confidence, source URLs, "researched on" stamps). All of that stays in the
 * data layer. The UI shows the fact, or a plain "ask the university" line, plus
 * an optional subtle "Last updated: Month Year".
 */

/** Turns any stored date string into "August 2026", or null when unusable. */
export function lastUpdatedLabel(value?: string | null): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  const parsed = new Date(raw.length === 7 ? `${raw}-01` : raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  }
  const m = raw.match(/([A-Za-z]{3,})\s*,?\s*(\d{4})/);
  if (m) return `${m[1]} ${m[2]}`;
  return null;
}

export function NotPublished({ note }: { note?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <span>Shared by the university on request</span>
      {note && <span className="text-xs">— {note}</span>}
    </span>
  );
}

/** Renders a value, or a friendly placeholder when it is missing. */
export function FactValue({ value, note }: { value: ReactNode; note?: string }) {
  const empty =
    value == null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim().toLowerCase() === NOT_PUBLISHED.toLowerCase());
  if (empty) return <NotPublished {...(note ? { note } : {})} />;
  return <>{Array.isArray(value) ? value.join(", ") : value}</>;
}

/**
 * Subtle "Last updated" line. `status` and `sourceUrl` are still accepted so
 * callers keep passing their internal data unchanged — they are simply not
 * rendered any more.
 */
export function VerifiedStamp({
  status: _status,
  lastVerified,
  sourceUrl: _sourceUrl,
  className = "",
}: {
  status?: VerificationStatus | string | undefined;
  lastVerified?: string | undefined;
  session?: string;
  sourceUrl?: string | undefined;
  className?: string;
}) {
  const label = lastUpdatedLabel(lastVerified);
  if (!label) return null;
  return (
    <p className={`flex items-center gap-1.5 text-xs text-muted-foreground ${className}`}>
      <CalendarClock className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>Last updated: {label}</span>
    </p>
  );
}

/** Plain note shown when a section has details the university shares directly. */
export function VerificationNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
      {children}
    </div>
  );
}
