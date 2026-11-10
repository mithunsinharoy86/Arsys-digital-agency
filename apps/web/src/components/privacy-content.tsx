import { Link } from 'react-router';
import { Shield, Lock, Globe, CheckCircle, FileText, Mail, Building2 } from 'lucide-react';

export function PrivacyContent() {
  return (
    <section className="privacy-copy">
      <div className="terms-meta-card">
        <div className="terms-meta-grid">
          <div>
            <span className="eyebrow">LAST UPDATED</span>
            <strong>October 2026</strong>
          </div>
          <div>
            <span className="eyebrow">COMPLIANCE STANDARDS</span>
            <strong>UK GDPR, EU GDPR &amp; US CCPA/CPRA</strong>
          </div>
          <div>
            <span className="eyebrow">DATA CONTROLLER</span>
            <strong>Klyro Works (UK &amp; US Operations)</strong>
          </div>
          <div>
            <span className="eyebrow">PRIVACY OFFICE</span>
            <a href="mailto:admin@klyroworks.com" className="terms-email-link">
              admin@klyroworks.com
            </a>
          </div>
        </div>
      </div>

      <div className="compliance-notice-box">
        <Shield size={20} className="compliance-notice-icon" />
        <p>
          At <b>Klyro Works</b>, data protection and privacy-by-design are fundamental to how we work. This Privacy Policy details our lawful collection, usage, retention, and transfer of personal information for visitors and clients across the United States, United Kingdom, and international jurisdictions.
        </p>
      </div>

      <h2>1. Who We Are (Data Controller)</h2>
      <p>
        The entities responsible for your personal information (&ldquo;Data Controllers&rdquo; under UK/EU GDPR and &ldquo;Businesses&rdquo; under CCPA/CPRA) are:
      </p>
      <div className="terms-entity-cards">
        <div className="terms-entity-box">
          <Building2 size={18} className="terms-box-icon" />
          <strong>United Kingdom Data Controller</strong>
          <p>
            Klyro Works (UK Operations)<br />
            128 City Road<br />
            London, EC1V 2NX<br />
            United Kingdom<br />
            Supervisory Authority: UK Information Commissioner&rsquo;s Office (ICO) Guidelines<br />
            Email: <a href="mailto:admin@klyroworks.com">admin@klyroworks.com</a>
          </p>
        </div>
        <div className="terms-entity-box">
          <Building2 size={18} className="terms-box-icon" />
          <strong>United States Business</strong>
          <p>
            Klyro Works (US Operations)<br />
            1309 Coffeen Avenue STE 1200<br />
            Sheridan, WY 82801<br />
            United States<br />
            Email: <a href="mailto:us-admin@klyroworks.com">us-admin@klyroworks.com</a>
          </p>
        </div>
      </div>

      <h2>2. Categories of Information We Collect</h2>
      <p>
        We strictly adhere to the principle of <b>data minimization</b>. We only collect information necessary to evaluate your inquiry and provide professional digital services:
      </p>
      <ul className="terms-bullet-list">
        <li>
          <b>Information You Voluntarily Provide:</b> When submitting our consultation form or contacting us, you may share your full name, work email address, company or trading name, target market (US/UK/Global), service interests, and project brief description.
        </li>
        <li>
          <b>Information We Never Request:</b> Our marketing forms strictly prohibit and do not collect sensitive personal data such as financial account numbers, credit cards, government identification (SSN/National Insurance), or protected health records.
        </li>
        <li>
          <b>Automatically Logged Technical Information:</b> When browsing our website, our hosting servers collect standard server logs (including truncated IP addresses, browser user-agent, operating system, requested URL, and timestamps) solely for security diagnostics, DDoS mitigation, and system health monitoring.
        </li>
      </ul>

      <h2>3. Lawful Basis for Processing (UK &amp; EU GDPR)</h2>
      <p>
        Under Article 6 of the UK GDPR and EU GDPR, we process your personal data based on the following legal grounds:
      </p>
      <ul className="terms-bullet-list">
        <li>
          <b>Consent (Art. 6(1)(a)):</b> By explicitly opting in on our consultation form, you consent to our team reviewing your project details and contacting you for an initial consultation. You may withdraw consent at any time.
        </li>
        <li>
          <b>Pre-Contractual &amp; Contractual Necessity (Art. 6(1)(b)):</b> Processing necessary to prepare tailored proposals, scopes of work, client agreements, and to deliver agreed deliverables.
        </li>
        <li>
          <b>Legitimate Interests (Art. 6(1)(f)):</b> Protecting our web infrastructure against malicious attacks, preventing fraud, and maintaining business records.
        </li>
      </ul>

      <h2>4. United States Consumer Privacy Rights (CCPA / CPRA)</h2>
      <p>
        If you are a resident of California (under CCPA/CPRA) or other US states with applicable comprehensive privacy statutes (including Virginia, Colorado, Connecticut, and Texas), you enjoy specific statutory rights:
      </p>
      <div className="terms-callout-panel">
        <Lock size={20} className="terms-callout-icon" />
        <div>
          <strong>We Do Not Sell or Share Your Personal Information</strong>
          <p>
            Klyro Works does not sell personal information to data brokers, nor do we share or disclose your personal data for cross-context behavioral advertising. We have not sold or shared any consumer personal data in the preceding twelve (12) months.
          </p>
        </div>
      </div>
      <ul className="terms-bullet-list">
        <li><b>Right to Know &amp; Access:</b> You have the right to request the specific categories and pieces of personal information we have collected about you.</li>
        <li><b>Right to Deletion:</b> You may request that we delete any personal information collected directly from you, subject to legal record retention exemptions.</li>
        <li><b>Right to Correction:</b> You may request correction of inaccurate personal data maintained by us.</li>
        <li><b>Right to Non-Discrimination:</b> We will never discriminate against you, alter service pricing, or degrade service quality for exercising your statutory privacy rights.</li>
      </ul>

      <h2>5. United Kingdom &amp; European Data Subject Rights</h2>
      <p>
        Under UK GDPR and the Data Protection Act 2018, UK and European visitors have the right to:
      </p>
      <ul className="terms-bullet-list">
        <li>Request access to your personal data via a Subject Access Request (SAR).</li>
        <li>Request correction of inaccurate or incomplete data.</li>
        <li>Request erasure of your personal data (&ldquo;Right to be Forgotten&rdquo;) where processing is no longer required.</li>
        <li>Restrict or object to our processing of your personal information.</li>
        <li>Request data portability in a structured, machine-readable format.</li>
        <li>
          <b>Right to Lodge a Complaint:</b> You have the right to file a complaint with the UK supervisory authority:
          <br />
          <b>Information Commissioner’s Office (ICO)</b>
          <br />
          Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a> | Helpline: +44 0303 123 1113
        </li>
      </ul>

      <h2>6. Cookies &amp; Tracking Technologies</h2>
      <p>
        Our website operates on a <b>Privacy-First architecture</b>:
      </p>
      <ul className="terms-bullet-list">
        <li><b>Strictly Necessary Cookies:</b> Essential for secure page routing, CSRF prevention, and basic site navigation.</li>
        <li><b>No Intrusive Ad Tracking:</b> We do not deploy third-party advertising cookies, fingerprinting scripts, or cross-site tracking pixels on this website.</li>
        <li><b>Consent Management:</b> You can inspect and update your cookie preferences at any time by clicking the <button type="button" className="inline-cookie-link" onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}>Cookie Settings</button> button.</li>
      </ul>

      <h2>7. Data Retention &amp; International Transfers</h2>
      <p>
        Enquiry data is retained for up to twelve (12) months following our last interaction, after which it is securely deleted, unless a formal commercial contract is established (in which case relevant financial and contractual records are retained for six (6) years to comply with statutory UK HMRC and US IRS accounting obligations).
      </p>
      <p>
        Where personal data is transferred across borders between the UK, US, and EU, we ensure adequate protection through approved <b>Standard Contractual Clauses (SCCs)</b> and the <b>UK International Data Transfer Addendum</b>.
      </p>

      <h2>8. How to Exercise Your Privacy Rights</h2>
      <p>
        To submit a verified data access, deletion, or correction request, please contact our designated Data Protection Lead:
      </p>
      <div className="terms-contact-card">
        <Mail size={20} className="terms-box-icon" />
        <div>
          <strong>Privacy &amp; Data Rights Requests</strong>
          <p>
            Email: <a href="mailto:admin@klyroworks.com">admin@klyroworks.com</a>
            <br />
            Subject: <i>&ldquo;Data Subject Rights Request - [Your Name]&rdquo;</i>
          </p>
          <small>
            We respond to all verified requests within thirty (30) days as required under UK GDPR and forty-five (45) days under CCPA. We may request proof of identity to protect against unauthorized data disclosure.
          </small>
        </div>
      </div>
    </section>
  );
}
