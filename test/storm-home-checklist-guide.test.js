const assert = require('node:assert/strict');
const fs = require('node:fs');

const path = 'guides/storm-home-checklist.html';
const guide = fs.readFileSync(path, 'utf8');
const index = fs.readFileSync('guides/index.html', 'utf8');
const parentSupport = fs.readFileSync('oyasupport/index.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');
const feed = fs.readFileSync('feed.xml', 'utf8');

assert.match(guide, /<title>台風・大雨のあと、離れて暮らす親の家で確認したい5つのこと｜飯能・日高・入間<\/title>/);
assert.match(guide, /本人の同意/);
assert.match(guide, /安全を優先/);
assert.match(guide, /医療・介護・緊急駆けつけ/);
assert.match(guide, /href="\.\.\/oyasupport\/#contact"[^>]*data-service-link="oyasupport"/);
assert.match(guide, /src="\.\.\/app\.js"/);
assert.match(index, /href="storm-home-checklist\.html"/);
assert.match(parentSupport, /href="\.\.\/guides\/storm-home-checklist\.html"/);
assert.match(sitemap, /storm-home-checklist\.html/);
assert.match(llms, /台風・大雨のあと、離れて暮らす親の家で確認したい5つのこと/);
assert.match(feed, /storm-home-checklist\.html/);

console.log('Storm home checklist provides an accurate discovery path to parent support');
