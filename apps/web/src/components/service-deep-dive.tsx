import {
  ShieldCheck,
  Cpu,
  Layers,
  Code2,
  Database,
  Zap,
  Milestone,
  Video,
  MonitorCheck,
  MessageSquare,
  BadgeCheck,
  ArrowUpRight,
} from 'lucide-react';
import { type Offering } from '@/data/site';
import { useConsultationModal } from '@/components/consultation-modal';

const defaultDescriptions: Record<string, string> = {
  'Frontend & Architecture': 'Clean-code, component-driven interfaces engineered for speed, responsive fluidity, and zero bloated page builder scripts.',
  'CMS & Backend Options': 'Flexible, decoupled content management empowering your marketing team with intuitive editing and air-gapped security.',
  'Speed & Infrastructure': 'Global edge distribution, modern media pipelines, and sub-second server rendering for instant page transitions worldwide.',
  'Compliance & Security': 'Engineered from day one to satisfy WCAG 2.1 AA accessibility guidelines, UK/EU GDPR consent, and US data protection standards.',
  'Technical Crawl & Diagnostics': 'Comprehensive site health checks, deep bot crawling simulations, and server log analysis to identify indexing barriers.',
  'Search Intelligence & Intent': 'High-intent search gap analysis and query clustering to capture buyers actively evaluating commercial solutions.',
  'Structured Data & Semantics': 'Precision Schema.org JSON-LD architectures delivering enhanced search snippet visibility and rich entity understanding.',
  'Analytics & Reporting': 'Cookieless-ready attribution modeling, real-time Looker Studio dashboards, and verified multi-touch tracking.',
  'Ad Networks & Platforms': 'Multi-platform campaign orchestration spanning Google Search, Performance Max, Microsoft Ads, and LinkedIn.',
  'Tracking & Measurement': 'Server-side tracking, verified conversion APIs, and real-time attribution modeling to eliminate signal loss.',
  'CRO & Experience Testing': 'Behavioral heatmaps, session recording telemetry, and empirical A/B experimentation to maximize conversion value.',
  'Market Intelligence': 'Continuous competitive bidding surveillance and auction insight analysis to identify high-converting market arbitrage.',
  'AI Models & Structured APIs': 'State-of-the-art LLM endpoints with deterministic JSON schemas for reliable operational workflows.',
  'Middleware & Orchestration': 'Resilient event-driven microservices and webhook pipelines ensuring dependable data handoffs.',
  'CRMs & Databases': 'Two-way synchronized data pipelines connecting CRM systems, relational databases, and client portals.',
  'Security & Reliability': 'Automated data sanitization, encrypted credential vaults, and real-time failure alerting.',
  'Design & Prototyping': 'High-fidelity Figma prototypes and user journeys verified through real stakeholder usability tests.',
  'Design Systems & Tokens': 'Modular component libraries and semantic design tokens ensuring cross-platform visual consistency.',
  'Usability & Research': 'Quantitative heatmaps, task-completion tracking, and recorded user sessions to validate UX decisions.',
  'Accessibility & QA': 'Automated and manual audits verifying contrast ratios, keyboard navigation, and full WCAG compliance.',
  'Behavioral Analytics & Heatmaps': 'Deep scroll depth analysis, attention heatmaps, and funnel drop-off telemetry.',
  'A/B & Multivariate Testing': 'Statistically rigorous split testing across value propositions, layouts, and checkout flows.',
  'Performance & Core Web Vitals': 'Continuous monitoring of LCP, INP, and CLS metrics under simulated real-world conditions.',
  'Compliance & Privacy-Safe Telemetry': 'Consent-aware measurement frameworks honoring international data privacy regulations.',
  'Search Intent & Topic Clustering': 'Keyword intent mapping addressing exact decision-stage queries of prospective buyers.',
  'Editorial & Quality Standards': 'Rigorous peer review, factual verification, and brand voice guidelines across all copy.',
  'Semantic & Schema Markup': 'Structured content hierarchies and semantic microdata optimized for AI engines and rich snippets.',
  'Attribution & Content Analytics': 'Content revenue attribution mapping user engagement directly to qualified pipeline generation.',
  'Property & Search Engine': 'High-speed property indexing, interactive spatial search, and automated listing synchronization.',
  'Feeds & CRM Interop': 'Seamless integration with industry CRM APIs, automated lead routing, and instant client notifications.',
  'Local SEO & Schema': 'Geographical structured data, local entity optimization, and multi-branch search dominance.',
  'Patient UI & Experience': 'Frictionless patient booking journeys, accessible contrast ratios, and reassuring medical clarity.',
  'Clinical Integration': 'Compliant intake flows connecting directly with practice management software and clinical records.',
  'Healthcare SEO & Schema': 'Medical clinic Schema markup and local search signals engineered to drive verified appointments.',
  'Storefront & Frontend': 'Lightweight headless commerce storefronts delivering instant product catalog browsing.',
  'Commerce & Checkout': 'One-click checkout integrations, localized currency processing, and subscription billing logic.',
  'Retention & Email': 'Automated lifecycle messaging, behavioral abandonment flows, and customer loyalty retention.',
  'Corporate Web Engineering': 'Robust multi-region hosting, zero-downtime deployment pipelines, and SOC-2 compliant practices.',
  'Intake & CRM Systems': 'Enterprise lead capture with qualification routing, enrichment, and CRM synchronization.',
  'B2B Search & Authority': 'Authoritative thought leadership architecture built to capture enterprise executive search volume.',
};

