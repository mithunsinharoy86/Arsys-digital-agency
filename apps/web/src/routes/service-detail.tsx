import type { Route } from './+types/service-detail';
import { seo, siteOriginFrom } from '@/lib/seo';
import { services } from '@/data/site';
import { offeringImage, offeringSchema } from '@/lib/offering-meta';
import { DetailHero } from '@/components/detail-hero';
import { DetailOverview } from '@/components/detail-overview';
import { DeliverablesSection } from '@/components/deliverables-section';
import { ServiceProjectsSection } from '@/components/service-projects-section';
import { ServiceDeepDive } from '@/components/service-deep-dive';
import { FaqSection } from '@/components/faq-section';
import { ProcessSection } from '@/components/process-section';
import { RelatedSection } from '@/components/related-section';
import { ContactSection } from '@/components/contact-section';

// Bespoke components tailored specifically to each discipline
import { SpeedComparisonSection, FullStackArchitectureSection } from '@/components/bespoke/web-dev-sections';
import { SeoSerpClusterSection, SeoAuditTeardownSection } from '@/components/bespoke/seo-sections';
import { AiWorkflowCanvasSection, AiSecurityShieldSection } from '@/components/bespoke/ai-automation-sections';
import { EcommerceFunnelTeardown, AppBloatVsNativeComparison } from '@/components/bespoke/ecommerce-sections';
import { UiUxDesignSystemSection, UserJourneyTeardownSection } from '@/components/bespoke/ui-ux-sections';
import { BrandIdentityKitSection } from '@/components/bespoke/branding-sections';
import {
  PaidMarketingEconomicsSection,
  SocialLeadershipSection,
  ContentClusterPyramidSection,
} from '@/components/bespoke/marketing-sections';

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const item = services.find((s) => s.slug === params.slug);
  if (!item) throw new Response('Service not found', { status: 404 });
  return { item };
}
clientLoader.hydrate = true;

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  if (!loaderData)
    return seo(
      { matches, location },
      {
        title: 'Service not found | Klyro Works',
        description: 'Explore the services available at Klyro Works.',
        noindex: true,
      }
    );
  const { item } = loaderData;
  return seo(
    { matches, location },
    {
      title: item.metaTitle || `${item.name} | Klyro Works`,
      description: item.metaDescription || item.summary,
      image: offeringImage(item),
      jsonLd: offeringSchema(item, siteOriginFrom(matches), location.pathname),
    }
  );
}

export default function ServiceDetail({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;

  // Render distinct layout tailored to each service discipline
  if (item.slug === 'website-development') {
    return (
      <main>
        <DetailHero item={item} />
        <SpeedComparisonSection />
        <DetailOverview item={item} />
        <FullStackArchitectureSection />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <ServiceDeepDive item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'seo') {
    return (
      <main>
        <DetailHero item={item} />
        <SeoSerpClusterSection />
        <SeoAuditTeardownSection />
        <DetailOverview item={item} />
        <ServiceProjectsSection item={item} />
        <DeliverablesSection item={item} />
        <ServiceDeepDive item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'ai-automation') {
    return (
      <main>
        <DetailHero item={item} />
        <AiWorkflowCanvasSection />
        <AiSecurityShieldSection />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'ecommerce') {
    return (
      <main>
        <DetailHero item={item} />
        <EcommerceFunnelTeardown />
        <AppBloatVsNativeComparison />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'ui-ux-design') {
    return (
      <main>
        <DetailHero item={item} />
        <UiUxDesignSystemSection />
        <UserJourneyTeardownSection />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'branding') {
    return (
      <main>
        <DetailHero item={item} />
        <BrandIdentityKitSection />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <ProcessSection />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'digital-marketing') {
    return (
      <main>
        <DetailHero item={item} />
        <PaidMarketingEconomicsSection />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'social-media-marketing') {
    return (
      <main>
        <DetailHero item={item} />
        <SocialLeadershipSection />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  if (item.slug === 'content-marketing') {
    return (
      <main>
        <DetailHero item={item} />
        <ContentClusterPyramidSection />
        <DetailOverview item={item} />
        <DeliverablesSection item={item} />
        <ServiceProjectsSection item={item} />
        <FaqSection items={item.questions} />
        <RelatedSection current={item.slug} />
        <ContactSection key={item.slug} initialService={item.name} />
      </main>
    );
  }

  // Fallback default
  return (
    <main>
      <DetailHero item={item} />
      <DetailOverview item={item} />
      <DeliverablesSection item={item} />
      <ServiceProjectsSection item={item} />
      <ServiceDeepDive item={item} />
      <ProcessSection />
      <FaqSection items={item.questions} />
      <RelatedSection current={item.slug} />
      <ContactSection key={item.slug} initialService={item.name} />
    </main>
  );
}
