import { Link } from 'react-router';
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react';
import { articles, images } from '@/data/site';

const readingTimes: Record<string, string> = {
  'conversion-focused-website': '6 min read',
  'local-seo-for-service-businesses': '7 min read',
  'first-business-automation': '5 min read',
  'geo-and-ai-search-ranking': '8 min read',
  'core-web-vitals-business-impact': '6 min read',
};

const visualMap: Record<string, string> = {
  property: images.property,
  dental: images.dental,
  team: images.team,
  seo: images.seoAudit,
  ai: images.aiAutomation,
  web: images.webDevCorporate,
};

export function InsightsList() {
  return (
    <section className="section insights-grid">
      {articles.map((a) => (
        <article className="insight-card" key={a.slug}>
          <Link to={`/insights/${a.slug}`} className="insight-img-link">
            <img
              src={visualMap[a.visual] || images.team}
              width="800"
              height="600"
              loading="lazy"
              alt={`${a.category.toLowerCase()} strategic engineering photography`}
            />
            <span className="insight-category-badge">{a.category}</span>
          </Link>
          <div className="insight-content">
            <div className="insight-meta">
              <span className="insight-read-time">
                <Clock size={12} /> {readingTimes[a.slug] || '5 min read'}
              </span>
              <span className="meta-dot">·</span>
              <span className="insight-author">Klyro Works Engineering</span>
            </div>
            <h2>
              <Link to={`/insights/${a.slug}`}>{a.title}</Link>
            </h2>
            <p>{a.intro}</p>
            <div className="insight-footer">
              <Link className="insight-action-link" to={`/insights/${a.slug}`}>
                Read Article <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
