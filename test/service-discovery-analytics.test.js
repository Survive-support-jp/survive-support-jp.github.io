const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
assert.match(app, /\[data-service-link\]/);
assert.match(app, /gtag\('event', 'service_discovery'/);
assert.match(app, /service_target/);
assert.match(app, /link_location/);

const pages = [
  ['index.html', 'app.js', ['bousai', 'oyasupport', 'ai-living', 'guides']],
  ['guides/index.html', '../app.js', ['bousai', 'oyasupport', 'ai-living']],
  ['bousai/index.html', '../app.js', ['oyasupport', 'ai-living', 'guides']],
  ['oyasupport/index.html', '../app.js', ['bousai', 'ai-living']],
  ['ai-living/index.html', '../app.js', ['oyasupport', 'bousai']],
];

for (const [path, scriptPath, targets] of pages) {
  const source = fs.readFileSync(path, 'utf8');
  assert.match(source, new RegExp(`src="${scriptPath.replace('.', '\\.')}"`));
  for (const target of targets) {
    assert.match(source, new RegExp(`data-service-link="${target}"`));
  }
}

console.log('Service discovery paths emit identifiable GA4 events');
