import { AppLink } from "@/components/common/AppLink";

/** Pre-ticked consent checkbox shown on every lead form. */
export function ConsentCheck({ className = "" }: { className?: string }) {
  return (
    <label
      className={`flex items-start gap-2 text-[0.75rem] leading-snug text-muted-foreground ${className}`}
    >
      <input
        type="checkbox"
        name="consent"
        value="Yes"
        defaultChecked
        required
        className="mt-0.5 h-4 w-4 shrink-0 accent-[#7f1813]"
      />
      <span>
        I consent to be contacted by DegreeKhojo regarding my enquiry and agree to the{" "}
        <AppLink
          to="/privacy-policy"
          className="font-semibold text-[#7f1813] underline underline-offset-2"
        >
          Privacy Policy
        </AppLink>{" "}
        and{" "}
        <AppLink
          to="/disclaimer"
          className="font-semibold text-[#7f1813] underline underline-offset-2"
        >
          Disclaimer
        </AppLink>
        .
      </span>
    </label>
  );
}
