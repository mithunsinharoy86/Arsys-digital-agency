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

// Copy images (if present and not empty)
const imagesDir = path.join(clientDir, 'images');
const rootImagesDir = path.join(rootDistDir, 'images');
const repoImagesDir = path.join(repoRootDir, 'images');
if (fs.existsSync(imagesDir) && fs.readdirSync(imagesDir).length > 0) {
  fs.cpSync(imagesDir, rootImagesDir, { recursive: true });
  fs.cpSync(imagesDir, repoImagesDir, { recursive: true });
}

// Copy api endpoints (e.g. PHP handlers)
const apiDir = path.join(clientDir, 'api');
const rootApiDir = path.join(rootDistDir, 'api');
const repoApiDir = path.join(repoRootDir, 'api');
if (fs.existsSync(apiDir)) {
  fs.cpSync(apiDir, rootApiDir, { recursive: true });
  fs.cpSync(apiDir, repoApiDir, { recursive: true });
}

// Copy .well-known directory (RFC 5785 / SEP-1649 MCP Server Card)
const publicWellKnownDir = path.resolve(__dirname, '../public/.well-known');
const clientWellKnownDir = path.join(clientDir, '.well-known');
const rootWellKnownDir = path.join(rootDistDir, '.well-known');
const repoWellKnownDir = path.join(repoRootDir, '.well-known');
if (fs.existsSync(publicWellKnownDir)) {
  fs.cpSync(publicWellKnownDir, clientWellKnownDir, { recursive: true });
  fs.cpSync(publicWellKnownDir, rootWellKnownDir, { recursive: true });
  fs.cpSync(publicWellKnownDir, repoWellKnownDir, { recursive: true });
  console.log('✓ [postbuild] Synchronized /.well-known directory across all targets');
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
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: ClaudeBot
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Google-Extended
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Applebot-Extended
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: meta-externalagent
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Bytespider
Disallow: /

Sitemap: ${origin}/sitemap.xml
`;

// Dynamically load all articles from site.ts to include in static routes and sitemap
let dynamicArticles = [];
try {
  const siteTsPath = path.resolve(__dirname, '../src/data/site.ts');
  if (fs.existsSync(siteTsPath)) {
    const siteTsContent = fs.readFileSync(siteTsPath, 'utf8');
    // Extract everything from `export const articles = [` to the end of the file
    const articlesStartIndex = siteTsContent.indexOf('export const articles');
    if (articlesStartIndex !== -1) {
      const articlesBody = siteTsContent.slice(articlesStartIndex);
      const slugMatches = [...articlesBody.matchAll(/"slug":\s*"([^"]+)"|slug:\s*['"]([^'"]+)['"]/g)];
      
      const seenSlugs = new Set();
      slugMatches.forEach((m) => {
        const slug = m[1] || m[2];
        if (slug && !seenSlugs.has(slug)) {
          seenSlugs.add(slug);
          dynamicArticles.push({ slug });
        }
      });
    }
    console.log(`[postbuild] Dynamically discovered ${dynamicArticles.length} articles from site.ts`);
  }
} catch (e) {
  console.warn(`[postbuild] Could not parse site.ts articles dynamically: ${e.message}`);
}

const baseStaticRoutes = [
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
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

const articleRoutes = dynamicArticles.map(a => ({
  path: `/blogs/${a.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
  lastmod: a.lastmod,
}));

const staticRoutes = [...baseStaticRoutes, ...articleRoutes];

const today = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (r) => `  <url>
    <loc>${origin}${r.path}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const llmsTxt = `# Klyro Works

> Klyro Works is a digital growth and technology agency specializing in bespoke website development, technical SEO, Generative Engine Optimization (GEO), Google Ads/PPC, UI/UX design, branding, and AI workflow automation. Serving ambitious businesses across the United States, United Kingdom, and India.

## Organization & Capabilities
- **Brand Name**: Klyro Works
- **Official Website**: ${origin}
- **Target Markets**: United States (US), United Kingdom (UK), India (IN)
- **Primary Focus**: Bespoke high-performance web engineering, technical search dominance, and AI-powered operational automations
- **Core Value Proposition**: 100% intellectual property code ownership, sub-second performance standard, transparent milestone-based delivery, and strict WCAG 2.1 AA and GDPR/CCPA compliance
- **Direct Consultation Contact**: admin@klyroworks.com

