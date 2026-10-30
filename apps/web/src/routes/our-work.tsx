import { useState } from 'react';
import type { Route } from './+types/our-work';
import { seo } from '@/lib/seo';
import { images, services, industries } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { ServiceProjectsSection } from '@/components/service-projects-section';
import { WorkSection } from '@/components/work-section';
import { ProcessSection } from '@/components/process-section';
import { ContactSection } from '@/components/contact-section';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo(
    { matches, location },
    {
      title: 'Our Work & Production Benchmarks | Klyro Works',
      description:
        'Explore bespoke web applications, enterprise platforms, and digital growth experiences engineered by Klyro Works for US and UK businesses. Real architecture, sub-second performance, and verified code ownership.',
      image: images.webDevCorporate,
    }
  );
}

export default function WorkPage() {
  const categories = [
    { label: 'Web Engineering', item: services.find((s) => s.slug === 'website-development') || services[0] },
    { label: 'Technical SEO', item: services.find((s) => s.slug === 'seo') || services[1] },
    { label: 'AI Automation', item: services.find((s) => s.slug === 'ai-automation') || services[3] },
    { label: 'eCommerce Stores', item: services.find((s) => s.slug === 'ecommerce') || services[6] },
    { label: 'Dental & Healthcare', item: industries.find((s) => s.slug === 'dental-clinics') || industries[1] },
    { label: 'Real Estate & Property', item: industries.find((s) => s.slug === 'real-estate') || industries[0] },
    { label: 'Professional Services', item: industries.find((s) => s.slug === 'professional-services') || industries[3] },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeOffering = categories[activeIndex].item;

  return (
    <main>
      <PageIntro
        label="Our Work"
        title="Bespoke engineering. Measurable commercial results."
        description="Explore production architectures and client platforms designed and engineered by Klyro Works. Sub-second speed, WCAG AA accessibility, and 100% intellectual property transfer."
        action
      />
      <div className="section work-category-bar-wrapper">
        <div className="work-category-bar" role="tablist" aria-label="Filter case studies by discipline">
          {categories.map((cat, idx) => (
            <button
              key={cat.label}
              role="tab"
              aria-selected={idx === activeIndex}
              className={`work-category-pill ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span>{cat.label}</span>
              <span className="work-category-count">3 Cases</span>
            </button>
          ))}
        </div>
      </div>
      <ServiceProjectsSection key={activeOffering.slug} item={activeOffering} />
      <WorkSection full />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
