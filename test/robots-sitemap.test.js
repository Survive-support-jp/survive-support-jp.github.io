const assert = require('node:assert/strict');
const fs = require('node:fs');

const robots = fs.readFileSync('robots.txt', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');

assert.match(robots, /^Sitemap: https:\/\/survive-support-jp\.github\.io\/sitemap\.xml$/m);
assert.match(sitemap, /<loc>https:\/\/survive-support-jp\.github\.io\/oyasupport\/<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/survive-support-jp\.github\.io\/ai-living\/<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/survive-support-jp\.github\.io\/bousai\/<\/loc>/);
assert.match(sitemap, /<loc>https:\/\/survive-support-jp\.github\.io\/guides\/parent-home-visit-checklist\.html<\/loc>/);

console.log('Robots points crawlers to the complete XML sitemap');
