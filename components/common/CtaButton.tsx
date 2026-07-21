"use client";

import { scrollToContactForm } from "./scrollToContactForm";

// Small client-side CTA button so server components (e.g. HeroSection)
// can stay server-rendered while still offering a working CTA.
export default function CtaButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => scrollToContactForm()}
    >
      {label}
    </button>
  );
}
