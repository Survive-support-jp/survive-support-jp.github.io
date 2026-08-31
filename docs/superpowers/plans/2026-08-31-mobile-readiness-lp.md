# Mobile Readiness LP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the mobile-first opening sequence of `/bousai/` around a readiness question, concrete 72-hour household needs, the five-year ¥11/day value proposition, and the free diagnosis CTA.

**Architecture:** Keep the page static and dependency-free. Add five semantic landing-page components to `bousai/index.html`, and give them scoped styling in `bousai/editorial.css`. Lock user-facing claims and destination links with Node assertion tests.

**Tech Stack:** HTML5, CSS, Node.js `node:assert` regression tests.

## Global Constraints

- Primary CTA text is exactly `無料で備えを診断する` and destination is `./diagnosis/`.
- One-person price remains `19,800円`; its five-year daily cost is shown as `1日約11円` with `19,800円 ÷ 1,825日 = 約11円`.
- Do not add a numerical Nankai Trough probability, recurrence, or timing assertion without a primary source.
- Pack facts remain: 500mL water x 18, meals, えいようかん 5本, and emergency toilet 15 uses.
- At 390px wide, the new components use a one-column layout and preserve a visible diagnosis CTA.

---

### Task 1: Lock the new mobile narrative with regression tests

**Files:**
- Modify: `test/price-value-display.test.js`

**Interfaces:**
- Consumes: `bousai/index.html`, `bousai/editorial.css`
- Produces: assertions that later page and style work must satisfy.

- [ ] **Step 1: Write the failing test**

```js
const editorialCss = fs.readFileSync('bousai/editorial.css', 'utf8');

assert.match(source, /災害時、いざという時。/);
assert.match(source, /ご自宅の備えは、十分に整っていますか？/);
assert.match(source, /1日約11円/);
assert.match(source, /19,800円 ÷ 1,825日 = 約11円/);
assert.match(source, /href="\.\/diagnosis\/"/);
assert.match(editorialCss, /readiness-value/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node test/price-value-display.test.js`

Expected: assertion failure because the readiness components do not exist.

- [ ] **Step 3: Add the CSS source read used by the new assertion**

```js
// The source read belongs beside the other page fixtures at the top of the test.
```

- [ ] **Step 4: Re-run the focused test**

Run: `node test/price-value-display.test.js`

Expected: still fails on the absent user-facing components.

### Task 2: Assemble semantic readiness components in the page

**Files:**
- Modify: `bousai/index.html`

**Interfaces:**
- Consumes: existing product image paths and `./diagnosis/` route.
- Produces: `.readiness-hero`, `.readiness-stakes`, `.readiness-pack`, `.readiness-value`, `.readiness-diagnosis-cta` sections.

- [ ] **Step 1: Add the question-led hero above existing product sections**

```html
<section class="readiness-hero">
  <p class="readiness-eyebrow">家族のための、在宅避難の備え</p>
  <h1>災害時、いざという時。<br>ご自宅の備えは、十分に整っていますか？</h1>
  <a href="./diagnosis/">無料で備えを診断する</a>
</section>
```

- [ ] **Step 2: Add stakes, pack, value, and diagnosis components in that order**

Use accessible headings and list markup. Include only the source-backed pack quantities and the exact value formula from the global constraints.

- [ ] **Step 3: Retarget mobile-only hero and sticky CTA links to `./diagnosis/`**

Keep desktop consultation sections intact; the mobile entry path becomes the free diagnosis.

- [ ] **Step 4: Run the focused test**

Run: `node test/price-value-display.test.js`

Expected: failure only until component styles are present.

### Task 3: Style each component for the mobile reading path

**Files:**
- Modify: `bousai/editorial.css`

**Interfaces:**
- Consumes: the five readiness component class names from Task 2.
- Produces: a responsive, accessible one-column mobile visual system.

- [ ] **Step 1: Add component-level desktop defaults**

Create a visual sequence using ivory for reflection, green for reassurance, and coral only for action/value highlights. Use `min()`/`clamp()` for widths and type, and retain the existing font stack.

- [ ] **Step 2: Add the 760px mobile rules**

Make the pack card list one column, preserve at least 48px CTA height, and add bottom space so `.mobile-sticky-cta` cannot cover the last action.

- [ ] **Step 3: Run the focused test**

Run: `node test/price-value-display.test.js`

Expected: PASS.

### Task 4: Verify the finished landing page

**Files:**
- Test: `test/*.test.js`

**Interfaces:**
- Consumes: all modified page, style, and focused test files.
- Produces: validated mobile page evidence.

- [ ] **Step 1: Run the entire Node regression suite**

Run: `for test_file in test/*.test.js; do node "$test_file"; done`

Expected: each test exits 0.

- [ ] **Step 2: Serve the static site and capture a 390px-wide screenshot**

Run: `python3 -m http.server 4173 --directory .`

Open: `http://127.0.0.1:4173/bousai/` at 390px width.

Expected: question, pack content, value formula, and diagnosis CTA appear in a single-column readable order.

- [ ] **Step 3: Inspect the final diff**

Run: `git diff --check && git diff -- bousai/index.html bousai/editorial.css test/price-value-display.test.js`

Expected: no whitespace errors and only scoped landing-page changes.

- [ ] **Step 4: Commit the feature branch**

```bash
git add bousai/index.html bousai/editorial.css test/price-value-display.test.js docs/superpowers/specs/2026-08-31-mobile-readiness-lp-design.md docs/superpowers/plans/2026-08-31-mobile-readiness-lp.md
git commit -m "feat: add mobile readiness landing narrative"
```
