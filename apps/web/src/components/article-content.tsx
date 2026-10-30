import { articles, images } from '@/data/site';
import { Clock, ShieldCheck, UserCheck } from 'lucide-react';

const visualMap: Record<string, string> = {
  property: images.property,
  dental: images.dental,
  team: images.team,
  seo: images.seoAudit,
  ai: images.aiAutomation,
  web: images.webDevCorporate,
};

export function ArticleContent({ article }: { article: typeof articles[number] }) {
  const coverImage = visualMap[article.visual] || images.team;

  return (
    <article className="article-body">
      <div className="article-cover-wrap">
        <img
          className="article-cover"
          src={coverImage}
          width="900"
          height="600"
          alt="Editorial photography accompanying this digital strategy guide"
        />
        <div className="article-cover-meta">
          <span><UserCheck size={14} /> Klyro Works Senior Strategy Team</span>
          <span>·</span>
          <span><Clock size={14} /> 6 Min Read</span>
          <span>·</span>
          <span>Updated Q4 2026</span>
        </div>
      </div>

      <div className="article-intro-lead">
        <p>{article.intro}</p>
      </div>

      <div className="article-sections-flow">
        {article.sections.map((s, idx) => (
          <section key={s.title} className="article-section-block">
            <div className="article-section-index">0{idx + 1}</div>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </div>

      <div className="article-editorial-footer">
        <ShieldCheck size={20} className="editorial-footer-icon" />
        <div>
          <strong>Editorial Standards &amp; Compliance Notice</strong>
          <p>
            Authored by Klyro Works. This analysis provides actionable strategic recommendations based on UK &amp; US commercial best practices. We do not provide legal, clinical, or financial advice.
          </p>
        </div>
      </div>
    </article>
  );
}
