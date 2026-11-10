import { Link } from 'react-router';
import { ArrowUpRight, Sliders } from 'lucide-react';
import { services } from '@/data/site';
import { useConsultationModal } from '@/components/consultation-modal';

export function SiteFooter() {
  const { openModal } = useConsultationModal();

  const openCookiePreferences = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="footer-brand">
            klyro<span>.</span>
          </Link>
          <p>
            Connected digital growth.<br />
            Strategy, websites &amp; AI automation.
          </p>
          <span className="eyebrow">UNITED STATES &middot; UNITED KINGDOM</span>
          <div className="footer-entity-note">
            Klyro Works &middot; London (UK) &amp; United States
          </div>
        </div>

        <div>
          <h3>Our expertise</h3>
          {services.slice(0, 5).map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>
              {s.name}
            </Link>
          ))}
        </div>

        <div>
          <h3>Explore Klyro Works</h3>
          <Link to="/industries">Industries we serve</Link>
          <Link to="/our-work">Our work</Link>
          <Link to="/about">About us</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/terms">Terms of service</Link>
          <Link to="/privacy">Privacy policy</Link>
        </div>

        <div>
          <h3>A good conversation starts here.</h3>
          <button
            type="button"
            className="footer-link footer-cta-btn"
            onClick={() => openModal()}
          >
            Tell us what’s next <ArrowUpRight size={20} />
          </button>
          <p>
            Have a project, a challenge,<br />
            or a better way of doing things?
          </p>
          <div className="footer-direct-contact">
            <span>Direct Inquiries: <a href="mailto:admin@klyroworks.com">admin@klyroworks.com</a></span>
            <span>Compliance: <a href="mailto:admin@klyroworks.com">admin@klyroworks.com</a></span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Klyro Works. All rights reserved.</span>
        <div className="footer-legal-links">
          <Link to="/privacy">Privacy policy</Link>
          <span className="footer-divider">&middot;</span>
          <Link to="/terms">Terms of service</Link>
          <span className="footer-divider">&middot;</span>
          <button
            type="button"
            className="footer-cookie-btn"
            onClick={openCookiePreferences}
          >
            <Sliders size={11} /> Cookie settings
          </button>
        </div>
        <span>Built with purpose. Zero dark patterns.</span>
      </div>
    </footer>
  );
}
