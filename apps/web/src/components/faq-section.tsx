import { faqs } from '@/data/site';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function FaqSection({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const { openModal } = useConsultationModal();

  return (
    <section className="section faq-section">
      <div className="faq-sidebar">
        <span className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span>
        <h2>
          Good questions.<br />
          <span>Clear answers.</span>
        </h2>
        <div className="faq-cta-card">
          <div className="faq-cta-card-header">
            <MessageCircle size={15} />
            <span>ONE-ON-ONE STRATEGY</span>
          </div>
          <p>
            Prefer a conversation?<br />
            We’d be happy to talk it through.
          </p>
          <button
            type="button"
            className="faq-colourful-btn"
            onClick={() => openModal()}
          >
            <span>Book a Free Consultation</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div className="faq-list">
        {items.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <span className="faq-plus">+</span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
