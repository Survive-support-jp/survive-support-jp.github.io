const assert = require('node:assert/strict');
const fs = require('node:fs');

const guide = fs.readFileSync('guides/hanno-home-disaster-preparedness.html', 'utf8');
const localPage = fs.readFileSync('bousai/hanno/index.html', 'utf8');

assert.match(guide, /飯能市の防災備蓄リスト/);
assert.match(guide, /飯能市地域防災計画/);
assert.match(guide, /data-service-link="bousai"/);
assert.match(localPage, /飯能市の防災備蓄・無料チェック/);

console.log('Hanno guide and consultation LP have distinct search roles');
