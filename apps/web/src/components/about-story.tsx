import { images } from '@/data/site';
import { ShieldCheck, Zap, Lock, Globe2, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function AboutStory() {
  const { openModal } = useConsultationModal();

  return (
    <section className="section about-story">
      <div className="about-visual-col">
        <img
          src={images.team}
          alt="Collaborative digital strategy and engineering workshop"
          width="900"
          height="600"
          loading="lazy"
        />
        <div className="about-img-badge">
          <Globe2 size={14} />
          <span>DUAL JURISDICTION · LONDON (UK) &amp; UNITED STATES</span>
        </div>
      </div>
      <div className="about-content-col">
        <span className="eyebrow">THOUGHTFUL STRATEGY · PRACTICAL DELIVERY</span>
        <h2>
          A digital partner for<br />
          <span>the whole picture.</span>
        </h2>
        <p>
          Klyro Works helps ambitious companies across the United Kingdom and United States build high-converting digital platforms, dominate high-intent search, and streamline operations with bespoke automations.
        </p>
        <p>
          We bring website engineering, SEO, brand design, and AI automation together under one disciplined roof. We reject bloated page builders, fabricated metrics, and proprietary vendor lock-in.
        </p>
        <p>
          Our engagements start with technical discovery and customer psychology. You receive transparent sprint roadmaps, direct senior engineer access, and 100% ownership of your codebase and design assets upon milestone completion.
        </p>

        <div className="about-stats-grid">
          <div className="about-stat">
            <span className="stat-icon"><ShieldCheck size={18} /></span>
            <strong>100%</strong>
            <span>IP Code &amp; Asset Transfer</span>
          </div>
          <div className="about-stat">
            <span className="stat-icon"><Zap size={18} /></span>
            <strong>&lt; 1.2s</strong>
            <span>Sub-Second Load Benchmark</span>
          </div>
          <div className="about-stat">
            <span className="stat-icon"><Lock size={18} /></span>
            <strong>GDPR</strong>
            <span>UK &amp; US Privacy Ready</span>
          </div>
        </div>

        <div className="about-cta-action">
          <button
            type="button"
            className="about-colourful-btn"
            onClick={() => openModal()}
          >
            <span>Partner With Klyro Works</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
