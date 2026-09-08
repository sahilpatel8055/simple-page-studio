import { Download, FileText } from "lucide-react";
import { whatsappLink } from "@/lib/leadContext";
import { trackContactClick } from "@/lib/leads";
import { usePopupSurface } from "@/components/common/PopupManager";

/**
 * Above-the-fold action row: Apply / Get fees on WhatsApp / Download brochure.
 * Rendered identically on desktop and mobile so both surfaces show the same
 * above-fold actions (desktop parity), and mirrored by the sticky mobile bar.
 */
export function ActionRow({
  waMessage = "Hi, please share the full fee structure, eligibility and EMI options.",
  compact = false,
}: {
  waMessage?: string;
  compact?: boolean;
}) {
  const { openCounselling } = usePopupSurface();
  const size = compact ? "min-h-10 px-3 text-[0.82rem]" : "min-h-11 px-4 text-sm";

  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        type="button"
        onClick={openCounselling}
        className={`inline-flex items-center gap-1.5 rounded-xl bg-brand font-bold text-brand-foreground hover:opacity-90 ${size}`}
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Apply now
      </button>
      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactClick("WhatsApp", "Above-fold action row")}
        className={`inline-flex items-center gap-1.5 rounded-xl bg-[#128C7E] font-bold text-white hover:opacity-90 ${size}`}
      >
        <img src="/whatsapp-icon.png" alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
        Get fees on WhatsApp
      </a>
      <button
        type="button"
        onClick={openCounselling}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-border bg-card font-bold text-brand hover:bg-secondary ${size}`}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download brochure
      </button>
    </div>
  );
}
