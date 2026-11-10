import type { Route } from './+types/home';
import { seo, siteOriginFrom, organizationSchema } from '@/lib/seo';
import { images, faqs } from '@/data/site';
import { Hero } from '@/components/home/hero';
import { Value } from '@/components/home/value';
import { ServicesGrid } from '@/components/services-grid';
import { IndustriesSection } from '@/components/industries-section';
import { WorkSection } from '@/components/work-section';
import { Automation } from '@/components/home/automation';
import { ProcessSection } from '@/components/process-section';
import { FaqSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo(
    { matches, location },
    {
      title: 'Klyro Works | Digital Growth, Websites & AI',
      description:
        'Website development, SEO, digital marketing and AI automation for US and UK businesses. Connect your digital presence with your business goals.',
      image: images.property,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Klyro Works',
          url: origin,
        },
        organizationSchema(origin),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    }
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Value />
      <ServicesGrid />
      <IndustriesSection />
      <WorkSection />
      <Automation />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
