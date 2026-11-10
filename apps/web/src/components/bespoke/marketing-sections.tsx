import { Target, TrendingUp, ShieldAlert, BarChart3, Share2, BookOpen, UserCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function PaidMarketingEconomicsSection() {
  const { openModal } = useConsultationModal();
  const pillars = [
    {
      title: 'Commercial Intent Filtering',
      desc: 'We target high-intent buying queries ("book consultation", "enterprise software quote") while aggressively shielding against negative informational keywords.',
    },
    {
      title: 'Full-Funnel Offline Attribution',
      desc: 'Connect Google & LinkedIn ad clicks directly to your CRM (HubSpot/Salesforce) to optimize for actual revenue contracts, not just cheap vanity leads.',
    },
    {
      title: 'Conversion Landing Experience',
      desc: 'Campaign visitors land on dedicated, ultra-fast landing pages with singular clear value propositions, boosting Google Quality Scores and lowering CPC.',
    },
  ];

  return (
    <section className="section bespoke-section paid-marketing-section" id="paid-economics">
      <div className="bespoke-header">
        <span className="eyebrow green-eyebrow">
          <Target size={13} className="inline-icon" /> PAID PERFORMANCE &middot; UNIT ECONOMICS
        </span>
        <h2>
          Predictable Customer Acquisition.<br />
          <span>Zero Wasted Ad Spend &middot; Transparent Attribution.</span>
        </h2>
        <p>
          We manage paid search and social campaigns engineered around unit economics (CAC vs LTV). Every pound or dollar spent is tracked to real business outcomes.
        </p>
      </div>

      <div className="marketing-pillars-grid">
        {pillars.map((p, idx) => (
          <div key={idx} className="marketing-pillar-card">
            <h3 className="pillar-title">{p.title}</h3>
            <p className="pillar-desc">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="bespoke-cta-banner green-glow">
        <div className="cta-banner-text">
          <h3>Eliminate wasted ad spend &amp; connect paid clicks to closed revenue</h3>
          <p>Request a transparent Google &amp; LinkedIn Ads unit-economics audit with zero sales pressure.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn"
          onClick={() => openModal('Paid Marketing & Unit Economics')}
        >
          <span>Claim Free Ad Account Audit</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function SocialLeadershipSection() {
  const cadence = [
    {
      day: 'Weekly Cadence',
      title: 'Executive Thought Leadership',
      detail: 'Original LinkedIn commentary dissecting industry challenges, regulatory changes, and proprietary agency research.',
    },
    {
      day: 'Bi-Weekly Asset',
      title: 'High-Value Visual Carousels',
      detail: 'Data-packed visual slide decks that earn hundreds of organic bookmarks, shares, and algorithmic distribution.',
    },
    {
      day: 'Monthly Pillar',
      title: 'Authentic Video & Case Walkthroughs',
      detail: 'Real-world studio and field video clips highlighting the people, thinking, and engineering behind production blueprints and brand systems.',
    },
  ];

  return (
    <section className="section bespoke-section social-leadership-section" id="social-cadence">
      <div className="bespoke-header">
        <span className="eyebrow green-eyebrow">
          <Share2 size={13} className="inline-icon" /> B2B EXECUTIVE AUTHORITY &middot; SOCIAL DISTRIBUTION
        </span>
        <h2>
          Turn Founders &amp; Leaders into Category Authorities.<br />
          <span>Authentic Reach That Opens Commercial Doors.</span>
        </h2>
        <p>
          We reject robotic AI-generated posts and superficial memes. We position your leadership team as indispensable industry voices through substantive B2B commentary.
        </p>
      </div>

      <div className="social-cadence-grid">
        {cadence.map((c, i) => (
          <div key={i} className="cadence-card">
            <span className="cadence-period">{c.day}</span>
            <h3 className="cadence-title">{c.title}</h3>
            <p className="cadence-detail">{c.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContentClusterPyramidSection() {
  return (
    <section className="section bespoke-section content-pyramid-section" id="topic-clusters">
      <div className="bespoke-header">
        <span className="eyebrow green-eyebrow">
          <BookOpen size={13} className="inline-icon" /> TOPIC CLUSTERS &middot; E-E-A-T AUTHORITY PYRAMID
        </span>
        <h2>
          Structured Content Ecosystems.<br />
          <span>Dominating Commercial Search Through Information Gain.</span>
        </h2>
        <p>
          Google rewards comprehensive topical authority. We architect interconnected content hubs where authoritative pillar guides support hyper-specific commercial long-tail articles.
        </p>
      </div>

      <div className="pyramid-container">
        {/* Tier 1: Core Topic Pillar */}
        <div className="pyramid-tier tier-top">
          <div className="tier-badge">Tier 01 &middot; Core Topic Pillar (3,000+ Words)</div>
          <h3>Definitive Industry Guide &amp; Technical Benchmark</h3>
          <p>Exhaustive, deeply researched anchor resource targeting high-volume commercial keywords with custom diagrams and research data.</p>
        </div>

        {/* Tier 2: Sub-Topic Clusters */}
        <div className="pyramid-tier tier-middle">
          <div className="tier-badge">Tier 02 &middot; 6-8 Supporting Sub-Topic Articles (1,200 Words Each)</div>
          <h3>Detailed Implementation Guides &amp; Specific Use Cases</h3>
          <p>Answering high-intent long-tail questions, competitor comparison queries, and regulatory checklists, all linking back to the Pillar.</p>
        </div>

        {/* Tier 3: Conversion Assets */}
        <div className="pyramid-tier tier-bottom">
          <div className="tier-badge">Tier 03 &middot; High-Converting Gated Lead Assets</div>
          <h3>Downloadable Calculators, Frameworks &amp; Executive Checklists</h3>
          <p>Converting qualified reader curiosity directly into senior consultation inquiries and email subscribers.</p>
        </div>
      </div>
    </section>
  );
}

