/**
 * topic-intelligence.mjs
 * Intelligent Topic Selection & Anti-Cannibalization Engine for Klyro Works
 */

import fs from 'node:fs';
import path from 'node:path';

const TOPIC_HISTORY_PATH = path.resolve('data/content-intelligence/topic-history.json');

// Core Services
export const SERVICES = [
  { id: 'web-development', name: 'Website Development', path: '/services/web-development' },
  { id: 'seo-services', name: 'SEO Services', path: '/services/seo-services' },
  { id: 'digital-marketing', name: 'Digital Marketing and Paid Search', path: '/services/digital-marketing' },
  { id: 'ai-automation', name: 'AI Automation and Workflows', path: '/services/ai-automation' },
  { id: 'ui-ux-design', name: 'UI/UX Design and Product Strategy', path: '/services/ui-ux-design' },
  { id: 'branding-creative', name: 'Branding and Creative Design', path: '/services/branding' },
];

// Target Industries
export const INDUSTRIES = [
  'Real Estate',
  'Dental and Healthcare',
  'Ecommerce',
  'Professional and B2B Services',
];

// Target Geographic Markets
export const MARKETS = ['US', 'UK', 'India'];

// Supported Content Formats
export const CONTENT_FORMATS = [
  'problem-solving',
  'how-to-guide',
  'comparison',
  'strategic-insights',
  'industry-specific',
  'trending-tech',
];

