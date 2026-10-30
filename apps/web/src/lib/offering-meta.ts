import { images, type Offering } from '@/data/site';
export function offeringImage(item: Offering) {
  return (
    item.image ||
    (item.visual === 'property'
      ? images.property
      : item.visual === 'dental'
      ? images.dental
      : item.visual === 'commerce'
      ? images.commerce
      : images.team)
  );
}
export function offeringSchema(item:Offering, origin = '', path = '', industry = false){return [ {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${origin}/`},{'@type':'ListItem',position:2,name:industry ? 'Industries' : 'Services',item:`${origin}/${industry ? 'industries' : 'services'}`},{'@type':'ListItem',position:3,name:item.name,item:`${origin}${path}`}]}, {'@context':'https://schema.org','@type':'Service',name:item.name,description:item.summary,provider:{'@type':'Organization',name:'Klyro Works'},areaServed:['United States','United Kingdom']}, {'@context':'https://schema.org','@type':'FAQPage',mainEntity:item.questions.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))} ];}
