import { process } from '@/data/site';
import { ShieldCheck, Zap, Layers, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function ProcessSection() {
  const { openModal } = useConsultationModal();

  return (
    <section className="section process-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE KLYRO WORKS METHODOLOGY &middot; A CLEAR WAY FORWARD</span>
          <h2>
            Good work starts<br />
            with <span>a better plan.</span>
          </h2>
        </div>
        <p>
          No black boxes. No unnecessary complexity.<br />
          Just disciplined sprint execution with concrete, measurable milestones.
        </p>
      </div>

      <div className="process-grid">
        {process.map((p, i) => (
          <div key={p.title} className="process-card">
            <span className="process-number">
              0{i + 1}
              <span>↗</span>
            </span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>

      <div className="why-strip">
        <div className="why-title-col">
          <span className="why-pill">THE KLYRO WORKS DIFFERENCE</span>
          <h3>Why UK &amp; US Leaders Choose Klyro Works</h3>
        </div>
        <div className="why-feature">
          <span className="why-icon"><Zap size={20} /></span>
          <strong>Search-Led Architecture</strong>
          <p>Every website is engineered from day one to dominate Google and Generative AI search engines.</p>
        </div>
        <div className="why-feature">
          <span className="why-icon"><Layers size={20} /></span>
          <strong>100% Code &amp; IP Ownership</strong>
          <p>You own all custom source code, prototypes and design assets. Complete freedom, zero lock-in.</p>
        </div>
        <div className="why-feature">
          <span className="why-icon"><ShieldCheck size={20} /></span>
          <strong>Strict Regulatory Compliance</strong>
          <p>Built-in WCAG 2.1 AA accessibility, UK/EU GDPR consent, and US CCPA/CPRA privacy compliance.</p>
        </div>
      </div>

      <div className="process-bottom-cta">
        <div className="process-cta-text">
          <strong>Ready to launch your project with guaranteed sprint milestones?</strong>
          <span>Fixed price Statement of Work &middot; Weekly Loom video demos &middot; Zero surprises</span>
        </div>
        <button
          type="button"
          className="process-colourful-btn"
          onClick={() => openModal()}
        >
          <span>Schedule Sprint 01 Discovery</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}
