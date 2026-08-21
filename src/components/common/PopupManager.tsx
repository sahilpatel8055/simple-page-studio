import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AdmissionPopup } from "@/components/common/AdmissionPopup";
import { CounsellingForm } from "@/components/common/CounsellingForm";
import { WhatsAppFeeBar } from "@/components/common/WhatsAppFeeBar";
import { rememberContext, markLeadSubmitted, leadCoolingDown } from "@/lib/leadContext";
import { universities } from "@/lib/content";
import { X } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Surfaces that can appear on top of the page. Only one may be visible at a
 * time — PopupManager owns the lock, the priority order and the cooldown.
 */
export type SurfaceId = "admission" | "counselling" | "botTeaser" | "contactHint" | "botChat";

const COOLDOWN_MS = 45000;

type Ctx = {
  active: SurfaceId | null;
  /** Try to take the surface lock. Returns false if busy, cooling down or dismissed. */
  request: (id: SurfaceId) => boolean;
  /** Release the lock and start the cooldown. `dismiss` blocks the surface for the session. */
  release: (id: SurfaceId, dismiss?: boolean) => void;
  /** User intent — always wins and replaces whatever is on screen. */
  openCounselling: () => void;
};

const PopupCtx = createContext<Ctx>({
  active: null,
  request: () => false,
  release: () => {},
  openCounselling: () => {},
});

export const usePopupSurface = () => useContext(PopupCtx);

/**
 * Poll-based helper: keeps asking for the lock between `fromMs` and `untilMs`
 * so a surface that lost the race still gets its turn once the lock frees up.
 */
export function useTimedSurface(id: SurfaceId, fromMs: number, untilMs: number) {
  const { request, release, active } = usePopupSurface();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let poll = 0;
    const start = window.setTimeout(() => {
      const tryOnce = () => {
        if (request(id)) {
          setShown(true);
          window.clearInterval(poll);
        }
      };
      tryOnce();
      poll = window.setInterval(tryOnce, 5000);
    }, fromMs);
    const stop = window.setTimeout(() => {
      window.clearInterval(poll);
      setShown((v) => {
        if (v) release(id);
        return false;
      });
    }, untilMs);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
      window.clearInterval(poll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fromMs, untilMs]);

  const close = useCallback(
    (dismiss = true) => {
      setShown(false);
      release(id, dismiss);
    },
    [id, release],
  );

  return { shown: shown && active === id, close };
}

const LEAD_KEY = "avedu-lead-submitted";
const COUNSEL_COOLDOWN_KEY = "avedu-counselling-cooldown";
const COUNSEL_COOLDOWN_MS = 20 * 60 * 1000;
const PAGEVIEW_KEY = "avedu-pageviews";

const read = (store: "local" | "session", key: string) => {
  try {
    return (store === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
};
const write = (store: "local" | "session", key: string, value: string) => {
  try {
    (store === "local" ? localStorage : sessionStorage).setItem(key, value);
  } catch {
    /* ignore */
  }
};

/** A lead was captured — start the site-wide popup cooling period. */
export { markLeadSubmitted };
const leadSubmitted = () => leadCoolingDown() || read("local", LEAD_KEY) === "1";

/** Scroll depth of the document, 0..1. */
const scrollDepth = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - window.innerHeight;
  return max <= 0 ? 1 : Math.min(1, (h.scrollTop || window.scrollY) / max);
};

export function PopupProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SurfaceId | null>(null);
  const activeRef = useRef<SurfaceId | null>(null);
  const dismissed = useRef<Set<SurfaceId>>(new Set());
  const cooldownUntil = useRef(0);

  const request = useCallback((id: SurfaceId) => {
    if (dismissed.current.has(id)) return false;
    if (activeRef.current !== null) return false;
    if (Date.now() < cooldownUntil.current) return false;
    activeRef.current = id;
    setActive(id);
    return true;
  }, []);

  const release = useCallback((id: SurfaceId, dismiss = true) => {
    if (dismiss) dismissed.current.add(id);
    if (activeRef.current !== id) return;
    activeRef.current = null;
    cooldownUntil.current = Date.now() + COOLDOWN_MS;
    setActive(null);
  }, []);

  const openCounselling = useCallback(() => {
    activeRef.current = "counselling";
    setActive("counselling");
  }, []);

  const value = useMemo(
    () => ({ active, request, release, openCounselling }),
    [active, request, release, openCounselling],
  );

  return (
    <PopupCtx.Provider value={value}>
      {children}
      <ContextTracker />
      <AdmissionScheduler />
      <CounsellingScheduler />
      <WhatsAppFeeBar />
      {active === "counselling" && (
        <CounsellingModal onClose={() => release("counselling", false)} />
      )}
    </PopupCtx.Provider>
  );
}

