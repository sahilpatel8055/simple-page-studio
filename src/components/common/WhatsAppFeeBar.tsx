import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { getLeadContext, whatsappLink } from "@/lib/leadContext";
import { trackContactClick } from "@/lib/leads";
import { universities } from "@/lib/content";
import { usePopupSurface } from "@/components/common/PopupManager";

/** "Lovely Professional University Online" -> "LPU Online" */
function shortUniLabel(ctx: { universitySlug?: string; universityName?: string }) {
  if (!ctx.universityName && !ctx.universitySlug) return "";
  const uni = universities.find((u) => u.slug === ctx.universitySlug);
  const short = (uni?.shortName || ctx.universityName || "").trim();
  if (!short) return "";
  return /online/i.test(short) ? short : `${short} Online`;
}

/**
 * Sticky mobile action row on fee-heavy pages — Apply, fees on WhatsApp and
 * brochure. It stays visible for the whole visit so the primary actions are
 * always one tap away, mirroring the above-fold action row.
 */
export function WhatsAppFeeBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { openCounselling } = usePopupSurface();
  const [waLabel, setWaLabel] = useState("Fees on WhatsApp");

  const relevant = /^\/(universities|courses|compare|online-courses|university)\//.test(pathname);

  useEffect(() => {
    if (typeof window === "undefined" || !relevant) return;
    const short = shortUniLabel(getLeadContext());
    setWaLabel(short ? `${short} fees` : "Fees on WhatsApp");
  }, [pathname, relevant]);

  if (!relevant) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2 border-t border-border bg-card/95 p-2 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.5)] backdrop-blur md:hidden">
      <button
        type="button"
        onClick={openCounselling}
        className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-brand px-3 text-[0.82rem] font-bold text-brand-foreground"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Apply
      </button>
      <a
        href={whatsappLink("Hi, please share the full fee structure and EMI options.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactClick("WhatsApp", "Sticky action bar")}
        className="inline-flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#128C7E] px-2 text-[0.82rem] font-bold text-white"
      >
        <img src="/whatsapp-icon.png" alt="" aria-hidden="true" className="h-4 w-4 shrink-0 object-contain" />
        <span className="truncate">{waLabel}</span>
      </a>
      <button
        type="button"
        onClick={openCounselling}
        aria-label="Download brochure"
        className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-[0.82rem] font-bold text-brand"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Brochure
      </button>
    </div>
  );
}
