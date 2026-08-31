const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/index.html', 'utf8');
const lpCss = fs.readFileSync('bousai/lp.css', 'utf8');
const diagnosisSource = fs.readFileSync('bousai/diagnosis/diagnosis.js', 'utf8');

assert.match(source, /3日間パック/);
assert.match(source, /聞き取り・訪問設置・期限管理を含みます/);
assert.match(source, /19,800円/);
assert.match(source, /2人33,400円、3人47,000円、4人60,600円/);
assert.match(source, /えいようかん/);
assert.match(source, /<strong>5本<\/strong>/);
assert.match(diagnosisSource, /6200 \+ people \* 13600/);

assert.match(source, /災害の最初の3日を、<br>家で過ごすための備え。/);
assert.match(source, /3day-pack-product-photo\.png/);
assert.match(source, /3day-pack-product-photo\.webp/);
assert.match(source, /無料で備えを診断する/);
assert.match(source, /500mL × 18本/);
assert.match(source, /class="hero"/);
assert.match(lpCss, /\.mobile-sticky-cta/);
assert.match(lpCss, /\.needs-grid\{grid-template-columns:1fr\}/);
assert.ok(fs.statSync('bousai/assets/3day-pack-product-photo.webp').size < fs.statSync('bousai/assets/3day-pack-product-photo.png').size);
assert.ok(fs.statSync('bousai/assets/mobile-home-entryway.webp').size < fs.statSync('bousai/assets/mobile-home-entryway.png').size);
assert.match(source, /pack-overview/);
assert.match(source, /class="pricing-grid"/);
assert.match(source, /class="flow-timeline"/);
assert.match(source, /class="faq-list"/);
assert.match(source, /1人 19,800円〜/);
assert.match(source, /class="hero-actions"/);
assert.match(source, /class="hero-primary-cta"/);
assert.match(source, /mobile-sticky-cta/);
assert.doesNotMatch(source, /class="editorial-pack"/);
assert.doesNotMatch(source, /class="readiness-stakes"/);
assert.doesNotMatch(source, /35,000円/);
assert.doesNotMatch(source, /甘味 3本/);
assert.doesNotMatch(source, /乾電池/);

assert.match(source, /1日約11円/);
assert.match(source, /19,800円 ÷ 1,825日 = 約11円/);
assert.match(source, /href="\.\/diagnosis\/"/);
assert.match(lpCss, /\.value-card/);

console.log('Price presentation communicates service value and term');
