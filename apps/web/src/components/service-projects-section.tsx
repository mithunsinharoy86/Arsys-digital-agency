import { useState } from 'react';
import {
  Layers,
  ArrowUpRight,
  Check,
  Maximize2,
  X,
  Cpu,
  Monitor,
  Activity,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { type Offering, type ProjectShowcase } from '@/data/site';
import { useConsultationModal } from '@/components/consultation-modal';

export function ServiceProjectsSection({ item }: { item: Offering }) {
  const { openModal } = useConsultationModal();
  const projects = item.projects;

  if (!projects || projects.length === 0) {
    return null;
  }

  const [activeProject, setActiveProject] = useState<ProjectShowcase>(projects[0]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      className="section service-projects-section"
      id="case-studies"
      aria-label="Production Benchmarks & Real-World Projects"
    >
      <div className="service-projects-header">
        <div className="section-heading-left">
          <span className="eyebrow project-eyebrow">
            <Layers size={13} className="inline-icon" /> PRODUCTION ARCHITECTURE &amp; CASE STUDIES
          </span>
          <h2 className="project-section-title">
            Engineered for Speed.<br />
            <span>Proven in Production.</span>
          </h2>
        </div>
        <div className="section-heading-right">
          <p className="project-lead-text">
            Explore production architectures and client platforms designed and engineered by Klyro Works.
            Every build features bespoke code, sub-second edge routing, and complete intellectual property transfer.
          </p>
        </div>
      </div>

      {/* Project Switcher Navigation Tabs */}
      <div className="project-switcher-tabs" role="tablist" aria-label="Select Architecture Showcase">
        {projects.map((proj, idx) => {
          const isActive = proj.id === activeProject.id;
          return (
            <button
              key={proj.id}
              role="tab"
              aria-selected={isActive}
              className={`project-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveProject(proj)}
            >
              <span className="tab-index">0{idx + 1}</span>
              <span className="tab-title">{proj.title}</span>
              <span className="tab-category">{proj.category}</span>
              {isActive && <span className="tab-active-glow" />}
            </button>
          );
        })}
      </div>

      {/* Main Spotlight Project Showcase Card */}
      <div className="project-spotlight-card">
        <div className="project-spotlight-glow" />

        <div className="project-spotlight-layout">
          {/* Left / Top: Interactive Cinematic Visual Preview */}
          <div className="project-visual-container">
            <div className="project-image-wrapper group" onClick={() => setModalOpen(true)}>
              <img
                src={activeProject.image}
                alt={`${activeProject.title} architectural blueprint`}
                className="project-display-image"
                loading="lazy"
              />
              <div className="image-overlay-scrim" />
              <div className="image-inspect-action">
                <span className="inspect-pill">
                  <Maximize2 size={14} />
                  <span>Inspect Full Architecture</span>
                </span>
              </div>
              <div className="project-live-badge">
                <span className="live-pulse-dot" />
                <span>{activeProject.badge}</span>
              </div>
            </div>

            {activeProject.liveDemoNote && (
              <div className="project-demo-caption">
                <ShieldCheck size={13} className="text-cyan-400" />
                <span>{activeProject.liveDemoNote}</span>
              </div>
            )}
          </div>

          {/* Right / Bottom: Technical Details & Metrics */}
          <div className="project-content-container">
            <div className="project-meta-strip">
              <span className="project-category-tag">{activeProject.category}</span>
              <span className="meta-separator">&middot;</span>
              <span className="project-client-name">{activeProject.client}</span>
            </div>

            <h3 className="project-spotlight-title">{activeProject.title}</h3>
            <p className="project-spotlight-summary">{activeProject.summary}</p>
            <p className="project-spotlight-desc">{activeProject.description}</p>

            {/* Performance KPI Metrics */}
            <div className="project-metrics-row">
              {activeProject.metrics.map((m) => (
                <div key={m.label} className="project-metric-card">
                  <span className="p-metric-val">{m.value}</span>
                  <strong className="p-metric-lbl">{m.label}</strong>
                  {m.detail && <span className="p-metric-sub">{m.detail}</span>}
                </div>
              ))}
            </div>

            {/* Architectural Highlights Checklist */}
            <div className="project-features-block">
              <h4 className="features-title">
                <Zap size={14} className="feature-icon" /> Core Architectural Specifications
              </h4>
              <ul className="features-list">
                {activeProject.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-check-icon">
                      <Check size={12} />
                    </span>
                    <span className="feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="project-tech-strip">
              <span className="tech-label">Stack:</span>
              <div className="tech-pills-wrap">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="project-tech-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <div className="project-cta-actions">
              <button
                type="button"
                onClick={() => openModal(activeProject.title)}
                className="button primary project-discuss-btn"
              >
                <span>Engineer a similar solution</span>
                <ArrowUpRight size={15} />
              </button>
              <button
                type="button"
                className="button secondary project-blueprint-btn"
                onClick={() => setModalOpen(true)}
              >
                <Cpu size={15} />
                <span>View Blueprint Spec</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Thumbnails Selector Strip */}
      <div className="projects-grid-strip">
        {projects.map((proj) => {
          const isSelected = proj.id === activeProject.id;
          return (
            <div
              key={proj.id}
              className={`project-thumbnail-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setActiveProject(proj)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveProject(proj);
                }
              }}
            >
              <div className="thumb-img-wrap">
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <span className="thumb-badge">{proj.category}</span>
              </div>
              <div className="thumb-info">
                <h4>{proj.title}</h4>
                <div className="thumb-metrics-preview">
                  {proj.metrics.slice(0, 2).map((m) => (
                    <span key={m.label} className="thumb-kpi">
                      <b>{m.value}</b> {m.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blueprint Inspect Modal */}
      {modalOpen && (
        <div
          className="blueprint-modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="blueprint-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blueprint-modal-header">
              <div className="modal-title-wrap">
                <span className="modal-badge">{activeProject.category}</span>
                <h3>{activeProject.title}</h3>
                <p>{activeProject.client} &mdash; Architecture Reference</p>
              </div>
              <button
                className="blueprint-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="blueprint-modal-body">
              <div className="modal-image-wrap">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="modal-full-image"
                />
              </div>

              <div className="modal-specs-drawer">
                <div className="modal-specs-section">
                  <h4>Performance &amp; Scale Metrics</h4>
                  <div className="modal-metrics-grid">
                    {activeProject.metrics.map((m) => (
                      <div key={m.label} className="modal-metric-box">
                        <span className="modal-m-val">{m.value}</span>
                        <span className="modal-m-lbl">{m.label}</span>
                        {m.detail && <small className="modal-m-sub">{m.detail}</small>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-specs-section">
                  <h4>Architecture Highlights</h4>
                  <ul className="modal-features-list">
                    {activeProject.features.map((f, i) => (
                      <li key={i}>
                        <Check size={13} className="text-cyan-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-specs-section">
                  <h4>Tech Ecosystem</h4>
                  <div className="modal-tags-list">
                    {activeProject.tags.map((t) => (
                      <span key={t} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-cta-box">
                  <button
                    type="button"
                    className="button primary w-full"
                    onClick={() => {
                      setModalOpen(false);
                      openModal(activeProject.title);
                    }}
                  >
                    <span>Request Technical Blueprint Consultation</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

