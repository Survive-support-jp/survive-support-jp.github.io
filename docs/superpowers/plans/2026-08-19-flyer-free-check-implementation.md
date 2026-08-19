# Flyer Free-Check Conversion Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** QR visitors complete the free check and select a large, measurable phone or family-form route.

**Architecture:** Keep the current three-question calculator. Add result contact choices, simplify the application form, and retain Apps Script/FormSubmit with thank-you conversion tracking.

**Tech Stack:** Static HTML, CSS, browser JavaScript, GA4 `gtag`, Node `assert` tests, GitHub Pages.

## Global Constraints

- Do not publish a telephone number unless the user gives its exact value and reception hours.
- QR destination: `https://survive-support-jp.github.io/bousai/diagnosis/?utm_source=flyer&utm_medium=print&utm_campaign=local_free_check`.
- Retain mandatory privacy consent and preserve the user-owned 2026-08-10 plan file.
- Main mobile targets must be at least 44 CSS px tall.

### Task 1: Add the two contact routes

**Files:** Create `test/flyer-free-check-flow.test.js`; modify `bousai/diagnosis/index.html` and `bousai/diagnosis/diagnosis.js`.

- [ ] Write assertions for `#phone-check-action`, `#family-form-action`, and GA4 events `free_check_phone_tap` and `free_check_family_form_tap`.
- [ ] Run `node test/flyer-free-check-flow.test.js`; it must fail before markup or handlers exist.
- [ ] Add the two result actions. The phone anchor receives a `tel:` href only when a valid public number is configured; without one it explains that telephone reception is being prepared. The family action scrolls to the form. Record one GA4 event for each action.
- [ ] Re-run the test and commit with `git add bousai/diagnosis/index.html bousai/diagnosis/diagnosis.js test/flyer-free-check-flow.test.js && git commit -m "Add free-check contact choices"`.

### Task 2: Reduce the form to the minimum safe data

**Files:** Modify `bousai/diagnosis/index.html`, `bousai/diagnosis/diagnosis.js`, and `test/flyer-free-check-flow.test.js`.

- [ ] Add failing assertions that email, phone, and preferred time are not individually required and that the source contains `電話番号またはメールアドレスを入力してください。`.
- [ ] Run the focused test; it must fail because email and preferred time are currently required.
- [ ] Keep name, area, and privacy consent as native-required. Make phone/email individually optional, then before asynchronous submit block the request when both trimmed values are empty and write the specified error into `#contact-method-error`. Make preferred time and details optional.
- [ ] Re-run the focused test and commit with `git add bousai/diagnosis/index.html bousai/diagnosis/diagnosis.js test/flyer-free-check-flow.test.js && git commit -m "Simplify free-check contact form"`.

### Task 3: Meet the mobile interaction target and publish

**Files:** Modify `styles.css` and `test/flyer-free-check-flow.test.js`.

- [ ] Add failing assertions that `.contact-choice-actions` is flex and its buttons have `min-height: 44px`; run the test and confirm it fails.
- [ ] Add a 12px-gap flex layout, 44px target height, and a narrow-screen column layout. Keep the routes visually separate.
- [ ] Run `node test/flyer-free-check-flow.test.js`, every `test/*.test.js`, and `git diff --check`; each must exit 0.
- [ ] Commit `styles.css` and the test, push, and verify the QR destination returns the new contact-choice content. Verify the IndexNow root key, then notify IndexNow only for the updated diagnosis URL.

## Review

- Coverage: Tasks 1–3 cover contact routes, the minimal form, number-publication boundary, GA4 measurement, 44px mobile actions, and release verification.
- No placeholders: the telephone value remains intentionally absent until supplied by the user.
- Naming: the HTML IDs, GA4 event names, CSS class, and contact fields are identical across all tasks.
