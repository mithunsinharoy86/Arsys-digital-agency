import React from 'react';
import { Link } from 'react-router';
import { articles, images } from '@/data/site';
import { Clock, UserCheck, CheckCircle2, ArrowUpRight, HelpCircle } from 'lucide-react';

const visualMap: Record<string, string> = {
  property: images.property,
  dental: images.dental,
  team: images.team,
  seo: images.seoAudit,
  ai: images.aiAutomation,
  web: images.webDevCorporate,
  marketing: images.digitalMarketing,
  ecommerce: images.ecommerceStore,
  design: images.uiUxDesign,
  branding: images.brandingIdentity,
  healthcare: images.dentalAesthetic,
};

const serviceLinkMap: Record<string, { title: string; href: string; label: string }> = {
  'conversion-focused-website': {
    title: 'Website Development & Engineering',
    href: '/services/website-development',
    label: 'Connected Core Service',
  },
  'local-seo-for-service-businesses': {
    title: 'Technical & Commercial SEO Architecture',
    href: '/services/seo',
    label: 'Connected Core Service',
  },
  'first-business-automation': {
    title: 'AI Automation & CRM Synchronisation',
    href: '/services/ai-automation',
    label: 'Connected Core Service',
  },
  'geo-and-ai-search-ranking': {
    title: 'Technical & Generative SEO (GEO)',
    href: '/services/seo',
    label: 'Connected Core Service',
  },
  'core-web-vitals-business-impact': {
    title: 'Sub-Second React & Next.js Platforms',
    href: '/services/website-development',
    label: 'Connected Core Service',
  },
  'b2b-google-ads-ppc-scaling-playbook': {
    title: 'Data-Driven Google Ads & PPC Management',
    href: '/services/digital-marketing',
    label: 'Connected Core Service',
  },
  'ai-lead-qualification-and-crm-automation': {
    title: 'AI Workflow Automation & CRM Sync',
    href: '/services/ai-automation',
    label: 'Connected Core Service',
  },
  'headless-ecommerce-shopify-growth-architecture': {
    title: 'High-Performance Headless Ecommerce',
    href: '/services/ecommerce',
    label: 'Connected Core Service',
  },
  'b2b-website-redesign-strategy-and-roi': {
    title: 'Enterprise Corporate Web Development',
    href: '/services/website-development',
    label: 'Connected Core Service',
  },
  'healthcare-patient-acquisition-funnels': {
    title: 'Healthcare & Dental Practice Growth',
    href: '/industries/dental-clinics',
    label: 'Connected Core Service',
  },
};

/**
 * Parses markdown-style links [Anchor Text](/path) or [Anchor Text](https://...)
 * into accessible internal React Router <Link> or external <a> elements.
 */
