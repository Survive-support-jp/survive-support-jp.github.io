const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('telephone-companion/index.html', 'utf8');

assert.match(source, /http-equiv="refresh" content="0; url=\.\.\/oyasupport\/"/);
assert.match(source, /location\.replace\('\.\.\/oyasupport\/'\)/);
assert.match(source, /サバイブ親サポート/);

console.log('Legacy telephone companion visitors are sent to the current parent support service');
