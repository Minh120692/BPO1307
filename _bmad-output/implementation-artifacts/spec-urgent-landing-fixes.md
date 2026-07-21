---
title: 'Urgent landing-page fixes: strip foreign tracking, wire header CTA, working contact API'
type: 'bugfix'
created: '2026-07-21'
status: 'done'
baseline_commit: '7ee0facefb92e8b574006d06943dfae2b17d732c'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The live landing page (served from `public/index.html` via `proxy.ts` rewrite) loses 100% of leads: the contact form POSTs to `/api/contact` which does not exist, and the always-visible header CTA button has no handler. The page also ships a full third-party tracking block (Facebook Pixel ×2, Yahoo, Bing, Clarity, HubSpot, GTM-T4NNLRW, Ferret-One, Mieruca, Twitter, Google Ads, chat widgets) copied from ecnomikata.com — a different company — leaking visitor data to foreign trackers.

**Approach:** Surgically fix the static page in place (no Next.js migration — that is deferred work): delete the entire tracking block including GTM (user decision 2026-07-21), attach a scroll-to-form handler to the header CTA, and create `app/api/contact/route.ts` that validates submissions and sends email via Resend when `RESEND_API_KEY` is configured, otherwise logs the lead (user decision 2026-07-21).

## Boundaries & Constraints

**Always:** Apply identical changes to both `public/index.html` (the served copy) and root `index.html` — they must stay byte-identical. Keep the site's own inline script (form handling, FAQ, modal, IntersectionObserver) fully intact. API route must never echo submitted personal data back in error responses or throw unhandled.

**Ask First:** Adding any new npm dependency (Resend integration must use plain `fetch` against the Resend REST API). Removing or renaming any visible page content beyond the CTA handler.

**Never:** Do not migrate the page to React components (deferred: 1.1b). Do not delete root `index.html`/`proxy.ts` (deferred: 0.3/0.4). Do not add GTM back or any replacement analytics. Do not touch styling, copy, or images.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Valid submit, no key | POST /api/contact, all required fields, `RESEND_API_KEY` unset | 200 `{ok:true}`; lead logged via `console.log` (single JSON line) | N/A |
| Valid submit, key set | Same, `RESEND_API_KEY` + `CONTACT_EMAIL_TO` set | 200 `{ok:true}`; email sent via Resend REST API | Resend non-2xx → log error, still 200 + log lead (never lose the lead silently) |
| Missing/invalid fields | Empty company/name, malformed email, `agree` ≠ true | 400 `{ok:false, error:"invalid_input"}` — generic, no field echo | N/A |
| Malformed body | Non-JSON body | 400 `{ok:false, error:"invalid_input"}` | try/catch around `request.json()` |
| Header CTA click, desktop | Sidebar form visible | Smooth-scroll to sidebar form, focus first input | N/A |
| Header CTA click, mobile | Sidebar hidden, mobile panel collapsed | Open mobile form panel (reuse existing toggle logic), scroll to it | Panel absent → scroll to page bottom form section |

</frozen-after-approval>

## Code Map

- `public/index.html` -- served page (via `proxy.ts` rewrite `/` → `/index.html`). GTM head snippet lines 12–15 + noscript iframe lines 18–19; header CTA `<button class="header-cta-image-button">` line 42; site inline script ends `</script>` ~line 1074; foreign tracking block ~line 1078 → EOF (extends past `</body>`)
- `index.html` -- byte-identical root copy; keep in sync
- `app/api/contact/route.ts` -- NEW; form already POSTs JSON `{company,last_name,first_name,email,phone,message,agree}` (see inline script ~line 970)
- `proxy.ts`, `app/page.tsx` -- routing context only; do not modify

## Tasks & Acceptance

