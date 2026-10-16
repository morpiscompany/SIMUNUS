/* Checks never print credential values. This is a pattern scan, not a security certification. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { files, root, target } = require('./build-pages.cjs');
const secretPatterns = [
  /sb_secret_[A-Za-z0-9_-]{10,}/,
  /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /postgres(?:ql)?:\/\/[^:\s]+:[^@\s]+@/,
  /(?:smtp_password|jwt_secret|service_role_key)\s*[:=]\s*["'][^"']{8,}/i,
];
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(directory, entry.name);
    assert.ok(!entry.isSymbolicLink(), 'No artifact symlinks');
    return entry.isDirectory() ? walk(name) : [path.relative(target, name).split(path.sep).join('/')];
  });
}
assert.deepEqual(walk(target).sort(), [...files, '.nojekyll'].sort());
for (const name of files) {
  assert.ok(!/(?:^|\/)(?:admin|simunus[_-]admin|private|backups?|node_modules|test-results|screenshots|\.env)(?:\/|$)/i.test(name), 'Private artifact path');
  const file = path.join(target, name);
  if (!/\.(html|js|css)$/.test(name)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of secretPatterns) assert.ok(!pattern.test(text), 'Credential pattern in ' + name);
  for (const token of text.matchAll(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g)) {
    let payload;
    try { payload = JSON.parse(Buffer.from(token[0].split('.')[1], 'base64url')); } catch { continue; }
    assert.notEqual(payload.role, 'service_role', 'Privileged JWT in ' + name);
  }
  assert.ok(!/\bDEV_MODE\s*[:=]\s*true\b/.test(text), 'Development bypass in ' + name);
  if (name.endsWith('.js')) execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  const references = name.endsWith('.html')
    ? [...text.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1])
    : name.endsWith('.css') ? [...text.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(match => match[1]) : [];
  for (const reference of references) {
    if (/^(https?:|data:|#)/.test(reference)) continue;
    let resolved = path.resolve(path.dirname(file), reference.split(/[?#]/)[0]);
    assert.ok(resolved.startsWith(target + path.sep), 'Reference outside artifact: ' + name);
    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) resolved = path.join(resolved, 'index.html');
    assert.ok(fs.existsSync(resolved), 'Missing local resource in ' + name);
    for (let current = resolved; current !== target; current = path.dirname(current)) {
      assert.ok(fs.readdirSync(path.dirname(current)).includes(path.basename(current)), 'Filename case mismatch in ' + name);
    }
  }
}
const config = fs.readFileSync(path.join(root, 'Simunus/recovery-config.js'), 'utf8');
assert.ok(config.includes('https://morpiscompany.github.io/SIMUNUS/Simunus/recovery.html'));
assert.ok(config.includes('config.environment || "production"'));
console.log('PASS public artifact allowlist, syntax, references/casing, credential patterns and production recovery defaults');
