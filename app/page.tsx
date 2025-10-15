import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HomeHeroSlideshow from '../components/HomeHeroSlideshow';

export const revalidate = 86400; // 24h (ISR)

export default function Page(): JSX.Element {
  return (
    <main>
      {/* HERO */}
      <section
        className="home-hero"
        style={{
          width: '100%',
          background: '#fafafa',
          padding: '12px 0 0 0',
          marginBottom: 24,
        }}
      >
        <div className="container">
          <HomeHeroSlideshow
            images={[
              { src: '/images/HP_IMG1.jpeg', alt: 'Historic campus view' },
              { src: '/images/HP_IMG2.jpeg', alt: 'Mission and vision banner' },
              { src: '/images/HP_IMG3.jpeg', alt: 'Religious community gathering' },
              { src: '/images/HP_IMG4.jpeg', alt: 'School transportation bus' },
              { src: '/images/HP_IMG5.jpeg', alt: 'Uganda landscape' },
            ]}
          />
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="home-ctas" style={{ margin: '8px 0 28px 0' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 16,
          }}
        >
          <Link href="/apply" className="btn btn-outline btn-lg" aria-label="How to Apply">
            How to Apply
          </Link>
          <Link href="/news" className="btn btn-outline btn-lg" aria-label="News and Events">
            News and Events
          </Link>
          <Link href="/contact-us" className="btn btn-outline btn-lg" aria-label="Contact Us">
            Contact Us
          </Link>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="welcome" style={{ margin: '24px 0' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* Image column (use available legacy images) */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <Image
                src="/images/welcome-pic.jpeg"
                alt="Campus life at GPPS"
                sizes="(max-width: 768px) 100vw, 540px"
                width={1200}
                height={900}
                style={{ width: '100%', height: 'auto', borderRadius: 8 }}
              />
            </div>
          </div>

          {/* Text column */}
          <div>
            <h1 className="welcome-banner" style={welcomeBannerStyle}>
              Discover the GPPS Difference
            </h1>
            <div className="first-info">
              <p style={welcomeParagraphStyle}>
                We are delighted to welcome you to our website, where you will
                find a wealth of information about Genesis and Premier
                Preparatory Schools (GPPS), our values and our commitment to
                nurturing young minds. At GPPS, we believe in providing a
                holistic education that goes beyond traditional academics. Our
                dedicated team of educators works tirelessly to create an
                engaging and supportive learning environment where every learner
                can thrive. Browse through and discover the incredible
                opportunities awaiting you and your child at GPPS, a blossoming
                institution dedicated to academic excellence, character
                development, and the cultivation of future leaders. Whether
                you're interested in our rigorous academic programs, diverse
                extracurricular activities, or our facilities, we invite you to
                explore all that GPPS has to offer and join our vibrant
                educational community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GPPS INTRO / MISSION / WHY / EXPLORE */}
      <section className="gpps-intro" style={{ margin: '12px 0 36px 0' }}>
        <div className="container" style={{ display: 'grid', gap: 18 }}>
          <div className="GPPS-entry">
            <h1 style={sectionHeaderStyle}>Welcome to GPPS</h1>
            <p style={paragraphStyle}>
              On behalf of the entire Genesis and Premier Preparatory Schools
              (GPPS) community, we warmly welcome you to our website! At GPPS,
              we are committed to fostering an environment of academic
              excellence, character development and innovation. Our core values
              of Honesty, Integrity, Innovation, Accountability and Excellence
              serve as the foundation upon which we build our community.
            </p>

            <h2 style={subHeaderStyle}>Our Mission</h2>
            <ul style={listStyle}>
              <li>
                <strong>Comprehensive Education:</strong> Provide a well-rounded
                education that equips learners with the knowledge, skills, and
                values necessary for success.
              </li>
              <li>
                <strong>Critical Thinking:</strong> Cultivate critical thinking,
                creativity, and problem-solving abilities.
              </li>
              <li>
                <strong>Character Building:</strong> Nurture compassionate,
                responsible, and confident individuals.
              </li>
            </ul>

            <h2 style={subHeaderStyle}>Why Choose GPPS?</h2>
            <ul style={listStyle}>
              <li>
                <strong>Experienced and Dedicated Faculty:</strong> Our teachers
                are committed to guiding and inspiring each learner.
              </li>
              <li>
                <strong>Enhanced Learning Environments:</strong> Spaces
                thoughtfully designed to enhance the educational journey of each
                learner.
              </li>
              <li>
                <strong>Diverse Extracurricular Activities:</strong> A wide
                range of programs to develop various talents and interests.
              </li>
              <li>
                <strong>Strong Community Ties:</strong> We foster a supportive
                and engaged school community.
              </li>
            </ul>

            <h2 style={subHeaderStyle}>Explore Our Website</h2>
            <ul style={listStyle}>
              <li>
                <strong>Learn About Our Admissions Process:</strong> Find out
                how to enroll your child at GPPS.
              </li>
              <li>
                <strong>Access Parent Resources:</strong> Find valuable tools,
                guides, and information to support your child's learning
                journey.
              </li>
              <li>
                <strong>Learn About Our School's History:</strong> Discover the
                journey of GPPS, our founding principles, and key milestones
                that have shaped our community.
              </li>
              <li>
                <strong>Stay Updated on School News and Events:</strong> Keep
                informed about the latest happenings at GPPS.
              </li>
            </ul>

            <div className="GPPS-signature" style={{ marginTop: 12 }}>
              <p style={paragraphStyle}>Together, let's empower minds and shape futures!</p>
              <p style={paragraphStyle}>
                Thank you for visiting our website. We look forward to welcoming
                you to the GPPS family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OPTIONAL: SIMPLE NEWS TEASER */}
      <section className="news-teaser" style={{ margin: '8px 0 40px 0' }}>
        <div className="container">
          <h2 style={sectionHeaderStyle}>Latest</h2>
          <p style={paragraphStyle}>
            Visit our News & Events page for updates and announcements.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 16,
            }}
          >
            <article
              style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: '0 0 6px 0' }}>News & Events</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  Explore happenings, events, and community highlights.
                </p>
              </div>
              <Link
                href="/news"
                style={{
                  display: 'block',
                  padding: 12,
                  textDecoration: 'none',
                  color: 'var(--secondary-color)',
                  fontFamily: 'var(--button-font)',
                }}
              >
                Read more →
              </Link>
            </article>

            <article
              style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: '0 0 6px 0' }}>Admissions</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  Learn more about the application process and requirements.
                </p>
              </div>
              <Link
                href="/apply"
                style={{
                  display: 'block',
                  padding: 12,
                  textDecoration: 'none',
                  color: 'var(--secondary-color)',
                  fontFamily: 'var(--button-font)',
                }}
              >
                Apply now →
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}



const welcomeBannerStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontFamily: 'var(--header-font)',
  fontWeight: 800,
  fontSize: '1.8rem',
};

const welcomeParagraphStyle: React.CSSProperties = {
  margin: '0',
  lineHeight: 1.7,
  fontSize: '1rem',
};

const sectionHeaderStyle: React.CSSProperties = {
  margin: '0 0 8px 0',
  fontFamily: 'var(--header-font)',
  fontWeight: 800,
  fontSize: '1.6rem',
  textAlign: 'center'
};

const subHeaderStyle: React.CSSProperties = {
  margin: '16px 0 8px 0',
  fontFamily: 'var(--header-font)',
  fontWeight: 700,
  fontSize: '1.2rem',
};

const paragraphStyle: React.CSSProperties = {
  margin: '0 0 8px 0',
  lineHeight: 1.7,
  fontSize: '1rem',
};

const listStyle: React.CSSProperties = {
  margin: '0 0 8px 20px',
  padding: 0,
  lineHeight: 1.7,
  fontSize: '1rem',
};
