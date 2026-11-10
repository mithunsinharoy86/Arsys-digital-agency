import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import stylesheet from '@/index.css?url';
import '@/index.css';
import { siteOrigin } from '@/lib/site-origin.server';
import { HorizonsPreviewScripts } from './horizons-preview-scripts';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieConsent } from '@/components/cookie-consent';
import { ConsultationModalProvider } from '@/components/consultation-modal';

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
];

/**
 * Publishes the site's public origin, which `seo()` reads to build canonical and
 * `og:url` tags, and advertises the sitemap to crawlers that read response
 * headers rather than HTML.
 *
 * A `meta` export can only reach server data through `matches`, and the `headers`
 * export cannot see loader data at all, so both have to travel this way.
 */
export function loader({ request }: Route.LoaderArgs) {
	const origin = siteOrigin(request);

	return data(
		{ origin },
		{ headers: { Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml", <${origin}/llms.txt>; rel="describedby"; type="text/plain"` } },
	);
}

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
	return headers;
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		// suppressHydrationWarning absorbs attributes injected by browser extensions
		// and theme scripts before hydration; attribute-only, one element deep. Keep both.
		<html lang="en" translate="no" className="notranslate" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="google" content="notranslate" />
				<Meta />
				<Links />
				<HorizonsPreviewScripts />
			</head>
			<body translate="no" className="notranslate" suppressHydrationWarning>
				<div id="root">{children}</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<ConsultationModalProvider>
			<SiteHeader />
			<div id="main-content">
				<Outlet />
			</div>
			<SiteFooter />
			<CookieConsent />
		</ConsultationModalProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let title = 'Something went wrong';
	let details = 'An unexpected error occurred while loading this view. Please refresh or return to the homepage.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		title = error.status === 404 ? '404 · Page Not Found' : `Error ${error.status}`;
		details =
			error.status === 404
				? 'The requested page could not be found or may have been moved.'
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
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
