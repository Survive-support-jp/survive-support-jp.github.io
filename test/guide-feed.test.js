const assert = require('node:assert/strict');
const fs = require('node:fs');

const feed = fs.readFileSync('feed.xml', 'utf8');
const home = fs.readFileSync('index.html', 'utf8');
const guides = fs.readFileSync('guides/index.html', 'utf8');
const services = ['bousai/index.html', 'oyasupport/index.html', 'ai-living/index.html'];

assert.match(feed, /<feed xmlns="http:\/\/www\.w3\.org\/2005\/Atom"/);
assert.match(feed, /<title>サバイブ 暮らしの実用ガイド<\/title>/);
assert.match(feed, /parent-home-visit-checklist\.html/);
assert.match(feed, /power-outage-smartphone-preparation\.html/);
assert.match(feed, /suspicious-sms-phone-checklist\.html/);
assert.match(home, /rel="alternate" type="application\/atom\+xml"[^>]*href="feed\.xml"/);
assert.match(guides, /rel="alternate" type="application\/atom\+xml"[^>]*href="\.\.\/feed\.xml"/);
for (const service of services) {
  assert.match(fs.readFileSync(service, 'utf8'), /rel="alternate" type="application\/atom\+xml"[^>]*href="\.\.\/feed\.xml"/);
}

console.log('Guide feed exposes current articles for subscribers and aggregators');
