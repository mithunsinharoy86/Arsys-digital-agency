import type { Route } from './+types/about';
import { seo, siteOriginFrom, breadcrumbSchema } from '@/lib/seo';
import { images } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { AboutStory } from '@/components/about-story';
import { ProcessSection } from '@/components/process-section';
import { ContactSection } from '@/components/contact-section';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo(
    { matches, location },
    {
      title: 'About Klyro Works | Your Connected Digital Growth Partner',
      description:
        'Meet the thinking behind Klyro Works: business-first strategy, thoughtful design and practical technology for companies across the US and UK.',
      image: images.team,
      jsonLd: breadcrumbSchema(origin, [{ name: 'About Us', path: '/about' }]),
    }
  );
}
export default function AboutPage(){return <main><PageIntro label="About Us" title="Curious thinkers. Practical problem-solvers." description="We believe the best digital work connects creativity with commercial purpose—and technology with the people who use it."/><AboutStory/><ProcessSection/><ContactSection/></main>;}
