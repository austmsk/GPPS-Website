import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Legacy-style top row: logos + map */}
        <div className="bottom-info" style={{ display: 'flex', gap: 16, alignItems: 'stretch', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: 12 }}>
          <div className="bottom-imgs" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src="/images/pps-logo.png" alt="GPPS Logo" className="footer-img" style={{ height: 80, width: 'auto' }} />
            <img src="/images/uganda.webp" alt="Uganda Flag" className="UG-img" style={{ height: 60, width: 'auto' }} />
          </div>
          <div className="map" style={{ flex: 1, minWidth: 260 }}>
            <iframe
              title="GPPS Location"
              src="https://maps.google.com/maps?q=Kyotera%2C%20Uganda&t=&z=12&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
        </div>

        {/* Legacy-style second row: key links + contact + social */}
        <div className="grid">
          <div>
            <Link href="/" className="brand">GPPS</Link>
            <div><small>© {year} Grace Primary & Preparatory School</small></div>
          </div>

          <div>
            <h4>Key Links</h4>
            <ul>
              <li><Link href="/director-welcome-page">Director Welcome</Link></li>
              <li><Link href="/apply">Admissions</Link></li>
              <li><a href="https://schoolsuite.co.ug" target="_blank" rel="noopener noreferrer">School Pay</a></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>Phone: +256-742-69-3000</li>
              <li>Email: <a href="mailto:premier.prep.sch@gmail.com">premier.prep.sch@gmail.com</a></li>
              <li>P.O. Box 335, Masaka, Uganda</li>
            </ul>
          </div>

          <div>
            <h4>Follow</h4>
            <div className="footer-social-media-links" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <a href="https://www.facebook.com/premier.preparatory.9" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src="/images/facebook.png" alt="" width={28} height={28} />
              </a>
              <a href="https://www.instagram.com/premierprepsch/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/images/instagram.png" alt="" width={28} height={28} />
              </a>
              <a href="https://twitter.com/premierprep" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <img src="/images/twitter.png" alt="" width={28} height={28} />
              </a>
              <a href="https://www.youtube.com/premierprep" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <img src="/images/youtube.png" alt="" width={28} height={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
