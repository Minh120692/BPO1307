---
title: 'Semantic CSS tokens, dead-CSS removal, PhaseCard & SectionHeader components'
type: 'refactor'
created: '2026-07-22'
status: 'done'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** CSS variables lie (`--teal: #000000`, `--red: #000000`, `--yellow: #666666`), the retired teal `#b2e8e8` is hardcoded 13×, ~24% of the stylesheet is dead code, and `phase-header/2/3` + `phase-badge/2/3` + the per-section heading block are copy-pasted triplets (tasks 1.1–1.3, 4.1b, 4.2b, 5.1b, 3.1b–3.3b).

**Approach:** Zero-visual-change refactor: rename variables to semantic tokens (same values), replace hardcodes with tokens, delete provably-unused CSS rules, and fold the copy-pasted class triplets into `PhaseCard` and `SectionHeader` components with variant props.

## Boundaries & Constraints

**Always:** Rendered pixels must not change — every computed style stays identical. A class may only be deleted from CSS after grep proves no component references it. Variable renames are pure renames (value unchanged); every `var()` usage site updates in the same commit.

**Ask First:** Changing any color VALUE (that is task "1.3 palette" design work — only introduce `--color-highlight: #FFFF59` etc. as aliases of current values). Deleting a class that IS referenced.

**Never:** No CSS Modules. No visual redesign. No renaming of classes that components use (only dedup of the /2/3 triplets where the component now picks the variant class).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Any page view | Desktop & mobile | Visually identical before/after | N/A |
| Token rename | `var(--teal)` sites | Same computed values via `--color-*` names | Old names must have zero remaining references |
| Dead CSS purge | Unreferenced selectors | Removed; referenced ones untouched | Grep proof per deleted class group |
| PhaseCard variants | phase 01/02/03 cards | Same classes emitted per variant as today | N/A |

</frozen-after-approval>

## Code Map

- `app/globals.css` -- :root vars ~line 18-31; `#b2e8e8` hardcodes (13); dead blocks: `.fail-card*`, `.voice-card*`, `.section-case*`, `.nationwide-*`, `.marquee-*`, `.phase-header-ec`, `.company-page*` (verify each); duplicate triplets `.phase-header/2/3` (~278) and `.phase-badge/2/3` (~281)
- `components/sections/HowItWorksSection.tsx` -- uses phase-header/badge classes → consume `PhaseCard`
- `components/sections/*.tsx` -- every section repeats `section-en-bg + section-heading + section-desc` → consume `SectionHeader`
- NEW: `components/ui/PhaseCard.tsx`, `components/ui/SectionHeader.tsx`

## Tasks & Acceptance

**Execution:**
- [x] `app/globals.css` -- Rename `--teal`→`--color-primary-dark`, `--red`→(inspect usage; name semantically e.g. `--color-heading`), `--yellow`→`--color-muted`, etc.; keep identical values; update every `var()` site; add `--color-border-soft: #b2e8e8` and `--color-highlight: #FFFF59` and replace all hardcoded occurrences with the tokens -- honest names, single source of truth
- [x] `app/globals.css` -- Delete rule groups with zero references in `app/` + `components/` (grep each class before deleting); report per-group line counts -- removes ~24% dead weight
- [x] `components/ui/SectionHeader.tsx` -- `<SectionHeader bgText label title desc? className?>` emitting today's exact markup/classes; adopt in every section component that has the heading block -- kills the largest copy-paste family
- [x] `components/ui/PhaseCard.tsx` -- variant-driven (`1|2|3`) component emitting today's phase-header{N}/phase-badge{N} classes; adopt in HowItWorksSection; then collapse the 3 near-identical CSS rules into shared base + tiny variant overrides where computed styles are provably identical -- one component, one style source

**Acceptance Criteria:**
- Given `npx next build && next start`, when the rendered HTML of `/` before vs after is compared, then the DOM (tags, classes, text) is identical except where PhaseCard/SectionHeader emit equivalent markup with the same classes
- Given `grep -n 'b2e8e8\|--teal\|--red:\|--yellow' app/globals.css`, then only the token definition lines (if aliased) remain — zero scattered hardcodes
- Given the deleted CSS groups, then `grep -rn "<class>" app/ components/` returns nothing for each

## Verification

**Commands:**
- Before changes: `npx next build && npx next start -p 3126` → save `curl -s localhost:3126/ > /tmp/before.html`; after: same → `/tmp/after.html`; `diff /tmp/before.html /tmp/after.html` -- expected: empty or only attribute-order-neutral differences you can individually justify
- `npx next build` -- expected: clean compile
- `wc -l app/globals.css` before/after -- expected: meaningful reduction (~300+ lines)

## Implementation Notes

Final tokens (values byte-identical to the old vars): `--color-heading` (was `--navy`, #140650), `--color-primary-dark` (was `--teal`, #000000), `--color-text-dark` (was `--teal-dark` and same-valued `--gray`, #140650), `--color-surface` (was `--teal-light`, #f5f5f5), `--color-divider` (was `--teal-mid`, #d9d9d9), `--color-cta` (was `--red`, #000000), `--color-muted` (was `--yellow`, #666666), `--color-bg-soft` (was `--light-blue`, #fafafa), plus new `--color-border-soft: #b2e8e8` (replaced 7 remaining hardcodes after dead-rule deletion) and `--color-highlight: #FFFF59` (replaced 1 remaining hardcode); zero-reference vars `--navy-mid`, `--light-blue2`, `--white` were dropped. Dead CSS deleted after per-class grep proof (app/ + components/, incl. multi-selector list trims), approximate lines per group: company-page* 135, hero legacy (mainvis-video/cta-overlay/medals/trust-strip/hidden classes + media) ~120, cta-mid* ~32, case-study* ~26, legacy form (checkbox/privacy/btn-form/form-control/form-group/hbspt/hs-fieldtype/contact-form descendants) ~24, partners/marquee* 21, nationwide-* 16, fail-card* 14, mikata/phase-about 14, user-voice (minus `.voice-card`, kept because `useRevealOnScroll.ts` references it in a querySelectorAll string) 13, -light/-yellow heading variants + 旧クラス labels 11, comparison illust/outer 10, why-us (minus `.why-us-item`, referenced by the same hook) 8, price/recommend 10, services legacy header 6, problems dead (problem-text/solve-label/diamond/solve-count/tags) 6, phase-header-ec* 5, btn-cta-header 9, misc (btn-step-cta, step-arrow-tri, benefit-card-offset, form-icon, final-cta-contact-img) ~12 — `app/globals.css` went 1568 → 1072 lines (−496, ~32%). `phase-header/2/3` + `phase-badge/2/3` were collapsed into shared multi-selector base rules with tiny per-variant overrides (`.phase-header/2` gradient, `.phase-header3` background, `.phase-badge3` color); the phase cards actually live in `ScopeSection.tsx` (not HowItWorksSection as the code map guessed) and now render via `components/ui/PhaseCard.tsx` (variant 1|2|3). `components/ui/SectionHeader.tsx` was adopted in ProblemsSection, ServicesSection (cards row passed as children since it sits inside `.section-header`), ComparisonSection, BenefitsSection, HowItWorksSection and FaqSection; ScopeSection's header was left inline (divergent: dual responsive title spans + two desc paragraphs). Verification: `npx next build` clean; rendered `/` captured before and after on port 3126 — `diff /tmp/before.html /tmp/after.html` is empty (byte-identical, 86,193 bytes both).
