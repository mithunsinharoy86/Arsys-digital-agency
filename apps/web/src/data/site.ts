export const images = {
  property: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  dental: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  commerce: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  webDevCorporate: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  webDevDashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  webDevResponsive: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  seoAudit: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  digitalMarketing: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
  aiAutomation: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  uiUxDesign: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
  brandingIdentity: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
  ecommerceStore: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
  socialMedia: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
  contentStrategy: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  realEstateLuxury: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  realEstateEstateAgency: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  realEstateCommercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  dentalAesthetic: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  dentalOrthodontics: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
  dentalImplantology: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  ecommerceFashion: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
  ecommerceLifestyle: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
  ecommerceWellness: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
  legalCorporate: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  consultingAdvisory: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  accountingTax: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
};
export type ProjectShowcase = {
  id: string;
  title: string;
  conceptType?: string;
  client?: string;
  category: string;
  badge: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string; detail?: string }[];
  features: string[];
  liveDemoNote?: string;
};
export type Offering = {
  slug: string;
  name: string;
  label: string;
  title: string;
  summary: string;
  metaTitle?: string;
  metaDescription?: string;
  problemTitle?: string;
  approachTitle?: string;
  deliverablesTitle?: string;
  color: string;
  visual: string;
  image?: string;
  problem: string;
  approach: string;
  deliverables: string[];
  outcomes: string[];
  questions: { q: string; a: string }[];
  techStack?: { category: string; description?: string; items?: string[] }[];
  milestones?: { phase: string; title: string; timeline: string; description: string }[];
  complianceGuarantees?: string[];
  metrics?: { label: string; value: string; detail: string }[];
  projects?: ProjectShowcase[];
};
export const services: Offering[] = [
  {
    slug: 'website-development',
    name: 'Website Development',
    label: 'BESPOKE ENGINEERING & CONVERSION ARCHITECTURE',
    title: 'High-Performance Websites Engineered to Convert & Scale.',
    summary: 'Fast, accessible, and conversion-focused business websites designed for US & UK brands. We build sub-second loading digital experiences with clean code, modern UX, and 100% intellectual property transfer.',
    color: 'cyan',
    visual: 'website',
    problem: 'Most corporate websites underperform because they rely on bloated, slow templates that confuse visitors, drag down Google Lighthouse scores, and obscure the core value proposition. When mobile users experience 3+ second page lag, bounce rates exceed 53%, resulting in lost commercial opportunities and wasted advertising spend.',
    approach: 'We engineer websites around your prospective customer\'s exact buying journey. Combining modern frameworks (React, Vite, Next.js, and headless architectures) with rigorous conversion copywriting and WCAG 2.1 AA accessibility, every page is optimized for speed, clarity, and enquiry generation. We never use restrictive page builders or lock you into proprietary hosting.',
    deliverables: [
      'Conversion-Focused Information Architecture & Sitemap Strategy',
      'Custom UI/UX Wireframing & High-Fidelity Interactive Prototypes',
      'Clean-Code Full-Stack Development',
      'Sub-Second Core Web Vitals Optimization',
      'WCAG 2.1 AA Accessibility & Cross-Browser Responsive Testing',
      'GDPR & CCPA Compliant Privacy Notice & Cookie Consent Integration',
      'Technical On-Page SEO',
      'Full Source Code Handover, Documentation & 30-Day Defect Warranty',
    ],
    outcomes: [
      'Sub-second mobile and desktop load speeds that retain high-intent visitors',
      'Measurable increase in qualified consultation inquiries and conversion rates',
      'Full legal ownership of custom codebase and visual assets (zero vendor lock-in)',
      'Bulletproof technical foundation compliant with UK/EU GDPR and US privacy laws',
    ],
    questions: [
      {
        q: 'Can you redesign an existing website without losing current Google search rankings?',
        a: 'Yes. We perform a comprehensive pre-migration SEO audit, mapping all existing URLs, metadata, and high-ranking keywords. We implement strict 301 redirect maps, preserve canonical tags, and audit Google Search Console post-launch to ensure zero organic search visibility loss.',
      },
      {
        q: 'Which platform or technology stack do you recommend for our project?',
        a: 'We evaluate your team\'s internal workflow and growth goals. For speed-critical B2B platforms and SaaS, we build with modern React/TypeScript architectures. For editorial content teams requiring daily non-technical publishing, we implement headless WordPress or structured CMS platforms with custom-engineered themes.',
      },
      {
        q: 'How long does a custom business website project typically take?',
        a: 'A focused commercial business website typically launches in 4 to 6 weeks from kick-off to deployment. We work in transparent, two-week milestones with live staging previews so you have full visibility into progress at every phase.',
      },
      {
        q: 'Who owns the website code and design files after completion?',
        a: 'You own 100% of all bespoke design files, creative assets, and custom source code upon settlement of the final project milestone. We provide complete Git repository access, deployment guides, and admin credentials with zero ongoing agency license fees.',
      },
      {
        q: 'What kind of post-launch warranty and technical support do you offer?',
        a: 'Every website build includes our 30-day post-launch warranty, covering defect resolution and performance fine-tuning. Following handover, we offer flexible monthly maintenance retainers for security monitoring, content updates, and ongoing conversion rate optimization.',
      },
    ],
    techStack: [
      {
        category: 'Frontend & Architecture',
        description: 'Clean-code, component-driven interfaces engineered for speed, responsive fluidity, and zero bloated page builder scripts.',
      },
      {
        category: 'CMS & Backend Options',
        description: 'Flexible, decoupled content management empowering your marketing team with intuitive editing and air-gapped security.',
      },
      {
        category: 'Speed & Infrastructure',
        description: 'Global edge distribution, modern media pipelines, and sub-second server rendering for instant page transitions worldwide.',
      },
      {
        category: 'Compliance & Security',
        description: 'Engineered from day one to satisfy WCAG 2.1 AA accessibility guidelines, UK/EU GDPR consent, and US data protection standards.',
      },
    ],
    milestones: [
      { phase: '01', title: 'Discovery & Technical Blueprint', timeline: 'Week 1', description: 'Customer journey mapping, competitor benchmark analysis, conversion architecture, and agreed scope of work.' },
      { phase: '02', title: 'High-Fidelity UI/UX & Design Systems', timeline: 'Week 2', description: 'Interactive desktop & mobile prototypes, brand visual alignment, typography scales, and client design sign-off.' },
      { phase: '03', title: 'Full-Stack Development & Integration', timeline: 'Weeks 3-4', description: 'Clean modular coding, CMS wiring, custom animations, API integrations, and staging environment review.' },
      { phase: '04', title: 'QA, Speed Benchmarking & Compliance Audit', timeline: 'Week 5', description: 'Cross-device testing, Core Web Vitals audit (Lighthouse 90+ target), accessibility review, and SEO redirect verification.' },
      { phase: '05', title: 'Deployment, Handover & 30-Day Warranty', timeline: 'Week 6', description: 'Zero-downtime DNS cutover, team training session, full IP source code transfer, and 30-day bug warranty launch.' },
    ],
    metrics: [
      { label: 'Target Load Speed', value: '< 1.2s Target', detail: 'Sub-second LCP benchmark on real-world mobile 4G networks' },
      { label: 'Accessibility Standard', value: 'WCAG 2.1 AA', detail: 'High-contrast, keyboard-navigable semantic architecture' },
      { label: 'Code Ownership', value: '100%', detail: 'Complete intellectual property assignment upon milestone completion' },
      { label: 'Post-Launch Warranty', value: '30 Days', detail: 'Dedicated engineering support to guarantee defect-free operation' },
    ],
    complianceGuarantees: [
      'WCAG 2.1 AA Accessible (Accessible color contrast, keyboard navigable, screen-reader verified)',
      'UK & EU GDPR Ready (Explicit consent, cookie banner, data minimization)',
      'US CCPA/CPRA Compliant (Notice at collection, no selling of consumer data)',
      '100% IP Code Ownership Transfer on final milestone payment',
      'Zero Bloatware or restrictive proprietary page builders',
    ],
    projects: [
      {
        id: 'nexus-architecture',
        title: 'Enterprise Digital Architecture Blueprint',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Enterprise Digital Architecture',
        badge: 'Concept Project',
        summary: 'High-performance enterprise web application concept engineered with React, Next.js, and edge distribution.',
        description: 'Designed to demonstrate sub-second global page loads, modular component architecture, and multi-region edge delivery for complex corporate platforms.',
        image: images.webDevCorporate,
        tags: ['Next.js SSR', 'TypeScript', 'Edge CDN', 'Modular Architecture'],
        metrics: [
          { label: 'Target Latency', value: '< 200ms Target', detail: 'Edge-distributed global routing' },
          { label: 'LCP Benchmark', value: '< 1.2s Target', detail: 'Sub-second mobile rendering benchmark' },
          { label: 'UI Standard', value: 'WCAG 2.1 AA', detail: 'Semantic HTML and keyboard navigation' }
        ],
        features: [
          'Modular React Server Component architecture with instant page transitions',
          'Enterprise Single Sign-On (SSO) and role-based client dashboard access',
          'Interactive architectural canvas and clean responsive grid',
          'Sub-second Core Web Vitals validated across 50+ global edge locations'
        ],
        liveDemoNote: 'Concept blueprint demonstrating enterprise full-stack web engineering.',
      },
      {
        id: 'apex-telemetry',
        title: 'Real-Time SaaS Telemetry & Operations Dashboard',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Real-Time SaaS Platform',
        badge: 'Concept Project',
        summary: 'Reactive dashboard interface concept for complex data visualization and real-time operations.',
        description: 'Demonstrates responsive charting, zero-contention event loops, and fluid 60fps data updates across desktop and tablet viewports.',
        image: images.webDevDashboard,
        tags: ['React 19', 'Tailwind CSS', 'WebSockets', 'Data Visualization'],
        metrics: [
          { label: 'Interface Target', value: '60 fps Target', detail: 'Smooth canvas and SVG rendering' },
          { label: 'Update Latency', value: '< 50ms Target', detail: 'Real-time WebSocket event pipeline' },
          { label: 'Accessibility', value: 'High Contrast', detail: 'Optimized dark & light telemetry palette' }
        ],
        features: [
          'Virtualized lists for high-density tabular data',
          'Granular component-level memoization',
          'Modular state management architecture',
          'Exportable CSV and JSON reporting pipelines'
        ],
        liveDemoNote: 'Concept blueprint demonstrating high-concurrency SaaS dashboard design.',
      },
      {
        id: 'aether-responsive',
        title: 'Cross-Device Responsive Financial Suite',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Cross-Device Responsive Experience',
        badge: 'Concept Project',
        summary: 'High-precision responsive interface concept designed for wealth management and fintech tools.',
        description: 'Illustrates fluid typography scaling, touch-friendly touch targets, and accessible data tables across mobile, tablet, and ultra-wide displays.',
        image: images.webDevResponsive,
        tags: ['Responsive Web', 'Design Systems', 'CSS Grid', 'Sub-Second UX'],
        metrics: [
          { label: 'Viewport Support', value: '320px - 4K', detail: 'Continuous fluid typography scaling' },
          { label: 'Input Latency', value: '< 16ms Target', detail: 'Frictionless touch and keyboard input' },
          { label: 'Data Security', value: 'Air-Gapped', detail: 'Zero third-party tracking scripts' }
        ],
        features: [
          'Adaptive layout grid system for varied form factors',
          'Strict WCAG color contrast validation',
          'Client-side data masking and security hardening',
          'Offline caching support with service workers'
        ],
        liveDemoNote: 'Concept blueprint demonstrating cross-device responsive UI engineering.',
      },
    ],
  },
  {
    slug: 'seo',
    name: 'Search Engine Optimisation',
    metaTitle: 'Technical SEO & AI Search (GEO) Services | Klyro Works',
    metaDescription: 'Technical SEO, Schema entity mapping, and AI Search (GEO) strategies for UK & US businesses. Clean code, zero black-hat risks, and transparent reporting.',
    label: 'TECHNICAL, ON-PAGE & LOCAL VISIBILITY',
    title: 'Technical SEO & AI Search Visibility Built on Commercial Intent.',
    problemTitle: 'The Search Bottlenecks Stalling Organic Inquiries',
    approachTitle: 'Engineered Search: Technical Health Meets Buyer Psychology',
    deliverablesTitle: 'Technical SEO Scope & Guaranteed Deliverables',
    summary: 'High-impact technical SEO, high-intent keyword mapping, and transparent local search strategies for US and UK businesses. We resolve crawl bottlenecks, structure data with Schema.org, and drive qualified consultation opportunities with zero black-hat risks.',
    color: 'lime',
    visual: 'analytics',
    image: images.seoAudit,
    problem: 'Most businesses waste months of budget chasing vanity keyword rankings that drive zero commercial enquiries. Search engines reward authoritative, fast, and helpful websites, but legacy SEO agencies frequently obscure their work with opaque link-building schemes, automated low-quality blog posts, and vague monthly reports. When technical crawl barriers, duplicate URL parameters, and poor Core Web Vitals go unaddressed, organic discovery stalls and high-intent prospects land on your competitors’ pages.',
    approach: 'We treat SEO as modern software engineering and customer psychology. We conduct exhaustive technical crawls with Screaming Frog and Sitebulb to eliminate indexation bloat, map structured data schemas (JSON-LD) so AI engines and Google accurately comprehend your entities, and align keyword research strictly with high-converting commercial intent. Every optimization is documented, tracked in Google Search Console, and backed by ethical, white-hat principles aligned with Google’s Search Essentials and UK/US advertising guidelines.',
    deliverables: [
      'Comprehensive Technical Architecture & Indexation Audit: Deep crawl identifying crawl loops, 301 chains, canonical conflicts, and orphaned URLs.',
      'High-Intent Commercial Keyword Intelligence: Targeting decision-stage queries with verified commercial intent rather than vanity traffic.',
      'On-Page Semantic Optimization: Clean heading hierarchies (H1-H3), keyword density balancing, and meta tag refactoring.',
      'Core Web Vitals & Page Experience Remediation: Sub-second LCP, minimal CLS, and instant responsiveness to satisfy Google page experience signals.',
      'Local Google Business Profile & Citation Management: Consistent NAP verification, Google Business Profile optimization, and local entity signals.',
      'Internal Linking Architecture Overhaul: Hub-and-spoke topic clustering that distributes link equity directly to high-margin service pages.',
      'Search Intent Service Page Copywriting: Authoritative, E-E-A-T aligned copy engineered to convert organic visitors into consultations.',
      'Automated Looker Studio Performance Dashboards: Live Google Search Console and GA4 tracking with zero proprietary agency lock-in.',
    ],
    outcomes: [
      'Elimination of critical crawl errors, duplicate parameters, and indexation bottlenecks',
      'Top-of-page visibility for high-intent commercial keywords that drive qualified customer inquiries',
      'Enhanced SERP real estate through rich snippet Schema markup (FAQs, Services, Organization)',
      '100% transparent live tracking in Google Search Console with zero proprietary lock-in',
    ],
    techStack: [
      { category: 'Technical Crawl & Diagnostics', items: ['Screaming Frog SEO Spider', 'Sitebulb Enterprise', 'Google Search Console', 'Log File Analysis'] },
      { category: 'Search Intelligence & Intent', items: ['Ahrefs Advanced', 'Semrush Commercial Gap', 'Google Trends', 'Search Intent Clustering'] },
      { category: 'Structured Data & Semantics', items: ['Schema.org JSON-LD', 'Rich Results Testing', 'Semantic HTML5', 'OpenGraph Protocol'] },
      { category: 'Analytics & Reporting', items: ['Google Analytics 4 (Cookieless Ready)', 'Looker Studio Live Dashboards', 'Google Search Console API', 'Rank Tracking Intelligence'] },
    ],
    milestones: [
      { phase: '01', title: 'Technical Crawl & Baseline Diagnostic', timeline: 'Week 1', description: 'Deep crawl across desktop and mobile user agents, indexation barrier discovery, server log analysis, and baseline Search Console audit.' },
      { phase: '02', title: 'Intent Keyword Mapping & Information Architecture', timeline: 'Week 2', description: 'Commercial intent keyword clustering, content gap identification against top US/UK competitors, and URL silo structure blueprint.' },
      { phase: '03', title: 'Technical Remediation & Schema.org Implementation', timeline: 'Weeks 3-4', description: 'Fixing canonical anomalies, resolving redirect chains, deploying JSON-LD structured data, and optimizing Core Web Vitals.' },
      { phase: '04', title: 'On-Page Optimization & High-Intent Copy Refinement', timeline: 'Week 5', description: 'Rewriting key service page meta titles, semantic headings, contextual internal linking, and E-E-A-T trust signals.' },
      { phase: '05', title: 'Reporting Handover & Ongoing Sprint Iteration', timeline: 'Week 6+', description: 'Delivery of live Looker Studio dashboard, Search Console performance verification, and prioritized quarterly content roadmap.' },
    ],
    metrics: [
      { label: 'Technical Crawl Health', value: '98%+', detail: 'Zero critical 4xx/5xx errors, redirect loops, or orphaned priority pages' },
      { label: 'Schema Validation', value: '100%', detail: 'Zero warning JSON-LD structured data validated via Google Rich Results' },
      { label: 'Reporting Transparency', value: '100%', detail: 'Direct access to raw Google Search Console and analytics data' },
      { label: 'Strategy Horizon', value: '4-6 Wks', detail: 'Rapid technical sprint deployment followed by structured monthly growth' },
    ],
    complianceGuarantees: [
      'Strict White-Hat Practices Only (Zero dangerous Private Blog Networks, link purchasing, or cloaking)',
      'FTC & UK CAP Code Compliant (Honest reporting with zero misleading or fabricated ranking guarantees)',
      'Google Search Essentials (Webmaster Guidelines) Strict Adherence',
      'Complete Client Ownership of All Keyword Data, Content Assets, and Looker Studio Dashboards',
      'Dual US & UK Entity Contracts with Defined Statements of Work and Milestone Approvals',
    ],
    questions: [
      {
        q: 'Do you guarantee #1 rankings on Google?',
        a: 'No ethical or compliant agency can guarantee a #1 ranking. Google’s proprietary ranking algorithms change hundreds of times per year, and third-party search results are outside any agency’s direct control. In strict compliance with US Federal Trade Commission (FTC) guidelines and the UK Advertising Standards Authority (ASA/CAP Code), we do not make unsubstantiated ranking promises. Instead, we guarantee rigorous technical compliance, white-hat methodology, and measurable visibility growth.',
      },
      {
        q: 'How long does it typically take to see measurable organic search improvements?',
        a: 'While technical fixes (such as resolving broken redirects, robots.txt blocks, and indexing errors) can result in improvements within 2 to 4 weeks, strategic keyword rank growth typically requires 3 to 6 months of sustained technical health and content authority. We provide real-time Google Search Console tracking so you observe crawl and impression trends from week one.',
      },
      {
        q: 'How do you handle Local SEO for businesses targeting specific cities in the US or UK?',
        a: 'We optimize your Google Business Profile (GBP), ensure strict NAP (Name, Address, Phone) consistency across verified regional directories, and implement localized Schema.org markup. For multi-location businesses, we engineer distinct, valuable location landing pages with unique localized service content, strictly avoiding doorway pages or duplicate city templates that violate Google guidelines.',
      },
      {
        q: 'Will you need access to our website source code or CMS?',
        a: 'Yes. Effective technical SEO requires access to your CMS (e.g. WordPress, Webflow, Next.js repository) and Google Search Console. We can either deploy technical fixes directly through your team’s established Git/staging workflow or provide detailed, annotated pull requests and engineering tickets for your internal developers.',
      },
      {
        q: 'Who owns the research, keyword models, and optimized content?',
        a: 'You own 100% of all keyword intelligence databases, competitive research files, Schema code, Looker Studio dashboards, and written copy produced during the engagement upon settlement of milestone invoices. We do not retain proprietary rights or lock you into agency-owned software.',
      },
    ],
    projects: [
      {
        id: 'enterprise-technical-seo-blueprint',
        title: 'Enterprise Technical SEO & Indexation Architecture',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Enterprise Technical Architecture',
        badge: 'Concept Project',
        summary: 'Large-scale technical search architecture concept optimizing crawl budget and schema graph hierarchy.',
        description: 'Illustrates structural faceted navigation, canonical mapping, and automated sitemap generation for directories with 50,000+ indexed URLs.',
        image: images.seoAudit,
        tags: ['Technical Audit', 'Schema Graph', 'Crawl Budget', 'Edge SSR'],
        metrics: [
          { label: 'Crawl Hygiene', value: 'Zero Loops', detail: 'Optimized canonical and redirect paths' },
          { label: 'Schema Depth', value: 'Nested Graphs', detail: 'Organization, Service, FAQ JSON-LD' },
          { label: 'Edge Render', value: 'SSR HTML', detail: 'Pre-rendered static HTML for bot discovery' }
        ],
        features: [
          'Comprehensive faceted URL canonicalization strategy',
          'Automated XML sitemap splitting and validation',
          'Clean breadcrumb and internal link graph taxonomy',
          'Google Search Console indexing and coverage monitoring'
        ],
        liveDemoNote: 'Concept blueprint demonstrating large-scale technical SEO indexation architecture.',
      },
      {
        id: 'local-search-architecture-concept',
        title: 'Multi-Location Commercial Local Search Engine',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Multi-Location Commercial SEO',
        badge: 'Concept Project',
        summary: 'Structured local SEO architecture concept designed for multi-branch regional practices.',
        description: 'Demonstrates hyper-local landing page hierarchies, consistent NAP schema markup, and Google Business Profile integration blueprints.',
        image: images.webDevDashboard,
        tags: ['Google 3-Pack', 'LocalBusiness Schema', 'Citation Sync', 'Multi-City'],
        metrics: [
          { label: 'Entity Mapping', value: 'LocalBusiness', detail: 'Coordinate & postal JSON-LD data' },
          { label: 'Page Structure', value: 'Hub & Spoke', detail: 'Regional and city hierarchical silo' },
          { label: 'Mobile UX', value: '1-Tap Actions', detail: 'Direct call and direction triggers' }
        ],
        features: [
          'Hierarchical hub-and-spoke geographic landing page architecture',
          'Structured LocalBusiness and GeoCoordinates JSON-LD',
          'Uniform NAP consistency across citations',
          'Transparent tracking of localized inquiry actions'
        ],
        liveDemoNote: 'Concept blueprint demonstrating multi-location local search architecture.',
      },
      {
        id: 'ai-geo-search-optimization-concept',
        title: 'Generative AI Search & Answer Engine Optimization (GEO)',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'AI Search Optimization (GEO)',
        badge: 'Concept Project',
        summary: 'Information-dense content framework concept engineered for AI Overviews and answer engine extraction.',
        description: 'Demonstrates entity consensus building, concise direct answer blocks, and factual citation formatting for modern generative search engines.',
        image: images.webDevCorporate,
        tags: ['GEO Strategy', 'LLM Knowledge Graph', 'Information Gain', 'Entity Verification'],
        metrics: [
          { label: 'Content Density', value: 'High Gain', detail: 'Unambiguous factual passage formatting' },
          { label: 'Knowledge Graph', value: 'Verified Nodes', detail: 'Linked entity references in schema' },
          { label: 'Bot Crawl Access', value: 'Full SSR', detail: 'Zero JavaScript client hydration delays' }
        ],
        features: [
          'Passage-level semantic answer formatting',
          'Structured entity disambiguation with Wikidata & Schema',
          'E-E-A-T credentials and author verification signals',
          'Optimized robots.txt rules for AI crawler access'
        ],
        liveDemoNote: 'Concept blueprint demonstrating Generative Engine Optimization (GEO).',
      },
    ],
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing & Paid Search',
    label: 'COMMERCIAL PAID SEARCH & CONVERSION OPTIMIZATION',
    title: 'High-Intent PPC & Paid Campaigns Built for Revenue, Not Wasted Clicks.',
    summary: 'Data-driven Google Ads management, Performance Max architecture, and landing page conversion rate optimization for UK and US businesses. We eliminate wasted ad spend, sculpt negative keywords, and connect media investment directly to qualified commercial pipeline.',
    color: 'orange',
    visual: 'analytics',
    image: images.digitalMarketing,
    problem: 'Paid search budgets frequently disappear into broad match keywords, automated Google recommendations that serve the ad network’s interests, and generic landing pages with high bounce rates. Without rigorous negative keyword filtering, server-side tracking, and multi-variant landing page testing, businesses spend thousands of dollars or pounds acquiring unqualified clicks while failing to track cost-per-qualified-acquisition.',
    approach: 'We treat paid search as scientific demand capture. Rather than spraying budget across vague keywords, we align commercial intent with hyper-specific ad creative and sub-second landing pages designed around buying psychology. We implement server-side Google Tag Manager (GTM) and GA4 Enhanced Conversions to measure real business actions—consultations, quote requests, and phone calls—while maintaining strict compliance with FTC and UK CAP Code advertising truthfulness.',
    deliverables: [
      'Comprehensive Google Ads Account Architecture & Audit',
      'High-Intent Commercial Keyword Intelligence & Negative Keyword Sculpting Lists',
      'Sub-Second Conversion Landing Page UX Design & Responsive Implementation',
      'Server-Side Google Tag Manager & GA4 Enhanced Conversions Tracking',
      'Multi-Variant A/B Ad Copy & Responsive Search Ad Creative Testing',
      'Target CPA / Target ROAS Algorithmic Bid Calibration & Portfolio Bidding Strategy',
      'Competitor Ad Intelligence & Impression Share Optimization',
      'Automated Looker Studio Live ROI Dashboards & Bi-Weekly Strategic Sprint Reviews',
    ],
    outcomes: [
      'Significant reduction in cost-per-qualified-acquisition (CPA) by eliminating wasteful search queries',
      'Higher Google Ads Quality Scores that lower cost-per-click (CPC) below industry averages',
      'Measurable increase in high-intent consultation requests from paid traffic landing experiences',
      '100% direct client ownership of your Google Ads account with zero proprietary media markups',
    ],
    techStack: [
      { category: 'Ad Networks & Platforms', items: ['Google Ads Search', 'Performance Max (PMax)', 'Microsoft Advertising', 'LinkedIn Campaign Manager'] },
      { category: 'Tracking & Measurement', items: ['Server-Side GTM', 'Google Analytics 4', 'Enhanced Conversions API', 'Looker Studio Dashboards'] },
      { category: 'CRO & Experience Testing', items: ['Microsoft Clarity', 'PostHog Session Intel', 'Hotjar Heatmaps', 'Lighthouse 95+ Pages'] },
      { category: 'Market Intelligence', items: ['Semrush Advertising Gap', 'SpyFu Competitor Intel', 'Google Keyword Planner', 'AdBeat Intelligence'] },
    ],
    milestones: [
      { phase: '01', title: 'Account Diagnostic & Search Term Audit', timeline: 'Week 1', description: 'Exhaustive audit of historic search queries, wasteful broad match bleed, conversion tracking accuracy, and competitor auction insights.' },
      { phase: '02', title: 'Intent Keyword Matrix & Negative Scrubbing', timeline: 'Week 2', description: 'Structuring tightly themed ad groups (STAGs), compiling robust master negative keyword lists, and establishing conversion goals.' },
      { phase: '03', title: 'Conversion Landing Page Build & Server-Side Tracking', timeline: 'Weeks 3-4', description: 'Engineering sub-second landing pages with conversion copywriting, server-side GTM tracking, and CRM webhook routing.' },
      { phase: '04', title: 'Campaign Deployment & Bid Calibration', timeline: 'Week 5', description: 'Launching structured campaigns under manual or Maximize Clicks bidding before transitioning to Smart Bidding with verified conversion data.' },
      { phase: '05', title: 'A/B Optimization & Quarterly Scaling Roadmap', timeline: 'Week 6+', description: 'Bi-weekly sprint iterations testing ad copy angles, landing page micro-copy, negative expansions, and budget reallocation.' },
    ],
    metrics: [
      { label: 'Target CPA Focus', value: 'Intent-Led', detail: 'Negative keyword sculpting to eliminate non-commercial waste' },
      { label: 'Landing Page Flow', value: 'Optimized', detail: 'Dedicated mobile-first commercial inquiry journeys' },
      { label: 'Account Transparency', value: '100%', detail: 'Direct billing with zero media markups' },
      { label: 'Reporting Cadence', value: 'Bi-Weekly', detail: 'Live Looker Studio dashboard and sprint reviews' },
    ],
    complianceGuarantees: [
      'Direct Media Account Billing (You pay Google/Microsoft directly; we never markup media spend)',
      'FTC & UK CAP Code Truth-in-Advertising strict compliance across all ad claims and offers',
      'GDPR & CCPA Compliant server-side cookieless conversion tracking with explicit consent handling',
      '100% Client Ownership of all ad campaigns, keywords, creative assets, and negative lists',
      'Zero long-term lock-in contracts; flexible month-to-month management retainers',
    ],
    questions: [
      {
        q: 'Do you charge a percentage of our advertising spend or a fixed management fee?',
        a: 'We operate on a transparent fixed monthly management tier based on account scope and complexity, not a percentage of ad spend. Percentage-of-spend models create a conflict of interest where agencies benefit from you spending more money. Our incentive is strictly to lower your cost-per-acquisition and maximize your return on ad spend (ROAS).',
      },
      {
        q: 'Who owns the Google Ads account and campaign data?',
        a: 'You own the account 100%. We configure and manage campaigns directly within your own Google Ads and Microsoft Advertising accounts. If our engagement ever concludes, you retain all campaign structures, keyword data, negative lists, and historical analytics with zero disruption.',
      },
      {
        q: 'How much ad spend should our business allocate each month?',
        a: 'Media budgets depend on your industry’s average cost-per-click and target market. For focused B2B service firms in the US or UK, we typically recommend a minimum starting ad spend of $2,000 / £1,500 per month to generate statistically significant conversion volume. Ad spend is paid directly to Google, completely separate from our agency management fee.',
      },
      {
        q: 'Do you build custom landing pages or send paid traffic to our main website?',
        a: 'Sending paid traffic to a general homepage usually results in high bounce rates and wasted budget. We engineer dedicated, distraction-free landing pages tailored to the exact search query and pain point of the ad, loading in under 1.2 seconds with clear trust signals and streamlined inquiry forms.',
      },
      {
        q: 'How do you measure lead quality and prevent spam form submissions?',
        a: 'We implement server-side honeypots, reCAPTCHA v3 invisible validation, and Google Tag Manager enhanced conversion validation. Furthermore, we integrate CRM offline conversion tracking (OCT) so Google’s bidding algorithms optimize for closed deals and qualified opportunities rather than raw, low-value form fills.',
      },
    ],
    projects: [
      {
        id: 'saas-acquisition-funnel-concept',
        title: 'Enterprise B2B SaaS Paid Acquisition Funnel',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'B2B Search & High-Intent PPC',
        badge: 'Concept Project',
        summary: 'High-intent search acquisition architecture concept designed for commercial software demos.',
        description: 'Demonstrates tightly targeted search query sculpting, single-keyword ad groups (SKAGs), and dedicated sub-second landing pages.',
        image: images.digitalMarketing,
        tags: ['Google Search Ads', 'LinkedIn B2B', 'Negative Sculpting', 'Landing Page UX'],
        metrics: [
          { label: 'Intent Filter', value: 'Commercial', detail: 'Shielded against negative information terms' },
          { label: 'Landing LCP', value: '< 1.0s Target', detail: 'Fast mobile landing page loading' },
          { label: 'Attribution', value: 'Server-Side', detail: 'Direct CRM deal stage synchronization' }
        ],
        features: [
          'Commercial-intent search term harvesting and negative sculpting',
          'Sub-second, distraction-free landing page architecture',
          'Offline conversion tracking linked to CRM milestones',
          'A/B tested value propositions and form field optimization'
        ],
        liveDemoNote: 'Concept blueprint demonstrating B2B search advertising architecture.',
      },
      {
        id: 'clinic-acquisition-funnel-concept',
        title: 'Healthcare Private Clinic Acquisition Engine',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Healthcare Paid Search',
        badge: 'Concept Project',
        summary: 'High-trust patient acquisition funnel concept engineered for private medical practices.',
        description: 'Demonstrates treatment-focused search campaigns, compliant privacy consent, and frictionless 3-step appointment booking flows.',
        image: images.webDevDashboard,
        tags: ['Google Health Ads', 'Call Tracking', 'GDPR/HIPAA', 'Local Booking'],
        metrics: [
          { label: 'Privacy Standard', value: 'HIPAA & GDPR', detail: 'Zero third-party pixel tracking on health data' },
          { label: 'Booking Flow', value: '3-Step UX', detail: 'Clear treatment and scheduling steps' },
          { label: 'Ad Relevance', value: 'High Alignment', detail: 'Direct symptom-to-solution page routing' }
        ],
        features: [
          'Strict compliance with healthcare advertising regulations',
          'Encrypted appointment inquiry forms with explicit consent',
          'Dynamic call tracking and scheduling synchronization',
          'Local radius geo-targeting tailored to clinic catchment areas'
        ],
        liveDemoNote: 'Concept blueprint demonstrating healthcare patient acquisition architecture.',
      },
      {
        id: 'b2b-industrial-ppc-blueprint',
        title: 'Industrial Equipment & B2B Lead Generation Funnel',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'High-Ticket Industrial Lead Gen',
        badge: 'Concept Project',
        summary: 'Precision inquiry pipeline concept designed for high-ticket manufacturing and equipment suppliers.',
        description: 'Demonstrates technical specification request funnels, multi-tier procurement forms, and automated lead routing for sales engineers.',
        image: images.webDevCorporate,
        tags: ['Industrial PPC', 'RFP Funnels', 'HubSpot Sync', 'High-Ticket B2B'],
        metrics: [
          { label: 'Form Logic', value: 'Multi-Tier', detail: 'Dynamic RFP requirement qualification' },
          { label: 'Page Speed', value: 'Sub-Second', detail: 'Immediate spec sheet PDF delivery' },
          { label: 'Routing', value: 'Automated CRM', detail: 'Direct territory-based sales assignment' }
        ],
        features: [
          'High-specification product teardowns and CAD download gates',
          'Multi-tiered procurement qualification forms',
          'Automated sales territory routing via CRM webhooks',
          'Transparent cost-per-qualified-inquiry analytics'
        ],
        liveDemoNote: 'Concept blueprint demonstrating industrial B2B lead generation architecture.',
      },
    ],
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation & Workflows',
    label: 'CONNECT. QUALIFY. AUTOMATE.',
    title: 'Practical Business AI & Automated Workflows that Eliminate Repetitive Admin.',
    summary: 'Tailored AI solutions, intelligent lead qualification engines, and connected CRM architectures for growing US and UK businesses. We streamline operations, eliminate data entry silos, and keep people in control of sensitive commercial decisions.',
    color: 'violet',
    visual: 'workflow',
    image: images.aiAutomation,
    problem: 'Fast-growing businesses waste hundreds of staff hours manually copying inquiry details between web forms, email threads, and CRMs. Traditional off-the-shelf automation tools often break silently when API schemas change, while generic AI chatbots hallucinate inaccurate answers and risk customer trust. When high-value leads wait hours or days for a response, conversion rates collapse and staff burn out on routine admin.',
    approach: 'We engineer practical, fail-safe AI automations around your team’s exact operational workflows. Using modern LLMs (OpenAI, Gemini, Claude) with strict JSON schema outputs and self-hosted microservices, we build reliable pipelines that qualify incoming inquiries, enrich customer context, and automate CRM routing. Every automation is built with clear human-in-the-loop escalation safeguards, comprehensive logging, and strict UK/EU GDPR data minimization.',
    deliverables: [
      'Operational Process Discovery & Workflow Architecture Blueprint',
      'Multi-Channel Website Lead Qualification & Context Enrichment Pipeline',
      'Bi-Directional CRM & ERP Synchronization',
      'Intelligent Customer Support Triage & Human Escalation Routing Engine',
      'Automated Document & Invoice Parsing Pipeline',
      'Instant Slack & Microsoft Teams Operational Alert Bot Integration',
      'Automated Calendar Appointment Scheduling & SMS Follow-Up Engine',
      'Complete Error-Handling Middleware, Webhook Fallback Queue & Team Training',
    ],
    outcomes: [
      'Elimination of manual inquiry qualification lag, enabling sub-2-minute response times',
      'Zero lost leads through local fallback queues and automatic retry mechanisms',
      'Safe, reliable AI deployment with zero hallucination risk and human escalation points',
      'Complete intellectual property ownership of custom automation code and middleware',
    ],
    techStack: [
      { category: 'AI Models & Structured APIs', items: ['OpenAI GPT-4o API', 'Google Gemini Pro 1.5', 'Anthropic Claude 3.5', 'Structured JSON Schemas'] },
      { category: 'Middleware & Orchestration', items: ['Node.js Microservices', 'n8n Enterprise (Self-Hosted)', 'Make / Webhooks', 'Docker Containers'] },
      { category: 'CRMs & Databases', items: ['HubSpot Enterprise API', 'Salesforce REST', 'Supabase PostgreSQL', 'PocketBase Edge'] },
      { category: 'Security & Reliability', items: ['256-bit AES Encryption', 'UK/EU GDPR Sanitizers', 'AWS Secrets Manager', 'Sentry Alerting'] },
    ],
    milestones: [
      { phase: '01', title: 'Workflow Mapping & Data Privacy Audit', timeline: 'Week 1', description: 'Reviewing current administrative handoffs, mapping data fields, identifying bottlenecks, and establishing data privacy boundaries.' },
      { phase: '02', title: 'Architecture Specification & Prompt Engineering', timeline: 'Week 2', description: 'Designing structured JSON input/output schemas, engineering strict system prompts with zero-hallucination rules, and sandboxing.' },
      { phase: '03', title: 'Integration Engineering & Webhook Pipeline', timeline: 'Weeks 3-4', description: 'Coding custom middleware, connecting CRM APIs, configuring retry queues, and wiring automated notifications.' },
      { phase: '04', title: 'Edge-Case Stress Testing & Human Escalation QA', timeline: 'Week 5', description: 'Testing corrupted inputs, ambiguous inquiries, API timeouts, and verifying that human alerts trigger seamlessly.' },
      { phase: '05', title: 'Production Rollout, Documentation & 30-Day Warranty', timeline: 'Week 6', description: 'Zero-downtime deployment, team video training, complete operational runbooks, and 30-day bug warranty launch.' },
    ],
    metrics: [
      { label: 'Lead Intake Target', value: '< 2 Mins Target', detail: 'Automated instant qualification and routing' },
      { label: 'Workflow Efficiency', value: 'Streamlined', detail: 'Elimination of manual repetitive data entry' },
      { label: 'Data Validation Rate', value: '100%', detail: 'Strict JSON schema parsing' },
      { label: 'System Reliability', value: 'Queue-Managed', detail: 'Local retry queues and automated failure alerts' },
    ],
    complianceGuarantees: [
      'Zero AI Model Training on Client Data (All API connections utilize enterprise zero-retention endpoints)',
      'Human-in-the-Loop Mandatory for all clinical, contractual, or sensitive commercial commitments',
      'UK & EU GDPR Ready (Automatic PII redaction and explicit consent handling before processing)',
      '100% Code & Middleware Ownership Handover with self-hosting capabilities',
      'Zero proprietary vendor lock-in; open-source and portable automation architectures',
    ],
    questions: [
      {
        q: 'Will AI automation replace our existing customer-facing team?',
        a: 'No. Our automations are engineered to empower your people, not replace them. We eliminate repetitive administrative chores—such as copying form fields into CRMs, drafting initial confirmation emails, or sorting spam inquiries—so your team can spend their time holding high-value conversations with qualified prospects.',
      },
      {
        q: 'How do you prevent the AI from hallucinating or giving inaccurate information?',
        a: 'We use strict Retrieval-Augmented Generation (RAG) and structured output validation (JSON schemas). The AI is explicitly constrained to reference only your verified company knowledge base and pricing sheets. If an inquiry falls outside approved parameters, the system automatically routes the query to a human team member with a summary note.',
      },
      {
        q: 'Is our proprietary business data used to train public AI models?',
        a: 'Never. We exclusively use commercial enterprise API tiers from providers like OpenAI, Google Cloud Vertex, and Anthropic. Under their commercial API terms of service, your data is never used to train public foundational models, is encrypted in transit and at rest, and complies with UK and EU GDPR standards.',
      },
      {
        q: 'Which CRM and software platforms can you connect to?',
        a: 'We connect with virtually any modern platform that provides an API or webhook interface, including HubSpot, Salesforce, Pipedrive, Zoho, Slack, Microsoft Teams, Google Workspace, Zapier, Make, and custom SQL/PostgreSQL databases. We can also build custom REST middleware for legacy systems.',
      },
      {
        q: 'What happens if a connected third-party tool experiences an API outage?',
        a: 'We build resilience into every architecture using local database queues and exponential backoff retry mechanisms. If a CRM or email service temporarily goes offline, our middleware securely buffers the inquiry and retries automatically once the service restores, alerting your team if issues persist.',
      },
    ],
    projects: [
      {
        id: 'logistics-workflow-triage-concept',
        title: 'Multi-Channel Inquiry Triage & Dispatch Automation',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Enterprise Workflow Automation',
        badge: 'Concept Project',
        summary: 'Intelligent lead classification and CRM dispatch workflow concept.',
        description: 'Illustrates webhook ingestion, LLM intent parsing, urgency scoring, and automated dispatch to Slack, HubSpot, or Salesforce.',
        image: images.aiAutomation,
        tags: ['LLM Extraction', 'Webhook Ingestion', 'CRM Dispatch', 'Human-in-the-Loop'],
        metrics: [
          { label: 'Triage Target', value: '< 60s Target', detail: 'Automated intent parsing and tag assignment' },
          { label: 'Human Control', value: 'Review Gate', detail: 'Manual override for edge case inquiries' },
          { label: 'Integration', value: 'REST & Webhooks', detail: 'Bi-directional CRM & notification mesh' }
        ],
        features: [
          'Multi-channel inquiry ingestion (web forms, emails, API calls)',
          'Deterministic rule validation with AI semantic parsing fallback',
          'Human review gateway for sensitive or high-value cases',
          'Full audit trail and error logging for operational safety'
        ],
        liveDemoNote: 'Concept blueprint demonstrating intelligent inquiry classification workflows.',
      },
      {
        id: 'wealth-intake-automation-concept',
        title: 'Client Onboarding & Automated KYC Intake Pipeline',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Financial Services Automation',
        badge: 'Concept Project',
        summary: 'Automated client intake and compliance document collection workflow concept.',
        description: 'Demonstrates secure customer intake forms, real-time schema validation, automated follow-up reminders, and encrypted storage routing.',
        image: images.webDevDashboard,
        tags: ['Secure Intake', 'Real-Time Validation', 'Encrypted Storage', 'Audit Logs'],
        metrics: [
          { label: 'Validation', value: 'Real-Time', detail: 'Immediate schema and format verification' },
          { label: 'Data Privacy', value: 'Encrypted', detail: 'End-to-end data encryption in transit' },
          { label: 'Handoff', value: 'Audit Logged', detail: 'Full compliance tracking at every step' }
        ],
        features: [
          'Step-by-step verified onboarding form progression',
          'Real-time address and financial schema checks',
          'Automated milestone status notifications via email',
          'Secure air-gapped document vault storage'
        ],
        liveDemoNote: 'Concept blueprint demonstrating secure automated client intake pipelines.',
      },
      {
        id: 'dental-appointment-sms-concept',
        title: 'Healthcare Patient Booking & Automated Reminder Engine',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Healthcare Practice Automation',
        badge: 'Concept Project',
        summary: 'Patient scheduling automation concept designed for clinical and dental appointments.',
        description: 'Illustrates 24/7 web booking synchronization with clinical practice management software, automated SMS confirmations, and reschedule flows.',
        image: images.team,
        tags: ['Practice Sync', 'Two-Way SMS', 'Calendar Lock', 'Explicit Opt-In'],
        metrics: [
          { label: 'Sync Target', value: 'Instant', detail: 'Calendar lock preventing double-bookings' },
          { label: 'Communication', value: 'Two-Way SMS', detail: 'Automated appointment confirmation pipeline' },
          { label: 'Consent', value: 'Explicit Opt-In', detail: 'Compliant communications preference center' }
        ],
        features: [
          'Real-time slot locking against clinical management schedules',
          'Two-way SMS appointment confirmations and cancellations',
          'Automated intake questionnaire delivery prior to arrival',
          'Granular consent management adhering to privacy requirements'
        ],
        liveDemoNote: 'Concept blueprint demonstrating clinical booking automation systems.',
      },
    ],
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design & Product Strategy',
    label: 'CLARITY AT EVERY CLICK · CONVERSION UX',
    title: 'Bespoke UI/UX Design Engineered for Human Clarity & Commercial Conversion.',
    summary: 'Human-centred digital product design, web application interfaces, and accessible design systems for ambitious UK and US brands. We turn complex user journeys into intuitive, high-converting digital experiences backed by WCAG 2.1 AA accessibility and rigorous usability testing.',
    color: 'cyan',
    visual: 'website',
    image: images.uiUxDesign,
    problem: 'Many digital products and business websites fail not because of technology, but because of confusing navigation, cognitive overload, and counter-intuitive user flows. When prospective customers cannot effortlessly find pricing, understand feature sets, or navigate checkouts on mobile screens, they abandon the journey. Cluttered interfaces, poor visual hierarchy, and inaccessible contrast ratios directly inflate customer acquisition costs.',
    approach: 'We design digital interfaces around real customer behaviour and conversion psychology. Beginning with qualitative user journey mapping and low-fidelity wireframing, we rapidly prototype, test with target users, and refine layouts in Figma. Our visual design language is clean, modern, and accessible, incorporating design tokens, component libraries, and detailed developer handoff specs that guarantee pixel-perfect production builds.',
    deliverables: [
      'Qualitative User Research, Personas & Customer Buying Journey Blueprints',
      'Information Architecture, Site Navigation & Core Flow Wireframing',
      'High-Fidelity Interactive Desktop & Mobile Prototypes in Figma',
      'Comprehensive Design System & Component Token Architecture',
      'WCAG 2.1 AA Accessibility & Color Contrast Compliance Verification',
      'Usability Testing Facilitation & Actionable User Friction Analysis Report',
      'Micro-Interaction, Hover State & Responsive Transition Specifications',
      'Complete Developer Handoff Package with Annotated CSS Specs & SVG Assets',
    ],
    outcomes: [
      'Substantial reduction in user drop-off and form abandonment across priority digital journeys',
      'A unified, polished visual identity that reinforces commercial credibility and brand value',
      '100% WCAG 2.1 AA accessibility compliance protecting against legal liability and expanding reach',
      'Significantly faster development cycles through reusable Figma component systems and tokens',
    ],
    techStack: [
      { category: 'Design & Prototyping', items: ['Figma Professional', 'FigJam User Flows', 'Interactive Component Variants', 'Auto-Layout 5.0'] },
      { category: 'Design Systems & Tokens', items: ['Tailwind CSS Tokens', 'Radix UI Primitives', 'Storybook Integration', 'Design Token JSON'] },
      { category: 'Usability & Research', items: ['Maze Usability Testing', 'Hotjar Heatmaps', 'Lookback User Interviews', 'UserTesting Platform'] },
      { category: 'Accessibility & QA', items: ['Stark Accessibility Suite', 'axe DevTools', 'WCAG 2.1 AA Checkers', 'Color Oracle Simulators'] },
    ],
    milestones: [
      { phase: '01', title: 'User Research & Journey Mapping', timeline: 'Week 1', description: 'Auditing existing user friction points, interviewing stakeholders, mapping customer journeys, and defining core UX objectives.' },
      { phase: '02', title: 'Information Architecture & Wireframes', timeline: 'Week 2', description: 'Developing sitemaps, low-fidelity wireframes, and structural layout options to validate core navigation before styling.' },
      { phase: '03', title: 'High-Fidelity UI Design & Prototyping', timeline: 'Weeks 3-4', description: 'Crafting responsive desktop and mobile screens, brand aesthetic application, typography scales, and interactive Figma components.' },
      { phase: '04', title: 'Usability Testing & Accessibility Audit', timeline: 'Week 5', description: 'Testing interactive prototypes with representative users, analyzing task completion rates, and verifying WCAG 2.1 AA contrast ratios.' },
      { phase: '05', title: 'Design System Tokenization & Developer Handoff', timeline: 'Week 6', description: 'Packaging component libraries, writing CSS/token implementation specs, conducting developer walkthroughs, and final asset transfer.' },
    ],
    metrics: [
      { label: 'Design System', value: 'Standardized', detail: 'Scalable design tokens and component libraries' },
      { label: 'Accessibility Standard', value: 'WCAG 2.1 AA', detail: 'High-contrast, keyboard-navigable interface design' },
      { label: 'Prototype Fidelity', value: 'Interactive', detail: 'Clickable desktop & mobile flows' },
      { label: 'Dev Handoff Standard', value: 'Production-Ready', detail: 'Standardized design tokens and clean developer specs' },
    ],
    complianceGuarantees: [
      'WCAG 2.1 AA Compliant (Strict 4.5:1 text contrast and 3:1 interface element contrast ratios)',
      '100% Client Ownership of all Figma files, design system components, prototypes, and vector assets',
      'Inclusive Design Best Practices adhering to UK Equality Act and US Section 508 / ADA standards',
      'Zero proprietary design locks; all assets exported in open, universally supported web formats',
      'Annotated developer handoff documentation guaranteeing accurate implementation',
    ],
    questions: [
      {
        q: 'Can you work alongside our existing internal development team?',
        a: 'Yes. We routinely collaborate with internal engineering teams. We build in Figma using modern auto-layout, design tokens, and clean component variants that mirror frontend frameworks like Tailwind CSS, React, and Vue. We provide complete CSS annotations, design tokens, and conduct live developer walkthroughs.',
      },
      {
        q: 'Do you conduct usability testing with actual users during the project?',
        a: 'Yes. In Phase 4, we test interactive prototypes using platforms like Maze or facilitated video interviews. We measure task completion rates, track heatmaps of user clicks, and identify navigation hesitation points before any code is written, ensuring final designs are battle-tested.',
      },
      {
        q: 'What is included in the Design System deliverable?',
        a: 'Our design system includes a comprehensive Figma component library: typography scales, responsive grid rules, brand color palettes (with accessible contrast scores), button states, form inputs, modal dialogs, navigation bars, and icon sets, organized with clear documentation for your developers.',
      },
      {
        q: 'How do you ensure the designs are fully accessible (WCAG 2.1 AA)?',
        a: 'Every interface is audited with Stark and automated contrast tools. We verify color contrast ratios, specify explicit focus indicators for keyboard navigation, provide screen-reader aria-label recommendations, and ensure tap targets on touch devices exceed the recommended 44x44 pixel minimum.',
      },
      {
        q: 'Who owns the Figma files and creative assets upon completion?',
        a: 'You own 100% of all Figma design files, component libraries, custom vector illustrations, and exported assets upon settlement of milestone invoices. We transfer primary Figma project ownership directly to your team’s account.',
      },
    ],
    projects: [
      {
        id: 'wealth-management-interface-concept',
        title: 'Enterprise Wealth Management Interface',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'FinTech Digital Product Design',
        badge: 'Concept Project',
        summary: 'High-trust financial platform design system concept with modular component tokens.',
        description: 'Demonstrates atomic design tokens in Figma, clear typography scales, and modular dashboard widgets for portfolio oversight.',
        image: images.uiUxDesign,
        tags: ['Figma Tokens', 'Atomic Design', 'WCAG AAA', 'Responsive UI'],
        metrics: [
          { label: 'Design Tokens', value: 'Figma Atomic', detail: 'Synchronized variables for code handoff' },
          { label: 'Contrast Ratio', value: 'WCAG AAA', detail: 'Verified 7:1 ratio on critical financial data' },
          { label: 'Component Set', value: '40+ Modular', detail: 'Reusable interactive dashboard elements' }
        ],
        features: [
          'Comprehensive design token library (colors, spacing, elevations)',
          'Clear information hierarchy optimized for complex financial figures',
          'Reusable chart and table components designed for data density',
          'Strict accessibility compliance for all interactive controls'
        ],
        liveDemoNote: 'Concept blueprint demonstrating fintech design systems.',
      },
      {
        id: 'healthcare-portal-ux-concept',
        title: 'Clinical Healthcare Consultation Experience',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Healthcare Digital Experience',
        badge: 'Concept Project',
        summary: 'Patient-centered consultation interface concept prioritizing clarity, accessibility, and calm aesthetics.',
        description: 'Features large-type readability, clear visual symptom guides, and an anxiety-reducing step-by-step appointment journey.',
        image: images.webDevResponsive,
        tags: ['Accessible UX', 'Patient Journey', 'WCAG 2.1 AA', 'Calm Design'],
        metrics: [
          { label: 'Accessibility', value: 'WCAG 2.1 AA', detail: 'Tested for screen readers and high contrast' },
          { label: 'Touch Targets', value: '48px Minimum', detail: 'Accessible tap targets on mobile viewports' },
          { label: 'Form Clarity', value: 'Inline Hints', detail: 'Clear guidance reducing patient error' }
        ],
        features: [
          'Calm, distraction-free visual environment for patient intake',
          'Accessible 48px minimum touch targets for all action buttons',
          'Clear error recovery and reassuring confirmation feedback',
          'Tested for intuitive navigation across diverse age demographics'
        ],
        liveDemoNote: 'Concept blueprint demonstrating accessible healthcare UX design.',
      },
      {
        id: 'enterprise-saas-ux-blueprint',
        title: 'B2B SaaS Workflow Configuration Suite',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'B2B SaaS Interface Design',
        badge: 'Concept Project',
        summary: 'Complex configuration UI concept for enterprise software settings and permission trees.',
        description: 'Demonstrates drag-and-drop workflow builders, visual rule builders, and clear state indicators for non-technical administrators.',
        image: images.webDevCorporate,
        tags: ['Enterprise UX', 'Workflow Builder', 'Interactive Prototype', 'Design Tokens'],
        metrics: [
          { label: 'Architecture', value: 'Tree Hierarchy', detail: 'Intuitive permission inheritance layout' },
          { label: 'State Feedback', value: 'Instant', detail: 'Clear visual status on every setting change' },
          { label: 'Code Spec', value: 'Complete Tokens', detail: 'Tailwind CSS class mappings for engineers' }
        ],
        features: [
          'Visual condition and trigger builder interface',
          'Intuitive breadcrumb and permission inheritance views',
          'Immediate visual feedback on validation or logic errors',
          'Developer handoff documentation with component state variants'
        ],
        liveDemoNote: 'Concept blueprint demonstrating complex enterprise workflow configuration UI.',
      },
    ],
  },
  {
    slug: 'branding',
    name: 'Branding & Creative Design',
    label: 'DISTINCTIVE IDENTITY & CORPORATE DESIGN SYSTEMS',
    title: 'Strategic Brand Identities Engineered to Stand Out, Build Authority & Endure.',
    summary: 'Corporate brand positioning, distinctive visual identities, typography systems, and comprehensive brand guidelines for ambitious US and UK businesses. We create memorable brands that command premium pricing and foster enduring commercial trust.',
    color: 'pink',
    visual: 'brand',
    image: images.brandingIdentity,
    problem: 'Many growing businesses look interchangeable with their competitors because they rely on generic template logos, inconsistent color palettes, and stock photography that conveys zero authentic personality. Disjointed marketing materials confuse prospective clients, dilute brand equity, and make it difficult to justify premium pricing in competitive markets.',
    approach: 'We craft brand identities grounded in market positioning and human emotion. Through collaborative brand discovery workshops, we identify your unique commercial advantages, explore divergent creative directions, and design distinctive visual systems. From iconic logomarks and bespoke typography to digital guidelines and collateral templates, every element is engineered for unmistakable recognition across digital and physical touchpoints.',
    deliverables: [
      'Brand Discovery Workshop & Competitive Visual Differentiation Audit',
      'Core Brand Positioning Statement, Tone of Voice & Messaging Framework',
      'Primary & Secondary Logomarks, Monograms & Responsive Favicon Suite',
      'Bespoke Typographic Hierarchy & Digital-First Font Pairing Rules',
      'Distinctive Color Palette with Digital and Print Colour Spaces',
      'Social Media Assets, Marketing Templates & Executive Deck System',
      'Comprehensive Interactive Digital Brand Guidelines Book',
      'Master Vector Asset Package with Full Commercial IP Transfer',
    ],
    outcomes: [
      'An instantly recognizable, professional identity that commands market respect and trust',
      'Clear, actionable brand guidelines that empower your internal team to execute consistently',
      'Elevated brand perception that justifies premium pricing over commoditized competitors',
      '100% intellectual property ownership of all custom artwork and trademarks worldwide',
    ],
    techStack: [
      { category: 'Vector & Identity Design', items: ['Adobe Illustrator', 'Glyphs Font Foundry', 'Figma Brand Libraries', 'Vector Magic'] },
      { category: '3D Mockup & Visualisation', items: ['Blender Studio', 'Cinema 4D', 'Adobe Photoshop Studio', 'Custom Clay Mockups'] },
      { category: 'Guidelines & Collaboration', items: ['Interactive Web Brand Hub', 'Figma Community Files', 'Notion Brand Kit', 'PDF/X Print Standards'] },
      { category: 'Color & Print Standards', items: ['Pantone Matching System (PMS)', 'CMYK Color Separation', 'InDesign Print Specs', 'sRGB / Display P3'] },
    ],
    milestones: [
      { phase: '01', title: 'Brand Discovery & Archetype Audit', timeline: 'Week 1', description: 'Reviewing competitor aesthetics, unearthing brand values, defining target audience psychographics, and setting creative benchmarks.' },
      { phase: '02', title: 'Three Divergent Creative Directions', timeline: 'Week 2', description: 'Presenting three distinct visual directions featuring mood boards, typography explorations, color concepts, and initial logomarks.' },
      { phase: '03', title: 'Logomark Crafting & Typographic Refinement', timeline: 'Weeks 3-4', description: 'Polishing the chosen concept, perfecting vector geometry, crafting responsive logo variants, and establishing the font hierarchy.' },
      { phase: '04', title: 'Collateral Application & Template Design', timeline: 'Week 5', description: 'Applying the new identity to real-world touchpoints: executive presentation decks, business stationery, social cards, and signage.' },
      { phase: '05', title: 'Master Brand Book & Asset Handover', timeline: 'Week 6', description: 'Publishing the comprehensive digital brand guidelines book, exporting master vector packages, and executing the IP ownership transfer.' },
    ],
    metrics: [
      { label: 'Trademark Clearable', value: '100%', detail: 'Original vector geometry' },
      { label: 'Guidelines Scope', value: '60+ Pages', detail: 'Exhaustive rules & examples' },
      { label: 'Asset Formats', value: 'Vector + Web', detail: 'SVG, EPS, PNG, WebP' },
      { label: 'IP Assignment', value: 'Complete', detail: 'Full commercial rights transfer' },
    ],
    complianceGuarantees: [
      '100% Original Vector Artwork (Zero stock vectors, clip art, or recycled template logos)',
      'Full Worldwide Copyright & IP Ownership Assignment executed upon final milestone settlement',
      'Commercial Font Licensing Guidance (Specifying exact webfont and desktop licenses required)',
      'Trademark Clearance-Ready vector files formatted for USPTO and UK Intellectual Property Office filing',
      'Brand consistency guarantee across digital, web, mobile, and physical print mediums',
    ],
    questions: [
      {
        q: 'Can you refresh our existing brand identity without completely discarding our established equity?',
        a: 'Absolutely. A brand evolution or refresh retains recognized visual equities—such as familiar brand colors or logomark motifs—while modernizing typography, balancing vector geometry, and engineering clean digital-first guidelines suitable for high-resolution screens and responsive apps.',
      },
      {
        q: 'How many design concepts will you present to our team?',
        a: 'In Phase 2, we present three distinctly divergent creative directions. Each direction showcases the logomark in context, demonstrating how typography, color, and photography come together across web pages, business cards, and marketing materials so you can make an informed, confident strategic choice.',
      },
      {
        q: 'Will we receive editable presentation templates and social media assets?',
        a: 'Yes. Every branding package includes editable, branded presentation templates (Google Slides, PowerPoint, or Keynote) and customizable social media card templates in Figma so your team can maintain consistency from day one.',
      },
      {
        q: 'How do font licensing and commercial usage rights work?',
        a: 'We select fonts that align with your budget and application needs. Where premium commercial typefaces are recommended, we outline the exact desktop and web licensing requirements. Alternatively, we can construct the identity using world-class open-source Google Fonts with zero ongoing font licensing fees.',
      },
      {
        q: 'Who owns the final logos and brand guidelines?',
        a: 'You own 100% of all bespoke logos, vector logomarks, color palettes, and custom guidelines upon settlement of the final project invoice. We provide complete assignment of all commercial intellectual property rights with zero agency royalties.',
      },
    ],
    projects: [
      {
        id: 'biotech-brand-identity-concept',
        title: 'BioTech Corporate Identity & Visual System',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Corporate Identity & Brand Strategy',
        badge: 'Concept Project',
        summary: 'Cohesive scientific visual identity concept combining authority with modern aesthetics.',
        description: 'Demonstrates custom logomark architecture, scientific color tokens, and corporate presentation templates for venture discussions.',
        image: images.brandingIdentity,
        tags: ['Brand Guidelines', 'Typography Scale', 'Vector Logomark', 'Digital First'],
        metrics: [
          { label: 'Visual System', value: 'Full Guidelines', detail: 'Typography, palette, and logo clearspace' },
          { label: 'Format Assets', value: 'SVG & Vector', detail: 'Scalable from mobile favicons to event banners' },
          { label: 'Digital First', value: 'Web Accessible', detail: 'Screen-optimized RGB color palettes' }
        ],
        features: [
          'Custom vector logomark with precise responsive lockups',
          'Modern scientific color system engineered for contrast',
          'Corporate stationery and investor slide deck design templates',
          'Comprehensive brand guideline documentation'
        ],
        liveDemoNote: 'Concept blueprint demonstrating science & enterprise visual branding.',
      },
      {
        id: 'luxury-brand-identity-concept',
        title: 'Prime Residential Property Advisory Visual Identity',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Luxury Brand Identity',
        badge: 'Concept Project',
        summary: 'Refined brand identity concept designed for prime residential real estate consultancies.',
        description: 'Illustrates elegant serif typography pairings, bespoke monogram designs, and tactile print-ready stationery specifications.',
        image: images.commerce,
        tags: ['Luxury Branding', 'Editorial Serif', 'Print Specifications', 'Monogram Design'],
        metrics: [
          { label: 'Typography', value: 'Editorial Serif', detail: 'Distinguished heading and body pairings' },
          { label: 'Color Tokens', value: 'Earthy Luxury', detail: 'Deep forest green, warm stone, and bronze' },
          { label: 'Applications', value: 'Print & Screen', detail: 'Brochure layouts, signage, and web branding' }
        ],
        features: [
          'Tailored typographic scales pairing editorial serifs with geometric sans',
          'Distinctive monogram and icon asset set',
          'High-specification print brochure and property board templates',
          'Digital brand token specification for web and app usage'
        ],
        liveDemoNote: 'Concept blueprint demonstrating luxury real estate branding.',
      },
      {
        id: 'ai-platform-brand-system-concept',
        title: 'Technology Enterprise Typography & Brand Suite',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Technology Enterprise Identity',
        badge: 'Concept Project',
        summary: 'Bold, developer-focused brand design concept for cloud infrastructure platforms.',
        description: 'Demonstrates monospace typographic scales, high-contrast dark-mode brand palettes, and modular iconography sets.',
        image: images.team,
        tags: ['Developer Brand', 'Dark Mode Palette', 'Modular Icons', 'Monospace Scale'],
        metrics: [
          { label: 'Palette Range', value: 'Dual Mode', detail: 'Engineered for dark code environments & light docs' },
          { label: 'Icon System', value: 'Geometric Grid', detail: 'Consistent 24px grid system for system icons' },
          { label: 'Type Hierarchy', value: 'Modular Scale', detail: 'Clear distinction across technical documents' }
        ],
        features: [
          'Dual-theme color palettes engineered for dark-mode IDEs and light docs',
          '24px geometric grid system for technical iconography',
          'Modular code block and documentation presentation styling',
          'Cohesive visual identity for technical developer audiences'
        ],
        liveDemoNote: 'Concept blueprint demonstrating technology infrastructure branding.',
      },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'Ecommerce Growth & Engineering',
    label: 'FROM DISCOVERY TO DECISION · COMMERCE ARCHITECTURE',
    title: 'Bespoke Ecommerce Experiences Engineered for Speed, Product Discovery & Revenue.',
    summary: 'High-performance online store design, headless commerce engineering, and conversion rate optimization for modern brands in the US and UK. We engineer sub-second mobile product journeys, frictionless checkouts, and scalable catalog navigation.',
    color: 'orange',
    visual: 'commerce',
    image: images.ecommerceStore,
    problem: 'Modern shoppers demand sub-second mobile page loads and effortless navigation. When an ecommerce store relies on bloated, outdated themes, dozens of conflicting third-party apps, and slow checkout journeys, mobile bounce rates soar above 60%. Slow product filtering, unclear variant selection, and clunky checkouts directly depress average order values and waste advertising dollars.',
    approach: 'We engineer conversion-first ecommerce experiences built on modern platforms (Shopify Plus, Headless Hydrogen, Next.js Commerce). By stripping away app bloat and writing clean, modern code, we achieve sub-second Core Web Vitals, implement instant faceted product search with Algolia, and design frictionless express checkout journeys (Apple Pay, Google Pay, Klarna) that convert high-intent traffic into repeat customers.',
    deliverables: [
      'Mobile-First Ecommerce UX Audit & Customer Buying Journey Blueprint',
      'Custom Shopify Plus or Headless Commerce Store Architecture & Engineering',
      'Sub-Second Mobile Product Detail Page & Collection Grid Optimization',
      'Advanced Multi-Facet Product Filtering & Instant Search Integration',
      'High-Converting Checkout Experience with Express Wallets',
      'Ecommerce Analytics, Server-Side GA4 Tracking & Klaviyo Email Wiring',
      'Automated Inventory, ERP & Multi-Currency International Fulfillment Integration',
      'Post-Launch Conversion Rate Optimization Roadmap & 30-Day Defect Warranty',
    ],
    outcomes: [
      'Sub-second mobile catalog and product load speeds that retain high-intent shoppers',
      'Measurable lift in Average Order Value (AOV) through intelligent bundle and upsell flows',
      'Seamless international commerce supporting localized USD ($) and GBP (£) checkout parity',
      'Clean, maintainable theme codebase with zero reliance on performance-degrading apps',
    ],
    techStack: [
      { category: 'Commerce Platforms', items: ['Shopify Plus', 'Shopify Hydrogen (Headless)', 'BigCommerce Enterprise', 'WooCommerce Scaled'] },
      { category: 'Frontend & Speed Architecture', items: ['React 19 / Remix', 'Tailwind CSS', 'Cloudflare Edge CDN', 'WebP / AVIF Pipelines'] },
      { category: 'Search & Personalization', items: ['Algolia InstantSearch', 'Searchspring', 'Klaviyo Marketing Automation', 'Gorgias Support'] },
      { category: 'Payments & Wallets', items: ['Shopify Payments', 'Stripe Global', 'Apple Pay & Google Pay', 'Klarna & Clearpay BNPL'] },
    ],
    milestones: [
      { phase: '01', title: 'Catalog Taxonomy & Customer Journey Audit', timeline: 'Week 1', description: 'Auditing existing checkout drop-offs, mapping catalog collections, evaluating product variants, and planning UX hierarchy.' },
      { phase: '02', title: 'High-Converting Wireframes & Mobile Prototypes', timeline: 'Week 2', description: 'Designing frictionless mobile collection filters, high-conversion product detail page modules, and express checkout flows.' },
      { phase: '03', title: 'Full-Stack Theme Development & API Wiring', timeline: 'Weeks 3-4', description: 'Writing clean modular Liquid or React code, integrating Algolia search, wiring multi-currency checkout, and ERP hooks.' },
      { phase: '04', title: 'Payment Gateway QA, Load Testing & Speed Audit', timeline: 'Week 5', description: 'Executing multi-device checkout tests, validating payment webhooks, load testing traffic spikes, and tuning Core Web Vitals.' },
      { phase: '05', title: 'Zero-Downtime DNS Launch & Team Training', timeline: 'Week 6', description: 'Seamless store DNS switchover, team admin training on catalog management, full source code handover, and 30-day warranty.' },
    ],
    metrics: [
      { label: 'Target Mobile LCP', value: '< 1.2s Target', detail: 'Sub-second mobile speed optimization objective' },
      { label: 'Checkout Journey', value: 'Streamlined', detail: 'Frictionless express wallet and payment integration' },
      { label: 'Merchandising Flow', value: 'Native Bundles', detail: 'Custom bundle builder without slowing app bloat' },
      { label: 'Code Independence', value: '100%', detail: 'Zero proprietary app lock-in' },
    ],
    complianceGuarantees: [
      'PCI-DSS Level 1 Compliant Checkout Architecture (Zero sensitive cardholder data touches server)',
      'UK & EU GDPR Compliant Cookie Consent & Customer Data Erasure Integration',
      'US CCPA/CPRA Consumer Privacy Notice & "Do Not Sell My Info" Compliance',
      '100% Theme Source Code Handover with Zero Ongoing Agency License Fees',
      'Strict accessibility compliance ensuring all product selections are screen-reader compatible',
    ],
    questions: [
      {
        q: 'Should our brand choose standard Shopify Plus or a Headless Commerce architecture?',
        a: 'For most direct-to-consumer and B2B brands, a bespoke Shopify Plus theme engineered with clean Liquid, Tailwind CSS, and sub-second asset bundling delivers the optimal balance of ultra-fast load speed and non-technical staff usability. For complex brands requiring bespoke custom product customizers, international multi-region microservices, or complex ERP integrations, we engineer headless React/Hydrogen storefronts.',
      },
      {
        q: 'Can you migrate our existing store from WooCommerce, Magento, or older systems?',
        a: 'Yes. We manage end-to-end migrations including customer account records, order histories, product catalogs, SKU variants, and SEO redirect maps. We implement rigorous 301 URL redirect mappings to protect your organic Google rankings and preserve historic revenue pipelines.',
      },
      {
        q: 'How do you handle multi-currency checkout for US and UK customers?',
        a: 'We configure localized multi-currency and international markets using Shopify Markets or native multi-region gateways. Customers in the United Kingdom pay in British Pounds (£) with localized VAT handling, while US shoppers checkout in US Dollars ($) with automatic state sales tax calculation.',
      },
      {
        q: 'Will our internal marketing team be able to add new products and edit pages easily?',
        a: 'Yes. We build using Shopify’s native Online Store 2.0 modular section architecture. Your team can easily reorder content sections, update promotional banners, and launch new product pages without touching a single line of code.',
      },
      {
        q: 'What kind of conversion optimization (CRO) testing do you implement?',
        a: 'We test high-impact conversion friction points: sticky "Add to Bag" buttons on mobile, express one-click wallet integrations, quantity tier discount bundles, real-time inventory threshold badges, and transparent shipping timeline disclosures that build immediate buying confidence.',
      },
    ],
    projects: [
      {
        id: 'luxury-store-architecture-concept',
        title: 'Artisanal Homeware Headless Commerce Storefront',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'High-Ticket Design Commerce',
        badge: 'Concept Project',
        summary: 'Sub-second headless Shopify Plus concept engineered for luxury furniture and interiors.',
        description: 'Demonstrates responsive image pipelines, native cart drawer upsells without third-party app lag, and instant checkout flows.',
        image: images.ecommerceStore,
        tags: ['Shopify Plus', 'Headless Storefront', 'Native Upsell', 'Sub-Second PDP'],
        metrics: [
          { label: 'Target LCP', value: '< 1.0s Target', detail: 'Optimized product image loading' },
          { label: 'Cart Drawer', value: 'Native Code', detail: 'Zero third-party script bloat' },
          { label: 'Checkout', value: '1-Click Express', detail: 'Shop Pay and Apple Pay express integration' }
        ],
        features: [
          'Sub-second mobile Product Detail Page (PDP) architecture',
          'Native slide-out cart drawer with clean upsell recommendations',
          'Dynamic volume and free-shipping threshold calculators',
          'Express mobile checkout integration (Shop Pay, Apple Pay)'
        ],
        liveDemoNote: 'Concept blueprint demonstrating luxury headless ecommerce engineering.',
      },
      {
        id: 'apparel-store-architecture-concept',
        title: 'International Activewear Headless Commerce Architecture',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Global D2C Apparel Platform',
        badge: 'Concept Project',
        summary: 'High-concurrency apparel ecommerce concept built for global product drops.',
        description: 'Demonstrates multi-currency localization, real-time inventory caching at the edge, and rapid size/color swatch selectors.',
        image: images.ecommerceFashion,
        tags: ['High Concurrency', 'Multi-Currency', 'Edge Caching', 'Instant Swatches'],
        metrics: [
          { label: 'Global Edge', value: 'Edge Cached', detail: 'Low-latency catalogue delivery worldwide' },
          { label: 'Localization', value: 'Multi-Currency', detail: 'Dynamic currency and VAT calculation' },
          { label: 'Mobile UX', value: 'Sticky Actions', detail: 'Persistent add-to-bag triggers on scroll' }
        ],
        features: [
          'Edge-cached product catalogues supporting heavy peak-traffic spikes',
          'Multi-currency and localized tax display architecture',
          'Instant color and size swatch switches without full page reload',
          'Persistent mobile action bars ensuring frictionless add-to-bag steps'
        ],
        liveDemoNote: 'Concept blueprint demonstrating high-volume global apparel storefronts.',
      },
      {
        id: 'subscription-commerce-concept',
        title: 'Direct-to-Consumer Subscription Commerce Portal',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Subscription Commerce Platform',
        badge: 'Concept Project',
        summary: 'Recurring order management portal concept designed for direct-to-consumer consumables.',
        description: 'Demonstrates customer self-service subscription portals (pause, swap, skip), bundle builders, and automated retention messaging.',
        image: images.ecommerceLifestyle,
        tags: ['Recharge API', 'Subscription UX', 'Bundle Builder', 'Customer Portal'],
        metrics: [
          { label: 'Self-Service', value: 'Frictionless', detail: 'One-click frequency and flavor adjustments' },
          { label: 'Bundle Logic', value: 'Dynamic Pricing', detail: 'Client-side volume discount calculator' },
          { label: 'Portal Speed', value: 'Instant Render', detail: 'Zero page-reload portal interactions' }
        ],
        features: [
          'Intuitive customer portal for managing recurring delivery intervals',
          'Interactive bundle-and-save configuration interface',
          'Automated email and SMS renewal reminder flows',
          'Seamless integration with modern subscription billing APIs'
        ],
        liveDemoNote: 'Concept blueprint demonstrating subscription commerce architectures.',
      },
    ],
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Strategy & Marketing',
    label: 'SHOW UP WITH PURPOSE · COMMERCIAL ADVOCACY',
    title: 'B2B & Commercial Social Media Strategy Built on Authority, Relevance & Action.',
    summary: 'Strategic B2B LinkedIn marketing, paid social amplification, and executive brand advocacy for growing companies in the UK and US. We produce thumb-stopping creative, target commercial decision-makers, and turn social attention into verified pipeline.',
    color: 'violet',
    visual: 'brand',
    image: images.socialMedia,
    problem: 'Many corporate social media feeds consist of generic holiday greetings, uninspired stock graphics, and self-serving promotional announcements that receive zero meaningful customer engagement. Marketing teams spend valuable hours posting into an algorithmic vacuum without a clear strategy for reaching key commercial decision-makers or attributing inbound inquiries to social channels.',
    approach: 'We approach social media as strategic B2B authority building and high-intent audience acquisition. We identify exactly where your prospective commercial partners and buyers spend their professional attention—principally LinkedIn, YouTube, and Meta—and craft compelling thought-leadership, carousel case studies, and short-form video breakdowns. We combine organic thought leadership with targeted paid amplification to reach qualified executives and book meetings.',
    deliverables: [
      'Audience Research, Decision-Maker Mapping & Channel Prioritization Blueprint',
      'Commercial Content Pillar Architecture & Monthly Strategic Publishing Calendars',
      'High-Impact Branded Visual Assets, Document Carousels & Video Snippet Production',
      'Executive LinkedIn Ghostwriting & C-Suite Authority Profile Optimization',
      'Targeted Paid Social Campaign Management',
      'Account-Based Marketing List Segmentation & Retargeting Setup',
      'Community Engagement, Inbound Inquiry Triage & Commercial Escalation Protocol',
      'Monthly Commercial Performance Reports Linking Social Attention to CRM Pipeline',
    ],
    outcomes: [
      'A recognized, professional social presence that establishes your leadership in your vertical',
      'Consistent organic inbound inquiries from verified enterprise and B2B decision-makers',
      'Maximized reach for your company’s case studies, research reports, and major milestones',
      'Transparent attribution demonstrating direct ROI from social activity to closed deals',
    ],
    techStack: [
      { category: 'Social Networks & Ads', items: ['LinkedIn Campaign Manager', 'Meta Business Suite', 'YouTube Studio', 'X Business Operations'] },
      { category: 'Content Planning & Workflow', items: ['Notion Editorial Calendar', 'Sprout Social Enterprise', 'Buffer Publishing', 'Figma Creative Kits'] },
      { category: 'Creative Production', items: ['Adobe Premiere Pro', 'DaVinci Resolve Studio', 'Figma Motion', 'Descript Video Editing'] },
      { category: 'Attribution & Analytics', items: ['LinkedIn Insight Tag', 'Meta Conversions API', 'Google Analytics 4', 'Looker Studio Dashboards'] },
    ],
    milestones: [
      { phase: '01', title: 'Audience Mapping & Competitive Social Audit', timeline: 'Week 1', description: 'Analyzing competitor engagement, profiling target C-suite titles, identifying high-performing content themes, and auditing existing profiles.' },
      { phase: '02', title: 'Content Pillars & Visual Template Kits', timeline: 'Week 2', description: 'Establishing 4 core commercial content pillars, designing branded carousel and video templates in Figma, and creating voice guidelines.' },
      { phase: '03', title: 'Monthly Production Sprint & Executive Optimization', timeline: 'Week 3', description: 'Writing 30 days of high-authority posts, optimizing founder LinkedIn profiles, and scheduling first publishing batches.' },
      { phase: '04', title: 'Targeted Paid Amplification & Retargeting Launch', timeline: 'Week 4', description: 'Deploying sponsored content campaigns targeting specific company lists, job titles, and website visitor retargeting pools.' },
      { phase: '05', title: 'Performance Review & Lead Attribution Iteration', timeline: 'Month 2+', description: 'Monthly review of pipeline attribution, identifying top-converting content angles, and scaling high-performing campaigns.' },
    ],
    metrics: [
      { label: 'Audience Targeting', value: 'Role-Specific', detail: 'Intent-focused C-suite and decision-maker profiling' },
      { label: 'Content Standard', value: 'Editorial', detail: 'Original thought leadership and branded visual assets' },
      { label: 'Opportunity Tracking', value: 'UTM / CRM', detail: 'End-to-end campaign tracking and attribution setup' },
      { label: 'Production Cadence', value: 'Sprint-Based', detail: 'Pre-scheduled monthly content planning and approvals' },
    ],
    complianceGuarantees: [
      'FTC & UK CAP Code Compliant (Transparent disclosure of sponsored partnerships and paid ads)',
      'Strict White-Hat Practices Only (Zero fake followers, engagement pods, or automated bot networks)',
      'Direct Client Ad Account Ownership with zero agency media spend markups',
      '100% Client Ownership of all creative templates, custom videos, and written editorial copy',
      'Rigorous executive sign-off protocol for all C-suite thought leadership commentary',
    ],
    questions: [
      {
        q: 'How much time will our leadership or founder team need to contribute each month?',
        a: 'We understand your executives are busy running the business. We require just one 45-minute strategic interview per month. Our senior editorial team extracts your unique insights, war stories, and industry perspectives, turning them into a full month of polished, authoritative thought leadership posts and carousels for your review and sign-off.',
      },
      {
        q: 'Which social media channels should our business prioritize?',
        a: 'For B2B services, technology firms, and commercial consultancies, LinkedIn delivers the highest commercial return on investment by far. For luxury retail, real estate, and consumer brands, Meta (Instagram/Facebook) and YouTube offer powerful visual storytelling. We recommend dominating 1 or 2 high-impact channels rather than spreading resources thin.',
      },
      {
        q: 'How do you measure whether social media is actually driving revenue?',
        a: 'We implement the LinkedIn Insight Tag, Meta Conversions API, and custom UTM parameter structures tracked directly in your Google Analytics 4 and CRM. We track not just "likes" or vanity impressions, but website visits, content downloads, consultation requests, and closed deals initiated from social touchpoints.',
      },
      {
        q: 'Do you create original video and graphics or use stock templates?',
        a: 'Every graphic, document carousel, and video snippet is custom-designed in Figma and Premiere Pro using your brand guidelines, custom typography, and real photography. We strictly avoid generic Canva templates or artificial stock photos that erode authority.',
      },
      {
        q: 'Can you handle community management and inbound direct messages (DMs)?',
        a: 'Yes. We monitor comments and inbound inquiries daily. We provide prompt, professional responses adhering to your brand voice guidelines and escalate qualified commercial prospects directly to your sales team with full context.',
      },
    ],
    projects: [
      {
        id: 'legal-social-strategy-concept',
        title: 'Commercial Law Firm Digital Authority Blueprint',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Executive Legal Thought Leadership',
        badge: 'Concept Project',
        summary: 'B2B executive commentary and authority content architecture concept for legal partners.',
        description: 'Demonstrates structured weekly case commentary frameworks, regulatory change breakdowns, and professional LinkedIn publishing rhythms.',
        image: images.socialMedia,
        tags: ['B2B Leadership', 'Executive Commentary', 'Regulatory Analysis', 'Inquiry Routing'],
        metrics: [
          { label: 'Content Rhythm', value: 'Weekly Cadence', detail: 'Structured analysis of commercial case law' },
          { label: 'Brand Alignment', value: 'Executive Voice', detail: 'Distinguished authoritative tone of voice' },
          { label: 'Lead Pathway', value: 'Direct Inquiries', detail: 'Seamless profile-to-consultation routing' }
        ],
        features: [
          'Structured legal analysis frameworks breaking down new regulations',
          'Authoritative executive voice guidelines tailored for partner profiles',
          'Clean inquiry pathways leading from thought leadership to consultations',
          'Clear disclaimers distinguishing commentary from formal legal advice'
        ],
        liveDemoNote: 'Concept blueprint demonstrating professional executive authority strategy.',
      },
      {
        id: 'cloud-abm-social-concept',
        title: 'Technical B2B Thought Leadership Visual Series',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'High-Velocity Technical Carousels',
        badge: 'Concept Project',
        summary: 'Educational visual carousel framework concept for complex B2B software and cloud solutions.',
        description: 'Illustrates high-density data diagrams, architectural breakdown carousels, and shareable technical infographics.',
        image: images.team,
        tags: ['Technical Carousels', 'Cloud Infographics', 'Slide Architecture', 'Data Diagrams'],
        metrics: [
          { label: 'Asset Format', value: 'Multi-Slide PDF', detail: 'Optimized for high organic LinkedIn reach' },
          { label: 'Visual Clarity', value: 'Step-by-Step', detail: 'Complex cloud concepts broken into bite-size slides' },
          { label: 'Brand Tokens', value: 'Consistent Typo', detail: 'Unified corporate aesthetic on every asset' }
        ],
        features: [
          'Step-by-step visual breakdowns of complex system architectures',
          'High-contrast technical typography and diagram standards',
          'Multi-slide PDF documents formatted for social carousel feeds',
          'Clear call-to-action slides guiding technical leads to documentation'
        ],
        liveDemoNote: 'Concept blueprint demonstrating technical visual thought leadership.',
      },
      {
        id: 'consumer-brand-social-concept',
        title: 'Sustainable Architecture Digital Portfolio Experience',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Architectural Authority Growth',
        badge: 'Concept Project',
        summary: 'Visual storytelling and architectural case study distribution framework concept.',
        description: 'Demonstrates high-resolution project photography showcases, sustainability impact data callouts, and multi-platform distribution planning.',
        image: images.property,
        tags: ['Visual Storytelling', 'Portfolio Galleries', 'Sustainability Callouts', 'Tender Packs'],
        metrics: [
          { label: 'Media Pipeline', value: 'WebP / AVIF', detail: 'Compressed high-resolution project galleries' },
          { label: 'Story Format', value: 'Project Deep Dive', detail: 'Problem, material choice, and environmental impact' },
          { label: 'Tender Prep', value: 'Downloadable PDF', detail: 'Automated portfolio brochure generation' }
        ],
        features: [
          'High-resolution architectural photo galleries with fast web compression',
          'Clear sustainability and material provenance data modules',
          'Editorial deep dives covering concept, build, and completion',
          'Automated digital tender and credentials brochure generation'
        ],
        liveDemoNote: 'Concept blueprint demonstrating architectural storytelling strategies.',
      },
    ],
  },
  {
    slug: 'content-marketing',
    name: 'Content Marketing & SEO Copywriting',
    label: 'TURN EXPERTISE INTO UNDERSTANDING · E-E-A-T STRATEGY',
    title: 'Search-Informed Content & Service Copywriting that Demonstrates Unrivalled Authority.',
    summary: 'High-intent service page copywriting, strategic editorial articles, and conversion-led messaging for UK and US businesses. We craft deep, authoritative content grounded in Google’s E-E-A-T guidelines that wins organic rankings and converts discerning buyers.',
    color: 'lime',
    visual: 'website',
    image: images.contentStrategy,
    problem: 'The internet is flooded with generic, low-quality AI-generated blog posts that provide zero unique insight, fail to rank on search engines, and bore prospective customers. Meanwhile, thin, jargon-heavy service pages fail to address customer buying objections, leaving visitors with unanswered questions and giving search engines little useful context to reward with top rankings.',
    approach: 'We create content grounded in deep subject-matter research, customer psychology, and rigorous search intent mapping. By interviewing your internal subject-matter experts, analyzing competitor keyword gaps, and aligning with Google’s Helpful Content and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) criteria, we craft compelling service pages, technical guides, and thought-leadership articles that establish enduring organic discovery.',
    deliverables: [
      'Comprehensive Content Audit, Competitor Gap Analysis & Keyword Opportunity Map',
      'Search Intent Clustering & Question-Led Editorial Content Strategy Roadmap',
      'Conversion-Optimized Service Page Copywriting with Strict Semantic Hierarchy',
      'In-Depth Thought-Leadership Articles & Topic Pillar Guides',
      'Google E-E-A-T Compliance Optimization',
      'Strategic Internal Linking Blueprint',
      'Schema.org Structured Data Implementation',
      'Editorial Style Guide, Brand Voice Runbook & 90-Day Content Maintenance Plan',
    ],
    outcomes: [
      'Top organic search visibility for high-intent commercial keywords that attract qualified buyers',
      'A measurable increase in average time-on-page and engagement depth across key service pages',
      'Substantial reduction in sales team repetition by proactively answering core buying objections',
      '100% human-crafted, fact-checked editorial copy with complete intellectual property ownership',
    ],
    techStack: [
      { category: 'Search & Intent Intelligence', items: ['Ahrefs Content Explorer', 'Semrush Topic Research', 'AlsoAsked Intent Clustering', 'Google Search Console'] },
      { category: 'Editorial & Quality Standards', items: ['Hemingway Editor', 'Grammarly Business', 'AP Stylebook / Oxford English', 'Fact-Checking Protocols'] },
      { category: 'Semantic & Schema Markup', items: ['Schema.org JSON-LD', 'Google Rich Results Testing', 'Semantic HTML5', 'Yoast / RankMath Standards'] },
      { category: 'Attribution & Content Analytics', items: ['Google Analytics 4', 'Looker Studio Dashboards', 'Microsoft Clarity Heatmaps', 'GSC Performance API'] },
    ],
    milestones: [
      { phase: '01', title: 'Subject-Matter Discovery & Search Intent Audit', timeline: 'Week 1', description: 'Interviewing internal experts, analyzing high-intent competitor search gaps, clustering commercial questions, and setting KPIs.' },
      { phase: '02', title: 'Information Architecture & Pillar Outlines', timeline: 'Week 2', description: 'Developing semantic heading structures (H1-H4), mapping customer buying objections, and approving detailed content outlines.' },
      { phase: '03', title: 'Full Commercial Copywriting Sprint', timeline: 'Weeks 3-4', description: 'Crafting in-depth service pages and pillar guides with compelling hooks, verifiable data points, and conversion-focused CTAs.' },
      { phase: '04', title: 'SEO Optimization & E-E-A-T Verification', timeline: 'Week 5', description: 'Injecting Schema.org JSON-LD structured data, optimizing meta titles and descriptions, and completing peer editorial reviews.' },
      { phase: '05', title: 'Publishing, Internal Linking & 90-Day Rank Tracking', timeline: 'Week 6+', description: 'Deploying content to CMS, wiring contextual internal links, monitoring Google Search Console indexation, and quarterly refreshes.' },
    ],
    metrics: [
      { label: 'Search Intent Alignment', value: 'Commercial', detail: 'Aligned with high-intent decision-maker search queries' },
      { label: 'Readability Grade', value: 'Grade 8-10', detail: 'Accessible, clear, compelling' },
      { label: 'Plagiarism & AI Fluff', value: '0%', detail: '100% human-crafted & verified' },
      { label: 'Technical Integration', value: 'Schema-Ready', detail: 'Integrated JSON-LD structured data and semantic tags' },
    ],
    complianceGuarantees: [
      '100% Human-Authored & Fact-Checked (Zero automated generic copy or unverified factual claims)',
      'Strict White-Hat Search Compliance adhering to Google’s Helpful Content & Search Essentials',
      'Subject-Matter Verification Sign-Off on all regulatory, clinical, legal, or financial statements',
      'Complete Commercial Copyright & IP Assignment executed upon milestone settlement',
      'FTC & UK CAP Code Compliant (Honest, unsubstantiated claim-free commercial copywriting)',
    ],
    questions: [
      {
        q: 'Do you use automated AI tools to write the content?',
        a: 'No. While we leverage search intelligence tools like Ahrefs and Semrush to uncover commercial search intent, all copywriting is 100% human-crafted by experienced commercial editors. Automated AI tools produce generic, repetitive fluff that Google’s Helpful Content system actively devalues and that fails to persuade sophisticated buyers.',
      },
      {
        q: 'How do you ensure the written content accurately reflects our technical domain?',
        a: 'We conduct 45-minute discovery interviews with your internal subject-matter experts before writing. We extract your proprietary methodology, client case studies, and specialized terminology, translating your authentic expertise into clear, accessible, and high-converting copy.',
      },
      {
        q: 'How does high-quality content marketing support our Google search rankings?',
        a: 'Search engines evaluate whether a website demonstrates comprehensive topical authority and satisfies user search intent. By publishing well-structured, in-depth service pages and educational guides with clear Schema markup and internal links, we help Google comprehend your expertise, resulting in higher rankings across broad clusters of commercial keywords.',
      },
      {
        q: 'Can you audit and rewrite our existing website copy instead of starting from scratch?',
        a: 'Yes. We frequently conduct content audits of existing websites, identifying pages with good search impressions but low click-through or high bounce rates. We restructure headings, clarify the value proposition, inject rich Schema.org markup, and optimize the copy for conversion.',
      },
      {
        q: 'Who owns the copyright to the written articles and copy?',
        a: 'You own 100% of all written copy, editorial guides, research databases, and meta descriptions upon final milestone payment. We provide complete assignment of all commercial rights, allowing you to publish, syndicate, and repurpose the text across any channel.',
      },
    ],
    projects: [
      {
        id: 'medtech-content-architecture-concept',
        title: 'Healthcare Knowledge Architecture & Diagnostic Search',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Clinical Healthcare Search Intent',
        badge: 'Concept Project',
        summary: 'Comprehensive medical condition and diagnostic knowledge base architecture concept.',
        description: 'Features medically reviewed information structures, clear patient guidance, and Schema.org MedicalWebPage markup.',
        image: images.contentStrategy,
        tags: ['Medical Content', 'E-E-A-T Framework', 'Diagnostic Index', 'Schema Medical'],
        metrics: [
          { label: 'Review Gate', value: 'Clinical Sign-off', detail: 'Structured editorial review protocols' },
          { label: 'Schema Type', value: 'MedicalCondition', detail: 'Specialized JSON-LD schema taxonomy' },
          { label: 'Navigation', value: 'Symptom Index', detail: 'Intuitive alphabetical and category browsing' }
        ],
        features: [
          'Medically verified editorial guidelines and review badge structures',
          'Comprehensive Schema.org MedicalCondition and MedicalWebPage markup',
          'Alphabetical diagnostic condition indexes for rapid navigation',
          'Clear, accessible language explaining complex medical diagnostics'
        ],
        liveDemoNote: 'Concept blueprint demonstrating medical knowledge base architecture.',
      },
      {
        id: 'wealth-guide-content-concept',
        title: 'Wealth Advisory Digital Knowledge Hub',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Financial Services Authority Pillar',
        badge: 'Concept Project',
        summary: 'Financial planning and retirement decision framework concept for private wealth managers.',
        description: 'Demonstrates interactive estate planning checklists, inheritance tax guides, and regulatory compliance disclosures.',
        image: images.legalCorporate,
        tags: ['Financial Guides', 'Pillar & Cluster', 'FCA Disclosures', 'Interactive Tools'],
        metrics: [
          { label: 'Compliance', value: 'FCA & SEC Ready', detail: 'Mandatory risk warnings and clear disclaimers' },
          { label: 'Lead Mechanism', value: 'Gated Guides', detail: 'High-value downloadable planning workbooks' },
          { label: 'SEO Hierarchy', value: 'Pillar & Cluster', detail: 'Comprehensive tax and retirement topic clusters' }
        ],
        features: [
          'Pillar and cluster content architecture for tax and retirement planning',
          'Interactive financial checklists and downloadable planning workbooks',
          'Prominent statutory risk disclosures and compliance footnotes',
          'Contextual call-to-actions routing readers to private consultations'
        ],
        liveDemoNote: 'Concept blueprint demonstrating wealth management content strategy.',
      },
      {
        id: 'saas-content-architecture-concept',
        title: 'B2B SaaS Commercial Knowledge Base',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'B2B SaaS Content Strategy',
        badge: 'Concept Project',
        summary: 'Buyer education and procurement comparison guide architecture concept.',
        description: 'Demonstrates transparent competitor feature matrices, total-cost-of-ownership calculators, and implementation timelines.',
        image: images.consultingAdvisory,
        tags: ['Procurement Specs', 'ROI Calculators', 'Comparison Guides', 'Position #0'],
        metrics: [
          { label: 'Content Type', value: 'Procurement Specs', detail: 'Technical evaluation criteria for CIOs and VPs' },
          { label: 'Interactive UX', value: 'ROI Calculators', detail: 'Client-side financial payback estimation tools' },
          { label: 'SERP Design', value: 'Featured Snippet', detail: 'Concise definitions crafted for Position #0' }
        ],
        features: [
          'Factual, feature-by-feature procurement evaluation matrices',
          'Interactive client-side ROI and implementation payback calculators',
          'Structured technical definitions engineered for Google Featured Snippets',
          'Modular buying guides answering executive due-diligence questions'
        ],
        liveDemoNote: 'Concept blueprint demonstrating B2B SaaS buyer enablement content.',
      },
    ],
  },
];
export const industries: Offering[] = [
  {
    slug: 'real-estate',
    name: 'Real Estate & Property',
    label: 'PROPERTY ACQUISITION & VALUATION ARCHITECTURE',
    title: 'High-Converting Real Estate Websites, Local SEO & MLS/IDX Engines.',
    summary: 'Tailored digital experiences for UK estate agents, US realtors, and luxury property developers. We engineer sub-second property discovery portals, automated valuation booking funnels, and hyper-local SEO campaigns that generate qualified buyer and vendor instructions.',
    color: 'cyan',
    visual: 'property',
    image: images.property,
    problem: 'Most estate agency websites suffer from slow, clunky property search filters, outdated IDX/feed sync delays, and generic contact forms that produce unqualified window-shoppers. In competitive London, New York, and regional property markets, high-intent sellers and landlords leave when pages take longer than 2 seconds to load or when instant valuation tools feel invasive and clunky.',
    approach: 'We build bespoke property portals engineered around high-intent local seller and buyer psychology. From real-time MLS/IDX and CRM integrations (Reapit, Dezrez, Follow Up Boss) to hyper-targeted neighbourhood guides and instant property valuation funnels, we turn digital searches into confirmed market appraisal instructions.',
    deliverables: [
      'Bespoke Real Estate & Estate Agency Website Engineering',
      'Real-Time MLS/IDX & Property Portal Feed Synchronization',
      'Interactive Instant Online Valuation & Market Appraisal Booking Funnels',
      'Hyper-Local Neighborhood & Suburb Authority Guides for Dominant Local SEO',
      'Automated CRM Lead Routing & Follow-Up Workflows',
      'High-Performance Mobile Search & Interactive Map Exploration',
      'Real Estate Schema.org Markup',
      'Full Source Code Handover, 100% IP Transfer & 30-Day Post-Launch Defect Warranty',
    ],
    outcomes: [
      'Sub-second listing search load speeds that retain high-intent buyers on mobile',
      'Measurable increase in qualified vendor valuation requests and landlord appraisals',
      'Dominant Google 3-Pack and organic search rankings across core postcode territories',
      'Automated lead distribution to branch negotiators with instant SMS/Email notifications',
    ],
    questions: [
      {
        q: 'Can you integrate our existing property feed such as Reapit, Dezrez, or US MLS via RESO?',
        a: 'Yes. We build native API connections to Reapit Foundations, Dezrez, Street.co.uk, and US MLS providers adhering strictly to RESO Web API standards. Listings update automatically in real-time, complete with high-resolution image caching, floor plans, EPC ratings, and virtual tour embeds.',
      },
      {
        q: 'How do you help our estate agency rank #1 on Google for local seller searches?',
        a: 'We implement hyper-local SEO architectures tailored to your specific postcodes and neighbourhoods. This includes dedicated vendor valuation landing pages, bespoke suburb amenity guides, Google Business Profile local 3-pack optimization, and structured RealEstateAgent Schema markup that establishes local market authority.',
      },
      {
        q: 'Will the website support multi-branch agencies with dedicated negotiator contact routing?',
        a: 'Yes. We architect dynamic branch locator pages and negotiator directories. Enquiries and valuation requests are automatically routed to the relevant branch manager or negotiator based on the property location, postcode, or department (Residential Sales, Lettings, Commercial).',
      },
      {
        q: 'Can we offer instant online valuations without paying expensive third-party monthly SaaS fees?',
        a: 'Yes. We engineer bespoke valuation funnel tools directly into your website. Prospective vendors input their address, property specs, and condition to receive instant valuation estimates or request an in-person appraisal, sending the lead directly to your CRM with zero recurring SaaS middleman fees.',
      },
      {
        q: 'Who owns the website code, design assets, and content after the project is completed?',
        a: 'You do. Upon settlement of final project milestones, 100% of the custom source code, bespoke design files, and written content transfer entirely to your agency. We provide complete Git repository access with zero ongoing agency licensing fees or vendor lock-in.',
      },
    ],
    techStack: [
      {
        category: 'Property & Search Engine',
        items: ['React 19 / TypeScript', 'Mapbox GL / Google Maps', 'Algolia InstantSearch', 'Tailwind CSS'],
      },
      {
        category: 'Feeds & CRM Interop',
        items: ['RESO Web API', 'Reapit Foundations', 'Dezrez API', 'Follow Up Boss Webhooks'],
      },
      {
        category: 'Local SEO & Schema',
        items: ['RealEstateAgent Schema', 'GeoCoordinates JSON-LD', 'Google Business Profile', 'Ahrefs Rank Tracker'],
      },
      {
        category: 'Hosting & Security',
        items: ['Cloudflare Edge CDN', 'SOC2 / GDPR Infrastructure', 'SSL 256-bit Encryption', 'Vercel / AWS'],
      },
    ],
    milestones: [
      {
        phase: 'Sprint 01',
        title: 'Territory Discovery & MLS Architecture',
        timeline: 'Week 1',
        description: 'Audit target property territories, existing CRM feeds, and buyer/vendor conversion journeys.',
      },
      {
        phase: 'Sprint 02',
        title: 'Listing UX & Valuation Funnel Wireframing',
        timeline: 'Week 2',
        description: 'Design responsive property cards, interactive map exploration, and friction-free valuation booking flows.',
      },
      {
        phase: 'Sprint 03',
        title: 'Full-Stack Development & Feed Integration',
        timeline: 'Weeks 3-4',
        description: 'Code custom property components, connect live RESO/Reapit feeds, and optimize sub-second Core Web Vitals.',
      },
      {
        phase: 'Sprint 04',
        title: 'Local SEO & Postcode Content Deployment',
        timeline: 'Week 5',
        description: 'Publish structured neighbourhood guides, implement GeoCoordinates Schema, and configure branch CRM routing.',
      },
      {
        phase: 'Sprint 05',
        title: 'Cross-Device QA & Full IP Handover',
        timeline: 'Week 6',
        description: 'Execute cross-device QA, load-test listing filters, and transfer 100% code ownership with staff training.',
      },
    ],
    metrics: [
      { label: 'Search Experience', value: 'Instant Filter', detail: 'Sub-second property search and boundary mapping' },
      { label: 'Inquiry Architecture', value: 'Lead Capture', detail: 'High-converting valuation and viewing booking journeys' },
      { label: 'Local Discoverability', value: 'Targeted', detail: 'Localized neighborhood and postcode landing structures' },
      { label: 'Mobile Optimization', value: 'Responsive', detail: 'Fluid photo galleries and responsive floorplan viewing' },
    ],
    complianceGuarantees: [
      'UK Estate Agents Act 1979 & Consumer Protection Regulations (CPR) compliance guidance',
      'US Fair Housing Act & NAR (National Association of Realtors) advertising guideline alignment',
      'UK/EU GDPR & US CCPA compliant cookie preferences and enquiry consent logging',
      'RESO (Real Estate Standards Organization) certified data structures and display rules',
      '100% intellectual property assignment: zero recurring software licensing or lock-in fees',
    ],
    projects: [
      {
        id: 'prime-residential-property-concept',
        title: 'Prime Residential Property Discovery Portal',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'High-End Estate Agency Engineering',
        badge: 'Concept Project',
        summary: 'Bespoke property search portal concept for prime central estate agencies.',
        description: 'Features sub-second address search, instant property valuation calculators, and neighborhood authority guides.',
        image: images.realEstateLuxury,
        tags: ['Property Portal', 'Valuation Funnel', 'Local SEO', 'Interactive Maps'],
        metrics: [
          { label: 'Target Load', value: '< 1.0s Target', detail: 'Rapid mobile property photo browsing' },
          { label: 'Valuation UX', value: '2-Step Funnel', detail: 'Instant market appraisal estimation flow' },
          { label: 'Map Search', value: 'Interactive Vector', detail: 'Smooth neighborhood boundary exploration' }
        ],
        features: [
          'Sub-second property search with instant price, bedroom, and type filters',
          'Frictionless online property valuation request journey',
          'Detailed neighborhood lifestyle and local amenity guides',
          'RealEstateAgent Schema.org markup linking property listings'
        ],
        liveDemoNote: 'Concept blueprint demonstrating prime real estate portal architecture.',
      },
      {
        id: 'metro-realty-platform-concept',
        title: 'Modern RESO MLS / IDX Search Platform',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'US MLS/IDX Integration',
        badge: 'Concept Project',
        summary: 'Scalable real estate discovery engine concept integrating real-time MLS feeds.',
        description: 'Demonstrates normalized RESO Web API synchronization, instant faceted filters, and CRM lead capture.',
        image: images.realEstateCommercial,
        tags: ['RESO Web API', 'Algolia Search', 'CRM Webhook', 'IDX Ingestion'],
        metrics: [
          { label: 'Sync Standard', value: 'RESO Web API', detail: 'Real-time property status updates' },
          { label: 'Search Query', value: 'Fast Indexing', detail: 'Instant faceted property filtering' },
          { label: 'CRM Handoff', value: 'Direct Webhook', detail: 'Lead routing to Follow Up Boss / Lofty' }
        ],
        features: [
          'Real-time RESO Web API feed synchronization and normalization',
          'Faceted property filtering with sub-50ms search query response',
          'Automated buyer lead routing directly into real estate CRM systems',
          'Full compliance with MLS display rules and attribution disclosures'
        ],
        liveDemoNote: 'Concept blueprint demonstrating RESO Web API MLS search platforms.',
      },
      {
        id: 'rural-estates-platform-concept',
        title: 'Heritage Country Estates Discovery Hub',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Heritage Property Marketing',
        badge: 'Concept Project',
        summary: 'High-touch digital showcase concept for rural land, country estates, and historic properties.',
        description: 'Features aerial video integration, downloadable boundary plans, and private viewing appointment requests.',
        image: images.realEstateEstateAgency,
        tags: ['Country Estates', 'Drone Video', 'Land Plans', 'Private Viewing'],
        metrics: [
          { label: 'Media UX', value: 'Cinematic Video', detail: 'Optimized drone and tour media delivery' },
          { label: 'Documents', value: 'Downloadable Pack', detail: 'Secure land survey and floor plan downloads' },
          { label: 'Local Context', value: 'Parish & School', detail: 'Curated rural lifestyle and amenity data' }
        ],
        features: [
          'High-bandwidth aerial video embeds and land boundary overlays',
          'Secure brochure and architectural plan download gates',
          'Private viewing consultation booking forms with calendar sync',
          'Detailed parish, transport, and historic estate background context'
        ],
        liveDemoNote: 'Concept blueprint demonstrating rural and heritage estate marketing.',
      },
    ],
  },
  {
    slug: 'dental-clinics',
    name: 'Dental Clinics & Healthcare',
    label: 'PATIENT TRUST & TREATMENT ENQUIRY ARCHITECTURE',
    title: 'Bespoke Dental Practice Websites, Local SEO & Patient Booking Systems.',
    summary: 'High-trust, compliant digital platforms for private dental clinics, cosmetic dentists, and implant centres across the UK and US. We turn nervous searchers into confirmed high-value treatment consultations for Invisalign, composite bonding, and dental implants.',
    color: 'lime',
    visual: 'dental',
    image: images.dental,
    problem: 'Prospective dental patients are often anxious, price-sensitive, and overwhelmed by clinical jargon. Most practice websites are cluttered with stock imagery, slow loading times, confusing treatment pages, and outdated appointment request forms. In competitive metropolitan areas, clinics lose lucrative implant and orthodontic patients to nearby competitors with clear before-and-after galleries and seamless booking flows.',
    approach: 'We craft calm, high-trust digital experiences that dismantle patient anxiety and clarify treatment investments. From transparent before-and-after smile transformation showcases to integrated online consultation booking engines (Dentally, Software of Excellence, Dentrix), our platforms elevate your clinic\'s local authority while strictly adhering to GDC, CQC, and HIPAA regulations.',
    deliverables: [
      'Bespoke Patient-Centred Dental Practice Website',
      'Interactive Treatment Guides & Transparent Investment Pricing Calculators',
      'Compliant Before-and-After Smile Transformation Gallery with Filterable Cases',
      'Integrated Practice Management Booking Engines',
      'Local Healthcare SEO Optimization for High-Ticket Treatments',
      'WCAG 2.1 AA Accessibility & Calm Ergonomic UI Design for Nervous Patients',
      'Dentist & MedicalBusiness Schema.org Structured Data with Doctor Attribution',
      'Full Code Ownership, Zero Recurring Agency SaaS Fees & 30-Day Defect Warranty',
    ],
    outcomes: [
      'Noticeable increase in private cosmetic and restorative consultation bookings',
      'Strong Google 3-Pack rankings for lucrative local keywords (e.g. dental implants near me)',
      'Reduced front-desk phone strain through pre-qualified online treatment inquiries',
      '100% regulatory compliance with GDC/CQC (UK) and HIPAA/ADA (US) standards',
    ],
    questions: [
      {
        q: 'How do you ensure our dental website complies with GDC and CQC advertising rules?',
        a: 'We adhere strictly to General Dental Council (GDC) ethical advertising principles and Care Quality Commission (CQC) standards. All clinical copy highlights clinician registrations, transparent fee schedules, clear risks, and verified before-and-after consent, avoiding misleading superlative claims or unevidenced guarantees.',
      },
      {
        q: 'Can the website integrate directly with our practice software (Dentally, Exact, Dentrix)?',
        a: 'Yes. We integrate directly with major dental practice management software including Dentally, Software of Excellence (Exact), and Dentrix. Patients can view real-time appointment availability, complete preliminary intake questionnaires, and book cosmetic consultations without manual receptionist data entry.',
      },
      {
        q: 'How do you attract high-value private patients (Invisalign, Implants) instead of routine checkups?',
        a: 'We build dedicated, high-intent landing pages for cosmetic and restorative treatments. Each page features transparent pricing breakdowns, patient finance calculators, verified case studies, and clinical FAQ sections that address patient fears and drive consultation bookings.',
      },
      {
        q: 'What safeguards do you implement to protect patient privacy and health data?',
        a: 'We enforce privacy-by-design. General marketing enquiry forms collect only basic contact details and treatment interests, never medical history or clinical data. All transmissions use 256-bit SSL encryption, and lead databases are fully compliant with UK GDPR and US HIPAA guidelines.',
      },
      {
        q: 'Who owns the website and patient booking data once the site goes live?',
        a: 'Your practice owns 100% of all website code, design files, content, and patient enquiry data upon project completion. We transfer full administrative access with zero proprietary licensing fees or vendor lock-in.',
      },
    ],
    techStack: [
      {
        category: 'Patient UI & Experience',
        items: ['React 19 / TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
      },
      {
        category: 'Clinical Integration',
        items: ['Dentally Web API', 'Exact / SOE Webhooks', 'Dentrix Connect', 'Custom Secure Intake'],
      },
      {
        category: 'Healthcare SEO & Schema',
        items: ['MedicalBusiness Schema', 'Physician JSON-LD', 'Google Business Profile', 'BrightLocal'],
      },
      {
        category: 'Privacy & Hosting',
        items: ['HIPAA / NHS Data Shield', 'Cloudflare Edge SSL', 'GDPR Cookie Consent', 'AWS Healthcare Tier'],
      },
    ],
    milestones: [
      {
        phase: 'Sprint 01',
        title: 'Clinical Discovery & Patient Journey Mapping',
        timeline: 'Week 1',
        description: 'Map priority treatments (Invisalign, implants, cosmetic) and practice booking workflows.',
      },
      {
        phase: 'Sprint 02',
        title: 'Calm Aesthetic UI/UX Wireframing',
        timeline: 'Week 2',
        description: 'Design reassuring layouts, treatment pricing breakdowns, and doctor bio profiles.',
      },
      {
        phase: 'Sprint 03',
        title: 'Full-Stack Build & Booking Sync',
        timeline: 'Weeks 3-4',
        description: 'Develop sub-second website, integrate practice booking software, and test intake forms.',
      },
      {
        phase: 'Sprint 04',
        title: 'Local Healthcare SEO Launch',
        timeline: 'Week 5',
        description: 'Deploy MedicalBusiness Schema, optimize treatment pages, and calibrate Google Maps visibility.',
      },
      {
        phase: 'Sprint 05',
        title: 'Regulatory QA & Source Code Transfer',
        timeline: 'Week 6',
        description: 'Verify GDC/HIPAA compliance, conduct patient privacy testing, and complete IP handover.',
      },
    ],
    metrics: [
      { label: 'Patient Journey', value: 'Frictionless', detail: 'Clean treatment exploration and consultation intake' },
      { label: 'Local Discoverability', value: 'Targeted', detail: 'Google Business Profile and local citation alignment' },
      { label: 'Mobile Speed Benchmark', value: '< 1.2s Target', detail: 'Fast-loading treatment guides on mobile networks' },
      { label: 'Privacy Baseline', value: 'GDPR-Ready', detail: 'Secure patient intake form handling and consent' },
    ],
    complianceGuarantees: [
      'Strict adherence to UK General Dental Council (GDC) advertising and professional standards',
      'Care Quality Commission (CQC) digital compliance: transparent pricing, verified clinician credentials',
      'US HIPAA compliance: zero unencrypted health data collection on standard marketing web forms',
      'ASA (UK Advertising Standards Authority) guidance compliance: no misleading cosmetic claims',
      'Complete assignment of all custom source code, domain assets, and design files to the practice',
    ],
    projects: [
      {
        id: 'private-dental-booking-concept',
        title: 'Cosmetic Dentistry & Patient Booking Experience',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Private Cosmetic Dentistry',
        badge: 'Concept Project',
        summary: 'High-trust cosmetic dentistry and orthodontics patient acquisition concept.',
        description: 'Demonstrates interactive treatment visualizers, clear fee breakdowns, and compliant booking funnels.',
        image: images.dentalAesthetic,
        tags: ['Invisalign Funnel', 'Fee Transparency', 'Patient Trust', 'GDC Compliant'],
        metrics: [
          { label: 'Booking UX', value: 'Frictionless', detail: 'Clear 3-step appointment reservation' },
          { label: 'Compliance', value: 'GDC & ASA Ready', detail: 'Transparent pricing and factual treatment copy' },
          { label: 'Speed Standard', value: 'Sub-Second', detail: 'Instant before-and-after photo comparisons' }
        ],
        features: [
          'Interactive smile assessment and Invisalign eligibility check',
          'Transparent, itemized treatment fee calculators with finance options',
          'Strict adherence to GDC and ASA advertising standards',
          'Frictionless 3-step consultation booking flow with SMS confirmation'
        ],
        liveDemoNote: 'Concept blueprint demonstrating cosmetic dental clinic portals.',
      },
      {
        id: 'dental-implant-practice-concept',
        title: 'Multi-Location Dental & Medical SEO Blueprint',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Multi-Location Healthcare SEO',
        badge: 'Concept Project',
        summary: 'Regional clinic visibility architecture concept for multi-site healthcare practices.',
        description: 'Features distinct location hubs, centralized doctor credential profiles, and structured treatment FAQs.',
        image: images.dentalImplantology,
        tags: ['Healthcare SEO', 'Multi-Clinic', 'Dentist Schema', 'Local 3-Pack'],
        metrics: [
          { label: 'Entity Schema', value: 'Dentist / Physician', detail: 'Direct Google Knowledge Graph linkage' },
          { label: 'Local Signals', value: 'Consistent NAP', detail: 'Structured location data on all branch pages' },
          { label: 'Review Framework', value: 'Verified Third-Party', detail: 'Compliant Trustpilot/Google review embeds' }
        ],
        features: [
          'Multi-branch practice hierarchy with individual doctor bios',
          'Detailed treatment FAQs addressing patient surgical concerns',
          'Consistent NAP information across all branch locations',
          'Direct integration with practice management booking calendars'
        ],
        liveDemoNote: 'Concept blueprint demonstrating multi-location dental search architecture.',
      },
      {
        id: 'orthodontic-specialist-concept',
        title: 'Specialist Orthodontic Assessment Portal',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Specialist Orthodontic Practice',
        badge: 'Concept Project',
        summary: 'Orthodontic consultation and smile assessment intake funnel concept.',
        description: 'Demonstrates photo-guided smile assessment forms, treatment timeline calculators, and financing estimators.',
        image: images.dentalOrthodontics,
        tags: ['Assessment Tool', 'Finance Calculator', 'Smile Analysis', 'Encrypted Form'],
        metrics: [
          { label: 'Self-Assessment', value: 'Interactive Tool', detail: 'Step-by-step patient eligibility check' },
          { label: 'Finance UX', value: 'Live Calculator', detail: 'Monthly installment breakdown logic' },
          { label: 'Patient Privacy', value: 'Encrypted Form', detail: 'Secure clinical photo upload handling' }
        ],
        features: [
          'Step-by-step patient self-assessment questionnaire',
          'Interactive monthly finance and installment payment estimator',
          'Secure, encrypted photo upload handling for pre-assessment',
          'Clear treatment comparison guides (Invisalign vs. Fixed Braces)'
        ],
        liveDemoNote: 'Concept blueprint demonstrating orthodontic assessment portals.',
      },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'Ecommerce Brands & DTC',
    label: 'COMMERCE ARCHITECTURE & REVENUE OPTIMIZATION',
    title: 'High-Performance Ecommerce Stores Engineered for High AOV & Retention.',
    summary: 'Modern digital storefronts, conversion-focused product experiences, and retention engines for ambitious direct-to-consumer (DTC) and omnichannel retail brands in the UK and US. We build on Shopify Plus and headless architectures to maximise checkout completion and customer lifetime value.',
    color: 'orange',
    visual: 'commerce',
    image: images.commerce,
    problem: 'Most ecommerce stores are weighed down by dozens of conflicting third-party Shopify apps, sluggish page speeds exceeding 4 seconds, and friction-filled mobile checkouts. When mobile conversion rates languish below 1.5%, rising customer acquisition costs (CAC) erode gross margins and make paid advertising unsustainable.',
    approach: 'We rebuild ecommerce stores from the ground up for speed, storytelling, and average order value (AOV) expansion. By implementing clean custom theme code or headless architectures, custom bundle builders, and one-click post-purchase upsells, we turn first-time visitors into repeat brand advocates with lightning-fast sub-second browsing.',
    deliverables: [
      'Bespoke Shopify Plus / Headless Commerce Development',
      'Sub-Second Product Detail Page & Collection Filtering Architecture',
      'Custom Product Bundle Builders, Upsell Flows & AOV Expansion Modules',
      'Mobile-First Checkout Optimization & Apple Pay / Shop Pay Express Integration',
      'Klaviyo Email & SMS Lifecycle Marketing Automation Workflows',
      'Comprehensive Ecommerce SEO',
      'Zero Bloat Code Refactoring: Replaced Slow Third-Party Apps with Native Logic',
      'Full Git Repository Access, Store Ownership Transfer & 30-Day Defect Warranty',
    ],
    outcomes: [
      'Measurable lift in mobile checkout conversion rate and average order value',
      'Sub-second collection and product page load speeds that reduce bounce rates',
      'Substantial reduction in monthly app subscription fees through native code',
      'Higher organic search rankings with Google Merchant Center rich product snippets',
    ],
    questions: [
      {
        q: 'Can you migrate our store to Shopify Plus without losing our existing customer accounts and SEO?',
        a: 'Yes. We manage zero-downtime ecommerce migrations from WooCommerce, Magento, or custom carts to Shopify Plus. We migrate all customer histories, order logs, product SKUs, and reviews while implementing rigorous 301 redirect maps to preserve every ounce of existing search ranking equity.',
      },
      {
        q: 'How do you increase our average order value (AOV) without annoying our customers?',
        a: 'We engineer intuitive, value-driven upsell mechanics: custom bundle builders with tiered savings, intelligent cart drawer cross-sells based on cart contents, and friction-free post-purchase one-click upsells that never interrupt the primary checkout flow.',
      },
      {
        q: 'Why should we replace third-party Shopify apps with bespoke native code?',
        a: 'Third-party Shopify apps inject excessive third-party JavaScript scripts that slow down mobile page rendering, conflict with each other, and incur thousands in recurring monthly subscription fees. By hardcoding native functionality (drawers, bundles, size charts), your store loads in under 1.2 seconds and costs far less to run.',
      },
      {
        q: 'Can you build custom subscription and recurring billing features into our store?',
        a: 'Yes. We integrate Shopify Subscriptions and Recharge API directly into product pages, allowing customers to easily subscribe, customize delivery frequencies, and manage their recurring orders with seamless customer portal controls.',
      },
      {
        q: 'Who owns the custom theme code and store assets after deployment?',
        a: 'You own 100% of all theme code, custom scripts, visual assets, and marketing automations upon project completion. We provide full Git repository access with zero ongoing licensing fees.',
      },
    ],
    techStack: [
      {
        category: 'Storefront & Frontend',
        items: ['Shopify Plus / Liquid', 'Next.js Commerce', 'Tailwind CSS', 'TypeScript'],
      },
      {
        category: 'Commerce & Checkout',
        items: ['Shopify Checkout Extensibility', 'Shop Pay / Apple Pay', 'Stripe API', 'Recharge Subscriptions'],
      },
      {
        category: 'Retention & Email',
        items: ['Klaviyo Customer Journeys', 'Gorgias Helpdesk API', 'Yotpo Reviews API', 'Postscript SMS'],
      },
      {
        category: 'Search & Infrastructure',
        items: ['Product JSON-LD Schema', 'Algolia / Klevu Search', 'Cloudflare CDN', 'Google Merchant Feed'],
      },
    ],
    milestones: [
      {
        phase: 'Sprint 01',
        title: 'Commercial Audit & PDP Strategy',
        timeline: 'Week 1',
        description: 'Analyze existing funnel drop-offs, app overhead, and mobile shopping friction.',
      },
      {
        phase: 'Sprint 02',
        title: 'Bespoke UI/UX & Upsell Architecture',
        timeline: 'Week 2',
        description: 'Design custom product page layouts, bundle selectors, and cart drawer mechanics.',
      },
      {
        phase: 'Sprint 03',
        title: 'Clean-Code Development Sprint',
        timeline: 'Weeks 3-4',
        description: 'Develop native Liquid or headless store, replace slow apps with bespoke JavaScript, and calibrate speed.',
      },
      {
        phase: 'Sprint 04',
        title: 'Checkout Testing & Klaviyo Integration',
        timeline: 'Week 5',
        description: 'Configure Checkout Extensibility, connect abandoned checkout email triggers, and test payment gateways.',
      },
      {
        phase: 'Sprint 05',
        title: 'Launch, Zero-Downtime Migration & Handover',
        timeline: 'Week 6',
        description: 'Execute seamless DNS cutover, preserve SEO URL redirects, and transfer full theme code ownership.',
      },
    ],
    metrics: [
      { label: 'Funnel Optimization', value: 'Streamlined', detail: 'Mobile-first catalog navigation and express checkout' },
      { label: 'Performance Target', value: '< 1.2s Target', detail: 'Lightweight responsive store architecture' },
      { label: 'Custom Merchandising', value: 'Native', detail: 'Custom bundle builder and dynamic cross-sell UI' },
      { label: 'Search Architecture', value: 'Rich Snippets', detail: 'Comprehensive Product, Offer, and Review schema' },
    ],
    complianceGuarantees: [
      'PCI-DSS Level 1 compliant secure checkout processing via Shopify / Stripe',
      'UK Consumer Rights Act 2015 & US FTC online commerce truth-in-advertising compliance',
      'GDPR, CCPA & PECR compliant cookie management and marketing opt-in consent records',
      'Zero app lock-in: clean native code eliminating recurring monthly SaaS subscription drag',
      '100% store ownership, code handover, and admin transfer with zero agency retainers required',
    ],
    projects: [
      {
        id: 'design-furniture-commerce-concept',
        title: 'Artisanal Luxury Furniture Commerce Platform',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'High-Ticket Luxury DTC',
        badge: 'Concept Project',
        summary: 'High-end homeware and furniture storefront concept built on headless Shopify Plus.',
        description: 'Features room-scale swatch visualizers, custom dimensions configurators, and white-glove delivery scheduling.',
        image: images.ecommerceFashion,
        tags: ['Shopify Plus', 'Swatch Selector', 'Freight Calculation', 'Native Upsells'],
        metrics: [
          { label: 'Swatch UX', value: 'Instant Preview', detail: 'Zero-latency fabric and finish switching' },
          { label: 'Cart Drawer', value: 'Native Code', detail: 'Custom dimension calculation in cart' },
          { label: 'Delivery Spec', value: 'Postcode Lookup', detail: 'Direct freight zone validation' }
        ],
        features: [
          'Sub-second material swatch visualizer without page reloading',
          'Custom room dimension and scale verification calculators',
          'Dynamic freight zone lookup and white-glove delivery bookings',
          'Clean native checkout flow replacing expensive third-party apps'
        ],
        liveDemoNote: 'Concept blueprint demonstrating high-ticket luxury DTC commerce.',
      },
      {
        id: 'botanicals-dtc-store-concept',
        title: 'Clean Beauty & Skincare Direct-to-Consumer Engine',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Fast-Moving Beauty & Skincare',
        badge: 'Concept Project',
        summary: 'High-converting skincare storefront concept with skin-type diagnostic quiz flows.',
        description: 'Demonstrates personalized regimen builders, subscription management, and ingredient transparency accordions.',
        image: images.ecommerceWellness,
        tags: ['Skincare Quiz', 'Subscription Hub', 'INCI Transparency', 'Mobile First'],
        metrics: [
          { label: 'Quiz Engine', value: 'Skin Diagnostics', detail: 'Dynamic personalized product bundle curation' },
          { label: 'Subscriptions', value: 'Native Customer Hub', detail: 'Self-service replenishment scheduling' },
          { label: 'Ingredients', value: 'Transparent Data', detail: 'Detailed INCI formula disclosure tabs' }
        ],
        features: [
          'Dynamic multi-step diagnostic skin quiz with tailored routine curation',
          'Frictionless replenishment subscription portal (pause, skip, swap)',
          'Expandable ingredient transparency accordions on every product page',
          'High-speed mobile checkout flow optimized for repeat orders'
        ],
        liveDemoNote: 'Concept blueprint demonstrating clean beauty D2C storefronts.',
      },
      {
        id: 'activewear-store-architecture-concept',
        title: 'Athletic Apparel Headless Commerce Experience',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Omnichannel Apparel & Fitness',
        badge: 'Concept Project',
        summary: 'Scalable athletic wear ecommerce concept engineered for high-traffic drop days.',
        description: 'Demonstrates edge-cached inventory, instant size recommendation modals, and rapid checkout integration.',
        image: images.ecommerceLifestyle,
        tags: ['Headless Shopify', 'High Concurrency', 'Size Recommender', 'Rapid Checkout'],
        metrics: [
          { label: 'Edge Caching', value: 'Catalogue at Edge', detail: 'Instant page flips under heavy concurrency' },
          { label: 'Sizing Tool', value: 'Dynamic Memory', detail: 'Client-side dimension profile persistence' },
          { label: 'Payment Flow', value: 'Express Wallets', detail: 'Direct Apple Pay and Google Pay integration' }
        ],
        features: [
          'Edge-cached product catalogue architecture ensuring zero drop-day downtime',
          'Interactive size recommendation engine with local browser persistence',
          'One-tap mobile digital wallet express checkout (Apple Pay, Google Pay)',
          'Automated back-in-stock notification system integration'
        ],
        liveDemoNote: 'Concept blueprint demonstrating high-speed apparel commerce.',
      },
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional & B2B Services',
    label: 'AUTHORITY & QUALIFIED LEAD GENERATION ARCHITECTURE',
    title: 'Credible Websites, Commercial SEO & Lead Systems for Advisory Firms.',
    summary: 'Authoritative digital platforms and lead generation engines for management consultants, corporate law firms, chartered accountants, and commercial advisory practices in the UK and US. We turn high-net-worth commercial decision-makers into retained clients.',
    color: 'violet',
    visual: 'team',
    image: images.team,
    problem: 'Professional advisory services are complex, high-ticket, and relationship-driven. When corporate decision-makers research firms, dated websites with generic stock photos, dense legal jargon, and no clear value proposition fail to inspire confidence. Over 70% of B2B buyers conduct extensive digital due diligence before making contact—firms with invisible search footprints lose marquee corporate mandates to modern competitors.',
    approach: 'We position your firm as the undisputed authority in your practice area. Combining institutional-grade visual elegance with deep E-E-A-T content strategy, senior partner profiles, and streamlined consultation booking, we build digital platforms that establish credibility before the first introductory call takes place.',
    deliverables: [
      'Institutional-Grade Corporate Website Engineering',
      'Thought Leadership & E-E-A-T Authority Content Publishing Hub',
      'Partner & Specialist Directory with Practice Area Filterable Capabilities',
      'Commercial B2B SEO Strategy',
      'Automated Client Intake & Conflict-Free Consultation Booking Workflows',
      'Interactive Fee Calculators & Proposal Request Scoping Modules',
      'ProfessionalService & Organization Schema.org Structured Metadata',
      'Full Git Repository Transfer, 100% IP Code Ownership & 30-Day Defect Warranty',
    ],
    outcomes: [
      'Substantial increase in qualified institutional and corporate consultation requests',
      'Immediate credibility enhancement during buyer due diligence and investor reviews',
      'Top-tier Google visibility for lucrative advisory and corporate specialization keywords',
      'Frictionless lead routing directly to senior partners and practice directors',
    ],
    questions: [
      {
        q: 'Can you work within strict legal and regulatory compliance guidelines (SRA, Bar Rules, FCA)?',
        a: 'Yes. We frequently build platforms for regulated professional practices including law firms, wealth managers, and chartered accountancies. We ensure strict adherence to UK Solicitors Regulation Authority (SRA) transparency rules, Bar Standards, and FCA financial promotion regulations, incorporating required fee information, complaints procedures, and credential verifications.',
      },
      {
        q: 'How does a new website help us attract high-ticket retainer clients rather than price-sensitive shoppers?',
        a: 'We design your platform around institutional buyer psychology. By publishing rigorous, data-backed case studies, clear practice specializations, and authoritative E-E-A-T whitepapers, we filter out low-value inquiries and attract corporate executives seeking specialist expertise.',
      },
      {
        q: 'Can the site connect with our existing CRM and practice management platforms (HubSpot, Salesforce)?',
        a: 'Yes. We integrate secure consultation intake forms directly into HubSpot, Salesforce, Clio, or your firm\'s proprietary CRM. Submissions are tagged by practice area and routed instantly to the relevant partner with conflict-of-interest preliminary checks.',
      },
      {
        q: 'How do you structure thought leadership and case studies to highlight our firm’s expertise?',
        a: 'We engineer dedicated knowledge hubs categorized by industry and regulatory topic. Each article features Author Schema attributing analysis to verified senior partners, downloadable briefing notes, and related partner bios, establishing undeniable authority in Google search and client due diligence.',
      },
      {
        q: 'Who owns the website code, design files, and written content after launch?',
        a: 'Your firm retains 100% legal ownership of all custom codebase files, design assets, and written content upon final project sign-off. We provide complete Git repository transfers with zero ongoing agency retainers or proprietary platform lock-in.',
      },
    ],
    techStack: [
      {
        category: 'Corporate Web Engineering',
        items: ['React 19 / TypeScript', 'Next.js / SSR', 'Tailwind CSS', 'Vite'],
      },
      {
        category: 'Intake & CRM Systems',
        items: ['HubSpot Enterprise', 'Salesforce CRM API', 'Calendly / Chili Piper', 'Custom Encrypted Intake'],
      },
      {
        category: 'B2B Search & Authority',
        items: ['ProfessionalService Schema', 'Person / Author JSON-LD', 'Ahrefs Enterprise', 'Google Search Console'],
      },
      {
        category: 'Security & Compliance',
        items: ['SOC2 Certified Hosting', 'Enterprise SSL 256-bit', 'UK SRA / US Bar Rule Alignment', 'AWS / Vercel'],
      },
    ],
    milestones: [
      {
        phase: 'Sprint 01',
        title: 'Practice Discovery & Positioning Strategy',
        timeline: 'Week 1',
        description: 'Define core practice areas, target corporate client personas, and fee mandate goals.',
      },
      {
        phase: 'Sprint 02',
        title: 'Information Architecture & Wireframing',
        timeline: 'Week 2',
        description: 'Structure authority content hubs, practice area capabilities, and partner bio directories.',
      },
      {
        phase: 'Sprint 03',
        title: 'Enterprise Development Sprint',
        timeline: 'Weeks 3-4',
        description: 'Build clean, accessible web components with sub-second speeds and secure consultation intake.',
      },
      {
        phase: 'Sprint 04',
        title: 'E-E-A-T Optimization & SEO Launch',
        timeline: 'Week 5',
        description: 'Implement Organization Schema, author attribution, and rank-tracking for key commercial queries.',
      },
      {
        phase: 'Sprint 05',
        title: 'Security Review & Code Handover',
        timeline: 'Week 6',
        description: 'Conduct thorough security testing, client portal verification, and transfer 100% IP code ownership.',
      },
    ],
    metrics: [
      { label: 'Commercial Inquiry Flow', value: 'Lead Capture', detail: 'Tailored intake funnels for high-ticket instructions' },
      { label: 'Authority Presentation', value: 'Partner Bios', detail: 'Structured credentials, practice areas, and team depth' },
      { label: 'Organic Visibility', value: 'Practice Areas', detail: 'Siloed URL architecture for corporate practice specialties' },
      { label: 'Accessibility Standard', value: 'WCAG 2.1 AA', detail: 'Compliant typography hierarchy and high-contrast design' },
    ],
    complianceGuarantees: [
      'Alignment with UK Solicitors Regulation Authority (SRA) and US State Bar advertising rules',
      'Strict compliance with UK Financial Conduct Authority (FCA) and SEC financial promotion standards',
      'Comprehensive client data confidentiality protected under enforceable mutual NDAs',
      'UK/EU GDPR and US CCPA compliant data handling, encryption, and privacy controls',
      'Full transfer of 100% intellectual property rights, code repositories, and branding assets',
    ],
    projects: [
      {
        id: 'corporate-legal-practice-concept',
        title: 'Tier-1 Commercial Law Digital Presence',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Corporate Legal Services',
        badge: 'Concept Project',
        summary: 'Authoritative digital presence concept for corporate law firms and commercial partnerships.',
        description: 'Features searchable partner directories, sector-specific insight libraries, and encrypted enquiry channels.',
        image: images.legalCorporate,
        tags: ['Legal Authority', 'Partner Directory', 'Encrypted Intake', 'Practice Silos'],
        metrics: [
          { label: 'Directory UX', value: 'Fast Search', detail: 'Instant partner filtering by practice and sector' },
          { label: 'Security Standard', value: 'Encrypted Form', detail: 'Air-gapped confidential initial consultation intake' },
          { label: 'Editorial Voice', value: 'Executive Tier', detail: 'Structured legal briefing and alert layouts' }
        ],
        features: [
          'Comprehensive searchable partner and fee-earner directory',
          'Practice area topic hubs with downloadable legal briefing memos',
          'Confidential initial consultation intake form with data encryption',
          'Clear professional regulatory disclosures (SRA / Bar standards)'
        ],
        liveDemoNote: 'Concept blueprint demonstrating corporate law digital presence.',
      },
      {
        id: 'strategic-advisory-platform-concept',
        title: 'Enterprise Management Consulting Platform',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Management Consulting',
        badge: 'Concept Project',
        summary: 'Corporate advisory and consulting digital portal concept for enterprise engagements.',
        description: 'Demonstrates proprietary framework visualizers, industry benchmark report downloads, and partner bios.',
        image: images.consultingAdvisory,
        tags: ['Consulting Hub', 'Benchmark Reports', 'Framework Visuals', 'Enterprise Leads'],
        metrics: [
          { label: 'Research UX', value: 'Gated Reports', detail: 'Automated executive whitepaper delivery' },
          { label: 'Frameworks', value: 'Interactive Models', detail: 'Clear step-by-step transformation diagrams' },
          { label: 'Performance', value: '< 1.0s LCP Target', detail: 'Fast global content delivery for mobile executives' }
        ],
        features: [
          'Interactive business transformation framework diagrams',
          'Gated research and industry benchmark report download pathways',
          'Partner bios highlighting specific cross-border transaction experience',
          'Fast, accessible interface designed for Fortune 1000 executives'
        ],
        liveDemoNote: 'Concept blueprint demonstrating management consulting web platforms.',
      },
      {
        id: 'chartered-tax-advisory-concept',
        title: 'Corporate Tax & Financial Advisory Engine',
        conceptType: 'Illustrative Technical Blueprint',
        client: 'Concept Blueprint',
        category: 'Chartered Accountancy & Tax',
        badge: 'Concept Project',
        summary: 'Corporate tax consultancy and audit scheduling platform concept.',
        description: 'Features corporate tax calculation tools, R&D tax credit eligibility checkers, and direct partner appointment booking.',
        image: images.accountingTax,
        tags: ['Tax Advisory', 'Calculator Tools', 'R&D Tax Credits', 'Pre-Qualified Booking'],
        metrics: [
          { label: 'Calculator Tools', value: 'Client-Side Logic', detail: 'Instant corporate tax and relief estimates' },
          { label: 'Compliance Disclosures', value: 'Clear Standards', detail: 'Prominent regulatory and statutory disclaimers' },
          { label: 'Consultation Flow', value: 'Pre-Qualified Form', detail: 'Collects company size and sector context upfront' }
        ],
        features: [
          'Client-side interactive corporate tax and relief eligibility estimators',
          'Prominent statutory tax and financial disclaimer disclosures',
          'Pre-qualified corporate consultation booking forms',
          'Structured accountancy service pages aligned with HMRC & IRS standards'
        ],
        liveDemoNote: 'Concept blueprint demonstrating corporate tax advisory portals.',
      },
    ],
  },
];
export const process = [
  { title: 'Discover', text: 'Understand your business, audience and the obstacles between you and your goals.' },
  { title: 'Define', text: 'Agree a focused strategy, clear scope and meaningful ways to measure progress.' },
  { title: 'Create', text: 'Design, build and connect the experience—with feedback at every key milestone.' },
  { title: 'Improve', text: 'Launch carefully, review the evidence and keep refining what matters.' },
];
export const faqs = [
  { q: 'Do you work with businesses in both the US and UK?', a: 'Yes. Klyro Works serves businesses across the United States and United Kingdom. We adapt content, terminology and digital journeys to your market and arrange collaboration around your team with dual registered entities in London and the US.' },
  { q: 'Who owns the intellectual property and code of our website?', a: 'You do. Upon full settlement of project milestones, all custom design files, bespoke frontend code, and written assets created specifically for your project transfer 100% to your company. We provide complete code handover with zero vendor lock-in.' },
  { q: 'How do you ensure GDPR, CCPA, and privacy compliance?', a: 'Every website we deliver incorporates privacy-by-design: explicit consent mechanisms on lead forms, accessible cookie preference centers, data minimization, and transparent privacy disclosures adhering strictly to UK GDPR, EU GDPR, and US CCPA/CPRA regulations.' },
  { q: 'Do you sign Non-Disclosure Agreements (NDAs)?', a: 'Yes. We routinely execute mutual NDAs prior to in-depth technical audits, proprietary workflow mapping, or reviewing confidential commercial roadmaps.' },
  { q: 'How much does a project cost and how are payments structured?', a: 'Pricing is scoped transparently based on your deliverables, custom integrations, and complexity. Fixed-scope projects are billed in structured milestones (initial deposit, development milestones, and final launch). We invoice in your local currency (USD $ or GBP £).' },
  { q: 'Can we start with just one service?', a: 'Absolutely. We frequently begin with a focused website redesign, an SEO technical audit, or a targeted AI lead qualification workflow, scaling up as your business needs grow.' },
  { q: 'Do you guarantee rankings, leads or revenue?', a: 'No. In alignment with FTC and UK Advertising Standards (CAP Code) rules, we do not make algorithmic or revenue guarantees that depend on third-party search engines or market conditions. We establish measurable KPIs, implement proven strategies, and provide transparent reporting.' },
  { q: 'What happens after launch?', a: 'Every build includes a 30-day post-launch warranty for bug fixes. We also offer ongoing maintenance, search optimization retainers, and workflow enhancements to support your internal team.' },
];
export const articles = [
  { slug: 'conversion-focused-website', category: 'WEBSITE STRATEGY', title: 'What makes a website conversion-focused?', intro: 'A strong website is not just a visual statement. It helps the right visitor understand your offer and take a confident next step.', visual: 'property', sections: [{ title: 'Start with a specific customer journey', text: 'Choose the action each important page should support: a property enquiry, a treatment consultation or a conversation about a professional service. Map the questions a visitor needs answered before that action. A clear journey is more valuable than filling the page with competing buttons.' }, { title: 'Make your offer easy to understand', text: 'Explain who you help, what you provide and what happens next. Use descriptive headings and useful examples. Show real evidence where it exists, but never substitute fabricated reviews or statistics for a clear explanation of your service.' }, { title: 'Remove friction on mobile', text: 'Test navigation, reading, forms and primary actions on small screens. Keep labels visible, fields relevant and errors understandable. Avoid collecting information that your team does not need for an initial enquiry.' }, { title: 'Measure the actions that matter', text: 'Define meaningful conversions and check that tracking works with your consent requirements. Review enquiry quality as well as volume. Use those observations to prioritise changes rather than assuming every design choice needs a complete rebuild.' }] },
  { slug: 'local-seo-for-service-businesses', category: 'SEARCH & VISIBILITY', title: 'Local SEO starts with useful, accurate information.', intro: 'For local service businesses, visibility depends on helping people understand what you do, where you work and why your business is relevant to their needs.', visual: 'dental', sections: [{ title: 'Keep your business details consistent', text: 'Review your business name, contact information, opening hours and service areas across your website and business profiles. Avoid claiming offices or locations you do not have. Accuracy supports both customer trust and reliable discovery.' }, { title: 'Build pages around genuine needs', text: 'A useful service page explains the service, the audience and the enquiry process. Location content should add real local value, not repeat the same paragraph with a different city name. Dental practices should have clinical copy reviewed by their qualified team.' }, { title: 'Resolve technical obstacles', text: 'Check that important pages can be indexed, links work and the mobile experience is usable. Clear heading structure, descriptive titles and sensible internal links help people and search engines understand your content.' }, { title: 'Review progress honestly', text: 'Search positions vary by location, competition and time. Track relevant traffic, enquiries and the usefulness of your pages. Local SEO is an ongoing practice, not a guaranteed route to a particular ranking.' }] },
  { slug: 'first-business-automation', category: 'AI & AUTOMATION', title: 'How to choose your first business automation.', intro: 'The best first automation is usually a small, repeatable task with clear rules—not the most ambitious AI idea in the room.', visual: 'team', sections: [{ title: 'Find the repetitive handoff', text: 'Look for work that involves copying information, routing an enquiry or sending a predictable follow-up. Map the current process with the people who use it. Identify exceptions before choosing a tool.' }, { title: 'Define what should stay human', text: 'Sensitive decisions, complex customer questions and uncertain outputs need a clear human handoff. Automation should assist your team, not quietly remove accountability. Decide who can pause the workflow and review its activity.' }, { title: 'Minimise the data involved', text: 'Only pass the information needed for the task. Review permissions, retention and the vendor arrangements for every connected system. Avoid introducing sensitive personal information into a general marketing workflow.' }, { title: 'Test the unhappy paths', text: 'Check incomplete enquiries, duplicate records, unavailable integrations and unclear AI outputs. Start with a controlled rollout, document ownership and monitor whether the workflow actually saves useful effort.' }] },
  {
    slug: 'geo-and-ai-search-ranking',
    category: 'AI SEARCH & SEO',
    title: 'Generative Engine Optimization (GEO): How to Rank in AI Overviews & ChatGPT.',
    intro: 'Search is shifting from a list of blue links to synthesized AI answers. Discover how UK and US businesses structure content to earn citations in Google AI Overviews, Perplexity, and ChatGPT Search.',
    visual: 'seo',
    sections: [
      {
        title: 'Understand Information Gain & Direct Answer Extraction',
        text: 'Large language models do not regurgitate keyword-stuffed summaries. They index authoritative, high-density passages containing unique data points, verified methodology, and concrete trade-offs. To earn citations in AI syntheses, every service page must deliver unambiguous answers to high-intent questions within the first 100 words of each section.',
      },
      {
        title: 'Deploy Multi-Layered Schema.org Markup for Entity Verification',
        text: 'AI models rely heavily on knowledge graphs. Implementing comprehensive Schema.org JSON-LD (Organization, Service, FAQPage, MedicalBusiness, RealEstateAgent, and Author profiles) bridges the gap between unstructured HTML and machine-readable facts. Validated schema establishes undeniable entity consensus across your brand ecosystem.',
      },
      {
        title: 'Dismantle Fluff: Write for Procurement & Technical Due Diligence',
        text: 'Generative engines reward clarity and actionable specifics. Replace vague claims like "best-in-class results" with contract-grade deliverables, timeline milestones, and verifiable metrics. When search models detect original research and transparent scope boundaries, your website is recognized as a definitive primary citation.',
      },
      {
        title: 'Combine Speed with Server-Side Rendering (SSR)',
        text: 'AI web crawlers (such as GPTBot, ClaudeBot, and Google-Extended) operate on strict execution budgets. Client-heavy single-page apps that require seconds of JavaScript hydration often get truncated or skipped. Building on sub-second server-side rendered architectures guarantees full content ingestion on every crawl pass.',
      },
    ],
  },
  {
    slug: 'core-web-vitals-business-impact',
    category: 'TECHNICAL PERFORMANCE',
    title: 'Why Sub-Second Page Speed is Your Greatest Growth Advantage.',
    intro: 'Every 100ms of latency costs commercial websites conversion rate and organic search ranking. Here is why high-performance engineering outperforms bloated page builders.',
    visual: 'web',
    sections: [
      {
        title: 'The Real Cost of Slow Mobile Rendering',
        text: 'Google research consistently reveals that 53% of mobile visitors abandon a website that takes longer than 3 seconds to load. Beyond bounce rates, slow Largest Contentful Paint (LCP) directly suppresses your Google Search ranking through the Core Web Vitals ranking signal. Speed is not a luxury—it is the gatekeeper of user attention.',
      },
      {
        title: 'Why Generic Page Builders Fail at Scale',
        text: 'Traditional site builders and bloated WordPress themes bundle dozens of unused CSS libraries, render-blocking scripts, and nested DOM elements. A custom-engineered React or Next.js build eliminates up to 80% of unused JavaScript, ensuring browsers render interactive content in under 1.2 seconds.',
      },
      {
        title: 'Optimizing Interaction to Next Paint (INP)',
        text: 'Google’s modern Core Web Vital metric, INP, evaluates visual responsiveness when users click buttons, open mobile menus, or expand accordions. Keeping main-thread JavaScript execution lean prevents input freezing and ensures frictionless browsing that converts high-intent prospects.',
      },
      {
        title: 'Measurable Commercial Return of Clean Engineering',
        text: 'Faster websites convert higher. In case study after case study across real estate, healthcare, and ecommerce, reducing mobile load time from 4.5 seconds to 1.1 seconds yields measurable 30%+ improvements in consultation requests and online checkouts, without increasing advertising spend by a single pound or dollar.',
      },
    ],
  },
];
