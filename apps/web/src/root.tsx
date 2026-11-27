import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from 'react-router';
import { useEffect } from 'react';
import type { Route } from './+types/root';
import stylesheet from '@/index.css?url';
import '@/index.css';
import { siteOrigin } from '@/lib/site-origin.server';
import { HorizonsPreviewScripts } from './horizons-preview-scripts';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieConsent } from '@/components/cookie-consent';
import { ConsultationModalProvider } from '@/components/consultation-modal';
import { MobileStickyCta } from '@/components/mobile-sticky-cta';

export const links: Route.LinksFunction = () => [
	{ rel: 'stylesheet', href: import.meta.env.DEV ? '/src/index.css?direct' : stylesheet },
	{ rel: 'icon', href: '/favicon.png', type: 'image/png' },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700&display=swap',
	},
	{ rel: 'alternate', type: 'text/markdown', href: '/llms.txt', title: 'LLM & Agent Documentation' },
	{ rel: 'service-desc', type: 'application/json', href: '/.well-known/mcp/server-card.json', title: 'MCP Server Card' },
	{ rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml', title: 'Sitemap' },
];

/**
 * Publishes the site's public origin, which `seo()` reads to build canonical and
 * `og:url` tags, and advertises the sitemap, llms.txt, and MCP Server Card to
 * crawlers and autonomous agents that read response headers rather than HTML.
 *
 * A `meta` export can only reach server data through `matches`, and the `headers`
 * export cannot see loader data at all, so both have to travel this way.
 */
export function loader({ request }: Route.LoaderArgs) {
	const origin = siteOrigin(request);

	return data(
		{ origin },
		{
			headers: {
				Link: `<${origin}/llms.txt>; rel="alternate"; type="text/markdown", <${origin}/.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json", <${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
			},
		},
	);
}

export function clientLoader() {
	const origin = typeof window !== 'undefined' ? window.location.origin : 'https://klyroworks.com';
	return { origin };
}
clientLoader.hydrate = true;

/**
 * A page route that exports `headers` replaces this one, so merge `parentHeaders`
 * there rather than returning only that route's own headers.
 */
export function headers({ loaderHeaders }: Route.HeadersArgs) {
	const headers = new Headers(loaderHeaders);
	headers.set('X-Content-Type-Options', 'nosniff');
	headers.set('X-Frame-Options', 'SAMEORIGIN');
	headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
	headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
	if (loaderHeaders.has('Link')) {
		headers.set('Link', loaderHeaders.get('Link')!);
	}
	return headers;
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		// suppressHydrationWarning absorbs attributes injected by browser extensions
		// and theme scripts before hydration; attribute-only, one element deep. Keep both.
		<html lang="en" translate="no" className="notranslate" suppressHydrationWarning>
			<head>
				{/* Google Tag Manager */}
				<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-MDGF4G75" />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());`,
					}}
				/>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="google" content="notranslate" />
				<Meta />
				<Links />
				<HorizonsPreviewScripts />
				{/* Modern Web Guidance: Speculation Rules API for instant same-origin link prefetching */}
				<script
					type="speculationrules"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							prefetch: [
								{
									where: {
										and: [
											{ href_matches: '/*' },
											{ not: { href_matches: '/api/*' } },
											{ not: { selector_matches: '[rel~=nofollow]' } },
										],
									},
									eagerness: 'moderate',
								},
							],
						}),
					}}
				/>
				{/* WebMCP Tool Registration for in-browser autonomous AI agents */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var reg=function(){if(typeof window!=='undefined'&&window.navigator&&'modelContext' in window.navigator&&typeof window.navigator.modelContext?.registerTool==='function'){window.navigator.modelContext.registerTool({name:'get_agency_capabilities',description:'Retrieve verified Klyro Works service catalog, technology stack, and commercial delivery model.',inputSchema:{type:'object',properties:{service:{type:'string',description:'Optional service category (e.g. web-dev, seo, ai-automation, ecommerce)'}}},execute:async function(){return{agency:'Klyro Works',website:'https://klyroworks.com',services:['Bespoke Website Development','Technical SEO & Generative Engine Optimization (GEO)','AI Workflow Automation & CRM Sync','Google Ads & Performance PPC','UI/UX Design Systems','Headless Ecommerce'],contact:'admin@klyroworks.com',consultationUrl:'https://klyroworks.com/contact'};}});window.navigator.modelContext.registerTool({name:'schedule_consultation',description:'Prepare or submit an inquiry to schedule a 30-minute discovery call and architecture audit with Klyro Works senior engineers.',inputSchema:{type:'object',properties:{name:{type:'string',description:'Prospective client name'},email:{type:'string',description:'Business email address'},service:{type:'string',description:'Requested service or project focus'},message:{type:'string',description:'Project overview and objectives'}},required:['name','email']},execute:async function(){return{status:'success',message:'Inquiry prepared. Complete submission on the official consultation booking modal.',url:'https://klyroworks.com/contact'};}});}};if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',reg);}else{reg();}}catch(e){}})();`,
					}}
				/>
			</head>
			<body translate="no" className="notranslate" suppressHydrationWarning>
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-MDGF4G75"
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
					/>
				</noscript>
				<div id="root" suppressHydrationWarning>{children}</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

