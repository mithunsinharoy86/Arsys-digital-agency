import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.resolve(__dirname, '../../../dist/apps/web/client');
const assetsDir = path.join(clientDir, 'assets');
const templatePath = path.resolve(__dirname, '../index.html.template');
const rootDistDir = path.resolve(__dirname, '../../../dist');
const repoRootDir = path.resolve(__dirname, '../../..');

if (!fs.existsSync(clientDir)) {
  console.error('Client dir not found:', clientDir);
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

const cssFiles = files
  .filter((f) => f.startsWith('index-') && f.endsWith('.css'))
  .map((f) => ({ name: f, time: fs.statSync(path.join(assetsDir, f)).mtimeMs }))
  .sort((a, b) => b.time - a.time);

const entryJsFiles = files
  .filter((f) => f.startsWith('entry.client-') && f.endsWith('.js'))
  .map((f) => ({ name: f, time: fs.statSync(path.join(assetsDir, f)).mtimeMs }))
  .sort((a, b) => b.time - a.time);

const manifestFiles = files
  .filter((f) => f.startsWith('manifest-') && f.endsWith('.js'))
  .map((f) => ({ name: f, time: fs.statSync(path.join(assetsDir, f)).mtimeMs }))
  .sort((a, b) => b.time - a.time);

const cssFile = cssFiles[0]?.name;
const entryJs = entryJsFiles[0]?.name;
const manifestFile = manifestFiles[0]?.name;

console.log(`[postbuild] Assets: CSS = ${cssFile}, JS = ${entryJs}, Manifest = ${manifestFile}`);

if (!manifestFile) {
  console.error('No manifest file found in assets!');
  process.exit(1);
}

const manifestContent = fs
  .readFileSync(path.join(assetsDir, manifestFile), 'utf8')
  .replace(/^window\.__reactRouterManifest=/, '')
  .replace(/;$/, '');

const fullManifest = JSON.parse(manifestContent);
const rootModule = fullManifest.routes.root.module;
const homeModule = fullManifest.routes['routes/home'].module;
const entryModule = fullManifest.entry.module;

let html = fs.readFileSync(templatePath, 'utf8');

// 1. Point to correct CSS file
if (cssFile) {
  html = html.replace(/\/assets\/index-[a-zA-Z0-9_-]+\.css/g, `/assets/${cssFile}`);
}

// 2. Remove all stale modulepreload links so no mismatched/duplicate React instances load
html = html.replace(/<link\s+rel="modulepreload"[^>]+>/g, '');

// 3. Ensure all domain URLs point to klyroworks.com
html = html.replace(/http:\/\/localhost:\d+/g, 'https://klyroworks.com');

// 4. Force initial route discovery
html = html.replace(/"routeDiscovery":\{"mode":"lazy","manifestPath":"\/__manifest"\}/g, '"routeDiscovery":{"mode":"initial"}');

// 5. Replace inline module script with exact matching modules from the current build
const moduleScriptRegex = /<script\s+type="module"[^>]*>[\s\S]*?import\("\/assets\/entry\.client-[^"]+"\);<\/script>/;
const newModuleScript = `<script type="module">
import * as route0 from "${rootModule}";
import * as route1 from "${homeModule}";
window.__reactRouterManifest = ${JSON.stringify(fullManifest)};
window.__reactRouterRouteModules = {"root": route0, "routes/home": route1};
import("${entryModule}");
</script>`;

if (moduleScriptRegex.test(html)) {
  html = html.replace(moduleScriptRegex, newModuleScript);
} else {
  // If regex didn't match, inject before </body>
  html = html.replace('</body>', `${newModuleScript}\n</body>`);
}

// 6. Generate manifest.json & __manifest
const manifestJsonStr = JSON.stringify({ routes: fullManifest.routes }, null, 2);
fs.writeFileSync(path.join(assetsDir, 'manifest.json'), manifestJsonStr, 'utf8');

// 7. Write index.html & 404.html to clientDir, rootDistDir, and repoRootDir
fs.writeFileSync(path.join(clientDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(clientDir, '404.html'), html, 'utf8');

fs.writeFileSync(path.join(rootDistDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(rootDistDir, '404.html'), html, 'utf8');

fs.writeFileSync(path.join(repoRootDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(repoRootDir, '404.html'), html, 'utf8');

// 8. Copy .htaccess everywhere
const htaccessPath = path.resolve(__dirname, '../public/.htaccess');
if (fs.existsSync(htaccessPath)) {
  fs.copyFileSync(htaccessPath, path.join(clientDir, '.htaccess'));
  fs.copyFileSync(htaccessPath, path.join(rootDistDir, '.htaccess'));
  fs.copyFileSync(htaccessPath, path.join(repoRootDir, '.htaccess'));
}

// 9. Sync clean assets to root dist and repo root (clean stale files first!)
const repoAssetsDir = path.join(repoRootDir, 'assets');
if (fs.existsSync(repoAssetsDir)) {
  fs.rmSync(repoAssetsDir, { recursive: true, force: true });
}
fs.mkdirSync(repoAssetsDir, { recursive: true });
fs.cpSync(assetsDir, repoAssetsDir, { recursive: true });

const rootAssetsDir = path.join(rootDistDir, 'assets');
if (fs.existsSync(rootAssetsDir)) {
  fs.rmSync(rootAssetsDir, { recursive: true, force: true });
}
fs.mkdirSync(rootAssetsDir, { recursive: true });
fs.cpSync(assetsDir, rootAssetsDir, { recursive: true });

// Copy images
const imagesDir = path.join(clientDir, 'images');
const rootImagesDir = path.join(rootDistDir, 'images');
const repoImagesDir = path.join(repoRootDir, 'images');
if (fs.existsSync(imagesDir)) {
  fs.cpSync(imagesDir, rootImagesDir, { recursive: true });
  fs.cpSync(imagesDir, repoImagesDir, { recursive: true });
}

// Copy manifest endpoints
fs.writeFileSync(path.join(repoRootDir, '__manifest'), manifestJsonStr, 'utf8');
fs.writeFileSync(path.join(rootDistDir, '__manifest'), manifestJsonStr, 'utf8');

console.log('✓ [postbuild] Cleaned and synchronized matching assets across all web roots');