// Curated Master Topic Ideas pool by service, industry, format, and search intent
export const TOPIC_MATRIX = [
  // 1. Web Development
  {
    serviceId: 'web-development',
    industry: 'Real Estate',
    market: 'US',
    format: 'problem-solving',
    title: 'Why Real Estate Websites Fail to Convert Property Leads (And How to Fix It)',
    slug: 'why-real-estate-websites-fail-to-convert-leads',
    primaryKeyword: 'real estate website lead conversion',
    secondaryKeywords: ['property search UX', 'MLS integration best practices', 'real estate landing pages', 'property inquiry rate'],
    searchIntent: 'Commercial Investigation / Problem-Solving',
    internalLinkTarget: '/services/web-development',
  },
  {
    serviceId: 'web-development',
    industry: 'Ecommerce',
    market: 'UK',
    format: 'comparison',
    title: 'Custom Headless Commerce vs Shopify Plus: Complete Performance and TCO Analysis',
    slug: 'custom-headless-commerce-vs-shopify-plus',
    primaryKeyword: 'headless commerce vs shopify plus',
    secondaryKeywords: ['ecommerce site speed', 'headless shopify architecture', 'enterprise ecommerce platform', 'custom frontend dev'],
    searchIntent: 'Commercial Investigation',
    internalLinkTarget: '/services/web-development',
  },
  {
    serviceId: 'web-development',
    industry: 'Dental and Healthcare',
    market: 'India',
    format: 'how-to-guide',
    title: 'How to Build a HIPAA and DISHA Compliant Healthcare Booking Portal',
    slug: 'build-compliant-healthcare-booking-portal',
    primaryKeyword: 'healthcare patient booking portal development',
    secondaryKeywords: ['clinic appointment system', 'patient data security', 'telehealth portal architecture', 'medical web app'],
    searchIntent: 'Informational / How-To',
    internalLinkTarget: '/services/web-development',
  },
  {
    serviceId: 'web-development',
    industry: 'Professional and B2B Services',
    market: 'US',
    format: 'strategic-insights',
    title: 'Next.js 15 and Server Components Architecture for B2B SaaS Platforms',
    slug: 'nextjs-15-architecture-for-b2b-saas',
    primaryKeyword: 'Nextjs 15 enterprise architecture',
    secondaryKeywords: ['React server components', 'B2B web app performance', 'scalable frontend architecture', 'Core Web Vitals enterprise'],
    searchIntent: 'Informational / Strategic',
    internalLinkTarget: '/services/web-development',
  },

  // 2. SEO Services
  {
    serviceId: 'seo-services',
    industry: 'Dental and Healthcare',
    market: 'US',
    format: 'how-to-guide',
    title: 'Local SEO for Multi-Location Dental Clinics: Google Maps and Citation Strategy',
    slug: 'local-seo-multi-location-dental-clinics',
    primaryKeyword: 'local SEO for dental clinics',
    secondaryKeywords: ['dental Google Business Profile', 'healthcare local citations', 'patient acquisition local search', 'dental clinic SEO audit'],
    searchIntent: 'Commercial Investigation / How-To',
    internalLinkTarget: '/services/seo-services',
  },
  {
    serviceId: 'seo-services',
    industry: 'Ecommerce',
    market: 'UK',
    format: 'problem-solving',
    title: 'How to Recover from an Ecommerce Index Bloat and Crawl Budget Crisis',
    slug: 'ecommerce-index-bloat-crawl-budget-recovery',
    primaryKeyword: 'ecommerce crawl budget optimization',
    secondaryKeywords: ['index bloat fix', 'faceted navigation SEO', 'canonical tag strategy', 'XML sitemap clean up'],
    searchIntent: 'Technical Problem-Solving',
    internalLinkTarget: '/services/seo-services',
  },
  {
    serviceId: 'seo-services',
    industry: 'Professional and B2B Services',
    market: 'India',
    format: 'strategic-insights',
    title: 'B2B Programmatic SEO: Building High-Intent Directory and Integration Landing Pages',
    slug: 'b2b-programmatic-seo-architecture',
    primaryKeyword: 'B2B programmatic SEO strategy',
    secondaryKeywords: ['data-driven page generation', 'topical authority architecture', 'high intent landing pages', 'enterprise SEO automation'],
    searchIntent: 'Strategic Insights',
    internalLinkTarget: '/services/seo-services',
  },
  {
    serviceId: 'seo-services',
    industry: 'Real Estate',
    market: 'US',
    format: 'problem-solving',
    title: 'Why Your Real Estate Property Listings Are Not Ranking on Google Search',
    slug: 'why-real-estate-listings-not-ranking',
    primaryKeyword: 'real estate listing SEO issues',
    secondaryKeywords: ['MLS duplicate content', 'property schema markup', 'local housing keywords', 'real estate search visibility'],
    searchIntent: 'Problem-Solving',
    internalLinkTarget: '/services/seo-services',
  },

  // 3. Digital Marketing & Paid Search
  {
    serviceId: 'digital-marketing',
    industry: 'Dental and Healthcare',
    market: 'US',
    format: 'problem-solving',
    title: 'Why Healthcare Google Ads Drive Costly Clicks Without Booked Appointments',
    slug: 'healthcare-google-ads-high-cpc-zero-bookings',
    primaryKeyword: 'healthcare google ads conversion optimization',
    secondaryKeywords: ['dental PPC cost reduction', 'medical lead quality ads', 'negative keywords healthcare', 'patient acquisition cost'],
    searchIntent: 'Commercial Problem-Solving',
    internalLinkTarget: '/services/digital-marketing',
  },
  {
    serviceId: 'digital-marketing',
    industry: 'Ecommerce',
    market: 'UK',
    format: 'strategic-insights',
    title: 'Scaling Performance Max (PMax) Campaigns for High-AOV DTC Brands',
    slug: 'scaling-performance-max-high-aov-brands',
    primaryKeyword: 'Performance Max scaling strategy',
    secondaryKeywords: ['Google PMax audience signals', 'first-party data feed', 'high ticket ROAS', 'e-commerce paid acquisition'],
    searchIntent: 'Strategic / How-To',
    internalLinkTarget: '/services/digital-marketing',
  },
  {
    serviceId: 'digital-marketing',
    industry: 'Professional and B2B Services',
    market: 'India',
    format: 'comparison',
    title: 'LinkedIn Ads vs Google Search Ads for Enterprise B2B Lead Generation',
    slug: 'linkedin-ads-vs-google-search-b2b',
    primaryKeyword: 'LinkedIn ads vs Google ads for B2B',
    secondaryKeywords: ['account based marketing PPC', 'cost per MQL enterprise', 'B2B retargeting strategy', 'enterprise pipeline generation'],
    searchIntent: 'Comparison',
    internalLinkTarget: '/services/digital-marketing',
  },
  {
    serviceId: 'digital-marketing',
    industry: 'Real Estate',
    market: 'US',
    format: 'how-to-guide',
    title: 'High-Converting Meta Ad Funnels for Luxury Real Estate Developments',
    slug: 'meta-ad-funnels-luxury-real-estate',
    primaryKeyword: 'luxury real estate facebook ads',
    secondaryKeywords: ['property lead generation ads', 'Instagram ads for real estate', 'real estate CRM lead routing', 'HNI targeting Facebook'],
    searchIntent: 'How-To Guide',
    internalLinkTarget: '/services/digital-marketing',
  },

  // 4. AI Automation & Workflows
  {
    serviceId: 'ai-automation',
    industry: 'Professional and B2B Services',
    market: 'US',
    format: 'problem-solving',
    title: 'Automating Customer Support Triage with Custom LLMs and Webhooks',
    slug: 'automating-customer-support-triage-llm',
    primaryKeyword: 'AI customer support triage automation',
    secondaryKeywords: ['LLM ticket classification', 'CRM webhook workflows', 'automated customer service escalation', 'support SLA optimization'],
    searchIntent: 'Problem-Solving / How-To',
    internalLinkTarget: '/services/ai-automation',
  },
  {
    serviceId: 'ai-automation',
    industry: 'Ecommerce',
    market: 'UK',
    format: 'how-to-guide',
    title: 'Building Automated AI Product Catalog Enrichment and Tagging Pipelines',
    slug: 'automated-ai-product-catalog-enrichment',
    primaryKeyword: 'AI product catalog enrichment',
    secondaryKeywords: ['automated product tagging', 'multimodal ecommerce automation', 'SKU attribute extraction', 'automated inventory descriptions'],
    searchIntent: 'How-To Guide',
    internalLinkTarget: '/services/ai-automation',
  },
  {
    serviceId: 'ai-automation',
    industry: 'Real Estate',
    market: 'India',
    format: 'trending-tech',
    title: 'Autonomous AI Agents for Real Estate Inquiry Qualification and Scheduling',
    slug: 'ai-agents-real-estate-qualification',
    primaryKeyword: 'real estate AI lead qualification agent',
    secondaryKeywords: ['WhatsApp AI automation real estate', 'instant property visit scheduling', 'CRM lead auto qualification', 'real estate conversational AI'],
    searchIntent: 'Trending Tech / Commercial',
    internalLinkTarget: '/services/ai-automation',
  },
  {
    serviceId: 'ai-automation',
    industry: 'Dental and Healthcare',
    market: 'US',
    format: 'strategic-insights',
    title: 'How Medical Practices Automate Patient Intake and Insurance Verification',
    slug: 'automate-patient-intake-insurance-verification',
    primaryKeyword: 'automated patient intake workflows',
    secondaryKeywords: ['healthcare administrative automation', 'insurance eligibility API', 'digital medical forms', 'clinic operational efficiency'],
    searchIntent: 'Strategic Insights',
    internalLinkTarget: '/services/ai-automation',
  },

  // 5. UI/UX Design & Product Strategy
  {
    serviceId: 'ui-ux-design',
    industry: 'Ecommerce',
    market: 'US',
    format: 'problem-solving',
    title: 'Mobile Checkout UX Redesign: Reducing Cart Abandonment on Shopify',
    slug: 'mobile-checkout-ux-reduce-cart-abandonment',
    primaryKeyword: 'mobile checkout UX optimization',
    secondaryKeywords: ['cart abandonment rate reduction', 'one-page checkout UX', 'mobile payment friction', 'ecommerce conversion rate audit'],
    searchIntent: 'Problem-Solving',
    internalLinkTarget: '/services/ui-ux-design',
  },
  {
    serviceId: 'ui-ux-design',
    industry: 'Professional and B2B Services',
    market: 'UK',
    format: 'strategic-insights',
    title: 'Designing Complex B2B SaaS Data Tables: Information Architecture & Filtering',
    slug: 'designing-b2b-saas-data-tables',
    primaryKeyword: 'B2B SaaS data table UX',
    secondaryKeywords: ['enterprise dashboard design', 'data grid usability', 'complex filtering UX', 'SaaS product design systems'],
    searchIntent: 'Strategic / How-To',
    internalLinkTarget: '/services/ui-ux-design',
  },
  {
    serviceId: 'ui-ux-design',
    industry: 'Dental and Healthcare',
    market: 'India',
    format: 'problem-solving',
    title: 'Accessible Healthcare App Design: WCAG 2.2 AA Compliance for Patient Portals',
    slug: 'accessible-healthcare-app-design-wcag',
    primaryKeyword: 'healthcare UX accessibility WCAG',
    secondaryKeywords: ['patient portal usability', 'accessible form design', 'contrast ratio healthcare UI', 'screen reader optimization'],
    searchIntent: 'Problem-Solving / How-To',
    internalLinkTarget: '/services/ui-ux-design',
  },
  {
    serviceId: 'ui-ux-design',
    industry: 'Real Estate',
    market: 'US',
    format: 'how-to-guide',
    title: 'Interactive Property Floorplan and 3D Virtual Tour UX Design Patterns',
    slug: 'interactive-property-floorplan-ux-design',
    primaryKeyword: 'real estate 3D virtual tour UX',
    secondaryKeywords: ['interactive floor plan interface', 'property showcase design', 'luxury real estate UX', 'immersive listing UI'],
    searchIntent: 'How-To Guide',
    internalLinkTarget: '/services/ui-ux-design',
  },

  // 6. Branding & Creative Design
  {
    serviceId: 'branding-creative',
    industry: 'Professional and B2B Services',
    market: 'US',
    format: 'strategic-insights',
    title: 'Rebranding a Legacy B2B Firm: Brand Architecture, Identity, and Rollout Strategy',
    slug: 'rebranding-legacy-b2b-firm-strategy',
    primaryKeyword: 'B2B firm rebranding strategy',
    secondaryKeywords: ['corporate brand repositioning', 'B2B brand architecture', 'modern visual identity system', 'brand migration guidelines'],
    searchIntent: 'Strategic Insights',
    internalLinkTarget: '/services/branding',
  },
  {
    serviceId: 'branding-creative',
    industry: 'Ecommerce',
    market: 'UK',
    format: 'problem-solving',
    title: 'Building a Cohesive DTC Brand Identity Across Packaging, Web, and Unboxing',
    slug: 'building-cohesive-dtc-brand-identity',
    primaryKeyword: 'DTC brand identity design',
    secondaryKeywords: ['ecommerce unboxing experience', 'sustainable packaging design', 'brand guidelines DTC', 'visual brand consistency'],
    searchIntent: 'Problem-Solving',
    internalLinkTarget: '/services/branding',
  },
  {
    serviceId: 'branding-creative',
    industry: 'Dental and Healthcare',
    market: 'US',
    format: 'how-to-guide',
    title: 'Designing Trustworthy Healthcare Brand Identity Systems: Colors, Fonts, and Imagery',
    slug: 'trustworthy-healthcare-brand-identity-design',
    primaryKeyword: 'healthcare brand identity design',
    secondaryKeywords: ['medical clinic branding', 'healthcare color psychology', 'trust-building visual design', 'dental brand identity guidelines'],
    searchIntent: 'How-To Guide',
    internalLinkTarget: '/services/branding',
  },
  {
    serviceId: 'branding-creative',
    industry: 'Real Estate',
    market: 'India',
    format: 'strategic-insights',
    title: 'Luxury Real Estate Development Branding: From Master Plan to Sales Gallery',
    slug: 'luxury-real-estate-development-branding',
    primaryKeyword: 'luxury real estate branding strategy',
    secondaryKeywords: ['property brand naming', 'real estate sales gallery branding', 'architectural visual identity', 'high-end real estate marketing collateral'],
    searchIntent: 'Strategic Insights',
    internalLinkTarget: '/services/branding',
  },
];

