---
title: 'Next.js infrastructure: fonts, images, metadata, pinned deps, Bootstrap removal'
type: 'refactor'
created: '2026-07-22'
status: 'done'
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
- [x] Inventory -- `grep -rhoE 'className="[^"]*"' components/ app/ | tr ' ' '\n'`-style sweep to list every Bootstrap-provided class actually used; write the list into Implementation Notes before touching anything -- replacement is provably complete
- [x] `app/globals.css` -- Implement own equivalents for exactly the inventoried classes (same names, same breakpoint behavior as Bootstrap 5.3: container-xl max-widths, row/col gutters, g-4 spacing, d-none/d-md-block at 768px, spacing utilities used); then delete the two CDN `@import`s -- drops ~200KB without layout change
- [x] `components/layout/Footer.tsx` -- Replace `bi-*` icon `<i>` tags with equivalent inline SVGs (Bootstrap Icons SVG paths, MIT) sized to match -- last icon-font dependency gone
- [x] `app/layout.tsx` -- `next/font/google` Noto_Sans_JP with the four used weights, `display: "swap"`, applied to `<body>`; remove fonts CDN link; rewrite `metadata`: ja title 「WA+CRAFT BPO | 業務プロセスの最適化」-style from page copy, ja description from hero sub-copy, `openGraph` with title/description/type/locale ja_JP and hero image as og:image -- correct brand, self-hosted fonts
- [x] All components -- `<img>` → `next/image` with real width/height (read intrinsic sizes from the files), `priority` only for hero/header logo; keep classNames -- lazy-load + WebP for free
- [x] `package.json` -- Pin exact installed versions for next/react/react-dom/@types/*; run a fresh `npm install` sanity check -- reproducible builds

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

## Implementation Notes

### Pinned versions (read from node_modules, no upgrades)

- next `16.2.10`, react `19.2.7`, react-dom `19.2.7`
- @types/node `26.1.1`, @types/react `19.2.17`, @types/react-dom `19.2.3`
- typescript left at `^5.9.2` (was never `latest`; installed 5.9.3 satisfies it)
- `npm install` re-run to sync `package-lock.json`; `npx next build` clean.

### Bootstrap class inventory (grep sweep over components/ + app/, before any change)

Bootstrap-provided classes actually used:

- Containers: `container`, `container-xl`
- Grid: `row`, `col`, `col-4`, `col-6`, `col-8`, `col-12`, `col-sm-10`, `offset-sm-1`, `col-md-4`, `col-md-6`, `col-md-12`, `col-lg-4`, `col-lg-5`, `col-lg-6`
- Gutters: `g-0`, `g-4`, `gy-4`
- Display: `d-block`, `d-flex`, `d-none`, `d-sm-block`, `d-sm-none`, `d-md-block`, `d-md-inline`, `d-md-none`
- Flex: `flex-column`, `align-items-center`, `justify-content-center`, `justify-content-end`
- Spacing: `me-2`, `mt-3`, `mt-4`, `mb-5`
- Text: `text-center`, `text-md-start`
- Misc: `btn`, `visible`, `bi` + icon classes `bi-geo-alt-fill`, `bi-telephone-fill`, `bi-envelope-fill`, `bi-globe`

Already project-defined in globals.css (NOT Bootstrap-dependent, no action): `bg-light-blue`, `border-end`, `visually-hidden`. `fade-in` has no CSS rule anywhere (inert; `visible` replicated as Bootstrap's `visibility:visible!important`).

All of the above are implemented with Bootstrap 5.3-exact values in the `/* ===== GRID & UTILITIES (thay Bootstrap) ===== */` block at the top of `app/globals.css` (same position the two CDN `@import`s occupied, preserving cascade order). Breakpoints sm=576/md=768/lg=992/xl=1200/xxl=1400; container-xl max-widths 1140px@1200/1320px@1400 with 12px x-padding; row/col gutters via `--bs-gutter-x/y` variables exactly like Bootstrap (g-4 = 1.5rem); spacing scale 2=.5rem 3=1rem 4=1.5rem 5=3rem. Both CDN `@import`s deleted.

Deviation (justified by the "visual parity" Always-constraint): a minimal Reboot subset was added to the same block — body line-height 1.5/font-size 1rem, h1–h6 + p margins and fluid heading sizes, `b/strong bolder`, `img,svg{vertical-align:middle}`, table/caption/th border + collapse rules (ComparisonTable relies on them), form-control font inheritance, button cursor. Dropping bootstrap.min.css also drops Reboot; without these the page's line-heights, heading margins and the comparison table borders would visibly change.

### Icon replacements (Footer.tsx)

`<i class="bi bi-*">` glyphs replaced with inline `<svg viewBox="0 0 16 16">` using the official Bootstrap Icons (MIT) path data for `geo-alt-fill`, `telephone-fill`, `envelope-fill`, `globe`, via a local `BiIcon` helper. Sizing/alignment matched with a `.bi { width:1em; height:1em; fill:currentColor; vertical-align:-0.125em; display:inline-block }` rule (mirrors the icon-font's metrics). `me-2` kept on each icon.

### next/image conversion (31 rendered images / 29 call sites)

- Every `<img>` in components/ converted to `next/image` with intrinsic width/height read from the asset files (`file` for PNGs, `viewBox`/width/height for the SVG logo: 558x750).
- `priority`: ONLY the header logo (`Header.tsx` wacrlogonew.svg) — the hero uses CSS background images, so nothing else is above-fold `<img>`. Verified: preload link emitted, all other 30 images `loading="lazy"`.
- Judgment calls:
  - `wacrlogonew.svg` (Header + Footer) rendered with `unoptimized` — the Next image optimizer rejects SVG without `dangerouslyAllowSVG`; served as-is like before.
  - Where CSS sizes only one dimension, the other is pinned to auto to keep aspect and silence Next warnings: `style={{width:"auto"}}` for `.logo-img`/`.form-logo` (CSS height only), `style={{height:"auto"}}` for `.header-cta-image`, `.footer-brand-logo`, `.sidebar-form-brand-logo`, `.service-icon-circle img` (CSS width only). Classes/alt text unchanged everywhere.
  - `PhaseCard` takes new required `imgWidth`/`imgHeight` props (dynamic `imgSrc`); `ScopeSection` passes the intrinsic sizes of point01/02/03.png.

### Metadata / font (app/layout.tsx)

- `Noto_Sans_JP` via next/font/google, weights 400/500/700/900, `display:"swap"`, `subsets:["latin"]` (JP glyphs load via unicode-range); className applied to `<body>`; Google Fonts `<link>` and the now-empty manual `<head>` removed; globals.css body `font-family` set to `inherit` so the next/font class wins.
- title/og:title: `WA+CRAFT BPO | 業務プロセスの最適化`; description/og:description built strictly from on-page hero copy (日本語対応×AI自動化×オフショアBPO…最短1日…AI自動化を内製できるBPO…お客様のビジネスを支えるパートナー). og: type website, locale ja_JP, image `/assets/newbgan1.png` (hero illustration). `metadataBase` set to `https://www.wacraft-jp.com` (domain shown in the footer) so og:image resolves absolute.

### Verification results (Next production server on :3133, killed afterwards)

- `npx next build` clean; Noto Sans JP woff2 subsets emitted into `.next/static/media/`.
- `curl -s localhost:3133/ | grep -c 'jsdelivr\|fonts.googleapis'` → 0
- `<title>WA+CRAFT BPO | 業務プロセスの最適化</title>`; og:title/description/locale/type/image present.
- `grep -c '"latest"' package.json` → 0
- before/after rendered-HTML diff: class attributes identical except body font class; only DOM change besides `<img>` attrs is 4 `<i>` → 4 `<svg>` (the icon task). Every inventoried class has a rule in the new block; none skipped.

