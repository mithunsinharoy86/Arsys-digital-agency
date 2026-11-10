import { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function MobileStickyCta() {
  const { openModal } = useConsultationModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after user has scrolled past 320px
    // and hide when consultation form section is in view
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById('consultation');

      if (!contactEl) {
        setVisible(scrollY > 280);
        return;
      }

      const rect = contactEl.getBoundingClientRect();
      const inContactSection = rect.top < window.innerHeight && rect.bottom > 0;

      // Show after 280px scroll, hide when viewing the actual contact form
      setVisible(scrollY > 280 && !inContactSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside className="mobile-sticky-cta-bar" aria-label="Quick consultation request">
      <div className="mobile-sticky-inner">
        <div className="mobile-sticky-info">
          <span className="mobile-sticky-eyebrow">
            <span className="live-dot" /> FREE 30-MIN STRATEGY
          </span>
          <span className="mobile-sticky-title">
            <ShieldCheck size={13} className="inline text-emerald-600 mr-1" />
            Senior UK/US Leadership
          </span>
        </div>
        <button
          type="button"
          className="mobile-sticky-button"
          onClick={() => openModal()}
        >
          <span>Let&rsquo;s Talk</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </aside>
  );
}