**Execution:**
- [x] `public/index.html` -- Delete GTM head script (lines 12–15) and GTM noscript iframe (lines 18–19); delete everything from the first tracking `<script>` after the site's own inline script's closing `</script>` (~line 1078) through EOF, restoring a clean `</body></html>` ending -- removes all data leakage to ecnomikata trackers
- [x] `public/index.html` -- In the site inline script, add a click handler for `.header-cta-image-button`: if the mobile form panel exists and is hidden, trigger the existing `[data-mobile-form-toggle]` button; then `scrollIntoView` the visible form (`.sidebar-contact-form` on desktop) and focus its first input -- makes the permanent header CTA functional
- [x] `index.html` -- Copy the finished `public/index.html` over it verbatim -- keeps the two copies identical
- [x] `app/api/contact/route.ts` -- Create POST handler: parse JSON in try/catch; require non-empty `company`, `last_name`, `first_name`, valid-format `email`, `agree === true` (`phone`, `message` optional); on valid → if `RESEND_API_KEY` && `CONTACT_EMAIL_TO` env vars set, POST to `https://api.resend.com/emails` via fetch (from `onboarding@resend.dev` until a domain is verified), log-and-continue on failure; always `console.log` one JSON line per lead; respond per I/O matrix -- restores lead capture

**Acceptance Criteria:**
- Given the deployed page, when it loads, then no network request goes to any domain in {googletagmanager, facebook, clarity.ms, hs-scripts/hubspot, yimg.jp, bing, ecnomikata, ferret-one, mieruca, hellouniweb, creativesurvey, doubleclick, twitter/t.co}
- Given a visitor fills the sidebar or mobile form and submits, when the API responds, then the success message 「送信が完了しました…」 is shown and the lead appears in server logs (and email inbox if Resend is configured)
- Given `diff index.html public/index.html`, then output is empty

## Design Notes

Resend via raw `fetch` (no SDK) keeps `package.json` untouched. Returning 200 even when Resend fails is deliberate: the lead is already persisted in logs, and showing the visitor an error would lose a captured lead. Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (e.g. the WA+CRAFT sales address) — add via `vercel env add` later; absence must not break the route.

## Verification

**Commands:**
- `diff index.html public/index.html` -- expected: no output
- `grep -ciE 'googletagmanager|facebook|clarity|hubspot|hs-scripts|yimg|bing|ecnomikata|ferret|mieruca|uniweb|creativesurvey|doubleclick' public/index.html` -- expected: 0
- `npx next build` -- expected: compiles, route `/api/contact` listed
- `npx next dev` + `curl -s -X POST localhost:3000/api/contact -H 'Content-Type: application/json' -d '{"company":"t","last_name":"a","first_name":"b","email":"a@b.co","agree":true}'` -- expected: `{"ok":true}`; same with `"agree":false` -- expected: HTTP 400

**Manual checks (if no CLI):**
- Open the page, click the header CTA on desktop width → smooth-scrolls to sidebar form; on narrow width → mobile form panel opens.

## Suggested Review Order

**Lead capture API (new endpoint)**

- Entry point: POST handler — parse, validate, log, optionally email; the design intent in one screen
  [`route.ts:41`](../../app/api/contact/route.ts#L41)

- Validation helpers: trim + per-field length caps decide what counts as a valid lead
  [`route.ts:15`](../../app/api/contact/route.ts#L15)

- Resend call: 10s timeout, env-overridable sender, reply_to lead, deliberate 200-on-failure policy
  [`route.ts:94`](../../app/api/contact/route.ts#L94)

**Header CTA handler**

- New click handler: mobile reuses existing toggle, desktop scrolls to sidebar form and focuses first field
  [`index.html:962`](../../public/index.html#L962)

**Tracking removal**

- Head: GTM script + noscript iframe deleted; only fonts, Bootstrap, style.css remain
  [`index.html:7`](../../public/index.html#L7)

- Tail: entire ecnomikata tracking block (was line 1078→EOF) gone; file now ends cleanly
  [`index.html:1101`](../../public/index.html#L1101)

**Peripherals**

- Root copy: byte-identical sync of the served file (deletion deferred to task 0.3)
  [`index.html:1`](../../index.html#L1)
