import React from 'react';
import ApplyForm from '../../components/ApplyForm';

export const revalidate = 604800; // weekly (content changes infrequently)

export const metadata = {
  title: 'How to Apply | GPPS',
  description:
    'Learn how to apply to Genesis and Premier Preparatory Schools (GPPS): process, required documents, downloadable forms, and contact information.',
  alternates: { canonical: '/apply' },
};

export default function ApplyPage(): JSX.Element {
  return (
    <main>
      {/* Centered content area (legacy-style left | middle | right) */}
      <section className="apply-section" style={{ padding: '12px 0 28px 0' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr min(900px, 100%) 1fr',
            gap: 20,
            alignItems: 'start',
          }}
        >
          <div aria-hidden="true" />
          <div className="application-info-container" style={{ lineHeight: 1.7, fontSize: '1rem' }}>
            <h1
              style={{
                margin: '0 0 12px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 800,
                fontSize: '1.8rem',
              }}
            >
              How to Apply
            </h1>

            <p>
              At GPPS, we are committed to providing a nurturing and supportive environment that
              fosters academic excellence, character development, and innovation. Our dedicated team
              of teachers and staff work tirelessly to ensure that our students receive a
              well-rounded education that prepares them for success in an ever-changing world.
            </p>

            <h2
              style={{
                margin: '16px 0 8px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Admissions Process
            </h2>

            <p>To ensure a smooth and efficient admissions process, please follow these steps:</p>

            <ol style={{ margin: '8px 0 0 20px' }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Submit Application:</strong>
                <ul style={{ margin: '6px 0 0 20px' }}>
                  <li>
                    <a
                      href="/PPS-APPLICATION%20FORM.pdf"
                      download
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      Download and Complete
                    </a>{' '}
                    the application form from our website or collect one from our school office.
                  </li>
                  <li>Submit the completed form along with the required documents to our admissions office.</li>
                </ul>
              </li>

              <li style={{ marginBottom: 8 }}>
                <strong>Assessment and Interview:</strong> Once we receive your application, we will
                schedule an assessment and interview for your child to determine their academic level
                and ensure a smooth transition.
              </li>

              <li style={{ marginBottom: 8 }}>
                <strong>Offer of Admission:</strong> If your child is successful, you will receive an
                admission offer letter outlining the terms and conditions.
              </li>

              <li>
                <strong>Complete Registration:</strong> Secure your child's place by paying the
                required fees and submitting all necessary documents.
              </li>
            </ol>

            <h2
              style={{
                margin: '16px 0 8px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Required Documents
            </h2>
            <ul style={{ margin: '6px 0 0 20px' }}>
              <li>Birth certificate</li>
              <li>Vaccination card</li>
              <li>Previous school reports (if applicable)</li>
              <li>Transfer letter (if applicable)</li>
              <li>Two passport-sized photographs</li>
            </ul>

            <h2
              style={{
                margin: '16px 0 8px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Fees Structure
            </h2>
            <p>
              Our fees structure is competitive and affordable. Please{' '}
              <a href="/contact-us" style={{ color: 'inherit', textDecoration: 'underline' }}>
                contact our admissions office
              </a>{' '}
              for detailed information on fees and payment plans.
            </p>

            <h2
              style={{
                margin: '16px 0 8px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Why Choose GPPS?
            </h2>
            <ul style={{ margin: '6px 0 0 20px' }}>
              <li>
                <strong>Academic Excellence:</strong> We provide a rigorous and well-rounded
                education that prepares students for future academic success.
              </li>
              <li>
                <strong>Supportive Environment:</strong> Our dedicated team creates a nurturing
                environment that fosters social and emotional growth.
              </li>
              <li>
                <strong>Innovation and Technology:</strong> We integrate modern technology to equip
                students with essential skills for the future.
              </li>
              <li>
                <strong>Character Development:</strong> We emphasize values that help students
                become confident, compassionate, and responsible individuals.
              </li>
            </ul>

            <h2
              style={{
                margin: '16px 0 8px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Downloadable Forms
            </h2>
            <ul style={{ margin: '6px 0 0 20px' }}>
              <li>
                <a
                  href="/PPS-APPLICATION%20FORM.pdf"
                  download
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  PPS APPLICATION
                </a>
              </li>
              <li>
                <a
                  href="/PEHF%20Form.pdf"
                  download="PEHF-FORM"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  PEHF Form
                </a>
              </li>
            </ul>

            <h2
              style={{
                margin: '16px 0 8px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Contact Admissions
            </h2>
            <p>
              Have questions or want to schedule a school tour? We're here to help.
              <br />
              <strong>Genesis and Premier Preparatory Schools (GPPS)</strong>
              <br />
              Sanje - Kyotera
              <br />
              Phone:{' '}
              <a href="tel:+256742693000" style={{ color: 'inherit' }}>
                +256-742-69-3000
              </a>
              <br />
              Email:{' '}
              <a href="mailto:premier.prep.sch@gmail.com" style={{ color: 'inherit' }}>
                premier.prep.sch@gmail.com
              </a>
            </p>

            {/* Online application form (kept from current site) */}
            <div style={{ marginTop: 20 }}>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                Online Application Form
              </h2>
              <ApplyForm />
            </div>
          </div>
          <div aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
