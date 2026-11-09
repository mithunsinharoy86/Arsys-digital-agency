import { Check, ArrowUpRight, Shield, ArrowRight } from 'lucide-react';
import { type Offering } from '@/data/site';
import { useConsultationModal } from '@/components/consultation-modal';

export function DeliverablesSection({ item }: { item: Offering }) {
  const { openModal } = useConsultationModal();

  return (
    <section className="section deliverables-redesign" id="deliverables">
      <div className="deliverables-layout">
        {/* Left Column: Strategic Context & Guaranteed Outcomes */}
        <div className="deliverables-left">
          <div className="deliverables-sticky-panel">
            <span className="eyebrow deliverables-eyebrow">
              SCOPE &amp; SPECIFICATIONS
            </span>
            <h2 className="deliverables-heading">
              {item.deliverablesTitle ? (
                item.deliverablesTitle
              ) : (
                <>
                  Practical expertise.<br />
                  <span>Guaranteed outcomes.</span>
                </>
              )}
            </h2>
            <p className="deliverables-description">
              We eliminate ambiguity from agency engagements. Every deliverable is scoped with explicit technical acceptance criteria, clear responsibilities, and firm delivery dates.
            </p>

            {/* Strategic Outcomes Glass Card */}
            <div className="outcomes-card">
              <div className="outcomes-card-header">
                <Shield size={16} className="outcomes-shield-icon" />
                <span>Commercial Value You Walk Away With</span>
              </div>
              <ul className="outcomes-items">
                {item.outcomes.map((outcome, idx) => (
                  <li key={idx} className="outcome-row">
                    <span className="outcome-check-wrap">
                      <Check size={14} className="outcome-check" />
                    </span>
                    <span className="outcome-text">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="deliverables-cta-wrap">
              <button
                type="button"
                onClick={() => openModal(item.name)}
                className="deliverables-colourful-cta"
                aria-label={`Tailor ${item.name} scope to your business`}
              >
                <span className="cta-button-text">
                  <strong>Tailor this scope to your business</strong>
                  <small>Free 30-min strategy review &middot; Custom milestone quote</small>
                </span>
                <span className="cta-button-icon">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Deliverable Cards */}
        <div className="deliverables-right">
          <div className="deliverables-cards-list">
            {item.deliverables.map((deliverable, index) => {
              const num = String(index + 1).padStart(2, '0');
              let cleanTitle = deliverable;
              let desc = '';

              if (deliverable.includes(': ')) {
                const idx = deliverable.indexOf(': ');
                cleanTitle = deliverable.substring(0, idx).trim();
                desc = deliverable.substring(idx + 2).trim();
              } else {
                const match = deliverable.match(/^(.*?)\s*\((.*?)\)$/);
                if (match) {
                  cleanTitle = match[1].trim();
                  desc = match[2].trim();
                }
              }

              return (
                <div key={index} className="deliverable-tile">
                  <div className="tile-glow-bg" />
                  <div className="tile-content">
                    <div className="tile-top">
                      <span className="tile-index">{num}</span>
                      <span className="tile-arrow-wrap">
                        <ArrowUpRight size={17} className="tile-arrow" />
                      </span>
                    </div>

                    <h3 className="tile-title">{cleanTitle}</h3>
                    {desc && <p className="tile-desc">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
