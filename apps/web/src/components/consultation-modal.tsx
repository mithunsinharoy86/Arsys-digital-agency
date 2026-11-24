import React, { createContext, useContext, useState, useEffect, type FormEvent } from 'react';
import { X, ArrowUpRight, CheckCircle2, LoaderCircle, Shield, Lock, Send, Mail } from 'lucide-react';
import { services, industries } from '@/data/site';

interface ConsultationModalContextType {
  isOpen: boolean;
  activeService: string;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType>({
  isOpen: false,
  activeService: '',
  openModal: () => {},
  closeModal: () => {},
});

export function useConsultationModal() {
  return useContext(ConsultationModalContext);
}

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState('');

  const openModal = (service?: string) => {
    if (service) setActiveService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Listen for global custom trigger event
  useEffect(() => {
    const handleGlobalTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ service?: string }>;
      openModal(customEvent.detail?.service);
    };

    window.addEventListener('open-consultation-modal', handleGlobalTrigger);
    return () => {
      window.removeEventListener('open-consultation-modal', handleGlobalTrigger);
    };
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <ConsultationModalContext.Provider value={{ isOpen, activeService, openModal, closeModal }}>
      {children}
      {isOpen && <ConsultationModalDialog service={activeService} onClose={closeModal} />}
    </ConsultationModalContext.Provider>
  );
}

