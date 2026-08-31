# Mobile Readiness LP Design

## Goal

Make the mobile-first `/bousai/` landing page lead with a calm question, turn the first 72 hours of a disaster into a concrete household problem, and offer a free readiness diagnosis as the primary action.

## Audience and message

- Primary audience: adults aged roughly 35 and over who manage a home or family and have not yet prepared a household stockpile.
- Promise: the 3-day pack is designed to cover water, meals, a sweet energy source, and toilet needs at home for the first 72 hours.
- Value proposition: the one-person ¥19,800 pack lasts five years from purchase. `¥19,800 / (5 * 365) = ¥10.85`, communicated as "1日約11円".
- Primary CTA: "無料で備えを診断する", linking to `./diagnosis/`.
- Tone: direct and calm. Do not assert a specific earthquake occurrence or use fear-only copy.

## Mobile narrative

1. Question: "災害時、いざという時。ご自宅の備えは、十分に整っていますか？"
2. Stakes: without water, food, or a toilet, ordinary life becomes difficult during the first 72 hours.
3. Solution: present the four concrete preparedness categories: water, meals, sweet energy, and toilet.
4. Value: show five years and ¥11/day with the transparent calculation.
5. Action: open the free diagnosis, not a purchase form.

## Components

### `readiness-hero`

The mobile entry component contains an overlaid domestic image, the question headline, a 72-hour support line, and the diagnosis CTA. It must remain readable on a 390px-wide screen.

### `readiness-stakes`

A text-first transition from a vague disaster concern to three household needs: drink, eat, and use a toilet. It must not contain an unsupported probability or timing claim about Nankai Trough earthquakes.

### `readiness-pack`

A four-card component that names the physical contents: water, meals, えいようかん, and a 15-use emergency toilet. It uses the existing product photo as evidence of the real pack rather than generated product imagery.

### `readiness-value`

A dark, high-contrast value component displaying "5年間" and "1日約11円" alongside the visible formula `19,800円 ÷ 1,825日 = 約11円`. It explicitly states this is for one person and that the pack covers three days.

### `readiness-diagnosis-cta`

An inline transition to `./diagnosis/`, with a sentence explaining that the diagnosis starts from the household's current supplies and storage situation. This must be used for the hero and sticky mobile CTA.

## Files and boundaries

- `bousai/index.html` owns the semantic document structure and copy.
- `bousai/editorial.css` owns component layout, typography, color, and mobile behavior.
- `test/price-value-display.test.js` owns regression checks for the landing-page claims and diagnosis routing.
- Existing service, contact, FAQ, and pricing sections remain intact below the new mobile story.

## Accessibility and responsive requirements

- Use headings, lists, and real links; no clickable non-link containers.
- Keep the text contrast high on dark and image-backed sections.
- At 390px, preserve a single-column reading order and do not hide the diagnosis CTA behind the sticky bar.
- Keep source-backed pack quantities exactly aligned with existing copy.

