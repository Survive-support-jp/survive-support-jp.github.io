const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('index.html', 'utf8');

assert.match(source, /rel="canonical" href="https:\/\/survive-support-jp\.github\.io\/"/);
assert.match(source, /property="og:title" content="サバイブ｜埼玉の暮らしを支える地域サービス"/);
assert.match(source, /href="guides\/"[\s\S]*?>[\s\S]*?<strong>暮らしの実用ガイド<\/strong>/);

console.log('Gateway provides a canonical URL, social identity, and guide discovery path');
