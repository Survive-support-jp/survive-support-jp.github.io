const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('guides/index.html', 'utf8');

assert.match(source, /href="\.\.\/bousai\/"[\s\S]*?<strong>防災備蓄サポート<\/strong>/);
assert.match(source, /href="\.\.\/oyasupport\/"[\s\S]*?<strong>親サポート<\/strong>/);
assert.match(source, /href="\.\.\/ai-living\/"[\s\S]*?<strong>AIを生活に<\/strong>/);

console.log('Guides provide discovery paths to every public service');
