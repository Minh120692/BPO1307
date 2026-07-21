# Deferred Work

- source_spec: none
  summary: Migrate the entire index.html landing page to Next.js App Router components (task 1.1b in note1.xlsx — split into app/, components/, lib/, styles/ structure).
  evidence: Split from the "complete all urgent tasks" intent (2026-07-21) — it is a full architecture migration, independently shippable and far larger than the three surgical urgent fixes (0.1, 9.1, 9.2) that must ship first because the page is currently losing 100% of leads.

- source_spec: `_bmad-output/implementation-artifacts/spec-urgent-landing-fixes.md`
  summary: Add abuse protection (rate limiting and honeypot/CAPTCHA) to the public unauthenticated POST /api/contact endpoint.
  evidence: Both review agents flagged that each request can trigger an outbound Resend email, making the endpoint usable for email flooding and quota exhaustion; anti-spam was explicitly out of this spec's scope and is already tracked as task 1.4b / section (e) in the project notes.
