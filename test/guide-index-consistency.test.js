const assert = require('node:assert/strict');
const fs = require('node:fs');

const xmlSitemap = fs.readFileSync('sitemap.xml', 'utf8');
const textSitemap = fs.readFileSync('sitemap.txt', 'utf8');
const guideIndex = fs.readFileSync('guides/index.html', 'utf8');

const guideUrls = [...xmlSitemap.matchAll(/<loc>(https:\/\/survive-support-jp\.github\.io\/guides\/[^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => url !== 'https://survive-support-jp.github.io/guides/');

assert.ok(guideUrls.length >= 8, 'the XML sitemap should list every published guide');
for (const url of guideUrls) {
  assert.ok(textSitemap.includes(url), `text sitemap is missing ${url}`);
  assert.ok(guideIndex.includes(url.replace('https://survive-support-jp.github.io/guides/', '')), `guide hub is missing ${url}`);
}

console.log('Guide listings stay aligned across XML, text sitemap, and guide hub');
