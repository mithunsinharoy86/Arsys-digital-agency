import type { Route } from './+types/services';
import { seo, absoluteUrl, siteOriginFrom } from '@/lib/seo';
import { images, services } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { ServicesGrid } from '@/components/services-grid';
import { ProcessSection } from '@/components/process-section';
import { Automation } from '@/components/home/automation';
import { ContactSection } from '@/components/contact-section';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo(
    { matches, location },
    {
      title: 'Digital Services | Web Engineering, SEO & AI Automation | Klyro Works',
      description:
        'Explore Klyro Works services: Bespoke Website Development, Commercial Technical SEO, UI/UX Design, Paid Search, and AI Workflow Automations for US and UK businesses.',
      image: images.team,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Klyro Works digital services',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.name,
            url: absoluteUrl(siteOriginFrom(matches), `/services/${s.slug}`),
          })),
        },
      },
    }
  );
}

export default function ServicesPage() {
  return (
    <main>
      <PageIntro
        label="Services"
        title="Bespoke expertise. Connected around commercial growth."
        description="From sub-second corporate websites and commercial technical SEO to automated lead workflows, we bring strategy, creativity, and engineering together with zero vendor lock-in."
        action
      />
      <ServicesGrid full />
      <ProcessSection />
      <Automation />
      <ContactSection />
    </main>
  );
}