## Agency Overview
- [About Us](${origin}/about): Our engineering philosophy, leadership, and commercial methodology.
- [Book a Consultation](${origin}/contact): Free 30-minute discovery call and tailored project blueprint.
- [Capabilities & Work](${origin}/our-work): Illustrative blueprints, technical concepts, and architectural showcases.
- [Privacy Policy](${origin}/privacy): GDPR, CCPA, and data privacy disclosures.
- [Terms of Service](${origin}/terms): Commercial terms, code ownership guarantees, and service conditions.

## Core Services
- [Website Development](${origin}/services/website-development): Custom, sub-second web platforms engineered with modern frameworks, zero bloatware, and accessible design.
- [Search Engine Optimisation](${origin}/services/seo): Technical crawl optimization, Schema.org knowledge graph engineering, keyword clustering, and Generative Engine Optimization (GEO).
- [Digital Marketing & PPC](${origin}/services/digital-marketing): Data-driven Google Ads management, Performance Max campaigns, and high-intent conversion rate optimization.
- [AI Automation & Workflows](${origin}/services/ai-automation): Custom business process automations, automated lead qualification, and CRM integrations (HubSpot, Salesforce).
- [UI/UX Design](${origin}/services/ui-ux-design): User-centred product design, wireframing, high-fidelity prototypes, and scalable design systems.
- [Branding & Identity](${origin}/services/branding): Distinctive brand positioning, visual identity, typography systems, and comprehensive brand guidelines.
- [Ecommerce Solutions](${origin}/services/ecommerce): High-conversion online stores, headless Shopify development, and streamlined checkout funnels.
- [Social Media Marketing](${origin}/services/social-media-marketing): Commercial paid and organic social strategies driving brand authority.
- [Content Marketing](${origin}/services/content-marketing): Authority-building topic clusters and conversion copywriting aligned with E-E-A-T guidelines.

## Industry Solutions
- [Real Estate](${origin}/industries/real-estate): Property portals, MLS/IDX integrations, local SEO, and automated valuation booking funnels.
- [Dental Clinics](${origin}/industries/dental-clinics): Healthcare websites, patient acquisition funnels, local Google 3-Pack SEO, and appointment automations.
- [Ecommerce DTC](${origin}/industries/ecommerce): Scalable shopping experiences engineered for fast checkout and high customer lifetime value.
- [Professional Services](${origin}/industries/professional-services): B2B lead generation architecture, authority positioning, and consultation scheduling for law, accounting, and consulting firms.

## Articles & Technical Insights
- [Conversion-Focused Website Design](${origin}/blogs/conversion-focused-website): What separates high-converting commercial websites in 2026.
- [Local SEO Guide for Service Businesses](${origin}/blogs/local-seo-for-service-businesses): Practical guide to dominating local search in competitive US and UK metros.
- [Business Process Automation](${origin}/blogs/first-business-automation): Where growing businesses should start with AI automation.
- [Generative Engine Optimization (GEO)](${origin}/blogs/geo-and-ai-search-ranking): How to earn citations in Google AI Overviews, Perplexity, and ChatGPT Search.
- [Core Web Vitals Impact on Revenue](${origin}/blogs/core-web-vitals-business-impact): Real-world commercial ROI of sub-second load times and mobile page speed.
- [B2B Google Ads & PPC Scaling Playbook](${origin}/blogs/b2b-google-ads-ppc-scaling-playbook): How high-growth companies generate qualified commercial inquiries at scale.
- [Zero-Lag AI Lead Qualification](${origin}/blogs/ai-lead-qualification-and-crm-automation): How AI agents and CRM automation eliminate speed-to-lead drop-off.
- [Headless Ecommerce vs Monolithic Shopify](${origin}/blogs/headless-ecommerce-shopify-growth-architecture): The engineering and revenue blueprint for scaling DTC brands.
- [Executive Guide to B2B Website Redesign](${origin}/blogs/b2b-website-redesign-strategy-and-roi): Scope, milestones, SEO protection, and revenue ROI.
- [Healthcare & Dental Patient Acquisition Engine](${origin}/blogs/healthcare-patient-acquisition-funnels): High-trust web design, Google Local 3-Pack, and automated booking.
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

// 11. Static Site Pre-rendering (SSG) for all 32 routes + 404
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

