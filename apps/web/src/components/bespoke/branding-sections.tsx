import { Compass, CheckCircle2, Award, BookOpen, Layers, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function BrandIdentityKitSection() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section brand-identity-section" id="brand-system">
      <div className="bespoke-header">
        <span className="eyebrow green-eyebrow">
          <Compass size={13} className="inline-icon" /> STRATEGIC POSITIONING &middot; BRAND ARCHITECTURE
        </span>
        <h2>
          Distinction in a Sea of Sameness.<br />
          <span>Brand Systems That Build Commercial Authority.</span>
        </h2>
        <p>
          A brand is not just a logo. It is the immediate perception of value in your customer's mind. We craft authoritative brand identities that command premium pricing and investor confidence.
        </p>
      </div>

      <div className="brand-quadrant-container">
        <div className="brand-quadrant-card">
          <div className="quadrant-top">
            <span className="quadrant-badge">Tone of Voice Matrix</span>
            <span className="quadrant-subtitle">US &amp; UK Market Alignment</span>
          </div>

          <div className="quadrant-matrix">
            <div className="matrix-quadrant q1">
              <strong>Authoritative &amp; Direct</strong>
              <span>Clarity over hype. Unambiguous commercial claims backed by real evidence.</span>
            </div>
            <div className="matrix-quadrant q2">
              <strong>Approachable &amp; Calm</strong>
              <span>Demystifies complex technical jargon. Inviting, patient, and human.</span>
            </div>
            <div className="matrix-quadrant q3">
              <strong>Modern &amp; Ambitious</strong>
              <span>Clean typography, high-contrast aesthetics, and energetic precision.</span>
            </div>
            <div className="matrix-quadrant q4">
              <strong>Timeless &amp; Trusted</strong>
              <span>Built to last. Avoids transient design gimmicks that date in 12 months.</span>
            </div>
          </div>
        </div>

        <div className="brand-kit-suite-card">
          <div className="suite-header">
            <Award size={18} className="suite-icon" />
            <h3>Complete Brand Delivery Suite</h3>
          </div>
          <ul className="suite-items-list">
            <li>
              <span className="suite-item-name">Primary &amp; Secondary Vector Marks</span>
              <span className="suite-item-format">SVG &middot; EPS &middot; PNG</span>
            </li>
            <li>
              <span className="suite-item-name">Comprehensive 40+ Page Brand Book</span>
              <span className="suite-item-format">PDF &middot; Figma Tokens</span>
            </li>
            <li>
              <span className="suite-item-name">Typography Licensing &amp; Web Fonts</span>
              <span className="suite-item-format">WOFF2 &middot; Google Fonts</span>
            </li>
            <li>
              <span className="suite-item-name">Social Media &amp; Deck Presentation Kit</span>
              <span className="suite-item-format">16:9 4K &middot; LinkedIn Banners</span>
            </li>
            <li>
              <span className="suite-item-name">100% Trademark &amp; Commercial IP Assignment</span>
              <span className="suite-item-format">Legal Assignment Deed</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bespoke-cta-banner green-glow">
        <div className="cta-banner-text">
          <h3>Elevate your visual positioning and build lasting customer recall</h3>
          <p>Book a strategic brand consultation with full intellectual property transfer upon delivery.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn"
          onClick={() => openModal('Branding & Visual Identity')}
        >
          <span>Commission Brand Identity Suite</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