function getCategoryIcon(category: string) {
  const lower = category.toLowerCase();
  if (
    lower.includes('frontend') ||
    lower.includes('architecture') ||
    lower.includes('engineering') ||
    lower.includes('design') ||
    lower.includes('storefront') ||
    lower.includes('ui') ||
    lower.includes('prototype')
  ) {
    return <Code2 size={18} className="tech-card-icon" />;
  }
  if (
    lower.includes('cms') ||
    lower.includes('backend') ||
    lower.includes('database') ||
    lower.includes('crm') ||
    lower.includes('feed') ||
    lower.includes('integration') ||
    lower.includes('middleware') ||
    lower.includes('model') ||
    lower.includes('api')
  ) {
    return <Database size={18} className="tech-card-icon" />;
  }
  if (
    lower.includes('speed') ||
    lower.includes('infrastructure') ||
    lower.includes('performance') ||
    lower.includes('crawl') ||
    lower.includes('retention') ||
    lower.includes('network') ||
    lower.includes('testing')
  ) {
    return <Zap size={18} className="tech-card-icon" />;
  }
  if (
    lower.includes('compliance') ||
    lower.includes('security') ||
    lower.includes('privacy') ||
    lower.includes('qa') ||
    lower.includes('accessibility') ||
    lower.includes('standards') ||
    lower.includes('seo') ||
    lower.includes('search') ||
    lower.includes('audit')
  ) {
    return <ShieldCheck size={18} className="tech-card-icon" />;
  }
  return <Layers size={18} className="tech-card-icon" />;
}

