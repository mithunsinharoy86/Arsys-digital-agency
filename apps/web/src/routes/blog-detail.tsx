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

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) throw new Response('Blog post not found', { status: 404 });
  return { article };
}
clientLoader.hydrate = true;

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
      : article.visual === 'marketing'
      ? images.digitalMarketing
      : article.visual === 'ecommerce'
      ? images.ecommerceStore
      : article.visual === 'design'
      ? images.uiUxDesign
      : article.visual === 'branding'
      ? images.brandingIdentity
      : article.visual === 'healthcare'
      ? images.dentalAesthetic
      : images.team;

  const artAny = article as Record<string, any>;
  const faqSchema =
    artAny.faqs && Array.isArray(artAny.faqs) && artAny.faqs.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: artAny.faqs.map((f: { question: string; answer: string }) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'),
              },
            })),
          },
        ]
      : [];

  return seo(
    { matches, location },
    {
      title: `${article.title} | Klyro Works Blog`,
      description: article.intro,
      image,
      type: 'article',
      section: article.category,
      author: 'Klyro Works',
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
        ...faqSchema,
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
        hideEyebrow={true}
        centered={true}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
          { label: loaderData.article.category },
        ]}
      />
      <ArticleContent article={loaderData.article} />
      <ContactSection />
    </main>
  );
}

