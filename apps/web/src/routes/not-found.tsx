import type { Route } from './+types/not-found';
import { seo } from '@/lib/seo';
import { Link } from 'react-router';
import { ArrowUpRight, Home, Globe, Building2, BookOpen, Mail } from 'lucide-react';

export function loader() {
  throw new Response('Page not found', { status: 404, statusText: 'Not Found' });
}

export function meta({ matches, location }: Route.MetaArgs) {
  return seo(
    { matches, location },
    {
      title: '404 · Page Not Found | Klyro Works',
      description: 'The requested page could not be found. Explore Klyro Works services, blogs, or get in touch.',
      noindex: true,
    }
  );
}

function NotFoundView() {
  return (
    <main className="section not-found-page" style={{ padding: '90px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="eyebrow" style={{ marginBottom: '12px', display: 'inline-block' }}>
          ERROR 404 · PAGE NOT FOUND
        </span>
        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '16px' }}>
          A small detour. Let’s get you back on track.
        </h1>
        <p style={{ fontSize: '16px', color: '#475569', maxWidth: '620px', margin: '0 auto 28px' }}>
          The URL you requested may have been moved, renamed, or is temporarily unavailable. Explore our key disciplines below or return to the homepage.
        </p>
        <Link to="/" className="button primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Home size={16} /> Return to Homepage
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginTop: '40px',
        }}
      >
        <Link
          to="/services"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: 'inherit',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Globe size={22} color="#146844" />
            <ArrowUpRight size={18} color="#94a3b8" />
          </div>
          <strong style={{ fontSize: '16px', color: '#060509' }}>Explore Services</strong>
          <span style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            Sub-second websites, technical SEO, and custom AI automations.
          </span>
        </Link>

        <Link
          to="/industries"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: 'inherit',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Building2 size={22} color="#2563eb" />
            <ArrowUpRight size={18} color="#94a3b8" />
          </div>
          <strong style={{ fontSize: '16px', color: '#060509' }}>Industry Playbooks</strong>
          <span style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            Tailored digital solutions for Real Estate, Dental Clinics, and D2C Brands.
          </span>
        </Link>

        <Link
          to="/blogs"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: 'inherit',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BookOpen size={22} color="#059669" />
            <ArrowUpRight size={18} color="#94a3b8" />
          </div>
          <strong style={{ fontSize: '16px', color: '#060509' }}>Engineering Blogs</strong>
          <span style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            1,000+ word guides to CRO, local SEO, and AI workflow architecture.
          </span>
        </Link>

        <Link
          to="/contact"
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: 'inherit',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Mail size={22} color="#ea580c" />
            <ArrowUpRight size={18} color="#94a3b8" />
          </div>
          <strong style={{ fontSize: '16px', color: '#060509' }}>Contact Our Team</strong>
          <span style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            Schedule a confidential 30-min architecture consultation.
          </span>
        </Link>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  return <NotFoundView />;
}

export default function NotFound() {
  return <NotFoundView />;
}
