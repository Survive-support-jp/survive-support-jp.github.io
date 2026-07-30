const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('apps-script/Code.gs', 'utf8');

assert.match(source, /function doPost\(e\)/);
assert.match(source, /appendRow\(/);
assert.match(source, /MailApp\.sendEmail/);
assert.match(source, /XFrameOptionsMode\.ALLOWALL/);

console.log('Apps Script reception stores a lead and sends a notification');
