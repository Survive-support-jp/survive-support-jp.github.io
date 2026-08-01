const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('bousai/index.html', 'utf8');
const diagnosisSource = fs.readFileSync('bousai/diagnosis/diagnosis.js', 'utf8');

assert.match(source, /3日間サバイブパック/);
assert.match(source, /備蓄品一式＋訪問設置＋最長5年間の期限管理/);
assert.match(source, /最長5年間で1日あたり約49円/);
assert.match(diagnosisSource, /最長5年間の期限管理/);

console.log('Price presentation communicates service value and term');
