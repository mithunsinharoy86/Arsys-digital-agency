import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useConsultationModal } from '@/components/consultation-modal';

export function Value() {
  const { openModal } = useConsultationModal();

  return (
    <section id="value" className="value-section section">
      <div className="eyebrow">THE BIGGER PICTURE &middot; UNIFIED GROWTH</div>
      <div className="value-grid">
        <h2>
          Not just digital services.<br />
          <span>A connected growth partner.</span>
        </h2>
        <div>
          <p>
            Your search visibility, bespoke website and automated operational pipelines shouldn’t operate in silos. We align high-intent SEO, modern full-stack web engineering, and intelligent AI automations into one unified high-conversion growth engine.
          </p>
          <div className="value-action-group">
            <button
              type="button"
              className="button primary value-cta-btn"
              onClick={() => openModal()}
            >
              Start the Conversation <ArrowUpRight size={17} />
            </button>
            <Link to="/about" className="text-link">
              Meet Klyro Works <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
