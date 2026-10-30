import { Home, HeartPulse, ShoppingCart, Briefcase, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Zap, Users, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function RealEstateSpecialtySection() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section industry-specialty-section real-estate-specialty">
      <div className="bespoke-header">
        <span className="eyebrow cyan-eyebrow">
          <Home size={13} className="inline-icon" /> PROPERTY TECHNOLOGY &middot; MLS/IDX &amp; VALUATION
        </span>
        <h2>
          Built for UK Estate Agents &amp; US Realtors.<br />
          <span>Turn Property Searches into Confirmed Instructions.</span>
        </h2>
        <p>
          We connect live MLS and property portal feeds with frictionless valuation booking funnels. Sub-second map search keeps prospective buyers and sellers engaged on mobile.
        </p>
      </div>

      <div className="industry-specialty-grid">
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><MapPin size={20} /></div>
          <h3>Sub-Second MLS &amp; Portal Sync</h3>
          <p>Native integration with Reapit, Dezrez, Street.co.uk, and US RESO Web API. Listings refresh automatically every 5 minutes with high-resolution floor plans and EPC tags.</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><Zap size={20} /></div>
          <h3>Bespoke Instant Online Valuation</h3>
          <p>Custom-engineered valuation calculator capturing vendor square footage, property type, and postcode to produce qualified market appraisal leads directly into your CRM.</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><ShieldCheck size={20} /></div>
          <h3>Fair Housing &amp; CPR Compliance</h3>
          <p>Built-in safeguards adhering to the UK Consumer Protection Regulations and US Fair Housing Act, ensuring all listings and demographic content meet legal standards.</p>
        </div>
      </div>

      <div className="bespoke-cta-banner cyan-glow">
        <div className="cta-banner-text">
          <h3>Ready to capture more property instructions across your territories?</h3>
          <p>We build high-converting MLS/IDX portals and instant valuation funnels for UK &amp; US agencies.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn cyan-btn"
          onClick={() => openModal('Real Estate Digital Growth')}
        >
          <span>Schedule Property Tech Consultation</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function DentalSpecialtySection() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section industry-specialty-section dental-specialty">
      <div className="bespoke-header">
        <span className="eyebrow lime-eyebrow">
          <HeartPulse size={13} className="inline-icon" /> CLINICAL EXCELLENCE &middot; PATIENT TRUST ARCHITECTURE
        </span>
        <h2>
          Dismantle Patient Dental Anxiety.<br />
          <span>Attract High-Value Cosmetic &amp; Implant Inquiries.</span>
        </h2>
        <p>
          Nervous patients need reassurance, transparent pricing, and effortless booking. We craft calm, accessible websites that turn visitors into confirmed private consultations.
        </p>
      </div>

      <div className="industry-specialty-grid">
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><HeartPulse size={20} /></div>
          <h3>Calm, Anxiety-Reducing UI</h3>
          <p>Soothing color palettes, clean medical typography, and reassuring doctor bios designed to put anxious patients at ease before they book.</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><CheckCircle2 size={20} /></div>
          <h3>Transparent 0% Finance Calculators</h3>
          <p>Interactive monthly repayment calculators for Invisalign, composite bonding, and dental implants, making high-ticket private care accessible.</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><ShieldCheck size={20} /></div>
          <h3>GDC, CQC &amp; HIPAA Standards</h3>
          <p>Strict compliance with UK General Dental Council advertising standards and US HIPAA privacy rules. Zero sensitive medical data collected on public marketing forms.</p>
        </div>
      </div>

      <div className="bespoke-cta-banner lime-glow">
        <div className="cta-banner-text">
          <h3>Attract high-value cosmetic, orthodontic &amp; implant patients</h3>
          <p>Accessible, anxiety-reducing patient booking journeys compliant with GDC, CQC, and HIPAA.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn lime-btn"
          onClick={() => openModal('Dental Clinic Digital Growth')}
        >
          <span>Schedule Dental Growth Consultation</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function EcommerceIndustrySpecialtySection() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section industry-specialty-section ecommerce-industry-specialty">
      <div className="bespoke-header">
        <span className="eyebrow orange-eyebrow">
          <ShoppingCart size={13} className="inline-icon" /> DTC SCALING &middot; HIGH CONCURRENCY ARCHITECTURE
        </span>
        <h2>
          Engineered for Drop Days &amp; Global Scale.<br />
          <span>Zero Downtime Under 10,000+ Concurrent Shoppers.</span>
        </h2>
        <p>
          Flash sales and product launches push generic stores to breaking point. We engineer headless and Shopify Plus stores that maintain sub-second response times during peak demand.
        </p>
      </div>

      <div className="industry-specialty-grid">
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><Zap size={20} /></div>
          <h3>Edge-Cached Static Commerce</h3>
          <p>Product pages cached across 300+ global edge locations. Shoppers in London, New York, and Sydney experience sub-second browsing regardless of traffic spikes.</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><ShoppingCart size={20} /></div>
          <h3>Native Bundle &amp; Tiered Upsells</h3>
          <p>Custom bundle builders and volume savings logic engineered with Shopify Functions directly into checkout, eliminating third-party app delays.</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><Users size={20} /></div>
          <h3>Klaviyo Retention Automation</h3>
          <p>Predictive churn prevention, abandoned browse triggers, and VIP post-purchase onboarding sequences driving repeat lifetime value.</p>
        </div>
      </div>

      <div className="bespoke-cta-banner orange-glow">
        <div className="cta-banner-text">
          <h3>Scale your DTC commerce brand with zero drop-day downtime</h3>
          <p>Sub-second Shopify Plus architecture and Klaviyo lifecycle automation that maximizes repeat orders.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn orange-btn"
          onClick={() => openModal('eCommerce Scale Strategy')}
        >
          <span>Schedule Commerce Consultation</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function ProfessionalServicesSpecialtySection() {
  const { openModal } = useConsultationModal();
  return (
    <section className="section bespoke-section industry-specialty-section prof-services-specialty">
      <div className="bespoke-header">
        <span className="eyebrow violet-eyebrow">
          <Briefcase size={13} className="inline-icon" /> INSTITUTIONAL AUTHORITY &middot; DUE DILIGENCE UX
        </span>
        <h2>
          Credibility Before the First Call.<br />
          <span>Positioning Corporate Practices for High-Value Mandates.</span>
        </h2>
        <p>
          Corporate decision-makers conduct deep due diligence before hiring advisory firms. We build platforms that highlight partner expertise, published precedents, and regulatory transparency.
        </p>
      </div>

      <div className="industry-specialty-grid">
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><Briefcase size={20} /></div>
          <h3>Filterable Partner &amp; Specialist Directory</h3>
          <p>Cross-referenced practice area directories showcasing partner bios, published articles, and verified credentials (SRA, Bar, ICAEW).</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><ShieldCheck size={20} /></div>
          <h3>Regulatory Price &amp; Rule Transparency</h3>
          <p>Full compliance with Solicitors Regulation Authority (SRA) price transparency guidelines and FCA financial promotion rules.</p>
        </div>
        <div className="specialty-card">
          <div className="specialty-icon-wrap"><Zap size={20} /></div>
          <h3>Conflict-Free Consultation Intake</h3>
          <p>Secure client intake forms routed directly to practice heads with preliminary conflict checks before introductory calls are scheduled.</p>
        </div>
      </div>

      <div className="bespoke-cta-banner violet-glow">
        <div className="cta-banner-text">
          <h3>Position your corporate practice for high-value client mandates</h3>
          <p>Conflict-free consultation intake and partner directories built for institutional due diligence.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn violet-btn"
          onClick={() => openModal('Professional Services Growth')}
        >
          <span>Schedule Practice Consultation</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

