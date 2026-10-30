import {
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  Milestone,
  Clock,
  Video,
  MonitorCheck,
  MessageSquare,
  BadgeCheck,
  ArrowUpRight,
} from 'lucide-react';
import { type Offering } from '@/data/site';
import { useConsultationModal } from '@/components/consultation-modal';

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
            {item.metrics.map((m) => (
              <div key={m.label} className="metric-box">
                <span className="metric-label">{m.label}</span>
                <span className="metric-value">{m.value}</span>
                <span className="metric-detail">{m.detail}</span>
              </div>
            ))}
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
                  <Layers size={18} className="tech-card-icon" />
                  <h3>{cat.category}</h3>
                </div>
                <div className="tech-badge-list">
                  {cat.items.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
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
                    <div className="milestone-top-meta">
                      <span className="milestone-phase-badge">
                        PHASE {phaseNumber}
                      </span>
                      <span className="milestone-timeline-badge">
                        <Clock size={11} /> {ms.timeline}
                      </span>
                    </div>

                    <h3 className="milestone-card-title">{ms.title}</h3>
                    <p className="milestone-card-desc">{ms.description}</p>

                    <div className="milestone-card-footer">
                      <div className="milestone-indicator">
                        <span className="milestone-pulse-dot" />
                        <span>Sprint Deliverable</span>
                      </div>
                      <span className="milestone-sequence-num">0{idx + 1}</span>
                    </div>
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

      {/* 4. Compliance & Commercial Guarantees */}
      {item.complianceGuarantees && item.complianceGuarantees.length > 0 && (
        <div className="service-guarantees-panel">
          <div className="guarantees-header">
            <ShieldCheck size={24} className="guarantees-icon" />
            <div>
              <h3>Our Commercial &amp; Compliance Guarantees</h3>
              <p>Built into every contract Statement of Work (SOW) with dual US/UK legal protections.</p>
            </div>
          </div>
          <div className="guarantees-grid">
            {item.complianceGuarantees.map((g) => (
              <div key={g} className="guarantee-item">
                <Check size={16} className="guarantee-check" />
                <span>{g}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Direct Sprint Action Banner */}
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
