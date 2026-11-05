import { useState } from 'react';
import { Zap, Check, AlertTriangle, ShieldCheck, ArrowRight, Layers, Cpu, Globe, Lock, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function SpeedComparisonSection() {
  const { openModal } = useConsultationModal();
  const [activeTab, setActiveTab] = useState<'klyro' | 'builder'>('klyro');

  return (
    <section className="section bespoke-section speed-comparison-section" id="speed-benchmark">
      <div className="bespoke-header">
        <span className="eyebrow green-eyebrow">
          <Zap size={13} className="inline-icon" /> PERFORMANCE LAB &middot; BEFORE &amp; AFTER BENCHMARK
        </span>
        <h2>
          Why Sub-Second Engineering <span>Outconverts Bloated Templates.</span>
        </h2>
        <p>
          Most corporate websites struggle under the weight of slow page builders, 80+ script requests, and layout shift. We engineer clean-code React and Next.js applications that load before a user can blink.
        </p>
      </div>

      <div className="speed-toggle-bar">
        <button
          type="button"
          className={`speed-toggle-btn ${activeTab === 'klyro' ? 'active-green' : ''}`}
          onClick={() => setActiveTab('klyro')}
        >
          <Zap size={15} /> Klyro Works Clean React Architecture
        </button>
        <button
          type="button"
          className={`speed-toggle-btn ${activeTab === 'builder' ? 'active-red' : ''}`}
          onClick={() => setActiveTab('builder')}
        >
          <AlertTriangle size={15} /> Standard Page Builder / WordPress
        </button>
      </div>

      <div className="speed-display-grid">
        <div className={`speed-card ${activeTab === 'klyro' ? 'card-highlight-green' : 'card-dimmed'}`}>
          <div className="card-top">
            <span className="speed-badge green-badge">Target Engineering Benchmark</span>
            <span className="speed-metric-score green-text">Target: 95+</span>
          </div>
          <h3 className="card-title">Clean SSR &amp; Edge Delivery</h3>
          <ul className="speed-stats-list">
            <li>
              <span className="stat-name">Largest Contentful Paint (LCP)</span>
              <strong className="stat-val green-text">0.8s (Sub-Second Target)</strong>
            </li>
            <li>
              <span className="stat-name">Total Page Payload</span>
              <strong className="stat-val">&lt; 200 KB Target</strong>
            </li>
            <li>
              <span className="stat-name">HTTP Script Requests</span>
              <strong className="stat-val">Clean Modular Scripts</strong>
            </li>
            <li>
              <span className="stat-name">Cumulative Layout Shift (CLS)</span>
              <strong className="stat-val green-text">0.00 (Zero Shift Target)</strong>
            </li>
            <li>
              <span className="stat-name">Target Accessibility Standard</span>
              <strong className="stat-val green-text">WCAG 2.1 AA</strong>
            </li>
          </ul>
          <div className="speed-card-footer">
            <Check size={16} className="green-check" />
            <span>Architected to pass Google Core Web Vitals thresholds on mobile &amp; desktop.</span>
          </div>
        </div>

        <div className={`speed-card ${activeTab === 'builder' ? 'card-highlight-red' : 'card-dimmed'}`}>
          <div className="card-top">
            <span className="speed-badge red-badge">Generic Agency Build</span>
            <span className="speed-metric-score red-text">28 / 100</span>
          </div>
          <h3 className="card-title">Bloated Drag-and-Drop Builders</h3>
          <ul className="speed-stats-list">
            <li>
              <span className="stat-name">Largest Contentful Paint (LCP)</span>
              <strong className="stat-val red-text">4.8s (High Friction)</strong>
            </li>
            <li>
              <span className="stat-name">Total Page Payload</span>
              <strong className="stat-val red-text">4.2 MB (23x heavier)</strong>
            </li>
            <li>
              <span className="stat-name">HTTP Script Requests</span>
              <strong className="stat-val red-text">86+ Conflicting Scripts</strong>
            </li>
            <li>
              <span className="stat-name">Cumulative Layout Shift (CLS)</span>
              <strong className="stat-val red-text">0.34 (Failing Grade)</strong>
            </li>
            <li>
              <span className="stat-name">Mobile Bounce Rate</span>
              <strong className="stat-val red-text">53%+ Immediate Exit</strong>
            </li>
          </ul>
          <div className="speed-card-footer error-footer">
            <AlertTriangle size={16} className="red-icon" />
            <span>Penalized by Google algorithms for slow mobile rendering.</span>
          </div>
        </div>
      </div>

      <div className="bespoke-cta-banner green-glow">
        <div className="cta-banner-text">
          <h3>Is your current website losing high-intent visitors to page lag?</h3>
          <p>We’ll run a live Core Web Vitals audit and provide a clean-code architectural teardown.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn"
          onClick={() => openModal('Website Development - Speed Audit')}
        >
          <span>Claim Free Speed Audit</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function FullStackArchitectureSection() {
  const { openModal } = useConsultationModal();
  const layers = [
    {
      step: '01',
      title: 'Global Edge & CDN Layer',
      description: 'Sub-50ms Time to First Byte (TTFB) globally. Automatic SSL, DDoS mitigation, and HTTP/3 multiplexing.',
      icon: Globe,
    },
    {
      step: '02',
      title: 'Server-Side Rendered (SSR) Frontend',
      description: 'Pre-rendered semantic HTML served instantaneously to search engine crawlers and users with zero white-screen lag.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Decoupled CMS & API Mesh',
      description: 'Marketing teams publish effortlessly in an intuitive dashboard while the public frontend remains securely air-gapped.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Compliance & Telemetry Hardening',
      description: 'Zero third-party tracker leaking, cookie consent enforcement, and automated GitHub Actions test pipelines.',
      icon: Lock,
    },
  ];

  return (
    <section className="section bespoke-section architecture-section">
      <div className="bespoke-header">
        <span className="eyebrow">FULL-STACK ENGINEERING</span>
        <h2>
          Modern Architecture.<br />
          <span>Built for Decades, Not Months.</span>
        </h2>
        <p>
          We architect digital platforms with strict separation of concerns, zero vendor lock-in, and 100% intellectual property ownership transfer.
        </p>
      </div>

      <div className="architecture-grid">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div key={layer.step} className="architecture-layer-card">
              <div className="layer-top">
                <span className="layer-step">{layer.step}</span>
                <span className="layer-icon-wrap"><Icon size={18} /></span>
              </div>
              <h3 className="layer-title">{layer.title}</h3>
              <p className="layer-desc">{layer.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bespoke-cta-banner cyan-glow">
        <div className="cta-banner-text">
          <h3>Need a custom corporate web platform built to scale?</h3>
          <p>Speak directly with our senior software engineers to map out your technical requirements.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn cyan-btn"
          onClick={() => openModal('Website Development - Architecture Spec')}
        >
          <span>Discuss Custom Architecture</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

