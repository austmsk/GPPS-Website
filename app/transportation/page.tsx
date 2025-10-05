import React from 'react';
import Image from 'next/image';

export const revalidate = 604800; // weekly (content changes infrequently)

export const metadata = {
  title: 'Transportation | GPPS',
  description:
    'School transportation service at GPPS — reliable, safe, and guided by clear policies for families.',
  alternates: { canonical: '/transportation' },
};

export default function Page(): JSX.Element {
  return (
    <main>
      <section className="transportation-section" style={{ padding: '12px 0 28px 0' }}>
        <div className="container" style={{ display: 'grid', gap: 20 }}>
          <header>
            <h1
              style={{
                margin: '0 0 12px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 800,
                fontSize: '1.8rem',
              }}
            >
              School Transportation Service
            </h1>
          </header>

          {/* Images row (responsive) */}
          <div
            className="transportation-images"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
              alignItems: 'start',
            }}
          >
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              <Image
                src="/images/Transportation-bus.jpeg"
                alt="School bus service at GPPS"
                sizes="(max-width: 768px) 100vw, 540px"
                width={1600}
                height={1067}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              <Image
                src="/images/IMG_4925.jpeg"
                alt="School campus"
                sizes="(max-width: 768px) 100vw, 540px"
                width={1600}
                height={1067}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="transportation-info-text" style={{ lineHeight: 1.7, fontSize: '1rem' }}>
            <p>
              Genesis and Premier Preparatory Schools (GPPS) provides reliable and safe transportation
              for our students through our dedicated fleet of two modern school buses.
            </p>

            <h3
              style={{
                margin: '16px 0 8px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Transportation Guidelines
            </h3>
            <p>For the safety and efficiency of our transportation service, we have established the following guidelines:</p>
            <ul style={{ margin: '6px 0 0 20px' }}>
              <li>Pick-up and drop-off occur only at officially designated bus stops.</li>
              <li>Transportation fees must be paid in advance to secure your child's spot.</li>
              <li>Students using the school bus must be in our official school uniform when riding.</li>
              <li>Door-to-door service is not available — students must use designated bus stops.</li>
              <li>Parents/guardians must strictly adhere to our school bus schedule.</li>
            </ul>

            <div style={{ marginTop: 12 }}>
              <h3
                style={{
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                Important Notice
              </h3>
              <p>
                If a parent/guardian is not present at the designated drop-off point, the affected students will be returned
                to school for safety reasons. Additional charges may apply in such cases.
              </p>
            </div>

            <div style={{ marginTop: 12 }}>
              <h3
                style={{
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                Questions or Concerns?
              </h3>
              <p>
                Contact our Transportation Department:
                <br />
                Phone: <a href="tel:+256742693000" style={{ color: 'inherit' }}>0742693000</a>
                <br />
                Operating Hours: Monday - Friday, 7:00 AM - 5:00 PM
              </p>
            </div>

            <p className="closing" style={{ marginTop: 8 }}>
              We appreciate your cooperation in helping us maintain a safe and efficient transportation service for our students.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
