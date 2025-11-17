'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

export default function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openAdmissions, setOpenAdmissions] = useState(false);
  const [openResources, setOpenResources] = useState(false);

  return (
    <header className="site-header">
      {/* Legacy top gradient bar */}
      <div className="header-gradient" />

      <div className="container">
        <div className="bar">
          <span className="brand-wrap">
            <Link href="/" className="brand" aria-label="GPPS Home">
              <Image
                src="/images/pps-logo.png"
                alt="GPPS Logo"
                width={160}
                height={72}
                priority
                style={{ height: '72px', width: 'auto', verticalAlign: 'middle' }}
              />
            </Link>
            <Link href="/" className="brand-text-gradient">Premier Preparatory School</Link>
          </span>

          {/* Desktop nav */}
          <nav aria-label="Main">
            <ul className="nav-list">
              <li>
                <HoverDetails label="About Us">
                  <ul>
                    <li><Link href="/director-welcome-page">Welcome from Director</Link></li>
                    <li><Link href="/religion">Religious Affiliation</Link></li>
                    <li><Link href="/mission-and-vision">Mission & Vision</Link></li>
                    <li><Link href="/history">Our History</Link></li>
                  </ul>
                </HoverDetails>
              </li>

              <li>
                <HoverDetails label="Admissions">
                  <ul>
                    <li><Link href="/apply">Apply</Link></li>
                    <li><Link href="/fees-structure">Fees Structure</Link></li>
                    <li><Link href="/transportation">Transportation</Link></li>
                  </ul>
                </HoverDetails>
              </li>

              <li>
                <HoverDetails label="Resources">
                  <ul>
                    <li><a href="https://schoolsuite.co.ug" target="_blank" rel="noopener noreferrer">School Pay</a></li>
                    <li><Link href="/news">News & Events</Link></li>
                  </ul>
                </HoverDetails>
              </li>

              <li>
                <Link href="/contact-us" className="nav-link">Contact Us</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile hamburger (iPad/phones) */}
          <button
            aria-label="Open menu"
            className="menu-selection"
            onClick={() => setOpenSidebar(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <aside className={`sidebar ${openSidebar ? 'show' : ''}`} role="dialog" aria-modal="true">
        <div className="close-sidebar-button">
          <button aria-label="Close menu" onClick={() => setOpenSidebar(false)} style={{ background: 'none', border: 'none', padding: 6 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="menu-options-sidebar">
          <li>
            <button
              onClick={() => setOpenAbout((v) => !v)}
              aria-expanded={openAbout}
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', font: 'inherit', color: 'inherit' }}
            >
              About Us
            </button>
            <ul className={`dropdown-content ${openAbout ? 'open' : ''}`}>
              <li><Link href="/director-welcome-page" onClick={() => setOpenSidebar(false)}>Welcome from Director</Link></li>
              <li><Link href="/religion" onClick={() => setOpenSidebar(false)}>Religious Affiliation</Link></li>
              <li><Link href="/mission-and-vision" onClick={() => setOpenSidebar(false)}>Mission & Vision</Link></li>
              <li><Link href="/history" onClick={() => setOpenSidebar(false)}>Our History</Link></li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => setOpenAdmissions((v) => !v)}
              aria-expanded={openAdmissions}
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', font: 'inherit', color: 'inherit' }}
            >
              Admissions
            </button>
            <ul className={`dropdown-content ${openAdmissions ? 'open' : ''}`}>
              <li><Link href="/apply" onClick={() => setOpenSidebar(false)}>Apply</Link></li>
              <li><Link href="/fees-structure" onClick={() => setOpenSidebar(false)}>Fees Structure</Link></li>
              <li><Link href="/transportation" onClick={() => setOpenSidebar(false)}>Transportation</Link></li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => setOpenResources((v) => !v)}
              aria-expanded={openResources}
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', font: 'inherit', color: 'inherit' }}
            >
              Resources
            </button>
            <ul className={`dropdown-content ${openResources ? 'open' : ''}`}>
              <li><a href="https://schoolsuite.co.ug" target="_blank" rel="noopener noreferrer" onClick={() => setOpenSidebar(false)}>School Pay</a></li>
              <li><Link href="/news" onClick={() => setOpenSidebar(false)}>News & Events</Link></li>
            </ul>
          </li>

          <li>
            <Link href="/contact-us" onClick={() => setOpenSidebar(false)}>Contact Us</Link>
          </li>
        </ul>
      </aside>
    </header>
  );
}

/**
 * Desktop dropdown that opens gracefully on hover and focus,
 * using a native <details> element for accessibility and keyboard support.
 */
function HoverDetails({ label, children }: { label: string; children: React.ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (detailsRef.current && !detailsRef.current.open) {
      detailsRef.current.open = true;
    }
  };

  const close = (delay = 120) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      if (detailsRef.current) detailsRef.current.open = false;
    }, delay);
  };

  // Close when pressing Escape while focused inside
  useEffect(() => {
    const node = detailsRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        node.open = false;
        (node.querySelector('summary') as HTMLElement | null)?.focus();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="dropdown"
      onMouseEnter={() => open()}
      onMouseLeave={() => close(140)}
      onFocus={() => open()}
      onBlur={() => close(140)}
    >
      <summary aria-haspopup="menu" aria-expanded={detailsRef.current?.open ? 'true' : 'false'}>
        {label}
      </summary>
      <div className="dropdown-menu" role="menu" onMouseEnter={() => open()} onMouseLeave={() => close(140)}>
        {children}
      </div>
    </details>
  );
}
