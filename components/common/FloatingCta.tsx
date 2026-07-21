"use client";

import { useEffect, useState } from "react";
import { scrollToContactForm } from "./scrollToContactForm";

export default function FloatingCta() {
  const [formSectionVisible, setFormSectionVisible] = useState(false);

  useEffect(() => {
    // Watch the whole mobile form section (owns #mobile-form-panel and the
    // toggle button): while any part of it is in the viewport, hide the
    // floating button so it never covers the form or its status messages.
    const formSection = document.querySelector(".mobile-final-form");

    if (!formSection || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormSectionVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(formSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="floating-cta"
      data-form-visible={formSectionVisible ? "true" : "false"}
    >
      <button
        type="button"
        className="floating-cta-btn"
        onClick={() => scrollToContactForm()}
      >
        無料相談フォームを開く
      </button>
    </div>
  );
}
