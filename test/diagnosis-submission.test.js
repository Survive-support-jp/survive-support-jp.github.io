const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/diagnosis/diagnosis.js', 'utf8');

assert.match(source, /formsubmit\.co\/ajax\/speakup\.co\.jp%40gmail\.com/);
assert.match(source, /appointmentForm\.addEventListener\('submit'/);
assert.match(source, /location\.href\s*=\s*'\/thanks\.html\?service=free_check'/);

console.log('diagnosis submission stays on the Survive flow');
