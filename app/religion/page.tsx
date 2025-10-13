import React from 'react';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 604800; // weekly (content changes infrequently)

export const metadata = {
  title: 'Religious Affiliation and Spiritual Growth | GPPS',
  description:
    'GPPS is proudly founded on Catholic principles while embracing learners from diverse religious backgrounds. Learn about our commitment to spiritual growth.',
  alternates: { canonical: '/religion' },
};

export default function Page(): JSX.Element {
  return (
    <main>
      <div className="container" style={{ margin: '8px 0' }}>
        <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/religion', label: 'Religious Affiliation' }]} />
      </div>
      {/* HERO + CAPTION */}
      <section className="religion-hero" style={{ padding: '12px 0 10px 0' }}>
        <div className="container">
          <figure style={{ margin: 0 }}>
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              <Image
                src="/images/Religion-hero.jpeg"
                alt="Rev. Fr. Ssekatawa leading the holy mass on Speech Day"
                sizes="(max-width: 768px) 100vw, 1100px"
                width={2200}
                height={1466}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority={false}
              />
            </div>
            <figcaption style={{ marginTop: 8, fontSize: '0.95rem', opacity: 0.9 }}>
              Rev. Fr. Ssekatawa leading the holy mass on Speech Day
            </figcaption>
          </figure>
        </div>
      </section>

      {/* BODY CONTENT (three-column grid like legacy: left | middle | right) */}
      <section className="religion-body" style={{ padding: '8px 0 28px 0' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr min(800px, 100%) 1fr',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {/* left gutter */}
          <div aria-hidden="true" />

          {/* middle content */}
          <div>
            <header>
              <h1
                style={{
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--header-font)',
                  fontWeight: 800,
                  fontSize: '1.8rem',
                }}
              >
                Religious Affiliation and Spiritual Growth
              </h1>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: '1rem' }}>
                Premier Preparatory School (PPS) is proudly founded on Catholic principles, guided by
                the values of compassion, empathy, and respect. We are honored to have St. John Paul II
                as our patron, inspiring us to emulate his commitment to faith, education, and service.
              </p>
              <p style={{ margin: '8px 0 0 0', lineHeight: 1.7, fontSize: '1rem' }}>
                While rooted in Catholicism, our school embracingly welcomes learners from diverse
                religious and socio-ethnic backgrounds.
              </p>
            </header>

            <section>
              <h2
                style={{
                  margin: '14px 0 6px 0',
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                Our Commitment
              </h2>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: '1rem' }}>We are committed to:</p>
              <ul style={{ margin: '6px 0 0 20px', lineHeight: 1.7, fontSize: '1rem' }}>
                <li>
                  Respecting and honoring the spiritual beliefs and practices of all learners, regardless
                  of their faith or background.
                </li>
                <li>
                  Supporting the spiritual growth and development of our learners, fostering a sense of
                  community and belonging.
                </li>
                <li>
                  Promoting interfaith understanding, tolerance, and dialogue, encouraging learners to
                  appreciate and respect different cultures and beliefs.
                </li>
                <li>
                  Providing opportunities for spiritual reflection, prayer, and worship, accommodating
                  the diverse needs of our learners.
                </li>
              </ul>
            </section>

            <section>
              <h2
                style={{
                  margin: '14px 0 6px 0',
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                Inclusive Environment
              </h2>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: '1rem' }}>
                At PPS, we strive to create an inclusive environment that celebrates the diversity of
                our learners. Our school community is built on the principles of:
              </p>
              <ul style={{ margin: '6px 0 0 20px', lineHeight: 1.7, fontSize: '1rem' }}>
                <li>
                  <strong>Mutual respect:</strong> We treat each other with kindness, consideration, and
                  respect, regardless of our differences.
                </li>
                <li>
                  <strong>Open communication:</strong> We encourage open and honest dialogue, listening
                  to and learning from each other's perspectives.
                </li>
                <li>
                  <strong>Embracing diversity:</strong> We celebrate our differences, recognizing that
                  they enrich our community and foster a deeper understanding of the world.
                </li>
              </ul>

              <p style={{ margin: '6px 0 0 0', lineHeight: 1.7, fontSize: '1rem' }}>
                By embracing our diversity and promoting spiritual growth, we aim to inspire our
                learners to become compassionate, empathetic, and responsible global citizens.
              </p>
            </section>
          </div>

          {/* right gutter */}
          <div aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
