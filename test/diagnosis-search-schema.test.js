const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/diagnosis/index.html', 'utf8');
const match = source.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);

assert.ok(match, 'The indexed diagnosis page needs structured data');
const schema = JSON.parse(match[1]);

assert.equal(schema['@type'], 'Service');
assert.equal(schema.url, 'https://survive-support-jp.github.io/bousai/diagnosis/');
assert.equal(schema.isAccessibleForFree, true);
assert.match(schema.serviceType, /防災備蓄/);
assert.deepEqual(schema.areaServed, ['飯能市', '日高市', '入間市周辺']);

console.log('Diagnosis page exposes a free local disaster-preparedness service to crawlers');
