'use client';

import Link from 'next/link';
import React, { useState } from 'react';

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
            <Link href="/" className="brand">
              <img src="/images/pps-logo.png" alt="GPPS Logo" style={{ height: 36, width: 'auto', verticalAlign: 'middle' }} />
            </Link>
            <Link href="/" className="brand-text-gradient">GPPS</Link>
          </span>

          {/* Desktop nav */}
          <nav aria-label="Main">
            <ul className="nav-list">
              <li>
                <details className="dropdown">
                  <summary>About Us</summary>
                  <div className="dropdown-menu">
                    <ul>
                      <li><Link href="/director-welcome-page">Welcome from Director</Link></li>
                      <li><Link href="/religion">Religious Affiliation</Link></li>
                      <li><Link href="/mission-and-vision">Mission & Vision</Link></li>
                      <li><Link href="/history">Our History</Link></li>
                    </ul>
                  </div>
                </details>
              </li>

              <li>
                <details className="dropdown">
                  <summary>Admissions</summary>
                  <div className="dropdown-menu">
                    <ul>
                      <li><Link href="/apply">Apply</Link></li>
                      <li><Link href="/fees-structure">Fees Structure</Link></li>
                      <li><Link href="/transportation">Transportation</Link></li>
                    </ul>
                  </div>
                </details>
              </li>

              <li>
                <details className="dropdown">
                  <summary>Resources</summary>
                  <div className="dropdown-menu">
                    <ul>
                      <li><a href="https://schoolsuite.co.ug" target="_blank" rel="noopener noreferrer">School Pay</a></li>
                      <li><Link href="/news">News & Events</Link></li>
                    </ul>
                  </div>
                </details>
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
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
