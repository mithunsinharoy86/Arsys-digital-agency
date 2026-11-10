import { articles, images } from '@/data/site';
import { Clock, UserCheck, CheckCircle2 } from 'lucide-react';

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
          <span>
            <UserCheck size={14} /> Klyro Works Senior Strategy &amp; Engineering Team
          </span>
          <span>·</span>
          <span>
            <Clock size={14} /> 8&ndash;10 Min Read (1,000+ Words)
          </span>
          <span>·</span>
          <span>Updated Q4 2026</span>
        </div>
      </div>

      <div className="article-intro-lead">
        <p>{article.intro}</p>
      </div>

      <div className="article-sections-flow">
        {article.sections.map((s) => (
          <section key={s.title} className="article-section-block">
            <h2>{s.title}</h2>

            {/* Paragraphs */}
            {'paragraphs' in s && Array.isArray(s.paragraphs) ? (
              s.paragraphs.map((para: string, pIdx: number) => (
                <p key={pIdx} className="article-para">
                  {para}
                </p>
              ))
            ) : (
              'text' in s && s.text && <p className="article-para">{s.text}</p>
            )}

            {/* Bullet points if present */}
            {'bullets' in s && Array.isArray(s.bullets) && s.bullets.length > 0 && (
              <ul className="article-bullets-list">
                {s.bullets.map((bullet: string, bIdx: number) => (
                  <li key={bIdx} className="article-bullet-item">
                    <CheckCircle2 size={16} className="bullet-check-icon" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Structured Comparison Table if present */}
            {'table' in s && s.table && (
              <div className="article-table-wrap">
                <table className="article-table">
                  <thead>
                    <tr>
                      {s.table.headers.map((h: string, hIdx: number) => (
                        <th key={hIdx}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row: string[], rIdx: number) => (
                      <tr key={rIdx}>
                        {row.map((cell: string, cIdx: number) => (
                          <td key={cIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Paragraphs After Table if present */}
            {'paragraphs_after' in s && Array.isArray(s.paragraphs_after) && (
              s.paragraphs_after.map((para: string, pIdx: number) => (
                <p key={`after-${pIdx}`} className="article-para">
                  {para}
                </p>
              ))
            )}

            {/* Strategic Callout Takeaway */}
            {'callout' in s && s.callout && (
              <div className="article-callout-card">
                <strong>Strategic Framework Takeaway</strong>
                <p>{s.callout}</p>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="article-editorial-footer">
        <div className="article-editorial-logo-circle" aria-hidden="true">
          <img
            src="/favicon.png"
            alt="Klyro Works Logo"
            className="article-editorial-logo-img"
            width="52"
            height="52"
          />
        </div>
        <div>
          <strong>Editorial Standards &amp; Compliance Notice</strong>
          <p>
            Authored by Klyro Works Senior Strategy &amp; Engineering Team. This publication provides actionable strategic frameworks based on UK, US, and international digital engineering best practices. We do not make unsubstantiated commercial guarantees.
          </p>
        </div>
      </div>
    </article>
  );
}
