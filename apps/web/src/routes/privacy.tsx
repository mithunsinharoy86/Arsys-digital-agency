import type { Route } from './+types/privacy';
import { seo } from '@/lib/seo';
import { images } from '@/data/site';
import { PageIntro } from '@/components/page-intro';
import { PrivacyContent } from '@/components/privacy-content';
export function meta({matches,location}:Route.MetaArgs){return seo({matches,location},{title:'Privacy Policy | Klyro Works',description:'Learn how Klyro Works collects and handles consultation enquiry information, and how to request access, correction or deletion of your details.',image:images.team});}
export default function PrivacyPage(){return <main><PageIntro label="Privacy" title="Your information. Handled with care." description="A clear explanation of the information this website collects and how it is used."/><PrivacyContent/></main>;}
