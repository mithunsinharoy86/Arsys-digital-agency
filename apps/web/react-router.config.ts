import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: 'src',
	buildDirectory: '../../dist/apps/web',
	ssr: true,
	async prerender() {
		return [
			'/',
			'/services',
			'/services/website-development',
			'/services/seo',
			'/services/digital-marketing',
			'/services/ai-automation',
			'/services/ui-ux-design',
			'/services/branding',
			'/services/ecommerce',
			'/services/social-media-marketing',
			'/services/content-marketing',
			'/industries',
			'/industries/real-estate',
			'/industries/dental-clinics',
			'/industries/ecommerce',
			'/industries/professional-services',
			'/our-work',
			'/about',
			'/blogs',
			'/blogs/conversion-focused-website',
			'/blogs/local-seo-for-service-businesses',
			'/blogs/first-business-automation',
			'/blogs/geo-and-ai-search-ranking',
			'/blogs/core-web-vitals-business-impact',
			'/contact',
			'/privacy',
			'/terms',
		];
	},
} satisfies Config;
