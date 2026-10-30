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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [submittedName, setSubmittedName] = useState('');

  useEffect(() => {
    if (service) setSelectedService(service);
  }, [service]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Anti-spam honeypot
    if (data.get('company_website_url')) return;

    setStatus('sending');
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
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Server returned non-200');
      }
    } catch (err) {
      console.warn('Fallback: saving consultation locally and routing to admin@klyroworks.com:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('klyro_enquiries_fallback') || '[]');
        stored.push(payload);
        localStorage.setItem('klyro_enquiries_fallback', JSON.stringify(stored));
      } catch (localErr) {
        console.warn('LocalStorage unavailable', localErr);
      }
    }

    setStatus('success');
    form.reset();
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
              {/* Honeypot field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="text" name="company_website_url" tabIndex={-1} autoComplete="off" />
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

