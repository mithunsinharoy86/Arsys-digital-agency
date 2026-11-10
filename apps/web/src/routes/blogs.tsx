import type { Route } from './+types/blogs';
import { seo, absoluteUrl, siteOriginFrom, breadcrumbSchema } from '@/lib/seo';
import { images, articles } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { InsightsList } from '@/components/insights-list';
import { ContactSection } from '@/components/contact-section';

export function meta({ matches, location }: Route.MetaArgs) {
  const origin = siteOriginFrom(matches);
  return seo(
    { matches, location },
    {
      title: 'Digital Engineering & Growth Blogs | Klyro Works',
      description:
        'In-depth, 1000+ word guides to conversion-focused web development, local SEO, AI automation, Core Web Vitals, and Generative Engine Optimization (GEO).',
      image: images.webDevCorporate,
      path: '/blogs',
      jsonLd: [
        breadcrumbSchema(origin, [{ name: 'Blogs', path: '/blogs' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Klyro Works Engineering & Growth Blogs',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: articles.map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: a.title,
              url: absoluteUrl(origin, `/blogs/${a.slug}`),
            })),
          },
        },
      ],
    }
  );
}

export default function BlogsPage() {
  return (
    <main>
      <PageIntro
        label="Engineering &amp; Strategy Blogs"
        title="Practical perspectives for your next digital growth leap."
        description="In-depth, 1000+ word technical guides on modern web development, search engine algorithms, AI automation, and conversion psychology."
      />
      <InsightsList />
      <ContactSection />
    </main>
  );
}

