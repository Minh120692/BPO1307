---
title: 'Conversion UX: mid-page CTA and mobile form accessibility'
type: 'feature'
created: '2026-07-22'
status: 'ready-for-dev'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Desktop users scroll through ~9 sections with no CTA except the sidebar; on mobile the form sits after the FAQ, hidden behind a toggle — every extra step drops leads (tasks 9.3, 9.4).

**Approach:** Add a mid-page CTA block (after the Services section) that scrolls to the visible form, and give mobile users a persistent floating CTA button that opens/scrolls to the form panel. Reuse the existing CTA gradient design language; no new content inventions beyond standard CTA copy.

## Boundaries & Constraints

**Always:** CTA actions reuse the exact header-CTA behavior (mobile: open panel via existing toggle; desktop: scroll to sidebar form). Japanese copy for buttons uses existing page phrases (「無料相談」/「無料相談フォームを開く」 family) — do not invent claims. Floating button must not cover the form itself while the form is in view, and must not overlap the status messages.

**Ask First:** Repositioning the mobile form section itself (moving it before FAQ changes section order — propose only if floating CTA proves insufficient). Any new marketing copy beyond reusing existing phrases.

**Never:** No popups/modals for the CTA. No third-party widgets. Do not restore the dead commented CTA markup verbatim (its alt text was for the wrong industry).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Mid-page CTA click, desktop | Sidebar visible | Smooth-scroll to sidebar form + focus first input | N/A |
| Mid-page CTA click, mobile | Panel collapsed | Open panel (existing toggle path) + scroll to it | N/A |
| Floating CTA, mobile | User scrolls page | Button stays visible bottom of viewport; hides while the form panel is open/in view | IntersectionObserver or visibility check |
| Floating CTA, desktop ≥1101px | Sidebar already visible | Floating button not rendered/hidden | CSS media query |

</frozen-after-approval>

## Code Map

- `components/layout/Header.tsx` -- existing CTA click logic to extract/reuse (querySelector-based)
- NEW: `components/common/scrollToContactForm.ts` -- shared helper extracted from Header's handler
- NEW: `components/sections/MidPageCta.tsx` (client) -- CTA block placed after ServicesSection in `app/page.tsx`
- NEW: `components/common/FloatingCta.tsx` (client) -- mobile-only fixed button
- `components/sections/FinalCtaMobileForm.tsx` -- the toggle/panel the CTAs target
- `app/globals.css` -- styles for the two new blocks using existing tokens/gradient

## Tasks & Acceptance

**Execution:**
- [ ] `components/common/scrollToContactForm.ts` -- Extract the header CTA's click logic into an exported function; Header imports it -- one behavior, three callers
- [ ] `components/sections/MidPageCta.tsx` + `app/page.tsx` -- Gradient CTA band after ServicesSection: short line (reuse 「30秒で入力完了」-family phrasing already on the page) + button 「無料相談はこちら」→ `scrollToContactForm()` -- desktop mid-funnel CTA
- [ ] `components/common/FloatingCta.tsx` + `app/page.tsx` -- Fixed bottom button, only <1101px (media query), label 「無料相談フォームを開く」→ same helper; hidden while `#mobile-form-panel` is open or intersecting viewport -- mobile always-one-tap-away
- [ ] `app/globals.css` -- Styles for both using `--cta gradient` tokens, safe-area padding on the floating button -- consistent design language

**Acceptance Criteria:**
- Given a desktop viewport, when clicking the mid-page CTA, then the page scrolls to the sidebar form and focuses its first input
- Given a mobile viewport with the form panel closed, when tapping either CTA, then the panel opens and scrolls into view
- Given the mobile form panel open on screen, then the floating button is not visible

## Verification

**Commands:**
- `npx next build` -- expected: clean
- `npx next start -p 3128` + `curl -s localhost:3128/ | grep -c '無料相談はこちら'` -- expected: ≥1

**Manual checks (if no CLI):**
- 390px width: floating button visible while scrolling, disappears when panel open; no overlap with form controls.
