import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { industries, services } from '@/data/site';

export function RelatedSection({
  industry = false,
  current = '',
}: {
  industry?: boolean;
  current?: string;
}) {
  const allItems = industry ? services : industries;
  const items = allItems.filter((i) => i.slug !== current).slice(0, 4);

  return (
    <section className="section related-section">
      <div className="related-section-header">
        <span className="eyebrow related-eyebrow">
          {industry ? 'INTEGRATED SERVICES · EXPAND YOUR ADVANTAGE' : 'SPECIALISED VERTICALS · INDUSTRY INTELLIGENCE'}
        </span>
        <h3>
          {industry
            ? 'Explore connected services for your business.'
            : 'Explore tailored digital solutions for other industries.'}
        </h3>
      </div>
      <div className="related-links">
        {items.map((i) => (
          <Link
            key={i.slug}
            to={`/${industry ? 'services' : 'industries'}/${i.slug}`}
            className="related-pill-link"
          >
            <span>{i.name}</span>
            <ArrowUpRight size={15} />
          </Link>
        ))}
      </div>
    </section>
  );
}
