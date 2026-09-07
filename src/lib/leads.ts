/**
 * Backend-free lead delivery.
 *
 * Every lead capture surface on the site (forms, popups, chatbot, WhatsApp and
 * call clicks) funnels through `submitLead`, which posts to a Google Apps
 * Script web app that appends a row to the Degree_Khojo sheet.
 *
 * Design notes:
 * - No preflight: the request uses `text/plain` + `no-cors`, so the browser
 *   sends a simple POST that Apps Script accepts from any origin/domain.
 * - Never lose a lead: failures are queued in localStorage and retried on the
 *   next page load / on regaining connectivity.
 * - Source tracking: the exact page (and university / course context) the lead
 *   came from is always attached.
 */

import { getLeadContext, getPartialLead, markLeadSubmitted } from "@/lib/leadContext";
import { track } from "@/lib/analytics";

export const LEAD_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxDCGIr01-dyHzlxSGfWjz9cH0oL9Gqv-V7jODdrgLkJbR3MJY7oH8W5C1XwALG_lF8nQ/exec";

export const LEAD_SHEET_NAME = "Degree_Khojo";

const QUEUE_KEY = "degreekhojo-lead-queue";

export type LeadInput = {
  /** Full name of the visitor. */
  name?: string;
  email?: string;
  phone?: string;
  /** Course / programme of interest. */
  course?: string;
  /** State, city or any location the visitor gave. */
  location?: string;
  /** Which form / CTA produced this lead, e.g. "Counselling Form". */
  form: string;
  /** Extra free-form notes appended to the lead source column. */
  note?: string;
};

type LeadRow = Record<string, string>;

/** Human label for the page the lead came from (university / course aware). */
export function leadSourceLabel(form: string, note?: string): string {
  if (typeof window === "undefined") return form;
  const ctx = getLeadContext();
  const path = window.location.pathname || "/";
  const page = ctx.universityName || ctx.courseLabel || (path === "/" ? "Home" : path);
  const domain = window.location.hostname;
  return [form, page, path, note, domain].filter(Boolean).join(" | ");
}

function buildRow(input: LeadInput): LeadRow {
  const saved = typeof window === "undefined" ? {} : getPartialLead();
  const ctx = typeof window === "undefined" ? {} : getLeadContext();
  const name = (input.name ?? saved.name ?? "").trim();
  const email = (input.email ?? saved.email ?? "").trim();
  const phone = (input.phone ?? saved.phone ?? "").trim();
  const course = (input.course ?? saved.course ?? ctx.courseLabel ?? "").trim();
  const location = (input.location ?? saved.state ?? "").trim();
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const source = leadSourceLabel(input.form, input.note);

  return {
    sheet: LEAD_SHEET_NAME,
    sheetName: LEAD_SHEET_NAME,
    // friendly keys
    name,
    email,
    phone,
    course,
    location,
    timestamp,
    source,
    leadSource: source,
    page: typeof window === "undefined" ? "" : window.location.href,
    // exact sheet column headers
    "FULL NAME": name,
    "EMAIL ID": email,
    NUMBER: phone,
    Course: course,
    Location: location,
    Timesptamp: timestamp,
    "lead source": source,
  };
}

function readQueue(): LeadRow[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as LeadRow[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(rows: LeadRow[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(rows.slice(-30)));
  } catch {
    /* storage blocked — ignore */
  }
}

function enqueue(row: LeadRow) {
  writeQueue([...readQueue(), row]);
}

async function post(row: LeadRow): Promise<boolean> {
  const body = JSON.stringify(row);
  try {
    await fetch(LEAD_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      // text/plain keeps this a "simple request" — no CORS preflight.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    return true;
  } catch {
    // Last resort: beacon survives navigation and page unload.
    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        return navigator.sendBeacon(
          LEAD_ENDPOINT,
          new Blob([body], { type: "text/plain;charset=utf-8" }),
        );
      }
    } catch {
      /* ignore */
    }
    return false;
  }
}

/** Fire-and-forget lead delivery. Never throws, never blocks the UI. */
export async function submitLead(input: LeadInput): Promise<void> {
  if (typeof window === "undefined") return;
  const row = buildRow(input);
  // Any completed form starts the popup cooling period for this visitor.
  if (!/\((WhatsApp|Call)\)/.test(input.form)) markLeadSubmitted();
  track("lead_submit", {
    form: input.form,
    course: row["course"] ?? "",
    page: window.location.pathname,
  });
  const ok = await post(row);
  if (!ok) enqueue(row);
}

/** Retry anything that failed earlier. Safe to call on every page load. */
export async function flushLeadQueue(): Promise<void> {
  if (typeof window === "undefined") return;
  const rows = readQueue();
  if (rows.length === 0) return;
  writeQueue([]);
  const failed: LeadRow[] = [];
  for (const row of rows) {
    const ok = await post(row);
    if (!ok) failed.push(row);
  }
  if (failed.length) writeQueue(failed);
}

/**
 * Records a high-intent contact click (WhatsApp / call) as a lead using
 * whatever details the visitor already typed anywhere on the site.
 */
export function trackContactClick(channel: "WhatsApp" | "Call", form: string) {
  track(channel === "WhatsApp" ? "whatsapp_click" : "call_click", {
    form,
    page: typeof window === "undefined" ? "" : window.location.pathname,
  });
  void submitLead({ form: `${form} (${channel})`, note: channel });
}
