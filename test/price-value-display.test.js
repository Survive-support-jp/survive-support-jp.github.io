const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/index.html', 'utf8');
const mobileCss = fs.readFileSync('bousai/mobile.css', 'utf8');
const diagnosisSource = fs.readFileSync('bousai/diagnosis/diagnosis.js', 'utf8');

assert.match(source, /3日間パック/);
assert.match(source, /聞き取り・訪問設置・期限管理を含みます/);
assert.match(source, /24,800円/);
assert.match(source, /2人45,600円、3人66,400円、4人87,200円/);
assert.match(source, /えいようかん 5本/);
assert.match(source, /ラジオ付きライト 1台/);
assert.match(diagnosisSource, /people === 1 \? 24800 : 4000 \+ people \* 20800/);

assert.match(source, /家に3日分の備えを、<br>置ける状態まで整える。/);
assert.match(source, /3day-pack-product-photo\.png/);
assert.match(source, /3day-pack-product-photo\.webp/);
assert.match(source, /無料で備えを確認する/);
assert.match(source, /500mL × 18本/);
assert.match(source, /mobile-lifestyle-hero/);
assert.match(mobileCss, /mobile-home-entryway\.png/);
assert.match(mobileCss, /mobile-home-entryway\.webp/);
assert.ok(fs.statSync('bousai/assets/3day-pack-product-photo.webp').size < fs.statSync('bousai/assets/3day-pack-product-photo.png').size);
assert.ok(fs.statSync('bousai/assets/mobile-home-entryway.webp').size < fs.statSync('bousai/assets/mobile-home-entryway.png').size);
assert.match(source, /editorial-pack/);
assert.match(source, /editorial-contents/);
assert.match(source, /editorial-service/);
assert.match(source, /editorial-pricing/);
assert.match(source, /editorial-flow/);
assert.match(source, /1人 24,800円〜/);
assert.match(source, /mobile-hero-brand/);
assert.match(source, /mobile-hero-cta/);
assert.match(source, /mobile-sticky-cta/);
assert.doesNotMatch(source, /35,000円/);
assert.doesNotMatch(source, /甘味 3本/);
assert.doesNotMatch(source, /乾電池/);

console.log('Price presentation communicates service value and term');
