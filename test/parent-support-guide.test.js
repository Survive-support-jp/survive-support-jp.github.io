const assert = require('node:assert/strict');
const fs = require('node:fs');

const guidePath = 'guides/parent-home-visit-checklist.html';
const guide = fs.readFileSync(guidePath, 'utf8');
const index = fs.readFileSync('guides/index.html', 'utf8');
const sitemapXml = fs.readFileSync('sitemap.xml', 'utf8');
const sitemapText = fs.readFileSync('sitemap.txt', 'utf8');
const llms = fs.readFileSync('llms.txt', 'utf8');

assert.match(guide, /<title>遠方の親の家が心配なとき、家族が訪問前に決めておく5つのこと｜飯能・日高・入間<\/title>/);
assert.match(guide, /本人の同意/);
assert.match(guide, /医療行為、服薬判断、身体介護/);
assert.match(guide, /href="\.\.\/oyasupport\/#contact"/);
assert.match(guide, /data-service-link="oyasupport"/);
assert.match(guide, /src="\.\.\/app\.js"/);
assert.match(index, /href="parent-home-visit-checklist\.html"/);
assert.match(index, /position":5/);
assert.match(sitemapXml, /<loc>https:\/\/survive-support-jp\.github\.io\/guides\/parent-home-visit-checklist\.html<\/loc>/);
assert.match(sitemapText, /https:\/\/survive-support-jp\.github\.io\/guides\/parent-home-visit-checklist\.html/);
assert.match(llms, /遠方の親の家が心配なとき、家族が訪問前に決めておく5つのこと/);

console.log('Parent support has a useful, indexed guide with an accurate consultation path');
