const assert = require('node:assert/strict');
const fs = require('node:fs');

const pages = [
  'bousai/index.html',
  'bousai/diagnosis/index.html',
  'bousai/hanno/index.html',
  'bousai/hidaka/index.html',
  'bousai/iruma/index.html',
  'guides/ai-smartphone-preparation.html',
  'guides/emergency-toilet-stock-hanno.html',
  'guides/hanno-home-disaster-preparedness.html',
  'guides/suspicious-sms-phone-checklist.html',
];

for (const page of pages) {
  const source = fs.readFileSync(page, 'utf8');
  assert.match(source, /property="og:title"/, `${page} needs an Open Graph title`);
  assert.match(source, /property="og:description"/, `${page} needs an Open Graph description`);
  assert.match(source, /property="og:url"/, `${page} needs an Open Graph URL`);
  assert.match(source, /name="twitter:card"/, `${page} needs a Twitter card`);
}

console.log('Every public service and guide page has share metadata');
