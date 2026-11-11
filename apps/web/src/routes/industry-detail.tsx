import type { Route } from './+types/industry-detail';
import { seo, siteOriginFrom } from '@/lib/seo';
import { industries } from '@/data/site';
import { offeringImage, offeringSchema } from '@/lib/offering-meta';
import { DetailHero } from '@/components/detail-hero';
import { DetailOverview } from '@/components/detail-overview';
import { DeliverablesSection } from '@/components/deliverables-section';
import { ServiceProjectsSection } from '@/components/service-projects-section';
import { ServiceDeepDive } from '@/components/service-deep-dive';
import { ProcessSection } from '@/components/process-section';
import { FaqSection } from '@/components/faq-section';
import { RelatedSection } from '@/components/related-section';
import { ContactSection } from '@/components/contact-section';

// Bespoke industry sections
import {
  RealEstateSpecialtySection,
  DentalSpecialtySection,
  EcommerceIndustrySpecialtySection,
  ProfessionalServicesSpecialtySection,
} from '@/components/bespoke/industry-sections';

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const item = industries.find((s) => s.slug === params.slug);
  if (!item) throw new Response('Industry not found', { status: 404 });
  return { item };
}
clientLoader.hydrate = true;

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  if (!loaderData)
    return seo(
      { matches, location },
      {
        title: 'Industry not found | Klyro Works',
        description: 'Explore the industries served by Klyro Works.',
        noindex: true,
      }
    );
  const { item } = loaderData;
  return seo(
    { matches, location },
    {
      title: `Digital Growth for ${item.name} | Klyro Works`,
      description: item.summary,
      image: offeringImage(item),
      jsonLd: offeringSchema(item, siteOriginFrom(matches), location.pathname, true),
    }
  );
}

export default function IndustryDetail({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;

  if (item.slug === 'real-estate') {
    return (
      <main>
        <DetailHero item={item} industry />
        <RealEstateSpecialtySection />
        <DetailOverview item={item} />
        <ServiceProjectsSection item={item} />
        <DeliverablesSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection industry current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'dental-clinics') {
    return (
      <main>
        <DetailHero item={item} industry />
        <DentalSpecialtySection />
        <DetailOverview item={item} />
        <ServiceProjectsSection item={item} />
        <DeliverablesSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection industry current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'ecommerce') {
    return (
      <main>
        <DetailHero item={item} industry />
        <EcommerceIndustrySpecialtySection />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection industry current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'professional-services') {
    return (
      <main>
        <DetailHero item={item} industry />
        <ProfessionalServicesSpecialtySection />
        <DetailOverview item={item} />
        <ServiceProjectsSection item={item} />
        <DeliverablesSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection industry current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  return (
    <main>
      <DetailHero item={item} industry />
      <DetailOverview item={item} />
      <DeliverablesSection item={item} />
      <ServiceProjectsSection item={item} />
      <ServiceDeepDive item={item} />
      <ProcessSection />
      <FaqSection items={item.questions} />
      <RelatedSection industry current={item.slug} />
      <ContactSection key={item.slug} initialService={item.name} />
    </main>
  );
}
