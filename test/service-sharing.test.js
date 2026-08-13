const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const pages = [
  ['bousai/index.html', 'bousai'],
  ['oyasupport/index.html', 'oyasupport'],
  ['ai-living/index.html', 'ai-living'],
];

assert.match(app, /\[data-service-share\]/);
assert.match(app, /service_share/);
assert.match(app, /navigator\.share/);

for (const [page, service] of pages) {
  const source = fs.readFileSync(page, 'utf8');
  assert.match(source, new RegExp(`data-service-share="${service}"`));
  assert.match(source, /家族に共有/);
}

console.log('Every public service page offers a measurable family-sharing path');
