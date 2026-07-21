"use client";

import useRevealOnScroll from "../hooks/useRevealOnScroll";

/** Renders nothing; only runs the scroll-reveal observer on the page. */
export default function RevealOnScroll() {
  useRevealOnScroll();
  return null;
}
