const assert = require('node:assert/strict');
const fs = require('node:fs');

const key = '74e4a5a33353ae0996c2ddf964370e7b';
const path = `${key}.txt`;
const contents = fs.readFileSync(path, 'utf8').trim();

assert.equal(contents, key);
assert.match(key, /^[a-f0-9]{32}$/);

console.log('IndexNow ownership key is publicly verifiable at the site root');
