import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 604800; // weekly (rare content changes)

export const metadata = {
  title: 'Our History',
  description:
    'The story of Genesis and Premier Preparatory Schools (GPPS) — founded in 2019 with a vision for holistic education and resilience.',
  alternates: { canonical: '/history' },
};

export default function Page(): JSX.Element {
  return (
    <main>
      <div className="container" style={{ margin: '8px 0' }}>
        <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/history', label: 'Our History' }]} />
      </div>
      {/* HERO */}
      <section className="history-hero" style={{ padding: '12px 0 10px 0' }}>
        <div className="container">
          <div style={{ borderRadius: 8, overflow: 'hidden' }}>
            <Image
              src="/images/History-hero.jpg"
              alt="Students in classroom at GPPS"
              sizes="(max-width: 768px) 100vw, 1100px"
              width={2200}
              height={1466}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="history-body" style={{ padding: '8px 0 28px 0' }}>
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
              Our History
            </h1>
          </header>

          <div style={{ lineHeight: 1.7, fontSize: '1rem' }}>
            <p>
              Genesis and Premier Preparatory Schools (GPPS) were founded in January 2019 by Dr. C. K.
              Musoke, driven by a vision to provide high-quality, holistic education to children in Uganda
              and beyond. Despite a cyclone destroying half of the school's inaugural classroom block just
              two weeks before opening, GPPS welcomed its first 183 students.
            </p>

            <p>
              The director's determination and resilience inspired the rallying cry, "From the
              ruins shall rise a great school". This mantra fueled the rapid construction of a
              modern school, which has since grown to over 560 learners from Uganda, Tanzania, and
              surrounding communities by the end of 2023.
            </p>

            <p>
              To align the school with its mission and objectives, the director implemented significant
              reforms, including a thorough staff overhaul. This effort aimed to eliminate financial
              mismanagement and ensure alignment with the school's values. Although this process
              presented challenges, it yielded a profoundly positive cultural shift.
            </p>

            <p>
              Today, GPPS boasts a team of dedicated staff who embody excellence in teaching and
              character. They inspire young minds, nurture future global citizens, and foster an
              environment optimized for learning.
            </p>
          </div>

          <nav style={{ marginTop: 8 }}>
            <strong>Learn more:</strong>{' '}
            <Link href="/director-welcome-page">Welcome from the Director</Link> ·{' '}
            <Link href="/religion">Religious Affiliation</Link> ·{' '}
            <Link href="/mission-and-vision">Mission & Vision</Link> ·{' '}
            <Link href="/contact-us">Contact Us</Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
