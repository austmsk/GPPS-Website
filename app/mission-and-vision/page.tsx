export const revalidate = 86400;

export const metadata = {
  title: 'Mission & Vision | GPPS',
  description:
    'Discover the mission and vision that guide Genesis and Premier Preparatory Schools (GPPS) in delivering holistic, values-driven education.',
  alternates: { canonical: '/mission-and-vision' },
};

import Breadcrumbs from '../../components/Breadcrumbs';

export default function Page(): JSX.Element {
  return (
    <section>
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/mission-and-vision', label: 'Mission & Vision' }]} />
      <h1>Mission & Vision</h1>

      <h2>Our Mission</h2>
      <p>
        To provide a holistic, values-driven education that nurtures character, curiosity,
        and excellence—preparing learners to become confident, compassionate, and responsible
        citizens who contribute meaningfully to their communities and the world.
      </p>

      <h2>Our Vision</h2>
      <p>
        To be a leading center of learning in the region—recognized for academic distinction,
        strong moral grounding, and a vibrant culture of service, innovation, and leadership.
      </p>

      <h2>Core Values</h2>
      <ul>
        <li><strong>Integrity:</strong> We do what is right, even when no one is watching.</li>
        <li><strong>Excellence:</strong> We pursue the highest standards in learning and character.</li>
        <li><strong>Service:</strong> We serve others with empathy, humility, and respect.</li>
        <li><strong>Resilience:</strong> We learn from challenges and persevere with courage.</li>
        <li><strong>Community:</strong> We build strong partnerships among learners, staff, and families.</li>
      </ul>
    </section>
  );
}
