/**
 * quality-control.mjs
 * Independent 17-Point SEO Quality Control & Validation Engine for Klyro Works
 * 
 * Gemini is NEVER allowed to approve its own generated articles.
 * This script runs independently to strictly enforce production standards.
 */

import { validateImageLicence } from './media-licensing.mjs';

// Verified Internal Routes Whitelist
export const VERIFIED_INTERNAL_ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/services/seo-services',
  '/services/digital-marketing',
  '/services/ai-automation',
  '/services/ui-ux-design',
  '/services/branding',
  '/case-studies',
  '/blog',
  '/contact',
  '/terms',
  '/privacy',
  '/refund-policy',
  '/llms.txt',
];

/**
 * Extract word count from markdown text (excluding markdown syntax and symbols)
 */
export function getWordCount(text) {
  if (!text) return 0;
  // Strip code blocks, markdown headings, image tags, links
  const cleaned = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~`>|-]/g, ' ')
    .trim();
  const words = cleaned.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

/**
 * Validate an article draft against 17 strict production SEO rules
 */
export function validateArticle(article, existingArticles = [], topicHistory = []) {
  const issues = [];
  const warnings = [];

  // 1. Title validation
  if (!article.title || typeof article.title !== 'string') {
    issues.push({ code: 'TITLE_MISSING', message: 'Article title is required' });
  } else {
    if (article.title.length < 30 || article.title.length > 80) {
      warnings.push({ code: 'TITLE_LENGTH', message: `Title length (${article.title.length}) is outside ideal 40-70 range` });
    }
  }

  // 2. Slug validation
  if (!article.slug || !/^[a-z0-9-]+$/.test(article.slug)) {
    issues.push({ code: 'SLUG_INVALID', message: `Slug "${article.slug}" must be lowercase hyphenated alphanumeric only` });
  }

  // 3. Excerpt (Meta description) validation
  if (!article.excerpt || article.excerpt.length < 80 || article.excerpt.length > 220) {
    issues.push({ code: 'EXCERPT_LENGTH', message: `Meta description length (${article.excerpt?.length || 0}) must be 80-220 chars` });
  }

  // 4. Word count threshold (strict minimum 1200 words)
  const wordCount = getWordCount(article.content);
  if (wordCount < 1200) {
    issues.push({ code: 'INSUFFICIENT_WORD_COUNT', message: `Article word count is ${wordCount}. Strict minimum is 1,200 words` });
  }

  // 5. Duplicate slug check against existing live articles & history
  const slugLower = article.slug.toLowerCase();
  const duplicateLiveSlug = existingArticles.some(a => a.slug && a.slug.toLowerCase() === slugLower);
  const duplicateHistorySlug = topicHistory.some(t => t.slug && t.slug.toLowerCase() === slugLower);
  if (duplicateLiveSlug || duplicateHistorySlug) {
    issues.push({ code: 'DUPLICATE_SLUG', message: `Slug "${article.slug}" is already in use by another article` });
  }

  // 6. Duplicate title check
  const titleLower = article.title.toLowerCase();
  const duplicateLiveTitle = existingArticles.some(a => a.title && a.title.toLowerCase() === titleLower);
  if (duplicateLiveTitle) {
    issues.push({ code: 'DUPLICATE_TITLE', message: `Title "${article.title}" is already published on the site` });
  }

  // 7. Primary keyword presence
  if (!article.primaryKeyword || article.primaryKeyword.trim().length === 0) {
    issues.push({ code: 'PRIMARY_KEYWORD_MISSING', message: 'Primary keyword must be specified' });
  } else {
    // Check keyword in content
    const kwRegex = new RegExp(article.primaryKeyword, 'i');
    if (!kwRegex.test(article.content)) {
      warnings.push({ code: 'KEYWORD_NOT_IN_BODY', message: `Primary keyword "${article.primaryKeyword}" was not found in content body` });
    }
  }

  // 8. Headings structure (must have ## H2 and ### H3)
  const h2Matches = (article.content || '').match(/^##\s+.+$/gm) || [];
  const h3Matches = (article.content || '').match(/^###\s+.+$/gm) || [];
  if (h2Matches.length < 3) {
    issues.push({ code: 'FEW_H2_HEADINGS', message: `Found only ${h2Matches.length} H2 headings. Minimum required is 3` });
  }
  if (h3Matches.length < 2) {
    warnings.push({ code: 'FEW_H3_HEADINGS', message: `Found only ${h3Matches.length} H3 headings. Recommended is 2+` });
  }

  // 9. Table / Framework presence
  const hasTable = /\|.+\|[\r\n]+\|[-:| ]+\|[\r\n]+\|.+\|/.test(article.content || '');
  if (!hasTable) {
    warnings.push({ code: 'MISSING_TABLE', message: 'No comparison table or operational matrix detected in content' });
  }

  // 10. Call to Action (CTA) presence
  const hasCta = /call to action|get in touch|book a consultation|klyro works|audit|contact us/i.test(article.content || '');
  if (!hasCta) {
    issues.push({ code: 'MISSING_CTA', message: 'No clear Call to Action (CTA) detected in content' });
  }

  // 11. FAQs section check
  const hasFaqSection = /##\s+.*(faq|frequently asked questions)/i.test(article.content || '');
  if (!hasFaqSection) {
    issues.push({ code: 'MISSING_FAQS', message: 'No dedicated FAQ section found with ## heading' });
  }

  // 12. Conclusion section check
  const hasConclusion = /##\s+.*(conclusion|final thoughts|key takeaways|summary)/i.test(article.content || '');
  if (!hasConclusion) {
    issues.push({ code: 'MISSING_CONCLUSION', message: 'No dedicated Conclusion section found with ## heading' });
  }

  // 13. Internal Link Whitelisting (Check all markdown links)
  const linkMatches = [...(article.content || '').matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  let internalLinkCount = 0;
  for (const match of linkMatches) {
    const url = match[2];
    if (url.startsWith('/')) {
      internalLinkCount++;
      // Check if internal route is in verified whitelist or is a live blog
      const isKnownRoute = VERIFIED_INTERNAL_ROUTES.includes(url) ||
        existingArticles.some(a => `/blog/${a.slug}` === url);
      if (!isKnownRoute) {
        issues.push({ code: 'INVALID_INTERNAL_LINK', message: `Internal link "${url}" is not on the verified routes whitelist` });
      }
    }
  }

  if (internalLinkCount < 2) {
    issues.push({ code: 'INSUFFICIENT_INTERNAL_LINKS', message: `Found only ${internalLinkCount} internal links. Minimum 2 required` });
  }

  // 14. Image and Licensing check
  if (!article.image || !article.image.startsWith('http')) {
    issues.push({ code: 'IMAGE_MISSING', message: 'Featured image URL is missing or invalid' });
  } else {
    const licenceCheck = validateImageLicence({
      source: article.imageSource,
      licenceUrl: article.imageLicenceUrl,
      imageUrl: article.image,
      photographer: article.imagePhotographer,
    });
    if (!licenceCheck.valid) {
      issues.push({ code: 'IMAGE_LICENCE_INVALID', message: licenceCheck.error });
    }
  }

  // 15. Alt text check
  if (!article.imageAlt || article.imageAlt.length < 10) {
    warnings.push({ code: 'IMAGE_ALT_SHORT', message: 'Featured image alt text is missing or too short' });
  }

  // 16. Author information check
  if (!article.author || !article.author.name) {
    issues.push({ code: 'AUTHOR_MISSING', message: 'Author information is incomplete' });
  }

  // 17. AI Cliche / Quality filter
  const bannedPhrases = [
    'in today\'s fast-paced digital world',
    'delve into',
    'tapestry of',
    'in conclusion, in today',
    'testament to',
  ];
  for (const phrase of bannedPhrases) {
    if (new RegExp(phrase, 'i').test(article.content || '')) {
      warnings.push({ code: 'AI_CLICHE_DETECTED', message: `Detected generic AI phrasing: "${phrase}"` });
    }
  }

  const passed = issues.length === 0;
  return {
    status: passed ? 'APPROVED' : (wordCount >= 1000 && issues.length <= 2 ? 'NEEDS_REVISION' : 'REJECTED'),
    passed,
    wordCount,
    internalLinkCount,
    issues,
    warnings,
  };
}
