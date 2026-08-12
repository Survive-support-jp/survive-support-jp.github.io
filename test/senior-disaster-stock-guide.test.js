const assert = require('node:assert/strict');
const fs = require('node:fs');

const path = 'guides/senior-disaster-stockpile.html';
const guide = fs.readFileSync(path, 'utf8');
const index = fs.readFileSync('guides/index.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const textSitemap = fs.readFileSync('sitemap.txt', 'utf8');
const feed = fs.readFileSync('feed.xml', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');

assert.match(guide, /<title>高齢者のいる家庭の防災備蓄/);
assert.match(guide, /最低3日/);
assert.match(guide, /1週間/);
assert.match(guide, /1人1日3リットル/);
assert.match(guide, /本人が食べやすい/);
assert.match(guide, /避難の判断は自治体などの公式情報/);
for (const target of ['bousai', 'oyasupport', 'ai-living']) {
  assert.match(guide, new RegExp(`data-service-link="${target}"`));
}
for (const source of [index, sitemap, textSitemap, feed, llms]) {
  assert.match(source, /senior-disaster-stockpile\.html/);
}

console.log('Senior disaster stockpile guide is safely indexed and connects all services');
