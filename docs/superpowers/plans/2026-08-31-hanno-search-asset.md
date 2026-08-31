# Hanno Search Asset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Hanno disaster-preparedness guide the source-backed informational entry point and add distinct local problem guides that lead to diagnosis.

**Architecture:** `guides/hanno-home-disaster-preparedness.html` is the information URL; `bousai/hanno/` is a consultation page. Each guide has a distinct intent, canonical, Article metadata, official links, measured CTA, and a sitemap URL.

**Tech Stack:** Static HTML, JSON-LD, Node.js `assert` tests, XML sitemap.

## Global Constraints

- Use only official municipal, prefectural, and national sources for changing preparedness facts.
- Do not say that staying home is safe without directing readers to official hazard and evacuation information.
- Preserve the diagnostic flow and UTM measurement convention.
- Do not create city-name-swapped duplicate content.
- Do not modify unrelated `docs/superpowers/plans/2026-08-10-flyer-conversion-lp.md`.

---

### Task 1: Define the information-guide and consultation-LP boundary

**Files:**
- Create: `test/hanno-search-asset.test.js`
- Modify: `guides/hanno-home-disaster-preparedness.html`, `bousai/hanno/index.html`, `sitemap.xml`

**Interfaces:** Produces a single informational canonical page, a consultation-only local page, and matching sitemap dates.

- [ ] **Step 1: Write the failing test**

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const guide = fs.readFileSync('guides/hanno-home-disaster-preparedness.html', 'utf8');
const localPage = fs.readFileSync('bousai/hanno/index.html', 'utf8');
assert.match(guide, /飯能市の防災備蓄リスト/);
assert.match(guide, /飯能市地域防災計画/);
assert.match(guide, /data-service-link="bousai"/);
assert.match(localPage, /飯能市の防災備蓄・無料チェック/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node test/hanno-search-asset.test.js`  
Expected: FAIL because the new title and LP role text are absent.

- [ ] **Step 3: Implement the minimum content boundary**

Replace the guide title, H1, opening answer, and headings with a source-backed checklist. Add official Hanno City disaster, hazard-map, regional-plan, and Saitama disaster-portal links. Make the LP consultation-focused and link it to the guide. Change only these sitemap dates to `2026-08-31`.

- [ ] **Step 4: Run the focused and full tests**

Run: `node test/hanno-search-asset.test.js && for test in test/*.test.js; do node "$test"; done && git diff --check`  
Expected: all Node assertions pass and diff check is silent.

- [ ] **Step 5: Commit**

```bash
git add guides/hanno-home-disaster-preparedness.html bousai/hanno/index.html sitemap.xml test/hanno-search-asset.test.js
git commit -m "feat: strengthen Hanno preparedness search guide"
```

### Task 2: Add the older-adult household guide

**Files:**
- Modify: `test/hanno-search-asset.test.js`, `guides/index.html`, `sitemap.xml`
- Create: `guides/hanno-senior-disaster-stockpile.html`

**Interfaces:** Produces one unique local guide for households supporting an older adult.

- [ ] **Step 1: Write the failing test**

```js
const seniorGuide = fs.readFileSync('guides/hanno-senior-disaster-stockpile.html', 'utf8');
assert.match(seniorGuide, /高齢者等避難/);
assert.match(seniorGuide, /data-link-location="hanno-senior-stockpile-guide"/);
assert.match(seniorGuide, /飯能市の防災備蓄リスト/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node test/hanno-search-asset.test.js`  
Expected: FAIL with `ENOENT` because the guide is absent.

- [ ] **Step 3: Implement the guide and discovery links**

Create an Article page with official-alert priority, daily medication and care-item confirmation without medical advice, communication contacts, evacuation-support confirmation, official sources, and a measured CTA. Add a card to the guide index and a sitemap URL with `lastmod` `2026-08-31`.

- [ ] **Step 4: Run the focused and full tests**

Run: `node test/hanno-search-asset.test.js && for test in test/*.test.js; do node "$test"; done && git diff --check`  
Expected: all assertions pass and no whitespace errors are reported.

- [ ] **Step 5: Commit**

```bash
git add guides/hanno-senior-disaster-stockpile.html guides/index.html sitemap.xml test/hanno-search-asset.test.js
git commit -m "feat: add Hanno senior preparedness guide"
```

### Task 3: Localize the power-outage smartphone guide

**Files:**
- Modify: `test/hanno-search-asset.test.js`, `guides/power-outage-smartphone-preparation.html`, `guides/hanno-home-disaster-preparedness.html`, `guides/index.html`, `sitemap.xml`

**Interfaces:** Produces a purpose-specific guide linked from the Hanno guide and guide index.

- [ ] **Step 1: Write the failing test**

```js
const powerGuide = fs.readFileSync('guides/power-outage-smartphone-preparation.html', 'utf8');
assert.match(powerGuide, /飯能市/);
assert.match(powerGuide, /モバイルバッテリー/);
assert.match(powerGuide, /data-link-location="power-outage-smartphone-guide"/);
assert.match(guide, /power-outage-smartphone-preparation\.html/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node test/hanno-search-asset.test.js`  
Expected: FAIL because the Hanno guide does not link to the outage guide and its local scope is absent.

- [ ] **Step 3: Implement missing local context and links**

Add an Hanno official-information paragraph to the existing outage guide, a measured CTA, a contextual link from the Hanno guide, distinct guide-index wording, and sitemap `lastmod` `2026-08-31`.

- [ ] **Step 4: Run the focused and full tests**

Run: `node test/hanno-search-asset.test.js && for test in test/*.test.js; do node "$test"; done && git diff --check`  
Expected: focused and existing guide tests pass.

- [ ] **Step 5: Commit**

```bash
git add guides/power-outage-smartphone-preparation.html guides/hanno-home-disaster-preparedness.html guides/index.html sitemap.xml test/hanno-search-asset.test.js
git commit -m "feat: connect Hanno outage preparedness guide"
```

### Task 4: Add the Search Console review ledger

**Files:**
- Create: `docs/search-console-query-review.md`
- Modify: `README.md`, `test/hanno-search-asset.test.js`

**Interfaces:** Produces a weekly manual procedure and a change ledger.

- [ ] **Step 1: Write the failing documentation-presence test**

```js
const review = fs.readFileSync('docs/search-console-query-review.md', 'utf8');
assert.match(review, /掲載順位8〜20位/);
assert.match(review, /変更日/);
assert.match(review, /AI表示は通常検索と別/);
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node test/hanno-search-asset.test.js`  
Expected: FAIL with `ENOENT` because the review guide is absent.

- [ ] **Step 3: Implement the review procedure**

Document the 3-month web-search view, query × page table, 8–20 candidate filter, title/H1/opening/headings editing order, and ledger fields: date, URL, query, impressions, clicks, CTR, position. Record AI impressions separately until their volume is sufficient.

- [ ] **Step 4: Run the focused and full tests**

Run: `node test/hanno-search-asset.test.js && for test in test/*.test.js; do node "$test"; done && git diff --check`  
Expected: all tests pass and no whitespace errors are reported.

- [ ] **Step 5: Commit**

```bash
git add docs/search-console-query-review.md README.md test/hanno-search-asset.test.js
git commit -m "docs: add Search Console query review workflow"
```

