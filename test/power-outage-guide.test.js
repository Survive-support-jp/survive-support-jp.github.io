const assert = require('node:assert/strict');
const fs = require('node:fs');

const path = 'guides/power-outage-smartphone-preparation.html';
const guide = fs.readFileSync(path, 'utf8');
const index = fs.readFileSync('guides/index.html', 'utf8');
const ai = fs.readFileSync('ai-living/index.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');

assert.match(guide, /<title>停電時に困らないためのスマホと家庭の備え｜飯能・日高・入間<\/title>/);
assert.match(guide, /モバイルバッテリー/);
assert.match(guide, /避難情報は自治体などの公式情報で確認/);
assert.match(guide, /href="\.\.\/bousai\/diagnosis\/"[^>]*data-service-link="bousai"/);
assert.match(guide, /href="\.\.\/ai-living\/#contact"[^>]*data-service-link="ai-living"/);
assert.match(index, /href="power-outage-smartphone-preparation\.html"/);
assert.match(ai, /href="\.\.\/guides\/power-outage-smartphone-preparation\.html"/);
assert.match(sitemap, /power-outage-smartphone-preparation\.html/);
assert.match(llms, /停電時に困らないためのスマホと家庭の備え/);

console.log('Power-outage guide connects disaster readiness and smartphone support');
