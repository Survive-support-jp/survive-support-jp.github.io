# Survive Editorial Site System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Survive disaster-pack page as one consistent, photo-led editorial journey on mobile and desktop.

**Architecture:** Replace the non-hero page markup with semantic editorial sections while preserving factual copy and the contact anchor. Add a dedicated stylesheet loaded after existing styles so desktop and mobile share one visual system without dependencies.

**Tech Stack:** Static HTML, CSS media queries, Node.js `assert` tests.

## Global Constraints

- Preserve all published prices and current pack contents.
- Preserve the `#contact` email consultation flow.
- Use only Survive-owned or generated images.
- Add no external dependencies.

---

### Task 1: Add editorial section regression coverage

**Files:**
- Modify: `test/price-value-display.test.js`
- Modify: `bousai/index.html`

- [ ] **Step 1: Write the failing test**

```js
assert.match(source, /editorial-pack/);
assert.match(source, /editorial-contents/);
assert.match(source, /editorial-service/);
assert.match(source, /editorial-pricing/);
assert.match(source, /editorial-flow/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node test/price-value-display.test.js`

Expected: assertion failure because editorial section classes do not exist.

- [ ] **Step 3: Write minimal implementation**

Replace the current contents, service, pricing, and flow section wrappers with the five editorial classes. Preserve the existing pack facts, prices, FAQ, and `#contact` anchor.

- [ ] **Step 4: Run test to verify it passes**

Run: `node test/price-value-display.test.js`

Expected: `Price presentation communicates service value and term`.

### Task 2: Apply the shared editorial visual system

**Files:**
- Create: `bousai/editorial.css`
- Modify: `bousai/index.html`

- [ ] **Step 1: Add stylesheet link**

```html
<link rel="stylesheet" href="editorial.css">
```

- [ ] **Step 2: Implement the styles**

Create only class-scoped styles for `.editorial-*`: large mobile typography, opaque white labels, photo-led sections, coral half-pill CTAs, and a roomy desktop grid.

- [ ] **Step 3: Render both breakpoints**

Run the headless browser at `390x844` and `1440x1100`, then visually inspect both screenshots.

- [ ] **Step 4: Commit**

```bash
git add bousai/index.html bousai/editorial.css test/price-value-display.test.js
git commit -m "Rebuild disaster pack page as editorial journey"
```
