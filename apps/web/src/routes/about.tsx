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
      title: 'About Klyro Works | Digital Growth & Technology Agency',
      description:
        'Meet Klyro Works, a digital growth partner combining website engineering, SEO, digital marketing and AI automation to help ambitious businesses scale.',
      image: images.team,
      jsonLd: breadcrumbSchema(origin, [{ name: 'About Us', path: '/about' }]),
    }
  );
}
export default function AboutPage(){return <main><PageIntro label="About Us" title="Curious thinkers. Practical problem-solvers." description="We believe the best digital work connects creativity with commercial purpose—and technology with the people who use it."/><AboutStory/><ProcessSection/><ContactSection/></main>;}