/**
 * Load topic history from disk
 */
export function loadTopicHistory() {
  if (fs.existsSync(TOPIC_HISTORY_PATH)) {
    try {
      const data = fs.readFileSync(TOPIC_HISTORY_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      // Support array or object format
      if (Array.isArray(parsed)) {
        return { version: '1.0.0', topics: parsed };
      }
      return parsed;
    } catch (e) {
      console.warn(`[topic-intelligence] Warning: Could not parse topic history: ${e.message}`);
    }
  }
  return { version: '1.0.0', topics: [] };
}

/**
 * Save updated topic history to disk
 */
export function saveTopicHistory(history) {
  fs.writeFileSync(TOPIC_HISTORY_PATH, JSON.stringify(history, null, 2), 'utf-8');
}

/**
 * Check if a candidate topic collides with history
 */
export function isDuplicateOrCannibalizing(candidate, historyTopics) {
  const normSlug = candidate.slug.toLowerCase().trim();
  const normTitle = candidate.title.toLowerCase().trim();
  const normKw = candidate.primaryKeyword.toLowerCase().trim();

  for (const item of historyTopics) {
    if (item.slug && item.slug.toLowerCase().trim() === normSlug) {
      return { duplicate: true, reason: `Slug conflict: "${normSlug}" matches existing article ${item.id}` };
    }
    if (item.title && item.title.toLowerCase().trim() === normTitle) {
      return { duplicate: true, reason: `Title conflict: "${normTitle}" matches existing article ${item.id}` };
    }
    if (item.primaryKeyword && item.primaryKeyword.toLowerCase().trim() === normKw) {
      return { duplicate: true, reason: `Primary keyword conflict: "${normKw}" already targeted in article ${item.id}` };
    }
  }

  return { duplicate: false };
}

/**
 * Select N intelligent topics rotating across distinct services and formats
 */
export function selectDailyTopics(count = 5) {
  const history = loadTopicHistory();
  const historyTopics = history.topics || [];

  // Filter matrix candidates that haven't been published yet
  const eligibleCandidates = TOPIC_MATRIX.filter(c => {
    const check = isDuplicateOrCannibalizing(c, historyTopics);
    return !check.duplicate;
  });

  if (eligibleCandidates.length < count) {
    console.warn(`[topic-intelligence] Matrix pool has only ${eligibleCandidates.length} unvisited topics left.`);
  }

  // Pick topics ensuring service diversity
  const selected = [];
  const usedServices = new Set();
  const usedFormats = new Set();

  // First pass: try to pick 1 per unique service
  for (const candidate of eligibleCandidates) {
    if (selected.length >= count) break;
    if (!usedServices.has(candidate.serviceId)) {
      selected.push(candidate);
      usedServices.add(candidate.serviceId);
      usedFormats.add(candidate.format);
    }
  }

  // Second pass: fill up to count if needed
  if (selected.length < count) {
    for (const candidate of eligibleCandidates) {
      if (selected.length >= count) break;
      if (!selected.some(s => s.slug === candidate.slug)) {
        selected.push(candidate);
      }
    }
  }

  return selected;
}
