import type { Route } from './+types/privacy';
import { seo, siteOriginFrom, breadcrumbSchema } from '@/lib/seo';
import { images } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { PrivacyContent } from '@/components/privacy-content';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo(
    { matches, location },
    {
      title: 'Privacy Policy | Klyro Works',
      description:
        'Read the Klyro Works Privacy Policy to understand how we collect, use, protect and manage personal information and website visitor data.',
      image: images.team,
      jsonLd: breadcrumbSchema(origin, [{ name: 'Privacy Policy', path: '/privacy' }]),
    }
  );
}
export default function PrivacyPage(){return <main><PageIntro label="Privacy" title="Your information. Handled with care." description="A clear explanation of the information this website collects and how it is used."/><PrivacyContent/></main>;}
