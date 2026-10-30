import { Link } from 'react-router';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function PageIntro({
  label,
  title,
  description,
  action = false,
}: {
  label: string;
  title: string;
  description: string;
  action?: boolean;
}) {
  const { openModal } = useConsultationModal();

  return (
    <section className="page-intro">
      <div className="page-intro-aura" />
      <div className="page-intro-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={11} className="breadcrumb-separator" />
          <span>{label}</span>
        </nav>
        <div className="eyebrow page-intro-eyebrow">
          <span className="live-dot" /> KLYRO WORKS &middot; {label.toUpperCase()}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
        {action && (
          <div className="page-intro-actions">
            <button
              type="button"
              className="button primary"
              onClick={() => openModal()}
            >
              Request a Free Consultation <ArrowUpRight size={17} />
            </button>
            <Link to="/our-work" className="button secondary">
              Explore Benchmarks &amp; Work
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
