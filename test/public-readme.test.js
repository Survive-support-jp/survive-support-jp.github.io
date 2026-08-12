const assert = require('node:assert/strict');
const fs = require('node:fs');

const readme = fs.readFileSync('README.md', 'utf8');

for (const url of [
  'https://survive-support-jp.github.io/bousai/',
  'https://survive-support-jp.github.io/oyasupport/',
  'https://survive-support-jp.github.io/ai-living/',
  'https://survive-support-jp.github.io/guides/',
]) {
  assert.ok(readme.includes(url), `README should link to ${url}`);
}

assert.match(readme, /飯能市/);
assert.match(readme, /日高市/);
assert.match(readme, /入間市/);
assert.match(readme, /本人の同意/);
assert.match(readme, /緊急対応/);

console.log('Public repository guide links visitors to every service with clear boundaries');
