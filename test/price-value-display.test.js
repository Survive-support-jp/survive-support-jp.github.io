const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/index.html', 'utf8');
const diagnosisSource = fs.readFileSync('bousai/diagnosis/diagnosis.js', 'utf8');

assert.match(source, /3日間パック/);
assert.match(source, /聞き取り・訪問設置・期限管理を含みます/);
assert.match(source, /29,000円/);
assert.match(source, /2人54,000円、3人79,000円、4人104,000円/);
assert.match(source, /えいようかん 5本/);
assert.match(source, /ラジオ付きライト 1台/);
assert.match(diagnosisSource, /people === 1 \? 29000 : 4000 \+ people \* 25000/);

assert.match(source, /家に3日分の備えを、<br>置ける状態まで整える。/);
assert.match(source, /3day-pack-product-photo\.png/);
assert.match(source, /無料で備えを確認する/);
assert.match(source, /500mL × 18本/);
assert.match(source, /hero-proof/);
assert.match(source, /水 9L/);
assert.match(source, /トイレ 15回分/);
assert.match(source, /期限管理/);
assert.match(source, /mobile-sticky-cta/);
assert.doesNotMatch(source, /35,000円/);
assert.doesNotMatch(source, /甘味 3本/);
assert.doesNotMatch(source, /乾電池/);

console.log('Price presentation communicates service value and term');