const titleCase = (s: string) =>
  s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bMba|\bMca|\bBba|\bBca|\bMcom|\bBcom|\bMsc\b/gi, (m) => m.toUpperCase());

/** Records the last university / course the visitor looked at. */
function ContextTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "universities" && parts[1]) {
      const uni = universities.find((u) => u.slug === parts[1]);
      if (uni)
        rememberContext({ universitySlug: uni.slug, universityName: uni.name, path: pathname });
    }
    if (parts[0] === "courses" && parts[1]) {
      rememberContext({ courseLabel: titleCase(parts[1]), path: pathname });
    }
  }, [pathname]);

  return null;
}

/**
 * Admission banner scheduling (never on the home page):
 * - first inside page of the session: 5s, or earlier on desktop exit-intent
 *   / 50% scroll on mobile;
 * - every later inside page: 10s after landing, even if it was closed before.
 */
function AdmissionScheduler() {
  const { request, release, active } = usePopupSurface();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    if (typeof window === "undefined" || isHome) return;
    if (leadSubmitted()) return;
    const seen = read("session", "avedu-admission-popup") === "seen";
    const delay = seen ? 10000 : 5000;
    let done = false;

    const fire = () => {
      if (done || leadSubmitted()) return;
      if (!request("admission")) return;
      done = true;
      setOpen(true);
      write("session", "avedu-admission-popup", "seen");
      cleanup();
    };

    const onScroll = () => {
      if (window.innerWidth < 768 && scrollDepth() >= 0.5) fire();
    };
    const onLeave = (e: MouseEvent) => {
      if (window.innerWidth >= 768 && e.clientY <= 0) fire();
    };

    const timer = window.setTimeout(fire, delay);
    const poll = window.setInterval(() => !done && fire(), 6000);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    function cleanup() {
      window.clearTimeout(timer);
      window.clearInterval(poll);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    }
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isHome]);

  useEffect(() => setOpen(false), [pathname]);

  const close = () => {
    setOpen(false);
    release("admission", false);
    write("session", "avedu-admission-popup", "seen");
  };

  if (!open || active !== "admission") return null;
  return <AdmissionPopup onClose={close} />;
}

/**
 * Counselling form is intent-based, never a blunt timer:
 * - from the second page view of the session (short settle delay);
 * - 35% scroll on any page reached by navigating inside the site;
 * - 60s + 50% scroll on a fee / eligibility / admission page;
 * - exit-intent on a course or university page.
 * Capped by a 20-minute localStorage cooldown after a dismissal and
 * suppressed for good once a lead has been submitted.
 */
function CounsellingScheduler() {
  const { request, active } = usePopupSurface();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (leadSubmitted()) return;
    const until = Number(read("local", COUNSEL_COOLDOWN_KEY) ?? 0);
    if (Date.now() < until) return;

    const views = Number(read("session", PAGEVIEW_KEY) ?? 0) + 1;
    write("session", PAGEVIEW_KEY, String(views));

    const deep = /fee|eligibilit|admission/.test(pathname);
    const detail = /^\/(courses|universities|compare)\//.test(pathname);
    const landedAt = Date.now();
    let done = false;

    const fire = () => {
      if (done || leadSubmitted()) return;
      if (!request("counselling")) return;
      done = true;
      cleanup();
    };

    const onScroll = () => {
      const d = scrollDepth();
      if (d >= 0.3) fire();
      if (deep && d >= 0.5 && Date.now() - landedAt >= 30000) fire();
    };
    const onLeave = (e: MouseEvent) => {
      if (detail && window.innerWidth >= 768 && e.clientY <= 0) fire();
    };

    const secondView = window.setTimeout(fire, views >= 2 ? 6000 : 12000);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    // Mobile exit intent: the first back press keeps the visitor on the page
    // and shows the counselling form instead of losing the lead.
    let backTrap = false;
    const onPop = () => {
      if (window.innerWidth >= 768 || done) return;
      fire();
    };
    if (window.innerWidth < 768 && read("session", "avedu-back-trap") !== "1") {
      write("session", "avedu-back-trap", "1");
      backTrap = true;
      window.history.pushState({ avedu: true }, "");
      window.addEventListener("popstate", onPop);
    }

    function cleanup() {
      if (secondView) window.clearTimeout(secondView);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      if (backTrap) window.removeEventListener("popstate", onPop);
    }
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (active !== "counselling") return;
    return () => write("local", COUNSEL_COOLDOWN_KEY, String(Date.now() + COUNSEL_COOLDOWN_MS));
  }, [active]);

  return null;
}

function CounsellingModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Free counselling"
          className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <CounsellingForm compact source="Counselling Popup" onDone={onClose} />
        </div>
      </div>
    </div>
  );
}
