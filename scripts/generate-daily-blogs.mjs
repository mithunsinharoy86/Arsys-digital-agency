/**
 * generate-daily-blogs.mjs
 * Master Automation & Quality Control Orchestrator for Klyro Works
 * 
 * Usage:
 *   node scripts/generate-daily-blogs.mjs [--dry-run] [--count=5]
 */

import fs from 'node:fs';
import path from 'node:path';
import { selectDailyTopics, loadTopicHistory, saveTopicHistory } from './lib/topic-intelligence.mjs';
import { generateArticleContent } from './lib/gemini-generator.mjs';
import { validateArticle } from './lib/quality-control.mjs';

const SITE_TS_PATH = path.resolve('apps/web/src/data/site.ts');
const REPORTS_DIR = path.resolve('reports');

// Parse CLI flags
const isDryRun = process.argv.includes('--dry-run');
const countArg = process.argv.find(a => a.startsWith('--count='));
const targetCount = countArg ? parseInt(countArg.split('=')[1], 10) : 5;

/**
 * Extract existing live articles from site.ts
 */
function extractExistingArticles() {
  if (!fs.existsSync(SITE_TS_PATH)) {
    throw new Error(`site.ts not found at ${SITE_TS_PATH}`);
  }
  const content = fs.readFileSync(SITE_TS_PATH, 'utf8');
  const slugMatches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const titleMatches = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  return slugMatches.map((slug, idx) => ({
    slug,
    title: titleMatches[idx] || slug,
  }));
}

/**
 * Append an approved article into site.ts
 */
function appendArticleToSiteTs(article) {
  const content = fs.readFileSync(SITE_TS_PATH, 'utf8');
  
  // Format article object matching site.ts schema
  const articleObjStr = `  {
    id: '${article.slug}',
    title: ${JSON.stringify(article.title)},
    slug: ${JSON.stringify(article.slug)},
    excerpt: ${JSON.stringify(article.excerpt)},
    category: ${JSON.stringify(article.category || 'Engineering')},
    readTime: ${JSON.stringify(article.readTime || '8 min read')},
    publishedAt: ${JSON.stringify(article.publishedAt)},
    image: ${JSON.stringify(article.image)},
    imageAlt: ${JSON.stringify(article.imageAlt)},
    author: {
      name: ${JSON.stringify(article.author.name)},
      role: ${JSON.stringify(article.author.role)},
      avatar: ${JSON.stringify(article.author.avatar)},
    },
    content: ${JSON.stringify(article.content)},
  },
`;

  // Find the closing bracket of the articles array
  // Articles array is `export const articles: Article[] = [...]`
  const articlesArrayRegex = /(export const articles:\s*Article\[\]\s*=\s*\[)([\s\S]*?)(\n\];)/;
  if (!articlesArrayRegex.test(content)) {
    throw new Error('Could not locate articles array in site.ts');
  }

  const updatedContent = content.replace(
    articlesArrayRegex,
    (match, p1, p2, p3) => `${p1}${p2}\n${articleObjStr}${p3}`
  );

  fs.writeFileSync(SITE_TS_PATH, updatedContent, 'utf8');
}

/**
 * Main execution routine
 */
async function run() {
  console.log('=================================================================');
  console.log(`[orchestrator] Starting Klyro Works Blog Automation (Dry Run: ${isDryRun})`);
  console.log(`[orchestrator] Target: Generate ${targetCount} high-quality articles`);
  console.log('=================================================================\n');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey && !isDryRun) {
    console.error('ERROR: GEMINI_API_KEY environment variable is missing.');
    process.exit(1);
  }

  // 1. Load context & history
  const topicHistory = loadTopicHistory();
  const existingArticles = extractExistingArticles();
  console.log(`[orchestrator] Found ${existingArticles.length} live articles in site.ts.`);
  console.log(`[orchestrator] Found ${topicHistory.topics.length} recorded topics in history.\n`);

  // 2. Select topics rotating across services, industries, and formats
  const candidateTopics = selectDailyTopics(targetCount);
  console.log(`[orchestrator] Selected ${candidateTopics.length} intelligent topics:`);
  candidateTopics.forEach((t, i) => {
    console.log(`  ${i + 1}. [${t.serviceId}] (${t.industry} | ${t.market}) ${t.title}`);
  });
  console.log('');

  if (isDryRun) {
    console.log('✓ [orchestrator] Dry run complete! Topics selected and validated without calling Gemini API.');
    return;
  }

  // 3. Generate articles and run independent QC validation
  const generatedArticles = [];
  const qcResults = [];
  const approvedArticles = [];

  for (let i = 0; i < candidateTopics.length; i++) {
    const topic = candidateTopics[i];
    console.log(`\n[orchestrator] [${i + 1}/${candidateTopics.length}] Generating article: "${topic.title}"...`);

    try {
      const article = await generateArticleContent(topic, apiKey);
      generatedArticles.push(article);

      console.log(`[orchestrator] Validating with independent SEO Quality Control engine...`);
      const qc = validateArticle(article, existingArticles, topicHistory.topics);
      qcResults.push({ topic, article, qc });

      console.log(`  -> Status: ${qc.status} | Words: ${qc.wordCount} | Internal Links: ${qc.internalLinkCount}`);
      if (qc.issues.length > 0) {
        console.warn(`  -> Issues:`, qc.issues.map(iss => iss.message).join('; '));
      }
      if (qc.warnings.length > 0) {
        console.log(`  -> Warnings:`, qc.warnings.map(w => w.message).join('; '));
      }

      if (qc.status === 'APPROVED') {
        approvedArticles.push(article);
        // Add to existingArticles so subsequent articles in the same batch avoid collisions
        existingArticles.push({ slug: article.slug, title: article.title });
      }
    } catch (err) {
      console.error(`[orchestrator] Failed generating "${topic.title}":`, err.message);
    }
  }

  console.log(`\n=================================================================`);
  console.log(`[orchestrator] Batch Summary: ${approvedArticles.length}/${candidateTopics.length} approved for publication`);
  console.log(`=================================================================\n`);

  // 4. Save QC Report
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const reportDate = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(REPORTS_DIR, `blog-generation-report-${reportDate}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalAttempted: candidateTopics.length,
    approvedCount: approvedArticles.length,
    results: qcResults,
  }, null, 2), 'utf8');
  console.log(`✓ [orchestrator] Written QC audit report to ${reportPath}`);

  // 5. Publish approved articles to site.ts and topic-history.json
  if (approvedArticles.length > 0) {
    console.log('\n[orchestrator] Injecting approved articles into production...');
    for (const article of approvedArticles) {
      appendArticleToSiteTs(article);
      topicHistory.topics.push({
        id: article.slug,
        title: article.title,
        slug: article.slug,
        primaryKeyword: article.primaryKeyword,
        publishedDate: article.publishedAt,
        service: article.category,
        industry: article.targetIndustry,
        market: [article.targetMarket],
        searchIntent: article.searchIntent,
      });
      console.log(`  ✓ Published: /blogs/${article.slug}`);
    }
    saveTopicHistory(topicHistory);
    console.log('✓ [orchestrator] Updated site.ts and topic-history.json successfully.');
  } else {
    console.warn('[orchestrator] No articles met 100% approval criteria. Zero production modifications made.');
  }
}

run().catch(err => {
  console.error('[orchestrator] Fatal error:', err);
  process.exit(1);
});
