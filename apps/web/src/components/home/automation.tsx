import { Link } from 'react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { GrowthVisual } from '@/components/growth-visual';
import { useConsultationModal } from '@/components/consultation-modal';

export function Automation() {
  const { openModal } = useConsultationModal();

  return (
    <section className="section automation-section">
      <div className="automation-copy">
        <span className="eyebrow violet-text">05 / AI, WITH A PURPOSE</span>
        <h2>
          Let the repetitive<br />
          work run.<br />
          <span>You move forward.</span>
        </h2>
        <p>
          AI shouldn’t be another complicated tool. It should make your day simpler. We build practical automations that connect your enquiries, your systems and your team.
        </p>
        <ul>
          {[
            'Qualify and route incoming leads',
            'Connect your website to your CRM',
            'Streamline follow-ups and support',
            'Keep people in control of decisions',
          ].map((t) => (
            <li key={t}>
              <Check size={16} />
              {t}
            </li>
          ))}
        </ul>
        <div className="automation-cta-group">
          <button
            type="button"
            className="button primary automation-modal-btn"
            onClick={() => openModal('AI Automation & Workflows')}
          >
            Automate Your Workflow <ArrowUpRight size={17} />
          </button>
          <Link to="/services/ai-automation" className="button secondary">
            Explore AI Solutions
          </Link>
        </div>
      </div>
      <GrowthVisual variant="workflow" />
    </section>
  );
}
