---
title: 'Next.js infrastructure: fonts, images, metadata, pinned deps, Bootstrap removal'
type: 'refactor'
created: '2026-07-22'
status: 'ready-for-dev'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Fonts and ~200KB of Bootstrap load from CDNs (only the grid + a few footer icons are used), images are plain `<img>` (no lazy-load/WebP/priority), `package.json` pins nothing (`latest` in production), and metadata is still the copied English call-center text with no Open Graph (tasks 1.2b, 1.3b, 6.1b, 6.4b, 6.6b).

**Approach:** Self-host Noto Sans JP via `next/font/google`; replace Bootstrap grid/icon usage with own CSS and inline SVGs then drop both CDN imports; convert `<img>` to `next/image` (hero/above-fold `priority`, rest lazy); pin exact dependency versions; rewrite metadata to describe WA+CRAFT BPO (Japanese) with Open Graph tags.

## Boundaries & Constraints

**Always:** Visual parity — grid replacement must reproduce today's column behavior at every existing breakpoint (`col-md-4`, `row`, `g-4`, `d-none d-md-block`, `container-xl`, footer `bi-*` icons: inventory ALL used Bootstrap classes first, replace each). `next/image` keeps rendered dimensions identical (explicit width/height or `fill` + sizes). Pinned versions = the versions currently installed in `node_modules` (read them, don't upgrade). Metadata: title/description in Japanese describing WA+CRAFT BPO; keep it factual to what the page itself claims — no new marketing claims.

**Ask First:** Upgrading any dependency beyond what's installed. Removing a Bootstrap utility whose replacement would change layout. Adding OG image assets that don't exist (use the hero illustration if an og:image is needed).

**Never:** No Tailwind or other CSS framework as the replacement. No react-icons package — inline SVGs only. No visual redesign.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| First paint | GET / | No requests to jsdelivr/googleapis CDNs; fonts self-hosted | N/A |
| Every breakpoint | 360/768/1000/1100/1200px | Grid columns identical to Bootstrap behavior | N/A |
| Fresh install | `rm -rf node_modules && npm i` | Exact same versions resolve (pinned) | N/A |
| Social share | OG scrape | ja title/description + og:image present | N/A |

</frozen-after-approval>

## Code Map

- `app/layout.tsx` -- fonts CDN link → `next/font/google` (Noto_Sans_JP, weights 400/500/700/900); metadata rewrite + OG
- `app/globals.css` -- top `@import`s of bootstrap/bootstrap-icons to remove; add own grid/utility rules; body font-family → next/font variable
- `components/**/*.tsx` -- inventory Bootstrap classes (`container-xl`, `row`, `col-*`, `g-4`, `d-none`, `mb-5`, `mt-3`, `me-2`, `bi-*`…) via grep; replace `bi-*` icons in `Footer.tsx` with inline SVGs
- `package.json` -- `latest` ×6 → exact installed versions (read from `node_modules/*/package.json`)
- All `<img>` sites across components -- convert to `next/image`

## Tasks & Acceptance

**Execution:**
- [ ] Inventory -- `grep -rhoE 'className="[^"]*"' components/ app/ | tr ' ' '\n'`-style sweep to list every Bootstrap-provided class actually used; write the list into Implementation Notes before touching anything -- replacement is provably complete
- [ ] `app/globals.css` -- Implement own equivalents for exactly the inventoried classes (same names, same breakpoint behavior as Bootstrap 5.3: container-xl max-widths, row/col gutters, g-4 spacing, d-none/d-md-block at 768px, spacing utilities used); then delete the two CDN `@import`s -- drops ~200KB without layout change
- [ ] `components/layout/Footer.tsx` -- Replace `bi-*` icon `<i>` tags with equivalent inline SVGs (Bootstrap Icons SVG paths, MIT) sized to match -- last icon-font dependency gone
- [ ] `app/layout.tsx` -- `next/font/google` Noto_Sans_JP with the four used weights, `display: "swap"`, applied to `<body>`; remove fonts CDN link; rewrite `metadata`: ja title 「WA+CRAFT BPO | 業務プロセスの最適化」-style from page copy, ja description from hero sub-copy, `openGraph` with title/description/type/locale ja_JP and hero image as og:image -- correct brand, self-hosted fonts
- [ ] All components -- `<img>` → `next/image` with real width/height (read intrinsic sizes from the files), `priority` only for hero/header logo; keep classNames -- lazy-load + WebP for free
- [ ] `package.json` -- Pin exact installed versions for next/react/react-dom/@types/*; run a fresh `npm install` sanity check -- reproducible builds

**Acceptance Criteria:**
- Given `curl -s localhost:<port>/`, then zero occurrences of `jsdelivr` or `fonts.googleapis`
- Given the rendered page at 360/768/1100/1280px, then column layout matches the pre-change page
- Given `package.json`, then no dependency uses `latest`
- Given view-source, then `<title>` and `og:title` are the Japanese WA+CRAFT strings

## Verification

**Commands:**
- `npx next build` -- expected: clean; font files emitted into build
- `npx next start -p 3129` + `curl -s localhost:3129/ | grep -c 'jsdelivr\|fonts.googleapis'` -- expected: 0
- `curl -s localhost:3129/ | grep -o '<title>[^<]*</title>'` -- expected: Japanese WA+CRAFT title
- `grep -c '"latest"' package.json` -- expected: 0

**Manual checks (if no CLI):**
- Breakpoint sweep 360→1280px comparing column wraps against production before this change.

