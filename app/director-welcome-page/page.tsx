import React from 'react';
import Image from 'next/image';

export const revalidate = 604800; // 7 days (rarely changes)

export const metadata = {
  title: "Director's Welcome | GPPS",
  description:
    'A welcome message from the Director of Genesis and Premier Preparatory Schools (GPPS).',
};

export default function Page(): JSX.Element {
  return (
    <main>
      <section
        className="director-welcome"
        style={{ padding: '12px 0 24px 0' }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* Left: Director image */}
          <div>
            <Image
              src="/images/Director-IMG.jpeg"
              alt="Director GPPS"
              sizes="(max-width: 768px) 100vw, 540px"
              width={1200}
              height={900}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                display: 'block',
              }}
            />
          </div>

          {/* Right: Welcome content */}
          <div>
            <h1
              style={{
                margin: '0 0 12px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 800,
                fontSize: '1.8rem',
              }}
            >
              Director's Welcome
            </h1>

            <div style={{ lineHeight: 1.7, fontSize: '1rem' }}>
              <p>
                On behalf of the entire Genesis and Premier Preparatory Schools
                (GPPS) community, I warmly welcome you to our website!
              </p>

              <p>
                At GPPS, we are committed to fostering an environment of academic
                excellence, character development, and innovation. Our core values
                of Honesty, Integrity, Innovation, Accountability, and Excellence
                serve as the foundation upon which we build.
              </p>

              <p>
                We believe that every child deserves a high-quality education that
                prepares them for success in an ever-changing world. Our dedicated
                team of teachers and staff work tirelessly to create a nurturing
                and supportive environment that encourages our students to grow,
                learn, and thrive.
              </p>

              <p>
                As a parent, you want the best for your child, and we want to partner
                with you to provide an exceptional educational experience. Our school offers:
              </p>

              <ul style={{ margin: '0 0 8px 20px', padding: 0 }}>
                <li>
                  A rigorous and well-rounded curriculum that prepares students
                  for future academic success
                </li>
                <li>
                  A safe and supportive environment that fosters social and
                  emotional growth
                </li>
                <li>
                  Opportunities for extracurricular activities and character
                  development
                </li>
                <li>
                  A commitment to innovation and technology integration
                </li>
              </ul>

              <p>
                We invite you to join our community and experience the GPPS
                difference for yourself. If you're looking for a school that will
                challenge, inspire, and support your child, we encourage you to bring
                them to our school.
              </p>

              <p>
                We also extend an invitation to our existing parents to bring more
                children to our school. By doing so, you'll not only be providing
                your child with an exceptional education, but you'll also be
                contributing to the growth and development of our school community.
              </p>

              <p>
                Thank you for considering Genesis and Premier Preparatory Schools.
                We look forward to welcoming you to our community!
              </p>

              <p>Best regards,</p>

              <div className="goodbye" style={{ marginTop: 8 }}>
                <p>
                  Dr. med. C. K. Musoke,
                  <br />
                  Director GPPS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
