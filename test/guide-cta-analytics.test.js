const assert = require('node:assert/strict');
const fs = require('node:fs');

const guides = [
  ['guides/hanno-home-disaster-preparedness.html', 'bousai'],
  ['guides/emergency-toilet-stock-hanno.html', 'bousai'],
  ['guides/ai-smartphone-preparation.html', 'ai-living'],
  ['guides/suspicious-sms-phone-checklist.html', 'ai-living'],
  ['guides/parent-home-visit-checklist.html', 'oyasupport'],
];

for (const [path, target] of guides) {
  const source = fs.readFileSync(path, 'utf8');
  assert.match(source, new RegExp(`data-service-link="${target}"`));
  assert.match(source, /data-link-location="[^"]+-guide"/);
  assert.match(source, /src="\.\.\/app\.js"/);
}

console.log('Every service guide identifies its CTA in GA4');