function GtmRouteTracker() {
	const location = useLocation();

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Defer to allow the new page's document.title and meta to settle
		const timer = setTimeout(() => {
			const pagePath = location.pathname + location.search;
			const pageTitle = document.title;
			const pageLocation = window.location.href;

			// Push to GTM dataLayer for custom triggers and GA4 integration
			const dl = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer || [];
			dl.push({
				event: 'page_view',
				page_path: pagePath,
				page_title: pageTitle,
				page_location: pageLocation,
			});

			// If gtag is available, also notify gtag directly
			const win = window as unknown as { gtag?: (...args: unknown[]) => void };
			if (typeof win.gtag === 'function') {
				win.gtag('event', 'page_view', {
					page_path: pagePath,
					page_title: pageTitle,
					page_location: pageLocation,
				});
			}
		}, 60);

		return () => clearTimeout(timer);
	}, [location]);

	return null;
}

export default function App() {
	return (
		<ConsultationModalProvider>
			<GtmRouteTracker />
			<SiteHeader />
			<div id="main-content">
				<Outlet />
			</div>
			<SiteFooter />
			<CookieConsent />
			<MobileStickyCta />
		</ConsultationModalProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (typeof console !== 'undefined' && console.error) {
		console.error('[Root ErrorBoundary caught]:', error);
	}
	let title = 'Something went wrong';
	let details = 'An unexpected error occurred while loading this view. Please refresh or return to the homepage.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		title = error.status === 404 ? '404 · Page Not Found' : `Error ${error.status}`;
		details =
			error.status === 404
				? 'The requested page could not be found or may have been moved.'
				: error.statusText || details;
	} else if (error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6 py-20">
			<div className="max-w-xl w-full text-center space-y-6">
				<div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-2">
					<span className="text-2xl font-bold font-mono">!</span>
				</div>
				<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
					{title}
				</h1>
				<p className="text-neutral-400 text-base leading-relaxed">
					{details}
				</p>
				<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
					<a
						href="/"
						className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 transition-colors"
					>
						Return Home
					</a>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-neutral-700 bg-neutral-900/60 text-white font-medium text-sm hover:bg-neutral-800 transition-colors"
					>
						Reload Page
					</button>
				</div>
				{stack ? (
					<details className="mt-8 text-left bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 overflow-hidden">
						<summary className="text-xs font-mono text-neutral-400 cursor-pointer hover:text-white">
							Technical stack trace (development only)
						</summary>
						<pre className="mt-3 text-xs font-mono text-red-300/80 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-60">
							<code>{stack}</code>
						</pre>
					</details>
				) : null}
			</div>
		</main>
	);
}
