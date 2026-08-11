# Mobile-first lifestyle hero LP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Survive disaster-pack LP convert cleanly from a 390px smartphone screen using a lifestyle hero, exact product photo, and a persistent consultation CTA.

**Architecture:** Keep the static HTML page and existing desktop stylesheet. Add a lifestyle background image, compact hero labels, and a mobile-only sticky CTA; use the exact product photograph and `#contact` anchor. The regression test reads the final static source and asserts the durable customer-facing contract.

**Tech Stack:** Static HTML, CSS media queries, Node.js `assert` tests.

## Global Constraints

- Keep published prices: 1 person 29,000 yen; 2 people 54,000 yen; 3 people 79,000 yen; 4 people 104,000 yen.
- Keep the existing `#contact` mailto consultation flow unchanged.
- Add no external dependencies.
- On screens at most 760px, no hero copy, price, or CTA may overflow horizontally.

---

### Task 1: Replace proof cards with a lifestyle hero and regression coverage

**Files:**
- Modify: `bousai/index.html`
- Modify: `bousai/mobile.css`
- Create: `bousai/assets/mobile-home-entryway.png`
- Modify: `test/price-value-display.test.js`

**Interfaces:**
- Consumes: the existing `#contact` section and `assets/3day-pack-product-photo.png`.
- Produces: `.mobile-lifestyle-hero`, `.hero-label`, `.mobile-sticky-cta`, and source assertions that keep their copy and link intact.

- [ ] **Step 1: Write the failing test**

```js
assert.match(source, /mobile-lifestyle-hero/);
assert.match(source, /mobile-home-entryway\.png/);
assert.match(source, /1人 29,000円から/);
assert.match(source, /mobile-sticky-cta/);
assert.match(source, /href="#contact"/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node test/price-value-display.test.js`

Expected: assertion failure because the lifestyle hero and its background asset do not exist.

- [ ] **Step 3: Write minimal implementation**

```html
<section class="mobile-lifestyle-hero">
  <p class="hero-label">飯能市・日高市・入間市周辺</p>
  <h1><span>家に置ける、</span><span>3日分の備え。</span></h1>
  <img src="assets/3day-pack-product-photo.png" alt="3日間パックの中身">
  <p class="hero-price-label">1人 29,000円から</p>
</section>
<a class="mobile-sticky-cta" href="#contact">無料で備えを確認する <span aria-hidden="true">→</span></a>
```

Use `mobile-home-entryway.png` as the mobile hero background. In `mobile.css`, show compact white labels and the exact product image over that background, then add a fixed bottom CTA at widths at most 760px and hide that CTA above 760px.

- [ ] **Step 4: Run test to verify it passes**

Run: `node test/price-value-display.test.js`

Expected: `Price presentation communicates service value and term`.

- [ ] **Step 5: Render and inspect both breakpoints**

Run:

```bash
'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser' --headless --disable-gpu --hide-scrollbars --window-size=390,844 --screenshot=/tmp/survive-mobile.png https://survive-support-jp.github.io/bousai/
'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser' --headless --disable-gpu --hide-scrollbars --window-size=1440,1100 --screenshot=/tmp/survive-desktop.png https://survive-support-jp.github.io/bousai/
```

Expected: the 390px rendering has no horizontal clipping and a fixed CTA; the desktop rendering has no fixed CTA.

- [ ] **Step 6: Commit**

```bash
git add bousai/index.html bousai/mobile.css test/price-value-display.test.js
git commit -m "Improve mobile disaster pack conversion"
```
