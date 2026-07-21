---
title: 'Hero content and comparison table: from images to real HTML'
type: 'feature'
created: '2026-07-22'
status: 'done'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The hero is one PNG (`newbgan1.png`) containing all headline text, and the comparison section is one JPEG (`newtable.jpeg`) containing a full table — Google cannot index either, screen readers cannot read them, mobile rendering is poor, and copy changes require a designer (tasks 3.1, 3.2, 5.1, 5.2, 5.3b, 5.4b).

**Approach:** Rebuild both as real HTML using the exact text extracted from the images (transcribed below in Design Notes — the single source of truth). Hero keeps the illustration as a background/side image with a CSS-gradient fallback; comparison becomes a semantic `<table>` (`ComparisonTable.tsx`) with the WA+CRAFT column highlighted, horizontally scrollable on mobile.

## Boundaries & Constraints

**Always:** Japanese copy must be byte-identical to the transcription in Design Notes. Visual style must stay in the page's existing design language (current fonts, CTA gradient `#ff7a3d→#f04438`, existing spacing scale, existing tokens from globals.css). The hero must remain above the fold with a working CTA area. Table must use `<caption>`/`<th scope>` semantics and remain readable at 360px width (horizontal scroll inside its own container is acceptable).

**Ask First:** Any wording change to the transcribed copy. Dropping the illustration character image entirely.

**Never:** Do not keep text baked in images for these two sections. No new npm dependencies. No redesign of other sections.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Hero image fails to load | Broken/blocked image | Text fully readable on gradient fallback background | CSS background-color/gradient behind image |
| Search engine crawl | GET / | Hero headline + table content present as text in HTML | N/A |
| Mobile 360px | Comparison table | Table scrolls horizontally inside its wrapper; page body does not scroll sideways | `overflow-x:auto` wrapper |
| Screen reader | Hero + table | Headline hierarchy (single `<h1>`) and table header associations announced | `scope`/`<caption>` |

</frozen-after-approval>

## Code Map

- `components/sections/HeroSection.tsx` -- currently just the full-bleed `<img src="/assets/newbgan1.png">`; rebuild
- `components/sections/ComparisonSection.tsx` -- currently `<img src="/assets/newtable.jpeg">`; add `ComparisonTable`
- NEW: `components/sections/ComparisonTable.tsx`
- `app/globals.css` -- hero styles at `.hero-section`/`.hero-*` (~line 104-155 of old sheet); append new `.hero-*`/`.comparison-table*` rules at a marked section
- `public/assets/newbgan1.png` -- 1331×739; text occupies left ~55%, character illustration right side

## Tasks & Acceptance

