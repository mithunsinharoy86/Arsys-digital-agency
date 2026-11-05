import { Link } from 'react-router';
import { ArrowUpRight, ChevronRight, Check } from 'lucide-react';
import { GrowthVisual } from '@/components/growth-visual';
import { images, type Offering } from '@/data/site';
import { useConsultationModal } from '@/components/consultation-modal';

export function DetailHero({
  item,
  industry = false,
}: {
  item: Offering;
  industry?: boolean;
}) {
  const { openModal } = useConsultationModal();
  const photo =
    item.image ||
    (item.visual === 'property'
      ? images.property
      : item.visual === 'dental'
      ? images.dental
      : item.visual === 'team'
      ? images.team
      : item.visual === 'commerce'
      ? images.commerce
      : undefined);

  return (
    <section className={`detail-hero ${item.color}`}>
      <div className="detail-hero-copy">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={11} className="breadcrumb-separator" />
          <Link to={industry ? '/industries' : '/services'}>
            {industry ? 'Industries' : 'Services'}
          </Link>
          <ChevronRight size={11} className="breadcrumb-separator" />
          <span>{item.name}</span>
        </nav>
        <span className="eyebrow">{item.label}</span>
        <h1>{item.title}</h1>
        <p>{item.summary}</p>
        <div className="hero-actions">
          <button
            type="button"
            onClick={() => openModal(item.name)}
            className="button primary"
          >
            Book a Free Consultation <ArrowUpRight size={17} />
          </button>
          <a href="#deliverables" className="button secondary">
            Explore Scope &amp; Deliverables
          </a>
        </div>
        <div className="hero-trust">
          <span>
            <Check size={13} /> Sub-Second Performance Standard
          </span>
          <span className="trust-divider" />
          <span>
            <Check size={13} /> UK &amp; US Dual Compliant
          </span>
        </div>
      </div>
      {photo ? (
        <div className="detail-hero-media">
          <img
            src={photo}
            alt={`${item.name}: bespoke commercial engineering & digital strategy`}
            width="800"
            height="600"
            fetchPriority="high"
          />
          <span className="detail-hero-badge">
            ORIGINAL ARCHITECTURE &middot; KLYRO WORKS
          </span>
        </div>
      ) : (
        <GrowthVisual variant={item.visual} />
      )}
    </section>
  );
}
