import { Link } from 'react-router';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { GrowthVisual } from '@/components/growth-visual';
import { useConsultationModal } from '@/components/consultation-modal';

export function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="hero">
      <div className="hero-aura" />
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow">
          <span className="live-dot" /> LONDON &amp; US DIGITAL GROWTH &middot; WEB &middot; SEO &middot; AI
        </div>
        <h1>
          Search Marketing, Bespoke Web Design &amp; AI that <span>scales your business.</span>
        </h1>
        <p>
          We engineer sub-second commercial websites, scale organic rankings with modern technical SEO and AI Search (GEO), and build automated workflows that convert high-intent visitors into revenue.
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="button primary"
            onClick={() => openModal()}
          >
            Request a Free Consultation <ArrowUpRight size={18} />
          </button>
          <Link to="/services" className="button secondary">
            Explore Services &amp; Work <ArrowDown size={17} />
          </Link>
        </div>
        <div className="hero-trust">
          <span><Check size={13} /> Sub-Second Engineering Standard</span>
          <span className="trust-divider" />
          <span><Check size={13} /> Serving London, UK &amp; US</span>
        </div>
      </div>
      <GrowthVisual />
      <span className="edge-label">SEARCH &middot; DESIGN &middot; PERFORMANCE</span>
      <div className="hero-bottom">
        <span>UNRIVALLED DIGITAL EXPERIENCES &middot; MEASURABLE COMMERCIAL VALUE</span>
        <a href="#value" aria-label="Discover what we do"><ArrowDown size={17} /></a>
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
