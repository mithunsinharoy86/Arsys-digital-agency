import type { Route } from './+types/insights';
import { seo, absoluteUrl, siteOriginFrom } from '@/lib/seo';
import { images, articles } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { InsightsList } from '@/components/insights-list';
import { ContactSection } from '@/components/contact-section';
export function meta({matches,location}:Route.MetaArgs){return seo({matches,location},{title:'Digital Growth Insights | Websites, SEO & AI | Klyro Works',description:'Practical guides to conversion-focused websites, local SEO and responsible business automation. Clear advice from Klyro Works for your next digital decision.',image:images.property,jsonLd:{'@context':'https://schema.org','@type':'CollectionPage',name:'Klyro Works digital growth insights',mainEntity:{'@type':'ItemList',itemListElement:articles.map((a,i)=>({'@type':'ListItem',position:i+1,name:a.title,url:absoluteUrl(siteOriginFrom(matches),`/insights/${a.slug}`)}))}}});}
export default function InsightsPage(){return <main><PageIntro label="Insights" title="A little clarity for your next digital decision." description="Practical perspectives on websites, search, marketing and automation. Useful ideas without the unnecessary jargon."/><InsightsList/><ContactSection/></main>;}
