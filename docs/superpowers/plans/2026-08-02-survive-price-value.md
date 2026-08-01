# 3日間サバイブパック価格価値表示 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 防災セットの物品価格ではなく、訪問設置と最長5年間の期限管理を含むサービス価格として35,000円を表示する。

**Architecture:** 静的HTMLの料金カードを商品名・構成価値・期間換算で更新する。診断結果はJavaScriptが算出する人数別価格の説明へ、同じサービス価値を追加する。

**Tech Stack:** Static HTML, vanilla JavaScript, Node assertion tests.

## Global Constraints

- 商品名は `3日間サバイブパック`。
- 5年間の表現は必ず `最長5年間の期限管理` とする。
- 補充品の代金まで含む表現はしない。

---

### Task 1: 料金カードの価値表示

**Files:**
- Modify: `bousai/index.html`
- Test: `test/price-value-display.test.js`

- [ ] **Step 1: Write the failing test**

```js
assert.match(source, /3日間サバイブパック/);
assert.match(source, /備蓄品一式＋訪問設置＋最長5年間の期限管理/);
assert.match(source, /最長5年間で1日あたり約49円/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node test/price-value-display.test.js`

- [ ] **Step 3: Update the price card**

Replace the current `3日間パック` label with `3日間サバイブパック` and place the approved value proposition below the price. Add a three-person example with the approved daily amount.

- [ ] **Step 4: Run test to verify it passes**

Run: `node test/price-value-display.test.js`

### Task 2: 診断結果の価値表示

**Files:**
- Modify: `bousai/diagnosis/diagnosis.js`
- Test: `test/price-value-display.test.js`

- [ ] **Step 1: Extend the failing test**

```js
assert.match(diagnosisSource, /最長5年間の期限管理/);
```

- [ ] **Step 2: Update the result copy**

Add `備蓄品一式・訪問設置・最長5年間の期限管理を含む` after the calculated price, while retaining the existing note that actual estimates use only necessary items.

- [ ] **Step 3: Run all tests and commit**

Run: `node test/price-value-display.test.js && node test/diagnosis-submission.test.js && node test/apps-script-reception.test.js && node test/reception-frame-policy.test.js`
