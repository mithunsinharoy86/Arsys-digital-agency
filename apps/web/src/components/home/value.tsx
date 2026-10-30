import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useConsultationModal } from '@/components/consultation-modal';

export function Value() {
  const { openModal } = useConsultationModal();

  return (
    <section id="value" className="value-section section">
      <div className="eyebrow">01 / THE BIGGER PICTURE &middot; UNIFIED GROWTH</div>
      <div className="value-grid">
        <h2>
          Not just digital services.<br />
          <span>A connected growth partner.</span>
        </h2>
        <div>
          <p>
            Your search visibility, bespoke website and automated operational pipelines shouldn’t operate in silos. Inspired by London’s leading digital agencies, we align high-intent SEO, modern full-stack web engineering, and intelligent AI automations into one high-conversion engine.
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
      <div className="value-outcomes">
        <span><b>01</b> Dominate High-Intent Search (Google &amp; AI GEO)</span>
        <span><b>02</b> Turn Visits into Qualified Commercial Inquiries</span>
        <span><b>03</b> Automate Workflows &amp; Scale Effortlessly</span>
      </div>
    </section>
  );
}
