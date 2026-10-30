import type { Route } from './+types/not-found';
import { seo } from '@/lib/seo';
import { Link } from 'react-router';
import { PageIntro } from '@/components/page-intro';
export function loader(){throw new Response('Page not found',{status:404});}
export function meta({matches,location}:Route.MetaArgs){return seo({matches,location},{title:'Page not found | Klyro Works',description:'This page is not available. Explore Klyro Works services or get in touch.',noindex:true});}
export function ErrorBoundary(){return <main><PageIntro label="404" title="A small detour. Let’s get you back on track." description="The page you’re looking for isn’t here. Explore our services or tell us about your project."/><div className="section"><Link to="/" className="button primary">Back to home</Link><Link to="/services" className="button secondary" style={{marginLeft:15}}>Explore services</Link></div></main>;}
export default function NotFound(){return null;}
