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
      title: 'Capabilities & Concept Showcase | Klyro Works',
      description:
        'Explore illustrative technical blueprints, enterprise web concepts, and digital architectures designed to demonstrate the engineering and design capabilities of Klyro Works.',
      image: images.webDevCorporate,
    }
  );
}

export default function WorkPage() {
  const categories = [
    { label: 'Web Development', item: services.find((s) => s.slug === 'website-development') || services[0] },
    { label: 'SaaS & Software Development', item: industries.find((s) => s.slug === 'professional-services') || services[0] },
    { label: 'AI Automation', item: services.find((s) => s.slug === 'ai-automation') || services[3] },
    { label: 'SEO & Digital Growth', item: services.find((s) => s.slug === 'seo') || services[1] },
    { label: 'eCommerce Development', item: services.find((s) => s.slug === 'ecommerce') || services[6] },
    { label: 'UI/UX Design', item: services.find((s) => s.slug === 'ui-ux-design') || services[4] },
    { label: 'Branding & Digital Identity', item: services.find((s) => s.slug === 'branding') || services[5] },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeOffering = categories[activeIndex].item;

  return (
    <main>
      <PageIntro
        label="Capabilities &amp; Concept Showcase"
        title="Demonstrated technical blueprints. Original engineering standards."
        description="Explore illustrative technical blueprints and production concepts designed to demonstrate the full-stack engineering, performance optimization, and UI/UX capabilities of Klyro Works."
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
              <span className="work-category-count">3 Blueprints</span>
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
