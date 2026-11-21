import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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


// 10. Generate static sitemap.xml, robots.txt, and llms.txt for static Apache/Nginx hosting
const origin = 'https://klyroworks.com';
const robotsTxt = `User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: OAI-SearchBot
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: ChatGPT-User
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Claude-SearchBot
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Claude-User
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: PerplexityBot
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Perplexity-User
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: DuckAssistBot
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: MistralAI-User
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: meta-webindexer
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: meta-externalfetcher
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Amzn-SearchBot
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Amzn-User
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Bytespider
Disallow: /

Sitemap: ${origin}/sitemap.xml
`;

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/website-development', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/seo', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/digital-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/ai-automation', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/ui-ux-design', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/branding', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/ecommerce', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/social-media-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/content-marketing', priority: '0.8', changefreq: 'weekly' },
  { path: '/industries', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries/real-estate', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries/dental-clinics', priority: '0.8', changefreq: 'weekly' },
  { path: '/industries/ecommerce', priority: '0.8', changefreq: 'weekly' },
  { path: '/industries/professional-services', priority: '0.8', changefreq: 'weekly' },
  { path: '/our-work', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.9', changefreq: 'daily' },
  { path: '/blogs/conversion-focused-website', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/local-seo-for-service-businesses', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/first-business-automation', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/geo-and-ai-search-ranking', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs/core-web-vitals-business-impact', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (r) => `  <url>
    <loc>${origin}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const llmsTxt = `# Klyro Works

> A digital growth and technology agency serving businesses across the United States, United Kingdom, and India.

## Agency
- [About](${origin}/about): Our business-first strategy and approach.
- [Contact](${origin}/contact): Request a free initial consultation.
- [Design explorations](${origin}/our-work): Illustrative concepts, blueprints, and capabilities.

## Services
- [Website Development](${origin}/services/website-development): Custom web engineering and sub-second platforms.
- [SEO](${origin}/services/seo): Technical SEO, Schema entity mapping, and AI Search (GEO).
- [Digital Marketing](${origin}/services/digital-marketing): Data-driven Google Ads and PPC management.
- [AI Automation](${origin}/services/ai-automation): Tailored business AI workflows and CRM integrations.
- [UI/UX Design](${origin}/services/ui-ux-design): Human-centred web and digital product design.
- [Branding](${origin}/services/branding): Distinctive visual brand identities and systems.
- [Ecommerce](${origin}/services/ecommerce): Scalable Shopify and custom checkout solutions.
- [Social Media](${origin}/services/social-media-marketing): Commercial paid and organic social growth.
- [Content Marketing](${origin}/services/content-marketing): Authority content and conversion copywriting.

## Industries
- [Real Estate](${origin}/industries/real-estate): Property discovery and local valuation engines.
- [Dental Clinics](${origin}/industries/dental-clinics): Healthcare websites and patient booking.
- [Ecommerce DTC](${origin}/industries/ecommerce): High-conversion shopping experiences.
- [Professional Services](${origin}/industries/professional-services): B2B lead generation architecture.

## Blogs
- [Conversion-Focused Website](${origin}/blogs/conversion-focused-website): What makes a website convert in 2026.
- [Local SEO Guide](${origin}/blogs/local-seo-for-service-businesses): Dominate local search in the US and UK.
- [Business Automation](${origin}/blogs/first-business-automation): Where to start without wasting budget.
- [GEO & AI Search](${origin}/blogs/geo-and-ai-search-ranking): How to rank on Perplexity, ChatGPT and Gemini.
- [Core Web Vitals Impact](${origin}/blogs/core-web-vitals-business-impact): Real commercial ROI of sub-second speed.
`;

const staticTargets = [
  path.resolve(__dirname, '../public'),
  clientDir,
  rootDistDir,
  repoRootDir,
];

for (const target of staticTargets) {
  fs.writeFileSync(path.join(target, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.join(target, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(target, 'llms.txt'), llmsTxt, 'utf8');
}
console.log('✓ [postbuild] Generated physical robots.txt, sitemap.xml, and llms.txt');

console.log('✓ [postbuild] Cleaned and synchronized matching assets across all web roots');

// 11. Static Site Pre-rendering (SSG) for all 27 routes + 404
// Eliminates the SPA Duplicate Content trap by generating dedicated physical index.html files
console.log('\n[postbuild] Starting Static Site Pre-rendering (SSG) for all routes...');
const serverBuildPath = path.resolve(__dirname, '../../../dist/apps/web/server/index.js');

if (fs.existsSync(serverBuildPath)) {
  const { createRequestHandler } = await import('react-router');
  const serverBuild = await import(pathToFileURL(serverBuildPath).href);
  const handler = createRequestHandler(serverBuild, 'production');

  let successCount = 0;
  for (const route of staticRoutes) {
    const pageUrl = `${origin}${route.path}`;
    const req = new Request(pageUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    try {
      const res = await handler(req);
      if (res.status === 200) {
        let pageHtml = await res.text();
        pageHtml = pageHtml.replace(/http:\/\/localhost:\d+/g, origin);

        const relativePath = route.path === '/'
          ? 'index.html'
          : path.join(route.path.replace(/^\//, ''), 'index.html');

        const targets = [
          path.join(clientDir, relativePath),
          path.join(rootDistDir, relativePath),
          path.join(repoRootDir, relativePath),
        ];

        for (const targetFile of targets) {
          fs.mkdirSync(path.dirname(targetFile), { recursive: true });
          fs.writeFileSync(targetFile, pageHtml, 'utf8');
        }

        successCount++;
        console.log(`  ✓ Pre-rendered [200]: ${route.path} -> ${relativePath} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
      } else {
        console.warn(`  ⚠ Route ${route.path} returned status ${res.status}`);
      }
    } catch (err) {
      console.error(`  ✗ Error pre-rendering ${route.path}:`, err);
    }
  }

  // Pre-render dedicated 404 page
  try {
    const notFoundReq = new Request(`${origin}/not-found`, {
      headers: { 'user-agent': 'Googlebot/2.1' },
    });
    const notFoundRes = await handler(notFoundReq);
    let notFoundHtml = await notFoundRes.text();
    notFoundHtml = notFoundHtml.replace(/http:\/\/localhost:\d+/g, origin);

    const notFoundTargets = [
      path.join(clientDir, '404.html'),
      path.join(rootDistDir, '404.html'),
      path.join(repoRootDir, '404.html'),
    ];

    for (const targetFile of notFoundTargets) {
      fs.writeFileSync(targetFile, notFoundHtml, 'utf8');
    }
    console.log(`  ✓ Pre-rendered [404]: /not-found -> 404.html (${(notFoundHtml.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error('  ✗ Error pre-rendering 404.html:', err);
  }

  console.log(`\n✓ [postbuild] Pre-rendering complete! ${successCount}/${staticRoutes.length} routes pre-rendered into dedicated static index.html files.\n`);
} else {
  console.warn('[postbuild] Server build not found at', serverBuildPath, '- skipping static prerender.');
}

