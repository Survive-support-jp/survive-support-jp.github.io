const assert = require('node:assert/strict');
const fs = require('node:fs');

const imageUrl = 'https://survive-support-jp.github.io/assets/survive-lifestyle-og.png';
const pages = [
  ['index.html', imageUrl],
  ['bousai/index.html', 'https://survive-support-jp.github.io/bousai/assets/3day-pack-product-photo.png'],
  ['oyasupport/index.html', 'https://survive-support-jp.github.io/assets/parent-support-hero.jpg'],
  ['ai-living/index.html', imageUrl],
  ...fs.readdirSync('guides').filter((name) => name.endsWith('.html')).map((name) => [`guides/${name}`, imageUrl]),
];

assert.ok(fs.statSync('assets/survive-lifestyle-og.png').size > 100_000);
for (const [path, expectedImage] of pages) {
  const source = fs.readFileSync(path, 'utf8');
  assert.match(source, new RegExp(`property="og:image" content="${expectedImage}"`));
  assert.match(source, /name="twitter:card" content="summary_large_image"/);
}

console.log('Every service and guide has a share-ready social image');
