---
title: 'Task 1.1b: migrate the static landing page to Next.js App Router components'
type: 'refactor'
created: '2026-07-21'
status: 'done'
baseline_commit: '673f942aa826a278a62e6b9fe43524494491a002'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The live page is a 1,100-line browser-saved static `public/index.html` served through a `proxy.ts` rewrite, duplicated at the repo root. It is unmaintainable (457 class attributes in one file, 198 leftover `bis_skin_checked` extension artifacts, one giant inline script) and blocks every SOLID-phase task in the project backlog.

**Approach:** Faithful 1:1 port — pixel- and content-identical — of the page into Next.js App Router components (task 1.1b in note1.xlsx). Sections become server components; interactive parts (forms, FAQ, modal, header CTA, scroll animations) become client components/hooks. The static HTML copies and `proxy.ts` are deleted so `/` serves the React page.

## Boundaries & Constraints

**Always:** Rendered output must match the current page: same visible text (Japanese copy verbatim), same section order, same class names on elements so the existing stylesheet keeps working unchanged. Keep the stylesheet as ONE global CSS file. Keep Bootstrap + Google Fonts as CDN `<link>`s (replacing them is tasks 1.3b/6.1b). Keep `/api/contact` wiring and all current form behavior (toggle, submit states, status messages). Strip every `bis_skin_checked` attribute.

**Ask First:** Any visible content or styling change beyond the port. Adding npm dependencies. Renaming CSS classes.

**Never:** No CSS Modules / design-token refactor (phase 3–4 tasks). No `next/image` conversion (6.4b). No content fixes (titles, brand leftovers — separate tasks). No new features.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Visit `/` | GET / | React-rendered page, visually identical to old static page | 404 on old `/index.html` is acceptable |
| Submit sidebar or mobile form | Valid fields | POST `/api/contact` → success message 「送信が完了しました…」, form resets | Failure → 「送信に失敗しました…」, button re-enabled |
| FAQ question click | Any FAQ item | Answer toggles open/closed (same class-based behavior) | N/A |
| Header CTA click | Desktop / mobile widths | Desktop: scroll to sidebar form; mobile: open form panel + scroll | N/A |
| Privacy/company links | Click 運営会社情報 | Company modal opens; Esc/close works | N/A |
| Scroll | Sections enter viewport | Same IntersectionObserver reveal animations | N/A |

</frozen-after-approval>

## Code Map

- `public/index.html` -- source of truth for the port (1,101 lines); body = header, hero, 9 sections, mobile form, footer, sidebar form, company modal; inline script at :925–1096
- `style.css` + `public/style.css` -- identical stylesheet; becomes `app/globals.css`
- `app/layout.tsx` -- currently minimal; will carry metadata (unchanged wording), CDN `<link>`s, globals.css import
- `app/page.tsx` -- currently `redirect("/index.html")`; will compose the section components
- `proxy.ts` -- rewrite `/` → `/index.html`; must be deleted or `/` keeps serving the old file
- `app/api/contact/route.ts` -- existing endpoint; unchanged
- `public/assets/`, `public/img/` -- served asset dirs; JSX must use root-absolute `/assets/...`, `/img/...` (old file used relative paths)

## Tasks & Acceptance

**Execution:**
- [x] `app/globals.css` -- Move stylesheet content verbatim; import from layout -- single global CSS keeps every existing class working
- [x] `app/layout.tsx` -- Add Google Fonts + Bootstrap CSS CDN `<link>`s, keep existing metadata and `lang="ja"` -- faithful head port
- [x] `components/layout/Header.tsx`, `Footer.tsx` -- Port header (incl. CTA button as client handler per current behavior) and footer -- shell components
- [x] `components/sections/*.tsx` -- One file per section: Hero, Problems, Scope, Services, Comparison, Benefits, HowItWorks, Faq (client), FinalCta/MobileForm (client) -- JSX ported verbatim (class→className, strip `bis_skin_checked`, asset paths → root-absolute)
- [x] `components/common/ContactForm.tsx` (client) -- Single form component used by sidebar and mobile panel; port submit logic (fetch `/api/contact`, disabled state, status messages) from inline script -- replaces the two duplicated form blocks
- [x] `components/common/CompanyModal.tsx` (client) + `components/hooks/useRevealOnScroll.ts` -- Port modal open/close/Esc and IntersectionObserver animation logic -- completes inline-script decomposition
- [x] `app/page.tsx` -- Replace redirect with composition of all components in original order -- `/` renders the React page
- [x] Delete `index.html`, `public/index.html`, `public/style.css`, `style.css`, `proxy.ts` -- removes the static copies and the rewrite that would shadow the new page