function ConsultationModalDialog({ service, onClose }: { service: string; onClose: () => void }) {
  const [selectedService, setSelectedService] = useState(service || 'Website Development');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const formRenderedAt = React.useRef(Date.now());
  const lastPayloadRef = React.useRef<{
    name: string;
    email: string;
    company: string;
    service: string;
    market: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (service) setSelectedService(service);
  }, [service]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Multi-layer anti-spam honeypot (silent success)
    if (
      data.get('website_url') ||
      data.get('company_website_url') ||
      data.get('phone_verify') ||
      data.get('secondary_email')
    ) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    const name = data.get('name') as string;
    setSubmittedName(name);

    const payload = {
      recipient: 'admin@klyroworks.com',
      name,
      email: data.get('email') as string,
      company: (data.get('company') as string) || '',
      service: (data.get('service') as string) || selectedService,
      market: data.get('market') as string,
      message: data.get('message') as string,
      _form_rendered_at: formRenderedAt.current,
      timestamp: new Date().toISOString(),
    };
    lastPayloadRef.current = payload;

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const resData = await response.json().catch(() => null);
      if (!resData || resData.ok === false) {
        throw new Error(resData?.error || 'Failed to submit enquiry');
      }

      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      console.error('Modal consultation error:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('klyro_enquiries_fallback') || '[]');
        stored.push(payload);
        localStorage.setItem('klyro_enquiries_fallback', JSON.stringify(stored));
      } catch (localErr) {
        console.warn('LocalStorage unavailable', localErr);
      }
      setErrorMessage(err instanceof Error ? err.message : 'Could not reach server directly.');
      setStatus('error');
    }
  }

  const allOfferings = [
    ...services.map((s) => s.name),
    ...industries.map((i) => `${i.name} (Industry Solution)`),
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-consult-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close consultation modal"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="success-check-icon" />
            </div>
            <h2>Consultation Request Delivered!</h2>
            <p className="success-lead">
              Thank you, <strong>{submittedName || 'there'}</strong>. Your project brief has been securely delivered directly to our senior leadership team at <strong>admin@klyroworks.com</strong>.
            </p>
            <div className="success-details-box">
              <div className="success-detail-row">
                <Mail size={16} />
                <span>Recipient: <strong>admin@klyroworks.com</strong></span>
              </div>
              <div className="success-detail-row">
                <Shield size={16} />
                <span>Protected under mutual NDA confidentiality standards</span>
              </div>
              <div className="success-detail-row">
                <CheckCircle2 size={16} />
                <span>Guaranteed response within 24 business hours</span>
              </div>
            </div>
            <div className="success-actions">
              <button type="button" className="button primary modal-done-btn" onClick={onClose}>
                Done &middot; Return to Site
              </button>
              <a
                href={`mailto:admin@klyroworks.com?subject=Consultation Follow-up: ${encodeURIComponent(submittedName)}`}
                className="button secondary modal-email-btn"
              >
                Send Direct Email Follow-up <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        ) : (
          <div className="modal-form-content">
            <div className="modal-header">
              <div className="modal-eyebrow">
                <span className="live-pulse-dot" /> ROUTING DIRECTLY TO ADMIN@KLYROWORKS.COM
              </div>
              <h2 id="modal-consult-title">
                Book a Free Consultation with <span>Klyro Works</span>
              </h2>
              <p>
                Tell us about your goals, technical requirements, or challenges. Submissions route directly to senior engineers at <strong>admin@klyroworks.com</strong> with zero sales pressure.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              {/* Multi-honeypot anti-spam gate */}
              <div className="honeypot" aria-hidden="true">
                <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                <input type="text" name="company_website_url" tabIndex={-1} autoComplete="off" />
                <input type="text" name="phone_verify" tabIndex={-1} autoComplete="off" />
                <input type="text" name="secondary_email" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="modal-form-grid">
                <div className="modal-field">
                  <label htmlFor="modal-name">Your Full Name *</label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="modal-field">
                  <label htmlFor="modal-email">Work Email *</label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    placeholder="s.jenkins@company.com"
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="modal-field">
                  <label htmlFor="modal-company">Company / Organization</label>
                  <input
                    id="modal-company"
                    name="company"
                    type="text"
                    placeholder="e.g. Acme Health or Meridian Law"
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="modal-field">
                  <label htmlFor="modal-market">Target Market *</label>
                  <select id="modal-market" name="market" required disabled={status === 'sending'}>
                    <option value="United Kingdom">United Kingdom &middot; GBP (&pound;)</option>
                    <option value="United States">United States &middot; USD ($)</option>
                    <option value="Global / Transatlantic">Transatlantic / Global</option>
                  </select>
                </div>

                <div className="modal-field full-span">
                  <label htmlFor="modal-service">Service or Industry Focus *</label>
                  <select
                    id="modal-service"
                    name="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    disabled={status === 'sending'}
                  >
                    {allOfferings.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                    <option value="Other Commercial Project">Other / Custom Engineering Project</option>
                  </select>
                </div>

                <div className="modal-field full-span">
                  <label htmlFor="modal-message">How can Klyro Works help you? *</label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Briefly describe your project objectives, timeline, or current website/SEO/automation bottlenecks..."
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div className="modal-consent-row">
                <input
                  type="checkbox"
                  id="modal-consent"
                  required
                  defaultChecked
                  disabled={status === 'sending'}
                />
                <label htmlFor="modal-consent">
                  I consent to Klyro Works storing this enquiry to respond directly to me via <strong>admin@klyroworks.com</strong> in accordance with the Privacy Policy.
                </label>
              </div>

              {status === 'error' && (
                <div className="modal-error-box" role="alert" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '12px 14px', margin: '12px 0' }}>
                  <p style={{ color: '#ef4444', margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600 }}>
                    {errorMessage || 'Unable to submit enquiry online.'} You can email us directly:
                  </p>
                  <a
                    href={`mailto:admin@klyroworks.com?subject=${encodeURIComponent('Consultation Request: ' + (lastPayloadRef.current?.service || 'New Project'))}&body=${encodeURIComponent(
                      `Name: ${lastPayloadRef.current?.name || ''}\nEmail: ${lastPayloadRef.current?.email || ''}\nCompany: ${lastPayloadRef.current?.company || ''}\nMarket: ${lastPayloadRef.current?.market || ''}\nService: ${lastPayloadRef.current?.service || ''}\n\nProject Goals:\n${lastPayloadRef.current?.message || ''}`
                    )}`}
                    className="button secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', fontSize: '12px' }}
                  >
                    <Mail size={14} /> Send via Email Directly
                  </a>
                </div>
              )}

              <div className="modal-actions-row">
                <button
                  type="submit"
                  className="button primary modal-submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Routing to admin@klyroworks.com...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Consultation Request to admin@klyroworks.com
                    </>
                  )}
                </button>
              </div>

              <div className="modal-security-note">
                <Shield size={14} className="note-icon" />
                <span>
                  Strict privacy: We never share or sell contact data. Protected under mutual NDA standards.
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

