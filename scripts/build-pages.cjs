/* Explicit public Pages artifact; never upload the checkout root. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const target = path.join(root, '.site');
const files = [
  "index.html",
  "Simunus/.nojekyll",
  "Simunus/assets/simunus-logo-dark.png",
  "Simunus/assets/simunus-logo-light.png",
  "Simunus/auth.js",
  "Simunus/content-language.js",
  "Simunus/css/language.css",
  "Simunus/css/recovery.css",
  "Simunus/custom-phases.js",
  "Simunus/index.html",
  "Simunus/language-menu.js",
  "Simunus/language.js",
  "Simunus/password-visibility.js",
  "Simunus/recovery-capture.js",
  "Simunus/recovery-config.js",
  "Simunus/recovery-cooldown.js",
  "Simunus/recovery-entry.js",
  "Simunus/recovery.html",
  "Simunus/recovery.js",
  "Simunus/script.js",
  "Simunus/simunus-api.js",
  "Simunus/style.css",
  "Simunus/supabase.js"
];
function build() {
if (fs.existsSync(target)) throw new Error('Use a clean checkout: .site already exists');
for (const name of files) {
  const source = path.join(root, name);
  if (!fs.lstatSync(source).isFile()) throw new Error('Unsafe public file: ' + name);
  const output = path.join(target, name);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.copyFileSync(source, output);
}
fs.writeFileSync(path.join(target, '.nojekyll'), '');
console.log('Verified public artifact: ' + (files.length + 1) + ' explicitly allowed files');

}
module.exports = { files, root, target };
if (require.main === module) build();