**Acceptance Criteria:**
- Given `npx next build && npx next start`, when GET `/`, then the HTML contains the same visible Japanese text blocks as the old page (hero alt, section headings, FAQ questions, footer contact) and zero `bis_skin_checked` attributes
- Given the running site, when submitting a valid contact form, then `/api/contact` receives the same JSON payload shape as before and the success message renders
- Given the repo after migration, when searching for `index.html`/`proxy.ts`, then no references remain (except `_bmad-output` docs)

## Design Notes

Class names are the compatibility contract: the port copies existing markup structure and classes exactly, so `app/globals.css` needs zero edits — visual parity is inherited, not re-achieved. Interactivity is decomposed along the inline script's own boundaries (form / FAQ / modal / CTA / observer) rather than redesigned; each becomes the smallest client component that owns its DOM. Everything else stays server-rendered.

## Verification

**Commands:**
- `npx next build` -- expected: compiles; `/` is a static or dynamic page, `/api/contact` still listed
- `npx next start -p 3001` + `curl -s localhost:3001/ | grep -c 'bis_skin_checked'` -- expected: 0
- `curl -s localhost:3001/ | grep -o '無料相談フォーム\|よくある質問\|section-services'` -- expected: all present
- `curl -s -X POST localhost:3001/api/contact -H 'Content-Type: application/json' -d '{"company":"t","last_name":"a","first_name":"b","email":"a@b.co","agree":true}'` -- expected: `{"ok":true}`

**Manual checks (if no CLI):**
- Side-by-side old (git show) vs new page at desktop and mobile widths: identical layout; FAQ toggles, modal, both forms, header CTA all behave as before.

## Suggested Review Order

**Page composition (entry point)**

- Full section composition in original DOM order inside the layout wrapper divs
  [`page.tsx:1`](../../app/page.tsx#L1)

- Root layout: metadata unchanged, fonts CDN link; Bootstrap moved into globals.css imports
  [`layout.tsx:1`](../../app/layout.tsx#L1)

- Cascade contract: Bootstrap @imports FIRST so the verbatim stylesheet overrides it, as before
  [`globals.css:1`](../../app/globals.css#L1)

**Interactive ports (client components)**

- Shared form: one component, `variant` prop replaces the two duplicated form blocks; double-submit guarded
  [`ContactForm.tsx:14`](../../components/common/ContactForm.tsx#L14)

- Header CTA handler: DOM-query approach mirroring the original inline script
  [`Header.tsx:1`](../../components/layout/Header.tsx#L1)

- Modal: body-class side effect isolated in an effect keyed on state (strict-mode safe)
  [`CompanyModal.tsx:1`](../../components/common/CompanyModal.tsx#L1)

- FAQ: original toggle was dead code — intentionally NOT ported; section stays server-rendered
  [`FaqSection.tsx:1`](../../components/sections/FaqSection.tsx#L1)

- Reveal animations: IntersectionObserver port, mounted via a null-rendering client component
  [`useRevealOnScroll.ts:1`](../../components/hooks/useRevealOnScroll.ts#L1)

**Static sections (verbatim JSX ports)**

- Largest section port — representative of the mechanical HTML→JSX conversion rules
  [`ScopeSection.tsx:1`](../../components/sections/ScopeSection.tsx#L1)

**Peripherals**

- Redirect keeps old `/index.html` bookmarks/crawler links alive after the static file's deletion
  [`next.config.ts:1`](../../next.config.ts#L1)

- Deleted: `index.html`, `public/index.html`, `style.css`, `public/style.css`, `proxy.ts` (view via `git show 673f942:<path>`)
