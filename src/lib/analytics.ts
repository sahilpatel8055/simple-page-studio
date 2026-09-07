/**
 * Analytics layer: Google Tag Manager + GA4 + Microsoft Clarity.
 *
 * IDs come from the environment so nothing is hardcoded:
 *   VITE_GTM_ID      e.g. GTM-XXXXXXX
 *   VITE_GA4_ID      e.g. G-XXXXXXXXXX
 *   VITE_CLARITY_ID  e.g. abcdefghij
 *
 * Every loader is a no-op when its ID is missing, so the site behaves
 * identically before the IDs are supplied.
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const env = import.meta.env as Record<string, string | undefined>;
const GTM_ID = env["VITE_GTM_ID"];
const GA4_ID = env["VITE_GA4_ID"];
const CLARITY_ID = env["VITE_CLARITY_ID"];

let started = false;

function addScript(src: string, async = true) {
  const s = document.createElement("script");
  s.async = async;
  s.src = src;
  document.head.appendChild(s);
}

/** Loads GTM, GA4 and Clarity once, on the client. */
export function initAnalytics() {
  if (typeof window === "undefined" || started) return;
  started = true;

  window.dataLayer = window.dataLayer || [];

  if (GTM_ID) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    addScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  }

  if (GA4_ID) {
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { send_page_view: true });
  }

  if (CLARITY_ID) {
    const c = function (...args: unknown[]) {
      (c as unknown as { q: unknown[][] }).q =
        (c as unknown as { q?: unknown[][] }).q || [];
      (c as unknown as { q: unknown[][] }).q.push(args);
    };
    window.clarity = window.clarity || (c as (...args: unknown[]) => void);
    addScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
  }
}

/** Fires one event into GTM's dataLayer, GA4 and Clarity. */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined) clean[k] = v;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
  window.gtag?.("event", event, clean);
  window.clarity?.("event", event);
}

/** Page view on client-side route changes (GA4 SPA navigation). */
export function trackPageView(path: string) {
  track("page_view", { page_path: path, page_location: typeof window === "undefined" ? "" : window.location.href });
}
