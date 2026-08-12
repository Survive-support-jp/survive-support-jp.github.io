const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('guides/index.html', 'utf8');

assert.match(source, /rel="canonical" href="https:\/\/survive-support-jp\.github\.io\/guides\/"/);
assert.match(source, /property="og:title" content="暮らしの実用ガイド｜サバイブ"/);
assert.match(source, /"@type":"CollectionPage"/);
assert.match(source, /"@type":"ItemList"/);

console.log('Guide index has canonical, social, and collection metadata');
