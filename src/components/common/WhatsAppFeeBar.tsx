import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getLeadContext, whatsappLink } from "@/lib/leadContext";

/**
 * Sticky mobile bar on fee-heavy pages: one tap to get the exact fee
 * breakdown on WhatsApp, with the university / course already in the message.
 */
export function WhatsAppFeeBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState("Get fees on WhatsApp");

  const relevant = /^\/(universities|courses|compare|online-courses|university)\//.test(pathname);

  useEffect(() => {
    if (typeof window === "undefined" || !relevant) {
      setShow(false);
      return;
    }
    const ctx = getLeadContext();
    setLabel(ctx.universityName ? `Get ${ctx.universityName} fees on WhatsApp` : "Get fees on WhatsApp");
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, relevant]);

  if (!relevant || !show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-card/95 p-2.5 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.5)] backdrop-blur md:hidden">
      <a
        href={whatsappLink("Hi, please share the full fee structure and EMI options.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#128C7E] text-[0.92rem] font-bold text-white"
      >
        <img src="/whatsapp-icon.png" alt="" className="h-5 w-5 object-contain" />
        <span className="truncate">{label}</span>
      </a>
    </div>
  );
}