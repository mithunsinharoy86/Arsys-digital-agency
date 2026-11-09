import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import {
  ArrowUpRight,
  ChevronDown,
  Globe,
  Search,
  TrendingUp,
  Bot,
  Layout,
  ShoppingBag,
  Building2,
  Activity,
  Briefcase,
  Menu,
  X,
  Palette,
  FileText,
  Share2,
  Check,
} from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

type ActiveMenu = 'services' | 'industries' | null;

const coreServices = [
  {
    title: 'Website Development',
    href: '/services/website-development',
    icon: Globe,
    badge: 'Core',
    description: 'Sub-second React & Next.js platforms engineered for high conversion.',
  },
  {
    title: 'Technical & Generative SEO',
    href: '/services/seo',
    icon: Search,
    badge: 'AI-Ready',
    description: 'Deep site audits, schema graph architecture, and AI search (SGE) indexing.',
  },
  {
    title: 'Digital Marketing & Paid Ads',
    href: '/services/digital-marketing',
    icon: TrendingUp,
    badge: null,
    description: 'Commercial Google & LinkedIn acquisition campaigns engineered for lower CPA.',
  },
  {
    title: 'AI Automation & Workflows',
    href: '/services/ai-automation',
    icon: Bot,
    badge: 'New',
    description: 'Intelligent CRM synchronisation, custom LLM pipelines, and automated ops.',
  },
  {
    title: 'UI/UX Design Systems',
    href: '/services/ui-ux-design',
    icon: Layout,
    badge: null,
    description: 'Interactive prototypes, design systems, and conversion-focused UX.',
  },
  {
    title: 'Ecommerce Engineering',
    href: '/services/ecommerce',
    icon: ShoppingBag,
    badge: null,
    description: 'Headless commerce & Shopify architectures optimized for checkout conversion.',
  },
];

const secondaryServices = [
  { title: 'Branding & Identity', href: '/services/branding', icon: Palette },
  { title: 'Content Marketing', href: '/services/content-marketing', icon: FileText },
  { title: 'Social Media Growth', href: '/services/social-media-marketing', icon: Share2 },
];

