const assert = require('node:assert/strict');
const fs = require('node:fs');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');

assert.match(sitemap, /<loc>https:\/\/survive-support-jp\.github\.io\/guides\/<\/loc><lastmod>2026-08-12<\/lastmod>/);
assert.match(llms, /防災備蓄サポート: https:\/\/survive-support-jp\.github\.io\/bousai\//);
assert.match(llms, /暮らしの実用ガイド: https:\/\/survive-support-jp\.github\.io\/guides\//);

console.log('Crawler indexes include the current guide hub and every service category');
