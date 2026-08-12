const assert = require('node:assert/strict');
const fs = require('node:fs');

const home = fs.readFileSync('index.html', 'utf8');
const operator = fs.readFileSync('operator.html', 'utf8');

assert.match(home, /防災備蓄サポート/);
assert.match(home, /親サポート/);
assert.match(home, /AIを生活に/);
assert.match(home, /"@type":"Organization"/);
assert.match(operator, /防災備蓄サポート/);
assert.match(operator, /親サポート/);
assert.match(operator, /AIを生活に/);

console.log('Public catalog consistently represents all three services');
