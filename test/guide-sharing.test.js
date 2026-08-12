const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const guides = fs.readdirSync('guides').filter((file) => file.endsWith('.html'));

assert.match(app, /guide-copy/);
assert.match(app, /navigator\.share/);
assert.match(app, /navigator\.clipboard/);
assert.match(app, /guide_share/);
assert.match(app, /共有リンクをコピー/);
assert.match(css, /\.guide-share/);

for (const guide of guides) {
  assert.match(fs.readFileSync(`guides/${guide}`, 'utf8'), /src="\.\.\/app\.js"/);
}

console.log('Every guide has a share path with measurable native-share and copy fallback');
