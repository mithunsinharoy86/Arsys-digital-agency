import { Palette, Layers, Eye, Check, Smartphone, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function UiUxDesignSystemSection() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section uiux-design-system-section" id="design-system">
      <div className="bespoke-header">
        <span className="eyebrow green-eyebrow">
          <Palette size={13} className="inline-icon" /> FIGMA DESIGN SYSTEM &middot; TOKENS &amp; ACCESSIBILITY
        </span>
        <h2>
          Precision Design Systems.<br />
          <span>Crafted in Figma &middot; Validated to WCAG 2.1 AA.</span>
        </h2>
        <p>
          We don't design disposable page mockups. We build cohesive, accessible design systems with atomic design tokens, reusable UI components, and bulletproof responsive behavior.
        </p>
      </div>

      <div className="design-system-grid">
        {/* Token Preview Card 1: Colors & Contrast */}
        <div className="token-card">
          <div className="token-card-header">
            <span className="token-title">Color Tokens &amp; Contrast Validation</span>
            <span className="contrast-badge green-badge">7.4:1 AAA Pass</span>
          </div>
          <div className="color-swatches-row">
            <div className="swatch-item">
              <span className="swatch-box" style={{ background: '#146844' }} />
              <span className="swatch-label">Racing Green</span>
              <span className="swatch-hex">#146844</span>
            </div>
            <div className="swatch-item">
              <span className="swatch-box" style={{ background: '#f4f8f5' }} />
              <span className="swatch-label">Mint Canvas</span>
              <span className="swatch-hex">#f4f8f5</span>
            </div>
            <div className="swatch-item">
              <span className="swatch-box" style={{ background: '#060509' }} />
              <span className="swatch-label">Deep Ink</span>
              <span className="swatch-hex">#060509</span>
            </div>
            <div className="swatch-item">
              <span className="swatch-box" style={{ background: '#f59e0b' }} />
              <span className="swatch-label">Warm Gold</span>
              <span className="swatch-hex">#f59e0b</span>
            </div>
          </div>
          <p className="token-desc">
            All text and surface combinations tested rigorously against WCAG 2.1 AA and AAA standards to meet rigorous contrast and legibility guidelines.
          </p>
        </div>

        {/* Token Preview Card 2: Typography Scale */}
        <div className="token-card">
          <div className="token-card-header">
            <span className="token-title">Fluid Responsive Typography</span>
            <span className="contrast-badge">Modular Scale</span>
          </div>
          <div className="typography-preview-list">
            <div className="typo-row">
              <span className="typo-meta">Display / 48px</span>
              <strong className="typo-sample-display">High-Impact Clarity</strong>
            </div>
            <div className="typo-row">
              <span className="typo-meta">Section / 28px</span>
              <span className="typo-sample-section">Intuitive Navigation Architecture</span>
            </div>
            <div className="typo-row">
              <span className="typo-meta">Body / 15px</span>
              <span className="typo-sample-body">Engineered for effortless reading on small mobile viewports.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bespoke-cta-banner green-glow">
        <div className="cta-banner-text">
          <h3>Need a scalable design system crafted for your brand and team?</h3>
          <p>We build production-ready Figma libraries and design tokens with WCAG 2.1 AA validation.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn"
          onClick={() => openModal('UI/UX Design - Design System')}
        >
          <span>Commission Figma Design System</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function UserJourneyTeardownSection() {
  const { openModal } = useConsultationModal();
  const steps = [
    {
      num: '01',
      title: 'Quantitative & Qualitative Audit',
      desc: 'Heatmap analysis, session replay teardowns, and user interviews to isolate exact conversion drop-offs.',
    },
    {
      num: '02',
      title: 'Friction-Free Information Architecture',
      desc: 'Simplify navigation menus, eliminate dead-end pages, and build clean pathways to primary commercial actions.',
    },
    {
      num: '03',
      title: 'Interactive High-Fidelity Prototypes',
      desc: 'Clickable Figma prototypes with realistic micro-interactions, mobile touch states, and verified user testing.',
    },
    {
      num: '04',
      title: 'Design Token Handover to Code',
      desc: 'Production-ready CSS variables, Tailwind configuration, and component libraries with zero designer-developer translation loss.',
    },
  ];

  return (
    <section className="section bespoke-section user-journey-section">
      <div className="bespoke-header">
        <span className="eyebrow">HUMAN-CENTRED METHODOLOGY</span>
        <h2>
          Dismantling User Friction.<br />
          <span>From Initial Impression to Confirmed Conversion.</span>
        </h2>
        <p>
          Every UI decision is grounded in behavioural psychology and commercial data. We build interfaces people love to navigate.
        </p>
      </div>

      <div className="journey-grid">
        {steps.map((st) => (
          <div key={st.num} className="journey-card">
            <span className="journey-step-num">{st.num}</span>
            <h3 className="journey-step-title">{st.title}</h3>
            <p className="journey-step-desc">{st.desc}</p>
          </div>
        ))}
      </div>

      <div className="bespoke-cta-banner cyan-glow">
        <div className="cta-banner-text">
          <h3>Dismantle conversion bottlenecks across your website</h3>
          <p>Book a 30-minute UX teardown to identify drop-offs and preview interactive Figma solutions.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn cyan-btn"
          onClick={() => openModal('UI/UX Design - Journey Teardown')}
        >
          <span>Request UX Teardown Consultation</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

