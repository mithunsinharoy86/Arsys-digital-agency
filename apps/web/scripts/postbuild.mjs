import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, '../../../dist/apps/web/client');
const assetsDir = path.join(clientDir, 'assets');
const templatePath = path.resolve(__dirname, '../index.html.template');

if (!fs.existsSync(clientDir)) {
  console.error('Client dir not found:', clientDir);
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);
const cssFile = files.find((f) => f.startsWith('index-') && f.endsWith('.css'));
const entryJs = files.find((f) => f.startsWith('entry.client-') && f.endsWith('.js'));

console.log(`[postbuild] Found built assets: CSS = ${cssFile}, JS = ${entryJs}`);

let html = fs.readFileSync(templatePath, 'utf8');

if (cssFile) {
  html = html.replace(/\/assets\/index-[a-zA-Z0-9_-]+\.css/g, `/assets/${cssFile}`);
}

if (entryJs) {
  html = html.replace(/\/assets\/entry\.client-[a-zA-Z0-9_-]+\.js/g, `/assets/${entryJs}`);
}

// Ensure all canonical, schema, and meta URLs point to klyroworks.com
html = html.replace(/http:\/\/localhost:\d+/g, 'https://klyroworks.com');

fs.writeFileSync(path.join(clientDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(clientDir, '404.html'), html, 'utf8');

console.log('✓ [postbuild] Generated dist/apps/web/client/index.html & 404.html successfully');
