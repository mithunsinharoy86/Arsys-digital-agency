import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

const navigation = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Industries', '/industries'],
  ['Our Work', '/our-work'],
  ['About Us', '/about'],
  ['Insights', '/insights'],
  ['Contact', '/contact'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { openModal } = useConsultationModal();

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Klyro Works home">
        <span className="brand-mark">
          K<span />
        </span>
        <span>
          klyro<span className="brand-sub">WORKS</span>
        </span>
      </Link>
      <nav
        className={open ? 'navigation is-open' : 'navigation'}
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
      >
        {navigation.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          className="mobile-consult"
          onClick={() => {
            setOpen(false);
            openModal();
          }}
        >
          Let’s talk <ArrowUpRight size={16} />
        </button>
      </nav>
      <button
        type="button"
        className="header-cta"
        onClick={() => openModal()}
      >
        Let’s talk <ArrowUpRight size={17} />
      </button>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
