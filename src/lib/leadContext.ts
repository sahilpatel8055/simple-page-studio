/**
 * Lightweight, client-only lead intelligence.
 *
 * - `savePartialLead` keeps whatever the visitor has typed so far (name /
 *   phone / course) even if they never press submit.
 * - `rememberContext` records the last university and course page seen so
 *   popups and WhatsApp messages can match the visitor's real intent.
 * Everything lives in localStorage; nothing is sent anywhere by itself.
 */

export const DK_WA = "918770012496";

const PARTIAL_KEY = "avedu-partial-lead";
const CONTEXT_KEY = "avedu-last-context";

export type PartialLead = {
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
  state?: string;
  callTime?: string;
  path?: string;
  updatedAt?: string;
};

export type LeadContext = {
  universitySlug?: string;
  universityName?: string;
  courseLabel?: string;
  path?: string;
};

const readJson = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeJson = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked — ignore */
  }
};

export function getPartialLead(): PartialLead {
  if (typeof window === "undefined") return {};
  return readJson<PartialLead>(PARTIAL_KEY) ?? {};
}

/** Merge-and-store: called on every keystroke pause in a lead form. */
export function savePartialLead(patch: PartialLead) {
  if (typeof window === "undefined") return;
  writeJson(PARTIAL_KEY, {
    ...getPartialLead(),
    ...patch,
    path: location.pathname,
    updatedAt: new Date().toISOString(),
  } satisfies PartialLead);
}

export function getLeadContext(): LeadContext {
  if (typeof window === "undefined") return {};
  return readJson<LeadContext>(CONTEXT_KEY) ?? {};
}

export function rememberContext(patch: LeadContext) {
  if (typeof window === "undefined") return;
  writeJson(CONTEXT_KEY, { ...getLeadContext(), ...patch });
}

/** Click-to-chat link with the visitor's course / university prefilled. */
export function whatsappLink(intent?: string) {
  const ctx = typeof window === "undefined" ? {} : getLeadContext();
  const lead = typeof window === "undefined" ? {} : getPartialLead();
  const bits = [
    intent || "Hi, I want admission guidance for an online degree.",
    ctx.universityName ? `University: ${ctx.universityName}` : "",
    ctx.courseLabel || lead.course ? `Course: ${ctx.courseLabel || lead.course}` : "",
    lead.name ? `Name: ${lead.name}` : "",
  ].filter(Boolean);
  return `https://wa.me/${DK_WA}?text=${encodeURIComponent(bits.join("\n"))}`;
}

/** Callback slots offered in lead forms. */
export const CALL_SLOTS = [
  "As soon as possible",
  "Today 10 AM – 12 PM",
  "Today 12 PM – 3 PM",
  "Today 3 PM – 6 PM",
  "Today after 6 PM",
  "Tomorrow morning",
];