const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/diagnosis/index.html', 'utf8');

assert.match(source, /frame-src https:\/\/script\.google\.com https:\/\/\*\.googleusercontent\.com/);

console.log('Reception iframe is allowed by the page security policy');
