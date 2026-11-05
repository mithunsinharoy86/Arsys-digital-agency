import { ShoppingBag, ArrowRight, Zap, TrendingUp, Check, Shield, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function EcommerceFunnelTeardown() {
  const { openModal } = useConsultationModal();
  const funnelSteps = [
    {
      step: '01',
      title: 'Sub-Second Product Detail Page (PDP)',
      metric: '< 1.2s Target LCP',
      detail: 'Lightning-fast image loading, instant swatch selection without page reload, and clear stock status eliminate bounce rates on high-intent buyers.',
    },
    {
      step: '02',
      title: 'High-Converting Cart Drawer',
      metric: 'AOV Optimization Architecture',
      detail: 'Dynamic free-shipping calculation bar, tiered volume discount selectors, and complementary product add-ons designed directly into native theme code.',
    },
    {
      step: '03',
      title: '1-Click Express Checkout',
      metric: 'Frictionless Funnel Flow',
      detail: 'Direct Shop Pay, Apple Pay, and Klarna one-click express integrations bypass multi-step address friction and minimize cart abandonment.',
    },
  ];

  return (
    <section className="section bespoke-section ecommerce-funnel-section" id="conversion-funnel">
      <div className="bespoke-header">
        <span className="eyebrow orange-eyebrow">
          <ShoppingBag size={13} className="inline-icon" /> COMMERCE CONVERSION ARCHITECTURE
        </span>
        <h2>
          The 3-Step Storefront Blueprint <span>That Maximizes AOV &amp; Checkout Rates.</span>
        </h2>
        <p>
          We engineer Shopify Plus and modern commerce stores around mobile buyer psychology. From sub-second product pages to native cart drawer upsells, every pixel drives revenue.
        </p>
      </div>

      <div className="funnel-steps-grid">
        {funnelSteps.map((f) => (
          <div key={f.step} className="funnel-step-card">
            <div className="funnel-step-top">
              <span className="funnel-num">{f.step}</span>
              <span className="funnel-metric-badge">{f.metric}</span>
            </div>
            <h3 className="funnel-step-title">{f.title}</h3>
            <p className="funnel-step-desc">{f.detail}</p>
          </div>
        ))}
      </div>

      <div className="bespoke-cta-banner orange-glow">
        <div className="cta-banner-text">
          <h3>Turn mobile window shoppers into high-AOV repeat buyers</h3>
          <p>We build custom Shopify Plus themes and headless commerce storefronts engineered for sub-second checkouts.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn orange-btn"
          onClick={() => openModal('eCommerce Store Development')}
        >
          <span>Audit Your eCommerce Store</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function AppBloatVsNativeComparison() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section app-comparison-section">
      <div className="bespoke-header">
        <span className="eyebrow">03 / COST &amp; SPEED OPTIMIZATION</span>
        <h2>
          Eliminate App Bloat.<br />
          <span>Save Thousands in Recurring Shopify SaaS Fees.</span>
        </h2>
        <p>
          Most Shopify stores are crippled by 15+ third-party apps charging monthly subscriptions while injecting render-blocking JavaScript. We replace them with clean, native custom code.
        </p>
      </div>

      <div className="app-table-card">
        <div className="app-table-header">
          <div className="col-feature">Store Capability</div>
          <div className="col-bloat">Typical Store (App Overhead)</div>
          <div className="col-native">Klyro Works Bespoke Engineering</div>
        </div>

        <div className="app-table-row">
          <div className="col-feature">Cart Drawer &amp; Upsells</div>
          <div className="col-bloat">Third-party app ($49/mo &middot; 320ms lag)</div>
          <div className="col-native highlight-green">Bespoke Native Code ($0/mo &middot; 0ms lag)</div>
        </div>

        <div className="app-table-row">
          <div className="col-feature">Product Swatches &amp; Filters</div>
          <div className="col-bloat">Third-party app ($39/mo &middot; 450ms lag)</div>
          <div className="col-native highlight-green">Native Liquid / React ($0/mo &middot; 0ms lag)</div>
        </div>

        <div className="app-table-row">
          <div className="col-feature">Volume Discount Bundles</div>
          <div className="col-bloat">Third-party app ($79/mo &middot; checkout friction)</div>
          <div className="col-native highlight-green">Shopify Functions ($0/mo &middot; native checkout)</div>
        </div>

        <div className="app-table-row">
          <div className="col-feature">Product Schema &amp; SEO</div>
          <div className="col-bloat">Third-party app ($29/mo &middot; slow injection)</div>
          <div className="col-native highlight-green">JSON-LD Structured Data ($0/mo &middot; verified)</div>
        </div>

        <div className="app-table-summary">
          <span className="summary-left">Estimated App Reduction: <strong>Multiple recurring subscriptions eliminated</strong></span>
          <span className="summary-right">Speed Target: <strong>Sub-second mobile loading</strong></span>
        </div>
      </div>

      <div className="bespoke-cta-banner green-glow">
        <div className="cta-banner-text">
          <h3>Eliminate third-party Shopify apps &amp; reclaim recurring subscription costs</h3>
          <p>Request a zero-risk storefront code teardown to identify bloated apps and replace them with native features.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn"
          onClick={() => openModal('Shopify App Bloat Teardown')}
        >
          <span>Claim App Bloat Teardown</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

