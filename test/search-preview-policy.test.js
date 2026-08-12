const assert = require('node:assert/strict');
const fs = require('node:fs');

const pages = [
  'index.html',
  'bousai/index.html',
  'bousai/diagnosis/index.html',
  'bousai/hanno/index.html',
  'bousai/hidaka/index.html',
  'bousai/iruma/index.html',
  'oyasupport/index.html',
  'ai-living/index.html',
  ...fs.readdirSync('guides').filter((file) => file.endsWith('.html')).map((file) => `guides/${file}`),
];

for (const page of pages) {
  assert.match(fs.readFileSync(page, 'utf8'), /name="robots" content="[^"]*max-image-preview:large/,
    `${page} should permit large search image previews`);
}

console.log('Every public landing page permits large image previews in search');
