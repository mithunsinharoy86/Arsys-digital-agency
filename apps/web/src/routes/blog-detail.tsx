import type { Route } from './+types/blog-detail';
import { seo, absoluteUrl, siteOriginFrom } from '@/lib/seo';
import { articles, images } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { ArticleContent } from '@/components/article-content';
import { ContactSection } from '@/components/contact-section';

export function loader({ params }: Route.LoaderArgs) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) throw new Response('Blog post not found', { status: 404 });
  return { article };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  if (!loaderData)
    return seo(
      { matches, location },
      {
        title: 'Blog not found | Klyro Works',
        description: 'Explore practical digital strategy and engineering guides from Klyro Works.',
        noindex: true,
      }
    );
  const { article } = loaderData;
  const origin = siteOriginFrom(matches);
  const image =
    article.visual === 'property'
      ? images.property
      : article.visual === 'dental'
      ? images.dental
      : article.visual === 'seo'
      ? images.seoAudit
      : article.visual === 'web'
      ? images.webDevCorporate
      : article.visual === 'ai'
      ? images.aiAutomation
      : images.team;

  return seo(
    { matches, location },
    {
      title: `${article.title} | Klyro Works Blog`,
      description: article.intro,
      image,
      type: 'article',
      path: `/blogs/${article.slug}`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.intro,
          image,
          author: { '@type': 'Organization', name: 'Klyro Works' },
          publisher: { '@type': 'Organization', name: 'Klyro Works' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(origin, '/') },
            { '@type': 'ListItem', position: 2, name: 'Blogs', item: absoluteUrl(origin, '/blogs') },
            { '@type': 'ListItem', position: 3, name: article.title, item: absoluteUrl(origin, `/blogs/${article.slug}`) },
          ],
        },
      ],
    }
  );
}

export default function BlogDetail({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <PageIntro
        label={loaderData.article.category}
        title={loaderData.article.title}
        description={loaderData.article.intro}
      />
      <ArticleContent article={loaderData.article} />
      <ContactSection />
    </main>
  );
}

