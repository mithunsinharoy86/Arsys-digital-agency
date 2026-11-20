import type { Route } from './+types/industries';
import { seo, absoluteUrl, siteOriginFrom, breadcrumbSchema } from '@/lib/seo';
import { images, industries } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { IndustriesSection } from '@/components/industries-section';
import { ProcessSection } from '@/components/process-section';
import { ContactSection } from '@/components/contact-section';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo(
    { matches, location },
    {
      title: 'Industries We Serve | Digital Solutions – Klyro Works',
      description:
        'Discover industry-focused digital solutions from Klyro Works. We help real estate, dental, healthcare, ecommerce and professional service businesses grow online.',
      image: images.property,
      jsonLd: [
        breadcrumbSchema(origin, [{ name: 'Industries', path: '/industries' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Industries served by Klyro Works',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: industries.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.name,
              url: absoluteUrl(origin, `/industries/${s.slug}`),
            })),
          },
        },
      ],
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
