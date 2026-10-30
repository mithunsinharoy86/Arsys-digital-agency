import type { Route } from './+types/industries';
import { seo, absoluteUrl, siteOriginFrom } from '@/lib/seo';
import { images, industries } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { IndustriesSection } from '@/components/industries-section';
import { ProcessSection } from '@/components/process-section';
import { ContactSection } from '@/components/contact-section';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo(
    { matches, location },
    {
      title: 'Industries We Help | Real Estate, Dental & More | Klyro Works',
      description:
        'Industry-focused digital growth for real estate, dental clinics, ecommerce and professional services. Discover solutions for US and UK businesses.',
      image: images.property,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Industries served by Klyro Works',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: industries.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.name,
            url: absoluteUrl(siteOriginFrom(matches), `/industries/${s.slug}`),
          })),
        },
      },
    }
  );
}

export default function IndustriesPage() {
  return (
    <main>
      <PageIntro
        label="Industries"
        title="Your business has its own world. We build for it."
        description="Different audiences. Different decisions. We adapt your website, marketing and automation around the realities of your industry."
        action
      />
      <IndustriesSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
