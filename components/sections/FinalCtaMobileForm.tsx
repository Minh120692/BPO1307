"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "../common/ContactForm";

export default function FinalCtaMobileForm() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mirrors the original inline script: after removing `hidden`,
  // scroll the panel into view.
  useEffect(() => {
    if (open) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section className="section-final-cta mobile-final-form">
      <div className="container-xl">
        <div className="mobile-form-toggle-wrap">
          <button
            type="button"
            className="mobile-form-toggle-btn"
            data-mobile-form-toggle
            aria-expanded={open}
            aria-controls="mobile-form-panel"
            onClick={handleToggle}
          >
            {open ? "無料相談フォームを閉じる" : "無料相談フォームを開く"}
          </button>
        </div>
        <div className="final-cta-inner">
          <div
            className="contact-form-wrap mobile-form-panel"
            id="mobile-form-panel"
            hidden={!open}
            ref={panelRef}
          >
            <div className="form-header">
              <img src="/assets/logo-removebg-preview.png" alt="ECのミカタ" className="form-logo" />
            </div>
            <p className="form-title">無料相談フォーム</p>
            <p className="form-subtitle">30秒で入力完了。WA+CRAFTミカタ担当者からご連絡します。</p>
            <ContactForm variant="mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
