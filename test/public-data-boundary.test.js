const assert = require('node:assert/strict');
const fs = require('node:fs');

const reception = fs.readFileSync('apps-script/Code.gs', 'utf8');

assert.equal(fs.existsSync('customer-ledger.html'), false, 'Customer data tooling must not be published with the GitHub Pages site');
assert.equal(fs.existsSync('customer-ledger.js'), false, 'Customer data tooling must not be published with the GitHub Pages site');
assert.match(reception, /if \(!lead\.name \|\| !lead\.area \|\| \(!lead\.email && !lead\.phone\)\) return response_\('invalid'\);/);
assert.doesNotMatch(reception, /!lead\.email \|\| !lead\.preferredTime/);
assert.match(reception, /function sheetValue_\(value\)/);
assert.ok(reception.includes("return /^[=+\\-@]/.test(text) ? `'${text}` : text;"));
assert.match(reception, /CacheService\.getScriptCache\(\)/);
assert.ok(reception.indexOf('lock.waitLock(10000);') < reception.indexOf("if (!claimSubmissionSlot_())"), 'Rate-limit slot must be claimed while the script lock is held');

console.log('Public pages exclude customer tooling and reception protects spreadsheet data');
