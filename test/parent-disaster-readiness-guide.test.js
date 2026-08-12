const assert = require('node:assert/strict');
const fs = require('node:fs');

const path = 'guides/parent-disaster-readiness.html';
const guide = fs.readFileSync(path, 'utf8');
const index = fs.readFileSync('guides/index.html', 'utf8');
const parentSupport = fs.readFileSync('oyasupport/index.html', 'utf8');
const disaster = fs.readFileSync('bousai/index.html', 'utf8');
const ai = fs.readFileSync('ai-living/index.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const feed = fs.readFileSync('feed.xml', 'utf8');

assert.match(guide, /<title>離れて暮らす親の防災で、家族が最初に確認したい5つのこと｜飯能・日高・入間<\/title>/);
assert.match(guide, /避難の判断は自治体などの公式情報/);
assert.match(guide, /本人の同意/);
for (const target of ['bousai', 'oyasupport', 'ai-living']) {
  assert.match(guide, new RegExp(`data-service-link="${target}"`));
}
assert.match(guide, /src="\.\.\/app\.js"/);
assert.match(index, /href="parent-disaster-readiness\.html"/);
assert.match(parentSupport, /href="\.\.\/guides\/parent-disaster-readiness\.html"/);
assert.match(disaster, /href="\.\.\/guides\/parent-disaster-readiness\.html"/);
assert.match(ai, /href="\.\.\/guides\/parent-disaster-readiness\.html"/);
assert.match(sitemap, /parent-disaster-readiness\.html/);
assert.match(feed, /parent-disaster-readiness\.html/);

console.log('Parent disaster guide connects every public service with scoped CTA paths');
