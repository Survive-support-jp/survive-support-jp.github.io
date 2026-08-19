const assert = require('node:assert/strict');
const fs = require('node:fs');

const page = fs.readFileSync('bousai/diagnosis/index.html', 'utf8');
const source = fs.readFileSync('bousai/diagnosis/diagnosis.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

assert.match(page, /id="phone-check-action"/);
assert.match(page, /id="family-form-action"/);
assert.match(source, /電話番号またはメールアドレスを入力してください/);
assert.doesNotMatch(page, /name="email"[^>]*required/);
assert.doesNotMatch(page, /name="phone"[^>]*required/);
assert.doesNotMatch(page, /name="preferred_time"[^>]*required/);
assert.match(source, /free_check_phone_tap/);
assert.match(source, /free_check_family_form_tap/);
assert.match(source, /\['utm_source', 'utm_medium', 'utm_campaign'/);
assert.match(css, /\.contact-choice-actions\s*\{[^}]*display:\s*flex/);
assert.match(css, /\.contact-choice-actions \.button\s*\{[^}]*min-height:\s*44px/);

console.log('Flyer visitors can select an accessible free-check contact route');
