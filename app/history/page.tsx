import Link from 'next/link';

export const revalidate = 86400;

export const metadata = {
  title: 'Our History | GPPS',
  description:
    'The story of Genesis and Premier Preparatory Schools (GPPS) — founded in 2019 with a vision for holistic education and resilience.',
};

export default function Page(): JSX.Element {
  return (
    <section>
      <h1>Our History</h1>
      <figure style={{ margin: '16px 0' }}>
        <img
          src="/images/CO2024P7.jpg"
          alt="Students in classroom"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </figure>

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

      <nav style={{ marginTop: 24 }}>
        <strong>Learn more:</strong>{' '}
        <Link href="/director-welcome-page">Welcome from the Director</Link> ·{' '}
        <Link href="/religion">Religious Affiliation</Link> ·{' '}
        <Link href="/mission-and-vision">Mission & Vision</Link> ·{' '}
        <Link href="/contact-us">Contact Us</Link>
      </nav>
    </section>
  );
}
