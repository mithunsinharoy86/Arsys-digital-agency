import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../../../dist');
const repoRootDir = path.resolve(__dirname, '../../..');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log('[clean] Cleared dist directory');
}

// Remove any stale route directories from repo root
const staleRouteDirs = ['about', 'blogs', 'contact', 'industries', 'our-work', 'privacy', 'services', 'terms'];
for (const dir of staleRouteDirs) {
  const dirPath = path.join(repoRootDir, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`[clean] Cleared stale route directory: ${dir}`);
  }
}
