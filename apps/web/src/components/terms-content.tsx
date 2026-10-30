import { Link } from 'react-router';
import { Shield, FileCheck, Scale, AlertCircle, Building2, HelpCircle } from 'lucide-react';

export function TermsContent() {
  return (
    <section className="privacy-copy terms-content-wrapper">
      <div className="terms-meta-card">
        <div className="terms-meta-grid">
          <div>
            <span className="eyebrow">EFFECTIVE DATE</span>
            <strong>October 2026</strong>
          </div>
          <div>
            <span className="eyebrow">APPLICABLE REGIONS</span>
            <strong>United States &amp; United Kingdom</strong>
          </div>
          <div>
            <span className="eyebrow">LEGAL ENTITIES</span>
            <strong>Klyro Works Ltd &amp; Klyro Works LLC</strong>
          </div>
          <div>
            <span className="eyebrow">INQUIRIES</span>
            <a href="mailto:admin@klyroworks.com" className="terms-email-link">
              admin@klyroworks.com
            </a>
          </div>
        </div>
      </div>

      <div className="compliance-notice-box">
        <Shield size={20} className="compliance-notice-icon" />
        <p>
          These Terms of Service govern professional digital services provided by <b>Klyro Works</b> (comprising <b>Klyro Works Ltd</b> in the UK and <b>Klyro Works LLC</b> in the USA). By engaging our services, requesting a consultation, or executing a Statement of Work (SOW), you agree to these commercial terms.
        </p>
      </div>

      <h2>1. Engagement Structure &amp; Statements of Work</h2>
      <p>
        All website design, software engineering, search engine optimization (SEO), digital marketing, and AI workflow automation projects are governed by individual written proposals, estimates, or Statements of Work (&ldquo;SOW&rdquo;) issued by Klyro Works.
      </p>
      <p>
        Each SOW outlines the specific deliverables, estimated timelines, milestone schedules, and associated fees. In the event of any conflict between these general Terms and an executed SOW, the specific terms of the SOW shall prevail for that project.
      </p>

      <h2>2. Client Responsibilities &amp; Materials</h2>
      <p>
        Successful delivery requires active collaboration. To ensure projects remain on schedule, the Client agrees to:
      </p>
      <ul className="terms-bullet-list">
        <li>Provide required brand assets, copywriting inputs, imagery, domain credentials, and API keys promptly.</li>
        <li>Review deliverables and provide consolidated feedback within five (5) business days of milestone submission.</li>
        <li>Warrant that all materials, trademarks, and content supplied to Klyro Works are owned by the Client or properly licensed, and do not infringe any third-party intellectual property or violate applicable laws.</li>
      </ul>

      <h2>3. Fees, Milestone Billing &amp; Payment Terms</h2>
      <p>
        Unless otherwise specified in your formal proposal:
      </p>
      <ul className="terms-bullet-list">
        <li><b>Fixed-Scope Projects:</b> Invoiced in structured milestones (typically an initial deposit upon project kick-off, intermediate milestone payments, and a final balance prior to public deployment or handover).</li>
        <li><b>Retainers &amp; Ongoing Services:</b> Invoiced monthly in advance on the 1st of each calendar month.</li>
        <li><b>Payment Terms:</b> Invoices are due within fourteen (14) calendar days of issue.</li>
        <li><b>Late Payments:</b> Klyro Works reserves the right to charge statutory interest on overdue commercial balances under the UK Late Payment of Commercial Debts (Interest) Act 1998 (for UK clients) or 1.5% per month / the maximum rate permitted by law (for US clients).</li>
      </ul>

      <h2>4. Intellectual Property Rights &amp; Asset Ownership</h2>
      <p>
        We believe clients should own what they pay for:
      </p>
      <ul className="terms-bullet-list">
        <li><b>Custom Deliverables:</b> Upon full and final settlement of all agreed invoices, Klyro Works assigns to the Client all worldwide rights, title, and intellectual property in the bespoke visual designs, custom copy, and unique frontend code developed specifically for the Client.</li>
        <li><b>Pre-Existing Frameworks &amp; Tools:</b> Klyro Works retains ownership of its proprietary methodologies, pre-existing software boilerplates, generic code libraries, and internal automation scripts (&ldquo;Agency Background IP&rdquo;). The Client is granted an irrevocable, perpetual, royalty-free license to use such Background IP solely in connection with the delivered website or application.</li>
        <li><b>Open Source Components:</b> Third-party open-source software (such as React, Tailwind CSS, or React Router) remains subject to its respective open-source license agreements.</li>
      </ul>

      <h2>5. Performance Disclaimers &amp; Advertising Compliance</h2>
      <div className="terms-callout-panel">
        <Scale size={22} className="terms-callout-icon" />
        <div>
          <strong>FTC &amp; UK Advertising Standards (CAP Code) Compliance</strong>
          <p>
            Klyro Works implements digital strategies grounded in empirical data, technical audits, and industry standards. However, third-party search engine algorithms (e.g., Google), advertising platforms (Google Ads, Meta), and market consumer behaviors operate outside of our direct control.
          </p>
          <p>
            <b>No Guaranteed Outcomes:</b> Klyro Works does not guarantee specific organic ranking positions (#1 ranking on search engines), specific conversion quantities, or guaranteed sales revenues. We provide realistic projections and transparent, verified performance reporting.
          </p>
        </div>
      </div>

      <h2>6. AI Automation, Data Security &amp; Oversight</h2>
      <p>
        Where services incorporate Artificial Intelligence (AI) agents, automated workflows, or LLM integrations:
      </p>
      <ul className="terms-bullet-list">
        <li><b>Human in the Loop:</b> We design systems with clear human escalation and approval checkpoints. Client teams retain editorial and commercial responsibility for final customer-facing decisions.</li>
        <li><b>Data Minimization:</b> Automated workflows are architected to ingest only the minimum necessary business data required to execute the task.</li>
        <li><b>Regulatory Healthcare &amp; Financial Safeguards:</b> Regulated clients (such as dental clinics, medical practitioners, or financial advisors) must have qualified internal personnel review all clinical or legal statements generated prior to publication.</li>
      </ul>

      <h2>7. Confidentiality &amp; Non-Disclosure</h2>
      <p>
        Both parties agree to hold all non-public business information, proprietary data, customer lists, technical architectures, and financial agreements strictly confidential. Confidential information shall not be disclosed to any third party without prior written consent, except to authorized employees, contractors, or as mandated by court order.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law:
      </p>
      <ul className="terms-bullet-list">
        <li>Neither party shall be liable for indirect, incidental, consequential, special, or punitive damages (including loss of anticipated profits, business interruption, or loss of data).</li>
        <li>Klyro Works’s total aggregate liability arising out of or related to any project shall be strictly capped at the total fees actually received by Klyro Works from the Client under the applicable SOW during the six (6) months immediately preceding the incident giving rise to liability.</li>
      </ul>

      <h2>9. 30-Day Post-Launch Warranty</h2>
      <p>
        Every custom website or web application built by Klyro Works includes a <b>thirty (30) day post-launch warranty</b>. During this window, Klyro Works will promptly investigate and rectify any demonstrable software defects or deviations from the agreed specifications at no additional charge, provided no third party has altered or tampered with the codebase.
      </p>

      <h2>10. Term &amp; Termination</h2>
      <p>
        Either party may terminate an ongoing service agreement or retainer by providing thirty (30) days’ written notice to the other party. Either party may terminate immediately if the other party commits a material breach that remains uncured for fourteen (14) days following written notice.
      </p>
      <p>
        Upon termination, the Client shall pay Klyro Works for all work completed, hours logged, and non-cancellable third-party commitments incurred up to the effective termination date.
      </p>

      <h2>11. Governing Law &amp; Dispute Resolution</h2>
      <ul className="terms-bullet-list">
        <li><b>For United Kingdom and European Clients:</b> These Terms and any dispute or claim arising out of them shall be governed by and construed in accordance with the laws of <b>England and Wales</b>, and subject to the exclusive jurisdiction of the English courts.</li>
        <li><b>For United States and International Clients:</b> These Terms shall be governed by and construed in accordance with the laws of the <b>State of Delaware</b>, without regard to conflict of law principles.</li>
        <li><b>Informal Negotiation:</b> Before initiating formal legal arbitration or court proceedings, both parties commit to engaging in good-faith executive negotiations for a minimum period of thirty (30) days.</li>
      </ul>

      <h2>12. Legal Entity Information &amp; Notices</h2>
      <div className="terms-entity-cards">
        <div className="terms-entity-box">
          <Building2 size={18} className="terms-box-icon" />
          <strong>United Kingdom Entity</strong>
          <p>
            Klyro Works Ltd<br />
            128 City Road<br />
            London, EC1V 2NX<br />
            United Kingdom<br />
            Email: <a href="mailto:uk@klyroworks.com">uk@klyroworks.com</a>
          </p>
        </div>
        <div className="terms-entity-box">
          <Building2 size={18} className="terms-box-icon" />
          <strong>United States Entity</strong>
          <p>
            Klyro Works LLC<br />
            1309 Coffeen Avenue STE 1200<br />
            Sheridan, WY 82801<br />
            United States<br />
            Email: <a href="mailto:us@klyroworks.com">us@klyroworks.com</a>
          </p>
        </div>
      </div>

      <div className="terms-bottom-actions">
        <p>Have questions regarding our terms, contracts, or master service agreements?</p>
        <Link to="/contact" className="button secondary">
          Speak With Our Legal &amp; Client Team
        </Link>
      </div>
    </section>
  );
}