export function ServiceDeepDive({ item }: { item: Offering }) {
  const { openModal } = useConsultationModal();

  if (!item.techStack && !item.milestones && !item.metrics) {
    return null;
  }

  return (
    <section
      className="section service-deep-dive-section"
      aria-label="Technical Specifications and Delivery Methodology"
    >
      {/* 1. Impact Metrics Strip */}
      {item.metrics && item.metrics.length > 0 && (
        <div className="service-metrics-strip">
          <div className="metrics-grid">
            {item.metrics.map((m, idx) => {
              const themes = ['green', 'cyan', 'violet', 'amber'];
              const theme = themes[idx % themes.length];
              return (
                <div key={m.label} className={`metric-box theme-${theme}`}>
                  <div className="metric-heading-wrap">
                    <span className="metric-highlight-title">{m.label}</span>
                  </div>
                  <div className="metric-value-row">
                    <span className="metric-simple-val">{m.value}</span>
                  </div>
                  <p className="metric-detail">{m.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Architecture & Technology Ecosystem */}
      {item.techStack && item.techStack.length > 0 && (
        <div className="tech-stack-container">
          <div className="section-subheading">
            <span className="eyebrow">
              <Cpu size={12} className="inline-icon" /> MODERN ENGINEERING
            </span>
            <h2>
              The Architecture Behind <span>High-Converting Digital Assets</span>
            </h2>
            <p>
              We don’t use fragile third-party templates or bloated page builders. Every platform is custom-built with production-grade engineering principles for peak speed, security, and scalability.
            </p>
          </div>

          <div className="tech-stack-grid">
            {item.techStack.map((cat) => (
              <div key={cat.category} className="tech-stack-card">
                <div className="tech-card-header">
                  <div className="tech-icon-circle">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3>{cat.category}</h3>
                </div>
                <p className="tech-card-desc">
                  {cat.description ||
                    defaultDescriptions[cat.category] ||
                    'Custom engineered architecture built to enterprise standards for high reliability, security, and conversion impact.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Redesigned Transparent Milestones Section */}
      {item.milestones && item.milestones.length > 0 && (
        <div className="roadmap-container-redesign" id="milestones">
          <div className="roadmap-header-center">
            <span className="eyebrow roadmap-eyebrow">
              <Milestone size={12} className="inline-icon" /> AGILE SPRINT FRAMEWORK
            </span>
            <h2 className="roadmap-title">
              Transparent Milestones.<br />
              <span>Zero Black Boxes.</span>
            </h2>
            <p className="roadmap-lead">
              We work in transparent two-week milestone sprints. You receive live staging sandbox access, weekly video walkthroughs, and milestone reviews before moving forward.
            </p>
          </div>

          {/* Cards Pathway Grid */}
          <div className="milestones-pathway-grid">
            {item.milestones.map((ms, idx) => {
              const phaseNumber = String(idx + 1).padStart(2, '0');
              return (
                <div key={ms.phase} className="milestone-card-luxury">
                  <div className="milestone-card-glow" />
                  <div className="milestone-card-inner">
                    <div className="milestone-phase-header">
                      <span className="milestone-phase-badge">
                        <span className="phase-dot" />
                        PHASE {phaseNumber}
                      </span>
                    </div>

                    <h3 className="milestone-card-title">{ms.title}</h3>
                    <p className="milestone-card-desc">{ms.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sprint Governance & Trust Bar */}
          <div className="sprint-governance-bar">
            <div className="governance-item">
              <Video size={18} className="gov-icon" />
              <div>
                <strong>Weekly Loom Demos</strong>
                <span>Clear video walkthroughs of every sprint update.</span>
              </div>
            </div>

            <div className="governance-item">
              <MonitorCheck size={18} className="gov-icon" />
              <div>
                <strong>Live Staging Sandbox</strong>
                <span>Continuous test environment updated with each milestone.</span>
              </div>
            </div>

            <div className="governance-item">
              <MessageSquare size={18} className="gov-icon" />
              <div>
                <strong>Direct Tech Lead Access</strong>
                <span>Direct Slack/Teams communication with your senior team.</span>
              </div>
            </div>

            <div className="governance-item">
              <BadgeCheck size={18} className="gov-icon" />
              <div>
                <strong>Fixed-Price Guarantee</strong>
                <span>Milestone payments released only upon your written approval.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Direct Sprint Action Banner */}
      <div className="deep-dive-cta-strip">
        <div className="deep-dive-cta-info">
          <h3>Ready to turn this blueprint into production reality?</h3>
          <p>Schedule an exploratory sprint consultation with our technical leads with zero sales pressure.</p>
        </div>
        <button
          type="button"
          className="deep-dive-colourful-btn"
          onClick={() => openModal(item.name)}
        >
          <span>Request Project Milestone Estimate</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}