const industriesList = [
  {
    title: 'Real Estate & Property Portals',
    href: '/industries/real-estate',
    icon: Building2,
    badge: 'PropTech',
    description: 'Sub-second MLS/IDX feeds, valuation funnels, and hyper-local SEO for agencies.',
    highlights: 'MLS / IDX Feed Sync · Instant Valuation Funnels',
  },
  {
    title: 'Private Dental & Medical Practices',
    href: '/industries/dental-clinics',
    icon: Activity,
    badge: 'Healthcare',
    description: 'Patient acquisition funnels, local clinic dominance, and compliant booking UX.',
    highlights: 'CQC & HIPAA Compliant · High-Trust Booking UX',
  },
  {
    title: 'Ecommerce & D2C Brands',
    href: '/industries/ecommerce',
    icon: ShoppingBag,
    badge: 'D2C',
    description: 'Conversion-optimized product discovery, instantaneous load speeds, and cart retention.',
    highlights: 'Headless Shopify Architecture · Mobile Checkout Lift',
  },
  {
    title: 'Corporate & Professional Advisory',
    href: '/industries/professional-services',
    icon: Briefcase,
    badge: 'B2B',
    description: 'Authoritative digital platforms for corporate law, finance, and consulting firms.',
    highlights: 'High-Ticket Client Acquisition · Authority Branding',
  },
];

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const { openModal } = useConsultationModal();

  const isServicesActive = location.pathname.startsWith('/services');
  const isIndustriesActive = location.pathname.startsWith('/industries');

  const handleMouseEnter = (menu: 'services' | 'industries') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleToggleMenu = (menu: 'services' | 'industries') => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  // Close on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <Link to="/" className="brand" aria-label="Klyro Works home" onClick={() => setActiveMenu(null)}>
        <span className="brand-mark">
          K<span />
        </span>
        <span>
          klyro<span className="brand-sub">WORKS</span>
        </span>
      </Link>

      {/* Desktop Main Navigation */}
      <nav className="navigation desktop-navigation" aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          onClick={() => setActiveMenu(null)}
        >
          Home
        </NavLink>

        {/* Services Dropdown Trigger */}
        <div
          className="nav-dropdown-trigger-box"
          onMouseEnter={() => handleMouseEnter('services')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`nav-item-trigger ${isServicesActive ? 'is-active' : ''}`}
            onClick={() => handleToggleMenu('services')}
            aria-expanded={activeMenu === 'services'}
            aria-haspopup="true"
          >
            Services
            <ChevronDown size={14} className="nav-chevron" />
          </button>
        </div>

        {/* Industries Dropdown Trigger */}
        <div
          className="nav-dropdown-trigger-box"
          onMouseEnter={() => handleMouseEnter('industries')}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className={`nav-item-trigger ${isIndustriesActive ? 'is-active' : ''}`}
            onClick={() => handleToggleMenu('industries')}
            aria-expanded={activeMenu === 'industries'}
            aria-haspopup="true"
          >
            Industries
            <ChevronDown size={14} className="nav-chevron" />
          </button>
        </div>

        <NavLink
          to="/our-work"
          className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          onClick={() => setActiveMenu(null)}
        >
          Our Work
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          onClick={() => setActiveMenu(null)}
        >
          About Us
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          onClick={() => setActiveMenu(null)}
        >
          Insights
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
          onClick={() => setActiveMenu(null)}
        >
          Contact
        </NavLink>
      </nav>

      {/* Header Right CTA */}
      <button
        type="button"
        className="header-cta"
        onClick={() => {
          setActiveMenu(null);
          openModal();
        }}
      >
        Let’s talk <ArrowUpRight size={17} />
      </button>

      {/* Mobile Hamburger Button */}
      <button
        className="menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Mega Menu Dropdowns */}
      {activeMenu && (
        <>
          <div
            className="mega-menu-backdrop"
            onClick={() => setActiveMenu(null)}
            aria-hidden="true"
          />
          <div
            className="mega-menu-wrapper"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {activeMenu === 'services' && (
              <div className="mega-menu-panel" role="region" aria-label="Services Mega Menu">
                <div className="mega-menu-grid">
                  <div className="mega-menu-main">
                    <div className="mega-menu-header">
                      <span className="mega-menu-eyebrow">Core Capabilities & Engineering</span>
                      <Link
                        to="/services"
                        className="mega-menu-view-all"
                        onClick={() => setActiveMenu(null)}
                      >
                        Explore all services & deliverables <ArrowUpRight size={14} />
                      </Link>
                    </div>

                    <div className="mega-cards-grid-2col">
                      {coreServices.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.href}
                            to={service.href}
                            className="mega-card-item"
                            onClick={() => setActiveMenu(null)}
                          >
                            <div className="mega-card-icon">
                              <Icon size={20} />
                            </div>
                            <div className="mega-card-body">
                              <div className="mega-card-title-row">
                                <h4 className="mega-card-title">{service.title}</h4>
                                {service.badge && (
                                  <span className="mega-card-badge">{service.badge}</span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mega-menu-footer-strip">
                      <div className="mega-menu-footer-links">
                        <span className="mega-menu-footer-label">More Specialisms:</span>
                        {secondaryServices.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="mega-menu-footer-link"
                              onClick={() => setActiveMenu(null)}
                            >
                              <Icon size={14} />
                              <span>{item.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <aside className="mega-spotlight-card">
                    <div>
                      <span className="mega-spotlight-badge">
                        <span className="mega-spotlight-dot" /> Free Strategy Session
                      </span>
                      <h3 className="mega-spotlight-title">Technical Architecture Audit</h3>
                      <p className="mega-spotlight-text">
                        Speak directly with a senior engineer. We evaluate your current page speed, Core Web Vitals, and conversion leaks.
                      </p>
                      <ul className="mega-spotlight-list">
                        <li className="mega-spotlight-list-item">
                          <Check size={14} className="text-emerald-700" />
                          <span>30-min senior engineering call</span>
                        </li>
                        <li className="mega-spotlight-list-item">
                          <Check size={14} className="text-emerald-700" />
                          <span>Core Web Vitals & speed audit</span>
                        </li>
                        <li className="mega-spotlight-list-item">
                          <Check size={14} className="text-emerald-700" />
                          <span>Zero sales pitch or obligation</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="mega-spotlight-btn"
                        onClick={() => {
                          setActiveMenu(null);
                          openModal();
                        }}
                      >
                        Book Architecture Audit <ArrowUpRight size={14} />
                      </button>
                      <Link
                        to="/services"
                        className="mega-spotlight-sublink"
                        onClick={() => setActiveMenu(null)}
                      >
                        Explore all 9 services →
                      </Link>
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {activeMenu === 'industries' && (
              <div className="mega-menu-panel" role="region" aria-label="Industries Mega Menu">
                <div className="mega-menu-grid">
                  <div className="mega-menu-main">
                    <div className="mega-menu-header">
                      <span className="mega-menu-eyebrow">Industry Sectors & Playbooks</span>
                      <Link
                        to="/industries"
                        className="mega-menu-view-all"
                        onClick={() => setActiveMenu(null)}
                      >
                        View all industry sectors <ArrowUpRight size={14} />
                      </Link>
                    </div>

                    <div className="mega-cards-grid-2col">
                      {industriesList.map((industry) => {
                        const Icon = industry.icon;
                        return (
                          <Link
                            key={industry.href}
                            to={industry.href}
                            className="mega-card-item"
                            onClick={() => setActiveMenu(null)}
                          >
                            <div className="mega-card-icon">
                              <Icon size={20} />
                            </div>
                            <div className="mega-card-body">
                              <div className="mega-card-title-row">
                                <h4 className="mega-card-title">{industry.title}</h4>
                                {industry.badge && (
                                  <span className="mega-card-badge blue">{industry.badge}</span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mega-menu-footer-strip">
                      <div className="mega-menu-footer-links">
                        <span className="mega-menu-footer-label">Engineering Standards:</span>
                        <span className="mega-guarantee-pill">&lt; 1.2s Target LCP</span>
                        <span className="mega-guarantee-pill">100% Code Ownership</span>
                        <span className="mega-guarantee-pill">Dual US/UK SOW Protection</span>
                      </div>
                    </div>
                  </div>

                  <aside className="mega-spotlight-card blue-tint">
                    <div>
                      <span className="mega-spotlight-badge">
                        <span className="mega-spotlight-dot" /> Capabilities Showcase
                      </span>
                      <h3 className="mega-spotlight-title">Technical Blueprints &amp; Showcase</h3>
                      <p className="mega-spotlight-text">
                        Explore our interactive architecture blueprints demonstrating high-performance web engineering, technical SEO, and modern UX standards.
                      </p>
                      <ul className="mega-spotlight-list">
                        <li className="mega-spotlight-list-item">
                          <Check size={14} className="text-emerald-700" />
                          <span>Sub-second mobile loading speed</span>
                        </li>
                        <li className="mega-spotlight-list-item">
                          <Check size={14} className="text-emerald-700" />
                          <span>90+ Google Lighthouse benchmark</span>
                        </li>
                        <li className="mega-spotlight-list-item">
                          <Check size={14} className="text-emerald-700" />
                          <span>Full source code & IP handover</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <Link
                        to="/our-work"
                        className="mega-spotlight-btn"
                        onClick={() => setActiveMenu(null)}
                      >
                        View Case Studies <ArrowUpRight size={14} />
                      </Link>
                      <Link
                        to="/industries"
                        className="mega-spotlight-sublink"
                        onClick={() => setActiveMenu(null)}
                      >
                        Explore industry playbooks →
                      </Link>
                    </div>
                  </aside>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <nav className="mobile-nav-drawer" aria-label="Mobile navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>

          {/* Services Accordion */}
          <div className="mobile-accordion-section">
            <button
              type="button"
              className={`mobile-nav-accordion-header ${mobileServicesOpen ? 'is-open' : ''}`}
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              aria-expanded={mobileServicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={`mobile-accordion-chevron ${mobileServicesOpen ? 'is-expanded' : ''}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="mobile-nav-accordion-content">
                <Link
                  to="/services"
                  className="mobile-subnav-view-all"
                  onClick={() => setMobileOpen(false)}
                >
                  All Services & Deliverables <ArrowUpRight size={13} />
                </Link>
                {coreServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      className="mobile-subnav-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={16} className="text-emerald-700" />
                      <span>{service.title}</span>
                    </Link>
                  );
                })}
                {secondaryServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      className="mobile-subnav-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={16} className="text-emerald-700" />
                      <span>{service.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Industries Accordion */}
          <div className="mobile-accordion-section">
            <button
              type="button"
              className={`mobile-nav-accordion-header ${mobileIndustriesOpen ? 'is-open' : ''}`}
              onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              aria-expanded={mobileIndustriesOpen}
            >
              <span>Industries</span>
              <ChevronDown
                size={16}
                className={`mobile-accordion-chevron ${mobileIndustriesOpen ? 'is-expanded' : ''}`}
              />
            </button>
            {mobileIndustriesOpen && (
              <div className="mobile-nav-accordion-content">
                <Link
                  to="/industries"
                  className="mobile-subnav-view-all"
                  onClick={() => setMobileOpen(false)}
                >
                  All Industry Sectors <ArrowUpRight size={13} />
                </Link>
                {industriesList.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <Link
                      key={industry.href}
                      to={industry.href}
                      className="mobile-subnav-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={16} className="text-emerald-700" />
                      <span>{industry.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <NavLink
            to="/our-work"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Our Work
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </NavLink>

          <NavLink
            to="/insights"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Insights
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </NavLink>

          <button
            type="button"
            className="mobile-consult"
            onClick={() => {
              setMobileOpen(false);
              openModal();
            }}
          >
            Let’s talk <ArrowUpRight size={16} />
          </button>
        </nav>
      )}
    </header>
  );
}
