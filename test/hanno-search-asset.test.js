const assert = require('node:assert/strict');
const fs = require('node:fs');

const guide = fs.readFileSync('guides/hanno-home-disaster-preparedness.html', 'utf8');
const localPage = fs.readFileSync('bousai/hanno/index.html', 'utf8');
const seniorGuide = fs.readFileSync('guides/hanno-senior-disaster-stockpile.html', 'utf8');

assert.match(guide, /飯能市の防災備蓄リスト/);
assert.match(guide, /飯能市地域防災計画/);
assert.match(guide, /data-service-link="bousai"/);
assert.match(guide, /a0401\/bousaitaisaku\/3day-bitiku\.html/);
assert.match(guide, /a0401\/05b00-2001\.html/);
assert.match(guide, /1人1日3リットル/);
assert.match(guide, /1人1日約5回/);
assert.match(localPage, /飯能市の防災備蓄・無料チェック/);
assert.match(localPage, /property="og:title" content="飯能市の防災備蓄・無料チェック｜無料相談｜サバイブ"/);
assert.match(localPage, /property="og:description" content="飯能市のご家庭向け。防災備蓄の個別確認と無料相談の入口です。"/);
assert.match(localPage, /申込み → 訪問・確認 → 必要な場合だけ後日見積/);
assert.match(localPage, /災害リスク・避難情報は飯能市の公式情報で確認/);
assert.match(localPage, /緊急対応は行いません/);
assert.match(seniorGuide, /高齢者等避難/);
assert.match(seniorGuide, /data-link-location="hanno-senior-stockpile-guide"/);
assert.match(seniorGuide, /飯能市の防災備蓄リスト/);

console.log('Hanno guide and consultation LP have distinct search roles');
