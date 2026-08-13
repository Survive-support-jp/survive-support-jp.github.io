const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const thanks = fs.readFileSync('thanks.html', 'utf8');
const diagnosis = fs.readFileSync('bousai/diagnosis/diagnosis.js', 'utf8');
const forms = [
  ['bousai/diagnosis/index.html', 'bousai_free_check', 'free_check'],
  ['oyasupport/index.html', 'parent_support'],
  ['ai-living/index.html', 'ai_living'],
];

assert.match(app, /contact_submit/);
assert.match(app, /lead_service/);
assert.match(thanks, /generate_lead/);
assert.match(thanks, /parent_support/);
assert.match(thanks, /ai_living/);

for (const [page, service, completionService = service] of forms) {
  const source = fs.readFileSync(page, 'utf8');
  assert.match(source, new RegExp(`data-lead-service="${service}"`));
  const completionPath = page === 'bousai/diagnosis/index.html' ? diagnosis : source;
  assert.match(completionPath, new RegExp(`service=${completionService}`));
}

console.log('Every consultation form records an intent and a service-specific completed lead');