function renderRichText(text: string): React.ReactNode {
  if (!text || typeof text !== 'string') return text;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  if (!regex.test(text)) return text;
  regex.lastIndex = 0;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];

    if (href.startsWith('/')) {
      parts.push(
        <Link key={match.index} to={href} className="article-inline-link">
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="article-inline-link">
          {label}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function ArticleContent({ article }: { article: typeof articles[number] }) {
  const coverImage = visualMap[article.visual] || images.team;
  const relatedService = serviceLinkMap[article.slug];
  const companionArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  // Type helper for rich fields that may exist on extended articles
  const artAny = article as Record<string, any>;

  return (
    <article className="article-body">
      <div className="article-cover-wrap">
        <img
          className="article-cover"
          src={coverImage}
          width="900"
          height="600"
          alt="Editorial photography accompanying this digital strategy guide"
          loading="lazy"
          decoding="async"
        />
        <div className="article-cover-meta">
          <span>
            <UserCheck size={14} /> Klyro Works Senior Strategy &amp; Engineering Team
          </span>
          <span>·</span>
          <span>
            <Clock size={14} /> 10&ndash;14 Min Read (1,200+ Words)
          </span>
          <span>·</span>
          <span>Updated Q4 2026</span>
        </div>
      </div>

      <div className="article-intro-lead">
        <p>{renderRichText(article.intro)}</p>
      </div>

      <div className="article-sections-flow">
        {article.sections.map((s: any, sIdx: number) => (
          <section key={s.title || sIdx} className="article-section-block">
            <h2>{s.title}</h2>

            {/* In-between Section Image if present */}
            {s.image && s.image.src && (
              <figure className="article-mid-image-wrap">
                <img
                  src={s.image.src}
                  alt={s.image.alt || s.title}
                  loading="lazy"
                  decoding="async"
                  className="article-mid-image"
                />
                {s.image.caption && (
                  <figcaption className="article-mid-caption">{s.image.caption}</figcaption>
                )}
              </figure>
            )}

            {/* Paragraphs */}
            {'paragraphs' in s && Array.isArray(s.paragraphs) ? (
              s.paragraphs.map((para: string, pIdx: number) => (
                <p key={pIdx} className="article-para">
                  {renderRichText(para)}
                </p>
              ))
            ) : 'text' in s && typeof s.text === 'string' && s.text ? (
              <p className="article-para">{renderRichText(s.text)}</p>
            ) : null}

            {/* Bullet points if present */}
            {'bullets' in s && Array.isArray(s.bullets) && s.bullets.length > 0 && (
              <ul className="article-bullets-list">
                {s.bullets.map((bullet: string, bIdx: number) => (
                  <li key={bIdx} className="article-bullet-item">
                    <CheckCircle2 size={16} className="bullet-check-icon" />
                    <span>{renderRichText(bullet)}</span>
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
                          <td key={cIdx}>{renderRichText(cell)}</td>
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
                  {renderRichText(para)}
                </p>
              ))
            )}

            {/* Mid-Article Call to Action Card if present */}
            {s.cta && (
              <div className="article-mid-cta-card">
                <div className="article-mid-cta-content">
                  {s.cta.badge && <span className="article-mid-cta-badge">{s.cta.badge}</span>}
                  <h4>{s.cta.title}</h4>
                  <p>{s.cta.description}</p>
                </div>
                <Link to={s.cta.buttonHref || '/contact'} className="article-mid-cta-btn">
                  {s.cta.buttonText || 'Schedule Free Architecture Call'} <ArrowUpRight size={16} />
                </Link>
              </div>
            )}

            {/* Strategic Callout Takeaway */}
            {'callout' in s && s.callout && (
              <div className="article-callout-card">
                <strong>Strategic Framework Takeaway</strong>
                <p>{renderRichText(s.callout)}</p>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Structured Conclusion Section if present */}
      {artAny.conclusion && (
        <section className="article-conclusion-block">
          <h2>{artAny.conclusion.title || 'Strategic Conclusion & Implementation Roadmap'}</h2>
          {Array.isArray(artAny.conclusion.paragraphs) &&
            artAny.conclusion.paragraphs.map((cPara: string, cIdx: number) => (
              <p key={cIdx} className="article-para">
                {renderRichText(cPara)}
              </p>
            ))}
          {artAny.conclusion.takeaway && (
            <div className="article-callout-card" style={{ marginTop: '20px' }}>
              <strong>Key Executive Takeaway</strong>
              <p>{renderRichText(artAny.conclusion.takeaway)}</p>
            </div>
          )}
        </section>
      )}

      {/* Frequently Asked Questions (FAQs) Section if present */}
      {artAny.faqs && Array.isArray(artAny.faqs) && artAny.faqs.length > 0 && (
        <section className="article-faqs-section">
          <div className="article-faqs-header">
            <span className="eyebrow">COMMON CLIENT INQUIRIES &middot; STRATEGIC FAQS</span>
            <h2>Frequently Asked Questions</h2>
            <p>Direct answers to technical, operational, and commercial questions regarding this implementation.</p>
          </div>
          <div className="article-faqs-list">
            {artAny.faqs.map((faq: { question: string; answer: string }, fIdx: number) => (
              <div key={fIdx} className="article-faq-item">
                <h3>
                  <HelpCircle size={18} className="faq-question-icon" /> {faq.question}
                </h3>
                <p>{renderRichText(faq.answer)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internal Links Hub */}
      <div className="article-internal-links-hub">
        <span className="eyebrow">STRATEGIC NEXT STEPS &middot; CONNECTED DISCIPLINES</span>
        <h3>Put this strategic framework into production</h3>
        <div className="article-internal-links-grid">
          {relatedService && (
            <Link to={relatedService.href} className="article-internal-link-card highlight">
              <span className="card-tag">{relatedService.label}</span>
              <strong>{relatedService.title}</strong>
              <p>Explore commercial deliverables, tech stacks, and performance benchmarks.</p>
              <span className="link-cta">View Service Scope <ArrowUpRight size={14} /></span>
            </Link>
          )}
          {companionArticles.map((comp) => (
            <Link key={comp.slug} to={`/blogs/${comp.slug}`} className="article-internal-link-card">
              <span className="card-tag">{comp.category}</span>
              <strong>{comp.title}</strong>
              <p>{comp.intro.slice(0, 95)}...</p>
              <span className="link-cta">Read Guide <ArrowUpRight size={14} /></span>
            </Link>
          ))}
        </div>
      </div>

      <div className="article-editorial-footer">
        <div className="article-editorial-logo-circle" aria-hidden="true">
          <img
            src="/favicon.png"
            alt="Klyro Works Logo"
            className="article-editorial-logo-img"
            width="52"
            height="52"
            loading="lazy"
            decoding="async"
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
