import { readFileSync, existsSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const html = readFileSync('index.html', 'utf8');
assert.match(html, /<html[^>]+lang="ko"/);
assert.match(html, /name="description"/);
assert.match(html, /property="og:image"/);
let count = 0;
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (!/\bsrc=/.test(match[1])) new Script(match[2], { filename: `inline-${++count}.js` });
}
const assetPath = file => existsSync(file) ? file : `public/${file}`;
for (const file of ['cloud.js', 'pwa.js', 'sw.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'og.png']) {
  const path = assetPath(file);
  assert.ok(existsSync(path), `Missing: ${file}`);
  if (file.endsWith('.js')) new Script(readFileSync(path, 'utf8'), { filename: file });
}
const manifest = JSON.parse(readFileSync(assetPath('manifest.webmanifest'), 'utf8'));
assert.equal(manifest.start_url, './');
assert.equal(manifest.scope, './');
assert.ok(manifest.icons.every(icon => existsSync(assetPath(icon.src.replace('./', '')))));
assert.ok(!/ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY/.test(html));
console.log(`Static checks passed: ${count} inline scripts, assets and PWA manifest.`);
