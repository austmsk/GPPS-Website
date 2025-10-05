import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Two halves horizontally: Left (logo + map + socials) | Right (contact) */}
        <div className="grid">
          {/* Left half */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Link href="/" className="brand" aria-label="Go to home">
                <img
                  src="/images/pps-logo.png"
                  alt="GPPS Logo"
                  style={{ height: 56, width: 'auto', verticalAlign: 'middle' }}
                />
              </Link>
              <span className="brand">GPPS</span>
            </div>

            {/* Map embed */}
            <div className="map" style={{ marginTop: 8 }}>
              <iframe
                title="GPPS Location"
                src="https://maps.google.com/maps?q=Kyotera%2C%20Uganda&t=&z=12&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                style={{ border: 'none', width: '100%', height: 300, borderRadius: 6 }}
              />
            </div>

          </div>

          {/* Right half */}
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:+256742693000" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +256-742-69-3000
                </a>
              </li>
              <li>
                <a
                  href="mailto:premier.prep.sch@gmail.com"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  premier.prep.sch@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/maps?q=Kyotera%2C%20Uganda&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  P.O. Box 335, Masaka, Uganda
                </a>
              </li>
            </ul>

             {/* Social icons */}

            <div className="footer-social-media-links" style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 10 }}>
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

            <div style={{ marginTop: 8 }}>
              <small>© {year} Grace Primary & Preparatory School</small>
            </div>

            
          </div>
        </div>
      </div>
    </footer>
  );
}
