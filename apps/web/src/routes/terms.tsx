import { seo, siteOriginFrom, breadcrumbSchema, type SeoArgs } from '@/lib/seo';
import { images } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { TermsContent } from '@/components/terms-content';

export function meta({ matches, location }: SeoArgs) {
  const origin = siteOriginFrom(matches);
  return seo(
    { matches, location },
    {
      title: 'Terms of Service | Klyro Works',
      description:
        'Review the Klyro Works Terms of Service covering website usage, services, intellectual property, responsibilities and applicable terms and conditions.',
      image: images.team,
      jsonLd: breadcrumbSchema(origin, [{ name: 'Terms of Service', path: '/terms' }]),
    }
  );
}

export default function TermsPage() {
  return (
    <main>
      <PageIntro
        label="Commercial Terms"
        title="Clear agreements. Transparent partnerships."
        description="Our straightforward terms of service covering deliverables, intellectual property rights, milestone payments, and commercial protections."
      />
      <TermsContent />
    </main>
  );
}
