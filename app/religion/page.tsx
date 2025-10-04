export const revalidate = 86400;

export const metadata = {
  title: 'Religious Affiliation | GPPS',
  description:
    'Learn about the religious affiliation and values that guide GPPS in educating and nurturing students.',
};

export default function Page(): JSX.Element {
  return (
    <section>
      <h1>Religious Affiliation</h1>
      <p>
        GPPS embraces a values-driven approach to education that promotes integrity, compassion,
        and service. We welcome learners from diverse backgrounds and work closely with families
        to support spiritual growth alongside academic excellence.
      </p>

      <p>
        Our community observes key celebrations and provides opportunities for reflection and
        character development throughout the school year.
      </p>
    </section>
  );
}
