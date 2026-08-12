const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/index.html', 'utf8');

assert.match(source, /class="[^"]*related-services[^"]*"/);
assert.match(source, /href="\.\.\/oyasupport\/"[\s\S]*?親サポート/);
assert.match(source, /href="\.\.\/ai-living\/"[\s\S]*?AIを生活に/);
assert.match(source, /href="\.\.\/guides\/"[\s\S]*?暮らしの実用ガイド/);

console.log('Disaster preparedness visitors can discover other Survive services');