**Execution:**
- [x] `components/sections/HeroSection.tsx` -- Rebuild: `<h1>` headline, sub-copy line, 3 checkmark bullet items, all from Design Notes transcription; keep the section CTA-free (header/sidebar own conversion) unless a CTA already existed; illustration (character) shown via `background-image` or side `<img>` with empty-alt (decorative), gradient fallback -- hero becomes indexable and editable
- [x] `app/globals.css` -- New hero layout styles reusing existing tokens; remove the `margin: -75px 0 0` hack if present (task 8's cleanup falls out naturally); responsive stack at existing breakpoints -- clean layout without the old negative-margin patch
- [x] `components/sections/ComparisonTable.tsx` -- Semantic table per transcription: caption 「WA+CRAFT BPOにお任せください！」(or keep it as the section heading if one exists), 4 columns, 5 rows, ×/△/◎ markers with `aria-hidden` + visually-hidden text equivalents (劣る/普通/優れる), WA+CRAFT column highlighted -- accessible, indexable comparison
- [x] `components/sections/ComparisonSection.tsx` -- Replace the `<img>` with `<ComparisonTable />` inside an `overflow-x:auto` wrapper -- responsive swap

**Acceptance Criteria:**
- Given `curl -s localhost:<port>/`, when grepping for 「業務プロセスの最適化」 and 「オフショア活用で」, then both appear as text in the HTML
- Given the rendered page, when images are disabled, then hero text is readable and the comparison data is fully visible
- Given viewport 360px, when viewing the comparison section, then the page has no body-level horizontal scroll

## Design Notes

**Hero transcription (from newbgan1.png — byte-exact source of truth):**
- Brand line: `WA+CRAFT BPO`
- Headline (h1): `業務プロセスの最適化!`
- Sub-copy: `日本語対応 × AI自動化 × オフショアBPOソリューションで、最短1日から超高速導入!` (colored emphasis: 日本語対応/AI自動化/オフショアBPO as accent words, 最短1日 in orange — mirror with spans)
- Bullets (checkmarks): `AI自動化を内製できるBPO` / `最短24時間で神速システム構築` / `プロフェッショナルなチーム運営`
- Speech bubble (attach to illustration; may render as styled aside): `こんにちは、WA+CRAFT BPOです。お客様のビジネスを支えるパートナーとして、いつでもお気軽にご相談ください。`

**Comparison table transcription (from newtable.jpeg):**
Header row: `比較項目` | `自社実施` | `一般的なBPO` | `WA+CRAFT BPO`
1. `コスト`: × `高コスト` | △ `主に国内人財でやや高額` | ◎ `オフショア活用で最大50〜60%のコスト削減可能`
2. `柔軟性`: × `人員調整が難しい` | △ `契約範囲内での調整が中心` | ◎ `スケールフリー運用で人員変動に強い`
3. `継続性`: × `担当者に依存し退職リスクあり` | △ `担当者の交代は可能だが品質に差が出る場合あり` | ◎ `若手IT人材の継続確保で長期的な安定運用を実現`
4. `標準化`: × `マニュアル整備が遅れている` | △ `既存のプロセスをそのまま運用` | ◎ `日本語マニュアルと日本式のチェック体制を完備`
5. `改善・見直し`: × `日常業務に追われて改善が難しい` | △ `契約範囲内での改善に限定` | ◎ `AIによる自動化と継続的な改善提案を実施`

Hero illustration: crop/reuse `newbgan1.png` as the right-side visual (text will overlay-duplicate inside it — acceptable if the image is positioned so its text zone is hidden/cropped, otherwise prefer showing only the right half via `background-position`), or use another existing character asset from `/assets` if a clean one exists. Never show the baked-in text twice.

## Verification

**Commands:**
- `npx next build` -- expected: clean
- `npx next start -p 3127` + `curl -s localhost:3127/ | grep -c '業務プロセスの最適化\|オフショア活用で最大50'` -- expected: ≥2
- `curl -s localhost:3127/ | grep -c 'newtable.jpeg'` -- expected: 0

**Manual checks (if no CLI):**
- 360px/768px/1280px: hero text legible, no double text from the background image, table scrolls inside wrapper only.

## Implementation Notes

- **Illustration approach:** No clean standalone character asset existed (`woman04.svg`/`woman03.svg`/`woman051.png` are flat line-art icons that clash with the anime-style hero), so `newbgan1.png` is reused via pure CSS cropping: `.hero-character` has `aspect-ratio: 373 / 739` with `background: url('/assets/newbgan1.png') right center / cover no-repeat`. With `cover` + right positioning that geometry makes the visible slice start at ~72% of the image width (x≈958 of 1331), past both the baked-in headline text and the baked-in speech bubble — verified against a pixel crop of the source PNG. No double text at any width because the crop ratio is width-independent.
- **Bubble treatment:** Recreated as a real CSS element — `<aside class="hero-bubble">` styled as a dark-navy (`#2a1458`) circle with white text, absolutely positioned over the left edge of the illustration on desktop; below 768px it becomes a static centered circle stacked above the character.
- **Table min-width:** `720px` on `.comparison-table` (4 columns with the long WA+CRAFT sentences stay readable), inside `.comparison-table-wrap { overflow-x: auto; }` so only the wrapper scrolls at 360px.
- **Cleanup done:** removed the old `.hero-mainvis-*` / `.hero-inner-wrap` / `.hero-bg-overlay` rules including the `margin: -75px 0 0` hack and the `.hero-section { background: transparent !important }` overrides; removed `.comparison-svg-*` rules. Added `.visually-hidden` utility to `globals.css`.
- **Verification results (2026-07-22):** `npx next build` clean; on `next start -p 3131`: `業務プロセスの最適化` ×1, `オフショア活用で最大50` ×1, `newtable.jpeg` ×0, `<h1` ×1 (only h1 on the page); all transcribed strings (bullets, bubble, caption, all table cells, 劣る/普通/優れる) grep byte-exact ×1 each.
