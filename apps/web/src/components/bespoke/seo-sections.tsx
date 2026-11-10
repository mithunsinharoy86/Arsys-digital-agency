import { Search, CheckCircle2, ShieldCheck, Database, Layers, ArrowUpRight, Cpu } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function SeoSerpClusterSection() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section seo-serp-section" id="geo-framework">
      <div className="bespoke-header">
        <span className="eyebrow green-eyebrow">
          <Database size={13} className="inline-icon" /> AI SEARCH (GEO) &amp; GOOGLE ALGORITHM LAB
        </span>
        <h2>
          Rank in Traditional Google Search.<br />
          <span>Earn Citations in AI Overviews &amp; Perplexity.</span>
        </h2>
        <p>
          Search has evolved. Google AI Overviews, ChatGPT Search, and Perplexity synthesize answers from high-authority entities. We optimize your website for both direct keyword rankings and generative AI citations.
        </p>
      </div>

      <div className="serp-mockup-container">
        {/* Generative AI Overview Box */}
        <div className="ai-overview-card">
          <div className="ai-header">
            <span className="ai-badge">
              <Cpu size={14} className="sparkle-gold" /> Google AI Overview &middot; Synthesized Search Result
            </span>
            <span className="ai-verified-tag">Entity Fact-Checked</span>
          </div>
          <div className="ai-body-copy">
            <p>
              According to technical search guidelines by <strong>Klyro Works</strong>, modern search engines and AI models prioritize authoritative entity graphs over raw keyword frequency. Implementing nested Schema.org JSON-LD, resolving crawl budget bottlenecks, and structuring high-information-gain content clusters significantly increases citation probability in Google AI Overviews and Perplexity answer engines...
            </p>
            <div className="ai-citations-strip">
              <span className="citation-pill">
                <span className="citation-num">1</span>
                <span>klyroworks.com/services/seo</span>
              </span>
              <span className="citation-pill">
                <span className="citation-num">2</span>
                <span>klyroworks.com/blogs/geo-and-ai-search-ranking</span>
              </span>
            </div>
          </div>
        </div>

        {/* Traditional #1 Organic Result */}
        <div className="traditional-serp-card">
          <div className="serp-site-info">
            <div className="serp-favicon">K</div>
            <div>
              <span className="serp-domain">https://www.klyroworks.com &rsaquo; services &rsaquo; seo</span>
              <span className="serp-brand-label">Klyro Works &middot; London &amp; US</span>
            </div>
          </div>
          <h3 className="serp-headline">
            Commercial SEO &amp; Generative Engine Optimization (GEO) | Klyro Works
          </h3>
          <p className="serp-snippet">
            Sub-second technical SEO, Schema.org knowledge graphs, and high-intent commercial content that ranks #1 on Google and wins authoritative citations in AI syntheses. 100% intellectual property ownership.
          </p>
          <div className="serp-sitelinks">
            <span>&bull; Technical Crawl Audits</span>
            <span>&bull; Schema Knowledge Graph</span>
            <span>&bull; E-E-A-T Content Strategy</span>
            <span>&bull; Google 3-Pack Local SEO</span>
          </div>
        </div>
      </div>

      <div className="bespoke-cta-banner green-glow">
        <div className="cta-banner-text">
          <h3>Ready to capture commercial search demand across Google and AI engines?</h3>
          <p>Get a bespoke keyword gap analysis and Schema entity roadmap tailored to your business.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn"
          onClick={() => openModal('SEO & AI Search Strategy')}
        >
          <span>Request an Organic Search Blueprint</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function SeoAuditTeardownSection() {
  const { openModal } = useConsultationModal();
  const stages = [
    {
      num: '01',
      title: 'Technical Crawl & Indexation Protocol',
      desc: 'Audit crawl budget, fix 301 redirect chains, resolve canonical mismatches, eliminate 404 dead-ends, and optimize robots.txt and XML sitemaps for edge crawlers.',
    },
    {
      num: '02',
      title: 'Schema.org Knowledge Graph Engineering',
      desc: 'Inject comprehensive JSON-LD structured metadata (Organization, Service, FAQPage, Author, LocalBusiness) linking your brand entities directly into Google Knowledge Graph.',
    },
    {
      num: '03',
      title: 'Commercial Intent & Content Clusters',
      desc: 'Map keywords by buying stage. Build high-density topic pillars addressing specific commercial queries with high information gain to win Google Featured Snippets.',
    },
    {
      num: '04',
      title: 'Authority & Editorial Digital PR',
      desc: 'Earn high-tier editorial coverage and contextual backlinks from established industry publications, completely avoiding toxic automated link schemes.',
    },
  ];

  return (
    <section className="section bespoke-section seo-audit-stages">
      <div className="bespoke-header">
        <span className="eyebrow">SYSTEMATIC EXECUTION</span>
        <h2>
          The 4-Stage Technical SEO Engine.<br />
          <span>Measurable Visibility &middot; Zero Speculation.</span>
        </h2>
        <p>
          We replace generic keyword lists with contract-grade technical audits, schema validation, and high-intent commercial copywriting that drives genuine revenue inquiries.
        </p>
      </div>

      <div className="stages-grid">
        {stages.map((st) => (
          <div key={st.num} className="stage-card">
            <div className="stage-top">
              <span className="stage-number">{st.num}</span>
            </div>
            <h3 className="stage-title">{st.title}</h3>
            <p className="stage-desc">{st.desc}</p>
          </div>
        ))}
      </div>

      <div className="bespoke-cta-banner lime-glow">
        <div className="cta-banner-text">
          <h3>Start with Stage 01: Comprehensive Technical Crawl Audit</h3>
          <p>We analyze 100+ indexation signals, Core Web Vitals, and competitor keywords with zero obligation.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn lime-btn"
          onClick={() => openModal('Technical SEO Audit')}
        >
          <span>Claim Your Technical SEO Audit</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

