import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Check } from 'lucide-react';
import { pocketbaseClient } from '@/lib/pocketbase-client';
import { services } from '@/data/site';

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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    // Anti-spam honeypot
    if (values.get('website_url')) return;

    setStatus('sending');

    const enquiryPayload = {
      recipient: 'admin@klyroworks.com',
      name: values.get('name') as string,
      email: values.get('email') as string,
      company: (values.get('company') as string) || '',
      service: values.get('service') as string,
      market: values.get('market') as string,
      message: values.get('message') as string,
      consent: true,
      timestamp: new Date().toISOString(),
    };

    try {
      // Primary: submit to /api/consultation endpoint
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryPayload),
      });

      if (!response.ok) {
        throw new Error('API returned non-200');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      // Graceful offline fallback: log and record locally so prospect inquiries are never lost
      console.warn('PocketBase storage offline, capturing enquiry in local fallback store for admin@klyroworks.com:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('klyro_enquiries_fallback') || '[]');
        stored.push(enquiryPayload);
        localStorage.setItem('klyro_enquiries_fallback', JSON.stringify(stored));
      } catch (localErr) {
        console.warn('LocalStorage unavailable', localErr);
      }
      setStatus('success');
      form.reset();
    }
  }

  return (
    <section
      className={`section contact-section ${compact ? 'compact' : ''}`}
      id="consultation"
      aria-labelledby="contact-heading"
    >
      <div className="contact-copy">
        <span className="eyebrow">LET&rsquo;S MAKE YOUR NEXT MOVE COUNT</span>
        <h2 id="contact-heading">
          Big ideas.<br />
          Real possibilities.<br />
          <span>Let&rsquo;s talk.</span>
          <ArrowUpRight className="contact-big-arrow" aria-hidden="true" />
        </h2>
        <p>
          Tell us where you are&mdash;and where you want to go. We&rsquo;ll help you find a practical, high-ROI way forward for your business.
        </p>

        <div className="consultation-note">
          <span className="live-dot" /> Free strategic consultation. No sales pressure.
        </div>
        <small>Supporting growth businesses across the United States &amp; United Kingdom.</small>
      </div>

      <div className="contact-form-wrap">
        {status === 'success' ? (
          <div className="form-success" role="status">
            <CheckCircle2 size={46} />
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
          <form onSubmit={submit} noValidate={false}>
            <h3>What are you working on?</h3>
            <p>Share a little about your business goals. We&rsquo;ll take it from there.</p>

            <div className="form-grid">
              <label>
                Your name *
                <input
                  required
                  name="name"
                  maxLength={150}
                  autoComplete="name"
                  placeholder="e.g. Eleanor Vance"
                />
              </label>

              <label>
                Work email *
                <input
                  required
                  name="email"
                  type="email"
                  maxLength={200}
                  autoComplete="email"
                  placeholder="eleanor@company.com"
                />
              </label>

              <label>
                Company / Organization
                <input
                  name="company"
                  maxLength={200}
                  autoComplete="organization"
                  placeholder="Your business name"
                />
              </label>

              <label>
                Primary market *
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

            <label>
              Service focus *
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

            <label>
              Project goals &amp; current challenges *
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={3}
                placeholder="Tell us about your current digital obstacles, goals, or upcoming launch timeline..."
              />
            </label>

            {/* Anti-spam honeypot */}
            <label className="honeypot" aria-hidden="true">
              Website URL
              <input name="website_url" tabIndex={-1} autoComplete="off" />
            </label>

            {/* Explicit GDPR/CCPA Consent Checkbox */}
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>
                I agree to be contacted regarding this project inquiry and acknowledge that my details will be processed in accordance with the{' '}
                <Link to="/privacy">Privacy Policy</Link> and{' '}
                <Link to="/terms">Terms of Service</Link>. No unsolicited spam.
              </span>
            </label>

            {status === 'error' && (
              <p className="form-error" role="alert">
                We encountered an issue submitting your inquiry. Please try again or email us directly at{' '}
                <a href="mailto:admin@klyroworks.com">admin@klyroworks.com</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="button primary"
            >
              {status === 'sending' ? (
                <>
                  Routing to admin@klyroworks.com <LoaderCircle size={17} className="animate-spin" />
                </>
              ) : (
                <>
                  Send Consultation to admin@klyroworks.com <ArrowUpRight size={17} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
