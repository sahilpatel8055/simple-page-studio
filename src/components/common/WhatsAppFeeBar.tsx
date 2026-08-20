import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getLeadContext, whatsappLink } from "@/lib/leadContext";
import { trackContactClick } from "@/lib/leads";
import { universities } from "@/lib/content";

/** "Lovely Professional University Online" -> "LPU Online" */
function shortUniLabel(ctx: { universitySlug?: string; universityName?: string }) {
  if (!ctx.universityName && !ctx.universitySlug) return "";
  const uni = universities.find((u) => u.slug === ctx.universitySlug);
  const short = (uni?.shortName || ctx.universityName || "").trim();
  if (!short) return "";
  return /online/i.test(short) ? short : `${short} Online`;
}

/**
 * Sticky mobile bar on fee-heavy pages: one tap to get the exact fee
 * breakdown on WhatsApp, with the university / course already in the message.
 */
export function WhatsAppFeeBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [label, setLabel] = useState("Get fees on WhatsApp");

  const relevant = /^\/(universities|courses|compare|online-courses|university)\//.test(pathname);

  // reset the auto-hide state on every page change
  useEffect(() => {
    setDone(false);
    setShow(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined" || !relevant || done) {
      setShow(false);
      return;
    }
    const ctx = getLeadContext();
    const short = shortUniLabel(ctx);
    setLabel(short ? `Get ${short} fees on WhatsApp` : "Get fees on WhatsApp");

    // Strategy 1: appears after the first scroll, hides again once the visitor
    // has scrolled roughly two more sections past that point.
    // Strategy 2: hides automatically 20s after it first became visible.
    let appearedAt = 0;
    let hideTimer = 0;
    const HIDE_AFTER_PX = Math.round(window.innerHeight * 2);

    const finish = () => {
      window.clearTimeout(hideTimer);
      setShow(false);
      setDone(true);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const depth = max <= 0 ? 1 : y / max;
      if (!appearedAt) {
        if (depth >= 0.2) {
          appearedAt = y;
          setShow(true);
          hideTimer = window.setTimeout(finish, 20000);
        }
        return;
      }
      if (y - appearedAt > HIDE_AFTER_PX) finish();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, relevant, done]);

  if (!relevant || !show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-card/95 p-2.5 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.5)] backdrop-blur md:hidden">
      <a
        href={whatsappLink("Hi, please share the full fee structure and EMI options.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactClick("WhatsApp", "Sticky fee bar")}
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#128C7E] text-[0.92rem] font-bold text-white"
      >
        <img src="/whatsapp-icon.png" alt="" className="h-5 w-5 object-contain" />
        <span className="truncate">{label}</span>
      </a>
    </div>
  );
}