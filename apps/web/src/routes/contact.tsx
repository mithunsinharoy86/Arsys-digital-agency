import type { Route } from './+types/contact';
import { seo, siteOriginFrom, breadcrumbSchema } from '@/lib/seo';
import { images } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { ContactSection } from '@/components/contact-section';
import { FaqSection } from '@/components/faq-section';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo(
    { matches, location },
    {
      title: 'Book a Free Consultation | Klyro Works',
      description:
        'Tell Klyro Works about your website, marketing or AI automation goals. Request a free initial consultation for your US or UK business, with no obligation.',
      image: images.team,
      jsonLd: breadcrumbSchema(origin, [{ name: 'Contact', path: '/contact' }]),
    }
  );
}
export default function ContactPage(){return <main><PageIntro label="Contact" title="Your next chapter starts with a conversation." description="A project in mind? A process that needs improving? Tell us what’s happening in your business and we’ll explore the next step together."/><ContactSection/><FaqSection/></main>;}
