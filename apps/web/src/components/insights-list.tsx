import { Link } from 'react-router';
import { ArrowUpRight, Clock } from 'lucide-react';
import { articles, images } from '@/data/site';

const readingTimes: Record<string, string> = {
  'conversion-focused-website': '9 min read (1,150 words)',
  'local-seo-for-service-businesses': '9 min read (1,120 words)',
  'first-business-automation': '8 min read (1,080 words)',
  'geo-and-ai-search-ranking': '10 min read (1,200 words)',
  'core-web-vitals-business-impact': '9 min read (1,140 words)',
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
          <Link to={`/blogs/${a.slug}`} className="insight-img-link">
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
                <Clock size={12} /> {readingTimes[a.slug] || '8-10 min read'}
              </span>
              <span className="meta-dot">·</span>
              <span className="insight-author">Klyro Works Strategy</span>
            </div>
            <h2>
              <Link to={`/blogs/${a.slug}`}>{a.title}</Link>
            </h2>
            <p>{a.intro}</p>
            <div className="insight-footer">
              <Link className="insight-action-link" to={`/blogs/${a.slug}`}>
                Read Full Blog <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
