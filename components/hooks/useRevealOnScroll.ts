"use client";

import { useEffect } from "react";

/**
 * Faithful port of the scroll-reveal animation from the original inline script:
 * adds `fade-in` to the observed elements and toggles `visible` when they
 * enter the viewport.
 */
export default function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(
      ".problem-card, .case-card, .voice-card, .benefit-card, .how-step, .why-us-item",
    );

    elements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
