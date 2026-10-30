import { seo, type SeoArgs } from '@/lib/seo';
import { images } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { TermsContent } from '@/components/terms-content';

export function meta({ matches, location }: SeoArgs) {
  return seo(
    { matches, location },
    {
      title: 'Terms of Service | Klyro Works',
      description:
        'Official commercial terms of service, intellectual property ownership, milestone agreements, and client protections for Klyro Works in the US and UK.',
      image: images.team,
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
