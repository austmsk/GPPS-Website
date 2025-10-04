import Link from 'next/link';

export const revalidate = 86400;

export const metadata = {
  title: 'Fees Structure | GPPS',
  description:
    'Learn about the GPPS fees structure and how to contact our admissions office for detailed information and payment plans.',
};

export default function Page(): JSX.Element {
  return (
    <section>
      <h1>Fees Structure</h1>

      <p>
        Our fees structure is competitive and affordable. For the most accurate and up‑to‑date
        information on fees and payment plans, please{' '}
        <Link href="/contact-us">contact our admissions office</Link>.
      </p>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          border: '1px dashed #ccc',
          background: '#fafafa',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Coming Soon</h2>
        <p>
          A detailed breakdown of tuition, boarding, transportation, and other costs will be
          published here. In the meantime, our admissions team is happy to answer your questions.
        </p>
      </div>

      <nav style={{ marginTop: 24 }}>
        <strong>Related:</strong> <Link href="/apply">Apply</Link> ·{' '}
        <Link href="/transportation">Transportation</Link> ·{' '}
        <Link href="/mission-and-vision">Mission & Vision</Link>
      </nav>
    </section>
  );
}
