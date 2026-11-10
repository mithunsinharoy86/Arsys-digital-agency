/**
 * Builds the tags an indexable page needs — title, description, canonical URL,
 * Open Graph, X/Twitter card, and any JSON-LD — from one call in the route's
 * `meta` export.
 *
 * Canonical and `og:url` have to be absolute, and only the server knows the
 * site's public origin, so the root route publishes it and this reads it back
 * out of `matches`. A page that writes `<meta>` tags by hand instead ends up
 * with no canonical URL and nothing for social platforms to show.
 *
 * X falls back to the `og:` tags, so the `twitter:` ones repeat them only
 * because SEO audits score the card tags on their own.
 */
import type { MetaDescriptor } from 'react-router';
import { images } from '@/data/site';

type RouteMatchLike = { id: string; loaderData: unknown } | undefined;

export type SeoArgs = {
	matches: readonly RouteMatchLike[];
	location: { pathname: string };
};

export type SeoInput = {
	/** Unique to this page, under ~60 characters. */
	title: string;
	/** Unique to this page, 120-160 characters. */
	description: string;
	/** Canonical path, when it differs from the URL being rendered. */
	path?: string;
	/** Social card image, absolute or root-relative. */
	image?: string;
	/** `article` for blog posts and news, `website` for everything else. */
	type?: 'website' | 'article';
	/**
	 * Keeps the page out of search results while still letting crawlers follow
	 * its links. Not access control. Add `nofollow` as an extra descriptor when
	 * a page genuinely needs it.
	 */
	noindex?: boolean;
	/** Schema.org objects, one `<script type="application/ld+json">` each. */
	jsonLd?: object | object[];
};

const ROOT_ROUTE_ID = 'root';

/** The site's public origin, as published by the root loader with robust client & default fallback. */
export const siteOriginFrom = (matches: readonly RouteMatchLike[]): string => {
	const root = matches.find(match => match?.id === ROOT_ROUTE_ID);
	const fromRoot = (root?.loaderData as { origin?: string } | undefined)?.origin;
	if (fromRoot) return fromRoot;
	if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
	return 'https://klyroworks.com';
};

export const absoluteUrl = (origin: string, target: string): string => {
	if (/^https?:\/\//.test(target)) {
		return target;
	}

	const base = origin.replace(/\/$/, '');
	const path = target.startsWith('/') ? target : `/${target}`;
	return `${base}${path}`;
};

/**
 * High-authority Schema.org Organization descriptor for Klyro Works.
 */
export function organizationSchema(origin: string) {
	const base = origin.replace(/\/$/, '');
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${base}/#organization`,
		name: 'Klyro Works',
		alternateName: 'Klyro',
		url: base,
		logo: `${base}/favicon.png`,
		image: images.property,
		description:
			'Bespoke website engineering, technical SEO, digital marketing, and AI workflow automation agency serving ambitious businesses across the United States and United Kingdom.',
		email: 'hello@klyroworks.com',
		telephone: '+44-20-8000-0000',
		priceRange: '$$$$',
		areaServed: [
			{ '@type': 'Country', name: 'United States' },
			{ '@type': 'Country', name: 'United Kingdom' },
		],
		knowsAbout: [
			'Website Engineering',
			'Technical SEO',
			'Generative Engine Optimization (GEO)',
			'AI Workflow Automation',
			'UI/UX Design Systems',
			'Headless Ecommerce',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'sales and consultations',
			email: 'hello@klyroworks.com',
			availableLanguage: ['English'],
		},
	};
}

/**
 * Standard Schema.org BreadcrumbList generator.
 */
export function breadcrumbSchema(origin: string, items: Array<{ name: string; path?: string }>) {
	const base = origin.replace(/\/$/, '');
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
			...items.map((item, idx) => ({
				'@type': 'ListItem',
				position: idx + 2,
				name: item.name,
				...(item.path ? { item: `${base}${item.path.startsWith('/') ? item.path : `/${item.path}`}` } : {}),
			})),
		],
	};
}

export function seo({ matches, location }: SeoArgs, input: SeoInput): MetaDescriptor[] {
	const origin = siteOriginFrom(matches);
	const canonical = absoluteUrl(origin, input.path ?? location.pathname);
	const rawImage = input.image || images.webDevCorporate;
	const imageUrl = absoluteUrl(origin, rawImage);

	const tags: MetaDescriptor[] = [
		{ title: input.title },
		{ name: 'description', content: input.description },
		{ property: 'og:title', content: input.title },
		{ property: 'og:description', content: input.description },
		{ property: 'og:type', content: input.type ?? 'website' },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: input.title },
		{ name: 'twitter:description', content: input.description },
		{ tagName: 'link', rel: 'canonical', href: canonical },
		{ property: 'og:url', content: canonical },
		{ property: 'og:image', content: imageUrl },
		{ name: 'twitter:image', content: imageUrl },
	];

	if (input.noindex) {
		tags.push({ name: 'robots', content: 'noindex, nofollow' });
	}

	for (const block of [input.jsonLd ?? []].flat()) {
		tags.push({ 'script:ld+json': block });
	}

	return tags;
}
