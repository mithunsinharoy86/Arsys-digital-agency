import { useState, useRef, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Check, ShieldCheck, Mail } from 'lucide-react';
import { services, images } from '@/data/site';

export function ContactSection({
  compact = false,
  initialService = '',
}: {
  compact?: boolean;
  initialService?: string;
}) {
  const [searchParams] = useSearchParams();
  const selectedService =
    services.find((s) => s.slug === searchParams.get('service'))?.name ||
    initialService;
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRenderedAt = useRef(Date.now());
  const lastPayloadRef = useRef<{
    name: string;
    email: string;
    company: string;
    service: string;
    market: string;
    message: string;
  } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    // Multi-layer anti-spam honeypot (silent success)
    if (
      values.get('website_url') ||
      values.get('company_website_url') ||
      values.get('phone_verify') ||
      values.get('secondary_email')
    ) {
      setStatus('success');
      form.reset();
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const enquiryPayload = {
      recipient: 'admin@klyroworks.com',
      name: values.get('name') as string,
      email: values.get('email') as string,
      company: (values.get('company') as string) || '',
      service: values.get('service') as string,
      market: values.get('market') as string,
      message: values.get('message') as string,
      consent: true,
      _form_rendered_at: formRenderedAt.current,
      timestamp: new Date().toISOString(),
    };
    lastPayloadRef.current = enquiryPayload;

    try {
      // Primary: submit to /api/consultation endpoint (handled by PHP on Hostinger)
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(enquiryPayload),
      });

      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }

      const data = await response.json().catch(() => null);
      if (!data || data.ok === false) {
        throw new Error(data?.error || 'Failed to submit enquiry');
      }

      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      console.error('Contact form error:', err);
      // Graceful offline fallback: save locally so prospect inquiries are never lost
      try {
        const stored = JSON.parse(localStorage.getItem('klyro_enquiries_fallback') || '[]');
        stored.push(enquiryPayload);
        localStorage.setItem('klyro_enquiries_fallback', JSON.stringify(stored));
      } catch (localErr) {
        console.warn('LocalStorage unavailable', localErr);
      }
      setErrorMessage(err instanceof Error ? err.message : 'We could not reach the server.');
      setStatus('error');
    }
  }

  return (
    <section
      className={`section contact-section ${compact ? 'compact' : ''}`}
      id="consultation"
      aria-labelledby="contact-heading"
    >
      <div className="contact-split-card">
        {/* Left Side: Editorial Photography & Trust Scrim */}
        <div className="contact-split-visual">
          <img
            src={images.team}
            alt="Klyro Works Senior Strategy & Engineering Team"
            className="contact-split-img"
            loading="lazy"
            decoding="async"
            width="800"
            height="1000"
          />
          <div className="contact-split-scrim" />
          <div className="contact-split-visual-content">
            <div className="split-visual-top">
              <span className="split-badge">
                <span className="live-dot" /> DUAL UK &amp; US PRESENCE
              </span>
            </div>

            <div className="split-visual-bottom">
              <span className="eyebrow split-eyebrow">LET&rsquo;S MAKE YOUR NEXT MOVE COUNT</span>
              <h2 id="contact-heading">
                Big ideas.<br />
                Real possibilities.<br />
                <span>Let&rsquo;s talk.</span>
              </h2>
              <p>
                Tell us where you are&mdash;and where you want to go. We&rsquo;ll help you find a practical, high-ROI way forward for your business.
              </p>

              <div className="split-trust-points">
                <div className="split-trust-item">
                  <Check size={14} className="split-check-icon" />
                  <span>Direct 30-min discovery with senior leadership</span>
                </div>
                <div className="split-trust-item">
                  <Check size={14} className="split-check-icon" />
                  <span>Sub-second engineering &amp; commercial strategy</span>
                </div>
                <div className="split-trust-item">
                  <Check size={14} className="split-check-icon" />
                  <span>100% IP code ownership &amp; zero sales pressure</span>
                </div>
              </div>

              <div className="split-footnote">
                <ShieldCheck size={14} />
                <span>Confidential discovery &middot; London (UK) &amp; United States</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Consultation Form */}
        <div className="contact-split-form-wrap">
          {status === 'success' ? (
            <div className="form-success" role="status">
              <CheckCircle2 size={46} className="success-icon" />
              <h3>Your consultation request has been received.</h3>
              <p>
                Thank you for starting the conversation. One of our senior strategists will review your project requirements and respond within <b>1 business day</b> to arrange an exploratory session.
              </p>
              <div className="success-next-steps">
                <span>What happens next:</span>
                <ul>
                  <li><Check size={14} /> Initial review of your website and digital presence</li>
                  <li><Check size={14} /> 30-minute discovery call tailored to your market</li>
                  <li><Check size={14} /> Transparent scope, milestones, and proposal</li>
                </ul>
              </div>
              <button
                type="button"
                className="button secondary"
                onClick={() => setStatus('idle')}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="split-form"
              noValidate={false}
              data-toolname="schedule_consultation"
              data-tooldescription="Submit an inquiry to book a free 30-minute strategy call and architecture audit with Klyro Works"
              {...({
                toolname: 'schedule_consultation',
                tooldescription: 'Submit an inquiry to book a free 30-minute strategy call and architecture audit with Klyro Works',
              } as any)}
            >
              <div className="split-form-header">
                <h3>What are you working on?</h3>
                <p>Share a little about your business goals. We&rsquo;ll take it from there.</p>
              </div>

              <div className="form-grid">
                <label>
                  <span>Your name *</span>
                  <input
                    required
                    name="name"
                    maxLength={100}
                    autoComplete="name"
                  />
                </label>

                <label>
                  <span>Work email *</span>
                  <input
                    required
                    name="email"
                    type="email"
                    maxLength={100}
                    autoComplete="email"
                  />
                </label>

                <label>
                  <span>Company / Organization</span>
                  <input
                    name="company"
                    maxLength={100}
                    autoComplete="organization"
                  />
                </label>

                <label>
                  <span>Primary market *</span>
                  <select name="market" required defaultValue="">
                    <option value="" disabled>
                      Select your primary market
                    </option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Both US & UK">Both US &amp; UK</option>
                    <option value="International">International</option>
                  </select>
                </label>
              </div>

              <label className="field-full">
                <span>Service focus *</span>
                <select name="service" required defaultValue={selectedService}>
                  <option value="" disabled>
                    Select primary service focus
                  </option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Multiple services / Not sure yet">
                    Integrated Solution / Not Sure Yet
                  </option>
                </select>
              </label>

              <label className="field-full">
                <span>Project goals &amp; current challenges *</span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={3}
                />
              </label>

              {/* Multi-honeypot anti-spam gate */}
              <div className="honeypot" aria-hidden="true">
                <input name="website_url" tabIndex={-1} autoComplete="off" />
                <input name="company_website_url" tabIndex={-1} autoComplete="off" />
                <input name="phone_verify" tabIndex={-1} autoComplete="off" />
                <input name="secondary_email" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Explicit GDPR/CCPA Consent Checkbox */}
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  I agree to be contacted regarding this project inquiry in accordance with the{' '}
                  <Link to="/privacy">Privacy Policy</Link> and{' '}
                  <Link to="/terms">Terms</Link>. No unsolicited sales spam.
                </span>
              </label>

              {status === 'error' && (
                <div className="form-error-fallback" role="alert" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '14px 16px', margin: '14px 0' }}>
                  <p style={{ color: '#ef4444', margin: '0 0 10px 0', fontSize: '13px', fontWeight: 600 }}>
                    {errorMessage || 'We encountered an issue submitting your inquiry online.'} You can dispatch your message directly via email with one click:
                  </p>
                  <a
                    href={`mailto:admin@klyroworks.com?subject=${encodeURIComponent('Consultation Inquiry: ' + (lastPayloadRef.current?.service || 'New Project'))}&body=${encodeURIComponent(
                      `Name: ${lastPayloadRef.current?.name || ''}\nEmail: ${lastPayloadRef.current?.email || ''}\nCompany: ${lastPayloadRef.current?.company || ''}\nMarket: ${lastPayloadRef.current?.market || ''}\nService: ${lastPayloadRef.current?.service || ''}\n\nProject Goals & Challenges:\n${lastPayloadRef.current?.message || ''}`
                    )}`}
                    className="button secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}
                  >
                    <Mail size={15} /> Send via Email Directly to admin@klyroworks.com
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="button primary split-submit-btn"
              >
                {status === 'sending' ? (
                  <>
                    Routing to Strategy Team <LoaderCircle size={17} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Request Free Consultation <ArrowUpRight size={17} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
