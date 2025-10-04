export const revalidate = 86400;

export const metadata = {
  title: 'Welcome from the Director | GPPS',
  description:
    'A welcome message from the Director of Genesis and Premier Preparatory Schools (GPPS).',
};

export default function Page(): JSX.Element {
  return (
    <section>
      <h1>Welcome from the Director</h1>
      <p>
        Welcome to Genesis and Premier Preparatory Schools (GPPS). Our mission is to provide a
        holistic, values-driven education that nurtures character, curiosity, and excellence.
      </p>
      <p>
        We are proud of our vibrant community of learners, educators, and families. Thank you for
        your interest in GPPS — we invite you to explore our programs and connect with our team.
      </p>
    </section>
  );
}
