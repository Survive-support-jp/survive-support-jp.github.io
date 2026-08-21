# Diagnosis-First A4 Flyer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a print-ready A4 one-sided posting flyer that makes a household start the free stockpile diagnosis before considering the product.

**Architecture:** Create one standalone HTML print source outside the public site and derive a PDF and PNG preview from it. Reuse the actual product photograph; generate the QR locally from the exact UTM URL. Keep all customer-facing claims and price definitions in the standalone source so the preview and print output cannot diverge.

**Tech Stack:** Static HTML/CSS, local QR generator, Chromium print-to-PDF, PNG rendering, QR decoding.

## Global Constraints

- Portrait A4, one side only.
- Main reader sequence: three-day question → government preparedness baseline → free QR diagnosis → product as the next option.
- Price: `1人 19,800円（税込目安）`; describe it as an initial-ten-household regional visit price and one-person guide price.
- Use `国が案内する家庭備蓄の目安をもとに`; never say the product is nationally certified, standard-compliant, or guarantees survival.
- State `最長5年間の期限管理`; do not claim that every item is preserved for five years.
- Include water `1人1日3L × 最低3日 = 9L`, food `最低3日分`, and emergency toilet `1人1日5回 × 最低3日 = 15回分`.
- Encode exactly `https://survive-support-jp.github.io/bousai/diagnosis/?utm_source=flyer&utm_medium=offline&utm_campaign=first_50&utm_content=v2`.
- Do not add a personal telephone number or a blank phone-number field.
- Use the actual three-day-pack product image, not an invented product image.

---

### Task 1: Add source-content checks

**Files:**
- Create: `test/diagnosis-first-flyer.test.js`
- Create: `44_A4片面チラシ_備蓄診断先行.html`

**Interfaces:**
- Consumes: the standalone flyer HTML source as UTF-8 text.
- Produces: an assertion script that protects headline, price, claim wording, CTA URL, and prohibited wording.

- [ ] **Step 1: Write the failing test.**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../44_A4片面チラシ_備蓄診断先行.html', import.meta.url), 'utf8');
assert.match(html, /あなたの家は、3日もつ？/);
assert.match(html, /1人\s*19,800円（税込目安）/);
assert.match(html, /国が案内する家庭備蓄の目安をもとに/);
assert.match(html, /utm_content=v2/);
assert.doesNotMatch(html, /国の基準に対応|生存できる|必ず安心/);
```

- [ ] **Step 2: Run the test and verify it fails because the source file does not exist.**

Run: `node test/diagnosis-first-flyer.test.js`  
Expected: `ENOENT` for `44_A4片面チラシ_備蓄診断先行.html`.

- [ ] **Step 3: Commit the test separately.**

```bash
git add test/diagnosis-first-flyer.test.js
git commit -m "test: define diagnosis-first flyer copy"
```

### Task 2: Build the print source and QR asset

**Files:**
- Create: `44_A4片面チラシ_備蓄診断先行.html`
- Create: `assets/flyer-diagnosis-qr-v2.png`

**Interfaces:**
- Consumes: product image `bousai/assets/3day-pack-product-photo.png` and the exact UTM URL above.
- Produces: a self-contained browser-printable A4 document that references the generated QR image.

- [ ] **Step 1: Create the QR asset with the exact URL.**

Run a repository-available QR generator or a pinned local command. Save the asset as `assets/flyer-diagnosis-qr-v2.png`; do not reuse the previous unverified QR.

- [ ] **Step 2: Create the flyer layout.**

Use semantic sections in this order:

```html
<header class="hero">…あなたの家は、3日もつ？…</header>
<section class="baseline">…水・食料・非常用トイレ…</section>
<section class="diagnosis-cta">…QR・30秒・無料診断…</section>
<section class="pack">…3日間サバイブパック・19,800円・実物写真…</section>
```

Apply `@page { size: A4 portrait; margin: 0; }`, fixed A4 dimensions, print-safe padding, deep green / white / muted sand palette, and sufficiently large QR quiet zone.

- [ ] **Step 3: Run the content test and verify it passes.**

Run: `node test/diagnosis-first-flyer.test.js`  
Expected: process exit code 0.

- [ ] **Step 4: Commit source and QR asset.**

```bash
git add 44_A4片面チラシ_備蓄診断先行.html assets/flyer-diagnosis-qr-v2.png
git commit -m "feat: add diagnosis-first flyer"
```

### Task 3: Render and inspect the deliverables

**Files:**
- Create: `pdf/44_A4片面チラシ_備蓄診断先行.pdf`
- Create: `preview/44_A4片面チラシ_備蓄診断先行.png`

**Interfaces:**
- Consumes: the standalone HTML flyer and QR asset.
- Produces: an A4 PDF suitable for printing and a PNG suitable for visual review.

- [ ] **Step 1: Render the source HTML to PDF using Chromium’s print engine.**

Run a local Chromium/Brave headless command with `--print-to-pdf`, `--no-pdf-header-footer`, and the standalone HTML file URL.

- [ ] **Step 2: Render page one of the PDF to a PNG preview.**

Use Poppler’s `pdftoppm -png -r 150` and retain only the first-page preview.

- [ ] **Step 3: Decode the QR from the rendered PNG and compare it exactly.**

Run a local decoder such as `zbarimg --raw preview/44_A4片面チラシ_備蓄診断先行.png`.

Expected output: `https://survive-support-jp.github.io/bousai/diagnosis/?utm_source=flyer&utm_medium=offline&utm_campaign=first_50&utm_content=v2`

- [ ] **Step 4: Inspect the PNG at full page and cropped CTA sizes.**

Confirm no clipped content, no unreadably small body copy, no QR overlap, and no whitespace accidentally consuming the CTA.

- [ ] **Step 5: Commit the output artifacts.**

```bash
git add pdf/44_A4片面チラシ_備蓄診断先行.pdf preview/44_A4片面チラシ_備蓄診断先行.png
git commit -m "docs: add print-ready diagnosis flyer"
```
