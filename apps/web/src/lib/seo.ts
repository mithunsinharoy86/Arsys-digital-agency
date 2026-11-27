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
	/** Article author, for og:article */
	author?: string;
	/** Article section/category, for og:article */
	section?: string;
	/** Article published time ISO string */
	publishedTime?: string;
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
 * High-authority Schema.org Organization and LocalBusiness descriptor for Klyro Works.
 * Fully compliant with AI Agent discovery, Google Knowledge Graph, and RFC entity standards.
 */
export function organizationSchema(origin: string) {
	const base = origin.replace(/\/$/, '');
	return {
		'@context': 'https://schema.org',
		'@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
		'@id': `${base}/#organization`,
		name: 'Klyro Works',
		legalName: 'Klyro Works Digital Agency',
		alternateName: 'Klyro',
		url: `${base}/`,
		logo: `${base}/favicon.png`,
		image: images.property,
		description:
			'Bespoke website engineering, technical SEO, digital marketing, and AI workflow automation agency serving ambitious businesses across the United States, United Kingdom, and India.',
		email: 'admin@klyroworks.com',
		telephone: '+44-20-8000-0000',
		priceRange: '$$$$',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'London',
			addressCountry: 'GB',
		},
		areaServed: [
			{ '@type': 'Country', name: 'United States' },
			{ '@type': 'Country', name: 'United Kingdom' },
			{ '@type': 'Country', name: 'India' },
		],
		sameAs: [
			'https://www.linkedin.com/company/klyroworks',
			'https://x.com/klyroworks',
			'https://twitter.com/klyroworks',
			'https://github.com/klyroworks',
			'https://www.facebook.com/klyroworks',
			'https://www.instagram.com/klyroworks',
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
			email: 'admin@klyroworks.com',
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
	const rawPath = input.path ?? location.pathname;
	const cleanPath = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
	const canonical = absoluteUrl(origin, cleanPath);
	const rawImage = input.image || images.webDevCorporate;
	const imageUrl = absoluteUrl(origin, rawImage);

	const tags: MetaDescriptor[] = [
		{ title: input.title },
		{ name: 'description', content: input.description },
		{ property: 'og:site_name', content: 'Klyro Works' },
		{ property: 'og:title', content: input.title },
		{ property: 'og:description', content: input.description },
		{ property: 'og:type', content: input.type ?? 'website' },
		{ property: 'og:url', content: canonical },
		{ property: 'og:image', content: imageUrl },
		{ property: 'og:image:secure_url', content: imageUrl },
		{ property: 'og:image:width', content: '1200' },
		{ property: 'og:image:height', content: '630' },
		{ property: 'og:image:alt', content: input.title },
		{ property: 'og:locale', content: 'en_US' },
		{ property: 'og:locale:alternate', content: 'en_GB' },
		{ property: 'og:locale:alternate', content: 'en_IN' },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:site', content: '@klyroworks' },
		{ name: 'twitter:creator', content: '@klyroworks' },
		{ name: 'twitter:title', content: input.title },
		{ name: 'twitter:description', content: input.description },
		{ name: 'twitter:image', content: imageUrl },
		{ name: 'twitter:image:alt', content: input.title },
		{ tagName: 'link', rel: 'canonical', href: canonical },
		{ name: 'geo.region', content: 'US;GB;IN' },
	];

	if (input.type === 'article') {
		tags.push({ property: 'article:publisher', content: origin });
		if (input.author) tags.push({ property: 'article:author', content: input.author });
		if (input.section) tags.push({ property: 'article:section', content: input.section });
		if (input.publishedTime) tags.push({ property: 'article:published_time', content: input.publishedTime });
	}

	if (input.noindex) {
		tags.push({ name: 'robots', content: 'noindex, nofollow' });
		tags.push({ name: 'googlebot', content: 'noindex, nofollow' });
		tags.push({ name: 'bingbot', content: 'noindex, nofollow' });
	} else {
		tags.push({
			name: 'robots',
			content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
		});
		tags.push({
			name: 'googlebot',
			content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		});
		tags.push({
			name: 'bingbot',
			content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
		});
	}

	for (const block of [input.jsonLd ?? []].flat()) {
		tags.push({ 'script:ld+json': block });
	}

	return tags;
}
