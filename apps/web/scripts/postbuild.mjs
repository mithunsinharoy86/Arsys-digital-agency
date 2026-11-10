import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, '../../../dist/apps/web/client');
const assetsDir = path.join(clientDir, 'assets');
const templatePath = path.resolve(__dirname, '../index.html.template');

const rootDistDir = path.resolve(__dirname, '../../../dist');

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

// 1. Write to nested client dir: dist/apps/web/client/
fs.writeFileSync(path.join(clientDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(clientDir, '404.html'), html, 'utf8');

// 2. Also write to root dist/: dist/ (in case Hostinger output directory is just "dist")
fs.writeFileSync(path.join(rootDistDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(rootDistDir, '404.html'), html, 'utf8');

// Copy .htaccess to root dist
const htaccessPath = path.resolve(__dirname, '../public/.htaccess');
if (fs.existsSync(htaccessPath)) {
  fs.copyFileSync(htaccessPath, path.join(rootDistDir, '.htaccess'));
}

// Copy assets and images to root dist
const rootAssetsDir = path.join(rootDistDir, 'assets');
if (!fs.existsSync(rootAssetsDir)) {
  fs.cpSync(assetsDir, rootAssetsDir, { recursive: true });
}
const imagesDir = path.join(clientDir, 'images');
const rootImagesDir = path.join(rootDistDir, 'images');
if (fs.existsSync(imagesDir) && !fs.existsSync(rootImagesDir)) {
  fs.cpSync(imagesDir, rootImagesDir, { recursive: true });
}

console.log('✓ [postbuild] Generated index.html, 404.html, and .htaccess in BOTH dist/ and dist/apps/web/client/');
