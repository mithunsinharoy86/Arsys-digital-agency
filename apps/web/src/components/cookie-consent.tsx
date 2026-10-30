import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'klyro_cookie_consent_v1';

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay so page loads smoothly before banner slides in
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalyticsConsent(parsed.analytics);
        setMarketingConsent(parsed.marketing);
      }
    } catch {
      setIsOpen(true);
    }

    // Global listener allowing footer or any link to reopen preferences modal
    const handleOpenSettings = () => {
      setShowPreferences(true);
      setIsOpen(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const saveConsent = (preferences: Partial<CookiePreferences>) => {
    const finalPreferences: CookiePreferences = {
      essential: true, // Always true
      analytics: preferences.analytics ?? false,
      marketing: preferences.marketing ?? false,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPreferences));
    } catch (e) {
      console.warn('Unable to save cookie preferences to localStorage', e);
    }

    setAnalyticsConsent(finalPreferences.analytics);
    setMarketingConsent(finalPreferences.marketing);
    setShowPreferences(false);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    saveConsent({ analytics: analyticsConsent, marketing: marketingConsent });
  };

  if (!isOpen) return null;

  return (
    <aside
      className="cookie-banner-wrapper"
      role="region"
      aria-label="Cookie and Privacy Choices"
    >
      <div className="cookie-banner-container">
        {!showPreferences ? (
          /* Quick Consent Banner */
          <div className="cookie-banner-content">
            <div className="cookie-banner-header">
              <span className="cookie-icon-wrap" aria-hidden="true">
                <ShieldCheck size={20} className="cookie-shield-icon" />
              </span>
              <div>
                <h2 className="cookie-title">Privacy &amp; Cookie Consent</h2>
                <p className="cookie-description">
                  We respect your data privacy. We use essential technical cookies to ensure our site operates reliably. With your permission, we also use aggregated analytics to enhance page speed and user experience in full compliance with UK/EU GDPR and US privacy regulations (CCPA/CPRA). Read our <Link to="/privacy">Privacy Policy</Link> for details.
                </p>
              </div>
            </div>

            <div className="cookie-banner-actions">
              <button
                type="button"
                className="button secondary cookie-btn"
                onClick={handleRejectNonEssential}
              >
                Essential Only
              </button>
              <button
                type="button"
                className="button cookie-settings-btn"
                onClick={() => setShowPreferences(true)}
              >
                <Settings size={14} /> Customize
              </button>
              <button
                type="button"
                className="button primary cookie-btn"
                onClick={handleAcceptAll}
              >
                <Check size={14} /> Accept All
              </button>
            </div>
          </div>
        ) : (
          /* Granular Preferences Modal */
          <div
            className="cookie-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            <div className="cookie-modal-header">
              <div className="cookie-modal-header-left">
                <ShieldCheck size={22} className="cookie-shield-icon" />
                <h2 id="cookie-modal-title" className="cookie-modal-heading">
                  Cookie &amp; Consent Preferences
                </h2>
              </div>
              <button
                type="button"
                className="cookie-close-btn"
                onClick={() => setShowPreferences(false)}
                aria-label="Close cookie preferences modal"
              >
                <X size={18} />
              </button>
            </div>

            <p className="cookie-modal-intro">
              Control how Klyro Works handles cookies on your browser. You can modify these selections at any time using the <b>Cookie Settings</b> link in our website footer.
            </p>

            <div className="cookie-categories">
              {/* Category 1: Essential */}
              <div className="cookie-category-item">
                <div className="cookie-category-header">
                  <div className="cookie-category-title-group">
                    <strong>Strictly Necessary Cookies</strong>
                    <span className="cookie-badge-required">Always Active</span>
                  </div>
                </div>
                <p className="cookie-category-desc">
                  Required for core functionality, security verification, form submission, and route transitions. They do not store personally identifiable details and cannot be switched off.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="cookie-category-item">
                <div className="cookie-category-header">
                  <div className="cookie-category-title-group">
                    <strong>Performance &amp; Analytics</strong>
                    <span className="cookie-badge-optional">Optional</span>
                  </div>
                  <label className="cookie-toggle-label">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      aria-label="Toggle Performance & Analytics cookies"
                    />
                    <span className="cookie-toggle-slider" />
                  </label>
                </div>
                <p className="cookie-category-desc">
                  Allows us to count visits and traffic sources anonymously so we can measure and improve the performance of our website. All metrics are aggregated.
                </p>
              </div>

              {/* Category 3: Marketing & Personalization */}
              <div className="cookie-category-item">
                <div className="cookie-category-header">
                  <div className="cookie-category-title-group">
                    <strong>Marketing &amp; Personalization</strong>
                    <span className="cookie-badge-optional">Optional</span>
                  </div>
                  <label className="cookie-toggle-label">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      aria-label="Toggle Marketing & Personalization cookies"
                    />
                    <span className="cookie-toggle-slider" />
                  </label>
                </div>
                <p className="cookie-category-desc">
                  Used to adapt regional preferences (e.g. UK vs US case studies) and gauge campaign effectiveness. We never sell your personal data to data brokers.
                </p>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button
                type="button"
                className="button secondary"
                onClick={handleRejectNonEssential}
              >
                Reject All Non-Essential
              </button>
              <div className="cookie-modal-footer-right">
                <button
                  type="button"
                  className="button secondary"
                  onClick={handleSaveCustom}
                >
                  Save Choices
                </button>
                <button
                  type="button"
                  className="button primary"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
